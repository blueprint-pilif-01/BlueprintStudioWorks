const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return transporter;
}

const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@blueprint.studio';

/**
 * Send an email. No-op if SMTP not configured.
 * @param {string} to - Recipient email
 * @param {string} subject
 * @param {string} html - HTML body
 */
async function sendEmail(to, subject, html) {
  const transport = getTransporter();
  if (!transport) return;
  try {
    await transport.sendMail({
      from,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error('[email] Send failed:', err.message);
  }
}

module.exports = { sendEmail };
