/* ============================================================
   HOME ( / )
   Sections in order:
     1. Hero — headline + 3D scene + CTA with red glow
     2. Intro — short positioning statement
     3. Services teaser (4 cards with 3D tilt)
     4. Marquee strip
     5. Featured Work teaser (parallax mosaic)
     6. CTA section (red block)
   The full Process / Stats / Testimonials live on /about,
   the full Work grid on /work, full Services on /services.
   ============================================================ */

import RevealText from '@/components/RevealText';
import CTAButton from '@/components/CTAButton';
import ServiceCard from '@/components/ServiceCard';
import Marquee from '@/components/Marquee';
import ParallaxBlock from '@/components/ParallaxBlock';
import CTASection from '@/components/CTASection';
import HeroScene from '@/components/HeroScene';
import styles from './page.module.css';

const SERVICES_TEASER = [
  {
    index: '01',
    title: 'Brand identity',
    description: 'Strategic identity systems built to outlast trend cycles and scale across every surface.',
    capabilities: ['Strategy', 'Naming', 'Visual identity', 'Guidelines'],
  },
  {
    index: '02',
    title: 'Digital product',
    description: 'Web and product experiences engineered to convert, with motion and 3D that earn their place.',
    capabilities: ['UX', 'UI', 'Motion', 'Three.js'],
  },
  {
    index: '03',
    title: 'Engineering',
    description: 'Production-grade builds in Next.js, Three.js, and modern stacks. Performance is non-negotiable.',
    capabilities: ['Next.js', 'WebGL', 'CMS', 'Edge'],
  },
  {
    index: '04',
    title: 'Art direction',
    description: 'A consistent point of view across photography, type, and motion — the difference between loud and forgettable.',
    capabilities: ['Direction', 'Type', 'Photo', 'Film'],
  },
];

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.eyebrowRow}>
            <span>Wilson Studio · est. 2014</span>
          </div>
          <h1 className={styles.heroTitle}>
            <RevealText>We design brands</RevealText>{' '}
            <RevealText delay={0.05}>that won’t be</RevealText>{' '}
            <RevealText delay={0.1}>ignored.</RevealText>
          </h1>
          <p className={styles.heroSub}>
            An independent design and engineering studio. We build identities, products, and digital
            experiences for ambitious teams who would rather lead than blend in.
          </p>
          <div className={styles.heroCtas}>
            <CTAButton href="/work">See the work</CTAButton>
            <CTAButton href="/contact" variant="ghost">Start a project</CTAButton>
          </div>
        </div>

        <div className={styles.heroRight}>
          <HeroScene />
        </div>

        <span className={styles.scrollHint}>Scroll</span>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className={`section`}>
        <div className="shell">
          <div className={styles.intro}>
            <span className="eyebrow">01 · Studio</span>
            <h2 className={styles.introHead}>
              <RevealText>We are a small team</RevealText>{' '}
              <RevealText delay={0.05}>of designers and engineers</RevealText>{' '}
              <RevealText delay={0.1}>obsessed with the details</RevealText>{' '}
              <RevealText delay={0.15}>most studios skip.</RevealText>
            </h2>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES TEASER ---------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              <RevealText>What we do</RevealText>
            </h2>
            <p className={styles.sectionMeta}>
              Four practices, one shared standard. Every project goes through all of them.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {SERVICES_TEASER.map((s) => (
              <ServiceCard key={s.index} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE STRIP ---------- */}
      <Marquee
        items={[
          'Brand identity',
          'Digital product',
          'Engineering',
          'Art direction',
          'Motion',
          '3D & WebGL',
        ]}
      />

      {/* ---------- FEATURED WORK TEASER ---------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              <RevealText>Selected work</RevealText>
            </h2>
            <p className={styles.sectionMeta}>
              A snapshot. The full archive lives in /work.
            </p>
          </div>

          <div className={styles.parallaxStrip}>
            <ParallaxBlock strength={-0.18}>
              <div
                className={styles.tile}
                style={{ height: '100%', background: 'radial-gradient(circle at 30% 20%, #ff2d2d, #6a0d0d 30%, #0a0a0a 70%)' }}
              >
                <span>Halcyon · Brand × Web</span>
              </div>
            </ParallaxBlock>
            <ParallaxBlock strength={0.1}>
              <div
                className={styles.tile}
                style={{ height: '100%', background: 'conic-gradient(from 220deg at 60% 40%, #ff2d2d, #1a1a1a, #ff2d2d)' }}
              >
                <span>Vertex · Product</span>
              </div>
            </ParallaxBlock>
            <ParallaxBlock strength={-0.24}>
              <div
                className={styles.tile}
                style={{ height: '100%', background: 'linear-gradient(180deg, #0a0a0a 50%, #ff2d2d 50%)' }}
              >
                <span>Tessera</span>
              </div>
            </ParallaxBlock>
          </div>
        </div>
      </section>

      {/* ---------- CTA BLOCK ---------- */}
      <CTASection />
    </>
  );
}
