'use client';

/* ============================================================
   CTASection — bold red block, big "Let's build something."
   Headline reveal handled by the .reveal-inner CSS keyframe.
   ============================================================ */

import CTAButton from './CTAButton';
import styles from './CTASection.module.css';

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
  return (
    <section className={styles.wrap}>
      <div className={styles.shell}>
        <span className={styles.eyebrow}>
          <span
            className="reveal-inner"
            style={{ display: 'inline-block', ['--rd' as string]: '0s' }}
          >
            {eyebrow}
          </span>
        </span>
        <h2 className={styles.head}>
          <span className={styles.line}>
            <span className="reveal-inner" style={{ ['--rd' as string]: '0.05s' }}>
              {line1}
            </span>
          </span>
          <span className={styles.line}>
            <span className="reveal-inner" style={{ ['--rd' as string]: '0.15s' }}>
              {line2}
            </span>
          </span>
        </h2>
        <div className={styles.cta}>
          <CTAButton href={ctaHref} variant="ghost">{ctaLabel}</CTAButton>
        </div>
      </div>
      <div className={styles.bgArrow} aria-hidden>↗</div>
    </section>
  );
}
