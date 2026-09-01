import { VscSplitHorizontal } from 'react-icons/vsc';

import OpenFileTab from '@/components/OpenFileTab';

import styles from '@/styles/OpenFiles.module.css';

interface OpenFilesProps {
  onSplitEditor?: () => void;
}

const OpenFiles = ({ onSplitEditor }: OpenFilesProps) => {
  return (
    <div className={styles.tabs}>
      <OpenFileTab icon="/logos/react_icon.svg" filename="home.tsx" path="/" />
      <OpenFileTab icon="/logos/html_icon.svg" filename="about.html" path="/about" />
      <OpenFileTab icon="/logos/css_icon.svg" filename="contact.css" path="/contact" />
      <OpenFileTab icon="/logos/js_icon.svg" filename="projects.js" path="/projects" />
      <OpenFileTab
        icon="/logos/txt_icon.svg"
        filename="now.txt"
        path="/now"
      />
      <OpenFileTab
        icon="/logos/markdown_icon.svg"
        filename="github.md"
        path="/github"
      />
      {onSplitEditor && (
        <button
          className={styles.splitButton}
          onClick={onSplitEditor}
          title="Split Editor Right"
        >
          <VscSplitHorizontal size={16} />
        </button>
      )}
    </div>
  );
};

export default OpenFiles;
