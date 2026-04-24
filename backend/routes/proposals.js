const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/proposals
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proposals ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching proposals:', err);
    res.status(500).json({ error: 'Failed to fetch proposals' });
  }
});

// GET /api/proposals/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM proposals WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proposal not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching proposal:', err);
    res.status(500).json({ error: 'Failed to fetch proposal' });
  }
});

// POST /api/proposals
router.post('/', async (req, res) => {
  try {
    const { title, client_name, value, status, submitted_date, description } = req.body;
    const result = await pool.query(
      'INSERT INTO proposals (title, client_name, value, status, submitted_date, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, client_name, value, status || 'draft', submitted_date, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating proposal:', err);
    res.status(500).json({ error: 'Failed to create proposal' });
  }
});

// PUT /api/proposals/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, client_name, value, status, submitted_date, description } = req.body;
    const result = await pool.query(
      'UPDATE proposals SET title = $1, client_name = $2, value = $3, status = $4, submitted_date = $5, description = $6 WHERE id = $7 RETURNING *',
      [title, client_name, value, status, submitted_date, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proposal not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating proposal:', err);
    res.status(500).json({ error: 'Failed to update proposal' });
  }
});

// DELETE /api/proposals/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM proposals WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proposal not found' });
    }
    res.json({ message: 'Proposal deleted', proposal: result.rows[0] });
  } catch (err) {
    console.error('Error deleting proposal:', err);
    res.status(500).json({ error: 'Failed to delete proposal' });
  }
});

module.exports = router;
