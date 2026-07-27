/**
 * config.js
 * ---------------------------------------------------------------------------
 * Single source of truth for scene content and animation timing. Nothing in
 * cameraController / vfxController / sceneManager should hard-code a number
 * that belongs here — this keeps the "magic number" surface area in one
 * reviewable place.
 */

export const scenesData = [
  {
    id: 1,
    eyebrow: "01 // VISION",
    heading: "NEXT GEN",
    paragraph:
      "Building the future of healthcare through scientific innovation and trusted global partnerships.",
    // Each scene reads as a distinct "environment" the camera moves into —
    // a small, deliberate rotate/pan so scene 2 doesn't sit at the exact
    // framing scene 1 left off at.
    camera: { rotate: -0.6, x: -14, y: 4 },
  },
  {
    id: 2,
    eyebrow: "02 // PRECISION",
    heading: "ENGINEERING",
    paragraph:
      "Every healthcare solution is developed with precision, compliance, and uncompromising quality standards.",
    camera: { rotate: 0.5, x: 10, y: -8 },
  },
  {
    id: 3,
    eyebrow: "03 // INTEGRITY",
    heading: "QUALITY",
    paragraph:
      "Partnering with globally certified facilities to deliver reliable pharmaceutical solutions.",
    camera: { rotate: -0.35, x: -8, y: 10 },
  },
  {
    id: 4,
    eyebrow: "04 // IMPACT",
    heading: "GLOBAL TRUST",
    paragraph:
      "Connecting healthcare markets worldwide with innovation, reliability, and long-term partnerships.",
    camera: { rotate: 0.7, x: 12, y: -6 },
  },
];

/**
 * TIMING
 * A "unit" is a fraction (0..1) of the master scroll timeline. Every scene
 * gets an equal share (SEGMENT = 1 / totalScenes) but that share is split
 * unevenly on purpose — cinematic pacing is arrival-fast / hold-long /
 * exit-slow, not a uniform crossfade.
 */
export const TIMING = {
  // Fraction of a scene's segment spent on the character "build" entrance.
  // Kept short and punchy — a premium reveal snaps into place, it doesn't
  // drift in.
  ARRIVAL: 0.16,
  // Fraction spent held on screen with only micro-motion (breathing text,
  // drifting particles) — this is the "let it land" beat every premium
  // reveal has and a generic GSAP demo skips.
  HOLD: 0.52,
  // Fraction spent breaking apart / exiting. Quick and clean.
  EXIT: 0.24,
  // How much of the EXIT phase overlaps with the next scene's ARRIVAL,
  // expressed as a fraction of EXIT's own duration. 0 = sequential (old
  // behaviour), 1 = fully simultaneous.
  OVERLAP: 0.45,
};

/** Total scroll distance the pinned section consumes, in viewport heights.
 * Shortened from the original 5x so each scene resolves faster and the
 * whole thing feels responsive to scroll rather than sluggish. */
export const SCROLL_VH = 3.6;

/** How tightly the timeline tracks the scrollbar. Lower = snappier/less
 * lag, higher = smoother/more delayed. 0.8 reads as quick and confident
 * without feeling jumpy. */
export const SCRUB = 0.8;

/** Continuous dolly-forward zoom applied across the *entire* timeline.
 * Kept modest — a big zoom range makes edge-darkening and cropping more
 * noticeable as the camera pushes in. */
export const CAMERA_DOLLY = { from: 1, to: 1.3 };

/** Slow, near-imperceptible handheld drift — independent of scroll. */
export const CAMERA_BREATHE = {
  duration: 7, // seconds per cycle, deliberately slow so it never reads as "shaky"
  x: 3, // px
  y: 2.5, // px
  rotate: 0.15, // deg
};

/** Scroll snap: after the user stops scrolling, the timeline settles onto
 * the nearest scene's "arrived" point rather than resting mid-transition.
 * This is what makes one scroll gesture read as "move to the next scene"
 * instead of needing several small scrolls to land somewhere clean. */
export const SNAP = {
  duration: { min: 0.3, max: 0.55 },
  ease: "power2.inOut",
  delay: 0.05,
};

/**
 * THEME
 * Single design-token source. Novix's own mark is a dark ink wordmark, so
 * the palette here is built around a deep ink/teal pairing rather than the
 * generic near-black-plus-electric-blue "AI demo" look — teal reads as
 * clinical/biotech, not sci-fi.
 *   ink        — background scrim / shadow color
 *   teal       — the one accent color: labels, glow, light sweep
 *   tealSoft   — lighter teal for small caps / secondary accents
 *   paper      — primary text color, a crisp cool white (not warm cream —
 *                this is a clinical brand, not an editorial one)
 *   paperDim   — secondary text (paragraph) at reduced opacity
 */
export const THEME = {
  fontDisplay: "'Fraunces', 'Iowan Old Style', Georgia, serif",
  fontBody: "'Manrope', 'Inter', -apple-system, sans-serif",
  fontImportUrl:
    "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Manrope:wght@400;500;600&display=swap",
  colors: {
    ink: "#060b0a",
    teal: "#1FA189",
    tealSoft: "#8FD9C9",
    tealGlowRgb: "31,161,137",
    paper: "#F4F7F6",
    paperDimRgb: "244,247,246",
  },
};
export const PARTICLE_LAYERS = [
  { count: 8, depth: "far", size: [2, 3], parallax: 0.06, opacity: 0.18, duration: [14, 20] },
  { count: 7, depth: "mid", size: [3, 5], parallax: 0.14, opacity: 0.28, duration: [9, 14] },
  { count: 5, depth: "near", size: [5, 8], parallax: 0.26, opacity: 0.4, duration: [6, 9] },
];