const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/revenue
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM revenue ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching revenue:', err);
    res.status(500).json({ error: 'Failed to fetch revenue' });
  }
});

// GET /api/revenue/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM revenue WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Revenue record not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching revenue:', err);
    res.status(500).json({ error: 'Failed to fetch revenue record' });
  }
});

// POST /api/revenue
router.post('/', async (req, res) => {
  try {
    const { source, client_name, amount, type, date, quarter, status, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO revenue (source, client_name, amount, type, date, quarter, status, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [source, client_name, amount, type, date, quarter, status || 'received', notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating revenue:', err);
    res.status(500).json({ error: 'Failed to create revenue record' });
  }
});

// PUT /api/revenue/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { source, client_name, amount, type, date, quarter, status, notes } = req.body;
    const result = await pool.query(
      'UPDATE revenue SET source = $1, client_name = $2, amount = $3, type = $4, date = $5, quarter = $6, status = $7, notes = $8 WHERE id = $9 RETURNING *',
      [source, client_name, amount, type, date, quarter, status, notes, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Revenue record not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating revenue:', err);
    res.status(500).json({ error: 'Failed to update revenue record' });
  }
});

// DELETE /api/revenue/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM revenue WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Revenue record not found' });
    }
    res.json({ message: 'Revenue record deleted', revenue: result.rows[0] });
  } catch (err) {
    console.error('Error deleting revenue:', err);
    res.status(500).json({ error: 'Failed to delete revenue record' });
  }
});

module.exports = router;
