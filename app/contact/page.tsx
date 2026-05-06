'use client';

/* ============================================================
   CONTACT ( /contact )
   1. Big headline + lede
   2. Project brief form (name, email, company, scope, budget,
      message). Budget is a chip group. Submit is no-op stub.
   3. Contact details column (email, phone, studios)
   4. Availability banner
   ============================================================ */

import { useState } from 'react';
import RevealText from '@/components/RevealText';
import CTAButton from '@/components/CTAButton';
import styles from './page.module.css';

const BUDGETS = ['< $25k', '$25k–$75k', '$75k–$150k', '$150k+', 'Not sure yet'];

export default function ContactPage() {
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* ---------- HEAD ---------- */}
      <section className={styles.head}>
        <h1 className={styles.title}>
          <RevealText>Tell us</RevealText>{' '}
          <RevealText delay={0.05}>everything.</RevealText>
        </h1>
        <p className={styles.lede}>
          The more honest the brief, the better the work. Budget, deadline, internal politics —
          we&apos;ve seen it all and we won&apos;t flinch.
        </p>
      </section>

      {/* ---------- BODY ---------- */}
      <section className={styles.body}>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>Your name</label>
              <input id="name" required className={styles.input} placeholder="Jane Doe" data-cursor="link" />
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input id="email" type="email" required className={styles.input} placeholder="jane@company.com" data-cursor="link" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="company" className={styles.label}>Company</label>
              <input id="company" className={styles.input} placeholder="Company name" data-cursor="link" />
            </div>
            <div className={styles.field}>
              <label htmlFor="scope" className={styles.label}>Scope</label>
              <select id="scope" className={styles.select} data-cursor="link">
                <option>Brand identity</option>
                <option>Digital product</option>
                <option>Engineering</option>
                <option>Art direction</option>
                <option>Several of the above</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Budget range</span>
            <div className={styles.budgets}>
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  type="button"
                  data-cursor="link"
                  onClick={() => setBudget(b)}
                  className={`${styles.budget} ${budget === b ? styles.budgetActive : ''}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>The brief</label>
            <textarea
              id="message"
              required
              className={styles.textarea}
              placeholder="What are you trying to build, and what does success look like?"
              data-cursor="link"
            />
          </div>

          <div className={styles.submitRow}>
            <CTAButton>
              {sent ? 'Sent — talk soon' : 'Send the brief'}
            </CTAButton>
            <span style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.1em' }}>
              We reply within one working day.
            </span>
          </div>
        </form>

        <aside className={styles.contactBlock}>
          <div className={styles.contactItem}>
            <span className={styles.contactKey}>New work</span>
            <a href="mailto:hello@wilson.studio" className={styles.contactValue} data-cursor="link">
              hello@wilson.studio
            </a>
            <span className={styles.contactNote}>
              Best for new project enquiries. Tell us what you&apos;re building and a one-line goal.
            </span>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactKey}>Press & speaking</span>
            <a href="mailto:press@wilson.studio" className={styles.contactValue} data-cursor="link">
              press@wilson.studio
            </a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactKey}>Studios</span>
            <span className={styles.contactValue}>Brooklyn · Lisbon</span>
            <span className={styles.contactNote}>
              68 Wythe Ave, Brooklyn, NY 11211 · Rua da Boavista 92, 1200-068 Lisboa
            </span>
          </div>

          <div className={styles.banner}>
            <span className={styles.bannerDot} />
            <span className={styles.bannerText}>
              Booking projects starting Q3 2026 · 2 slots remaining
            </span>
          </div>
        </aside>
      </section>
    </>
  );
}
