'use client';

/* ============================================================
   Footer — minimal, dark. Wordmark, contact column, social,
   colophon. Year auto-updates.
   ============================================================ */

import Link from 'next/link';
import styles from './Footer.module.css';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'X', href: 'https://x.com' },
];

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.mark}>W</div>
            <div>
              <div className={styles.brandName}>Wilson</div>
              <div className={styles.tagline}>Independent design & engineering studio</div>
            </div>
          </div>
          <div className={styles.cols}>
            <div className={styles.col}>
              <span className={styles.label}>Site</span>
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}><Link href={n.href} data-cursor="link">{n.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className={styles.col}>
              <span className={styles.label}>Contact</span>
              <ul>
                <li><a href="mailto:hello@wilson.studio" data-cursor="link">hello@wilson.studio</a></li>
                <li><a href="mailto:work@wilson.studio" data-cursor="link">work@wilson.studio</a></li>
                <li>+1 (646) 555 0142</li>
              </ul>
            </div>
            <div className={styles.col}>
              <span className={styles.label}>Studios</span>
              <ul>
                <li>Brooklyn, NY</li>
                <li>Lisbon, PT</li>
              </ul>
            </div>
            <div className={styles.col}>
              <span className={styles.label}>Follow</span>
              <ul>
                {SOCIALS.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer" data-cursor="link">{s.label} ↗</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.huge} aria-hidden>WILSON</div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Wilson Studio. All rights reserved.</span>
          <span>Designed & built in-house. Soundtrack always on.</span>
        </div>
      </div>
    </footer>
  );
}
