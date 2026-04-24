const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/candidates
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM candidates ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching candidates:', err);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// GET /api/candidates/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM candidates WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// POST /api/candidates
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, role_applied, experience_years, skills, current_company, expected_salary, status, notes, industry, region, role_level, linkedin, availability, resume_url } = req.body;
    const result = await pool.query(
      `INSERT INTO candidates (name, email, phone, role_applied, experience_years, skills, current_company, expected_salary, status, notes, industry, region, role_level, linkedin, availability, resume_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
      [name, email, phone, role_applied, experience_years, skills, current_company, expected_salary, status, notes, industry, region, role_level, linkedin, availability, resume_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating candidate:', err);
    res.status(500).json({ error: 'Failed to create' });
  }
});

// PUT /api/candidates/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role_applied, experience_years, skills, current_company, expected_salary, status, notes, industry, region, role_level, linkedin, availability, resume_url } = req.body;
    const result = await pool.query(
      `UPDATE candidates SET name = $1, email = $2, phone = $3, role_applied = $4, experience_years = $5, skills = $6, current_company = $7, expected_salary = $8, status = $9, notes = $10, industry = $11, region = $12, role_level = $13, linkedin = $14, availability = $15, resume_url = $16
       WHERE id = $17 RETURNING *`,
      [name, email, phone, role_applied, experience_years, skills, current_company, expected_salary, status, notes, industry, region, role_level, linkedin, availability, resume_url, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating candidate:', err);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// DELETE /api/candidates/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM candidates WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', data: result.rows[0] });
  } catch (err) {
    console.error('Error deleting candidate:', err);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
