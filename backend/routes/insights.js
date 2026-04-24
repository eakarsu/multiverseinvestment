const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/insights
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM insights ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching insights:', err);
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

// GET /api/insights/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM insights WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Insight not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching insight:', err);
    res.status(500).json({ error: 'Failed to fetch insight' });
  }
});

// POST /api/insights
router.post('/', async (req, res) => {
  try {
    const { title, category, author, summary, content, tags, industry, region, status, published_date, views } = req.body;
    const result = await pool.query(
      'INSERT INTO insights (title, category, author, summary, content, tags, industry, region, status, published_date, views) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [title, category, author, summary, content, tags, industry, region, status || 'draft', published_date, views || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating insight:', err);
    res.status(500).json({ error: 'Failed to create insight' });
  }
});

// PUT /api/insights/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, author, summary, content, tags, industry, region, status, published_date, views } = req.body;
    const result = await pool.query(
      'UPDATE insights SET title = $1, category = $2, author = $3, summary = $4, content = $5, tags = $6, industry = $7, region = $8, status = $9, published_date = $10, views = $11 WHERE id = $12 RETURNING *',
      [title, category, author, summary, content, tags, industry, region, status, published_date, views, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Insight not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating insight:', err);
    res.status(500).json({ error: 'Failed to update insight' });
  }
});

// DELETE /api/insights/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM insights WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Insight not found' });
    }
    res.json({ message: 'Insight deleted', insight: result.rows[0] });
  } catch (err) {
    console.error('Error deleting insight:', err);
    res.status(500).json({ error: 'Failed to delete insight' });
  }
});

module.exports = router;
