'use client';

/* ============================================================
   RevealText — splits text into per-word spans inside an
   overflow-hidden mask. Each word animates up via a CSS
   keyframe (defined in globals.css). No JS dependency, so the
   reveal cannot get stuck hidden — even if scripts fail.

   Stagger is delivered via a CSS custom property (--rd) on
   each .reveal-inner so we get the same staggered cadence as
   the original GSAP version.
   ============================================================ */

type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: string;
  className?: string;
  /** seconds before the first word starts */
  delay?: number;
  /** seconds between each word */
  stagger?: number;
};

export default function RevealText({
  as: Tag = 'span',
  children,
  className,
  delay = 0,
  stagger = 0.06,
}: Props) {
  const words = children.split(' ');

  return (
    // @ts-expect-error dynamic tag
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={i} className="reveal" style={{ marginRight: '0.25em' }}>
          <span
            className="reveal-inner"
            style={{ ['--rd' as string]: `${delay + i * stagger}s` }}
          >
            {w}
          </span>
        </span>
      ))}
    </Tag>
  );
}
