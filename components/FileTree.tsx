'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { VscChevronRight } from 'react-icons/vsc';

import { useResizable } from '@/lib/useResizable';
import styles from '@/styles/FileTree.module.css';

export const fileTreeItems = [
  {
    name: 'home.tsx',
    path: '/',
    icon: '/logos/react_icon.svg',
  },
  {
    name: 'about.html',
    path: '/about',
    icon: '/logos/html_icon.svg',
  },
  {
    name: 'contact.css',
    path: '/contact',
    icon: '/logos/css_icon.svg',
  },
  {
    name: 'projects.js',
    path: '/projects',
    icon: '/logos/js_icon.svg',
  },
  {
    name: 'now.txt',
    path: '/now',
    icon: '/logos/txt_icon.svg',
  },
  {
    name: 'github.md',
    path: '/github',
    icon: '/logos/markdown_icon.svg',
  },
];

// Decorative only — not real routes, just for the visual depth of a real project tree.
const componentItems = [
  { name: 'Layout.tsx', icon: '/logos/react_icon.svg' },
  { name: 'Terminal.tsx', icon: '/logos/react_icon.svg' },
  { name: 'CommandPalette.tsx', icon: '/logos/react_icon.svg' },
  { name: 'Sidebar.tsx', icon: '/logos/react_icon.svg' },
];

interface FolderProps {
  label: string;
  depth: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const Folder = ({ label, depth, defaultOpen = true, children }: FolderProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <div
        className={styles.heading}
        style={{ paddingLeft: `${0.5 + depth * 0.75}rem` }}
        role="button"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
      >
        <VscChevronRight
          className={styles.chevron}
          style={open ? { transform: 'rotate(90deg)' } : {}}
        />
        {label}
      </div>
      <div
        className={styles.files}
        style={open ? { display: 'block' } : { display: 'none' }}
      >
        {children}
      </div>
    </div>
  );
};

const MIN_WIDTH = 160;
const MAX_WIDTH = 480;

const measureWidth = (rect: DOMRect, e: MouseEvent) => e.clientX - rect.left;

const FileTree = () => {
  const { size: width, elementRef: treeRef, handleDragStart } = useResizable({
    axis: 'horizontal',
    min: MIN_WIDTH,
    max: MAX_WIDTH,
    cursor: 'col-resize',
    measure: measureWidth,
  });

  return (
    <div
      className={styles.explorer}
      ref={treeRef}
      style={width !== null ? { width: `${width}px` } : undefined}
    >
      <p className={styles.title}>Explorer</p>
      <Folder label="Portfolio" depth={0}>
        <Folder label="pages" depth={1}>
          {fileTreeItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className={styles.file} style={{ paddingLeft: '2.25rem' }}>
                <Image src={item.icon} alt={item.name} height={18} width={18} />{' '}
                <p>{item.name}</p>
              </div>
            </Link>
          ))}
        </Folder>
        <Folder label="components" depth={1} defaultOpen={false}>
          {componentItems.map((item) => (
            <div
              className={`${styles.file} ${styles.fileDisabled}`}
              style={{ paddingLeft: '2.25rem' }}
              key={item.name}
            >
              <Image src={item.icon} alt={item.name} height={18} width={18} />{' '}
              <p>{item.name}</p>
            </div>
          ))}
        </Folder>
      </Folder>
      <div
        className={styles.resizeHandle}
        onMouseDown={handleDragStart}
        title="Drag to resize"
      />
    </div>
  );
};

export default FileTree;
