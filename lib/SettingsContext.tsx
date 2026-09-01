'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export const FONT_SIZE_MIN = 12;
export const FONT_SIZE_MAX = 20;
export const FONT_SIZE_DEFAULT = 14;

interface SettingsContextValue {
  minimapEnabled: boolean;
  setMinimapEnabled: (value: boolean) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [minimapEnabled, setMinimapEnabledState] = useState(true);
  const [fontSize, setFontSizeState] = useState(FONT_SIZE_DEFAULT);
  const [reduceMotion, setReduceMotionState] = useState(false);

  // Mirrors the theme system's pattern (see app/layout.tsx's inline
  // themeScript): read persisted values once on mount. The inline script
  // already applied them to the DOM before paint, this just syncs React
  // state to match so later toggles read/write from the same source.
  useEffect(() => {
    const storedMinimap = localStorage.getItem('settings.minimapEnabled');
    if (storedMinimap !== null) setMinimapEnabledState(storedMinimap === 'true');

    const storedFontSize = localStorage.getItem('settings.fontSize');
    if (storedFontSize !== null) setFontSizeState(Number(storedFontSize));

    const storedReduceMotion = localStorage.getItem('settings.reduceMotion');
    if (storedReduceMotion !== null) setReduceMotionState(storedReduceMotion === 'true');
  }, []);

  const setMinimapEnabled = useCallback((value: boolean) => {
    setMinimapEnabledState(value);
    localStorage.setItem('settings.minimapEnabled', String(value));
  }, []);

  const setFontSize = useCallback((value: number) => {
    const clamped = Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, value));
    setFontSizeState(clamped);
    localStorage.setItem('settings.fontSize', String(clamped));
    // Unitless — --content-font-size feeds a zoom ratio (see
    // styles/Layout.module.css's .content), not a font-size directly.
    document.documentElement.style.setProperty('--content-font-size', String(clamped));
  }, []);

  const setReduceMotion = useCallback((value: boolean) => {
    setReduceMotionState(value);
    localStorage.setItem('settings.reduceMotion', String(value));
    document.documentElement.setAttribute('data-reduce-motion', String(value));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        minimapEnabled,
        setMinimapEnabled,
        fontSize,
        setFontSize,
        reduceMotion,
        setReduceMotion,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}
