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
    SELECT id, name, photo_url, bio_${lang} AS bio, specialties_${lang} AS specialties
    FROM therapists
    WHERE active = 1
    ORDER BY id ASC
  `).all();
  res.json(rows);
});

module.exports = router;
