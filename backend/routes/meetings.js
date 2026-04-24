const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/meetings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM meetings ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching meetings:', err);
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
});

// GET /api/meetings/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM meetings WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// POST /api/meetings
router.post('/', async (req, res) => {
  try {
    const { title, attendees, meeting_date, meeting_time, location, type, status, agenda, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO meetings (title, attendees, meeting_date, meeting_time, location, type, status, agenda, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, attendees, meeting_date, meeting_time, location, type, status, agenda, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating meeting:', err);
    res.status(500).json({ error: 'Failed to create' });
  }
});

// PUT /api/meetings/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, attendees, meeting_date, meeting_time, location, type, status, agenda, notes } = req.body;
    const result = await pool.query(
      `UPDATE meetings SET title = $1, attendees = $2, meeting_date = $3, meeting_time = $4, location = $5, type = $6, status = $7, agenda = $8, notes = $9
       WHERE id = $10 RETURNING *`,
      [title, attendees, meeting_date, meeting_time, location, type, status, agenda, notes, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating meeting:', err);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// DELETE /api/meetings/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM meetings WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', data: result.rows[0] });
  } catch (err) {
    console.error('Error deleting meeting:', err);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
