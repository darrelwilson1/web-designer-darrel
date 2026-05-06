'use client';

/* ============================================================
   ServiceCard — 3D tilt on hover via custom transform.
   Reads pointer position over the card and maps to rotateX/Y.
   ============================================================ */

import { useRef } from 'react';
import { gsap } from 'gsap';
import styles from './ServiceCard.module.css';

type Props = {
  index: string;
  title: string;
  description: string;
  capabilities: string[];
};

export default function ServiceCard({ index, title, description, capabilities }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const card = ref.current!;
    const inner = innerRef.current!;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(inner, {
      rotateY: x * 14,
      rotateX: -y * 14,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 900,
    });
  };
  const onLeave = () => {
    gsap.to(innerRef.current!, {
      rotateX: 0, rotateY: 0,
      duration: 0.9, ease: 'elastic.out(1, 0.45)',
    });
  };

  return (
    <div
      ref={ref}
      className={styles.card}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor="link"
    >
      <div ref={innerRef} className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.idx}>{index}</span>
          <span className={styles.dot} aria-hidden />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        <ul className={styles.caps}>
          {capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <span className={styles.glow} aria-hidden />
      </div>
    </div>
  );
}
