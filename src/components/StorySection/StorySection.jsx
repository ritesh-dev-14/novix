import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import bgVideo from "../../assets/section2.webm";

const scenesData = [
  {
    id: 1,
    eyebrow: "01 // INNOVATION",
    heading: "INNOVATION",
    paragraph:
      "Driven by science and continuous research, we focus on delivering healthcare solutions that address today's evolving needs with precision and purpose.",
    camera: { x: -22, y: 8, scale: 1.12, blur: 0, brightness: 1.1, contrast: 1.05 },
    layout: "left",
    cardBadge: null,
  },
  {
    id: 2,
    eyebrow: "02 // QUALITY",
    heading: "QUALITY",
    paragraph:
      "Every product is sourced through globally certified partner facilities and evaluated to meet rigorous compliance standards.",
    camera: { x: 18, y: -12, scale: 1.25, blur: 0.5, brightness: 1.25, contrast: 1.12 },
    layout: "right-card",
    cardBadge: "WHO-GMP Certified",
  },
  {
    id: 3,
    eyebrow: "03 // TRUST",
    heading: "TRUST",
    paragraph:
      "We build confidence through transparency, ethical practices, and a commitment to dependable healthcare solutions.",
    camera: { x: -14, y: 14, scale: 1.35, blur: 0, brightness: 1.18, contrast: 1.08 },
    layout: "split",
    cardBadge: "97% Clinical Precision",
  },
  {
    id: 4,
    eyebrow: "04 // COMMITMENT",
    heading: "COMMITMENT",
    paragraph:
      "Focused on creating lasting value, we are committed to advancing healthcare through responsible partnerships.",
    camera: { x: 22, y: -8, scale: 1.45, blur: 0, brightness: 1.35, contrast: 1.15 },
    layout: "centered-cta",
    cardBadge: "Novix Healthcare",
  },
];

const SCROLL_VH = 5.0;
const ENTER_DURATION = 1.25;
const EXIT_DURATION = 0.75;
const CAMERA_BREATHE = { duration: 7, x: 4, y: 3.5, rotate: 0.25 };

const PARTICLE_LAYERS = [
  { count: 12, depth: "far", size: [2, 3], opacity: 0.22, duration: [14, 22] },
  { count: 10, depth: "mid", size: [3, 6], opacity: 0.35, duration: [10, 15] },
  { count: 8, depth: "near", size: [6, 10], opacity: 0.55, duration: [6, 10] },
];

const THEME = {
  fontDisplay: "'Fraunces', 'Iowan Old Style', Georgia, serif",
  fontBody: "'Manrope', 'Inter', -apple-system, sans-serif",
  fontImportUrl:
    "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Manrope:wght@400;500;600&display=swap",
  colors: {
    ink: "#060b0a",
    teal: "#1FA189",
    tealSoft: "#8FD9C9",
    tealGlowRgb: "31,161,137",
    paper: "#FFFFFF",
    paperDimRgb: "255,255,255",
  },
};

function seededRandom(seed) {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function seededSpread(seed, range) {
  return (seededRandom(seed) * 2 - 1) * range;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function StorySection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const cameraScrollRef = useRef(null);
  const cameraBreatheRef = useRef(null);
  const videoRef = useRef(null);
  const glowRef = useRef(null);
  const lightSweepRef = useRef(null);
  const vignetteRef = useRef(null);
  const sceneRefs = useRef([]);
  const particleEls = useRef([]);

  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const lockTimeoutRef = useRef(null);
  const touchStartYRef = useRef(null);
  const accumulatedDeltaRef = useRef(0);
  const lastEventTimeRef = useRef(0);

  useLayoutEffect(() => {
    sceneRefs.current = sceneRefs.current.slice(0, scenesData.length);
    const reducedMotion = prefersReducedMotion();
    const totalScenes = scenesData.length;

    const ctx = gsap.context(() => {
      let breathe;
      if (!reducedMotion && cameraBreatheRef.current) {
        breathe = gsap.to(cameraBreatheRef.current, {
          x: CAMERA_BREATHE.x,
          y: CAMERA_BREATHE.y,
          rotate: CAMERA_BREATHE.rotate,
          duration: CAMERA_BREATHE.duration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      const particleTweens = [];
      if (!reducedMotion) {
        particleEls.current.forEach((el, i) => {
          if (!el) return;
          const durMin = Number(el.dataset.durMin) || 8;
          const durMax = Number(el.dataset.durMax) || 14;
          const duration = durMin + seededRandom(i * 13) * (durMax - durMin);
          particleTweens.push(
            gsap.to(el, {
              y: seededSpread(i * 29 + 3, 35),
              x: seededSpread(i * 41 + 7, 25),
              duration,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: seededRandom(i * 5) * duration,
            })
          );
        });
      }

      const setCameraX = cameraScrollRef.current
        ? gsap.quickTo(cameraScrollRef.current, "x", { duration: 1.2, ease: "power3.out" })
        : null;
      const setCameraY = cameraScrollRef.current
        ? gsap.quickTo(cameraScrollRef.current, "y", { duration: 1.2, ease: "power3.out" })
        : null;
      const setCameraScale = cameraScrollRef.current
        ? gsap.quickTo(cameraScrollRef.current, "scale", { duration: 1.4, ease: "power3.out" })
        : null;
      const setVideoFilter = videoRef.current
        ? gsap.quickTo(videoRef.current, "filter", { duration: 1.2, ease: "power2.out" })
        : null;

      function playScene(index, direction) {
        const sceneEl = sceneRefs.current[index];
        if (!sceneEl) return;
        const headingChars = sceneEl.querySelectorAll(".char");
        const headingEl = sceneEl.querySelector(".story-heading");
        const paragraph = sceneEl.querySelector(".story-paragraph");
        const eyebrow = sceneEl.querySelector(".story-eyebrow");
        const glassCard = sceneEl.querySelector(".story-glass-card");
        const ctaBtn = sceneEl.querySelector(".story-cta-btn");

        gsap.killTweensOf([sceneEl, headingChars, paragraph, eyebrow, glassCard, ctaBtn]);
        gsap.set(sceneEl, { autoAlpha: 1, pointerEvents: "auto" });

        if (reducedMotion) {
          gsap.fromTo(headingChars, { opacity: 0 }, { opacity: 1, duration: ENTER_DURATION });
          if (eyebrow) gsap.fromTo(eyebrow, { opacity: 0 }, { opacity: 1, duration: ENTER_DURATION });
          if (paragraph) gsap.fromTo(paragraph, { opacity: 0 }, { opacity: 1, duration: ENTER_DURATION });
          return;
        }

        const fromY = direction === "down" ? 35 : -35;

        gsap.fromTo(
          headingChars,
          {
            opacity: 0,
            y: (i) => fromY + seededSpread(scenesData[index].id * 97 + i, 14),
            x: (i) => seededSpread(i * 13, 8),
            filter: "blur(12px)",
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            scale: 1,
            ease: "power3.out",
            duration: ENTER_DURATION,
            stagger: { each: 0.022, from: "center" },
          }
        );

        if (headingEl) {
          gsap.fromTo(
            headingEl,
            { "--glow": 0 },
            { "--glow": 14, duration: ENTER_DURATION * 0.8, ease: "power2.out" }
          );
        }
        if (eyebrow) {
          gsap.fromTo(
            eyebrow,
            { opacity: 0, y: fromY * 0.5, letterSpacing: "0.2em" },
            { opacity: 1, y: 0, letterSpacing: "0.4em", ease: "power2.out", duration: ENTER_DURATION * 0.9, delay: 0.05 }
          );
        }
        if (paragraph) {
          gsap.fromTo(
            paragraph,
            { opacity: 0, y: fromY * 0.7, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: ENTER_DURATION * 0.9, delay: 0.12 }
          );
        }
        if (glassCard) {
          gsap.fromTo(
            glassCard,
            { opacity: 0, x: 60, scale: 0.95, filter: "blur(8px)" },
            { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", ease: "power3.out", duration: ENTER_DURATION * 1.1, delay: 0.15 }
          );
        }
        if (ctaBtn) {
          gsap.fromTo(
            ctaBtn,
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, ease: "back.out(1.7)", duration: ENTER_DURATION * 1.2, delay: 0.25 }
          );
        }
      }

      function exitScene(index, direction) {
        const sceneEl = sceneRefs.current[index];
        if (!sceneEl) return;
        const headingChars = sceneEl.querySelectorAll(".char");
        const paragraph = sceneEl.querySelector(".story-paragraph");
        const eyebrow = sceneEl.querySelector(".story-eyebrow");
        const glassCard = sceneEl.querySelector(".story-glass-card");
        const ctaBtn = sceneEl.querySelector(".story-cta-btn");

        gsap.killTweensOf([sceneEl, headingChars, paragraph, eyebrow, glassCard, ctaBtn]);
        gsap.set(sceneEl, { pointerEvents: "none" });

        const toY = direction === "down" ? -30 : 30;

        if (reducedMotion) {
          gsap.to([headingChars, paragraph, eyebrow, glassCard, ctaBtn].filter(Boolean), {
            opacity: 0,
            duration: EXIT_DURATION,
            onComplete: () => gsap.set(sceneEl, { autoAlpha: 0 }),
          });
          return;
        }

        gsap.to(headingChars, {
          opacity: 0,
          y: (i) => toY + seededSpread(scenesData[index].id * 71 + i, 10),
          filter: "blur(10px)",
          scale: 1.05,
          ease: "power2.in",
          duration: EXIT_DURATION,
          stagger: { each: 0.012, from: "center" },
        });
        if (eyebrow) gsap.to(eyebrow, { opacity: 0, y: toY * 0.5, ease: "power2.in", duration: EXIT_DURATION });
        if (glassCard) gsap.to(glassCard, { opacity: 0, x: 40, scale: 0.95, filter: "blur(8px)", ease: "power2.in", duration: EXIT_DURATION });
        if (ctaBtn) gsap.to(ctaBtn, { opacity: 0, y: -20, scale: 0.9, ease: "power2.in", duration: EXIT_DURATION });
        if (paragraph) {
          gsap.to(paragraph, {
            opacity: 0,
            y: toY * 0.7,
            filter: "blur(4px)",
            ease: "power2.in",
            duration: EXIT_DURATION,
            onComplete: () => gsap.set(sceneEl, { autoAlpha: 0 }),
          });
        }
      }

      function updatePin() {
        const section = sectionRef.current;
        const pinned = stickyRef.current;
        if (!section || !pinned) return;
        const vh = window.innerHeight;
        const rect = section.getBoundingClientRect();

        if (rect.top > 0) {
          pinned.style.position = "absolute";
          pinned.style.top = "0px";
          pinned.style.bottom = "";
        } else if (rect.bottom < vh) {
          pinned.style.position = "absolute";
          pinned.style.top = `${section.offsetHeight - vh}px`;
          pinned.style.bottom = "";
        } else {
          pinned.style.position = "fixed";
          pinned.style.top = "0px";
          pinned.style.bottom = "";
        }
      }

      function isSectionEngaged() {
        const section = sectionRef.current;
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        const EPS = 2;
        return rect.top <= EPS && rect.bottom >= window.innerHeight - EPS;
      }

      function scrollToBoundary(index) {
        const section = sectionRef.current;
        if (!section) return;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const scrollableDistance = section.offsetHeight - window.innerHeight;
        if (scrollableDistance <= 0) return;
        const targetScroll = sectionTop + (index / (totalScenes - 1)) * scrollableDistance;
        window.scrollTo({ top: targetScroll, behavior: "auto" });
      }

      function stepScene(targetIndex, direction) {
        isAnimatingRef.current = true;
        exitScene(activeIndexRef.current, direction);
        playScene(targetIndex, direction);
        activeIndexRef.current = targetIndex;

        const cam = scenesData[targetIndex].camera;
        if (setCameraX && setCameraY && setCameraScale) {
          setCameraX(cam.x);
          setCameraY(cam.y);
          setCameraScale(cam.scale);
        }
        if (setVideoFilter) {
          setVideoFilter(`blur(${cam.blur}px) brightness(${cam.brightness}) contrast(${cam.contrast})`);
        }

        scrollToBoundary(targetIndex);

        const lockDuration = Math.max(ENTER_DURATION, EXIT_DURATION) * 1000 + 120;
        window.clearTimeout(lockTimeoutRef.current);
        lockTimeoutRef.current = window.setTimeout(() => {
          isAnimatingRef.current = false;
          accumulatedDeltaRef.current = 0;
        }, lockDuration);
      }

      function handleKeynoteStep(direction) {
        const current = activeIndexRef.current;
        if (direction === "down") {
          if (current < totalScenes - 1) {
            stepScene(current + 1, "down");
            return true;
          } else {
            return false;
          }
        } else {
          if (current > 0) {
            stepScene(current - 1, "up");
            return true;
          } else {
            return false;
          }
        }
      }

      function handleWheel(e) {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();

        if (!isSectionEngaged()) {
          if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
            // engaging
          } else {
            return;
          }
        }

        const direction = e.deltaY > 0 ? "down" : "up";

        if (isAnimatingRef.current) {
          e.preventDefault();
          return;
        }

        if (direction === "down" && activeIndexRef.current === totalScenes - 1) {
          if (rect.bottom <= window.innerHeight + 2) return;
        }
        if (direction === "up" && activeIndexRef.current === 0) {
          if (rect.top >= -2) return;
        }

        const now = Date.now();
        if (now - lastEventTimeRef.current > 400) {
          accumulatedDeltaRef.current = 0;
        }
        lastEventTimeRef.current = now;

        accumulatedDeltaRef.current += Math.abs(e.deltaY);

        if (accumulatedDeltaRef.current > 20) {
          const handled = handleKeynoteStep(direction);
          accumulatedDeltaRef.current = 0;
          if (handled) e.preventDefault();
        } else {
          e.preventDefault();
        }
      }

      function handleTouchStart(e) {
        if (e.touches.length === 1) {
          touchStartYRef.current = e.touches[0].clientY;
        }
      }

      function handleTouchMove(e) {
        const section = sectionRef.current;
        if (!section || touchStartYRef.current === null) return;
        if (!isSectionEngaged()) return;

        const currentY = e.touches[0].clientY;
        const delta = touchStartYRef.current - currentY;

        if (Math.abs(delta) < 18) return;

        const direction = delta > 0 ? "down" : "up";
        const rect = section.getBoundingClientRect();

        if (direction === "down" && activeIndexRef.current === totalScenes - 1 && rect.bottom <= window.innerHeight + 2) return;
        if (direction === "up" && activeIndexRef.current === 0 && rect.top >= -2) return;

        if (isAnimatingRef.current) {
          e.preventDefault();
          return;
        }

        const handled = handleKeynoteStep(direction);
        if (handled) {
          touchStartYRef.current = currentY;
          e.preventDefault();
        }
      }

      function handleKeyDown(e) {
        const section = sectionRef.current;
        if (!section || !isSectionEngaged()) return;

        let direction = null;
        if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
          direction = "down";
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          direction = "up";
        }

        if (!direction) return;

        const rect = section.getBoundingClientRect();
        if (direction === "down" && activeIndexRef.current === totalScenes - 1 && rect.bottom <= window.innerHeight + 2) return;
        if (direction === "up" && activeIndexRef.current === 0 && rect.top >= -2) return;

        if (isAnimatingRef.current) {
          e.preventDefault();
          return;
        }

        const handled = handleKeynoteStep(direction);
        if (handled) e.preventDefault();
      }

      let ticking = false;
      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          updatePin();
        });
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", updatePin);
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("keydown", handleKeyDown);

      updatePin();
      playScene(0, "down");

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", updatePin);
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("keydown", handleKeyDown);
        window.clearTimeout(lockTimeoutRef.current);
        breathe && breathe.kill();
        particleTweens.forEach((t) => t.kill());
      };
    }, sectionRef);

    let vfxTl;
    if (!reducedMotion) {
      vfxTl = gsap.timeline({ repeat: -1 });
      if (glowRef.current) {
        vfxTl.to(glowRef.current, { opacity: 0.42, scale: 1.08, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0);
      }
      if (lightSweepRef.current) {
        vfxTl.fromTo(
          lightSweepRef.current,
          { xPercent: -140, opacity: 0 },
          { xPercent: 140, opacity: 0.38, duration: 2.8, ease: "sine.inOut" },
          1.2
        ).to(lightSweepRef.current, { opacity: 0, duration: 0.6 }, 4.0);
      }
    }
    if (vignetteRef.current) gsap.set(vignetteRef.current, { opacity: 0.38 });

    return () => {
      ctx.revert();
      vfxTl && vfxTl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="story-section w-full" style={{ position: "relative", height: `${SCROLL_VH * 100}vh` }}>
      <div
        ref={stickyRef}
        className="w-full h-screen overflow-hidden bg-black select-none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          "--font-display": THEME.fontDisplay,
          "--font-body": THEME.fontBody,
          "--c-teal": THEME.colors.teal,
          "--c-teal-soft": THEME.colors.tealSoft,
          "--c-teal-rgb": THEME.colors.tealGlowRgb,
          "--c-paper": THEME.colors.paper,
          "--c-paper-rgb": THEME.colors.paperDimRgb,
        }}
      >
        <style>{`@import url('${THEME.fontImportUrl}');`}</style>

        {/* --- CAMERA & DEPTH LAYERS ------------------------------------- */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-10 pointer-events-none">
          <div ref={cameraScrollRef} className="absolute inset-0 w-full h-full will-change-transform scale-100 origin-center">
            <div ref={cameraBreatheRef} className="absolute inset-0 w-full h-full will-change-transform">
              <div className="absolute inset-0 w-full h-full scale-[1.35] origin-center">
                <video
                  ref={videoRef}
                  src={bgVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="absolute top-1/2 left-1/2 w-screen h-screen min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 object-center will-change-[filter]"
                />
              </div>

              <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-black/70 via-black/40 to-[#06233F]/30" />

              <div
                ref={glowRef}
                className="absolute inset-0 w-full h-full mix-blend-screen will-change-[opacity,transform]"
                style={{
                  background: `radial-gradient(circle at 40% 50%, rgba(${THEME.colors.tealGlowRgb},0.22) 0%, rgba(${THEME.colors.tealGlowRgb},0.08) 50%, transparent 85%)`,
                }}
              />

              <div
                ref={lightSweepRef}
                className="absolute -inset-y-[20%] -inset-x-[15%] opacity-0 mix-blend-screen will-change-transform"
                style={{
                  background: `linear-gradient(75deg, transparent 40%, rgba(${THEME.colors.paperDimRgb},0.2) 48%, rgba(${THEME.colors.tealGlowRgb},0.4) 50%, rgba(${THEME.colors.paperDimRgb},0.2) 52%, transparent 60%)`,
                }}
              />
            </div>
          </div>

          <div
            ref={vignetteRef}
            className="absolute inset-0 w-full h-full z-20 opacity-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.75)_100%)] will-change-[opacity]"
          />

          <div
            className="absolute -inset-[50%] w-[200%] h-[200%] opacity-40 z-30 bg-repeat"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* --- CINEMATIC PARTICLES --------------------------------------- */}
        <div className="absolute inset-0 z-[15] overflow-hidden pointer-events-none">
          {(() => {
            let globalIndex = 0;
            return PARTICLE_LAYERS.map((layer) => (
              <div key={layer.depth} className="absolute inset-0 pointer-events-none will-change-transform" data-depth={layer.depth}>
                {Array.from({ length: layer.count }).map(() => {
                  const idx = globalIndex++;
                  const size = layer.size[0] + seededRandom(idx * 3) * (layer.size[1] - layer.size[0]);
                  const left = 5 + seededRandom(idx * 11) * 90;
                  const top = 5 + seededRandom(idx * 19) * 90;
                  const isGlowing = idx % 4 === 0;
                  return (
                    <span
                      key={idx}
                      ref={(el) => (particleEls.current[idx] = el)}
                      data-dur-min={layer.duration[0]}
                      data-dur-max={layer.duration[1]}
                      className="absolute rounded-full will-change-transform"
                      style={{
                        width: size,
                        height: size,
                        left: `${left}%`,
                        top: `${top}%`,
                        opacity: layer.opacity,
                        backgroundColor: isGlowing ? "var(--c-teal-soft)" : "#FFFFFF",
                        boxShadow: isGlowing ? `0 0 12px rgba(${THEME.colors.tealGlowRgb},0.8)` : "none",
                        filter: "blur(0.6px)",
                      }}
                    />
                  );
                })}
              </div>
            ));
          })()}
        </div>

        {/* --- CONTENT LAYERS & COMPOSITIONS ------------------------------ */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6 md:px-16 w-full h-full">
          <div
            className="absolute w-[min(96vw,1000px)] h-[min(82vh,640px)] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_50%,transparent_80%)] blur-3xl"
            aria-hidden="true"
          />
          {scenesData.map((scene, index) => {
            const isLeft = scene.layout === "left";
            const isRightCard = scene.layout === "right-card";
            const isSplit = scene.layout === "split";
            const isCta = scene.layout === "centered-cta";

            return (
              <div
                key={scene.id}
                ref={(el) => (sceneRefs.current[index] = el)}
                className={`absolute w-full max-w-[1400px] mx-auto flex flex-col will-change-[transform,opacity] px-6 sm:px-12 lg:px-20 ${
                  isLeft
                    ? "items-start text-left"
                    : isRightCard
                    ? "grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-20 text-left"
                    : isSplit
                    ? "grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-20 text-left"
                    : "items-center text-center"
                }`}
                style={{ visibility: index === 0 ? "visible" : "hidden", opacity: index === 0 ? 1 : 0 }}
              >
                {/* Text Content Column */}
                <div className={`flex flex-col ${isRightCard || isSplit ? "lg:col-span-7" : "max-w-[840px] w-full items-center text-center"}`}>
                  <div
                    className="story-eyebrow flex items-center gap-3 mb-6 text-[12px] tracking-[0.4em] uppercase"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--c-teal-soft)",
                      fontWeight: 600,
                      textShadow: "0 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)",
                    }}
                  >
                    <span className="h-px w-8" style={{ backgroundColor: "var(--c-teal)" }} />
                    {scene.eyebrow}
                  </div>

                  <h2
                    className="story-heading text-[clamp(48px,8vw,110px)] leading-[0.92] tracking-[-0.02em] m-0 mb-6 flex flex-wrap"
                    style={{
                      "--glow": "0",
                      fontFamily: "var(--font-display)",
                      fontWeight: 560,
                      color: "var(--c-paper)",
                      filter: `drop-shadow(0 0 calc(var(--glow) * 1px) rgba(${THEME.colors.tealGlowRgb},0.7))`,
                      textShadow:
                        "0 2px 6px rgba(0,0,0,0.95), 0 12px 32px rgba(0,0,0,0.8), 0 1px 0 rgba(0,0,0,0.6)",
                    }}
                  >
                    {scene.heading.split("").map((char, charIdx) => (
                      <span key={charIdx} className="char inline-block will-change-[transform,opacity,filter]">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </h2>

                  <div className="h-[5.2em] flex items-center">
                    <p
                      className="story-paragraph text-[clamp(16px,1.9vw,21px)] leading-relaxed max-w-[620px] m-0"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.95)",
                        textShadow: "0 1px 4px rgba(0,0,0,0.95), 0 6px 18px rgba(0,0,0,0.7)",
                      }}
                    >
                      {scene.paragraph}
                    </p>
                  </div>

                  {isCta && (
                    <div className="story-cta-btn mt-8 flex items-center gap-5 pointer-events-auto">
                      <a
                        href="#contact"
                        className="px-8 py-4 rounded-full bg-[#1FA189] text-white font-semibold text-sm tracking-wider uppercase shadow-[0_10px_30px_rgba(31,161,137,0.4)] hover:bg-[#188a74] transition-all duration-300 hover:scale-105"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Partner With Us
                      </a>
                      <a
                        href="#solutions"
                        className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm tracking-wider uppercase hover:bg-white/20 transition-all duration-300"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Explore Portfolio
                      </a>
                    </div>
                  )}
                </div>

                {/* Secondary Composition Column (Cards, Badges, Visual Anchors) */}
                {(isRightCard || isSplit) && (
                  <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
                    <div
                      className="story-glass-card w-full max-w-[480px] p-8 sm:p-10 rounded-[32px] bg-white/[0.06] backdrop-blur-2xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.6)] flex flex-col gap-6 relative overflow-hidden group"
                    >
                      <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-[#1FA189]/20 blur-2xl pointer-events-none" />
                      
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-xs uppercase tracking-[0.3em] text-[#8FD9C9] font-semibold">
                          Verified Metric
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1FA189] shadow-[0_0_10px_#1FA189]" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-4xl md:text-5xl font-light text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                          {scene.cardBadge}
                        </span>
                        <span className="text-sm text-white/70 leading-relaxed font-normal" style={{ fontFamily: "var(--font-body)" }}>
                          Audited and certified according to elite international pharmaceutical and medical regulatory benchmarks.
                        </span>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/10">
                        <span>Novix Standard</span>
                        <span>ISO 9001:2026</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
