export type CommitType =
  | 'init'
  | 'feat'
  | 'build'
  | 'test'
  | 'job'
  | 'community'
  | 'docs'
  | 'release'
  | 'award'
  | 'refactor';

export const COMMIT_TYPE_LABELS: Record<CommitType, string> = {
  init: 'origin',
  feat: 'new chapter',
  build: 'shipped',
  test: 'competed',
  job: 'day job',
  community: 'volunteering',
  docs: 'learning',
  release: 'milestone',
  award: 'recognition',
  refactor: 'reinvention',
};

interface ListItem {
  name: string;
  description: string;
}

export interface CommitEntry {
  id: string;
  year: string;
  type: CommitType;
  slug: string;
  title: string;
  /** Short commit-subject-style summary. */
  description: string;
  /** Extra paragraphs, like a commit body. */
  body?: string[];
  /** Small muted context line (e.g. award organiser credit). */
  meta?: string;
  /** Rendered as a fake `$ ls <label>/` directory listing. */
  list?: { label: string; items: ListItem[] };
  /** Rendered as a fake `$ cat <file>` dump — for the one entry worth quoting in full. */
  quote?: { file: string; text: string };
  link?: { href: string; label: string };
}

export const commitLog: CommitEntry[] = [
  {
    id: '2017-learn-python',
    year: '2017',
    type: 'init',
    slug: 'learn_python',
    title: 'Learn Python',
    description:
      'Started learning Python through YouTube and self-learning — the first commit in a much longer log.',
  },
  {
    id: '2021-top-python-course',
    year: '2021',
    type: 'award',
    slug: 'top_python_course',
    title: 'Top the Python Course',
    description:
      "Selected for school's Python programme, topped the course, and won the final project.",
  },
  {
    id: '2021-build-beyond-the-code',
    year: '2021',
    type: 'build',
    slug: 'build_beyond_the_code',
    title: 'Build Beyond the Code',
    description:
      'Built my first portfolio project for the Early Admissions Exercise (EAE), and secured my first-choice diploma.',
  },
  {
    id: '2022-enter-cybersecurity',
    year: '2022',
    type: 'feat',
    slug: 'enter_cybersecurity',
    title: 'Enter Cybersecurity',
    description: 'Joined my first DSTA CDDC (Cyber Defence Discovery Camp) and discovered CTFs.',
  },
  {
    id: '2022-compete',
    year: '2022',
    type: 'test',
    slug: 'compete',
    title: 'Compete',
    description:
      'Competed in Shopee Code League, and started trying out LeetCode — testing skills under pressure.',
  },
  {
    id: '2022-teach-robotics',
    year: '2022',
    type: 'job',
    slug: 'teach_robotics',
    title: 'Teach Robotics',
    description: 'Started as an educator at NK Robotics.',
    body: [
      'Teaching a diverse age range of students, from 5 to 17 years old — LEGO Mindstorms EV3 robotics, alongside coding languages like Scratch and Python.',
    ],
  },
  {
    id: '2022-sap-appgyver-champion',
    year: '2022',
    type: 'award',
    slug: 'sap_appgyver_champion',
    title: 'SAP AppGyver Champion',
    description:
      'Won SAP AppGyver Champion — built a gamified app that uses AI to incentivise recycling.',
    meta: 'SAP, Temasek Polytechnic · Dec 2022',
    body: [
      'Drafted a short- and long-term business plan so the app could stay scalable and reach a larger market.',
    ],
    link: { href: '/about#awards', label: 'view awards' },
  },
  {
    id: '2023-lead',
    year: '2023',
    type: 'feat',
    slug: 'lead',
    title: 'Lead',
    description: "Took on technical and leadership roles across NP's tech communities.",
    list: {
      label: 'roles',
      items: [
        { name: 'ORION SIG', description: 'Exec. Vice-President' },
        { name: 'ICT Society', description: 'Head of Project' },
        { name: 'NullSec', description: 'Head of Tech' },
        { name: 'GDSC', description: 'Tech Specialist' },
      ],
    },
    link: { href: '/about#education', label: 'view education' },
  },
  {
    id: '2023-serve-the-community',
    year: '2023',
    type: 'community',
    slug: 'serve_the_community',
    title: 'Serve the Community',
    description:
      'Contributed through hosting and planning workshops and seminars, and guiding youths in cyber.',
    body: ['Recognised through the Student Volunteer Recognition Programme.'],
    link: { href: '/about#awards', label: 'view awards' },
  },
  {
    id: '2023-join-isc2',
    year: '2023',
    type: 'feat',
    slug: 'join_isc2',
    title: 'Join ISC²',
    description: 'Joined the ISC² Singapore Chapter Youth Wing as a founding member.',
    body: [
      'Served as Secretary, supporting the lead and vice-lead in founding the group.',
    ],
    link: { href: '/about#experience', label: 'view experience' },
  },
  {
    id: '2024-security-consulting',
    year: '2024',
    type: 'feat',
    slug: 'security_consulting',
    title: 'Security Consulting',
    description: 'Joined CSA as a Cyber Security Consultant intern.',
    body: [
      'Worked in security consulting and VAPT (Vulnerability Assessment & Penetration Testing) for CSA-approved solutions.',
    ],
    link: { href: '/about#experience', label: 'view experience' },
  },
  {
    id: '2024-keep-learning',
    year: '2024',
    type: 'docs',
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
    meta: 'AiSP, supported by CSA & the Singapore Cyber Security Inter-Association',
    body: [
      "Now in its eighth year, The Cybersecurity Awards honours outstanding contributions to Singapore's and the region's cybersecurity ecosystem. Organised by the Association of Information Security Professionals (AiSP), and supported by the Cyber Security Agency of Singapore and the Singapore Cyber Security Inter-Association — CSCIS, Cloud Security Alliance Singapore, ISACA Singapore, (ISC)² Singapore, the Law Society of Singapore, Singapore Computer Society, SGTech, and OT-ISAC.",
    ],
    quote: {
      file: 'reflection.txt',
      text: "Cybersecurity is more than defending code — it's about building resilience and trust. As a cybersecurity student, I'm committed to growing my expertise while contributing to real-world resilience. By combining technical skills with a willingness to lead and learn, I know that true resilience is built not only through knowledge but also through dedication and mindset. I take pride in approaching challenges with persistence and curiosity, turning complexity into opportunities for growth and impact. My goal is to embed automated security into the software development lifecycle — transforming complex defence protocols into an automatic function that frees developers to innovate.",
    },
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
    list: {
      label: 'projects',
      items: [
        { name: 'Enlisted', description: 'A SAF-themed FPS game' },
        { name: 'Hookline', description: 'A gamified phishing simulator' },
        { name: 'Synapse', description: 'A collaborative note-taking app' },
        { name: 'CodeProof', description: 'An online code checker enforcing coding standards' },
      ],
    },
  },
];
