import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: "97%",
    label: "Scientific precision",
    fillWidth: "0%",
    knobLeft: "4px",
  },
  {
    value: "WHO-GMP",
    label: "Certified excellence",
    fillWidth: "100%",
    knobLeft: "calc(100% - 44px)",
  },
  {
    value: "30+",
    label: "Therapeutic categories",
    fillWidth: "0%",
    knobLeft: "4px",
  },
];

export default function NovixStatsSection() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Using toggleActions with scrub: false (or standard trigger) allows the animation 
      // to play out sequentially once entered, and then completely releases pinning 
      // so the user can freely scroll up/down to the next section without getting stuck.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      });

      // Card Entrance phase
      tl.fromTo(
        cardRef.current,
        { scale: 0.95, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Rows staggered reveal & slider progression
      rowRefs.current.forEach((row, i) => {
        if (!row) return;

        const track = row.querySelector(".stats-track-fill");
        const knob = row.querySelector(".stats-knob");

        tl.fromTo(
          row,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          `-=0.4`
        );

        if (track && STATS[i].fillWidth !== "0%") {
          tl.fromTo(
            track,
            { width: "0%" },
            { width: STATS[i].fillWidth, duration: 1.2, ease: "power3.out" },
            "<"
          );
        }

        if (knob) {
          tl.fromTo(
            knob,
            { left: "4px" },
            { left: STATS[i].knobLeft, duration: 1.2, ease: "power3.out" },
            "<"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-[#F8FAFC] flex items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 py-20"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div
        ref={cardRef}
        className="w-full max-w-5xl bg-white rounded-[32px] border border-[#06233F]/10 shadow-[0_20px_60px_rgba(6,35,63,0.06)] overflow-hidden p-6 sm:p-10 md:p-14"
      >
        {/* Stats Rows matching Screenshot Layout */}
        <div className="space-y-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => (rowRefs.current[i] = el)}
              className="opacity-0 group flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-black/[0.04] last:border-none gap-6"
            >
              {/* Value + Label */}
              <div className="flex items-center gap-6 shrink-0 md:w-[320px]">
                <span
                  className="text-4xl sm:text-5xl md:text-6xl font-light text-[#06233F] leading-none tracking-tight"
                  style={{ fontFamily: "'Cinzel', serif" }}
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

              {/* Slider Track Element */}
              <div className="w-full md:w-[460px] flex items-center justify-end">
                <div className="w-full h-12 rounded-full bg-[#F5F5F7] border border-black/[0.04] p-1.5 flex items-center relative overflow-hidden">
                  <div
                    className="stats-track-fill absolute inset-y-1.5 left-1.5 rounded-full"
                    style={{
                      background:
                        i === 1
                          ? "linear-gradient(90deg, rgba(33,104,83,0.08), rgba(33,104,83,0.22))"
                          : "transparent",
                    }}
                  />
                  <div
                    className="stats-knob absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border border-black/[0.05] transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ left: "4px" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#06233F]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
