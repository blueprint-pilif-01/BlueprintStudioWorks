const dns = require('dns').promises;
const net = require('net');
const nodemailer = require('nodemailer');

let transporter = null;

function normalizeSmtpPass(pass) {
  return (pass || '').replace(/\s+/g, '');
}

function isPlaceholder(value) {
  const normalized = normalizeSmtpPass(value).toLowerCase();
  return !normalized ||
    normalized.includes('change_me') ||
    normalized.includes('paste_gmail_app_password_here') ||
    normalized.includes('your-gmail-app-password') ||
    normalized.includes('your-email');
}

function getEmailConfigStatus() {
  if (!process.env.SMTP_HOST) return { configured: false, error: 'SMTP_HOST not set' };
  if (!process.env.SMTP_USER) return { configured: false, error: 'SMTP_USER not set' };
  if (isPlaceholder(process.env.SMTP_PASS)) return { configured: false, error: 'SMTP_PASS not set to a real Gmail App Password' };
  return { configured: true };
}

function isEmailConfigured() {
  return getEmailConfigStatus().configured;
}

async function resolveTransportHost() {
  const host = process.env.SMTP_HOST;
  const family = parseInt(process.env.SMTP_FAMILY || '4', 10);

  if (!host) {
    throw new Error('SMTP_HOST not set');
  }

  if (net.isIP(host) || family !== 4) {
    if (!net.isIP(host) && (family === 6 || family === 4)) {
      const lookupResult = await dns.lookup(host, { family });
      return {
        host: lookupResult.address,
        tlsServername: process.env.SMTP_SERVERNAME || host,
      };
    }

    return {
      host,
      tlsServername: process.env.SMTP_SERVERNAME || undefined,
    };
  }

  const lookupResult = await dns.lookup(host, { family: 4 });

  return {
    host: lookupResult.address,
    tlsServername: process.env.SMTP_SERVERNAME || host,
  };
}

async function getTransporter() {
  if (transporter) return transporter;
  if (!isEmailConfigured()) return null;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const transportHost = await resolveTransportHost();
  const secure =
    typeof process.env.SMTP_SECURE === 'string'
      ? process.env.SMTP_SECURE.toLowerCase() === 'true'
      : port === 465;
  const rejectUnauthorized =
    typeof process.env.SMTP_TLS_REJECT_UNAUTHORIZED === 'string'
      ? process.env.SMTP_TLS_REJECT_UNAUTHORIZED.toLowerCase() !== 'false'
      : true;

  transporter = nodemailer.createTransport({
    host: transportHost.host,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: normalizeSmtpPass(process.env.SMTP_PASS) },
    tls: {
      ...(transportHost.tlsServername ? { servername: transportHost.tlsServername } : {}),
      rejectUnauthorized,
    },
  });
  return transporter;
}

function getFrom() {
  return process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@blueprint.studio';
}

/**
 * Verify SMTP connectivity at startup so misconfiguration is loud, not silent.
 * Returns { configured, ok, error }.
 */
async function verifyEmailTransport() {
  if (!isEmailConfigured()) {
    const status = getEmailConfigStatus();
    return { configured: false, ok: false, error: status.error };
  }
  try {
    const transport = await getTransporter();
    await transport.verify();
    return { configured: true, ok: true };
  } catch (err) {
    return { configured: true, ok: false, error: err.message };
  }
}

/**
 * Send an email. THROWS when SMTP is not configured or the send fails,
 * so callers can report the truth instead of pretending it worked.
 */
async function sendEmail(to, subject, html) {
  const transport = await getTransporter();
  if (!transport) {
    const err = new Error('Email is not configured (set SMTP_HOST, SMTP_USER, SMTP_PASS in backend/.env)');
    err.code = 'EMAIL_NOT_CONFIGURED';
    throw err;
  }
  try {
    const info = await transport.sendMail({ from: getFrom(), to, subject, html });
    console.log(`[email] Sent "${subject}" to ${to} (${info.messageId})`);
    return info;
  } catch (err) {
    console.error(`[email] Send failed for "${subject}" to ${to}:`, err.message);
    err.code = err.code || 'EMAIL_SEND_FAILED';
    throw err;
  }
}

/**
 * Best-effort variant for in-app notifications: a failed email must not
 * break the business operation (contract creation, package assignment...).
 * Logs the failure and returns false instead of throwing.
 */
async function sendEmailSafe(to, subject, html) {
  try {
    await sendEmail(to, subject, html);
    return true;
  } catch (err) {
    console.error(`[email] (non-fatal) Could not send "${subject}" to ${to}: ${err.message}`);
    return false;
  }
}

module.exports = { sendEmail, sendEmailSafe, isEmailConfigured, verifyEmailTransport, getEmailConfigStatus };
