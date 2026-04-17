import { fetchSurahs, fetchSurahById } from "@/utils/api";
import AyahCard from "@/components/AyahCard";
import SettingsDrawer from "@/components/SettingsDrawer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  try {
    const surahs = await fetchSurahs();
    return surahs.map((surah) => ({
      id: surah.number.toString(),
    }));
  } catch (e) {
    return [];
  }
}

export default async function SurahPage({ params }) {
  const resolvedParams = await params;
  let data;
  try {
    data = await fetchSurahById(parseInt(resolvedParams.id));
  } catch (error) {
    return (
      <div className="min-h-screen py-20 text-center">
        <h1 className="text-2xl text-slate-600">Error loading Surah. Please try again later.</h1>
        <Link href="/" className="text-emerald-600 mt-4 inline-block hover:underline">Return Home</Link>
      </div>
    );
  }

  const { meta: surah, ayahs } = data;

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-10 md:py-20 min-h-screen relative z-10">
      <div className="mb-14 pb-14 relative border-b border-emerald-900/5">
        <Link
          href="/"
          className="absolute left-0 top-0 p-3 text-emerald-800 bg-white shadow-sm border border-emerald-900/10 hover:bg-emerald-700 hover:text-amber-50 rounded-full transition-all duration-300 hover:scale-105 z-10 flex items-center justify-center group"
          title="Back to Collections"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="text-center mt-6">

          <h1 className="text-6xl md:text-8xl font-amiri text-emerald-950 mb-6 drop-shadow-sm leading-tight relative inline-block">
            {surah.name}
            {/* Subtle glow behind title */}
            <div className="absolute inset-0 bg-emerald-200 blur-3xl opacity-20 -z-10 rounded-full"></div>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">{surah.englishName}</h2>
          <p className="text-amber-600/90 uppercase tracking-[0.3em] text-sm font-semibold">{surah.englishNameTranslation}</p>

          <div className="inline-flex mt-4 items-center gap-2 px-5 py-2 bg-emerald-50/80 backdrop-blur-sm text-emerald-800 rounded-full mb-8 text-xs font-bold tracking-[0.2em] border border-emerald-200/50 shadow-sm">
            <span>{surah.revelationType.toUpperCase()}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>{surah.numberOfAyahs} AYAHS</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        {ayahs.map((ayah) => (
          <AyahCard key={ayah.numberInSurah} ayah={ayah} />
        ))}
      </div>

      <SettingsDrawer />
    </main>
  );
}
