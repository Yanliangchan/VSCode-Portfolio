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
              <p className={styles.role}>Cybersecurity Enthusiast</p>
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

        <div className={styles.body}>
          {/* Main column: narrative content */}
          <div className={styles.main}>
            {/* About Me */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>01</span>
                <h2 className={styles.sectionTitle}>About Me</h2>
              </div>

              <div className={styles.sectionBody}>
                <p className={styles.paragraph}>
                  Hello 👋 I&apos;m Yanliang, a cybersecurity enthusiast with a
                  background in Cybersecurity &amp; Digital Forensics. My
                  interests span offensive and defensive security, software
                  development, automation, and AI — I believe the best way to
                  learn technology is to build things with it.
                </p>

                <p className={styles.paragraph}>
                  Outside of technical work, I enjoy teaching and contributing
                  to the cybersecurity community through workshops, CTFs, and
                  robotics programmes for students and young professionals.
                </p>
              </div>
            </section>

            {/* Experience */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>02</span>
                <h2 className={styles.sectionTitle}>Experience</h2>
              </div>

              <div className={styles.sectionBody}>
                <ol className={styles.timeline}>
                  <li className={styles.timelineItem}>
                    <div className={styles.timelineMarker} />
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineTop}>
                        <h3 className={styles.expRole}>Regular Officer</h3>
                        <span className={styles.expPeriod}>Present</span>
                      </div>
                      <p className={styles.expCompany}>Ministry of Defence</p>
                      <p className={styles.expDesc}>
                        Working in a technology-focused military environment
                        where cybersecurity, digital systems, and leadership
                        intersect.
                      </p>
                    </div>
                  </li>

                  <li className={styles.timelineItem}>
                    <div className={styles.timelineMarker} />
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineTop}>
                        <h3 className={styles.expRole}>Consultant Intern</h3>
                        <span className={styles.expPeriod}>Sep 2024 — Mar 2025</span>
                      </div>
                      <p className={styles.expCompany}>
                        Cyber Security Agency of Singapore
                      </p>
                      <p className={styles.expDesc}>
                        Worked on cybersecurity projects within Singapore&apos;s
                        national cybersecurity agency.
                      </p>
                    </div>
                  </li>

                  <li className={styles.timelineItem}>
                    <div className={styles.timelineMarker} />
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineTop}>
                        <h3 className={styles.expRole}>
                          Coding &amp; Robotics Educator
                        </h3>
                        <span className={styles.expPeriod}>Sep 2023 — Present</span>
                      </div>
                      <p className={styles.expCompany}>NK Robotics</p>
                      <p className={styles.expDesc}>
                        Teaching programming and robotics to students aged 5
                        to 17.
                      </p>
                    </div>
                  </li>

                  <li className={styles.timelineItem}>
                    <div className={styles.timelineMarker} />
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineTop}>
                        <h3 className={styles.expRole}>Secretary</h3>
                        <span className={styles.expPeriod}>Jan 2023 — Aug 2025</span>
                      </div>
                      <p className={styles.expCompany}>
                        ISC² Singapore Chapter Youth Wing
                      </p>
                      <p className={styles.expDesc}>
                        Organised cybersecurity workshops, CTFs, and youth
                        community programmes.
                      </p>
                    </div>
                  </li>

                  <li className={styles.timelineItem}>
                    <div className={styles.timelineMarker} />
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineTop}>
                        <h3 className={styles.expRole}>Head of Technology</h3>
                        <span className={styles.expPeriod}>Apr 2023 — Sep 2024</span>
                      </div>
                      <p className={styles.expCompany}>NullSec</p>
                      <p className={styles.expDesc}>
                        Led the technical team organising CTFs, and developed
                        100+ competition challenges.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Selected Projects */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>03</span>
                <h2 className={styles.sectionTitle}>Selected Projects</h2>
              </div>

              <div className={styles.sectionBody}>
                <div className={styles.projectsGrid}>
                  <div className={styles.projectCard}>
                    <h3 className={styles.expRole}>Synapse</h3>
                    <p className={styles.expDesc}>
                      A collaborative study platform with shared notes and
                      private, AI-powered revision tools.
                    </p>
                  </div>

                  <div className={styles.projectCard}>
                    <h3 className={styles.expRole}>Hookline</h3>
                    <p className={styles.expDesc}>
                      A gamified phishing simulator that tests and improves
                      your ability to spot malicious emails.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar: reference/lookup content */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h4 className={styles.sidebarHeading}>Skills</h4>
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

            <div className={styles.sidebarSection}>
              <h4 className={styles.sidebarHeading}>Certifications</h4>
              <div className={styles.metaList}>
                <div className={styles.metaListItem}>
                  <span>Network Defense Essentials</span>
                  <span>EC-Council · Apr 2024</span>
                </div>
                <div className={styles.metaListItem}>
                  <span>Enterprise Security Management</span>
                  <span>Palo Alto Networks · Nov 2024</span>
                </div>
                <div className={styles.metaListItem}>
                  <span>Ethical Hacking Essentials</span>
                  <span>EC-Council · Oct 2023</span>
                </div>
                <div className={styles.metaListItem}>
                  <span>Google Cybersecurity Certificate</span>
                  <span>Google · Oct 2023</span>
                </div>
                <div className={styles.metaListItem}>
                  <span>Network Defense</span>
                  <span>Cisco · May 2022</span>
                </div>
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h4 className={styles.sidebarHeading}>Awards</h4>
              <div className={styles.metaList}>
                <div className={styles.metaListItem}>
                  <span>The Cybersecurity Award 2025 (Student Category)</span>
                  <span>AISP · Nov 2025</span>
                </div>
                <div className={styles.metaListItem}>
                  <span>SAP AppGyver Champion</span>
                  <span>SAP, Temasek Polytechnic · Dec 2022</span>
                </div>
                <div className={styles.metaListItem}>
                  <span>Student Volunteer Recognition Programme 2023</span>
                  <span>AiSP</span>
                </div>
              </div>
            </div>
          </div>
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
