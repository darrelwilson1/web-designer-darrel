/* ============================================================
   ABOUT ( /about )
   1. Headline
   2. Manifesto / studio statement
   3. Stats with count-up
   4. Team grid
   5. Testimonials
   6. CTA section
   ============================================================ */

import RevealText from '@/components/RevealText';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import styles from './page.module.css';

const TEAM = [
  { name: 'Iris Wilson', role: 'Founder · Creative Director', art: 'linear-gradient(160deg,#3b1414,#0a0a0a)' },
  { name: 'Theo Marchand', role: 'Engineering Lead', art: 'linear-gradient(160deg,#1a1a1a,#ff2d2d 140%)' },
  { name: 'Sana Park', role: 'Design Director', art: 'linear-gradient(160deg,#2a2a2a,#0a0a0a)' },
  { name: 'Kofi Boateng', role: 'Motion · 3D', art: 'radial-gradient(circle at 30% 30%, #ff2d2d, #0a0a0a 60%)' },
  { name: 'Nora Kallio', role: 'Strategy', art: 'linear-gradient(160deg,#0a0a0a,#1f1f1f)' },
  { name: 'Mateo Reyes', role: 'Senior Engineer', art: 'linear-gradient(180deg,#0a0a0a,#3b1414)' },
  { name: 'Amaia Soto', role: 'Producer', art: 'linear-gradient(160deg,#1a1a1a,#0a0a0a)' },
  { name: 'Jules Carter', role: 'Brand Designer', art: 'conic-gradient(from 200deg, #1a1a1a, #ff2d2d 50%, #1a1a1a)' },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------- HEAD ---------- */}
      <section className={styles.head}>
        <h1 className={styles.title}>
          <RevealText>An independent</RevealText>{' '}
          <RevealText delay={0.05}>studio with</RevealText>{' '}
          <RevealText delay={0.1}>strong opinions.</RevealText>
        </h1>
      </section>

      {/* ---------- MANIFESTO ---------- */}
      <section>
        <div className={styles.manifesto}>
          <span className={styles.manifestoLabel}>Manifesto · 02</span>
          <div className={styles.manifestoCopy}>
            <p>
              We started Wilson because the work we wanted to make wasn&apos;t getting made. Too much
              committee, too little craft.
            </p>
            <p>
              Eleven years later, we&apos;re still small on purpose. Senior people on every project,
              one team from kickoff to launch, and a refusal to phone in the details that other
              studios call &ldquo;polish&rdquo;.
            </p>
            <p>
              We work with founders, operators, and brand teams who want strong opinions, fast
              feedback, and partners who can actually ship the thing.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              <RevealText>By the numbers</RevealText>
            </h2>
            <p className={styles.sectionMeta}>Eleven years of independent practice.</p>
          </div>
          <StatsSection />
        </div>
      </section>

      {/* ---------- TEAM ---------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              <RevealText>The team</RevealText>
            </h2>
            <p className={styles.sectionMeta}>
              Eight on staff. Specialists brought in when the work calls for it.
            </p>
          </div>
          <div className={styles.people}>
            {TEAM.map((p) => (
              <div key={p.name} className={styles.person} data-cursor="link">
                <div className={styles.avatar} style={{ background: p.art }} />
                <span className={styles.personName}>{p.name}</span>
                <span className={styles.personRole}>{p.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              <RevealText>Words from clients</RevealText>
            </h2>
            <p className={styles.sectionMeta}>
              We are picky about who we work with. They tend to be picky too.
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <CTASection line1="Think we’d" line2="get along?" ctaLabel="Say hello" />
    </>
  );
}
