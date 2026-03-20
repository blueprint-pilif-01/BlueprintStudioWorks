/**
 * Create first admin user (run once after migration)
 * Usage: node scripts/seed-admin.js
 * Set ADMIN_EMAIL and ADMIN_PASSWORD in .env or pass as args
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'blueprint_sw',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

async function seed() {
  const email = process.env.ADMIN_EMAIL || process.argv[2] || 'admin@blueprint.studio';
  const password = process.env.ADMIN_PASSWORD || process.argv[3] || 'Admin123!@#Blueprint';

  const hash = await bcrypt.hash(password, 12);
  const client = await pool.connect();

  try {
    const res = await client.query(
      `INSERT INTO users (email, password_hash, role)
       VALUES ($1, $2, 'admin')
       ON CONFLICT (email) DO UPDATE SET password_hash = $2
       RETURNING id, email`,
      [email, hash]
    );
    console.log('Admin created/updated:', res.rows[0].email);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
