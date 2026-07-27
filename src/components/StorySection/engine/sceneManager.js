import { TIMING } from "./config";
import { seededSpread } from "./utils";

/**
 * sceneManager.js
 * ---------------------------------------------------------------------------
 * Turns each scene's DOM node into a five-beat sequence — arrival, hold,
 * transition, exit, and (via negative-offset overlap) the next scene's
 * arrival — instead of the old "fade out / fade in" pair.
 *
 * Text motion is per-character and seeded (see utils.seededSpread) so every
 * letter enters/exits from a slightly different point in space: that's what
 * reads as "physically assembled" rather than a CSS fade.
 */
export function buildScenes({ tl, sceneRefs, scenes, segmentDuration, reducedMotion }) {
  const exitDuration = segmentDuration * TIMING.EXIT;
  const arrivalDuration = segmentDuration * TIMING.ARRIVAL;
  const overlapShift = TIMING.OVERLAP * exitDuration;
  const sceneTimings = [];

  scenes.forEach((scene, index) => {
    const sceneEl = sceneRefs.current[index];
    if (!sceneEl) return;

    const headingChars = sceneEl.querySelectorAll(".char");
    const headingEl = sceneEl.querySelector(".story-heading");
    const paragraph = sceneEl.querySelector(".story-paragraph");
    const eyebrow = sceneEl.querySelector(".story-eyebrow");
    if (!headingChars.length) return;

    // Base position for this scene, pulled earlier (except scene 0) so its
    // arrival overlaps the previous scene's exit — the actual cross-dissolve.
    const baseStart = index * segmentDuration - (index > 0 ? overlapShift : 0);
    const arrivalStart = baseStart;
    const holdStart = arrivalStart + arrivalDuration;
    const holdDuration = segmentDuration * TIMING.HOLD;
    const exitStart = holdStart + holdDuration;
    sceneTimings.push({ arrivalStart, holdStart, exitStart, settleAt: holdStart + holdDuration * 0.35 });

    // Container visibility is a hard on/off toggle for pointer-events and
    // a11y only — the actual visual fade is carried by the children below,
    // which is what lets two scenes render at once during the overlap.
    tl.set(sceneEl, { autoAlpha: 1, pointerEvents: "auto" }, arrivalStart);
    if (index < scenes.length - 1) {
      tl.set(sceneEl, { pointerEvents: "none" }, exitStart);
      tl.set(sceneEl, { autoAlpha: 0 }, exitStart + exitDuration);
    }

    // --- ARRIVAL: characters assemble ------------------------------------
    if (reducedMotion) {
      tl.fromTo(headingChars, { opacity: 0 }, { opacity: 1, duration: arrivalDuration }, arrivalStart);
    } else {
      // Snappy, confident "click into place" build: shorter travel
      // distance, a light overshoot ease, and a tight stagger so the whole
      // word assembles fast rather than drifting in.
      tl.fromTo(
        headingChars,
        {
          opacity: 0,
          y: (i) => 34 + seededSpread(scene.id * 97 + i, 20),
          x: (i) => seededSpread(scene.id * 53 + i, 16),
          rotateX: (i) => 16 + seededSpread(scene.id * 31 + i, 14),
          rotateZ: (i) => seededSpread(scene.id * 17 + i, 4),
          scale: 1.06,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotateX: 0,
          rotateZ: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "back.out(1.6)",
          duration: arrivalDuration,
          stagger: { each: 0.01, from: "random" },
        },
        arrivalStart
      );

      // A brief glow spike as the letters land, sharpening down to a
      // faint ambient glow for the hold — driven off a CSS custom
      // property so it composites cheaply instead of animating box-shadow.
      if (headingEl) {
        tl.fromTo(
          headingEl,
          { "--glow": 0 },
          { "--glow": 14, duration: arrivalDuration * 0.6, ease: "power2.out" },
          arrivalStart
        ).to(headingEl, { "--glow": 3, duration: arrivalDuration * 0.6, ease: "power1.out" }, arrivalStart + arrivalDuration * 0.55);
      }
    }

    // Eyebrow + paragraph: a slower, quieter reveal that trails the heading.
    if (eyebrow) {
      tl.fromTo(
        eyebrow,
        { opacity: 0, y: 22, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: arrivalDuration * 0.8 },
        arrivalStart + arrivalDuration * 0.15
      );
    }
    if (paragraph) {
      tl.fromTo(
        paragraph,
        { opacity: 0, y: 26, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          ease: "power2.out",
          duration: arrivalDuration * 1.1,
        },
        arrivalStart + arrivalDuration * 0.3
      );
    }

    // --- HOLD: near-static, but never dead ------------------------------
    // A single, small, scroll-driven scale breath — reversible with the
    // scrollbar unlike an independent infinite tween, so it never fights
    // the user scrubbing backward.
    if (!reducedMotion && headingEl) {
      tl.to(headingEl, { scale: 1.015, ease: "sine.inOut", duration: holdDuration * 0.5 }, holdStart)
        .to(headingEl, { scale: 1, ease: "sine.inOut", duration: holdDuration * 0.5 }, holdStart + holdDuration * 0.5);
    }

    // --- EXIT: characters break apart -------------------------------
    if (index < scenes.length - 1) {
      if (reducedMotion) {
        tl.to(headingChars, { opacity: 0, duration: exitDuration }, exitStart);
        if (eyebrow) tl.to(eyebrow, { opacity: 0, duration: exitDuration }, exitStart);
        if (paragraph) tl.to(paragraph, { opacity: 0, duration: exitDuration }, exitStart);
      } else {
        tl.to(
          headingChars,
          {
            opacity: 0,
            y: (i) => -32 + seededSpread(scene.id * 71 + i, 28),
            x: (i) => seededSpread(scene.id * 89 + i, 42),
            rotateZ: (i) => seededSpread(scene.id * 43 + i, 12),
            filter: "blur(12px)",
            ease: "power3.in",
            duration: exitDuration,
            stagger: { each: 0.008, from: "random" },
          },
          exitStart
        );
        if (eyebrow) {
          tl.to(eyebrow, { opacity: 0, y: -18, filter: "blur(10px)", ease: "power2.in", duration: exitDuration * 0.8 }, exitStart);
        }
        if (paragraph) {
          tl.to(
            paragraph,
            { opacity: 0, y: -16, clipPath: "inset(0 100% 0 0)", ease: "power2.in", duration: exitDuration * 0.9 },
            exitStart
          );
        }
      }
    }
  });

  return sceneTimings;
}