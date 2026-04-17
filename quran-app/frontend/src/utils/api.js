export const BASE_URL = 'https://quranwebapp-backend.vercel.app/api';

export const fetchSurahs = async () => {
  const res = await fetch(`${BASE_URL}/surahs`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch surahs');
  return res.json();
};

export const fetchSurahById = async (id) => {
  const res = await fetch(`${BASE_URL}/surahs/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch surah data');
  return res.json();
};

export const searchAyahs = async (query, lang = 'en') => {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&lang=${lang}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Search failed');
  return res.json();
};
