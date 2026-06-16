const { getDatabase } = require('../config/database');
const { logActivity } = require('../lib/activity');
const { sendEmailSafe } = require('../lib/email');
const templates = require('../lib/email-templates');

/**
 * GET /api/portal/dashboard - Client: overview stats and pending actions
 */
exports.getDashboard = async (req, res) => {
  try {
    const clientId = req.clientId;
    const db = getDatabase();

    const siteCount = await db.prepare(`SELECT COUNT(*) as c FROM client_sites WHERE client_id = $1`).get(clientId);
    const pendingContracts = await db.prepare(`
      SELECT COUNT(*) as c FROM contract_invites ci
      WHERE ci.client_id = $1 AND ci.is_disabled = FALSE
      AND NOT EXISTS (SELECT 1 FROM contract_submissions cs WHERE cs.invite_id = ci.id AND cs.status = 'SIGNED')
    `).get(clientId);
    const activePackages = await db.prepare(`SELECT COUNT(*) as c FROM client_packages WHERE client_id = $1 AND status = 'active'`).get(clientId);

    const milestoneStats = await db.prepare(`
      SELECT COUNT(*) as total,
             SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
      FROM project_milestones WHERE client_id = $1
    `).get(clientId);
    const totalM = parseInt(milestoneStats?.total || 0);
    const completedM = parseInt(milestoneStats?.completed || 0);
    const progressPercent = totalM > 0 ? Math.round((completedM / totalM) * 100) : 0;

    const recentNotes = await db.prepare(`
      SELECT id, content, created_at FROM notes WHERE client_id = $1 ORDER BY created_at DESC LIMIT 5
    `).all(clientId);

    res.json({
      stats: {
        sitesCount: parseInt(siteCount?.c || 0),
        pendingContracts: parseInt(pendingContracts?.c || 0),
        activePackages: parseInt(activePackages?.c || 0),
        progressPercent,
      },
      recentNotes: recentNotes || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/portal/my-packages - Client: list their packages
 */
exports.getMyPackages = async (req, res) => {
  try {
    const clientId = req.clientId;
    const db = getDatabase();
    const rows = await db.prepare(`
      SELECT cp.id, cp.status, cp.created_at, cp.started_at, cp.expires_at,
             p.id as package_id, p.slug, p.name_ro, p.name_en, p.price, p.period
      FROM client_packages cp
      JOIN packages p ON p.id = cp.package_id
      WHERE cp.client_id = $1
      ORDER BY cp.created_at DESC
    `).all(clientId);
    res.json({ packages: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { site_slug, subject, message } = req.body;
    if (!message || typeof message !== 'string') return res.status(400).json({ error: 'Message required' });
    const db = getDatabase();
    await db.prepare(`INSERT INTO feedback (client_id, site_slug, subject, message) VALUES ($1, $2, $3, $4)`)
      .run(req.clientId, site_slug || null, subject || null, message.trim());
    await logActivity('feedback_sent', req.clientId, null, `Feedback submitted` + (site_slug ? ` for ${site_slug}` : ''), { site_slug: site_slug || null, subject: subject || null });

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const client = await db.prepare(`SELECT name, email FROM clients WHERE id = $1`).get(req.clientId);
      const messagePreview = message.trim().slice(0, 200) + (message.length > 200 ? '...' : '');
      const html = templates.feedbackSubmitted({
        clientName: client?.name,
        clientEmail: client?.email,
        subject: subject || null,
        messagePreview,
      });
      await sendEmailSafe(adminEmail, `New feedback` + (subject ? `: ${subject}` : ''), html);
    }

    const fb = await db.prepare(`SELECT id, site_slug, subject, message, status, created_at FROM feedback WHERE client_id = $1 ORDER BY id DESC LIMIT 1`).get(req.clientId);
    res.status(201).json({ feedback: fb });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMyFeedback = async (req, res) => {
  try {
    const db = getDatabase();
    const rows = await db.prepare(`SELECT id, site_slug, subject, message, status, admin_reply, created_at FROM feedback WHERE client_id = $1 ORDER BY created_at DESC`).all(req.clientId);
    res.json({ feedback: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMySites = async (req, res) => {
  try {
    const clientId = req.clientId;
    const db = getDatabase();
    const rows = await db.prepare(
      `SELECT site_slug, site_url, site_label FROM client_sites WHERE client_id = $1 ORDER BY id`
    ).all(clientId);
    const sites = rows.map((r) => ({ slug: r.site_slug, url: r.site_url || null, label: r.site_label || null }));
    const siteSlugs = rows.map((r) => r.site_slug);
    res.json({ sites, siteSlugs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const db = getDatabase();
    const notes = await db.prepare(
      `SELECT id, content, created_at FROM notes WHERE client_id = $1 ORDER BY created_at DESC`
    ).all(req.clientId);
    res.json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Content required' });
    }

    const db = getDatabase();
    await db.prepare(
      `INSERT INTO notes (client_id, content) VALUES ($1, $2)`
    ).run(req.clientId, content.trim());

    const note = await db.prepare(
      `SELECT id, content, created_at FROM notes WHERE client_id = $1 ORDER BY id DESC LIMIT 1`
    ).get(req.clientId);

    res.status(201).json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const db = getDatabase();
    const todos = await db.prepare(
      `SELECT id, site_slug, title, description, priority, status, completed, created_at
       FROM todos WHERE client_id = $1 ORDER BY created_at DESC`
    ).all(req.clientId);
    res.json({ todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, completed } = req.body;

    const db = getDatabase();
    const existing = await db.prepare(
      `SELECT id FROM todos WHERE id = $1 AND client_id = $2`
    ).get(parseInt(id), req.clientId);
    if (!existing) return res.status(404).json({ error: 'Todo not found' });

    if (completed !== undefined) {
      await db.prepare(
        `UPDATE todos SET completed = $1, status = $2 WHERE id = $3 AND client_id = $4`
      ).run(completed, completed ? 'done' : 'todo', id, req.clientId);
    } else if (status !== undefined) {
      await db.prepare(
        `UPDATE todos SET status = $1 WHERE id = $2 AND client_id = $3`
      ).run(status, id, req.clientId);
    }

    const todo = await db.prepare(`SELECT * FROM todos WHERE id = $1`).get(parseInt(id));
    res.json({ todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/portal/milestones - Client: list their project milestones
 */
exports.getMilestones = async (req, res) => {
  try {
    const db = getDatabase();
    const rows = await db.prepare(`
      SELECT id, title, description, status, sort_order, completed_at, created_at
      FROM project_milestones
      WHERE client_id = $1
      ORDER BY sort_order ASC, created_at ASC
    `).all(req.clientId);
    res.json({ milestones: rows || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/portal/activity - Client: list their activity
 */
exports.getActivity = async (req, res) => {
  try {
    const db = getDatabase();
    const rows = await db.prepare(`
      SELECT id, action, description, metadata, created_at
      FROM activity_log
      WHERE client_id = $1
      ORDER BY created_at DESC
      LIMIT 50
    `).all(req.clientId);
    res.json({ activity: rows || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
