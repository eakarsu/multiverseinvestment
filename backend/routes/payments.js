const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/payments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// GET /api/payments/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM payments WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// POST /api/payments
router.post('/', async (req, res) => {
  try {
    const { amount, currency, service, client_name, invoice_number, payment_method, status, receipt_url, payment_date, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO payments (amount, currency, service, client_name, invoice_number, payment_method, status, receipt_url, payment_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [amount, currency, service, client_name, invoice_number, payment_method, status, receipt_url, payment_date, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ error: 'Failed to create' });
  }
});

// PUT /api/payments/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, currency, service, client_name, invoice_number, payment_method, status, receipt_url, payment_date, notes } = req.body;
    const result = await pool.query(
      `UPDATE payments SET amount = $1, currency = $2, service = $3, client_name = $4, invoice_number = $5, payment_method = $6, status = $7, receipt_url = $8, payment_date = $9, notes = $10
       WHERE id = $11 RETURNING *`,
      [amount, currency, service, client_name, invoice_number, payment_method, status, receipt_url, payment_date, notes, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating payment:', err);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// DELETE /api/payments/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM payments WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', data: result.rows[0] });
  } catch (err) {
    console.error('Error deleting payment:', err);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
