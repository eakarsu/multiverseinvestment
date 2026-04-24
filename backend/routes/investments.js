const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/investments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM investments ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching investments:', err);
    res.status(500).json({ error: 'Failed to fetch investments' });
  }
});

// GET /api/investments/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM investments WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Investment not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching investment:', err);
    res.status(500).json({ error: 'Failed to fetch investment' });
  }
});

// POST /api/investments
router.post('/', async (req, res) => {
  try {
    const { name, type, amount, target_return, risk_level, status, sector, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO investments (name, type, amount, target_return, risk_level, status, sector, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, type, amount, target_return, risk_level, status || 'evaluating', sector, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating investment:', err);
    res.status(500).json({ error: 'Failed to create investment' });
  }
});

// PUT /api/investments/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, amount, target_return, risk_level, status, sector, notes } = req.body;
    const result = await pool.query(
      'UPDATE investments SET name = $1, type = $2, amount = $3, target_return = $4, risk_level = $5, status = $6, sector = $7, notes = $8 WHERE id = $9 RETURNING *',
      [name, type, amount, target_return, risk_level, status, sector, notes, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Investment not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating investment:', err);
    res.status(500).json({ error: 'Failed to update investment' });
  }
});

// DELETE /api/investments/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM investments WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Investment not found' });
    }
    res.json({ message: 'Investment deleted', investment: result.rows[0] });
  } catch (err) {
    console.error('Error deleting investment:', err);
    res.status(500).json({ error: 'Failed to delete investment' });
  }
});

module.exports = router;
