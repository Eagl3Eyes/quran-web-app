import { fetchSurahs } from "@/utils/api";
import SurahCard from "@/components/SurahCard";
import SettingsDrawer from "@/components/SettingsDrawer";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let surahs = [];
  try {
    surahs = await fetchSurahs();
  } catch (error) {
    console.error("Failed to fetch surahs:", error);
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-20 md:py-32 relative z-10">
      <div className="mb-24 text-center">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-50/50 backdrop-blur-sm text-emerald-800 rounded-full mb-10 text-[10px] font-bold tracking-[0.4em] border border-emerald-100 uppercase shadow-sm">
           The Noble Quran 
        </div>

        <h1 className="text-7xl md:text-9xl font-amiri font-bold text-emerald-950 mb-8 tracking-wide drop-shadow-xl">
          القرآن الكريم
        </h1>
        
        <p className="text-emerald-900/60 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
          Immerse yourself in the divine words with beautiful typography and complete translations.
        </p>

        <Suspense fallback={<div className="h-16 w-full max-w-2xl mx-auto bg-white/20 rounded-full animate-pulse"></div>}>
          <SearchBar />
        </Suspense>
      </div>

      {surahs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {surahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      ) : (
        <div className="text-center py-40 border-2 border-emerald-900/5 rounded-[4rem] bg-white/30 backdrop-blur-sm">
          <p className="text-emerald-800/40 text-lg font-bold uppercase tracking-widest">Unable to load sanctuary data</p>
        </div>
      )}
      
      <SettingsDrawer />
    </main>
  );
}
