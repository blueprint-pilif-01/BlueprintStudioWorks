const express = require('express');
const router = express.Router();
const { sendEmail, isEmailConfigured, getEmailConfigStatus } = require('../lib/email');
const templates = require('../lib/email-templates');

const ADMIN_EMAIL = () => process.env.ADMIN_EMAIL || process.env.SMTP_USER || null;

function emailErrorResponse(res, err) {
  if (err.code === 'EMAIL_NOT_CONFIGURED') {
    return res.status(503).json({ error: 'Email delivery is not configured on the server. Please contact us directly at the address in the footer.' });
  }
  return res.status(502).json({ error: 'We could not deliver your message right now. Please try again in a few minutes or email us directly.' });
}

router.post('/contact', async (req, res) => {
  const { fullName, email, phone, siteName, domain, packageLabel, packagePrice, servicesSummary, totalEstimate, description } = req.body;
  if (!email || !fullName) return res.status(400).json({ error: 'Name and email are required' });

  const to = ADMIN_EMAIL();
  if (!to || !isEmailConfigured()) {
    const status = getEmailConfigStatus();
    console.error(`[contact] Rejected: ${!to ? 'ADMIN_EMAIL not configured' : status.error}`);
    return res.status(503).json({ error: 'Email delivery is not configured on the server. Please contact us directly at the address in the footer.' });
  }

  try {
    const subject = `New inquiry${fullName ? ` — ${fullName}` : ''}`;
    const html = templates.contactFormReceived({ fullName, email, phone, siteName, domain, packageLabel, packagePrice, servicesSummary, totalEstimate, description });
    await sendEmail(to, subject, html);
    res.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err.message);
    return emailErrorResponse(res, err);
  }
});

router.post('/feedback', async (req, res) => {
  const { pageName, siteName, feedback, timestamp } = req.body;
  if (!feedback || typeof feedback !== 'string') return res.status(400).json({ error: 'Feedback is required' });

  const to = ADMIN_EMAIL();
  if (!to || !isEmailConfigured()) {
    const status = getEmailConfigStatus();
    console.error(`[feedback] Rejected: ${!to ? 'ADMIN_EMAIL not configured' : status.error}`);
    return res.status(503).json({ error: 'Email delivery is not configured on the server.' });
  }

  try {
    const subject = `Feedback${siteName ? ` — ${siteName}` : ''}${pageName ? ` (${pageName})` : ''}`;
    const html = templates.publicFeedbackReceived({ pageName, siteName, feedback, timestamp });
    await sendEmail(to, subject, html);
    res.json({ ok: true });
  } catch (err) {
    console.error('Public feedback error:', err.message);
    return emailErrorResponse(res, err);
  }
});

module.exports = router;
