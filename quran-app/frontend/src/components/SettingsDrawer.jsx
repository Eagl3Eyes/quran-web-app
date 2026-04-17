"use client";
import React, { useState } from "react";
import { Settings, X } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function SettingsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useSettings();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 p-4 bg-emerald-800 text-amber-50 rounded-full shadow-[0_4px_20px_rgba(6,95,70,0.4)] hover:bg-emerald-900 transition-all hover:scale-105 z-40"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-80 md:w-96 bg-[#FDFCFA] p-8 shadow-2xl overflow-y-auto border-l border-emerald-100 flex flex-col">
            
            <div className="flex items-center justify-between border-b border-emerald-100 pb-4 mb-8">
              <h2 className="text-2xl font-bold text-emerald-900">Settings</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-emerald-50 text-emerald-800 rounded-full hover:bg-emerald-100">
                <X className="w-5 h-5"/>
              </button>
            </div>

            <div className="space-y-8 flex-1">
              {/* Translations */}
              <div>
                <label className="block text-sm font-bold tracking-widest text-emerald-800/60 uppercase mb-3 text-left">Display Translations</label>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => updateSettings({ translationPref: 'en' })} className={`py-2 rounded-lg text-sm font-semibold border ${settings.translationPref === 'en' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-emerald-100 text-emerald-800'}`}>English</button>
                  <button onClick={() => updateSettings({ translationPref: 'bn' })} className={`py-2 rounded-lg text-sm border font-bold ${settings.translationPref === 'bn' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-emerald-100 text-emerald-800'}`}>বাংলা</button>
                  <button onClick={() => updateSettings({ translationPref: 'both' })} className={`py-2 rounded-lg text-sm font-semibold border ${settings.translationPref === 'both' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-emerald-100 text-emerald-800'}`}>Both</button>
                </div>
              </div>

              {/* Fonts */}
              <div>
                <label className="block text-sm font-bold tracking-widest text-emerald-800/60 uppercase mb-3 text-left">Arabic Typography</label>
                <select
                  value={settings.arabicFont}
                  onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                  className="w-full border-emerald-100 border-2 rounded-xl p-3 bg-white text-emerald-900 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm font-medium"
                >
                  <option value="font-amiri">Amiri (Traditional)</option>
                  <option value="font-noto">Noto Naskh (Modern)</option>
                </select>
              </div>

              {/* Sizes */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold tracking-widest text-emerald-800/60 uppercase">Arabic Size</label>
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{settings.arabicFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="24" max="60"
                  value={settings.arabicFontSize}
                  onChange={(e) => updateSettings({ arabicFontSize: Number(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold tracking-widest text-emerald-800/60 uppercase">Translation Size</label>
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{settings.translationFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="14" max="32"
                  value={settings.translationFontSize}
                  onChange={(e) => updateSettings({ translationFontSize: Number(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
