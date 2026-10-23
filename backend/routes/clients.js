const express = require('express');
const router = express.Router();
const pool = require('../db');
const fp = require('../lib/feature-pack');
const CLIENT_FIELDS = ['id', 'name', 'industry', 'contact_email', 'phone', 'status', 'revenue', 'notes', 'created_at'];

// GET /api/clients/export?format=csv|json — must precede /:id
router.get('/export', async (req, res) => {
  try {
    const { where, params } = fp.buildClientFilter(req.query);
    const result = await pool.query(`SELECT * FROM clients ${where} ORDER BY created_at DESC LIMIT 1000`, params);
    if (req.query.format === 'json') { res.setHeader('Content-Disposition', 'attachment; filename="clients.json"'); return res.type('application/json').send(fp.recordsToJson(result.rows)); }
    res.setHeader('Content-Disposition', 'attachment; filename="clients.csv"'); return res.type('text/csv').send(fp.recordsToCsv(result.rows, CLIENT_FIELDS));
  } catch (err) { console.error('Error exporting clients:', err); res.status(500).json({ error: 'Failed to export clients' }); }
});

// GET /api/clients?q=&status=&industry=
router.get('/', async (req, res) => {
  try {
    const { where, params } = fp.buildClientFilter(req.query);
    const result = await pool.query(`SELECT * FROM clients ${where} ORDER BY created_at DESC`, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

// GET /api/clients/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching client:', err);
    res.status(500).json({ error: 'Failed to fetch client' });
  }
});

// POST /api/clients
router.post('/', async (req, res) => {
  try {
    const { name, industry, contact_email, phone, status, revenue, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO clients (name, industry, contact_email, phone, status, revenue, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, industry, contact_email, phone, status || 'active', revenue, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating client:', err);
    res.status(500).json({ error: 'Failed to create client' });
  }
});

// PUT /api/clients/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, industry, contact_email, phone, status, revenue, notes } = req.body;
    const result = await pool.query(
      'UPDATE clients SET name = $1, industry = $2, contact_email = $3, phone = $4, status = $5, revenue = $6, notes = $7 WHERE id = $8 RETURNING *',
      [name, industry, contact_email, phone, status, revenue, notes, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating client:', err);
    res.status(500).json({ error: 'Failed to update client' });
  }
});

// DELETE /api/clients/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ message: 'Client deleted', client: result.rows[0] });
  } catch (err) {
    console.error('Error deleting client:', err);
    res.status(500).json({ error: 'Failed to delete client' });
  }
});

module.exports = router;
