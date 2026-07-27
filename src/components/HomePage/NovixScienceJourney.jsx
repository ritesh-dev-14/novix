import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const validationStages = [
  {
    id: "01",
    title: "Scientific Evaluation",
    desc: "Every formulation begins with technical assessment, therapeutic relevance, and scientific review.",
  },
  {
    id: "02",
    title: "Partner Qualification",
    desc: "Manufacturing partners are selected based on internationally recognized quality certifications and regulatory compliance.",
  },
  {
    id: "03",
    title: "Quality Verification",
    desc: "Documentation, validation, and quality systems are reviewed before product acceptance.",
  },
  {
    id: "04",
    title: "Sterility Assurance",
    desc: "Sterile injectable products undergo controlled manufacturing environments designed for pharmaceutical precision.",
  },
  {
    id: "05",
    title: "Regulatory Documentation",
    desc: "Comprehensive documentation supports traceability, transparency, and regulatory readiness.",
  },
  {
    id: "06",
    title: "Healthcare Delivery",
    desc: "Only after passing each stage does a formulation become part of the Novix portfolio.",
  },
];

export default function NovixScienceJourney() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const particleRef = useRef(null);

  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    injectFonts();
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger pinning and scroll progress tracking
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          setScrollProgress(progress);

          // Animate particle position along the horizontal conduit
          if (particleRef.current) {
            gsap.set(particleRef.current, {
              left: `${progress * 100}%`,
            });
          }

          // Calculate which node is active based on progress (0 to 5)
          const newStage = Math.min(
            validationStages.length - 1,
            Math.floor(progress * validationStages.length)
          );
          setActiveStage(newStage);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[180vh] bg-[#F8F6F2] text-[#06233F] selection:bg-[#06233F] selection:text-[#F8F6F2]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Sticky Fullscreen Viewport Installation */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-12 md:py-16 px-6 sm:px-10 lg:px-16"
      >
        {/* --- Volumetric Ambient Light & Caustics --- */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top Quiet Light Source */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[160px] opacity-35"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(33,104,83,0.06) 55%, transparent 80%)",
            }}
          />

          {/* Micro Dust Particles & Caustics Layer */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/6 w-1 h-1 bg-[#216853] rounded-full animate-pulse blur-[0.5px]" />
            <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-[#06233F] rounded-full animate-pulse delay-1000 blur-[0.5px]" />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#216853] rounded-full animate-pulse delay-500 blur-[0.5px]" />
          </div>

          {/* Soft Shadow Floor */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[800px] h-[120px] rounded-full blur-[100px] bg-[#06233F]/5" />
        </div>

        {/* --- Header Section --- */}
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          {/* Section Overline */}
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[1px] bg-[#216853]" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#216853]">
              THE SCIENCE BEHIND EVERY FORMULATION
            </span>
            <span className="w-5 h-[1px] bg-[#216853]" />
          </div>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-medium text-[#06233F] leading-[1.12]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Every Formulation <br />
            Begins With{" "}
            <span className="text-[#216853] italic font-normal">
              Scientific Precision.
            </span>
          </h2>

          {/* Supporting Paragraph (Max 3 lines) */}
          <p className="mt-4 text-xs sm:text-sm md:text-base text-[#06233F]/70 font-light leading-relaxed max-w-2xl text-center">
            Every formulation within the Novix portfolio is evaluated through
            a structured scientific approach, supported by globally certified
            manufacturing partners and rigorous quality systems before reaching
            healthcare professionals.
          </p>
        </div>

        {/* --- Centerpiece: Illuminated Glass Conduit Channel --- */}
        <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-8">
          {/* Conduit Outer Container */}
          <div className="relative w-full flex items-center justify-between">
            {/* The Horizontal Suspended Glass Tube Channel */}
            <div
              ref={trackRef}
              className="absolute left-0 right-0 h-3.5 md:h-4 rounded-full bg-gradient-to-r from-white/40 via-white/80 to-white/40 backdrop-blur-md border border-white/90 shadow-[inset_0_2px_6px_rgba(6,35,63,0.06),0_8px_20px_rgba(0,0,0,0.02)] overflow-hidden"
            >
              {/* Internal Refraction Light Line */}
              <div
                className="h-full bg-gradient-to-r from-transparent via-[#216853]/40 to-[#216853] transition-all duration-300"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* Traveling Illuminated Particle */}
            <div
              ref={particleRef}
              className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 rounded-full pointer-events-none z-30 flex items-center justify-center"
              style={{ left: "0%" }}
            >
              {/* Core Light Orb */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#216853] shadow-[0_0_12px_#216853,0_0_24px_#216853]" />
              {/* Outer Refractive Aura */}
              <div className="absolute inset-0 rounded-full border border-[#216853]/50 animate-ping opacity-30" />
            </div>

            {/* --- 6 Floating Glass Nodes --- */}
            {validationStages.map((stage, index) => {
              const isPassed = index <= activeStage;
              const isActive = index === activeStage;

              return (
                <div
                  key={stage.id}
                  className="relative z-20 flex flex-col items-center group cursor-pointer"
                  style={{
                    left: `${(index / (validationStages.length - 1)) * 0}%`, // Flex grid takes care of spacing
                  }}
                >
                  {/* Node Orb Sculpture */}
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-xl transition-all duration-700 flex items-center justify-center border ${
                      isActive
                        ? "bg-white border-[#216853] shadow-[0_0_25px_rgba(33,104,83,0.35)] scale-110"
                        : isPassed
                        ? "bg-white/80 border-[#216853]/40 shadow-sm"
                        : "bg-white/30 border-white/60 shadow-none"
                    }`}
                  >
                    {/* Node Core Indicator */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-700 ${
                        isActive
                          ? "bg-[#216853] shadow-[0_0_10px_#216853]"
                          : isPassed
                          ? "bg-[#216853]/60"
                          : "bg-[#06233F]/15"
                      }`}
                    />
                  </div>

                  {/* Stage Number Tag Below Node */}
                  <span
                    className={`mt-3 text-[10px] md:text-xs font-bold tracking-widest transition-colors duration-500 ${
                      isActive
                        ? "text-[#216853]"
                        : isPassed
                        ? "text-[#06233F]"
                        : "text-[#06233F]/30"
                    }`}
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    [{stage.id}]
                  </span>
                </div>
              );
            })}
          </div>

          {/* --- Alternating Editorial Stage Titles along the conduit --- */}
          <div className="grid grid-cols-6 gap-2 w-full mt-4 text-center">
            {validationStages.map((stage, index) => {
              const isActive = index === activeStage;
              const isPassed = index <= activeStage;

              return (
                <div
                  key={stage.id}
                  className="flex flex-col items-center px-1"
                >
                  <h3
                    className={`text-xs md:text-sm font-medium transition-colors duration-500 line-clamp-2 ${
                      isActive
                        ? "text-[#216853]"
                        : isPassed
                        ? "text-[#06233F]"
                        : "text-[#06233F]/35"
                    }`}
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {stage.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Active Stage Narrative Display (Quiet Crossfade Area) --- */}
        <div className="relative z-10 max-w-2xl mx-auto w-full min-h-[90px] flex items-center justify-center text-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#216853]">
                  STAGE {validationStages[activeStage].id} OF 06
                </span>
                <span className="w-4 h-[1px] bg-[#216853]/40" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#06233F]/60 uppercase">
                  {validationStages[activeStage].title}
                </span>
              </div>

              <p className="text-sm md:text-base text-[#06233F] font-light leading-relaxed">
                {validationStages[activeStage].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Footer Anchor / Interactive Indicator --- */}
        <div className="relative z-10 max-w-6xl mx-auto w-full border-t border-[#06233F]/10 pt-4 flex items-center justify-between text-[11px] text-[#06233F]/50 font-light">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#216853]" />
            <span>Continuous Scientific Validation Loop</span>
          </div>

          <div className="tracking-widest uppercase text-[10px] font-semibold text-[#216853]">
            Scroll to progress journey
          </div>
        </div>
      </div>
    </section>
  );
}