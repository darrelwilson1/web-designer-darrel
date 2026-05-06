'use client';

/* ============================================================
   ProjectGrid — 6 cards in a staggered grid. Hover reveals a
   red overlay + project name. Uses CSS gradients as cover art
   placeholders so the build needs no image assets.
   ============================================================ */

import styles from './ProjectGrid.module.css';

export type Project = {
  name: string;
  client: string;
  category: string;
  year: string;
  /** any valid CSS background — gradient, image url, etc. */
  art: string;
};

const DEFAULT_PROJECTS: Project[] = [
  {
    name: 'Halcyon',
    client: 'Halcyon Audio',
    category: 'Brand × Web',
    year: '2025',
    art: 'radial-gradient(circle at 30% 20%, #ff2d2d 0%, #6a0d0d 30%, #0a0a0a 70%)',
  },
  {
    name: 'Northbound',
    client: 'Northbound Capital',
    category: 'Identity',
    year: '2025',
    art: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 60%), repeating-linear-gradient(45deg, transparent 0 14px, rgba(255,255,255,0.04) 14px 15px)',
  },
  {
    name: 'Vertex',
    client: 'Vertex Mobility',
    category: 'Product',
    year: '2024',
    art: 'conic-gradient(from 220deg at 60% 40%, #ff2d2d, #1a1a1a, #ff2d2d)',
  },
  {
    name: 'Soma',
    client: 'Soma Skincare',
    category: 'E-commerce',
    year: '2024',
    art: 'linear-gradient(160deg, #efe7df 0%, #cfa9a3 100%)',
  },
  {
    name: 'Tessera',
    client: 'Tessera Studio',
    category: 'Editorial',
    year: '2024',
    art: 'linear-gradient(180deg, #0a0a0a 0%, #0a0a0a 50%, #ff2d2d 50%, #ff2d2d 100%)',
  },
  {
    name: 'Origin',
    client: 'Origin Robotics',
    category: 'Brand × Motion',
    year: '2023',
    art: 'radial-gradient(ellipse at 70% 80%, #2a2a2a 0%, #0a0a0a 60%), linear-gradient(180deg, #1a1a1a, #0a0a0a)',
  },
];

export default function ProjectGrid({ projects = DEFAULT_PROJECTS }: { projects?: Project[] }) {
  return (
    <div className={styles.grid}>
      {projects.map((p, i) => (
        <article
          key={p.name}
          className={`${styles.card} ${i % 3 === 1 ? styles.tall : ''}`}
          data-cursor="view"
        >
          <div className={styles.cover} style={{ background: p.art }} />
          <div className={styles.overlay}>
            <div className={styles.meta}>
              <span>{p.category}</span>
              <span>{p.year}</span>
            </div>
            <h3 className={styles.name}>{p.name}</h3>
            <span className={styles.client}>{p.client}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
