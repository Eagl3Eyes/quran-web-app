"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const defaultSettings = {
  arabicFont: "font-amiri",
  arabicFontSize: 34,
  translationFontSize: 18,
  translationPref: "both", // 'en', 'bn', or 'both'
  searchLang: "en"         // 'en' or 'bn'
};

const SettingsContext = createContext(undefined);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("quran_settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("quran_settings", JSON.stringify(updated));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
