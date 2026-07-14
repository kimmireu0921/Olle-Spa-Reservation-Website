const express = require('express');
const db = require('../db');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();
const adminRouter = express.Router();

function addMinutes(time, minutes) {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60).toString().padStart(2, '0');
  const mm = (total % 60).toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

router.post('/', (req, res) => {
  const { serviceId, therapistId, date, startTime, customerName, customerPhone, customerEmail } = req.body || {};

  if (!serviceId || !therapistId || !date || !startTime || !customerName || !customerPhone) {
    return res.status(400).json({ error: 'serviceId, therapistId, date, startTime, customerName, and customerPhone are required' });
  }

  const service = db.prepare('SELECT duration_minutes FROM services WHERE id = ? AND active = 1').get(serviceId);
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }

  const endTime = addMinutes(startTime, service.duration_minutes);

  try {
    const insert = db.prepare(`
      INSERT INTO bookings (service_id, therapist_id, date, start_time, end_time, customer_name, customer_phone, customer_email)
      VALUES (@serviceId, @therapistId, @date, @startTime, @endTime, @customerName, @customerPhone, @customerEmail)
    `);
    const result = insert.run({
      serviceId, therapistId, date, startTime, endTime,
      customerName, customerPhone, customerEmail: customerEmail || null,
    });
    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(result.lastInsertRowid);
    return res.status(201).json(booking);
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE' || err.code === 'SQLITE_CONSTRAINT') {
      return res.status(409).json({ error: 'That time slot was just booked. Please pick another.' });
    }
    throw err;
  }
});

adminRouter.use(adminAuth);

adminRouter.get('/', (req, res) => {
  const { date, status } = req.query;
  let query = `
    SELECT b.*, s.name_en AS service_name, t.name AS therapist_name
    FROM bookings b
    JOIN services s ON s.id = b.service_id
    JOIN therapists t ON t.id = b.therapist_id
    WHERE 1 = 1
  `;
  const params = [];
  if (date) {
    query += ' AND b.date = ?';
    params.push(date);
  }
  if (status) {
    query += ' AND b.status = ?';
    params.push(status);
  }
  query += ' ORDER BY b.date ASC, b.start_time ASC';
  res.json(db.prepare(query).all(...params));
});

adminRouter.patch('/:id/cancel', (req, res) => {
  const result = db.prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?").run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  return res.json(db.prepare('SELECT * FROM bookings WHERE id = ?').get(req.params.id));
});

module.exports = { router, adminRouter };
