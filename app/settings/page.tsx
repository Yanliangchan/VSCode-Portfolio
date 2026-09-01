'use client';

import { useState, useEffect } from 'react';
import { VscColorMode, VscJson, VscSearch } from 'react-icons/vsc';

import { THEMES } from '@/lib/themes';
import { fuzzyScore, fuzzyFilter } from '@/lib/fuzzyMatch';
import { useSettings, FONT_SIZE_MIN, FONT_SIZE_MAX } from '@/lib/SettingsContext';
import ThemeInfo from '@/components/ThemeInfo';

import styles from '@/styles/SettingsPage.module.css';

const matches = (search: string, label: string) => !search.trim() || fuzzyScore(search, label) !== null;

interface SettingRowProps {
  label: string;
  settingKey: string;
  children: React.ReactNode;
}

const SettingRow = ({ label, settingKey, children }: SettingRowProps) => (
  <div className={styles.settingRow}>
    <div className={styles.settingRowText}>
      <span className={styles.settingLabel}>{label}</span>
      <span className={styles.settingKey}>{settingKey}</span>
    </div>
    {children}
  </div>
);

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

const Toggle = ({ checked, onChange, label }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
    onClick={() => onChange(!checked)}
  >
    <span className={styles.toggleThumb} />
  </button>
);

const SettingsPage = () => {
  const [activeTheme, setActiveTheme] = useState('github-dark');
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<'gui' | 'json'>('gui');
  const [search, setSearch] = useState('');
  const { minimapEnabled, setMinimapEnabled, fontSize, setFontSize, reduceMotion, setReduceMotion } =
    useSettings();

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

  const activeThemeName = THEMES.find((t) => t.theme === activeTheme)?.name ?? activeTheme;

  const settingsJson: Record<string, string | number | boolean> = {
    'workbench.colorTheme': activeThemeName,
    'editor.fontFamily': "'JetBrains Mono', monospace",
    'editor.fontSize': fontSize,
    'editor.cursorBlinking': 'blink',
    'editor.minimap.enabled': minimapEnabled,
    'workbench.reduceMotion': reduceMotion,
    'files.autoSave': 'off',
    'terminal.integrated.fontFamily': "'JetBrains Mono', monospace",
    'workbench.startupEditor': 'welcomePage',
  };

  const themeSectionVisible = matches(search, 'Color Theme');
  const filteredThemes = themeSectionVisible ? THEMES : fuzzyFilter(THEMES, search, (t) => t.name);

  const showFontSize = matches(search, 'Font Size editor.fontSize');
  const showMinimap = matches(search, 'Minimap editor.minimap.enabled');
  const editorSectionVisible = showFontSize || showMinimap;

  const showReduceMotion = matches(search, 'Reduce Motion workbench.reduceMotion');
  const workbenchSectionVisible = showReduceMotion;

  const otherRows = [
    { label: 'Cursor Blinking', key: 'editor.cursorBlinking', value: 'blink' },
    { label: 'Auto Save', key: 'files.autoSave', value: 'off' },
    { label: 'Terminal Font Family', key: 'terminal.integrated.fontFamily', value: "'JetBrains Mono'" },
    { label: 'Startup Editor', key: 'workbench.startupEditor', value: 'welcomePage' },
  ].filter((row) => matches(search, `${row.label} ${row.key}`));

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
          <>
            <div className={styles.searchWrapper}>
              <VscSearch size={14} className={styles.searchIcon} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search settings"
                className={styles.searchInput}
                spellCheck={false}
                autoComplete="off"
              />
            </div>

            {themeSectionVisible || filteredThemes.length > 0 ? (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Color Theme</h2>
                <div className={styles.themesGrid}>
                  {filteredThemes.map((theme) => (
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
            ) : null}

            {editorSectionVisible && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Editor</h2>
                <div className={styles.settingsList}>
                  {showFontSize && (
                    <SettingRow label="Font Size" settingKey="editor.fontSize">
                      <div className={styles.sliderWrapper}>
                        <input
                          type="range"
                          min={FONT_SIZE_MIN}
                          max={FONT_SIZE_MAX}
                          step={1}
                          value={fontSize}
                          onChange={(e) => setFontSize(Number(e.target.value))}
                          className={styles.slider}
                        />
                        <span className={styles.sliderValue}>{fontSize}px</span>
                      </div>
                    </SettingRow>
                  )}
                  {showMinimap && (
                    <SettingRow label="Minimap" settingKey="editor.minimap.enabled">
                      <Toggle checked={minimapEnabled} onChange={setMinimapEnabled} label="Minimap" />
                    </SettingRow>
                  )}
                </div>
              </section>
            )}

            {workbenchSectionVisible && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Workbench</h2>
                <div className={styles.settingsList}>
                  <SettingRow label="Reduce Motion" settingKey="workbench.reduceMotion">
                    <Toggle checked={reduceMotion} onChange={setReduceMotion} label="Reduce Motion" />
                  </SettingRow>
                </div>
              </section>
            )}

            {otherRows.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Other</h2>
                <div className={styles.settingsList}>
                  {otherRows.map((row) => (
                    <div className={styles.settingRow} key={row.key}>
                      <div className={styles.settingRowText}>
                        <span className={`${styles.settingLabel} ${styles.settingLabelInert}`}>
                          {row.label}
                        </span>
                        <span className={styles.settingKey}>{row.key}</span>
                      </div>
                      <span className={styles.settingInertValue}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
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
