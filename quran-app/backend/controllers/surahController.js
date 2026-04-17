const axios = require('axios');

const ALQURAN_API = 'https://api.alquran.cloud/v1';

// Cache for Surah metadata to speed up name-based searches
let surahsCache = null;

async function getSurahs() {
  if (surahsCache) return surahsCache;
  const response = await axios.get(`${ALQURAN_API}/surah`);
  surahsCache = response.data.data;
  return surahsCache;
}

exports.getAllSurahs = async (req, res) => {
  try {
    const data = await getSurahs();
    res.json(data);
  } catch (error) {
    console.error("Error fetching all surahs:", error.message);
    res.status(500).json({ error: 'Server error retrieving surah metadata.' });
  }
};

exports.getSurahById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id < 1 || id > 114) {
      return res.status(404).json({ error: 'Surah not found' });
    }

    const [arabicRes, englishRes, banglaRes] = await Promise.all([
      axios.get(`${ALQURAN_API}/surah/${id}/quran-uthmani`),
      axios.get(`${ALQURAN_API}/surah/${id}/en.sahih`),
      axios.get(`${ALQURAN_API}/surah/${id}/bn.bengali`)
    ]);

    const arSurah = arabicRes.data.data;
    const enSurah = englishRes.data.data;
    const bnSurah = banglaRes.data.data;

    const meta = {
      number: arSurah.number,
      name: arSurah.name,
      englishName: arSurah.englishName,
      englishNameTranslation: arSurah.englishNameTranslation,
      numberOfAyahs: arSurah.numberOfAyahs,
      revelationType: arSurah.revelationType
    };

    const ayahs = arSurah.ayahs.map((ayah, idx) => ({
      number: ayah.number,
      numberInSurah: ayah.numberInSurah,
      juz: ayah.juz,
      arabicText: ayah.text,
      englishTranslation: enSurah.ayahs[idx].text,
      banglaTranslation: bnSurah.ayahs[idx].text
    }));

    res.json({ meta, ayahs });
  } catch (error) {
    console.error("Error fetching surah by id:", error.message);
    res.status(500).json({ error: 'Server error retrieving surah data.' });
  }
};

exports.searchAyahs = async (req, res) => {
  try {
    const query = req.query.q?.trim().toLowerCase();
    const lang = req.query.lang || 'en';
    
    if (!query) {
      return res.status(400).json({ error: 'Search query "q" is required' });
    }

    // 1. Search Surah Names first (Universal Search)
    const allSurahs = await getSurahs();
    const matchedSurahs = allSurahs.filter(s => 
      s.englishName.toLowerCase().includes(query) || 
      s.englishNameTranslation.toLowerCase().includes(query) ||
      s.number.toString() === query
    ).slice(0, 5); // Limit to 5 surah matches

    // 2. Search Ayah Text
    const edition = lang === 'bn' ? 'bn.bengali' : 'en.sahih';
    let ayahResults = [];
    let totalAyahCount = 0;

    try {
      const response = await axios.get(`${ALQURAN_API}/search/${encodeURIComponent(query)}/all/${edition}`);
      const searchData = response.data.data;

      if (searchData && searchData.matches) {
        totalAyahCount = searchData.count || 0;
        const matchPromises = searchData.matches.slice(0, 20).map(async (match) => {
          try {
            const arVerseRes = await axios.get(`${ALQURAN_API}/ayah/${match.number}/quran-uthmani`);
            return {
              surahId: match.surah.number,
              surahName: match.surah.englishName,
              ayahNumberInSurah: match.numberInSurah,
              arabicText: arVerseRes.data.data.text,
              translationResult: match.text,
              langSearched: lang
            };
          } catch (e) {
            return {
              surahId: match.surah.number,
              surahName: match.surah.englishName,
              ayahNumberInSurah: match.numberInSurah,
              arabicText: "Arabic text unavailable",
              translationResult: match.text,
              langSearched: lang
            };
          }
        });
        ayahResults = await Promise.all(matchPromises);
      }
    } catch (e) {
      // If 404 from alquran API (no results), we just have empty ayahResults
    }

    res.json({ 
      surahs: matchedSurahs,
      results: ayahResults, 
      totalCount: totalAyahCount 
    });
  } catch (error) {
    console.error("Error searching:", error.message);
    res.status(500).json({ error: 'Server error during search.' });
  }
};
