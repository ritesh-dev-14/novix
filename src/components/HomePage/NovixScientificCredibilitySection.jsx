import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Inject editorial fonts strictly for this component
const injectFonts = () => {
  if (
    typeof window !== "undefined" &&
    !document.getElementById("novix-editorial-fonts")
  ) {
    const link = document.createElement("link");
    link.id = "novix-editorial-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }
};

const principles = [
  {
    id: "01",
    title: "Uncompromising Quality Systems",
    detail: "Strict batch-release protocols, continuous environmental monitoring, and comprehensive analytical testing across all phases.",
    tag: "QUALITY PARADIGM",
  },
  {
    id: "02",
    title: "Transparent Regulatory Documentation",
    detail: "Audit-ready technical dossiers, complete chemical traceability, and globally accepted validation data.",
    tag: "GOVERNANCE & DATA",
  },
  {
    id: "03",
    title: "Validated Scientific Efficacy",
    detail: "Formulations grounded in peer-reviewed clinical research and precise dosage standardization.",
    tag: "FORMULATION RIGOR",
  },
  {
    id: "04",
    title: "Internationally Recognized Compliance",
    detail: "Operating strictly in alignment with global regulatory directives, WHO-GMP guidelines, and ISO standards.",
    tag: "GLOBAL BENCHMARK",
  },
];

// Motion easing: soft, cinematic
const cinematicEase = [0.16, 1, 0.3, 1];

export default function NovixScientificCredibilityRedesign() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [activePrinciple, setActivePrinciple] = useState(3); // Card 04 active by default as in screenshot
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    injectFonts();
  }, []);

  // Automatic cycle across all 4 points unless manually selected
  useEffect(() => {
    if (!isInView || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setActivePrinciple((prev) => (prev + 1) % principles.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isInView, isAutoPlaying]);

  const handleSelect = (index) => {
    setIsAutoPlaying(false); // Pause auto-play on click
    setActivePrinciple(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F8F6F2] flex flex-col justify-between overflow-hidden selection:bg-[#06233F] selection:text-[#F8F6F2] py-20 md:py-28"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* --- Subtle Background Overlay --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          src="https://plus.unsplash.com/premium_photo-1733306459429-072d73ef6e93?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Scientific Laboratory"
          className="w-full h-full object-cover opacity-35 filter contrast-[0.95] brightness-[0.98]"
          initial={{ scale: 1 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />

      </div>

      {/* --- Main Editorial Content --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-between">
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 1, ease: cinematicEase }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 md:mb-16 border-b border-[#06233F]/10 pb-6 w-full"
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#216853]">
              01 — Credibility Standard
            </span>
            <span className="w-8 h-[1px] bg-[#216853]/30" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#216853] hidden sm:inline">
              Novix Operational Principles
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#216853]">
              Validation Protocol
            </span>
            {isAutoPlaying && (
              <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[#216853]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#216853] animate-ping" />
                Live Sequence
              </span>
            )}
          </div>
        </motion.div>

        {/* --- Headline & Context Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%", filter: "blur(6px)" }}
                animate={
                  isInView
                    ? { y: "0%", filter: "blur(0px)" }
                    : { y: "105%", filter: "blur(6px)" }
                }
                transition={{ duration: 1.4, ease: cinematicEase }}
                className="text-4xl sm:text-6xl md:text-7xl font-medium text-[#06233F] leading-snug"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Integrity, <br />
                <span className="text-[#216853] italic font-normal">
                  Woven Into
                </span>{" "}
                Science.
              </motion.h2>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pb-3 flex flex-col gap-4">
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 20, filter: "blur(4px)" }
              }
              transition={{ duration: 1.2, delay: 0.5, ease: cinematicEase }}
              className="text-sm md:text-base leading-relaxed text-[#06233F]/75 font-light pl-4 border-l-2 border-[#216853]"
            >
              Confidence is not declared—it is systematically proven. We partner
              exclusively with globally certified facilities to ensure every
              formulation answers to uncompromising scientific standards.
            </motion.p>
          </div>
        </div>

        {/* --- All 4 Validation Pillars Grid --- */}
        <div className="w-full border-t border-[#06233F]/10 pt-8">
          <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-6">
            Core Validation Pillars (01 — 04)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => {
              const isActive = activePrinciple === index;

              return (
                <motion.div
                  key={principle.id}
                  onClick={() => handleSelect(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.15,
                    ease: cinematicEase,
                  }}
                  className={`cursor-pointer p-7 rounded-xl transition-all duration-300 relative flex flex-col justify-between h-full bg-white border ${
                    isActive
                      ? "border-[#216853] shadow-xl shadow-[#216853]/10 -translate-y-1.5 ring-1 ring-[#216853]/30"
                      : "border-[#06233F]/10 hover:border-[#216853]/40 hover:shadow-md opacity-85 hover:opacity-100"
                  }`}
                >
                  {/* Active Top Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-all duration-300 ${
                      isActive ? "bg-[#216853]" : "bg-transparent"
                    }`}
                  />

                  {/* Header: Tag & ID */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#216853]">
                        {principle.tag}
                      </span>
                      <span
                        className={`text-sm md:text-base font-medium tracking-widest ${
                          isActive ? "text-[#216853]" : "text-[#06233F]/40"
                        }`}
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        [{principle.id}]
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl md:text-2xl font-medium leading-tight mb-4 text-[#06233F]"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {principle.title}
                    </h3>
                  </div>

                  {/* Detail Text */}
                  <div className="mt-4 pt-4 border-t border-[#06233F]/10">
                    <p className="text-sm leading-relaxed text-[#06233F]/75 font-light">
                      {principle.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}