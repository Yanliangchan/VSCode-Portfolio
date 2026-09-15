import Image from 'next/image';
import { VscLinkExternal } from 'react-icons/vsc';

import { Project } from '@/types';

import styles from '@/styles/ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <Image
            src={project.logo}
            alt={`${project.title} logo`}
            width={18}
            height={18}
            className={styles.logo}
          />
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        {project.tier === 'game' && (
          <span className={styles.badge}>Fan Project</span>
        )}
      </div>

      <p className={styles.description}>{project.description}</p>

      {project.disclaimer && (
        <p className={styles.disclaimer}>{project.disclaimer}</p>
      )}

      <span className={styles.link}>
        View Project
        <VscLinkExternal size={12} />
      </span>
    </a>
  );
};

export default ProjectCard;
