'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { VscGoToFile } from 'react-icons/vsc';

import { fileTreeItems } from '@/components/FileTree';
import { fuzzyFilter } from '@/lib/fuzzyMatch';
import styles from '@/styles/ActionLauncher.module.css';

interface GoToFileProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'navigate' | 'split';
  onSplitSelect?: (path: string) => void;
}

const GoToFile = ({ isOpen, onClose, mode = 'navigate', onSplitSelect }: GoToFileProps) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = fuzzyFilter(fileTreeItems, query, (item) => item.name);

  const handleSelect = useCallback(
    (index: number) => {
      if (index < filtered.length) {
        if (mode === 'split' && onSplitSelect) {
          onSplitSelect(filtered[index].path);
        } else {
          router.push(filtered[index].path);
        }
        onClose();
      }
    },
    [filtered, router, onClose, mode, onSplitSelect]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSelect(selectedIndex);
      }
    },
    [isOpen, onClose, filtered.length, selectedIndex, handleSelect]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.inputWrapper}>
          <VscGoToFile size={20} className={styles.inputIcon} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === 'split' ? 'Select file to open in split view...' : 'Go to file...'}
            className={styles.input}
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        <div className={styles.results} ref={listRef}>
          {filtered.length === 0 ? (
            <div className={styles.noResults}>No matching files</div>
          ) : (
            filtered.map((item, index) => (
              <div
                key={item.path}
                className={`${styles.item} ${
                  selectedIndex === index ? styles.selected : ''
                }`}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className={styles.itemIcon}>
                  <Image src={item.icon} alt="" width={16} height={16} />
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>{item.name}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerItem}>
            <span className={styles.key}>↑↓</span> to navigate
          </div>
          <div className={styles.footerItem}>
            <span className={styles.key}>↵</span> to open
          </div>
          <div className={styles.footerItem}>
            <span className={styles.key}>esc</span> to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoToFile;
