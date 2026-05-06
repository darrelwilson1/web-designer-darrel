'use client';

/* ============================================================
   CTAButton — convenience wrapper combining MagneticButton +
   the styled label markup. Pass `variant="primary" | "ghost"`.
   ============================================================ */

import MagneticButton from './MagneticButton';
import styles from './CTAButton.module.css';

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
};

export default function CTAButton({ href, onClick, children, variant = 'primary' }: Props) {
  return (
    <MagneticButton
      href={href}
      onClick={onClick}
      cursor="cta"
      className={variant === 'primary' ? styles.primary : styles.ghost}
    >
      {children}
      <span className={styles.arrow} aria-hidden>→</span>
    </MagneticButton>
  );
}
