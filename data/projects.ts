import { Project } from '@/types';

const SAF_DISCLAIMER =
  'Built for fun, set during Singapore’s National Service. All SAF unit and equipment details are drawn from public sources (Wikipedia’s "Singapore Army" and "List of equipment of the Singapore Army" articles) — not affiliated with or endorsed by MINDEF or the SAF.';

export const projects: Project[] = [
  {
    title: 'Synapse',
    description:
      'A collaborative study platform combining shared notes with private, AI-powered revision tools like summaries, flashcards, quizzes, and an AI study assistant.',
    logo: '/logos/synapse.svg',
    link: 'https://synapse.yanliangchan.com/',
    slug: 'synapse',
    tier: 'work',
  },
  {
    title: 'Hookline',
    description:
      'A gamified phishing simulator that tests and improves your ability to spot malicious emails through an inbox-based investigation game.',
    logo: '/logos/hookline.svg',
    link: 'https://hookline.yanliangchan.com/',
    slug: 'hookline',
    tier: 'work',
  },
  {
    title: 'CodeProof',
    description:
      'An online code checker that lints submissions against language-specific style and best-practice standards, giving instant, actionable feedback.',
    logo: '/logos/codeproof.svg',
    link: 'https://code.yanliangchan.com/',
    slug: 'codeproof',
    tier: 'work',
  },
  {
    title: 'Project-Eidolon',
    description:
      'A personal knowledge-management "second brain" that fine-tunes an AI model on my own notes, so it can draft emails and notes that already read in my voice.',
    logo: '/logos/eidolon.svg',
    link: 'https://eidolon.yanliangchan.com/',
    slug: 'project-eidolon',
    tier: 'work',
  },
  {
    title: 'Enlisted',
    description:
      'A first-person shooter that recreates Singapore Army National Service training scenarios and equipment — a fan-made project built purely for fun.',
    logo: '/logos/enlisted.svg',
    link: 'https://enlisted.yanliangchan.com/',
    slug: 'enlisted',
    tier: 'game',
    disclaimer: SAF_DISCLAIMER,
  },
  {
    title: 'Command',
    description:
      'A turn-based grand-strategy wargame where you command Singapore Army units and equipment across SAF-inspired scenarios — a fan-made project built purely for fun.',
    logo: '/logos/command.svg',
    link: 'https://command.yanliangchan.com/',
    slug: 'command',
    tier: 'game',
    disclaimer: SAF_DISCLAIMER,
  },
];
