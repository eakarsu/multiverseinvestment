const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/kpis
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kpis ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching KPIs:', err);
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
});

// GET /api/kpis/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM kpis WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'KPI not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching KPI:', err);
    res.status(500).json({ error: 'Failed to fetch KPI' });
  }
});

// POST /api/kpis
router.post('/', async (req, res) => {
  try {
    const { name, category, value, target, unit, trend, period, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO kpis (name, category, value, target, unit, trend, period, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, category, value, target, unit, trend, period, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating KPI:', err);
    res.status(500).json({ error: 'Failed to create KPI' });
  }
});

// PUT /api/kpis/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, value, target, unit, trend, period, notes } = req.body;
    const result = await pool.query(
      'UPDATE kpis SET name = $1, category = $2, value = $3, target = $4, unit = $5, trend = $6, period = $7, notes = $8 WHERE id = $9 RETURNING *',
      [name, category, value, target, unit, trend, period, notes, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'KPI not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating KPI:', err);
    res.status(500).json({ error: 'Failed to update KPI' });
  }
});

// DELETE /api/kpis/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM kpis WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'KPI not found' });
    }
    res.json({ message: 'KPI deleted', kpi: result.rows[0] });
  } catch (err) {
    console.error('Error deleting KPI:', err);
    res.status(500).json({ error: 'Failed to delete KPI' });
  }
});

module.exports = router;
