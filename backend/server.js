const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = Number.parseInt(process.env.BACKEND_PORT || process.env.PORT || '3031', 10);
const { requireSession } = require('./lib/session');

// Middleware
app.use(cors({
  origin(origin, callback) {
    const allowed = (process.env.CORS_ORIGINS || 'http://127.0.0.1:3023,http://localhost:3023')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    callback(null, !origin || allowed.includes(origin));
  },
  credentials: true,
}));
app.use(express.json());

// Public routes
app.use('/api/auth', require('./routes/auth'));
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Application routes require a valid, unexpired signed session.
app.use('/api', requireSession);
app.use('/api/clients', require('./routes/clients'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/talent', require('./routes/talent'));
app.use('/api/investments', require('./routes/investments'));
app.use('/api/strategies', require('./routes/strategies'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/proposals', require('./routes/proposals'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/revenue', require('./routes/revenue'));
app.use('/api/kpis', require('./routes/kpis'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/services', require('./routes/services'));
app.use('/api/pipeline', require('./routes/pipeline'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/executive-search', require('./routes/executive-search'));
app.use('/api/case-studies', require('./routes/case-studies'));
app.use('/api/insights', require('./routes/insights'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/meetings', require('./routes/meetings'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/ai-extras', require('./routes/ai-extras'));
app.use('/api', require('./routes/gap-features')); // === Batch 11 Gaps & Frontend Mounts ===
app.use('/api/custom-views', require('./routes/customViews')); // === Invest Views (Custom Views) ===

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

if (require.main === module) {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`Multiverse Consulting API running on http://127.0.0.1:${PORT}`);
  });
}

module.exports = app;
