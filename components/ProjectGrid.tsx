'use client';

/* ============================================================
   ProjectGrid — 6 cards in a staggered grid. Each card has a
   real photographic cover (Unsplash) with a dark gradient and
   a red overlay on hover. Hover reveals the project name, year
   and category in white.
   ============================================================ */

import styles from './ProjectGrid.module.css';

export type Project = {
  name: string;
  client: string;
  category: string;
  year: string;
  /** Cover image URL — should be a 16:9 or 4:5 ratio CDN image */
  image: string;
  /** Object-position override, e.g. 'center 30%' to nudge the focal point */
  position?: string;
};

const DEFAULT_PROJECTS: Project[] = [
  {
    name: 'Halcyon',
    client: 'Halcyon Audio',
    category: 'Brand × Web',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80',
    position: 'center',
  },
  {
    name: 'Northbound',
    client: 'Northbound Capital',
    category: 'Identity',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=1400&q=80',
    position: 'center',
  },
  {
    name: 'Vertex',
    client: 'Vertex Mobility',
    category: 'Product',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80',
    position: 'center 60%',
  },
  {
    name: 'Soma',
    client: 'Soma Skincare',
    category: 'E-commerce',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80',
    position: 'center',
  },
  {
    name: 'Tessera',
    client: 'Tessera Studio',
    category: 'Editorial',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1400&q=80',
    position: 'center 35%',
  },
  {
    name: 'Origin',
    client: 'Origin Robotics',
    category: 'Brand × Motion',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80',
    position: 'center',
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={`${p.client} — ${p.category}`}
            className={styles.cover}
            style={{ objectPosition: p.position }}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.tint} aria-hidden />
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
