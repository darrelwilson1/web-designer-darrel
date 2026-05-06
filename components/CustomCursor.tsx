'use client';

/* ============================================================
   Custom cursor — two-element setup:
     • dot   = follows pointer 1:1
     • ring  = lerps to pointer, scales/morphs on link/btn hover
   Listens for elements with [data-cursor="link"] or [data-cursor="cta"].
   ============================================================ */

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      const hit = t.closest('[data-cursor]') as HTMLElement | null;
      if (!hit) return;
      const mode = hit.dataset.cursor;
      ring.dataset.state = mode || 'link';
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      const hit = t.closest('[data-cursor]') as HTMLElement | null;
      if (!hit) return;
      ring.dataset.state = '';
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden />
      <div ref={dotRef} className={styles.dot} aria-hidden />
    </>
  );
}
