import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ProductsBackground
 * ------------------
 * The signature element of this page: a slow instrument-style
 * "scan line" that sweeps the section as the user scrolls, as if
 * a spectrometer is reading across the product range. Paired with
 * two soft, near-static gradient fields for depth.
 *
 * Everything here is transform/opacity only (GPU-friendly), and the
 * whole layer is aria-hidden + isolated from React re-renders since
 * it lives in its own component with no external state.
 */
export default function ProductsBackground({ containerRef }) {
  const scanRef = useRef(null);
  const gridRef = useRef(null);
  const glowARef = useRef(null);
  const glowBRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scan line sweeps top -> bottom, tied to scroll progress of the section.
      gsap.fromTo(
        scanRef.current,
        { yPercent: -10, opacity: 0 },
        {
          yPercent: 110,
          opacity: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // Grid drifts very slightly — depth cue, not decoration.
      gsap.fromTo(
        gridRef.current,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      // Two glow fields drift opposite directions — parallax depth.
      gsap.fromTo(
        glowARef.current,
        { yPercent: -8, xPercent: -2 },
        {
          yPercent: 10,
          xPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );
      gsap.fromTo(
        glowBRef.current,
        { yPercent: 6, xPercent: 2 },
        {
          yPercent: -10,
          xPercent: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Base ink field */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -10%, #0B1220 0%, #05070C 55%, #05070C 100%)',
        }}
      />

      {/* Soft gradient glow A */}
      <div
        ref={glowARef}
        className="absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(127,216,208,0.06) 0%, rgba(127,216,208,0) 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Soft gradient glow B */}
      <div
        ref={glowBRef}
        className="absolute -right-1/4 bottom-0 h-[60%] w-[60%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(199,210,224,0.05) 0%, rgba(199,210,224,0) 65%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Subtle scientific grid — CSS gradient, no image cost */}
      <div
        ref={gridRef}
        className="absolute inset-[-5%] opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #7C8BA3 1px, transparent 1px), linear-gradient(to bottom, #7C8BA3 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 75%)',
        }}
      />

      {/* Instrument scan line — the signature motion element */}
      <div
        ref={scanRef}
        className="absolute left-0 h-[220px] w-full"
        style={{
          top: 0,
          background:
            'linear-gradient(to bottom, rgba(127,216,208,0) 0%, rgba(127,216,208,0.05) 35%, rgba(127,216,208,0.11) 50%, rgba(127,216,208,0.05) 65%, rgba(127,216,208,0) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 w-full"
        style={{
          top: 0,
          height: '1px',
          background:
            'linear-gradient(to right, transparent 0%, rgba(127,216,208,0.5) 50%, transparent 100%)',
          transform: 'translateY(0)',
        }}
      />
    </div>
  );
}