require('dotenv').config({ path: require('path').join(__dirname, '.env'), override: true });
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
let lastEmailVerify = { configured: false, ok: false, error: 'Email transport not checked yet' };

const defaultCorsOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://blueprintstudioworks.ro',
  'https://www.blueprintstudioworks.ro',
  'https://blueprint-studio-works.ro',
  'https://www.blueprint-studio-works.ro',
];
const configuredCorsOrigins = [process.env.CORS_ORIGIN, process.env.FRONTEND_URL]
  .filter(Boolean)
  .join(',')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const corsOrigins = [...new Set([...configuredCorsOrigins, ...defaultCorsOrigins])];

app.use(cors({
  origin(origin, callback) {
    if (!origin || corsOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/contracts', contractsRoutes);
app.use('/api/public', publicRoutes);

const { verifyEmailTransport, isEmailConfigured, getEmailConfigStatus } = require('./lib/email');

app.get('/api/health', (req, res) => {
  const email = getEmailConfigStatus();
  res.json({
    ok: true,
    email: isEmailConfigured(),
    emailConfigured: email.configured,
    emailError: email.configured ? null : email.error,
    emailVerified: lastEmailVerify.ok,
    emailVerifyError: lastEmailVerify.ok ? null : lastEmailVerify.error,
  });
});

app.get('/api/health/email', async (req, res) => {
  lastEmailVerify = await verifyEmailTransport();
  res.json({
    ok: true,
    emailConfigured: isEmailConfigured(),
    emailVerified: lastEmailVerify.ok,
    emailError: lastEmailVerify.ok ? null : lastEmailVerify.error,
  });
});

async function start() {
  try {
    log('Connecting to database...');
    await initDatabaseAsync();
    log('Database connected');

    lastEmailVerify = await verifyEmailTransport();
    if (lastEmailVerify.ok) {
      log(`[email] SMTP ready — sending as ${process.env.SMTP_USER}, admin inbox: ${process.env.ADMIN_EMAIL || process.env.SMTP_USER}`);
    } else {
      log(`[email] *** NOT WORKING *** ${lastEmailVerify.error}`);
      log('[email] Contact form + all notifications WILL FAIL until SMTP_HOST/SMTP_USER/SMTP_PASS are set correctly in backend/.env or the production environment');
    }

    app.listen(PORT, () => log(`Blueprint API listening on port ${PORT}`));
  } catch (err) {
    log(`FATAL start error: ${err.stack || err.message || err}`);
    process.exit(1);
  }
}

start();
