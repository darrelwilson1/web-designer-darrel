'use client';

/* ============================================================
   StatsSection — count-up animation triggered when in view.
   Uses GSAP to tween a number prop and write to DOM directly.
   ============================================================ */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StatsSection.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

type Stat = { value: number; suffix?: string; label: string };

const STATS: Stat[] = [
  { value: 84, suffix: '+', label: 'Clients shipped' },
  { value: 142, suffix: '', label: 'Projects launched' },
  { value: 11, suffix: 'yr', label: 'Years in the trenches' },
  { value: 27, suffix: 'M', label: 'Users reached' },
];

export default function StatsSection({ stats = STATS }: { stats?: Stat[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(`.${styles.numWrap}`).forEach((el) => {
        const num = el.querySelector<HTMLElement>(`.${styles.num}`);
        if (!num) return;
        const target = parseFloat(num.dataset.value || '0');
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 2.2,
              ease: 'power3.out',
              onUpdate: () => {
                num.textContent = Math.round(obj.v).toString();
              },
            });
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={styles.wrap}>
      {stats.map((s) => (
        <div key={s.label} className={styles.numWrap}>
          <div className={styles.row}>
            <span className={styles.num} data-value={s.value}>0</span>
            {s.suffix && <span className={styles.suffix}>{s.suffix}</span>}
          </div>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
