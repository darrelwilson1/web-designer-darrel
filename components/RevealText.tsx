'use client';

/* ============================================================
   RevealText — splits a string into word-spans, each with an
   inner translateY mask. ScrollTrigger plays a stagger reveal
   when the element enters the viewport.
   ============================================================ */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

export default function RevealText({
  as: Tag = 'span',
  children,
  className,
  delay = 0,
  stagger = 0.05,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLElement>('.reveal-inner');
    gsap.set(lines, { yPercent: 110 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(lines, {
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger,
          delay,
        });
      },
    });
    return () => trigger.kill();
  }, [children, delay, stagger]);

  const words = children.split(' ');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="reveal" style={{ marginRight: '0.25em' }}>
          <span className="reveal-inner">{w}</span>
        </span>
      ))}
    </Tag>
  );
}
