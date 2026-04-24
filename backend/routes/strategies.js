const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/strategies
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM strategies ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching strategies:', err);
    res.status(500).json({ error: 'Failed to fetch strategies' });
  }
});

// GET /api/strategies/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM strategies WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Strategy not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching strategy:', err);
    res.status(500).json({ error: 'Failed to fetch strategy' });
  }
});

// POST /api/strategies
router.post('/', async (req, res) => {
  try {
    const { title, client_name, objective, approach, timeline, status, kpi_targets } = req.body;
    const result = await pool.query(
      'INSERT INTO strategies (title, client_name, objective, approach, timeline, status, kpi_targets) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, client_name, objective, approach, timeline, status || 'draft', kpi_targets]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating strategy:', err);
    res.status(500).json({ error: 'Failed to create strategy' });
  }
});

// PUT /api/strategies/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, client_name, objective, approach, timeline, status, kpi_targets } = req.body;
    const result = await pool.query(
      'UPDATE strategies SET title = $1, client_name = $2, objective = $3, approach = $4, timeline = $5, status = $6, kpi_targets = $7 WHERE id = $8 RETURNING *',
      [title, client_name, objective, approach, timeline, status, kpi_targets, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Strategy not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating strategy:', err);
    res.status(500).json({ error: 'Failed to update strategy' });
  }
});

// DELETE /api/strategies/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM strategies WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Strategy not found' });
    }
    res.json({ message: 'Strategy deleted', strategy: result.rows[0] });
  } catch (err) {
    console.error('Error deleting strategy:', err);
    res.status(500).json({ error: 'Failed to delete strategy' });
  }
});

module.exports = router;
