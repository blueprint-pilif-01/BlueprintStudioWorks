/**
 * Helper to log activity for the activity feed.
 * @param {string} action - Action type: contract_signed, feedback_sent, package_assigned, milestone_updated, client_invite_accepted, contract_generated, feedback_replied
 * @param {number|null} clientId
 * @param {number|null} adminId
 * @param {string} description
 * @param {object} [metadata] - Optional extra data
 */
async function logActivity(action, clientId, adminId, description, metadata = {}) {
  try {
    const { getDatabase } = require('../config/database');
    const db = getDatabase();
    await db.prepare(`
      INSERT INTO activity_log (client_id, admin_id, action, description, metadata)
      VALUES ($1, $2, $3, $4, $5)
    `).run(clientId || null, adminId || null, action, description, JSON.stringify(metadata));
  } catch (err) {
    console.error('[activity] Failed to log:', action, err.message);
  }
}

module.exports = { logActivity };
