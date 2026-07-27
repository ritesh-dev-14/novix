import React, { forwardRef, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
gsap.registerEase &&
  CustomEase.create("novixGlide", "M0,0 C0.16,1 0.3,1 1,1");
gsap.registerEase &&
  CustomEase.create("novixTumble", "M0,0 C0.22,0.05 0.08,0.98 1,1");

const CARDS = [
  {
    tag: "01 — Precision Optics",
    desc: "Diagnostic imaging systems built for sub-millimeter accuracy.",
  },
  {
    tag: "02 — Neural Pathways",
    desc: "Real-time biometric feedback loops for continuous patient monitoring.",
  },
  {
    tag: "03 — Core Diagnostics",
    desc: "High-throughput cellular analysis engineered for clinical throughput.",
  },
  {
    tag: "04 — Sterile Mechanics",
    desc: "WHO-GMP compliant robotics for fully automated surgical support.",
  },
  {
    tag: "05 — Quantum Sensors",
    desc: "Sub-micrometer molecular detection for early-stage diagnostics.",
  },
];

const CARD_COUNT = CARDS.length;
const TOP_INDEX = CARD_COUNT - 1;
const PERSPECTIVE_PX = 1800;

/** Z separation once lifted — no two cards share a plane. */
const LIFT_Z = [-78, -39, 0, 39, 78];

/** Upward travel added to each card's stacked Y (px). */
const LIFT_Y_DELTA = -36;

/** Timeline offset between each card's lift start (0–1 scrub space). */
const LIFT_STAGGER = 0.085;

/** Stage 3 — combined-axis tumble per card (deg); Y is never the only rotation. */
const TUMBLE_MOTION = [
  { rotateX: -14, rotateY: 52, rotateZ: -16, yDrift: -11, zDrift: 14 },
  { rotateX: 9, rotateY: -44, rotateZ: 12, yDrift: -8, zDrift: -10 },
  { rotateX: -6, rotateY: 38, rotateZ: -8, yDrift: -13, zDrift: 8 },
  { rotateX: 11, rotateY: -58, rotateZ: 15, yDrift: -7, zDrift: -12 },
  { rotateX: -10, rotateY: 46, rotateZ: -11, yDrift: -10, zDrift: 11 },
];

const TUMBLE_PHASE_START = 0.5;
const TUMBLE_STAGGER = 0.074;
const TUMBLE_DURATION = 0.44;

const CENTER_INDEX = 2;

/** Final spread — center (index 2) stays near origin; outers travel further. */
const FINAL_X = {
  desktop: [-408, -202, 0, 202, 408],
  tablet: [-262, -130, 0, 130, 262],
  mobile: [-104, -54, 0, 54, 104],
};

/** Depth preserved at rest — cards never collapse to one Z plane mid-flight either. */
const FINAL_Z = [-68, -34, 0, 34, 68];

const FINAL_ROTATE_Z = [-8, -4, 0, 4, 8];

/** Arc apex (px Y); outer cards bow higher before settling. */
const ARC_Y = CARDS.map(
  (_, i) => -1 * (Math.abs(i - CENTER_INDEX) * 16 + 22)
);

const SPREAD_PHASE_START = 0.94;
const SPREAD_STAGGER = 0.017;

/** Stage 5 — near-static idle drift (Vision Pro–style); amplitudes in px / deg. */
const IDLE_FLOAT = [
  { y: 2.4, z: 2.8, rx: 0.38, ry: 0.32, rz: 0.45, scaleDelta: 0.0028, duration: 5.4, phase: 0 },
  { y: -2.1, z: -2.4, rx: -0.41, ry: 0.36, rz: -0.38, scaleDelta: 0.0024, duration: 4.9, phase: 0.85 },
  { y: 1.8, z: 1.6, rx: 0.28, ry: -0.3, rz: 0.22, scaleDelta: 0.0032, duration: 5.8, phase: 1.42 },
  { y: -2.6, z: 2.2, rx: 0.44, ry: -0.34, rz: 0.4, scaleDelta: 0.0026, duration: 5.1, phase: 0.38 },
  { y: 2.2, z: -2.6, rx: -0.33, ry: 0.4, rz: -0.42, scaleDelta: 0.003, duration: 4.7, phase: 1.15 },
];

/**
 * Stacked-deck motion values (Stage 1). GSAP owns transform/opacity after mount.
 */
function getStackMotion(index) {
  const depthFromTop = TOP_INDEX - index;
  return {
    y: depthFromTop * 3.5,
    z: index * -7,
    rotateX: 5,
    rotateY: 0,
    rotateZ: depthFromTop * -1.35,
    scale: 1 - depthFromTop * 0.014,
    opacity:
      index === TOP_INDEX ? 1 : Math.max(0.22, 0.88 - depthFromTop * 0.14),
  };
}

function getTumbleEnd(index) {
  const startY = getStackMotion(index).y;
  const tumble = TUMBLE_MOTION[index];
  return {
    y: startY + LIFT_Y_DELTA + tumble.yDrift,
    z: LIFT_Z[index] + tumble.zDrift,
  };
}

/** Mid-spread Z bow — keeps separation and avoids straight-line travel in depth. */
function getSpreadArcZ(index) {
  const end = getTumbleEnd(index);
  const towardFinal = FINAL_Z[index] - end.z;
  const bow = Math.abs(index - CENTER_INDEX) * 10 + 14;
  return end.z + towardFinal * 0.5 + bow;
}

const GlassCard = forwardRef(function GlassCard({ card, index }, ref) {
  const isTop = index === TOP_INDEX;

  return (
    <article
      ref={ref}
      className="absolute top-1/2 left-1/2 w-[min(88vw,190px)] sm:w-[240px] lg:w-[270px] h-[min(62vw,270px)] sm:h-[330px] lg:h-[370px] rounded-[1.25rem] sm:rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden pointer-events-none"
      style={{
        zIndex: index,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.42) 48%, rgba(247,245,240,0.55) 100%)",
        border: "1px solid rgba(255,255,255,0.65)",
        boxShadow: isTop
          ? "0 4px 24px rgba(14,53,92,0.06), 0 28px 64px rgba(14,53,92,0.14), 0 1px 0 rgba(255,255,255,0.8) inset"
          : "0 2px 12px rgba(14,53,92,0.05), 0 16px 40px rgba(14,53,92,0.08)",
        backdropFilter: "blur(20px) saturate(1.35)",
        WebkitBackdropFilter: "blur(20px) saturate(1.35)",
      }}
      aria-hidden={!isTop}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.9), transparent 55%), linear-gradient(180deg, rgba(46,125,115,0.06) 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex justify-between items-start gap-3">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-semibold text-[#2E7D73] bg-white/50 px-2.5 py-1 rounded-full border border-white/60 shadow-sm">
          {card.tag}
        </span>
        <span
          className="mt-1 w-1.5 h-1.5 shrink-0 rounded-full bg-[#2E7D73] shadow-[0_0_8px_rgba(46,125,115,0.45)]"
          aria-hidden="true"
        />
      </div>
      <p className="relative z-10 text-[#5C6773] text-[11px] sm:text-xs font-normal leading-relaxed max-w-[95%]">
        {card.desc}
      </p>
    </article>
  );
});

/**
 * Stage 1 — stack. Stage 2 — lift. Stage 3 — tumble. Stage 4 — spread. Stage 5 — idle float.
 */
export default function CardStackReveal() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const idleTweenRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || cards.length !== CARD_COUNT) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        cards.forEach((card, i) => {
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: FINAL_X.desktop[i],
            y: 0,
            z: FINAL_Z[i],
            rotateX: 0,
            rotateY: 0,
            rotateZ: FINAL_ROTATE_Z[i],
            scale: 1,
            opacity: 1,
            transformPerspective: PERSPECTIVE_PX,
          });
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const layout = gsap.matchMedia();

        layout.add(
          {
            isDesktop: "(min-width: 1024px)",
            isTablet: "(min-width: 640px) and (max-width: 1023px)",
            isMobile: "(max-width: 639px)",
          },
          (context) => {
            const { isDesktop, isTablet } = context.conditions;
            const finalX = isDesktop
              ? FINAL_X.desktop
              : isTablet
                ? FINAL_X.tablet
                : FINAL_X.mobile;

            function stopIdleFloat() {
              const tweens = idleTweenRef.current;
              if (Array.isArray(tweens)) {
                tweens.forEach((t) => t.kill());
              } else {
                tweens?.kill();
              }
              idleTweenRef.current = null;
            }

            function startIdleFloat() {
              if (idleTweenRef.current) return;

              idleTweenRef.current = cards.map((card, i) => {
                const drift = IDLE_FLOAT[i];
                const rest = {
                  y: gsap.getProperty(card, "y"),
                  z: gsap.getProperty(card, "z"),
                  rotateX: gsap.getProperty(card, "rotateX"),
                  rotateY: gsap.getProperty(card, "rotateY"),
                  rotateZ: gsap.getProperty(card, "rotateZ"),
                  scale: gsap.getProperty(card, "scale"),
                };

                return gsap.fromTo(
                  card,
                  rest,
                  {
                    y: rest.y + drift.y,
                    z: rest.z + drift.z,
                    rotateX: rest.rotateX + drift.rx,
                    rotateY: rest.rotateY + drift.ry,
                    rotateZ: rest.rotateZ + drift.rz,
                    scale: rest.scale + drift.scaleDelta,
                    duration: drift.duration,
                    delay: drift.phase,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                  }
                );
              });
            }

            gsap.set(cards, {
              xPercent: -50,
              yPercent: -50,
              x: 0,
              y: (i) => getStackMotion(i).y,
              z: (i) => getStackMotion(i).z,
              rotateX: (i) => getStackMotion(i).rotateX,
              rotateY: 0,
              rotateZ: (i) => getStackMotion(i).rotateZ,
              scale: (i) => getStackMotion(i).scale,
              opacity: (i) => getStackMotion(i).opacity,
              transformPerspective: PERSPECTIVE_PX,
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
            });

            const tl = gsap.timeline({
              defaults: { ease: "novixGlide" },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=560%",
                pin: true,
                scrub: 1.15,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onLeave: () => startIdleFloat(),
                onEnterBack: () => stopIdleFloat(),
                onUpdate: (self) => {
                  if (self.progress < 1) {
                    stopIdleFloat();
                    return;
                  }
                  startIdleFloat();
                },
              },
            });

            cards.forEach((card, i) => {
              const startY = getStackMotion(i).y;
              tl.to(
                card,
                {
                  y: startY + LIFT_Y_DELTA,
                  z: LIFT_Z[i],
                  rotateX: 0,
                  rotateZ: 0,
                  scale: 0.98,
                  opacity: 1,
                  duration: 0.38,
                },
                i * LIFT_STAGGER
              );
            });

            cards.forEach((card, i) => {
              const startY = getStackMotion(i).y;
              const liftEndY = startY + LIFT_Y_DELTA;
              const tumble = TUMBLE_MOTION[i];

              tl.to(
                card,
                {
                  rotateX: tumble.rotateX,
                  rotateY: tumble.rotateY,
                  rotateZ: tumble.rotateZ,
                  y: liftEndY + tumble.yDrift,
                  z: LIFT_Z[i] + tumble.zDrift,
                  duration: TUMBLE_DURATION,
                  ease: "novixTumble",
                },
                TUMBLE_PHASE_START + i * TUMBLE_STAGGER
              );
            });

            cards.forEach((card, i) => {
              const at = SPREAD_PHASE_START + i * SPREAD_STAGGER;

              tl.to(
                card,
                {
                  y: ARC_Y[i],
                  z: getSpreadArcZ(i),
                  duration: 0.22,
                  ease: "sine.inOut",
                },
                at
              ).to(
                card,
                {
                  x: finalX[i],
                  y: 0,
                  z: FINAL_Z[i],
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: FINAL_ROTATE_Z[i],
                  scale: 1,
                  duration: 0.38,
                  ease: "back.out(0.88)",
                },
                at + 0.09
              );
            });

            return () => {
              stopIdleFloat();
              tl.scrollTrigger?.kill();
              tl.kill();
            };
          }
        );

        return () => layout.revert();
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] bg-[#F7F5F0] overflow-hidden flex flex-col items-center justify-center select-none px-4"
      aria-label="Novix capability cards"
    >
      <header className="relative z-20 text-center max-w-3xl mb-10 sm:mb-12 md:mb-14 pt-16 sm:pt-20">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#2E7D73] block mb-2">
          Precision Engineering
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#0E355C] tracking-tight">
          Touching tomorrow,{" "}
          <span className="text-[#0E355C]/35">today</span>
        </h2>
      </header>

      <div
        className="relative w-full max-w-6xl flex items-center justify-center"
        style={{
          perspective: `${PERSPECTIVE_PX}px`,
          perspectiveOrigin: "50% 42%",
        }}
      >
        <div
          className="relative w-full h-[min(72svh,420px)] sm:h-[400px] md:h-[450px] lg:h-[480px]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {CARDS.map((card, index) => (
            <GlassCard
              key={card.tag}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              card={card}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
// 