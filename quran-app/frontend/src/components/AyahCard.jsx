"use client";
import React from "react";
import { useSettings } from "@/context/SettingsContext";

export default function AyahCard({ ayah }) {
  const { settings } = useSettings();
  const showEnglish = settings.translationPref === 'en' || settings.translationPref === 'both';
  const showBangla = settings.translationPref === 'bn' || settings.translationPref === 'both';

  return (
    <div className="group p-8 md:p-10 bg-white/70 backdrop-blur-sm border border-emerald-900/5 rounded-3xl mb-6 shadow-[0_4px_15px_-5px_rgba(20,83,45,0.05)] hover:shadow-[0_15px_35px_-10px_rgba(20,83,45,0.1)] hover:bg-white transition-all duration-500 relative overflow-hidden">
      {/* Decorative vertical line accent */}
      <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-amber-200 via-emerald-400 to-amber-200 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex flex-col md:flex-row-reverse items-start justify-between gap-8 mb-6 relative z-10">
        
        {/* Arabic Text Space */}
        <div className="flex-1 w-full text-right" dir="rtl">
          <p
            className={`${settings.arabicFont === 'font-noto' ? 'font-noto-arabic' : 'font-amiri'} text-emerald-950 leading-[2.2] drop-shadow-sm font-semibold selection:bg-amber-100`}
            style={{ fontSize: `${settings.arabicFontSize}px` }}
          >
            {ayah.arabicText}
          </p>
        </div>

        {/* Verse Number Decorator */}
        <div className="hidden md:flex flex-col items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 transition-opacity mt-4">
           <div className="relative flex items-center justify-center w-14 h-14">
             <svg className="absolute inset-0 w-full h-full text-amber-100" viewBox="0 0 100 100" fill="currentColor">
               <path d="M50 5 L60 25 L80 25 L70 40 L85 60 L65 65 L60 85 L50 70 L40 85 L35 65 L15 60 L30 40 L20 25 L40 25 Z" />
             </svg>
             <svg className="absolute inset-0 w-full h-full text-amber-500/30 scale-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
               <circle cx="50" cy="50" r="30" />
             </svg>
             <span className="relative text-amber-800 font-bold text-lg font-serif">
               {ayah.numberInSurah}
             </span>
          </div>
        </div>

      </div>

      {/* Translations Section */}
      {(showEnglish || showBangla) && (
        <div className="pt-2 relative z-10">
          {/* Divider SVG */}
          <div className="flex items-center justify-center gap-4 mb-6 opacity-30">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-emerald-900/20"></div>
            <svg className="w-4 h-4 text-emerald-800 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 12L12 22L2 12L12 2Z"/></svg>
            <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-emerald-900/20"></div>
          </div>

          <div className="flex items-start gap-4">
            <div className="md:hidden flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs mt-1">
              {ayah.numberInSurah}
            </div>
            
            <div className="flex flex-col gap-5 w-full">
              {showBangla && (
                <p
                  className="font-noto-bengali text-emerald-900/90 leading-[1.8] font-medium selection:bg-amber-100"
                  style={{ fontSize: `${settings.translationFontSize + 2}px` }}
                >
                  {ayah.banglaTranslation}
                </p>
              )}
              {showEnglish && (
                <p
                  className="text-slate-600 leading-relaxed font-inter selection:bg-amber-100"
                  style={{ fontSize: `${settings.translationFontSize}px` }}
                >
                  {ayah.englishTranslation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
