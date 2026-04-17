import { searchAyahs } from "@/utils/api";
import SearchBar from "@/components/SearchBar";
import SettingsDrawer from "@/components/SettingsDrawer";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

function HighlightText({ text, query, isArabic = false }) {
  if (!query || !text) return text;
  
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className={`${isArabic ? 'bg-amber-400/30' : 'bg-amber-100'} text-inherit px-0.5 rounded`}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default async function SearchPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.q || "";
  const lang = resolvedParams?.lang || "en";
  
  let results = [];
  let surahMatches = [];
  try {
    if (query) {
      const data = await searchAyahs(query, lang);
      results = data.results || [];
      surahMatches = data.surahs || [];
    }
  } catch (error) {
    console.error("Search failed", error);
  }

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-20 relative z-10">
      <div className="mb-16 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-800/50 font-bold mb-8 hover:text-emerald-700 transition-all text-[10px] uppercase tracking-[0.3em] bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
          ← Back to Collections
        </Link>
        <h1 className="text-4xl font-bold text-emerald-950 mb-8 tracking-tight">
          Results for <span className="text-emerald-700 italic">"{query}"</span>
        </h1>
        <Suspense fallback={<div className="h-16 w-full max-w-2xl mx-auto bg-white/20 rounded-full animate-pulse"></div>}>
          <SearchBar />
        </Suspense>
      </div>

      {query && (
        <div className="space-y-12">
          
          {/* Surah Matches */}
          {surahMatches.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-[0.3em] mb-6 px-4">Surah Matches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {surahMatches.map(s => (
                  <Link 
                    key={s.number} 
                    href={`/surah/${s.number}`}
                    className="flex items-center justify-between p-5 bg-white/80 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">{s.number}</span>
                      <span className="font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors uppercase tracking-wider text-xs">{s.englishName}</span>
                    </div>
                    <span className="font-amiri text-2xl text-emerald-800">{s.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Ayah Matches */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-[0.3em] mb-6 px-4">Verse Results ({results.length})</h3>
            
            {results.length > 0 ? (
              results.map((res, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-emerald-50 hover:shadow-2xl transition duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-600/10 group-hover:bg-emerald-600 transition-colors"></div>
                  
                  <Link href={`/surah/${res.surahId}`} className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-8 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                    {res.surahName} • Ayah {res.ayahNumberInSurah}
                  </Link>
                  
                  <div className="flex flex-col gap-8">
                    <div className="text-right font-amiri text-4xl text-emerald-950 leading-[1.8] font-semibold" dir="rtl">
                      <HighlightText text={res.arabicText} query={query} isArabic={true} />
                    </div>
                    <div className="border-t border-amber-50 pt-6">
                      <p className={`text-emerald-900/80 text-xl leading-relaxed font-medium ${res.langSearched === 'bn' ? 'font-noto-bengali' : 'font-inter'}`}>
                        <HighlightText text={res.translationResult} query={query} />
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-32 bg-white/40 backdrop-blur-md rounded-[3rem] border border-emerald-50 shadow-inner">
                <p className="text-emerald-800/40 text-lg font-bold uppercase tracking-widest">No verses matched your search</p>
                <Link href="/" className="mt-4 inline-block text-emerald-600 font-bold hover:underline">Explore all Surahs</Link>
              </div>
            )}
          </div>
        </div>
      )}
      
      <SettingsDrawer />
    </main>
  );
}
