const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/case-studies
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM case_studies ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching case studies:', err);
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
});

// GET /api/case-studies/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM case_studies WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching case study:', err);
    res.status(500).json({ error: 'Failed to fetch case study' });
  }
});

// POST /api/case-studies
router.post('/', async (req, res) => {
  try {
    const { title, client_name, industry, region, challenge, solution, results, services_used, duration, value_delivered, status, published_date } = req.body;
    const result = await pool.query(
      'INSERT INTO case_studies (title, client_name, industry, region, challenge, solution, results, services_used, duration, value_delivered, status, published_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [title, client_name, industry, region, challenge, solution, results, services_used, duration, value_delivered, status || 'draft', published_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating case study:', err);
    res.status(500).json({ error: 'Failed to create case study' });
  }
});

// PUT /api/case-studies/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, client_name, industry, region, challenge, solution, results, services_used, duration, value_delivered, status, published_date } = req.body;
    const result = await pool.query(
      'UPDATE case_studies SET title = $1, client_name = $2, industry = $3, region = $4, challenge = $5, solution = $6, results = $7, services_used = $8, duration = $9, value_delivered = $10, status = $11, published_date = $12 WHERE id = $13 RETURNING *',
      [title, client_name, industry, region, challenge, solution, results, services_used, duration, value_delivered, status, published_date, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating case study:', err);
    res.status(500).json({ error: 'Failed to update case study' });
  }
});

// DELETE /api/case-studies/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM case_studies WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    res.json({ message: 'Case study deleted', caseStudy: result.rows[0] });
  } catch (err) {
    console.error('Error deleting case study:', err);
    res.status(500).json({ error: 'Failed to delete case study' });
  }
});

module.exports = router;
