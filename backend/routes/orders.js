const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { order_number, client_name, service, amount, status, order_date, delivery_date, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO orders (order_number, client_name, service, amount, status, order_date, delivery_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [order_number, client_name, service, amount, status, order_date, delivery_date, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create' });
  }
});

// PUT /api/orders/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { order_number, client_name, service, amount, status, order_date, delivery_date, notes } = req.body;
    const result = await pool.query(
      `UPDATE orders SET order_number = $1, client_name = $2, service = $3, amount = $4, status = $5, order_date = $6, delivery_date = $7, notes = $8
       WHERE id = $9 RETURNING *`,
      [order_number, client_name, service, amount, status, order_date, delivery_date, notes, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// DELETE /api/orders/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', data: result.rows[0] });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
