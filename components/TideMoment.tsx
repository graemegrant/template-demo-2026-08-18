'use client';

/**
 * TideMoment — the single authored scroll moment on the homepage.
 * A sticky full-viewport panel inside a tall track; the sentence
 * illuminates word-by-word as the visitor scrolls through.
 *
 * Deliberately the ONLY pinned sequence on the site (restraint rule:
 * one signature moment per property). Fail-visible: words render at
 * reduced opacity, never hidden; reduced-motion shows them fully lit.
 */
import { useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const SENTENCE: { text: string; brass?: boolean }[] = [
  { text: 'Every' }, { text: 'spring,' },
  { text: 'a', brass: true }, { text: 'hundred', brass: true }, { text: 'and', brass: true },
  { text: 'fifty', brass: true }, { text: 'thousand', brass: true }, { text: 'gannets', brass: true },
  { text: 'come' }, { text: 'home' }, { text: 'to' }, { text: 'the' }, { text: 'rock' },
  { text: 'in' }, { text: 'our' }, { text: 'bay.' },
  { text: 'We' }, { text: 'have' }, { text: 'counted.' },
  { text: 'Nobody' }, { text: 'here' }, { text: 'has' }, { text: 'tired' }, { text: 'of' }, { text: 'the' }, { text: 'view.' },
];

export default function TideMoment() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  const litCount = useTransform(scrollYProgress, [0, 0.85], [0, SENTENCE.length]);
  useMotionValueEvent(litCount, 'change', (v) => setLit(Math.floor(v)));

  const isLit = (i: number) => reduce || i < lit;

  return (
    <div ref={trackRef} className="relative h-240vh md:h-260vh">
      <div className="bg-tide sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-10">
          <p className="font-body text-2xs uppercase tracking-30 text-goldbright">
            The bay
          </p>
          <p className="mt-8 max-w-20ch font-heading text-3xl leading-heading text-parchment md:text-5xl lg:text-6xl">
            {SENTENCE.map((w, i) => (
              <span
                key={i}
                className={`transition-opacity duration-300 ${
                  isLit(i) ? 'opacity-100' : 'opacity-18'
                } ${w.brass && isLit(i) ? 'italic text-goldbright' : ''}`}
              >
                {w.text}{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
