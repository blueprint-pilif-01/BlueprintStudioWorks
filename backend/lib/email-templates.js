/**
 * HTML email templates for notifications
 */

function escapeHtml(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function contractGenerated({ signUrl, contractNumber, packageName, clientName }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Contract Ready</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="color: #0f1730;">Contract Ready to Sign</h1>
  <p>Hi ${clientName || 'there'},</p>
  <p>A new contract (${contractNumber}) for <strong>${packageName || 'your package'}</strong> has been prepared for you.</p>
  <p><a href="${signUrl}" style="display: inline-block; background: #00d0ff; color: #0f1730; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Sign Contract</a></p>
  <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:<br><a href="${signUrl}">${signUrl}</a></p>
  <p style="color: #666; font-size: 12px; margin-top: 32px;">— The Blueprint</p>
</body>
</html>`;
}

function contractSigned({ contractNumber, clientName }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Contract Signed</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="color: #0f1730;">Contract Signed</h1>
  <p><strong>${clientName || 'A client'}</strong> has signed contract ${contractNumber}.</p>
  <p style="color: #666; font-size: 12px; margin-top: 32px;">— The Blueprint</p>
</body>
</html>`;
}

function feedbackSubmitted({ clientName, clientEmail, subject, messagePreview }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Feedback</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="color: #0f1730;">New Feedback Received</h1>
  <p>From: <strong>${clientName || clientEmail}</strong> (${clientEmail})</p>
  ${subject ? `<p>Subject: ${subject}</p>` : ''}
  <p>${messagePreview}</p>
  <p style="color: #666; font-size: 12px; margin-top: 32px;">— The Blueprint</p>
</body>
</html>`;
}

function feedbackReplied({ adminReply }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Admin Replied to Your Feedback</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="color: #0f1730;">Reply to Your Feedback</h1>
  <p>Your admin has replied to your feedback:</p>
  <div style="background: #f4f7fb; padding: 16px; border-radius: 8px; margin: 16px 0;">${escapeHtml(adminReply).replace(/\n/g, '<br>')}</div>
  <p style="color: #666; font-size: 12px; margin-top: 32px;">— The Blueprint</p>
</body>
</html>`;
}

function packageAssigned({ packageName, clientName }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Package Assigned</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="color: #0f1730;">New Package Assigned</h1>
  <p>Hi ${clientName || 'there'},</p>
  <p>The package <strong>${packageName}</strong> has been assigned to you. You may need to sign a contract to activate it.</p>
  <p style="color: #666; font-size: 12px; margin-top: 32px;">— The Blueprint</p>
</body>
</html>`;
}

function contactFormReceived({ fullName, email, phone, siteName, domain, packageLabel, packagePrice, servicesSummary, totalEstimate, description }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Contact Form</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="color: #0f1730;">New Project Inquiry</h1>
  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
    <tr><td style="padding: 8px; font-weight: 600; color: #555;">Name</td><td style="padding: 8px;">${escapeHtml(fullName)}</td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; font-weight: 600; color: #555;">Email</td><td style="padding: 8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding: 8px; font-weight: 600; color: #555;">Phone</td><td style="padding: 8px;">${escapeHtml(phone)}</td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; font-weight: 600; color: #555;">Site Name</td><td style="padding: 8px;">${escapeHtml(siteName || '—')}</td></tr>
    <tr><td style="padding: 8px; font-weight: 600; color: #555;">Domain</td><td style="padding: 8px;">${escapeHtml(domain || '—')}</td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; font-weight: 600; color: #555;">Package</td><td style="padding: 8px;">${escapeHtml(packageLabel)} (${escapeHtml(packagePrice)})</td></tr>
    <tr><td style="padding: 8px; font-weight: 600; color: #555;">Services</td><td style="padding: 8px;">${escapeHtml(servicesSummary)}</td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; font-weight: 600; color: #555;">Total Estimate</td><td style="padding: 8px; font-weight: 700; color: #0f1730;">${escapeHtml(totalEstimate)}</td></tr>
  </table>
  ${description ? `<div style="background: #f4f7fb; padding: 16px; border-radius: 8px; margin: 16px 0;"><strong>Project description:</strong><br>${escapeHtml(description).replace(/\n/g, '<br>')}</div>` : ''}
  <p style="color: #666; font-size: 12px; margin-top: 32px;">— The Blueprint</p>
</body>
</html>`;
}

function publicFeedbackReceived({ pageName, siteName, feedback, timestamp }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Public Feedback</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="color: #0f1730;">New Feedback</h1>
  <p><strong>Site:</strong> ${escapeHtml(siteName || 'Blueprint Studio Works')}</p>
  <p><strong>Page:</strong> ${escapeHtml(pageName || '—')}</p>
  <div style="background: #f4f7fb; padding: 16px; border-radius: 8px; margin: 16px 0;">${escapeHtml(feedback).replace(/\n/g, '<br>')}</div>
  <p style="color: #999; font-size: 12px;">${escapeHtml(timestamp || new Date().toISOString())}</p>
  <p style="color: #666; font-size: 12px; margin-top: 32px;">— The Blueprint</p>
</body>
</html>`;
}

module.exports = {
  contractGenerated,
  contractSigned,
  feedbackSubmitted,
  feedbackReplied,
  packageAssigned,
  contactFormReceived,
  publicFeedbackReceived,
};
