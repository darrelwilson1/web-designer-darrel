'use client';

/* ============================================================
   ProcessSteps — 4 numbered steps. Massive numerals are the
   primary design element. Each row pinned briefly via
   ScrollTrigger so the number reveals with a clip-path mask.
   ============================================================ */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProcessSteps.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    body: 'We dig into your business, your audience, and the gap you are trying to close. No briefs taken at face value.',
  },
  {
    n: '02',
    title: 'Define',
    body: 'A sharpened strategy, a clear point of view, a brand and product narrative everyone on the team can repeat from memory.',
  },
  {
    n: '03',
    title: 'Design',
    body: 'Identity, interface, and motion crafted in tight loops. We prototype real interactions, not screen mockups.',
  },
  {
    n: '04',
    title: 'Deploy',
    body: 'Engineered for performance and built to ship. We hand off code, systems, and the playbook to keep growing.',
  },
];

export default function ProcessSteps() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(`.${styles.row}`).forEach((row) => {
        const num = row.querySelector(`.${styles.num} .reveal-inner`);
        const title = row.querySelector(`.${styles.title} .reveal-inner`);
        const body = row.querySelector(`.${styles.body}`);
        gsap.set([num, title], { yPercent: 110 });
        gsap.set(body, { opacity: 0, y: 24 });
        ScrollTrigger.create({
          trigger: row,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(num, { yPercent: 0, duration: 1.1, ease: 'power4.out' });
            gsap.to(title, { yPercent: 0, duration: 1.1, ease: 'power4.out', delay: 0.06 });
            gsap.to(body, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.18 });
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={styles.wrap}>
      {STEPS.map((s) => (
        <div key={s.n} className={styles.row}>
          <div className={styles.num}>
            <span className="reveal-inner">{s.n}</span>
          </div>
          <div className={styles.text}>
            <h3 className={styles.title}>
              <span className="reveal-inner">{s.title}</span>
            </h3>
            <p className={styles.body}>{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
