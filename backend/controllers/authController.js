const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { getDatabase } = require('../config/database');
const { logActivity } = require('../lib/activity');

/**
 * Admin login
 */
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const db = getDatabase();
    const user = await db.prepare(
      `SELECT id, email, password_hash FROM users WHERE email = $1`
    ).get(email.toLowerCase().trim());

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await db.prepare(`UPDATE users SET last_login = NOW() WHERE id = $1`).run(user.id);

    const token = jwt.sign(
      { userId: user.id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, role: 'admin' },
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Client login
 */
exports.clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const db = getDatabase();
    const client = await db.prepare(
      `SELECT id, email, name, password_hash FROM clients WHERE email = $1`
    ).get(email.toLowerCase().trim());

    if (!client) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, client.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await db.prepare(`UPDATE clients SET last_login = NOW() WHERE id = $1`).run(client.id);

    const token = jwt.sign(
      { clientId: client.id, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      token,
      user: { id: client.id, email: client.email, name: client.name, role: 'client' },
    });
  } catch (err) {
    console.error('Client login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Accept invite - client sets password
 */
exports.acceptInvite = async (req, res) => {
  try {
    const { token, password, name } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password required' });
    }

    const db = getDatabase();
    const invite = await db.prepare(
      `SELECT id, email, used_at, expires_at FROM client_invites WHERE token = $1`
    ).get(token);

    if (!invite) return res.status(404).json({ error: 'Invalid or expired invite' });
    if (invite.used_at) return res.status(400).json({ error: 'Invite already used' });
    if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Invite has expired' });
    }

    const hash = await bcrypt.hash(password, 12);
    await db.prepare(
      `INSERT INTO clients (email, password_hash, name, invite_id)
       VALUES ($1, $2, $3, $4)`
    ).run(invite.email, hash, name || invite.email, invite.id);

    await db.prepare(`UPDATE client_invites SET used_at = NOW() WHERE id = $1`).run(invite.id);

    const client = await db.prepare(
      `SELECT id, email, name FROM clients WHERE email = $1`
    ).get(invite.email);

    await logActivity('client_invite_accepted', client.id, null, `Client ${client.email} joined via invite`, {});

    const jwtToken = jwt.sign(
      { clientId: client.id, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      token: jwtToken,
      user: { id: client.id, email: client.email, name: client.name, role: 'client' },
    });
  } catch (err) {
    console.error('Accept invite error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get current user (admin or client)
 */
exports.me = (req, res) => {
  res.json({ user: req.user });
};
