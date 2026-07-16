import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useCountUp
 * ----------
 * Animates a number from 0 to `target` once its trigger element
 * scrolls into view. Returns [displayValue, ref] — attach ref to
 * the element that should act as the ScrollTrigger.
 */
export function useCountUp(target, { suffix = '', duration = 1.6 } = {}) {
  const [display, setDisplay] = useState(`0${suffix}`);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      setDisplay(`${target}${suffix}`);
      return;
    }

    const counter = { value: 0 };
    let trigger;

    const tween = gsap.to(counter, {
      value: target,
      duration,
      ease: 'power2.out',
      paused: true,
      onUpdate: () => setDisplay(`${Math.round(counter.value)}${suffix}`),
    });

    trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      tween.kill();
      trigger?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, suffix, duration]);

  return [display, ref];
}