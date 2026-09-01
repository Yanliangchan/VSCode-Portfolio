export type CommitType = 'feat' | 'release' | 'award' | 'refactor';

export interface CommitEntry {
  id: string;
  year: string;
  type: CommitType;
  slug: string;
  title: string;
  description: string;
  link?: { href: string; label: string };
}

export const commitLog: CommitEntry[] = [
  {
    id: '2021-learn-python',
    year: '2021',
    type: 'feat',
    slug: 'learn_python',
    title: 'Learn Python',
    description: 'Started learning Python through YouTube and self-learning.',
  },
  {
    id: '2021-win-first-raspberry-pi',
    year: '2021',
    type: 'feat',
    slug: 'win_first_raspberry_pi',
    title: 'Win First Raspberry Pi',
    description:
      "Selected for school's Python programme and topped the Python course, winning the final project.",
  },
  {
    id: '2021-build-beyond-the-code',
    year: '2021',
    type: 'feat',
    slug: 'build_beyond_the_code',
    title: 'Build Beyond the Code',
    description: 'Built my first portfolio for EAE and secured my first-choice diploma.',
  },
  {
    id: '2022-enter-cybersecurity',
    year: '2022',
    type: 'feat',
    slug: 'enter_cybersecurity',
    title: 'Enter Cybersecurity',
    description: 'Joined my first DSTA CDDC and discovered CTFs.',
  },
  {
    id: '2022-compete',
    year: '2022',
    type: 'feat',
    slug: 'compete',
    title: 'Compete',
    description: 'Competed in Shopee Code League and other cybersecurity challenges.',
  },
  {
    id: '2022-give-back',
    year: '2022',
    type: 'feat',
    slug: 'give_back',
    title: 'Give Back',
    description: 'Began teaching Python, Scratch, and robotics to students aged 5–17.',
    link: { href: '/about#experience', label: 'view experience' },
  },
  {
    id: '2023-lead',
    year: '2023',
    type: 'feat',
    slug: 'lead',
    title: 'Lead',
    description: "Took on technical and leadership roles across NP's tech communities.",
    link: { href: '/about#education', label: 'view education' },
  },
  {
    id: '2023-serve-the-community',
    year: '2023',
    type: 'feat',
    slug: 'serve_the_community',
    title: 'Serve the Community',
    description: 'Recognised through the Student Volunteer Recognition Programme.',
    link: { href: '/about#awards', label: 'view awards' },
  },
  {
    id: '2023-join-isc2',
    year: '2023',
    type: 'feat',
    slug: 'join_isc2',
    title: 'Join ISC²',
    description: 'Joined the ISC2 Singapore Chapter Youth Wing.',
    link: { href: '/about#experience', label: 'view experience' },
  },
  {
    id: '2024-security-consulting',
    year: '2024',
    type: 'feat',
    slug: 'security_consulting',
    title: 'Security Consulting',
    description:
      'Joined CSA as a Cyber Security Consultant intern, working in security consulting and VAPT for CSA-approved solutions.',
    link: { href: '/about#experience', label: 'view experience' },
  },
  {
    id: '2024-keep-learning',
    year: '2024',
    type: 'feat',
    slug: 'keep_learning',
    title: 'Keep Learning',
    description: 'Continued competing, completing CTFs, and attending Black Hat Asia.',
  },
  {
    id: '2025-graduate',
    year: '2025',
    type: 'release',
    slug: 'graduate',
    title: 'Graduate',
    description:
      'Graduated with a Diploma in Cybersecurity and Digital Forensics, with a minor in Psychology.',
    link: { href: '/about#education', label: 'view education' },
  },
  {
    id: '2025-cybersecurity-award',
    year: '2025',
    type: 'award',
    slug: 'cybersecurity_award',
    title: 'Cybersecurity Award',
    description: 'Won The Cybersecurity Award 2025, Student Category.',
    link: { href: '/about#awards', label: 'view awards' },
  },
  {
    id: '2025-join-dis',
    year: '2025',
    type: 'feat',
    slug: 'join_dis',
    title: 'Join DIS',
    description: "Signed on as an officer in MINDEF's Digital and Intelligence Service.",
    link: { href: '/about#experience', label: 'view experience' },
  },
  {
    id: '2026-keep-building',
    year: '2026',
    type: 'refactor',
    slug: 'keep_building',
    title: 'Keep Building',
    description: 'Rebranded my portfolio and continued building side projects.',
  },
];
