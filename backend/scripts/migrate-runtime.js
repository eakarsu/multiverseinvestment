#!/usr/bin/env node
const pool = require('../db');

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_users (
      id BIGSERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name VARCHAR(120) NOT NULL,
      role VARCHAR(40) NOT NULL DEFAULT 'admin',
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS runtime_ai_results (
      id UUID PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES app_users(id),
      feature VARCHAR(80) NOT NULL,
      prompt TEXT NOT NULL,
      content TEXT NOT NULL,
      provider VARCHAR(32) NOT NULL CHECK (provider='openrouter'),
      model VARCHAR(160) NOT NULL,
      provider_response_id VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS runtime_ai_results_user_created_idx
      ON runtime_ai_results(user_id, created_at DESC);
  `);
  console.log('Runtime schema is ready');
}

migrate()
  .catch((error) => { console.error(error.message); process.exitCode = 1; })
  .finally(() => pool.end());
