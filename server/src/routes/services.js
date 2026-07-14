const express = require('express');
const db = require('../db');

const router = express.Router();
const SUPPORTED_LANGS = ['en', 'ko', 'zh', 'ja'];

function resolveLang(lang) {
  return SUPPORTED_LANGS.includes(lang) ? lang : 'en';
}

router.get('/', (req, res) => {
  const lang = resolveLang(req.query.lang);
  const rows = db.prepare(`
    SELECT id, name_${lang} AS name, description_${lang} AS description, duration_minutes, price_cents
    FROM services
    WHERE active = 1
    ORDER BY duration_minutes ASC
  `).all();
  res.json(rows);
});

module.exports = router;
