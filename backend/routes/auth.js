const express = require('express');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === 'admin@multiverse.com' && password === 'admin123') {
      return res.json({
        token: 'mock-jwt-token',
        user: {
          email,
          name: 'Admin User',
          role: 'admin',
        },
      });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
