const express = require('express');
const router = express.Router();
const surahController = require('../controllers/surahController');

// GET all surahs (metadata)
router.get('/surahs', surahController.getAllSurahs);

// GET a specific surah by ID
router.get('/surahs/:id', surahController.getSurahById);

// GET search across ayahs
router.get('/search', surahController.searchAyahs);

module.exports = router;
