'use client';

/* ============================================================
   CTASection — bold red block, big "Let's build something."
   Headline tween masks in on scroll; arrow icon rotates.
   ============================================================ */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTAButton from './CTAButton';
import styles from './CTASection.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

type Props = {
  eyebrow?: string;
  line1?: string;
  line2?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function CTASection({
  eyebrow = 'Start a project',
  line1 = "Let’s build",
  line2 = 'something loud.',
  ctaLabel = 'Get in touch',
  ctaHref = '/contact',
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const inners = root.current!.querySelectorAll<HTMLElement>('.reveal-inner');
      gsap.set(inners, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(inners, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.08 });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.wrap}>
      <div className={styles.shell}>
        <span className={styles.eyebrow}>
          <span className="reveal-inner" style={{ display: 'inline-block' }}>{eyebrow}</span>
        </span>
        <h2 className={styles.head}>
          <span className={styles.line}><span className="reveal-inner">{line1}</span></span>
          <span className={styles.line}><span className="reveal-inner">{line2}</span></span>
        </h2>
        <div className={styles.cta}>
          <CTAButton href={ctaHref} variant="ghost">{ctaLabel}</CTAButton>
        </div>
      </div>
      <div className={styles.bgArrow} aria-hidden>↗</div>
    </section>
  );
}
