CREATE TABLE IF NOT EXISTS therapists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  photo_url TEXT,
  bio_en TEXT, bio_ko TEXT, bio_zh TEXT, bio_ja TEXT,
  specialties_en TEXT, specialties_ko TEXT, specialties_zh TEXT, specialties_ja TEXT,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_en TEXT NOT NULL, name_ko TEXT NOT NULL, name_zh TEXT NOT NULL, name_ja TEXT NOT NULL,
  description_en TEXT, description_ko TEXT, description_zh TEXT, description_ja TEXT,
  duration_minutes INTEGER NOT NULL,
  price_cents INTEGER NOT NULL,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS business_hours (
  day_of_week INTEGER PRIMARY KEY,
  open_time TEXT,
  close_time TEXT
);

CREATE TABLE IF NOT EXISTS blocked_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  therapist_id INTEGER REFERENCES therapists(id),
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  reason TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL REFERENCES services(id),
  therapist_id INTEGER NOT NULL REFERENCES therapists(id),
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  status TEXT NOT NULL DEFAULT 'booked',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_active_booking_slot
  ON bookings(date, start_time, therapist_id)
  WHERE status = 'booked';

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  body TEXT NOT NULL,
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS reviews_cache (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  payload TEXT NOT NULL,
  fetched_at TEXT NOT NULL
);
