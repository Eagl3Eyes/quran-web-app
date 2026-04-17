import Link from "next/link";
import React from "react";

export default function SurahCard({ surah }) {
  return (
    <Link
      href={`/surah/${surah.number}`}
      className="group flex flex-col justify-between p-7 bg-white/60 backdrop-blur-md border border-emerald-900/5 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 hover:bg-white transition-all duration-500 relative overflow-hidden"
    >
      {/* Ornamental Background Accent */}
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700">
        <svg width="200" height="200" viewBox="0 0 100 100" className="w-48 h-48 text-emerald-900 absolute -top-12 -right-12 transform rotate-12 group-hover:rotate-45 transition-transform duration-1000">
          <path fill="currentColor" d="M50 0L64.5 35.5L100 50L64.5 64.5L50 100L35.5 64.5L0 50L35.5 35.5L50 0Z" />
        </svg>
      </div>

      <div className="flex items-start justify-between relative z-10 w-full mb-8">
        <div className="flex items-center gap-5">
          <div className="relative flex items-center justify-center w-14 h-14">
            {/* Islamic 8-point star (Rub el Hizb) symbol for surah number */}
            <svg className="absolute inset-0 w-full h-full text-emerald-100 group-hover:text-emerald-600 transition-all duration-500 scale-110" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 L60 20 L80 15 L75 35 L95 50 L75 65 L80 85 L60 80 L50 100 L40 80 L20 85 L25 65 L5 50 L25 35 L20 15 L40 20 Z" />
            </svg>
            <span className="relative text-emerald-900 font-bold text-sm z-10 group-hover:text-white transition-colors duration-500">
              {surah.number}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{surah.englishName}</h3>
            <p className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-[0.3em] mt-1.5">{surah.englishNameTranslation}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-end justify-between border-t border-emerald-900/5 pt-5 relative z-10 mt-auto">
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100/50 uppercase tracking-widest">
          {surah.numberOfAyahs} Verses
        </span>
        <div className="text-4xl font-amiri text-emerald-800 leading-none drop-shadow-sm" dir="rtl">{surah.name}</div>
      </div>
    </Link>
  );
}
