const express = require('express');
const db = require('../db');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();
router.use(adminAuth);

router.get('/', (req, res) => {
  const { date } = req.query;
  if (date) {
    return res.json(db.prepare('SELECT * FROM blocked_slots WHERE date = ? ORDER BY start_time ASC').all(date));
  }
  return res.json(db.prepare('SELECT * FROM blocked_slots ORDER BY date ASC, start_time ASC').all());
});

router.post('/', (req, res) => {
  const { therapistId, date, startTime, endTime, reason } = req.body || {};
  if (!date || !startTime || !endTime) {
    return res.status(400).json({ error: 'date, startTime, and endTime are required' });
  }
  const insert = db.prepare(`
    INSERT INTO blocked_slots (therapist_id, date, start_time, end_time, reason)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = insert.run(therapistId || null, date, startTime, endTime, reason || null);
  res.status(201).json(db.prepare('SELECT * FROM blocked_slots WHERE id = ?').get(result.lastInsertRowid));
});

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM blocked_slots WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Blocked slot not found' });
  }
  return res.status(204).send();
});

module.exports = router;
