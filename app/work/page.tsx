'use client';

/* ============================================================
   WORK ( /work )
   1. Title + lede
   2. Filter chips (visual only, not wired to filtering)
   3. Project grid (6 cards, hover overlay)
   4. Parallax editorial block
   5. CTA section
   ============================================================ */

import { useState } from 'react';
import RevealText from '@/components/RevealText';
import ProjectGrid from '@/components/ProjectGrid';
import ParallaxBlock from '@/components/ParallaxBlock';
import CTASection from '@/components/CTASection';
import styles from './page.module.css';

const FILTERS = ['All', 'Brand', 'Product', 'Web', 'Editorial'];

export default function WorkPage() {
  const [active, setActive] = useState('All');
  return (
    <>
      {/* ---------- HEAD ---------- */}
      <section className={styles.head}>
        <h1 className={styles.title}>
          <RevealText>Selected</RevealText>{' '}
          <RevealText delay={0.05}>work.</RevealText>
        </h1>
        <p className={styles.lede}>
          A decade of brands and products built with operators who shipped — not committees who admired.
        </p>
      </section>

      {/* ---------- FILTERS ---------- */}
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f}
            data-cursor="link"
            className={`${styles.filter} ${active === f ? styles.filterActive : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ---------- PROJECT GRID ---------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <ProjectGrid />
        </div>
      </section>

      {/* ---------- PARALLAX EDITORIAL BLOCK ---------- */}
      <section>
        <div className="shell">
          <div className={styles.parallax}>
            <ParallaxBlock strength={0.18} className={styles.parallaxText}>
              <span className={styles.parallaxKicker}>Currently in studio · 2026</span>
              <p className={styles.parallaxQuote}>
                A new generative identity for an audio hardware company, a Three.js configurator
                for a robotics startup, and a complete brand reset for a global skincare line.
              </p>
            </ParallaxBlock>
            <ParallaxBlock strength={-0.16}>
              <div className={styles.parallaxImg} />
            </ParallaxBlock>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <CTASection line1="Want to be" line2="next on this list?" />
    </>
  );
}
