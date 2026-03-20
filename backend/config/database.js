const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'blueprint_sw',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

let dbWrapper = null;

function createStatement(sql) {
  return {
    get: async function (...params) {
      try {
        const result = await pool.query(sql, params);
        return result.rows[0] || undefined;
      } catch (err) {
        console.error('SQL Error in get():', sql, params, err.message);
        throw err;
      }
    },
    all: async function (...params) {
      try {
        const result = await pool.query(sql, params);
        return result.rows;
      } catch (err) {
        console.error('SQL Error in all():', sql, params, err.message);
        throw err;
      }
    },
    run: async function (...params) {
      try {
        const result = await pool.query(sql, params);
        return {
          changes: result.rowCount,
          lastInsertRowid: result.rows[0]?.id || 0,
        };
      } catch (err) {
        console.error('SQL Error in run():', sql, params, err.message);
        throw err;
      }
    },
  };
}

function createDatabaseWrapper() {
  return {
    prepare: function (sql) {
      let paramIndex = 0;
      const pgSql = sql.replace(/\?/g, () => `$${++paramIndex}`);
      return createStatement(pgSql);
    },
    query: async function (sql, params = []) {
      return await pool.query(sql, params);
    },
  };
}

async function initDatabaseAsync() {
  if (dbWrapper) return dbWrapper;
  console.log('Connecting to PostgreSQL (blueprint_sw)...');
  try {
    const client = await pool.connect();
    console.log('Database connected');
    client.release();
    dbWrapper = createDatabaseWrapper();
    return dbWrapper;
  } catch (err) {
    console.error('Failed to connect:', err.message);
    throw err;
  }
}

function getDatabase() {
  if (!dbWrapper) throw new Error('Database not initialized');
  return dbWrapper;
}

async function closeDatabase() {
  if (dbWrapper) {
    await pool.end();
    dbWrapper = null;
  }
}

module.exports = { getDatabase, closeDatabase, initDatabaseAsync, pool };
