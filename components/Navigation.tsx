'use client';

/* ============================================================
   Navigation — fixed top bar. Hides on scroll-down, shows on
   scroll-up. Mobile menu = full-screen panel with stagger.
   ============================================================ */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import styles from './Navigation.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const nav = navRef.current!;
    let lastY = window.scrollY;
    const showTween = gsap.quickTo(nav, 'y', { duration: 0.5, ease: 'power3.out' });
    const onScroll = () => {
      const y = window.scrollY;
      const dir = y - lastY;
      if (y < 80) showTween(0);
      else if (dir > 4) showTween(-100);
      else if (dir < -4) showTween(0);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav ref={navRef} className={styles.nav}>
        <Link href="/" className={styles.brand} data-cursor="link" aria-label="Wilson home">
          <span className={styles.brandMark}>W</span>
          <span className={styles.brandWord}>Wilson</span>
        </Link>

        <ul className={styles.links}>
          {LINKS.slice(1).map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                data-cursor="link"
                className={`${styles.link} ${pathname === l.href ? styles.active : ''}`}
              >
                <span>{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.right}>
          <MagneticButton href="/contact" cursor="cta" className={styles.startBtn}>
            <span>Start a project</span>
          </MagneticButton>
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            data-cursor="link"
          >
            <span /><span />
          </button>
        </div>
      </nav>

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`} aria-hidden={!open}>
        <ul>
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: `${0.1 + i * 0.06}s` }}>
              <Link href={l.href} data-cursor="link">
                <span className={styles.idx}>0{i + 1}</span>
                <span>{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
