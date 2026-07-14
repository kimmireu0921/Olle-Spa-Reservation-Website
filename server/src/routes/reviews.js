const express = require('express');
const fetch = require('node-fetch');
const db = require('../db');

const router = express.Router();
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

router.get('/', async (req, res) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.json({ available: false });
  }

  const cached = db.prepare('SELECT payload, fetched_at FROM reviews_cache WHERE id = 1').get();
  if (cached && Date.now() - new Date(`${cached.fetched_at}Z`).getTime() < CACHE_TTL_MS) {
    return res.json({ available: true, ...JSON.parse(cached.payload) });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=rating,user_ratings_total,reviews&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Places API error: ${data.status}`);
    }

    const payload = {
      rating: data.result.rating,
      userRatingsTotal: data.result.user_ratings_total,
      reviews: data.result.reviews || [],
    };

    db.prepare(`
      INSERT INTO reviews_cache (id, payload, fetched_at) VALUES (1, ?, datetime('now'))
      ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, fetched_at = excluded.fetched_at
    `).run(JSON.stringify(payload));

    return res.json({ available: true, ...payload });
  } catch (err) {
    if (cached) {
      return res.json({ available: true, ...JSON.parse(cached.payload) });
    }
    return res.json({ available: false });
  }
});

module.exports = router;
