'use client';

import { useState, useEffect } from 'react';
import { VscColorMode, VscJson } from 'react-icons/vsc';

import { THEMES } from '@/lib/themes';
import ThemeInfo from '@/components/ThemeInfo';

import styles from '@/styles/SettingsPage.module.css';

const SettingsPage = () => {
  const [activeTheme, setActiveTheme] = useState('github-dark');
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<'gui' | 'json'>('gui');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'github-dark';
    setActiveTheme(savedTheme);
    setIsLoaded(true);
  }, []);

  const handleThemeSelect = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setActiveTheme(theme);
  };

  if (!isLoaded) {
    return null;
  }

  const activeThemeName =
    THEMES.find((t) => t.theme === activeTheme)?.name ?? activeTheme;

  const settingsJson: Record<string, string | number | boolean> = {
    'workbench.colorTheme': activeThemeName,
    'editor.fontFamily': "'JetBrains Mono', monospace",
    'editor.fontSize': 14,
    'editor.cursorBlinking': 'blink',
    'editor.minimap.enabled': true,
    'files.autoSave': 'off',
    'terminal.integrated.fontFamily': "'JetBrains Mono', monospace",
    'workbench.startupEditor': 'welcomePage',
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.iconWrapper}>
            <VscColorMode className={styles.icon} size={24} />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Settings</h1>
            <p className={styles.subtitle}>
              Customize your editor appearance. Choose from curated themes
              that match your style.
            </p>
          </div>
          <button
            className={styles.jsonToggle}
            onClick={() => setView((v) => (v === 'gui' ? 'json' : 'gui'))}
            title={view === 'gui' ? 'Open Settings (JSON)' : 'Open Settings (UI)'}
          >
            <VscJson size={18} />
          </button>
        </header>

        {view === 'gui' ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Color Theme</h2>

            <div className={styles.themesGrid}>
              {THEMES.map((theme) => (
                <ThemeInfo
                  key={theme.theme}
                  icon={theme.icon}
                  name={theme.name}
                  publisher={theme.publisher}
                  theme={theme.theme}
                  isActive={activeTheme === theme.theme}
                  onSelect={handleThemeSelect}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>settings.json</h2>
            <pre className={styles.jsonView}>
              <span className={styles.jsonBrace}>{'{'}</span>
              {'\n'}
              {Object.entries(settingsJson).map(([key, value], index, arr) => (
                <span key={key}>
                  {'  '}
                  <span className={styles.jsonKey}>&quot;{key}&quot;</span>
                  <span className={styles.jsonPunct}>: </span>
                  <span
                    className={
                      typeof value === 'string' ? styles.jsonString : styles.jsonValue
                    }
                  >
                    {typeof value === 'string' ? `"${value}"` : String(value)}
                  </span>
                  {index < arr.length - 1 && (
                    <span className={styles.jsonPunct}>,</span>
                  )}
                  {'\n'}
                </span>
              ))}
              <span className={styles.jsonBrace}>{'}'}</span>
            </pre>
          </section>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
