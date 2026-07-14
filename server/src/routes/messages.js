const express = require('express');
const db = require('../db');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();
const adminRouter = express.Router();

router.post('/', (req, res) => {
  const { name, email, phone, body } = req.body || {};
  if (!name || !body) {
    return res.status(400).json({ error: 'name and body are required' });
  }
  const insert = db.prepare('INSERT INTO messages (name, email, phone, body) VALUES (?, ?, ?, ?)');
  const result = insert.run(name, email || null, phone || null, body);
  const message = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(message);
});

adminRouter.use(adminAuth);

adminRouter.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all());
});

adminRouter.patch('/:id/read', (req, res) => {
  const result = db.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Message not found' });
  }
  return res.json(db.prepare('SELECT * FROM messages WHERE id = ?').get(req.params.id));
});

module.exports = { router, adminRouter };
