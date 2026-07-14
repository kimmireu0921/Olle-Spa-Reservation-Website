const express = require('express');
const db = require('../db');
const { generateCandidateSlots, filterAvailable } = require('../utils/slots');

const router = express.Router();

router.get('/', (req, res) => {
  const { serviceId, therapistId, date } = req.query;
  if (!serviceId || !therapistId || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'serviceId, therapistId, and date (YYYY-MM-DD) are required' });
  }

  const service = db.prepare('SELECT duration_minutes FROM services WHERE id = ? AND active = 1').get(serviceId);
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }

  const dayOfWeek = new Date(`${date}T00:00:00`).getDay();
  const hours = db.prepare('SELECT open_time, close_time FROM business_hours WHERE day_of_week = ?').get(dayOfWeek);

  const candidates = generateCandidateSlots(hours, service.duration_minutes);
  if (candidates.length === 0) {
    return res.json([]);
  }

  const busyBookings = db.prepare(`
    SELECT start_time, end_time FROM bookings
    WHERE date = ? AND therapist_id = ? AND status = 'booked'
  `).all(date, therapistId);

  const busyBlocks = db.prepare(`
    SELECT start_time, end_time FROM blocked_slots
    WHERE date = ? AND (therapist_id IS NULL OR therapist_id = ?)
  `).all(date, therapistId);

  const available = filterAvailable(candidates, service.duration_minutes, [...busyBookings, ...busyBlocks]);
  res.json(available);
});

module.exports = router;
