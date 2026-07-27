/**
 * vfxController.js
 * ---------------------------------------------------------------------------
 * Everything atmospheric that sits between the camera and the content:
 * color grade, bloom/glow, a light sweep, vignette. Deliberately restrained —
 * v1 stacked a vignette ramp + haze + grain that read as the whole frame
 * dimming over time. This version keeps the video bright and clean and
 * saves "dark" for nothing: contrast and pop come from the glow and the
 * vignette's *edges*, never from lowering overall brightness.
 *
 * Every tween here targets `opacity`/`filter` on a small number of
 * dedicated overlay elements (never the whole DOM tree) or GPU-friendly
 * `transform`, and runs a handful of discrete keyframes rather than a
 * value recomputed every scroll pixel — that's what keeps this cheap at
 * 60fps.
 */
export function addVfxToTimeline({
  tl,
  videoRef,
  glowRef,
  lightSweepRef,
  vignetteRef,
  segmentDuration,
  totalScenes,
}) {
  // --- Color grade -----------------------------------------------------
  // One quick lift at the very start (the "world coming into focus" beat)
  // that HOLDS — it never settles back down or dips. Brightness/contrast
  // only ever move up from baseline, never below 1.
  if (videoRef) {
    tl.fromTo(
      videoRef,
      { filter: "brightness(1) contrast(1) saturate(1)" },
      {
        filter: "brightness(1.08) contrast(1.06) saturate(1.1)",
        ease: "power2.out",
        duration: segmentDuration * 0.6,
      },
      0
    );
  }

  // --- Glow / bloom ------------------------------------------------------
  // Kept low-amplitude and warm — this is meant to add life at the edges,
  // not desaturate the center of the frame.
  if (glowRef) {
    tl.fromTo(glowRef, { opacity: 0.22, scale: 1 }, { opacity: 0.4, scale: 1.1, ease: "none" }, 0);
  }

  // --- Light sweep ---------------------------------------------------
  // A quick, confident highlight once per scene — the "product reveal"
  // cue. Shortened and snappier than a lazy drift so it reads as
  // intentional, not ambient.
  if (lightSweepRef) {
    for (let i = 0; i < totalScenes; i++) {
      const start = i * segmentDuration + segmentDuration * 0.08;
      tl.fromTo(
        lightSweepRef,
        { xPercent: -130, opacity: 0 },
        { xPercent: 130, opacity: 0.38, ease: "power2.inOut", duration: segmentDuration * 0.42 },
        start
      ).to(lightSweepRef, { opacity: 0, duration: segmentDuration * 0.1 }, start + segmentDuration * 0.32);
    }
  }

  // --- Vignette ----------------------------------------------------------
  // A light, constant edge-darken for focus — set once, never animated to
  // a heavier value over time. This is the single biggest fix for the
  // "background goes dark" complaint: previously this ramped from 0.4
  // to 0.85 across the whole scroll.
  if (vignetteRef) {
    tl.set(vignetteRef, { opacity: 0.28 }, 0);
  }
}