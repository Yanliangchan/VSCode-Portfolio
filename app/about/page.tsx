'use client';

import { VscGithub, VscMail } from 'react-icons/vsc';
import Link from 'next/link';

import styles from '@/styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.name}>Chan Yanliang</h1>
              <p className={styles.role}>Cybersecurity Professional</p>
              <div className={styles.location}>
                <span className={styles.dot} />
                Singapore
              </div>
            </div>
          </div>

          <div className={styles.headerActions}>
            <a
              href="https://github.com/Yanliangchan"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconButton}
            >
              <VscGithub size={20} />
            </a>
            <Link href="/contact" className={styles.iconButton}>
              <VscMail size={20} />
            </Link>
          </div>
        </header>

        <div className={styles.content}>
          {/* Bio Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>01</span>
              <h2 className={styles.sectionTitle}>About Me</h2>
            </div>

            <div className={styles.sectionBody}>
              <p className={styles.paragraph}>Hello 👋 I&apos;m Yanliang.</p>

              <p className={styles.paragraph}>
                I&apos;m a cybersecurity professional with a background in
                Cybersecurity &amp; Digital Forensics. My interests span
                offensive security, defensive security, software development,
                automation, and artificial intelligence.
              </p>

              <p className={styles.paragraph}>
                I enjoy working across different parts of technology. One day,
                I might be analysing a system or learning how an operating
                system works. Another day, I might be building a web
                application, automating a repetitive workflow, or
                experimenting with AI.
              </p>

              <p className={styles.paragraph}>
                Outside of technical work, I enjoy teaching and contributing
                to the cybersecurity community. I&apos;ve worked with
                students, youth organisations, and cybersecurity communities
                through workshops, CTFs, robotics programmes, and technology
                events.
              </p>

              <p className={styles.paragraph}>
                I believe the best way to learn technology is to build things
                with it.
              </p>
            </div>
          </section>

          {/* Experience Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>02</span>
              <h2 className={styles.sectionTitle}>Experience</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Present</span>
                </div>
                <h3 className={styles.expRole}>Regular Officer</h3>
                <p className={styles.expCompany}>Ministry of Defence</p>
                <ul className={styles.expList}>
                  <li>
                    Working in a technology-focused military environment
                    where cybersecurity, digital systems, leadership, and
                    operational requirements intersect
                  </li>
                  <li>
                    Developing technical and leadership capabilities through
                    professional military training and real-world problem
                    solving
                  </li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Sep 2024 — Mar 2025</span>
                </div>
                <h3 className={styles.expRole}>Consultant Intern</h3>
                <p className={styles.expCompany}>
                  Cyber Security Agency of Singapore
                </p>
                <ul className={styles.expList}>
                  <li>
                    Gained professional exposure to Singapore&apos;s national
                    cybersecurity landscape
                  </li>
                  <li>
                    Worked on cybersecurity-related projects in a consulting
                    environment
                  </li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Sep 2023 — Present</span>
                </div>
                <h3 className={styles.expRole}>Coding &amp; Robotics Educator</h3>
                <p className={styles.expCompany}>NK Robotics</p>
                <ul className={styles.expList}>
                  <li>Teach programming and robotics to students aged 5 to 17</li>
                  <li>
                    Design and deliver lessons that introduce students to
                    programming, computational thinking, and practical
                    problem solving
                  </li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Jan 2023 — Aug 2025</span>
                </div>
                <h3 className={styles.expRole}>Secretary</h3>
                <p className={styles.expCompany}>
                  ISC² Singapore Chapter Youth Wing
                </p>
                <ul className={styles.expList}>
                  <li>
                    Support the development of youth cybersecurity initiatives
                    and community programmes
                  </li>
                  <li>
                    Help organise cybersecurity events, workshops, CTFs, and
                    activities that connect students and young professionals
                    with the industry
                  </li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Apr 2023 — Sep 2024</span>
                </div>
                <h3 className={styles.expRole}>Head of Technology</h3>
                <p className={styles.expCompany}>NullSec</p>
                <ul className={styles.expList}>
                  <li>
                    Led the technical team in organising cybersecurity
                    workshops, competitions, and community events
                  </li>
                  <li>
                    Developed and reviewed more than 100 challenges for CTF
                    competitions and helped create technical content for
                    participants
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>03</span>
              <h2 className={styles.sectionTitle}>Skills</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.skillsGrid}>
                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Cybersecurity</h4>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>Penetration Testing</span>
                    <span className={styles.skillTag}>Network Security</span>
                    <span className={styles.skillTag}>Digital Forensics</span>
                    <span className={styles.skillTag}>OSINT</span>
                    <span className={styles.skillTag}>Security Testing</span>
                    <span className={styles.skillTag}>Security Automation</span>
                    <span className={styles.skillTag}>Phishing &amp; Social Engineering</span>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Development</h4>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>Python</span>
                    <span className={styles.skillTag}>JavaScript</span>
                    <span className={styles.skillTag}>TypeScript</span>
                    <span className={styles.skillTag}>React</span>
                    <span className={styles.skillTag}>Next.js</span>
                    <span className={styles.skillTag}>Node.js</span>
                    <span className={styles.skillTag}>HTML / CSS</span>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Systems &amp; Infrastructure</h4>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>Linux</span>
                    <span className={styles.skillTag}>Windows</span>
                    <span className={styles.skillTag}>PostgreSQL</span>
                    <span className={styles.skillTag}>MongoDB</span>
                    <span className={styles.skillTag}>Virtualisation</span>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Other</h4>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>Artificial Intelligence</span>
                    <span className={styles.skillTag}>Teaching</span>
                    <span className={styles.skillTag}>Leadership</span>
                    <span className={styles.skillTag}>Project Management</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Selected Projects Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>04</span>
              <h2 className={styles.sectionTitle}>Selected Projects</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>Synapse</h3>
                <p className={styles.expDesc}>
                  A collaborative study platform designed around shared notes
                  and private AI-powered revision. The platform combines
                  real-time collaboration with personalised study tools such
                  as summaries, flashcards, quizzes, and an AI study
                  assistant.
                </p>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>Hookline</h3>
                <p className={styles.expDesc}>
                  A gamified phishing simulator designed to test and improve
                  a user&apos;s ability to identify malicious emails. The
                  experience uses an inbox-based game mechanic where users
                  investigate messages and decide whether they are legitimate
                  or phishing attempts.
                </p>
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>05</span>
              <h2 className={styles.sectionTitle}>Certifications</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>Network Defense Essentials</h3>
                <p className={styles.expCompany}>EC-Council · April 2024</p>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>Enterprise Security Management</h3>
                <p className={styles.expCompany}>Palo Alto Networks · November 2024</p>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>Ethical Hacking Essentials</h3>
                <p className={styles.expCompany}>EC-Council · October 2023</p>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>Google Cybersecurity Certificate</h3>
                <p className={styles.expCompany}>Google · October 2023</p>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>Network Defense</h3>
                <p className={styles.expCompany}>Cisco · May 2022</p>
              </div>
            </div>
          </section>

          {/* Awards Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>06</span>
              <h2 className={styles.sectionTitle}>Awards</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>The Cybersecurity Award 2025</h3>
                <p className={styles.expCompany}>Issued by AISP · Nov 2025</p>
                <p className={styles.expDesc}>
                  Awarded The Cybersecurity Award (TCA) 2025 Student Category.
                </p>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>SAP AppGyver Champion</h3>
                <p className={styles.expCompany}>
                  Issued by SAP, Temasek Polytechnic · Dec 2022
                </p>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>
                  Student Volunteer Recognition Programme (SVRP) 2023
                </h3>
                <p className={styles.expCompany}>
                  Issued by Association of Information Security Professionals
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <Link href="/projects" className={styles.footerLink}>
            View my projects →
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
