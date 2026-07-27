import gsap from "gsap";
import { CAMERA_DOLLY, CAMERA_BREATHE } from "./config";

/**
 * cameraController.js
 * ---------------------------------------------------------------------------
 * Owns everything that reads as "camera" rather than "content": the slow
 * forward dolly, the per-scene environment repositioning, and a continuous
 * handheld breathing loop that never stops — even when the scroll timeline
 * is paused, the frame should still feel alive.
 *
 * Two separate transform targets are used deliberately:
 *   - scrollRef:   driven by the scroll-scrubbed master timeline (dolly +
 *                  per-scene tilt). Deterministic, tied to scroll position.
 *   - breatheRef:  driven by an independent, infinitely-repeating GSAP
 *                  tween. Time-based, never tied to scroll.
 * Nesting them means their transforms compose without either controller
 * needing to know about the other's current value.
 */
export function mountCameraController({ scrollRef, breatheRef, reducedMotion }) {
  if (reducedMotion || !breatheRef) return () => {};

  const breathe = gsap.to(breatheRef, {
    x: CAMERA_BREATHE.x,
    y: CAMERA_BREATHE.y,
    rotate: CAMERA_BREATHE.rotate,
    duration: CAMERA_BREATHE.duration,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });

  return () => breathe.kill();
}

/**
 * Adds the scroll-scrubbed camera moves onto the master timeline. Called
 * once during timeline construction, positioned at time 0 so the dolly runs
 * across the full duration alongside every scene.
 */
export function addCameraToTimeline({ tl, scrollRef, scenes, segmentDuration }) {
  if (!scrollRef) return;

  // Continuous slow dolly-forward across the entire experience.
  tl.fromTo(
    scrollRef,
    { scale: CAMERA_DOLLY.from },
    { scale: CAMERA_DOLLY.to, ease: "none" },
    0
  );

  // Per-scene "new environment" repositioning. Each tween spans roughly one
  // scene's segment so the camera drifts continuously into the next framing
  // rather than snapping — ease power1.inOut gives it a gentle settle.
  scenes.forEach((scene, index) => {
    const startTime = index * segmentDuration;
    tl.to(
      scrollRef,
      {
        x: scene.camera.x,
        y: scene.camera.y,
        rotate: scene.camera.rotate,
        ease: "power1.inOut",
        duration: segmentDuration,
      },
      startTime
    );
  });
}