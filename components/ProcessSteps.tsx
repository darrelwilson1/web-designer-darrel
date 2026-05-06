'use client';

/* ============================================================
   ProcessSteps — 4 numbered steps. Massive numerals are the
   primary design element. Reveal animations are pure CSS:
     • numeral + title use the global .reveal-inner keyframe
     • body uses .processBody fade-up keyframe defined in module
   No JS animation logic — text always becomes visible.
   ============================================================ */

import styles from './ProcessSteps.module.css';

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    body: 'We dig into your business, your audience, and the gap you are trying to close. No briefs taken at face value.',
  },
  {
    n: '02',
    title: 'Define',
    body: 'A sharpened strategy, a clear point of view, a brand and product narrative everyone on the team can repeat from memory.',
  },
  {
    n: '03',
    title: 'Design',
    body: 'Identity, interface, and motion crafted in tight loops. We prototype real interactions, not screen mockups.',
  },
  {
    n: '04',
    title: 'Deploy',
    body: 'Engineered for performance and built to ship. We hand off code, systems, and the playbook to keep growing.',
  },
];

export default function ProcessSteps() {
  return (
    <div className={styles.wrap}>
      {STEPS.map((s, i) => (
        <div key={s.n} className={styles.row} style={{ ['--row' as string]: i }}>
          <div className={styles.num}>
            <span className="reveal-inner">{s.n}</span>
          </div>
          <div className={styles.text}>
            <h3 className={styles.title}>
              <span className="reveal-inner" style={{ ['--rd' as string]: '0.06s' }}>
                {s.title}
              </span>
            </h3>
            <p className={styles.body}>{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
