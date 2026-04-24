const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/invoices
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM invoices ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching invoices:', err);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// GET /api/invoices/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM invoices WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching invoice:', err);
    res.status(500).json({ error: 'Failed to fetch invoice' });
  }
});

// POST /api/invoices
router.post('/', async (req, res) => {
  try {
    const { invoice_number, client_name, project_name, amount, payment_terms, status, issue_date, due_date, paid_date, payment_method, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO invoices (invoice_number, client_name, project_name, amount, payment_terms, status, issue_date, due_date, paid_date, payment_method, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [invoice_number, client_name, project_name, amount, payment_terms, status || 'draft', issue_date, due_date, paid_date, payment_method, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating invoice:', err);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// PUT /api/invoices/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { invoice_number, client_name, project_name, amount, payment_terms, status, issue_date, due_date, paid_date, payment_method, notes } = req.body;
    const result = await pool.query(
      'UPDATE invoices SET invoice_number = $1, client_name = $2, project_name = $3, amount = $4, payment_terms = $5, status = $6, issue_date = $7, due_date = $8, paid_date = $9, payment_method = $10, notes = $11 WHERE id = $12 RETURNING *',
      [invoice_number, client_name, project_name, amount, payment_terms, status, issue_date, due_date, paid_date, payment_method, notes, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating invoice:', err);
    res.status(500).json({ error: 'Failed to update invoice' });
  }
});

// DELETE /api/invoices/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM invoices WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted', invoice: result.rows[0] });
  } catch (err) {
    console.error('Error deleting invoice:', err);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

module.exports = router;
