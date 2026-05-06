'use client';

/* ============================================================
   MagneticButton — element pulls toward cursor on hover.
   Wrap any clickable content. Inner span gets a smaller offset
   so the label trails the wrapper for a parallax feel.
   ============================================================ */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  cursor?: 'link' | 'cta' | 'view';
  strength?: number;
};

export default function MagneticButton({
  href,
  onClick,
  children,
  className,
  cursor = 'cta',
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    const ixTo = gsap.quickTo(inner, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    const iyTo = gsap.quickTo(inner, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.4)' });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      xTo(x * strength);
      yTo(y * strength);
      ixTo(x * strength * 0.4);
      iyTo(y * strength * 0.4);
    };
    const reset = () => {
      xTo(0); yTo(0); ixTo(0); iyTo(0);
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
    };
  }, [strength]);

  const inner = <span ref={innerRef} style={{ display: 'inline-block', willChange: 'transform' }}>{children}</span>;

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={className}
        data-cursor={cursor}
        style={{ display: 'inline-block', willChange: 'transform' }}
      >
        {inner}
      </Link>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      data-cursor={cursor}
      onClick={onClick}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {inner}
    </button>
  );
}
