const { getDatabase } = require('../config/database');
const { logActivity } = require('../lib/activity');
const { sendEmailSafe } = require('../lib/email');
const templates = require('../lib/email-templates');

/**
 * GET /api/packages - Public list (for pricing page + client dashboard)
 */
exports.list = async (req, res) => {
  try {
    const db = getDatabase();
    const packages = await db.prepare(`
      SELECT id, slug, type, name_ro, name_en, badge_ro, badge_en,
             price::float, period, original_price::float,
             description_ro, description_en,
             features_ro::json, features_en::json,
             is_popular, is_discount, discount_label_ro, discount_label_en,
             note_ro, note_en, sort_order
      FROM packages
      WHERE active = TRUE
      ORDER BY sort_order ASC, id ASC
    `).all();
    res.json({ packages });
  } catch (err) {
    console.error('Packages list error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/packages - Admin: create package
 */
exports.create = async (req, res) => {
  try {
    const {
      slug,
      type,
      name_ro,
      name_en,
      badge_ro,
      badge_en,
      price,
      period,
      original_price,
      description_ro,
      description_en,
      features_ro,
      features_en,
      is_popular,
      is_discount,
      discount_label_ro,
      discount_label_en,
      note_ro,
      note_en,
      sort_order,
    } = req.body;

    if (!slug || !type || !name_ro || !name_en || price == null) {
      return res.status(400).json({ error: 'slug, type, name_ro, name_en, price required' });
    }
    if (!['plan', 'addon'].includes(type)) {
      return res.status(400).json({ error: 'type must be plan or addon' });
    }

    const db = getDatabase();
    const result = await db.prepare(`
      INSERT INTO packages (
        slug, type, name_ro, name_en, badge_ro, badge_en, price, period,
        original_price, description_ro, description_en, features_ro, features_en,
        is_popular, is_discount, discount_label_ro, discount_label_en,
        note_ro, note_en, sort_order, active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, TRUE)
      RETURNING id, slug, type, name_ro, name_en, price, period, sort_order
    `).get(
      slug.trim().toLowerCase().replace(/\s+/g, '-'),
      type,
      name_ro,
      name_en,
      badge_ro || name_ro,
      badge_en || name_en,
      parseFloat(price),
      period || null,
      original_price != null ? parseFloat(original_price) : null,
      description_ro || null,
      description_en || null,
      JSON.stringify(Array.isArray(features_ro) ? features_ro : []),
      JSON.stringify(Array.isArray(features_en) ? features_en : []),
      !!is_popular,
      !!is_discount,
      discount_label_ro || null,
      discount_label_en || null,
      note_ro || null,
      note_en || null,
      sort_order != null ? parseInt(sort_order) : 999
    );

    res.status(201).json({ package: result });
  } catch (err) {
    console.error('Package create error:', err);
    if (err.code === '23505') return res.status(409).json({ error: 'Package slug already exists' });
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /api/packages/:id - Admin: update package
 */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      slug,
      type,
      name_ro,
      name_en,
      badge_ro,
      badge_en,
      price,
      period,
      original_price,
      description_ro,
      description_en,
      features_ro,
      features_en,
      is_popular,
      is_discount,
      discount_label_ro,
      discount_label_en,
      note_ro,
      note_en,
      sort_order,
      active,
    } = req.body;

    const db = getDatabase();
    const existing = await db.prepare(`SELECT id FROM packages WHERE id = $1`).get(parseInt(id));
    if (!existing) return res.status(404).json({ error: 'Package not found' });

    const updates = [];
    const params = [];
    let idx = 1;

    const set = (col, val) => {
      if (val !== undefined) {
        updates.push(`${col} = $${idx++}`);
        params.push(val);
      }
    };

    if (slug !== undefined) set('slug', slug.trim().toLowerCase().replace(/\s+/g, '-'));
    if (type !== undefined) set('type', type);
    if (name_ro !== undefined) set('name_ro', name_ro);
    if (name_en !== undefined) set('name_en', name_en);
    if (badge_ro !== undefined) set('badge_ro', badge_ro);
    if (badge_en !== undefined) set('badge_en', badge_en);
    if (price !== undefined) set('price', parseFloat(price));
    if (period !== undefined) set('period', period || null);
    if (original_price !== undefined) set('original_price', original_price != null ? parseFloat(original_price) : null);
    if (description_ro !== undefined) set('description_ro', description_ro);
    if (description_en !== undefined) set('description_en', description_en);
    if (features_ro !== undefined) set('features_ro', JSON.stringify(Array.isArray(features_ro) ? features_ro : []));
    if (features_en !== undefined) set('features_en', JSON.stringify(Array.isArray(features_en) ? features_en : []));
    if (is_popular !== undefined) set('is_popular', !!is_popular);
    if (is_discount !== undefined) set('is_discount', !!is_discount);
    if (discount_label_ro !== undefined) set('discount_label_ro', discount_label_ro);
    if (discount_label_en !== undefined) set('discount_label_en', discount_label_en);
    if (note_ro !== undefined) set('note_ro', note_ro);
    if (note_en !== undefined) set('note_en', note_en);
    if (sort_order !== undefined) set('sort_order', parseInt(sort_order));
    if (active !== undefined) set('active', !!active);

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    params.push(parseInt(id));

    await db.prepare(
      `UPDATE packages SET ${updates.join(', ')} WHERE id = $${idx}`
    ).run(...params);

    const pkg = await db.prepare(
      `SELECT id, slug, type, name_ro, name_en, price, period, sort_order, active FROM packages WHERE id = $1`
    ).get(parseInt(id));
    res.json({ package: pkg });
  } catch (err) {
    console.error('Package update error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE /api/packages/:id - Admin: soft-delete (set active=false)
 */
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    const existing = await db.prepare(`SELECT id FROM packages WHERE id = $1`).get(parseInt(id));
    if (!existing) return res.status(404).json({ error: 'Package not found' });

    await db.prepare(`UPDATE packages SET active = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = $1`).run(parseInt(id));
    res.json({ message: 'Package deactivated' });
  } catch (err) {
    console.error('Package remove error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/clients/:clientId/packages - Admin: assign package to client
 */
exports.assignToClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { packageId } = req.body;

    if (!packageId) return res.status(400).json({ error: 'packageId required' });

    const db = getDatabase();
    const client = await db.prepare(`SELECT id FROM clients WHERE id = $1`).get(parseInt(clientId));
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const pkg = await db.prepare(`SELECT id FROM packages WHERE id = $1 AND active = TRUE`).get(parseInt(packageId));
    if (!pkg) return res.status(404).json({ error: 'Package not found' });

    await db.prepare(`
      INSERT INTO client_packages (client_id, package_id, assigned_by, status)
      VALUES ($1, $2, $3, 'pending_signature')
    `).run(parseInt(clientId), parseInt(packageId), req.userId);

    const cp = await db.prepare(`
      SELECT cp.id, cp.client_id, cp.package_id, cp.status, cp.created_at,
             p.name_ro, p.name_en, p.slug
      FROM client_packages cp
      JOIN packages p ON p.id = cp.package_id
      WHERE cp.client_id = $1 AND cp.package_id = $2
      ORDER BY cp.id DESC LIMIT 1
    `).get(parseInt(clientId), parseInt(packageId));

    await logActivity('package_assigned', parseInt(clientId), req.userId, `Package ${cp.name_ro} assigned to client`, { package_name: cp.name_ro });

    const clientRow = await db.prepare(`SELECT email, name FROM clients WHERE id = $1`).get(parseInt(clientId));
    if (clientRow?.email) {
      const html = templates.packageAssigned({ packageName: cp.name_ro, clientName: clientRow.name });
      await sendEmailSafe(clientRow.email, `Package ${cp.name_ro} assigned to you`, html);
    }

    res.status(201).json({ clientPackage: cp });
  } catch (err) {
    console.error('Assign package error:', err);
    if (err.code === '23505') return res.status(409).json({ error: 'Package already assigned to this client' });
    res.status(500).json({ error: 'Internal server error' });
  }
};
