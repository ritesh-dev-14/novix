import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Preloader.css";

const WORDS = ["NOVIX", "नोविक्स", "NOVIX"];

// Apple's system easing lives close to these curves — smooth acceleration,
// no bounce, no overshoot. Reused everywhere so the whole sequence reads
// as one hand, not a pile of default GSAP eases.
const EASE_OUT = "power3.out";
const EASE_INOUT = "power4.inOut";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef(null);
  const maskRevealRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressFillRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    if (!isVisible) return;

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = prevOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Skip the choreography entirely — a quiet fade is the correct
        // "motion" for someone who's asked for less of it.
        gsap.set(
          [".preloader-char", subtitleRef.current, maskRevealRef.current],
          { clearProps: "all" },
        );
        gsap
          .timeline({ delay: 0.2 })
          .to(containerRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power1.out",
            onComplete: () => setIsVisible(false),
          });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
      const words = wordRefs.current;

      gsap.set(".preloader-char", {
        opacity: 0,
        y: "115%",
        rotateX: 60,
        filter: "blur(4px)",
      });
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 14,
        filter: "blur(6px)",
        letterSpacing: "0.24em",
      });
      gsap.set(maskRevealRef.current, {
        clipPath: "circle(0% at 50% 50%)",
      });
      gsap.set(contentWrapperRef.current, { x: 0, y: 0, scale: 1, opacity: 1 });
      gsap.set(progressFillRef.current, { scaleX: 0 });

      // A single, quiet progress read-out — the one nod to "loading" that
      // earns its place instead of decorating the screen.
      tl.to(
        progressFillRef.current,
        { scaleX: 1, duration: 2.05, ease: "power1.inOut" },
        0,
      );

      words.forEach((wordEl, index) => {
        if (!wordEl) return;

        const chars = wordEl.querySelectorAll(".preloader-char");
        const isFirst = index === 0;
        const isLast = index === words.length - 1;

        tl.to(
          chars,
          {
            opacity: 1,
            y: "0%",
            rotateX: 0,
            filter: "blur(0px)",
            duration: isFirst ? 0.34 : 0.22,
            stagger: 0.014,
            ease: "power2.out",
          },
          isFirst ? 0.1 : "-=0.14",
        );

        tl.to({}, { duration: isLast ? 0.26 : 0.1 });

        if (!isLast) {
          tl.to(chars, {
            opacity: 0,
            y: "-105%",
            rotateX: -18,
            filter: "blur(3px)",
            duration: 0.18,
            stagger: 0.008,
            ease: "power2.in",
          });
        }
      });

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 14, letterSpacing: "0.24em", filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.34em",
          filter: "blur(0px)",
          duration: 0.5,
          ease: EASE_OUT,
        },
        "-=0.1",
      );

      tl.to({}, { duration: 0.15 });
      tl.addLabel("exitPhase");

      // Measuring and building the morph tween happens inside tl.call(),
      // which runs at playback time rather than at build time. That means
      // the navbar's real, current position is used — correct even if
      // layout shifted while the preloader was up — instead of a rect
      // captured a half-second too early.
      tl.call(
        () => {
          const navbarLogo = document.getElementById("navbar-logo-link");
          const wrapper = contentWrapperRef.current;
          if (!navbarLogo || !wrapper) {
            gsap.to(wrapper, {
              opacity: 0,
              scale: 0.92,
              duration: 0.5,
              ease: EASE_INOUT,
            });
            return;
          }

          const navRect = navbarLogo.getBoundingClientRect();
          const wrapRect = wrapper.getBoundingClientRect();

          const targetX =
            navRect.left + navRect.width / 2 - (wrapRect.left + wrapRect.width / 2);
          const targetY =
            navRect.top + navRect.height / 2 - (wrapRect.top + wrapRect.height / 2);
          const targetScale = navRect.width / wrapRect.width;

          gsap.to(wrapper, {
            x: targetX,
            y: targetY,
            scale: targetScale,
            duration: 0.68,
            ease: EASE_INOUT,
          });

          gsap.to(navbarLogo, { opacity: 1, duration: 0.12, delay: 0.56 });
        },
        [],
        "exitPhase",
      );

      tl.to(
        maskRevealRef.current,
        { clipPath: "circle(150% at 50% 50%)", duration: 0.78, ease: EASE_INOUT },
        "exitPhase",
      );

      tl.to(
        containerRef.current,
        { opacity: 0, duration: 0.22, onComplete: () => setIsVisible(false) },
        "-=0.14",
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="preloader-master-container"
      role="status"
      aria-live="polite"
      aria-label="NOVIX is loading"
    >
      <div className="preloader-glow" aria-hidden="true" />
      <div className="preloader-grid" aria-hidden="true" />
      <div ref={maskRevealRef} className="preloader-mask-layer" />

      <div ref={contentWrapperRef} className="preloader-artistic-wrapper">
        <div className="preloader-word-viewport">
          <div className="preloader-txt anchor-ghost" aria-hidden="true">
            NOVIX
          </div>

          {WORDS.map((word, wordIdx) => (
            <div
              key={`${word}-${wordIdx}`}
              ref={(el) => {
                wordRefs.current[wordIdx] = el;
              }}
              className="preloader-txt precise-absolute-word"
              aria-hidden="true"
            >
              {word.split("").map((char, charIdx) => (
                <span key={`${wordIdx}-${charIdx}`} className="preloader-char-wrapper">
                  <span className="preloader-char">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>

        <div ref={subtitleRef} className="preloader-subtext">
          Healthcare Innovation
        </div>

        <div className="preloader-progress" aria-hidden="true">
          <div className="preloader-progress-track">
            <div ref={progressFillRef} className="preloader-progress-fill" />
          </div>
        </div>
      </div>

      <span className="sr-only">Loading NOVIX</span>
    </div>
  );
}