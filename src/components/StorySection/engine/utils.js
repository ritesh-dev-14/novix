/**
 * utils.js
 * ---------------------------------------------------------------------------
 */

/**
 * Deterministic pseudo-random generator (mulberry32). Given the same seed it
 * always returns the same value — this is what lets every character in a
 * heading get an organic, "scattered" origin point on entrance/exit without
 * the layout jittering on re-render or between mount/unmount.
 */
export function seededRandom(seed) {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** Maps seededRandom's [0,1) output to a [-range, range] spread. */
export function seededSpread(seed, range) {
  return (seededRandom(seed) * 2 - 1) * range;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}