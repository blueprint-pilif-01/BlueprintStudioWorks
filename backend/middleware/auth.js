const jwt = require('jsonwebtoken');
const { getDatabase } = require('../config/database');

/**
 * Authenticate JWT - for admin (users table)
 */
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === 'client') {
      // Client token: { clientId, role: 'client' }
      const db = getDatabase();
      const client = await db.prepare(
        `SELECT id, email, name FROM clients WHERE id = $1`
      ).get(decoded.clientId);
      if (!client) return res.status(403).json({ error: 'Client not found' });
      req.user = { ...client, role: 'client' };
      req.clientId = client.id;
      return next();
    }

    // Admin token: { userId, role: 'admin' } or legacy { userId }
    const db = getDatabase();
    const user = await db.prepare(
      `SELECT id, email, role FROM users WHERE id = $1`
    ).get(decoded.userId);
    if (!user) return res.status(403).json({ error: 'User not found' });
    req.user = user;
    req.userId = user.id;
    return next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    return res.status(500).json({ error: 'Authentication error' });
  }
}

/**
 * Require admin role only
 */
function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

/**
 * Require client role only
 */
function requireClient(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (req.user.role !== 'client') {
    return res.status(403).json({ error: 'Client access required' });
  }
  next();
}

module.exports = { authenticateToken, requireAdmin, requireClient };
