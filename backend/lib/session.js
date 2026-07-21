const crypto = require('crypto');
const pool = require('../db');

const ISSUER = 'multiverse-consulting-local';
const AUDIENCE = 'multiverse-consulting-web';
const SESSION_SECONDS = 60 * 60;

function configuredSecret() {
  const value = process.env.SESSION_SECRET || process.env.JWT_SECRET || '';
  if (Buffer.byteLength(value) < 32) {
    const error = new Error('SESSION_SECRET must contain at least 32 bytes');
    error.status = 503;
    throw error;
  }
  return value;
}

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function sign(value) {
  return crypto.createHmac('sha256', configuredSecret()).update(value).digest('base64url');
}

function constantTimeEqual(left, right) {
  const a = Buffer.from(String(left || ''));
  const b = Buffer.from(String(right || ''));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function scrypt(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, value) => error ? reject(error) : resolve(value));
  });
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const digest = await scrypt(password, salt);
  return `scrypt$${salt.toString('base64url')}$${digest.toString('base64url')}`;
}

async function verifyPassword(password, encoded) {
  const [algorithm, saltValue, digestValue, extra] = String(encoded || '').split('$');
  if (algorithm !== 'scrypt' || !saltValue || !digestValue || extra) return false;
  const expected = Buffer.from(digestValue, 'base64url');
  const actual = await scrypt(password, Buffer.from(saltValue, 'base64url'));
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

async function authenticateCredentials(email, password, database = pool) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || typeof password !== 'string' || password.length > 128) {
    return null;
  }
  const result = await database.query(
    'SELECT id, email, password_hash, name, role, active FROM app_users WHERE email = $1',
    [normalizedEmail],
  );
  const user = result.rows[0];
  const fallback = 'scrypt$cnVudGltZS1mYWxsYmFjay1zYWx0$5PxpR9s7HXdJSsq9ExhKzk2xPS0rR04GKXliTOv7MmOyzaSIqahzOwBpRFewrGXEvv1hYaP7VfmW_5og8THdQQ';
  const valid = await verifyPassword(password, user?.password_hash || fallback);
  if (!user || !user.active || !valid) return null;
  return { id: String(user.id), email: user.email, name: user.name, role: user.role };
}

function createSessionToken({ id, email, role }) {
  const now = Math.floor(Date.now() / 1000);
  const header = encode({ alg: 'HS256', typ: 'JWT' });
  const payload = encode({
    sub: String(id),
    email,
    role,
    iss: ISSUER,
    aud: AUDIENCE,
    iat: now,
    exp: now + SESSION_SECONDS,
  });
  const unsigned = `${header}.${payload}`;
  return `${unsigned}.${sign(unsigned)}`;
}

function verifySessionToken(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3) throw new Error('Malformed session token');
  const unsigned = `${parts[0]}.${parts[1]}`;
  if (!constantTimeEqual(parts[2], sign(unsigned))) throw new Error('Invalid session signature');
  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  const now = Math.floor(Date.now() / 1000);
  if (payload.iss !== ISSUER || payload.aud !== AUDIENCE || !payload.sub || !payload.email || payload.exp <= now) {
    throw new Error('Invalid or expired session');
  }
  return { id: payload.sub, email: payload.email, role: payload.role, expiresAt: payload.exp };
}

function createRequireSession(database = pool) {
  return async function requireSession(req, res, next) {
  try {
    const match = /^Bearer\s+(.+)$/i.exec(req.get('authorization') || '');
    if (!match) return res.status(401).json({ error: 'Authentication required' });
    const claims = verifySessionToken(match[1]);
    const result = await database.query(
      'SELECT id, email, role FROM app_users WHERE id = $1 AND email = $2 AND active = TRUE',
      [claims.id, claims.email],
    );
    const user = result.rows[0];
    if (!user || user.role !== claims.role) return res.status(401).json({ error: 'Invalid or expired session' });
    req.session = { id: String(user.id), email: user.email, role: user.role, expiresAt: claims.expiresAt };
    return next();
  } catch (error) {
    if (error.status === 503) return res.status(503).json({ error: error.message });
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
  };
}

const requireSession = createRequireSession();

module.exports = {
  authenticateCredentials,
  createRequireSession,
  createSessionToken,
  hashPassword,
  verifyPassword,
  verifySessionToken,
  requireSession,
};
