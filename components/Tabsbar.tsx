import { VscSplitHorizontal } from 'react-icons/vsc';

import Tab from '@/components/Tab';

import styles from '@/styles/Tabsbar.module.css';

interface TabsbarProps {
  onSplitEditor?: () => void;
}

const Tabsbar = ({ onSplitEditor }: TabsbarProps) => {
  return (
    <div className={styles.tabs}>
      <Tab icon="/logos/react_icon.svg" filename="home.tsx" path="/" />
      <Tab icon="/logos/html_icon.svg" filename="about.html" path="/about" />
      <Tab icon="/logos/css_icon.svg" filename="contact.css" path="/contact" />
      <Tab icon="/logos/js_icon.svg" filename="projects.js" path="/projects" />
      <Tab
        icon="/logos/txt_icon.svg"
        filename="now.txt"
        path="/now"
      />
      <Tab
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

export default Tabsbar;
