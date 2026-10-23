'use strict';
const express = require('express');
const pool = require('../db');
const fp = require('../lib/feature-pack');
const router = express.Router();
// Authenticated by requireSession mounted in server.js before /api.
async function grounded(feature, fallbackFn, table, promptLabel) {
  const { rows } = await pool.query(`SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 200`);
  if (!fp.hasProvider()) return fallbackFn(rows);
  return fp.callProvider({ feature, prompt: `${promptLabel}\nRecords: ${JSON.stringify(rows).slice(0, 6000)}` });
}
router.post('/ai/client-health', async (req, res, next) => { try { res.json(await grounded('client-health', fp.fallbackClientHealth, 'clients', 'Summarise client health')); } catch (e) { next(e); } });
router.post('/ai/pipeline-health', async (req, res, next) => { try { res.json(await grounded('pipeline-health', fp.fallbackPipelineHealth, 'pipeline', 'Summarise pipeline health')); } catch (e) { next(e); } });
router.post('/ai/task-focus', async (req, res, next) => { try { res.json(await grounded('task-focus', fp.fallbackTaskFocus, 'tasks', 'Prioritise tasks')); } catch (e) { next(e); } });
module.exports = router;
