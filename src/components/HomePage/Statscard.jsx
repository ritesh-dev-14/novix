import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: "97%",
    label: "Scientific precision",
    fillWidth: "97%",
    knobLeft: "calc(97% - 40px)",
  },
  {
    value: "WHO-GMP",
    label: "Certified excellence",
    fillWidth: "100%",
    knobLeft: "calc(100% - 40px)",
  },
  {
    value: "30+",
    label: "Therapeutic categories",
    fillWidth: "78%",
    knobLeft: "calc(78% - 40px)",
  },
];

export default function NovixStatsSection() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      // Make everything visible when reduced motion is enabled
      gsap.set(cardRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
      });

      gsap.set(rowRefs.current, {
        opacity: 1,
        y: 0,
      });

      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      });

      // ------------------------------------------------
      // CARD ENTRANCE
      // ------------------------------------------------
      tl.fromTo(
        cardRef.current,
        {
          scale: 0.95,
          opacity: 0,
          y: 30,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // ------------------------------------------------
      // STATS ROWS + PROGRESS ANIMATION
      // ------------------------------------------------
      rowRefs.current.forEach((row, i) => {
        if (!row) return;

        const track = row.querySelector(".stats-track-fill");
        const knob = row.querySelector(".stats-knob");

        // Row reveal
        tl.fromTo(
          row,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );

        // Progress fill
        if (track) {
          tl.fromTo(
            track,
            {
              width: "0%",
            },
            {
              width: STATS[i].fillWidth,
              duration: 1.2,
              ease: "power3.out",
            },
            "<"
          );
        }

        // Knob movement
        if (knob) {
          tl.fromTo(
            knob,
            {
              left: "4px",
            },
            {
              left: STATS[i].knobLeft,
              duration: 1.2,
              ease: "power3.out",
            },
            "<"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen bg-[#F8FAFC] flex items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 py-20"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        ref={cardRef}
        className="w-full max-w-5xl bg-white rounded-[32px] border border-[#06233F]/10 shadow-[0_20px_60px_rgba(6,35,63,0.06)] overflow-hidden p-6 sm:p-10 md:p-14"
      >
        <div className="space-y-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="opacity-0 group flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-black/[0.04] last:border-none gap-6"
            >
              {/* VALUE + LABEL */}
              <div className="flex items-center gap-6 shrink-0 md:w-[320px]">
                <span
                  className="text-4xl sm:text-5xl md:text-6xl font-light text-[#06233F] leading-none tracking-tight"
                  style={{
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  {stat.value}
                </span>

                <span className="w-1.5 h-1.5 rounded-full bg-[#06233F]/20 shrink-0" />

                <div className="flex flex-col">
                  <span className="text-xs text-[#06233F]/60 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              </div>

              {/* PROGRESS TRACK */}
              <div className="w-full md:w-[460px] flex items-center justify-end">
                <div className="w-full h-12 rounded-full bg-[#F5F5F7] border border-black/[0.04] p-1.5 flex items-center relative overflow-hidden">
                  {/* FILLED AREA */}
                  <div
                    className="stats-track-fill absolute inset-y-1.5 left-1.5 rounded-full"
                    style={{
                      width: "0%",
                      background:
                        "linear-gradient(90deg, rgba(33,104,83,0.08), rgba(33,104,83,0.22))",
                    }}
                  />

                  {/* KNOB */}
                  <div
                    className="stats-knob absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border border-black/[0.05] transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      left: "4px",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#06233F]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}