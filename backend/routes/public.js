const express = require('express');
const router = express.Router();
const { sendEmail } = require('../lib/email');
const templates = require('../lib/email-templates');

const ADMIN_EMAIL = () => process.env.ADMIN_EMAIL || process.env.SMTP_USER || null;

router.post('/contact', async (req, res) => {
  try {
    const { fullName, email, phone, siteName, domain, packageLabel, packagePrice, servicesSummary, totalEstimate, description } = req.body;
    if (!email || !fullName) return res.status(400).json({ error: 'Name and email are required' });

    const to = ADMIN_EMAIL();
    if (!to) return res.status(503).json({ error: 'Email not configured' });

    const subject = `New inquiry${fullName ? ` — ${fullName}` : ''}`;
    const html = templates.contactFormReceived({ fullName, email, phone, siteName, domain, packageLabel, packagePrice, servicesSummary, totalEstimate, description });
    await sendEmail(to, subject, html);

    res.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/feedback', async (req, res) => {
  try {
    const { pageName, siteName, feedback, timestamp } = req.body;
    if (!feedback || typeof feedback !== 'string') return res.status(400).json({ error: 'Feedback is required' });

    const to = ADMIN_EMAIL();
    if (!to) return res.status(503).json({ error: 'Email not configured' });

    const subject = `Feedback${siteName ? ` — ${siteName}` : ''}${pageName ? ` (${pageName})` : ''}`;
    const html = templates.publicFeedbackReceived({ pageName, siteName, feedback, timestamp });
    await sendEmail(to, subject, html);

    res.json({ ok: true });
  } catch (err) {
    console.error('Public feedback error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
