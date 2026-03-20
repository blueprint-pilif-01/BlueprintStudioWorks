require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const logFile = path.join(__dirname, 'startup.log');
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  try { fs.appendFileSync(logFile, line); } catch (_) { /* ignore */ }
  console.log(msg);
}

process.on('uncaughtException', (err) => { log(`UNCAUGHT: ${err.stack || err}`); process.exit(1); });
process.on('unhandledRejection', (err) => { log(`UNHANDLED: ${err?.stack || err}`); });

log('Starting server...');
log(`Node ${process.version}, cwd: ${process.cwd()}, __dirname: ${__dirname}`);
log(`ENV: DB_HOST=${process.env.DB_HOST}, DB_NAME=${process.env.DB_NAME}, PORT=${process.env.PORT}`);

let initDatabaseAsync;
try {
  ({ initDatabaseAsync } = require('./config/database'));
  log('Database module loaded');
} catch (e) {
  log(`FATAL: Cannot load database module: ${e.message}`);
  process.exit(1);
}

let authRoutes, clientsRoutes, portalRoutes, packagesRoutes, contractsRoutes, publicRoutes;
try {
  authRoutes = require('./routes/auth');
  clientsRoutes = require('./routes/clients');
  portalRoutes = require('./routes/portal');
  packagesRoutes = require('./routes/packages');
  contractsRoutes = require('./routes/contracts');
  publicRoutes = require('./routes/public');
  log('All route modules loaded');
} catch (e) {
  log(`FATAL: Cannot load routes: ${e.stack || e.message}`);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

const corsOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
app.use(cors({ origin: corsOrigins.length ? corsOrigins : true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/contracts', contractsRoutes);
app.use('/api/public', publicRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

async function start() {
  try {
    log('Connecting to database...');
    await initDatabaseAsync();
    log('Database connected');
    app.listen(PORT, () => log(`Blueprint API listening on port ${PORT}`));
  } catch (err) {
    log(`FATAL start error: ${err.stack || err.message || err}`);
    process.exit(1);
  }
}

start();
