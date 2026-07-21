const express = require('express');
const {
  authenticateCredentials,
  createSessionToken,
  requireSession,
} = require('../lib/session');
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateCredentials(email, password);

    if (user) {
      return res.json({
        token: createSessionToken(user),
        user,
      });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(err.status || 500).json({
      error: err.status === 503 ? err.message : 'Internal server error',
    });
  }
});

router.get('/session', requireSession, (req, res) => {
  res.json({ user: req.session });
});

module.exports = router;
