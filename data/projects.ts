export interface Project {
  title: string;
  description: string;
  logo: string;
  link: string;
  slug: string;
}

export const projects: Project[] = [
  {
    title: 'Synapse',
    description:
      'A collaborative study platform combining shared notes with private, AI-powered revision tools like summaries, flashcards, quizzes, and an AI study assistant.',
    logo: '/logos/synapse.svg',
    link: 'https://github.com/Yanliangchan',
    slug: 'synapse',
  },
  {
    title: 'Hookline',
    description:
      'A gamified phishing simulator that tests and improves your ability to spot malicious emails through an inbox-based investigation game.',
    logo: '/logos/hookline.svg',
    link: 'https://github.com/Yanliangchan',
    slug: 'hookline',
  },
];
