'use client';

/* ============================================================
   Testimonials — stacked card slider. Click chips or arrows
   to advance. Active card scales up; the others recede behind.
   ============================================================ */

import { useState } from 'react';
import styles from './Testimonials.module.css';

const QUOTES = [
  {
    quote: 'Wilson rebuilt our brand and our product at the same time, on a deadline most agencies told us was impossible. They shipped both, and revenue is up 38% in two quarters.',
    name: 'Maren Velasco',
    role: 'CEO, Halcyon Audio',
  },
  {
    quote: 'The most opinionated team we have worked with — and it is exactly what we needed. They pushed back where it mattered and the work is sharper for it.',
    name: 'Daniel Iwu',
    role: 'Head of Product, Vertex Mobility',
  },
  {
    quote: 'Every detail of our investor site, from kerning to scroll behavior, came back better than we asked for. Quiet competence at every level.',
    name: 'Priya Anand',
    role: 'Partner, Northbound Capital',
  },
  {
    quote: 'They treat brand and engineering as one craft. The handoff was the cleanest in our company’s history.',
    name: 'Ezra Gold',
    role: 'CTO, Origin Robotics',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = QUOTES.length;

  const go = (dir: 1 | -1) => setActive((a) => (a + dir + total) % total);

  return (
    <div className={styles.wrap}>
      <div className={styles.stack}>
        {QUOTES.map((q, i) => {
          const offset = (i - active + total) % total;
          const z = total - offset;
          return (
            <article
              key={q.name}
              className={styles.card}
              style={{
                transform: `translate3d(${offset * 28}px, ${offset * 22}px, 0) scale(${1 - offset * 0.04})`,
                opacity: offset > 2 ? 0 : 1 - offset * 0.18,
                zIndex: z,
                pointerEvents: offset === 0 ? 'auto' : 'none',
              }}
            >
              <span className={styles.quoteMark} aria-hidden>“</span>
              <p className={styles.quote}>{q.quote}</p>
              <div className={styles.who}>
                <strong>{q.name}</strong>
                <span>{q.role}</span>
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.controls}>
        <button onClick={() => go(-1)} className={styles.btn} aria-label="Previous" data-cursor="link">←</button>
        <div className={styles.chips}>
          {QUOTES.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              data-cursor="link"
              onClick={() => setActive(i)}
              className={`${styles.chip} ${i === active ? styles.chipActive : ''}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} className={styles.btn} aria-label="Next" data-cursor="link">→</button>
      </div>
    </div>
  );
}
