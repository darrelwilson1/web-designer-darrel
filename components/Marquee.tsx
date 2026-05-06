'use client';

/* ============================================================
   Marquee — infinite horizontal scroll. Items duplicated for
   seamless loop. Speed controlled by `speed` (px/sec).
   Also picks up scroll velocity to feel reactive.
   ============================================================ */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Marquee.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  items: string[];
  speed?: number;
  className?: string;
};

export default function Marquee({ items, speed = 80, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let direction = -1;
    let baseSpeed = speed;
    let velocityBoost = 0;

    const half = track.scrollWidth / 2;
    let x = 0;

    const tick = (delta: number) => {
      x += direction * (baseSpeed + velocityBoost) * delta;
      if (x <= -half) x += half;
      if (x >= 0) x -= half;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      velocityBoost *= 0.92;
    };

    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      tick(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        direction = self.direction === 1 ? -1 : 1;
        velocityBoost = Math.min(Math.abs(self.getVelocity()) * 0.4, 800);
      },
    });

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
    };
  }, [speed]);

  return (
    <div className={`${styles.wrap} ${className ?? ''}`}>
      <div ref={trackRef} className={styles.track}>
        {[...items, ...items].map((it, i) => (
          <span key={i} className={styles.item}>
            {it}
            <span className={styles.dot} aria-hidden>●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
