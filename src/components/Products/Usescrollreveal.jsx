import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Centralized motion timing so every animation in the page speaks
 * the same language. Change values here, not per-component.
 */
export const MOTION = {
  ease: {
    reveal: 'power3.out',
    soft: 'power2.out',
    snap: 'power4.out',
  },
  duration: {
    fast: 0.4,
    base: 0.7,
    slow: 1.1,
  },
  stagger: 0.08,
};

/**
 * Runs a GSAP context scoped to a ref, auto-cleaning on unmount.
 * Respects prefers-reduced-motion by skipping to end-state instantly.
 */
export function useScrollReveal(setup, deps = []) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-reveal]', { opacity: 1, y: 0, scale: 1, clearProps: 'transform' });
        return;
      }
      setup();
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}