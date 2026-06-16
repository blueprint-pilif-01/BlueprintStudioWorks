const crypto = require('crypto');
const { getDatabase } = require('../config/database');
const { logActivity } = require('../lib/activity');
const { sendEmailSafe } = require('../lib/email');
const templates = require('../lib/email-templates');

exports.stats = async (req, res) => {
  try {
    const db = getDatabase();
    const clients = await db.prepare(`SELECT COUNT(*) as c FROM clients`).get();
    const pending = await db.prepare(`
      SELECT COUNT(*) as c FROM contract_invites ci
      WHERE ci.is_disabled = FALSE
      AND NOT EXISTS (SELECT 1 FROM contract_submissions cs WHERE cs.invite_id = ci.id AND cs.status = 'SIGNED')
    `).get();
    const active = await db.prepare(`SELECT COUNT(*) as c FROM client_packages WHERE status = 'active'`).get();
    const revenue = await db.prepare(`
      SELECT COALESCE(SUM(p.price), 0)::float as total
      FROM client_packages cp JOIN packages p ON p.id = cp.package_id
      WHERE cp.status = 'active'
    `).get();
    res.json({
      clientsCount: parseInt(clients?.c || 0),
      pendingContracts: parseInt(pending?.c || 0),
      activePackages: parseInt(active?.c || 0),
      totalRevenue: revenue?.total || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.list = async (req, res) => {
  try {
    const db = getDatabase();
    const clients = await db.prepare(`
      SELECT c.id, c.email, c.name, c.created_at, c.last_login,
             (SELECT json_agg(site_slug) FROM client_sites cs WHERE cs.client_id = c.id) as site_slugs
      FROM clients c
      ORDER BY c.created_at DESC
    `).all();
    res.json({ clients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createInvite = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const db = getDatabase();
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.prepare(
      `INSERT INTO client_invites (email, token, expires_at) VALUES ($1, $2, $3)`
    ).run(email.toLowerCase().trim(), token, expiresAt);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const acceptUrl = `${frontendUrl}/accept-invite?token=${token}`;

    res.status(201).json({ inviteUrl: acceptUrl, token, expiresAt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listAllFeedback = async (req, res) => {
  try {
    const db = getDatabase();
    const rows = await db.prepare(`
      SELECT f.id, f.client_id, f.site_slug, f.subject, f.message, f.status, f.admin_reply, f.created_at,
             c.name as client_name, c.email as client_email
      FROM feedback f
      JOIN clients c ON c.id = f.client_id
      ORDER BY f.created_at DESC
    `).all();
    res.json({ feedback: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.replyFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { admin_reply, status } = req.body;
    const db = getDatabase();
    const existing = await db.prepare(`SELECT id FROM feedback WHERE id = $1`).get(parseInt(id));
    if (!existing) return res.status(404).json({ error: 'Feedback not found' });
    const fbBefore = await db.prepare(`SELECT client_id FROM feedback WHERE id = $1`).get(parseInt(id));
    if (admin_reply !== undefined) await db.prepare(`UPDATE feedback SET admin_reply = $1, status = 'resolved' WHERE id = $2`).run(admin_reply, parseInt(id));
    if (status !== undefined) await db.prepare(`UPDATE feedback SET status = $1 WHERE id = $2`).run(status, parseInt(id));
    const fb = await db.prepare(`SELECT * FROM feedback WHERE id = $1`).get(parseInt(id));
    if (admin_reply !== undefined && fbBefore) {
      await logActivity('feedback_replied', fbBefore.client_id, req.userId, `Admin replied to feedback`, { feedback_id: parseInt(id) });
      const client = await db.prepare(`SELECT email, name FROM clients WHERE id = $1`).get(fbBefore.client_id);
      if (client?.email) {
        const html = templates.feedbackReplied({ adminReply: admin_reply });
        await sendEmailSafe(client.email, 'Reply to your feedback', html);
      }
    }
    res.json({ feedback: fb });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listClientPackages = async (req, res) => {
  try {
    const { clientId } = req.params;
    const db = getDatabase();
    const rows = await db.prepare(`
      SELECT cp.id, cp.status, cp.created_at,
             p.id as package_id, p.slug, p.name_ro, p.name_en, p.price::float, p.period
      FROM client_packages cp
      JOIN packages p ON p.id = cp.package_id
      WHERE cp.client_id = $1
      ORDER BY cp.created_at DESC
    `).all(parseInt(clientId));
    res.json({ packages: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.assignSites = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { siteSlugs } = req.body;
    if (!Array.isArray(siteSlugs)) return res.status(400).json({ error: 'siteSlugs must be an array' });

    const db = getDatabase();
    // Only delete slug-based (non-external) entries; preserve external URL entries
    await db.prepare(`DELETE FROM client_sites WHERE client_id = $1 AND site_url IS NULL`).run(clientId);

    for (const slug of siteSlugs) {
      if (slug && typeof slug === 'string') {
        await db.prepare(
          `INSERT INTO client_sites (client_id, site_slug) VALUES ($1, $2) ON CONFLICT (client_id, site_slug) DO NOTHING`
        ).run(clientId, slug.trim());
      }
    }

    res.json({ message: 'Sites assigned', siteSlugs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addSiteUrl = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { url, label } = req.body;
    if (!url || typeof url !== 'string') return res.status(400).json({ error: 'url is required' });

    const db = getDatabase();
    const slug = `ext-${Date.now()}`;
    await db.prepare(
      `INSERT INTO client_sites (client_id, site_slug, site_url, site_label) VALUES ($1, $2, $3, $4)`
    ).run(parseInt(clientId), slug, url.trim(), (label || '').trim() || null);

    const row = await db.prepare(
      `SELECT id, site_slug, site_url, site_label FROM client_sites WHERE client_id = $1 AND site_slug = $2`
    ).get(parseInt(clientId), slug);

    res.status(201).json({ site: row });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeSiteUrl = async (req, res) => {
  try {
    const { clientId, siteId } = req.params;
    const db = getDatabase();
    const result = await db.prepare(
      `DELETE FROM client_sites WHERE id = $1 AND client_id = $2 AND site_url IS NOT NULL`
    ).run(parseInt(siteId), parseInt(clientId));

    if (result.changes === 0) return res.status(404).json({ error: 'External site not found' });
    res.json({ message: 'External site removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listExternalSites = async (req, res) => {
  try {
    const { clientId } = req.params;
    const db = getDatabase();
    const rows = await db.prepare(
      `SELECT id, site_slug, site_url, site_label FROM client_sites WHERE client_id = $1 AND site_url IS NOT NULL ORDER BY id`
    ).all(parseInt(clientId));
    res.json({ sites: rows || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/clients/:clientId/milestones - Admin: list milestones for a client
 */
exports.listMilestones = async (req, res) => {
  try {
    const { clientId } = req.params;
    const db = getDatabase();
    const rows = await db.prepare(`
      SELECT id, title, description, status, sort_order, completed_at, created_at
      FROM project_milestones
      WHERE client_id = $1
      ORDER BY sort_order ASC, created_at ASC
    `).all(parseInt(clientId));
    res.json({ milestones: rows || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/clients/:clientId/milestones - Admin: create milestone
 */
exports.createMilestone = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { title, description, status, sort_order } = req.body;
    if (!title || typeof title !== 'string') return res.status(400).json({ error: 'Title required' });

    const db = getDatabase();
    const maxOrder = await db.prepare(
      `SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM project_milestones WHERE client_id = $1`
    ).get(parseInt(clientId));
    const order = sort_order !== undefined ? parseInt(sort_order) : (maxOrder?.next_order || 1);

    await db.prepare(`
      INSERT INTO project_milestones (client_id, title, description, status, sort_order)
      VALUES ($1, $2, $3, $4, $5)
    `).run(
      parseInt(clientId),
      title.trim(),
      description || null,
      status || 'pending',
      order
    );

    const row = await db.prepare(`
      SELECT id, title, description, status, sort_order, completed_at, created_at
      FROM project_milestones
      WHERE client_id = $1
      ORDER BY id DESC
      LIMIT 1
    `).get(parseInt(clientId));

    await logActivity('milestone_created', parseInt(clientId), req.userId, `Milestone "${row.title}" added`, { milestone_id: row.id, title: row.title });

    res.status(201).json({ milestone: row });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /api/clients/:clientId/milestones/:id - Admin: update milestone status/order
 */
exports.updateMilestone = async (req, res) => {
  try {
    const { clientId, id } = req.params;
    const { title, description, status, sort_order } = req.body;

    const db = getDatabase();
    const existing = await db.prepare(
      `SELECT id FROM project_milestones WHERE id = $1 AND client_id = $2`
    ).get(parseInt(id), parseInt(clientId));
    if (!existing) return res.status(404).json({ error: 'Milestone not found' });

    const updates = [];
    const params = [];
    let idx = 1;

    if (title !== undefined) { updates.push(`title = $${idx++}`); params.push(title.trim()); }
    if (description !== undefined) { updates.push(`description = $${idx++}`); params.push(description || null); }
    if (status !== undefined) {
      updates.push(`status = $${idx++}`);
      params.push(status);
      updates.push(status === 'completed' ? 'completed_at = CURRENT_TIMESTAMP' : 'completed_at = NULL');
    }
    if (sort_order !== undefined) { updates.push(`sort_order = $${idx++}`); params.push(parseInt(sort_order)); }

    if (updates.length === 0) {
      const row = await db.prepare(`SELECT * FROM project_milestones WHERE id = $1`).get(parseInt(id));
      return res.json({ milestone: row });
    }

    params.push(parseInt(id));
    const sql = `UPDATE project_milestones SET ${updates.join(', ')} WHERE id = $${idx}`;
    await db.query(sql, params);

    const row = await db.prepare(`SELECT * FROM project_milestones WHERE id = $1`).get(parseInt(id));
    if (status !== undefined) {
      await logActivity('milestone_updated', parseInt(clientId), req.userId, `Milestone "${row.title}" set to ${status}`, { milestone_id: row.id, status });
    }
    res.json({ milestone: row });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE /api/clients/:clientId/milestones/:id - Admin: delete milestone
 */
exports.deleteMilestone = async (req, res) => {
  try {
    const { clientId, id } = req.params;

    const db = getDatabase();
    const result = await db.prepare(
      `DELETE FROM project_milestones WHERE id = $1 AND client_id = $2`
    ).run(parseInt(id), parseInt(clientId));

    if (result.changes === 0) return res.status(404).json({ error: 'Milestone not found' });
    res.json({ message: 'Milestone deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/clients/activity - Admin: list all activity (optional filters: clientId, action)
 */
exports.listActivity = async (req, res) => {
  try {
    const db = getDatabase();
    const { clientId, action } = req.query;
    let sql = `
      SELECT a.id, a.client_id, a.admin_id, a.action, a.description, a.metadata, a.created_at,
             c.email as client_email, c.name as client_name
      FROM activity_log a
      LEFT JOIN clients c ON c.id = a.client_id
      WHERE 1=1
    `;
    const params = [];
    let idx = 1;
    if (clientId) { sql += ` AND a.client_id = $${idx++}`; params.push(parseInt(clientId)); }
    if (action) { sql += ` AND a.action = $${idx++}`; params.push(action); }
    sql += ` ORDER BY a.created_at DESC LIMIT 100`;

    const rows = await db.prepare(sql).all(...params);
    res.json({ activity: rows || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
