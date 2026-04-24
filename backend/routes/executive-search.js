const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/executive-search
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM executive_search ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching executive searches:', err);
    res.status(500).json({ error: 'Failed to fetch executive searches' });
  }
});

// GET /api/executive-search/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM executive_search WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Executive search not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching executive search:', err);
    res.status(500).json({ error: 'Failed to fetch executive search' });
  }
});

// POST /api/executive-search
router.post('/', async (req, res) => {
  try {
    const { position_title, client_name, role_level, department, compensation_min, compensation_max, required_skills, location, status, candidates_sourced, source_channels, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO executive_search (position_title, client_name, role_level, department, compensation_min, compensation_max, required_skills, location, status, candidates_sourced, source_channels, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [position_title, client_name, role_level, department, compensation_min, compensation_max, required_skills, location, status || 'open', candidates_sourced || 0, source_channels, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating executive search:', err);
    res.status(500).json({ error: 'Failed to create executive search' });
  }
});

// PUT /api/executive-search/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { position_title, client_name, role_level, department, compensation_min, compensation_max, required_skills, location, status, candidates_sourced, source_channels, notes } = req.body;
    const result = await pool.query(
      'UPDATE executive_search SET position_title = $1, client_name = $2, role_level = $3, department = $4, compensation_min = $5, compensation_max = $6, required_skills = $7, location = $8, status = $9, candidates_sourced = $10, source_channels = $11, notes = $12 WHERE id = $13 RETURNING *',
      [position_title, client_name, role_level, department, compensation_min, compensation_max, required_skills, location, status, candidates_sourced, source_channels, notes, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Executive search not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating executive search:', err);
    res.status(500).json({ error: 'Failed to update executive search' });
  }
});

// DELETE /api/executive-search/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM executive_search WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Executive search not found' });
    }
    res.json({ message: 'Executive search deleted', executiveSearch: result.rows[0] });
  } catch (err) {
    console.error('Error deleting executive search:', err);
    res.status(500).json({ error: 'Failed to delete executive search' });
  }
});

module.exports = router;
