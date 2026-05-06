/* ============================================================
   SERVICES ( /services )
   1. Title + lede
   2. 4 service cards (3D tilt)
   3. Process steps (massive numerals)
   4. Marquee
   5. CTA section
   ============================================================ */

import RevealText from '@/components/RevealText';
import ServiceCard from '@/components/ServiceCard';
import ProcessSteps from '@/components/ProcessSteps';
import Marquee from '@/components/Marquee';
import CTASection from '@/components/CTASection';
import styles from './page.module.css';

const SERVICES = [
  {
    index: '01',
    title: 'Brand identity',
    description:
      'Naming, narrative, and visual systems that hold up across every channel and outlast a single quarter of trends.',
    capabilities: ['Strategy', 'Naming', 'Visual identity', 'Voice', 'Guidelines', 'Rollout'],
  },
  {
    index: '02',
    title: 'Digital product',
    description:
      'Marketing sites, web apps, and product surfaces designed to convert. Motion and 3D earn their place — they never decorate.',
    capabilities: ['Research', 'UX', 'UI', 'Prototyping', 'Motion', 'Design systems'],
  },
  {
    index: '03',
    title: 'Engineering',
    description:
      'Production-grade Next.js, Three.js, and edge-rendered builds. Performance budgets enforced, accessibility audited, monitoring on day one.',
    capabilities: ['Next.js', 'WebGL / Three.js', 'Headless CMS', 'Edge', 'a11y', 'CI / CD'],
  },
  {
    index: '04',
    title: 'Art direction',
    description:
      'Photography, type, illustration, and film treated as one craft. We art-direct shoots, commission specialists, and ship the system end-to-end.',
    capabilities: ['Direction', 'Type', 'Photography', 'Film', 'Illustration', '3D'],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ---------- HEAD ---------- */}
      <section className={styles.head}>
        <h1 className={styles.title}>
          <RevealText>What</RevealText>{' '}
          <RevealText delay={0.05}>we</RevealText>{' '}
          <RevealText delay={0.1}>do.</RevealText>
        </h1>
        <p className={styles.lede}>
          Four practices we run end-to-end. Most projects use all of them. Pick one if you must,
          but the work is at its best when strategy, design, and engineering ship together.
        </p>
      </section>

      {/* ---------- SERVICE CARDS ---------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.cards}>
            {SERVICES.map((s) => (
              <ServiceCard key={s.index} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.disciplinesHead}>
            <h2 className={styles.disciplinesTitle}>
              <RevealText>How we work</RevealText>
            </h2>
            <span className={styles.tag}>Four phases · twelve weeks typical</span>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <Marquee items={['Strategy', 'Identity', 'Product', 'Engineering', 'Motion', 'WebGL']} />

      {/* ---------- CTA ---------- */}
      <CTASection
        line1="Tell us"
        line2="what to build."
        ctaLabel="Brief us"
      />
    </>
  );
}
