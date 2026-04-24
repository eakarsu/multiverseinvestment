const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/partners
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM partners ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching partners:', err);
    res.status(500).json({ error: 'Failed to fetch partners' });
  }
});

// GET /api/partners/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM partners WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// POST /api/partners
router.post('/', async (req, res) => {
  try {
    const { name, type, contact_person, email, phone, region, status, partnership_value, description } = req.body;
    const result = await pool.query(
      `INSERT INTO partners (name, type, contact_person, email, phone, region, status, partnership_value, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, type, contact_person, email, phone, region, status, partnership_value, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating partner:', err);
    res.status(500).json({ error: 'Failed to create' });
  }
});

// PUT /api/partners/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, contact_person, email, phone, region, status, partnership_value, description } = req.body;
    const result = await pool.query(
      `UPDATE partners SET name = $1, type = $2, contact_person = $3, email = $4, phone = $5, region = $6, status = $7, partnership_value = $8, description = $9
       WHERE id = $10 RETURNING *`,
      [name, type, contact_person, email, phone, region, status, partnership_value, description, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating partner:', err);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// DELETE /api/partners/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM partners WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', data: result.rows[0] });
  } catch (err) {
    console.error('Error deleting partner:', err);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
