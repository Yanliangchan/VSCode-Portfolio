'use client';

import { useState, useRef, useEffect } from 'react';
import { VscTerminal, VscClose } from 'react-icons/vsc';

import { THEME_KEYS, HIDDEN_THEME_KEYS } from '@/lib/themes';
import styles from '@/styles/Terminal.module.css';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

const commands: Record<string, () => string[]> = {
  help: () => [
    'Available commands:',
    '  help      - Show this help message',
    '  about     - About me',
    '  skills    - My technical skills',
    '  projects  - View my projects',
    '  contact   - Contact information',
    '  theme     - Change theme (usage: theme <name>)',
    '  themes    - List available themes',
    '  clear     - Clear terminal',
    '  date      - Show current date',
    '  whoami    - Who am I?',
    '  ls        - List directory contents',
    '  pwd       - Print working directory',
    '  echo      - Echo text (usage: echo <text>)',
  ],
  about: () => [
    "Hi, I'm Chan Yanliang!",
    'A cybersecurity enthusiast and Officer with the Ministry of Defence,',
    'Singapore. My interests span offensive security, defensive security,',
    'software development, automation, and artificial intelligence.',
  ],
  skills: () => [
    'Technical Skills:',
    '  Cybersecurity: Penetration Testing, Digital Forensics, OSINT',
    '  Development:   Python, TypeScript, React, Next.js, Node.js',
    '  Systems:       Linux, Windows, PostgreSQL, MongoDB',
    '  Other:         AI, Teaching, Leadership, Project Management',
  ],
  projects: () => [
    'Selected Projects:',
    '  1. Synapse - Collaborative study platform with AI revision tools',
    '  2. Hookline - Gamified phishing simulator',
    '',
    'Visit the Projects tab for more details.',
  ],
  contact: () => [
    'Contact Information:',
    '  Email:    yanliangchan@gmail.com',
    '  GitHub:   github.com/Yanliangchan',
    '  LinkedIn: linkedin.com/in/yanliangchan',
  ],
  themes: () => [
    'Available themes:',
    ...THEME_KEYS.map((theme, i) => `  ${theme}${i === 0 ? '  (default)' : ''}`),
    '',
    'Use "theme <name>" to change theme.',
  ],
  date: () => [new Date().toString()],
  whoami: () => ['visitor@portfolio ~ exploring awesome projects'],
  ls: () => ['about/', 'projects/', 'skills/', 'contact/', 'README.md'],
  pwd: () => ['/home/visitor/portfolio'],
  sudo: () => ['Permission denied: nice try 😉'],
  vim: () => [
    'Entering Vim...',
    ':wq',
    ':q!',
    'ESC :q!',
    'Just kidding — you can\'t leave. (Type "exit" to actually leave.)',
  ],
  exit: () => ["You can't leave. This is a permanent commitment now."],
  sl: () => [
    '      ====        ________                ___________',
    '  _D _|  |_______/        \\__I_I_____===__|_________|',
    '   |(_)---  |   H\\________/ |   |        =|___ ___|',
    '   /     |  |   H  |  |     |   |         ||_| |_||',
    '  |      |  |   H  |__--------------------| [___] |',
    '  | ________|___H__/__|_____/[][]~\\_______|       |',
    '  |/ |   |-----------I_____I [][] []  D   |=======|__',
    '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|',
    ' |/-=|___|=    ||    ||    ||    |_____/~\\___/',
    '  \\_/      \\_/   \\_/   \\_/    \\_/     \\_/',
  ],
};

const processCommand = (input: string): TerminalLine[] => {
  const trimmed = input.trim();
  const lines: TerminalLine[] = [{ type: 'input', content: `$ ${trimmed}` }];

  if (!trimmed) {
    return lines;
  }

  const parts = trimmed.split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (cmd === 'clear') {
    return [];
  }

  if (cmd === 'theme' && args[0]) {
    if ((THEME_KEYS as string[]).includes(args[0]) || (HIDDEN_THEME_KEYS as readonly string[]).includes(args[0])) {
      document.documentElement.setAttribute('data-theme', args[0]);
      localStorage.setItem('theme', args[0]);
      lines.push({ type: 'output', content: `Theme changed to ${args[0]}` });
    } else {
      lines.push({ type: 'error', content: `Unknown theme: ${args[0]}. Type "themes" for available options.` });
    }
    return lines;
  }

  if (cmd === 'theme') {
    lines.push({ type: 'error', content: 'Usage: theme <name>. Type "themes" for available options.' });
    return lines;
  }

  if (cmd === 'matrix') {
    window.dispatchEvent(new CustomEvent('toggle-matrix-rain'));
    lines.push({ type: 'output', content: 'Wake up, Yanliang...' });
    return lines;
  }

  if (cmd === 'echo') {
    lines.push({ type: 'output', content: args.join(' ') });
    return lines;
  }

  if (cmd === 'cat') {
    const filename = args[0];
    if (!filename) {
      lines.push({ type: 'error', content: 'Usage: cat <file>' });
    } else if (filename === 'flag.txt') {
      lines.push({ type: 'output', content: 'flag{welcome_to_yanliangs_terminal}' });
      lines.push({ type: 'output', content: '' });
      lines.push({ type: 'output', content: 'nice work finding this. see you in the CTF scene.' });
    } else {
      lines.push({ type: 'error', content: `cat: ${filename}: No such file or directory` });
    }
    return lines;
  }

  if (commands[cmd]) {
    const output = commands[cmd]();
    output.forEach(line => {
      lines.push({ type: 'output', content: line });
    });
  } else {
    lines.push({ type: 'error', content: `Command not found: ${cmd}. Type "help" for available commands.` });
  }

  return lines;
};

const SCAN_LINES = [
  '',
  'Starting scan...',
  'Scanning ports 1-1000...',
  '22/tcp   open   ssh',
  '443/tcp  open   https',
  '1337/tcp open   elite',
  '',
  'Scan complete. No vulnerabilities found — good opsec 👀',
];

interface TerminalProps {
  onToggle: () => void;
}

const Terminal = ({ onToggle }: TerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to the interactive terminal!' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    const cmd = trimmed.split(' ')[0]?.toLowerCase();

    if (trimmed === 'clear') {
      setLines([]);
    } else if ((cmd === 'nmap' || cmd === 'hack') && !isAnimating) {
      setLines(prev => [...prev, { type: 'input', content: `$ ${trimmed}` }]);
      setIsAnimating(true);
      SCAN_LINES.forEach((line, i) => {
        setTimeout(() => {
          setLines(prev => [...prev, { type: 'output', content: line }]);
          if (i === SCAN_LINES.length - 1) setIsAnimating(false);
        }, (i + 1) * 220);
      });
    } else {
      const newLines = processCommand(input);
      setLines(prev => [...prev, ...newLines]);
    }

    if (trimmed) {
      setCommandHistory(prev => [...prev, trimmed]);
    }
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <VscTerminal className={styles.terminalIcon} />
          <span>Terminal</span>
        </div>
        <div className={styles.headerRight}>
          <button onClick={onToggle} className={styles.headerBtn} title="Close">
            <VscClose size={14} />
          </button>
        </div>
      </div>
      <div className={styles.body} ref={terminalRef} onClick={handleTerminalClick}>
        {lines.map((line, index) => (
          <div
            key={index}
            className={`${styles.line} ${
              line.type === 'error' ? styles.error : line.type === 'input' ? styles.input : ''
            }`}
          >
            {line.content}
          </div>
        ))}
        <form onSubmit={handleSubmit} className={styles.inputLine}>
          <span className={styles.prompt}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.input}
            autoComplete="off"
            spellCheck={false}
            disabled={isAnimating}
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
