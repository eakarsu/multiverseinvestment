const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/talent
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM talent ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching talent:', err);
    res.status(500).json({ error: 'Failed to fetch talent' });
  }
});

// GET /api/talent/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM talent WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Talent not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching talent:', err);
    res.status(500).json({ error: 'Failed to fetch talent' });
  }
});

// POST /api/talent
router.post('/', async (req, res) => {
  try {
    const { name, email, role, skills, experience_years, hourly_rate, status, bio } = req.body;
    const result = await pool.query(
      'INSERT INTO talent (name, email, role, skills, experience_years, hourly_rate, status, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, email, role, skills, experience_years, hourly_rate, status || 'available', bio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating talent:', err);
    res.status(500).json({ error: 'Failed to create talent' });
  }
});

// PUT /api/talent/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, skills, experience_years, hourly_rate, status, bio } = req.body;
    const result = await pool.query(
      'UPDATE talent SET name = $1, email = $2, role = $3, skills = $4, experience_years = $5, hourly_rate = $6, status = $7, bio = $8 WHERE id = $9 RETURNING *',
      [name, email, role, skills, experience_years, hourly_rate, status, bio, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Talent not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating talent:', err);
    res.status(500).json({ error: 'Failed to update talent' });
  }
});

// DELETE /api/talent/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM talent WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Talent not found' });
    }
    res.json({ message: 'Talent deleted', talent: result.rows[0] });
  } catch (err) {
    console.error('Error deleting talent:', err);
    res.status(500).json({ error: 'Failed to delete talent' });
  }
});

module.exports = router;
