const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body || {};
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  return res.json({ token: password });
});

module.exports = router;
