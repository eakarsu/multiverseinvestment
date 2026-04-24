const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/services
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET /api/services/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching service:', err);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// POST /api/services
router.post('/', async (req, res) => {
  try {
    const { name, category, description, deliverables, duration, price_min, price_max, pricing_model, status } = req.body;
    const result = await pool.query(
      'INSERT INTO services (name, category, description, deliverables, duration, price_min, price_max, pricing_model, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, category, description, deliverables, duration, price_min, price_max, pricing_model, status || 'active']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating service:', err);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// PUT /api/services/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, deliverables, duration, price_min, price_max, pricing_model, status } = req.body;
    const result = await pool.query(
      'UPDATE services SET name = $1, category = $2, description = $3, deliverables = $4, duration = $5, price_min = $6, price_max = $7, pricing_model = $8, status = $9 WHERE id = $10 RETURNING *',
      [name, category, description, deliverables, duration, price_min, price_max, pricing_model, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE /api/services/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted', service: result.rows[0] });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

module.exports = router;
