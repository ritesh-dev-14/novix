import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { PARTICLE_LAYERS } from "./engine/config";
import { seededRandom, seededSpread } from "./engine/utils";

/**
 * ParticleField
 * ---------------------------------------------------------------------------
 * Renders three depth bands (far / mid / near) of small motes. Each mote
 * gets its own slow, deterministic drift loop — independent of scroll, so
 * the frame never looks frozen even while the user pauses mid-scroll.
 *
 * The three band wrappers are exposed via `layerRefs` (passed in from the
 * parent) so the *scroll-driven* parallax offset can be added separately by
 * the master timeline: ambient motion and scroll motion are different
 * concerns and are kept on different tweens/targets.
 */
export default function ParticleField({ layerRefs, reducedMotion }) {
  const particleEls = useRef([]);

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const tweens = particleEls.current.map((el, i) => {
      if (!el) return null;
      const durationRange = el.dataset.durMin && el.dataset.durMax
        ? [Number(el.dataset.durMin), Number(el.dataset.durMax)]
        : [8, 14];
      const duration = durationRange[0] + seededRandom(i * 13) * (durationRange[1] - durationRange[0]);
      return gsap.to(el, {
        y: seededSpread(i * 29 + 3, 22),
        x: seededSpread(i * 41 + 7, 14),
        duration,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: seededRandom(i * 5) * duration,
      });
    });

    return () => tweens.forEach((t) => t && t.kill());
  }, [reducedMotion]);

  let globalIndex = 0;

  return (
    <>
      {PARTICLE_LAYERS.map((layer) => (
        <div
          key={layer.depth}
          ref={(el) => {
            if (layerRefs) layerRefs.current[layer.depth] = el;
          }}
          className="absolute inset-0 pointer-events-none will-change-transform"
          data-depth={layer.depth}
        >
          {Array.from({ length: layer.count }).map((_, i) => {
            const idx = globalIndex++;
            const size = layer.size[0] + seededRandom(idx * 3) * (layer.size[1] - layer.size[0]);
            const left = 8 + seededRandom(idx * 11) * 84;
            const top = 8 + seededRandom(idx * 19) * 84;
            return (
              <span
                key={idx}
                ref={(el) => (particleEls.current[idx] = el)}
                data-dur-min={layer.duration[0]}
                data-dur-max={layer.duration[1]}
                className="absolute rounded-full bg-white will-change-transform"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  top: `${top}%`,
                  opacity: layer.opacity,
                  filter: "blur(0.5px)",
                }}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}