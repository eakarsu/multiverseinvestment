const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/companies
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM companies ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// GET /api/companies/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// POST /api/companies
router.post('/', async (req, res) => {
  try {
    const { name, industry, size, website, headquarters, revenue, relationship, contact_person, phone, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO companies (name, industry, size, website, headquarters, revenue, relationship, contact_person, phone, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [name, industry, size, website, headquarters, revenue, relationship, contact_person, phone, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating company:', err);
    res.status(500).json({ error: 'Failed to create' });
  }
});

// PUT /api/companies/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, industry, size, website, headquarters, revenue, relationship, contact_person, phone, notes } = req.body;
    const result = await pool.query(
      `UPDATE companies SET name = $1, industry = $2, size = $3, website = $4, headquarters = $5, revenue = $6, relationship = $7, contact_person = $8, phone = $9, notes = $10
       WHERE id = $11 RETURNING *`,
      [name, industry, size, website, headquarters, revenue, relationship, contact_person, phone, notes, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating company:', err);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// DELETE /api/companies/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM companies WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', data: result.rows[0] });
  } catch (err) {
    console.error('Error deleting company:', err);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
