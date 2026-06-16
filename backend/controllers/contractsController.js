const crypto = require('crypto');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const { getDatabase } = require('../config/database');
const { pool } = require('../config/database');
const { logActivity } = require('../lib/activity');
const { sendEmailSafe } = require('../lib/email');
const templates = require('../lib/email-templates');

async function generateContractPdf(renderedText, signatureBuffer) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let page = pdfDoc.addPage([595, 842]);
  let y = page.getHeight() - 50;
  const margin = 50;
  const fontSize = 11;
  const lineHeight = 14;
  const maxWidth = 495;

  const wrapLines = (text) => {
    const lines = [];
    for (const p of text.split(/\n/)) {
      const words = p.split(/\s+/);
      let current = '';
      for (const w of words) {
        const test = current ? `${current} ${w}` : w;
        if (font.widthOfTextAtSize(test, fontSize) > maxWidth && current) {
          lines.push(current);
          current = w;
        } else {
          current = test;
        }
      }
      if (current) lines.push(current);
    }
    return lines;
  };

  for (const line of wrapLines(renderedText)) {
    if (y < margin + 80) {
      page = pdfDoc.addPage([595, 842]);
      y = page.getHeight() - margin;
    }
    page.drawText(line, { x: margin, y, size: fontSize, font });
    y -= lineHeight;
  }

  if (signatureBuffer && signatureBuffer.length > 0) {
    try {
      const pngImage = await pdfDoc.embedPng(signatureBuffer);
      const imgW = Math.min(150, pngImage.width);
      const imgH = (pngImage.height / pngImage.width) * imgW;
      page.drawImage(pngImage, { x: margin, y: y - imgH - 30, width: imgW, height: imgH });
    } catch (_) { /* ignore */ }
  }

  return await pdfDoc.save();
}

/**
 * GET /api/contracts/templates - Admin: list templates
 */
exports.listTemplates = async (req, res) => {
  try {
    const db = getDatabase();
    const templates = await db.prepare(`
      SELECT id, title, nickname, raw_text, fields, signature_blocks, created_at, updated_at
      FROM contract_templates
      ORDER BY updated_at DESC
    `).all();
    res.json({ templates });
  } catch (err) {
    console.error('List templates error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/contracts/templates - Admin: create template
 */
exports.createTemplate = async (req, res) => {
  try {
    const { title, raw_text, fields, signature_blocks, nickname } = req.body;
    if (!title || !raw_text) return res.status(400).json({ error: 'title and raw_text required' });

    const db = getDatabase();
    const result = await db.prepare(`
      INSERT INTO contract_templates (title, raw_text, fields, signature_blocks, nickname)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, title, nickname, created_at
    `).get(
      title,
      raw_text,
      JSON.stringify(Array.isArray(fields) ? fields : []),
      JSON.stringify(Array.isArray(signature_blocks) ? signature_blocks : []),
      nickname || null
    );
    res.status(201).json({ template: result });
  } catch (err) {
    console.error('Create template error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /api/contracts/templates/:id - Admin: update template
 */
exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, raw_text, fields, signature_blocks, nickname } = req.body;

    const db = getDatabase();
    const existing = await db.prepare(`SELECT id FROM contract_templates WHERE id = $1`).get(parseInt(id));
    if (!existing) return res.status(404).json({ error: 'Template not found' });

    const updates = [];
    const params = [];
    let idx = 1;
    if (title !== undefined) { updates.push(`title = $${idx++}`); params.push(title); }
    if (raw_text !== undefined) { updates.push(`raw_text = $${idx++}`); params.push(raw_text); }
    if (fields !== undefined) { updates.push(`fields = $${idx++}`); params.push(JSON.stringify(Array.isArray(fields) ? fields : [])); }
    if (signature_blocks !== undefined) { updates.push(`signature_blocks = $${idx++}`); params.push(JSON.stringify(Array.isArray(signature_blocks) ? signature_blocks : [])); }
    if (nickname !== undefined) { updates.push(`nickname = $${idx++}`); params.push(nickname); }

    if (updates.length === 0) {
      const t = await db.prepare(`SELECT * FROM contract_templates WHERE id = $1`).get(parseInt(id));
      return res.json({ template: t });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    params.push(parseInt(id));
    await db.prepare(`UPDATE contract_templates SET ${updates.join(', ')} WHERE id = $${idx}`).run(...params);

    const t = await db.prepare(`SELECT * FROM contract_templates WHERE id = $1`).get(parseInt(id));
    res.json({ template: t });
  } catch (err) {
    console.error('Update template error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/contracts/generate - Admin: generate contract for client+package
 */
exports.generate = async (req, res) => {
  try {
    const { clientId, packageId, templateId, clientPackageId } = req.body;
    if (!clientId || !packageId || !templateId) {
      return res.status(400).json({ error: 'clientId, packageId, templateId required' });
    }

    const db = getDatabase();
    const client = await db.prepare(`SELECT id, email, name FROM clients WHERE id = $1`).get(parseInt(clientId));
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const pkg = await db.prepare(`SELECT id, name_ro, name_en, slug FROM packages WHERE id = $1`).get(parseInt(packageId));
    if (!pkg) return res.status(404).json({ error: 'Package not found' });

    const template = await db.prepare(`SELECT id, raw_text, fields FROM contract_templates WHERE id = $1`).get(parseInt(templateId));
    if (!template) return res.status(404).json({ error: 'Template not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();

    const cnResult = await pool.query(`SELECT nextval('contract_number_seq') as n`);
    const seqNum = cnResult.rows[0].n;
    const contractNumber = `BLU-CON-${String(seqNum).padStart(3, '0')}`;

    let cpId = clientPackageId ? parseInt(clientPackageId) : null;
    if (!cpId) {
      const cp = await db.prepare(`
        SELECT id FROM client_packages
        WHERE client_id = $1 AND package_id = $2 AND status = 'pending_signature'
        ORDER BY id DESC LIMIT 1
      `).get(parseInt(clientId), parseInt(packageId));
      cpId = cp?.id;
    }

    await db.prepare(`
      INSERT INTO contract_invites (template_id, client_id, client_package_id, token, code, contract_number)
      VALUES ($1, $2, $3, $4, $5, $6)
    `).run(parseInt(templateId), parseInt(clientId), cpId, token, code, contractNumber);

    const invite = await db.prepare(`
      SELECT id, token, code, contract_number, created_at
      FROM contract_invites
      WHERE token = $1
    `).get(token);

    await logActivity('contract_generated', parseInt(clientId), req.userId, `Contract ${invite.contract_number} generated for ${pkg.name_ro}`, { contract_number: invite.contract_number, package_name: pkg.name_ro });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const signUrl = `${frontendUrl}/dashboard/contracts/${invite.id}/sign?token=${token}`;

    const html = templates.contractGenerated({ signUrl, contractNumber: invite.contract_number, packageName: pkg.name_ro, clientName: client.name });
    await sendEmailSafe(client.email, `Contract ${invite.contract_number} ready to sign`, html);

    res.status(201).json({ invite, signUrl });
  } catch (err) {
    console.error('Generate contract error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/contracts?clientId=X - Admin: list contracts (optionally filtered by client)
 */
exports.listContracts = async (req, res) => {
  try {
    const { clientId } = req.query;
    const db = getDatabase();
    let sql = `
      SELECT ci.id, ci.contract_number, ci.code, ci.created_at, ci.is_disabled,
             ct.title as template_title,
             c.name as client_name, c.email as client_email,
             p.name_ro as package_name_ro,
             (SELECT cs.status FROM contract_submissions cs WHERE cs.invite_id = ci.id ORDER BY cs.id DESC LIMIT 1) as last_status
      FROM contract_invites ci
      JOIN contract_templates ct ON ct.id = ci.template_id
      LEFT JOIN clients c ON c.id = ci.client_id
      LEFT JOIN client_packages cp ON cp.id = ci.client_package_id
      LEFT JOIN packages p ON p.id = cp.package_id
    `;
    const params = [];
    if (clientId) {
      sql += ` WHERE ci.client_id = $1`;
      params.push(parseInt(clientId));
    }
    sql += ` ORDER BY ci.created_at DESC`;

    const invites = await db.prepare(sql).all(...params);
    const contracts = invites.map((inv) => {
      let status = 'pending';
      if (inv.last_status === 'SIGNED') status = 'signed';
      else if (inv.is_disabled) status = 'disabled';
      return { ...inv, status };
    });

    res.json({ contracts });
  } catch (err) {
    console.error('List contracts error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/portal/my-contracts - Client: list their contracts
 */
exports.getMyContracts = async (req, res) => {
  try {
    const clientId = req.clientId;
    const db = getDatabase();
    const invites = await db.prepare(`
      SELECT ci.id, ci.contract_number, ci.code, ci.created_at, ci.is_disabled,
             ct.title as template_title,
             p.name_ro as package_name_ro, p.name_en as package_name_en, p.slug as package_slug,
             (SELECT cs.status FROM contract_submissions cs WHERE cs.invite_id = ci.id ORDER BY cs.id DESC LIMIT 1) as last_status
      FROM contract_invites ci
      JOIN contract_templates ct ON ct.id = ci.template_id
      LEFT JOIN client_packages cp ON cp.id = ci.client_package_id
      LEFT JOIN packages p ON p.id = cp.package_id
      WHERE ci.client_id = $1
      ORDER BY ci.created_at DESC
    `).all(clientId);

    const withStatus = invites.map((inv) => {
      const sub = inv.last_status;
      let status = 'pending';
      if (sub === 'SIGNED') status = 'signed';
      else if (inv.is_disabled) status = 'disabled';
      return { ...inv, status };
    });

    res.json({ contracts: withStatus });
  } catch (err) {
    console.error('Get my contracts error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/portal/contracts/:id - Client: view contract details (for signing)
 */
exports.getContract = async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = req.clientId;
    const db = getDatabase();

    const invite = await db.prepare(`
      SELECT ci.id, ci.template_id, ci.client_id, ci.token, ci.contract_number, ci.code, ci.is_disabled,
             ct.title, ct.raw_text, ct.fields, ct.signature_blocks
      FROM contract_invites ci
      JOIN contract_templates ct ON ct.id = ci.template_id
      WHERE ci.id = $1 AND ci.client_id = $2
    `).get(parseInt(id), clientId);

    if (!invite) return res.status(404).json({ error: 'Contract not found' });
    if (invite.is_disabled) return res.status(400).json({ error: 'Contract is no longer available for signing' });

    const client = await db.prepare(`SELECT name, email FROM clients WHERE id = $1`).get(clientId);
    const submission = await db.prepare(`
      SELECT id, status, signed_at FROM contract_submissions WHERE invite_id = $1 ORDER BY id DESC LIMIT 1
    `).get(parseInt(id));

    const fields = typeof invite.fields === 'string' ? JSON.parse(invite.fields || '[]') : invite.fields;
    const signature_blocks = typeof invite.signature_blocks === 'string' ? JSON.parse(invite.signature_blocks || '[]') : invite.signature_blocks;

    res.json({
      contract: {
        id: invite.id,
        contract_number: invite.contract_number,
        title: invite.title,
        raw_text: invite.raw_text,
        fields,
        signature_blocks,
        client_name: client?.name,
        client_email: client?.email,
        already_signed: !!submission && submission.status === 'SIGNED',
        signed_at: submission?.signed_at,
      },
    });
  } catch (err) {
    console.error('Get contract error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/portal/contracts/:id/sign - Client: submit drawn signature
 */
exports.signContract = async (req, res) => {
  try {
    const { id } = req.params;
    const { filled_fields, signature_data } = req.body;
    const clientId = req.clientId;
    const db = getDatabase();

    if (!signature_data) return res.status(400).json({ error: 'Signature required' });

    const invite = await db.prepare(`
      SELECT ci.id, ci.template_id, ci.client_id, ci.client_package_id, ci.contract_number
      FROM contract_invites ci
      WHERE ci.id = $1 AND ci.client_id = $2 AND ci.is_disabled = FALSE
    `).get(parseInt(id), clientId);

    if (!invite) return res.status(404).json({ error: 'Contract not found' });

    const existing = await db.prepare(`SELECT id FROM contract_submissions WHERE invite_id = $1 AND status = 'SIGNED'`).get(parseInt(id));
    if (existing) return res.status(400).json({ error: 'Contract already signed' });

    const template = await db.prepare(`SELECT raw_text, fields FROM contract_templates WHERE id = $1`).get(invite.template_id);
    const client = await db.prepare(`SELECT name, email FROM clients WHERE id = $1`).get(clientId);

    const fields = typeof template.fields === 'string' ? JSON.parse(template.fields || '[]') : template.fields || [];
    const filled = filled_fields || {};
    let renderedText = template.raw_text;
    for (const f of fields) {
      const key = f.key || f.name;
      const val = filled[key] ?? client?.name ?? client?.email ?? '';
      renderedText = renderedText.replace(new RegExp(`{{${key}}}`, 'gi'), String(val));
    }
    renderedText = renderedText.replace(/\{\{client_name\}\}/gi, client?.name || '');
    renderedText = renderedText.replace(/\{\{client_email\}\}/gi, client?.email || '');

    const signatureBuffer = Buffer.from(signature_data.replace(/^data:image\/png;base64,/, ''), 'base64');

    const identityKey = `client:${clientId}:${invite.id}`;
    const identityHash = crypto.createHash('sha256').update(identityKey).digest('hex');
    const signerCode = crypto.randomBytes(6).toString('hex').toUpperCase();
    const signerSecret = crypto.randomBytes(32).toString('hex');

    let signer = await db.prepare(`SELECT id FROM contract_signers WHERE identity_key_hash = $1`).get(identityHash);
    if (!signer) {
      await db.prepare(`
        INSERT INTO contract_signers (identity_key_hash, signer_code, signer_secret, last_signature)
        VALUES ($1, $2, $3, $4)
      `).run(identityHash, signerCode, signerSecret, signatureBuffer);
      signer = await db.prepare(`SELECT id FROM contract_signers WHERE identity_key_hash = $1`).get(identityHash);
    } else {
      await db.prepare(`UPDATE contract_signers SET last_signature = $1, updated_at = NOW() WHERE id = $2`).run(signatureBuffer, signer.id);
    }

    const pdfBytes = await generateContractPdf(renderedText, signatureBuffer);

    await db.prepare(`
      INSERT INTO contract_submissions (template_id, invite_id, signer_id, filled_fields, rendered_text, signature_image, status, pdf_data, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5, $6, 'SIGNED', $7, $8, $9)
    `).run(
      invite.template_id,
      invite.id,
      signer.id,
      JSON.stringify(filled),
      renderedText,
      signatureBuffer,
      Buffer.from(pdfBytes),
      req.ip || req.connection?.remoteAddress,
      req.get('user-agent')
    );

    const sub = await db.prepare(`
      SELECT id, status, signed_at FROM contract_submissions WHERE invite_id = $1 ORDER BY id DESC LIMIT 1
    `).get(invite.id);

    if (invite.client_package_id) {
      await db.prepare(`
        UPDATE client_packages SET status = 'active', contract_submission_id = $1, started_at = NOW() WHERE id = $2
      `).run(sub.id, invite.client_package_id);
    }

    await logActivity('contract_signed', clientId, null, `Contract ${invite.contract_number} signed`, { contract_number: invite.contract_number });

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const html = templates.contractSigned({ contractNumber: invite.contract_number, clientName: client?.name || client?.email });
      await sendEmailSafe(adminEmail, `Contract ${invite.contract_number} signed`, html);
    }

    res.status(201).json({ submission: sub, message: 'Contract signed successfully' });
  } catch (err) {
    console.error('Sign contract error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/portal/contracts/:id/pdf - Client: download signed PDF
 */
exports.getContractPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = req.clientId;
    const db = getDatabase();

    const sub = await db.prepare(`
      SELECT cs.pdf_data, cs.rendered_text, cs.signature_image, ci.contract_number
      FROM contract_submissions cs
      JOIN contract_invites ci ON ci.id = cs.invite_id
      WHERE ci.id = $1 AND ci.client_id = $2 AND cs.status = 'SIGNED'
    `).get(parseInt(id), clientId);

    if (!sub) return res.status(404).json({ error: 'Contract not found or not signed' });

    let pdfBytes;
    if (sub.pdf_data && sub.pdf_data.length > 0) {
      pdfBytes = Buffer.isBuffer(sub.pdf_data) ? sub.pdf_data : Buffer.from(sub.pdf_data);
    } else {
      pdfBytes = await generateContractPdf(sub.rendered_text || '', sub.signature_image);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="contract-${sub.contract_number}.pdf"`);
    res.send(Buffer.isBuffer(pdfBytes) ? pdfBytes : Buffer.from(pdfBytes));
  } catch (err) {
    console.error('Get PDF error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
