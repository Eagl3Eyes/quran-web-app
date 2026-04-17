"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2, Globe, X, BookOpen, Star } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import { searchAyahs } from "@/utils/api";
import Link from "next/link";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { settings, updateSettings } = useSettings();
  
  const [query, setQuery] = useState(searchParams.get('q') || "");
  const [isTyping, setIsTyping] = useState(false);
  const [quickResults, setQuickResults] = useState({ surahs: [], results: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    setQuery(searchParams.get('q') || "");
    setIsTyping(false);
    setShowDropdown(false);
  }, [searchParams]);

  // Keyboard shortcut listener (/)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setShowDropdown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchQuickResults = async (val) => {
    if (!val.trim()) {
      setQuickResults({ surahs: [], results: [] });
      return;
    }
    try {
      const data = await searchAyahs(val, settings.searchLang || 'en');
      setQuickResults({
        surahs: data.surahs || [],
        results: data.results || []
      });
      setShowDropdown(true);
    } catch (e) {
      console.error("Quick search failed", e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    
    if (!val.trim()) {
      setShowDropdown(false);
      setQuickResults({ surahs: [], results: [] });
      return;
    }

    setIsTyping(true);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      fetchQuickResults(val);
    }, 400); 
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}&lang=${settings.searchLang || 'en'}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setQuickResults({ surahs: [], results: [] });
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const toggleLang = () => {
    const newLang = settings.searchLang === 'en' ? 'bn' : 'en';
    updateSettings({ searchLang: newLang });
    if (query.trim()) {
      setIsTyping(true);
      fetchQuickResults(query);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto w-full group" ref={dropdownRef}>
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 via-emerald-300 to-amber-200 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Floating Language Toggle */}
      <div className="absolute -top-10 right-2 flex items-center gap-2">
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-full text-[10px] font-bold text-emerald-800 shadow-sm hover:bg-emerald-50 transition uppercase tracking-wider"
        >
          <Globe className="w-3 h-3"/>
          {settings.searchLang === 'en' ? 'English' : 'বাংলা'}
        </button>
      </div>

      <form onSubmit={handleSearch} className="relative flex items-center z-20">
        <input
          ref={inputRef}
          type="text"
          placeholder={settings.searchLang === 'en' ? "Search surahs, ayahs, keywords..." : "সূরা, আয়াত বা শব্দ খুঁজুন..."}
          value={query}
          onChange={handleInput}
          onFocus={() => query.trim() && setShowDropdown(true)}
          className={`w-full pl-8 pr-24 py-5 rounded-full border border-emerald-900/10 bg-white/90 backdrop-blur-md shadow-lg text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all text-lg font-medium placeholder:text-emerald-900/30 ${settings.searchLang === 'bn' ? 'font-noto-bengali' : ''}`}
        />
        
        <div className="absolute right-3 flex items-center gap-2">
          {query && (
            <button 
              type="button" 
              onClick={clearSearch}
              className="p-2 text-emerald-900/40 hover:text-emerald-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button type="submit" className="flex items-center justify-center p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-md transition-colors cursor-pointer">
            {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </div>
      </form>

      {/* Quick Results Dropdown */}
      {showDropdown && (quickResults.surahs.length > 0 || quickResults.results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-3xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="max-h-[70vh] overflow-y-auto">
            
            {/* Surah Matches */}
            {quickResults.surahs.length > 0 && (
              <div className="p-4 border-b border-emerald-50">
                <div className="px-3 mb-3 text-[10px] font-bold text-emerald-800/50 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Star className="w-3 h-3" /> Surah Matches
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quickResults.surahs.map(s => (
                    <Link 
                      key={s.number} 
                      href={`/surah/${s.number}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50 transition-colors group"
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-800">{s.number}</span>
                        <span className="font-bold text-emerald-950">{s.englishName}</span>
                      </div>
                      <span className="font-amiri text-lg text-emerald-700">{s.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Ayah Matches */}
            {quickResults.results.length > 0 && (
              <div className="p-4">
                <div className="px-3 mb-3 text-[10px] font-bold text-emerald-800/50 uppercase tracking-[0.2em] flex items-center gap-2">
                  <BookOpen className="w-3 h-3" /> Ayah Results
                </div>
                <div className="space-y-1">
                  {quickResults.results.slice(0, 6).map((res, i) => (
                    <Link 
                      key={i}
                      href={`/surah/${res.surahId}`}
                      className="block p-3 rounded-xl hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">{res.surahName} • {res.ayahNumberInSurah}</span>
                      </div>
                      <p className="text-sm text-emerald-950 font-medium line-clamp-2 leading-relaxed">
                        {res.translationResult}
                      </p>
                    </Link>
                  ))}
                </div>
                {quickResults.results.length > 6 && (
                  <button 
                    onClick={handleSearch}
                    className="w-full mt-4 py-3 bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-100 transition-colors"
                  >
                    View all {quickResults.results.length} results
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
