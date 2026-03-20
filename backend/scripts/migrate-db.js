/**
 * Migration: Create all tables for Blueprint portal
 * Database: blueprint_sw
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'blueprint_sw',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

async function migrate() {
  const client = await pool.connect();

  try {
    console.log('Blueprint DB Migration\n');

    // 1. users (admin)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `);
    console.log('  users');

    // 2. client_invites
    await client.query(`
      CREATE TABLE IF NOT EXISTS client_invites (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        token VARCHAR(64) UNIQUE NOT NULL,
        expires_at TIMESTAMP,
        used_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  client_invites');

    // 3. clients
    await client.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        invite_id INTEGER REFERENCES client_invites(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `);
    console.log('  clients');

    // 4. client_sites (which sites each client can access)
    await client.query(`
      CREATE TABLE IF NOT EXISTS client_sites (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        site_slug VARCHAR(100) NOT NULL,
        UNIQUE(client_id, site_slug)
      )
    `);
    console.log('  client_sites');

    // 5. contract_templates (with background_image_path)
    await client.query(`
      CREATE TABLE IF NOT EXISTS contract_templates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        raw_text TEXT NOT NULL,
        fields TEXT DEFAULT '[]',
        signature_blocks TEXT DEFAULT '[]',
        nickname VARCHAR(255),
        background_image_path VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  contract_templates');

    // 6. Contract number sequence for BLU-CON-001, 002, ...
    await client.query(`
      CREATE SEQUENCE IF NOT EXISTS contract_number_seq START 1
    `);
    console.log('  contract_number_seq');

    // 7. contract_invites (with contract_number)
    await client.query(`
      CREATE TABLE IF NOT EXISTS contract_invites (
        id SERIAL PRIMARY KEY,
        template_id INTEGER NOT NULL REFERENCES contract_templates(id) ON DELETE CASCADE,
        client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
        token VARCHAR(64) UNIQUE NOT NULL,
        code VARCHAR(8) UNIQUE NOT NULL,
        contract_number VARCHAR(20) UNIQUE,
        expires_at TIMESTAMP,
        max_uses INTEGER DEFAULT NULL,
        uses_count INTEGER DEFAULT 0,
        is_disabled BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  contract_invites');

    // 8. contract_signers
    await client.query(`
      CREATE TABLE IF NOT EXISTS contract_signers (
        id SERIAL PRIMARY KEY,
        identity_key_hash VARCHAR(64) UNIQUE NOT NULL,
        signer_code VARCHAR(12) UNIQUE NOT NULL,
        signer_secret VARCHAR(64) NOT NULL,
        saved_fields TEXT DEFAULT '{}',
        cnp_last4 VARCHAR(4),
        last_signature BYTEA,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  contract_signers');

    // 9. contract_submissions
    await client.query(`
      CREATE TABLE IF NOT EXISTS contract_submissions (
        id SERIAL PRIMARY KEY,
        template_id INTEGER REFERENCES contract_templates(id),
        invite_id INTEGER REFERENCES contract_invites(id),
        signer_id INTEGER REFERENCES contract_signers(id),
        filled_fields TEXT NOT NULL,
        rendered_text TEXT NOT NULL,
        signature_image BYTEA,
        status VARCHAR(20) DEFAULT 'SIGNED',
        pdf_data BYTEA,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        signed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  contract_submissions');

    // 10. notes
    await client.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  notes');

    // 11. todos
    await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        site_slug VARCHAR(100),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        priority VARCHAR(20) DEFAULT 'medium',
        status VARCHAR(20) DEFAULT 'todo',
        source_note_id INTEGER REFERENCES notes(id) ON DELETE SET NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  todos');

    // 12. packages (dynamic packages from pricing page)
    await client.query(`
      CREATE TABLE IF NOT EXISTS packages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('plan', 'addon')),
        name_ro VARCHAR(255) NOT NULL,
        name_en VARCHAR(255) NOT NULL,
        badge_ro VARCHAR(255),
        badge_en VARCHAR(255),
        price DECIMAL(10,2) NOT NULL,
        period VARCHAR(20),
        original_price DECIMAL(10,2),
        description_ro TEXT,
        description_en TEXT,
        features_ro TEXT DEFAULT '[]',
        features_en TEXT DEFAULT '[]',
        is_popular BOOLEAN DEFAULT FALSE,
        is_discount BOOLEAN DEFAULT FALSE,
        discount_label_ro VARCHAR(100),
        discount_label_en VARCHAR(100),
        note_ro TEXT,
        note_en TEXT,
        sort_order INTEGER DEFAULT 0,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  packages');

    // 13. client_packages (assigned/chosen packages per client)
    await client.query(`
      CREATE TABLE IF NOT EXISTS client_packages (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        package_id INTEGER NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
        assigned_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'pending_signature' CHECK (status IN ('pending_signature', 'active', 'expired', 'cancelled')),
        contract_submission_id INTEGER REFERENCES contract_submissions(id) ON DELETE SET NULL,
        started_at TIMESTAMP,
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `    );
    console.log('  client_packages');

    // 14. project_milestones (progress tracker per client)
    await client.query(`
      CREATE TABLE IF NOT EXISTS project_milestones (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
        sort_order INTEGER DEFAULT 0,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  project_milestones');

    // 15. activity_log
    await client.query(`
      CREATE TABLE IF NOT EXISTS activity_log (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
        admin_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(80) NOT NULL,
        description TEXT,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  activity_log');

    // 16. feedback (client feedback per site)
    await client.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        site_slug VARCHAR(100),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'resolved')),
        admin_reply TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  feedback');

    // Add site_url and site_label to client_sites (external URL support)
    try {
      const hasSiteUrl = await client.query(`
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'client_sites' AND column_name = 'site_url'
      `);
      if (hasSiteUrl.rows.length === 0) {
        await client.query(`ALTER TABLE client_sites ADD COLUMN site_url TEXT`);
        await client.query(`ALTER TABLE client_sites ADD COLUMN site_label VARCHAR(255)`);
        console.log('  + client_sites.site_url, site_label');
      }
    } catch (e) {
      console.warn('client_sites columns:', e.message);
    }

    // Add client_package_id to contract_invites (links contract to client_package)
    try {
      const hasCol = await client.query(`
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'contract_invites' AND column_name = 'client_package_id'
      `);
      if (hasCol.rows.length === 0) {
        await client.query(`ALTER TABLE contract_invites ADD COLUMN client_package_id INTEGER REFERENCES client_packages(id) ON DELETE SET NULL`);
      }
    } catch (e) {
      console.warn('contract_invites.client_package_id:', e.message);
    }

    // Indexes
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_client_invites_token ON client_invites(token)',
      'CREATE INDEX IF NOT EXISTS idx_client_sites_client ON client_sites(client_id)',
      'CREATE INDEX IF NOT EXISTS idx_contract_invites_template ON contract_invites(template_id)',
      'CREATE INDEX IF NOT EXISTS idx_contract_invites_token ON contract_invites(token)',
      'CREATE INDEX IF NOT EXISTS idx_contract_submissions_invite ON contract_submissions(invite_id)',
      'CREATE INDEX IF NOT EXISTS idx_notes_client ON notes(client_id)',
      'CREATE INDEX IF NOT EXISTS idx_todos_client ON todos(client_id)',
      'CREATE INDEX IF NOT EXISTS idx_packages_active ON packages(active)',
      'CREATE INDEX IF NOT EXISTS idx_client_packages_client ON client_packages(client_id)',
      'CREATE INDEX IF NOT EXISTS idx_project_milestones_client ON project_milestones(client_id)',
      'CREATE INDEX IF NOT EXISTS idx_activity_log_client ON activity_log(client_id)',
      'CREATE INDEX IF NOT EXISTS idx_activity_log_created ON activity_log(created_at DESC)',
    ];
    for (const q of indexes) {
      try {
        await client.query(q);
      } catch (e) {
        if (!e.message.includes('already exists')) console.warn('Index:', e.message);
      }
    }
    console.log('  indexes');

    console.log('\nMigration completed.');
  } catch (err) {
    console.error('Migration failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
