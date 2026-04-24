const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/pipeline
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pipeline ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching pipeline deals:', err);
    res.status(500).json({ error: 'Failed to fetch pipeline deals' });
  }
});

// GET /api/pipeline/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM pipeline WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching deal:', err);
    res.status(500).json({ error: 'Failed to fetch deal' });
  }
});

// POST /api/pipeline
router.post('/', async (req, res) => {
  try {
    const { deal_name, client_name, contact_email, stage, value, service_type, source, region, probability, expected_close, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO pipeline (deal_name, client_name, contact_email, stage, value, service_type, source, region, probability, expected_close, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [deal_name, client_name, contact_email, stage || 'inquiry', value, service_type, source, region, probability || 20, expected_close, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating deal:', err);
    res.status(500).json({ error: 'Failed to create deal' });
  }
});

// PUT /api/pipeline/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { deal_name, client_name, contact_email, stage, value, service_type, source, region, probability, expected_close, notes } = req.body;
    const result = await pool.query(
      'UPDATE pipeline SET deal_name = $1, client_name = $2, contact_email = $3, stage = $4, value = $5, service_type = $6, source = $7, region = $8, probability = $9, expected_close = $10, notes = $11 WHERE id = $12 RETURNING *',
      [deal_name, client_name, contact_email, stage, value, service_type, source, region, probability, expected_close, notes, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating deal:', err);
    res.status(500).json({ error: 'Failed to update deal' });
  }
});

// DELETE /api/pipeline/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM pipeline WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json({ message: 'Deal deleted', deal: result.rows[0] });
  } catch (err) {
    console.error('Error deleting deal:', err);
    res.status(500).json({ error: 'Failed to delete deal' });
  }
});

module.exports = router;
