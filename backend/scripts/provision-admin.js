#!/usr/bin/env node
const pool = require('../db');
const { hashPassword } = require('../lib/session');

const email = String(
  process.env.BOOTSTRAP_ADMIN_EMAIL || process.env.PROVISION_ADMIN_EMAIL || '',
).trim().toLowerCase();
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD || process.env.PROVISION_ADMIN_PASSWORD || '';
const name = String(
  process.env.BOOTSTRAP_ADMIN_NAME || process.env.PROVISION_ADMIN_NAME || 'Local Administrator',
).trim();

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  throw new Error('BOOTSTRAP_ADMIN_EMAIL must be a valid email address');
}
if (password.length < 12 || password.length > 128 || !/[a-z]/.test(password)
  || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
  throw new Error('BOOTSTRAP_ADMIN_PASSWORD must contain 12-128 characters with upper-case, lower-case, and numeric characters');
}
if (name.length < 2 || name.length > 120) {
  throw new Error('BOOTSTRAP_ADMIN_NAME must contain 2-120 characters');
}

async function provision() {
  const passwordHash = await hashPassword(password);
  const result = await pool.query(
    `INSERT INTO app_users (email, password_hash, name, role, active)
     VALUES ($1, $2, $3, 'admin', TRUE)
     ON CONFLICT (email) DO NOTHING
     RETURNING id`,
    [email, passwordHash, name],
  );
  console.log(result.rowCount ? `Administrator identity created for ${email}` : `Administrator identity already exists for ${email}`);
}

provision()
  .catch((error) => {
    console.error(`Administrator bootstrap failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
