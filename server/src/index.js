require('dotenv').config();
const express = require('express');
const cors = require('cors');

const servicesRoutes = require('./routes/services');
const therapistsRoutes = require('./routes/therapists');
const availabilityRoutes = require('./routes/availability');
const bookingsRoutes = require('./routes/bookings');
const messagesRoutes = require('./routes/messages');
const reviewsRoutes = require('./routes/reviews');
const adminAuthRoutes = require('./routes/adminAuth');
const blockedSlotsRoutes = require('./routes/blockedSlots');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/services', servicesRoutes);
app.use('/api/therapists', therapistsRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/bookings', bookingsRoutes.router);
app.use('/api/admin/bookings', bookingsRoutes.adminRouter);
app.use('/api/messages', messagesRoutes.router);
app.use('/api/admin/messages', messagesRoutes.adminRouter);
app.use('/api/admin/blocked-slots', blockedSlotsRoutes);
app.use('/api/admin', adminAuthRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Olle Spa server listening on http://localhost:${PORT}`);
});
