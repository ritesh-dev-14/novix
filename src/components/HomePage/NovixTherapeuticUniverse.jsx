import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Inject required editorial fonts
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

const therapyAreas = [
  {
    id: "01",
    name: "Oncology",
    desc: "Precision-targeted antineoplastic agents designed for cellular specificity.",
    pos: "top-left",
    anchor: { x: -160, y: -120 },
  },
  {
    id: "02",
    name: "Critical Care",
    desc: "Rapid-response acute ICU solutions and hemodynamic stabilization.",
    pos: "top-right",
    anchor: { x: 160, y: -120 },
  },
  {
    id: "03",
    name: "Anti-Infectives",
    desc: "Next-generation antimicrobial formulations targeting resistance.",
    pos: "mid-left",
    anchor: { x: -210, y: 10 },
  },
  {
    id: "04",
    name: "Cardiology",
    desc: "Advanced cardiovascular and vascular metabolic modulators.",
    pos: "mid-right",
    anchor: { x: 210, y: 10 },
  },
  {
    id: "05",
    name: "Anaesthesia",
    desc: "High-purity central nervous system modulators and neuromuscular agents.",
    pos: "bottom-left",
    anchor: { x: -150, y: 150 },
  },
  {
    id: "06",
    name: "Nutraceuticals",
    desc: "Clinical-grade bio-active therapeutic complexes for cellular health.",
    pos: "bottom-right",
    anchor: { x: 150, y: 150 },
  },
];

export default function NovixTherapeuticUniverse() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeLabel, setActiveLabel] = useState(null);

  useEffect(() => {
    injectFonts();
  }, []);

  // Smooth cursor tracking for luxury parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen  text-[#06233F] py-28 px-6 sm:px-10 lg:px-16 overflow-hidden flex flex-col justify-between selection:bg-[#06233F] selection:text-[#F8F6F2]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* --- Ambient Background Image & Volumetric Lighting --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Editorial Background Image */}
        <motion.img
          src="https://plus.unsplash.com/premium_photo-1781159545389-4e620943104e?q=80&w=1566&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Therapeutic Universe Ambient Background"
          className="w-full h-full object-cover opacity-105 filter contrast-[0.98] brightness-[0.96]"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />

      

        {/* Primary Soft Top Light Source */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[140px] opacity-40 transition-opacity duration-1000"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(33,104,83,0.08) 50%, transparent 80%)"
          }}
        />

        {/* Ambient Subtle Shadow Floor */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[180px] rounded-full blur-[90px] bg-[#06233F]/5"
        />

        {/* Floating Ambient Dust Particles (Pure CSS) */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-[#216853] rounded-full animate-pulse blur-[0.5px]" />
          <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-[#06233F] rounded-full animate-pulse delay-700 blur-[0.5px]" />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-[#216853] rounded-full animate-pulse delay-1000 blur-[0.5px]" />
        </div>
      </div>

      {/* --- Section Editorial Header --- */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-6 h-[1px] bg-[#216853]" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#216853]">
            Therapeutic Ecosystem
          </span>
          <span className="w-6 h-[1px] bg-[#216853]" />
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#06233F] leading-[1.08] max-w-4xl"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Science Designed Across <br />
          <span className="text-[#216853] italic font-normal">
            Critical Therapies.
          </span>
        </motion.h2>

        {/* Editorial Subtext (Max 3 lines) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm md:text-base text-[#06233F]/70 font-light leading-relaxed max-w-2xl text-center"
        >
          An interconnected universe of advanced molecular engineering—delivering targeted
          clinical efficacy and uncompromised safety standards across core global therapeutic domains.
        </motion.p>
      </div>

      {/* --- Central Installation Ecosystem Area --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-12 md:my-20 flex items-center justify-center min-h-[560px] lg:min-h-[640px]">
        
        {/* --- Centerpiece: Refractive Abstract Glass Molecule --- */}
        <div 
          className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0px) rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg)`
          }}
        >
          {/* Glass Sphere Refraction Background Layer */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#06233F]/5 via-white/40 to-[#216853]/10 backdrop-blur-md border border-white/60 shadow-2xl shadow-[#06233F]/5 pointer-events-none" />

          {/* Frosted Concentric Glass Orbit Rings */}
          <div className="absolute inset-4 rounded-full border border-[#06233F]/10 animate-[spin_40s_linear_infinite] pointer-events-none" />
          <div className="absolute inset-12 rounded-full border border-dashed border-[#216853]/25 animate-[spin_28s_linear_infinite_reverse] pointer-events-none" />

          {/* Central Glass Node Core */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-white/90 via-[#F8F6F2]/60 to-[#216853]/20 backdrop-blur-xl border border-white/80 shadow-lg flex items-center justify-center">
            {/* Core Refraction Light Dot */}
            <div className={`w-8 h-8 rounded-full transition-all duration-700 ${activeLabel !== null ? "bg-[#216853] scale-125 shadow-lg shadow-[#216853]/40" : "bg-[#06233F]/20"}`} />
          </div>

          {/* Outer Orbital Glass Molecules */}
          {[0, 60, 120, 180, 240, 300].map((deg, index) => {
            const rad = (deg * Math.PI) / 180;
            const distance = 140; // Orbital radius
            const x = Math.cos(rad) * distance;
            const y = Math.sin(rad) * distance;
            const isConnectedToActive = activeLabel === index;

            return (
              <div
                key={index}
                className="absolute w-10 h-10 rounded-full backdrop-blur-lg transition-all duration-500 flex items-center justify-center border"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  backgroundColor: isConnectedToActive ? "#06233F" : "rgba(255, 255, 255, 0.75)",
                  borderColor: isConnectedToActive ? "#216853" : "rgba(6, 35, 63, 0.15)",
                  boxShadow: isConnectedToActive ? "0 10px 25px rgba(33, 104, 83, 0.25)" : "0 4px 12px rgba(0,0,0,0.03)"
                }}
              >
                <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isConnectedToActive ? "bg-[#34D399]" : "bg-[#216853]/50"}`} />
              </div>
            );
          })}

          {/* SVG Connection Vectors from Sculpture to Mouse / Labels */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {[0, 60, 120, 180, 240, 300].map((deg, index) => {
              const rad = (deg * Math.PI) / 180;
              const x = 192 + Math.cos(rad) * 140; // Center offset
              const y = 192 + Math.sin(rad) * 140;
              const isHighlighted = activeLabel === index;

              return (
                <line
                  key={index}
                  x1="192"
                  y1="192"
                  x2={x}
                  y2={y}
                  stroke={isHighlighted ? "#216853" : "#06233F"}
                  strokeWidth={isHighlighted ? "1.5" : "0.75"}
                  strokeOpacity={isHighlighted ? "0.8" : "0.15"}
                  strokeDasharray={isHighlighted ? "none" : "3 3"}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
        </div>

        {/* --- 6 Floating Museum Labels (No Cards, Pure Editorial Layout) --- */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {therapyAreas.map((area, index) => {
            const isHovered = activeLabel === index;

            // Positioning matrix around centerpiece
            const positionClasses = {
              "top-left": "top-4 left-4 text-left",
              "top-right": "top-4 right-4 text-right",
              "mid-left": "top-1/2 -translate-y-1/2 left-0 text-left",
              "mid-right": "top-1/2 -translate-y-1/2 right-0 text-right",
              "bottom-left": "bottom-4 left-4 text-left",
              "bottom-right": "bottom-4 right-4 text-right",
            }[area.pos];

            return (
              <div
                key={area.id}
                onMouseEnter={() => setActiveLabel(index)}
                onMouseLeave={() => setActiveLabel(null)}
                className={`absolute pointer-events-auto cursor-pointer max-w-xs transition-all duration-500 group ${positionClasses}`}
                style={{
                  transform: isHovered ? "scale(1.03)" : "scale(1)",
                }}
              >
                {/* Museum Label Index & Tag */}
                <div className={`flex items-center gap-2 mb-1.5 ${area.pos.includes("right") ? "justify-end" : "justify-start"}`}>
                  <span className={`text-[10px] font-bold tracking-[0.25em] transition-colors duration-300 ${isHovered ? "text-[#216853]" : "text-[#06233F]/40"}`}>
                    [{area.id}]
                  </span>
                  <span className={`h-[1px] w-6 transition-all duration-300 ${isHovered ? "bg-[#216853] w-10" : "bg-[#06233F]/20"}`} />
                </div>

                {/* Therapy Name */}
                <h3
                  className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${
                    isHovered ? "text-[#216853]" : "text-[#06233F]"
                  }`}
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {area.name}
                </h3>

                {/* Subtle Description */}
                <p className={`mt-1.5 text-xs md:text-sm leading-relaxed font-light transition-opacity duration-300 ${
                  isHovered ? "text-[#06233F]/90" : "text-[#06233F]/60"
                }`}>
                  {area.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* --- Mobile Responsive Floating List (Fallback for Small Screens) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:hidden mt-8">
          {therapyAreas.map((area, index) => (
            <div
              key={area.id}
              onClick={() => setActiveLabel(activeLabel === index ? null : index)}
              className="p-4 border-l-2 border-[#216853]/40 bg-white/40 backdrop-blur-sm"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#216853]">
                [{area.id}]
              </span>
              <h3 
                className="text-lg font-medium text-[#06233F] mt-1"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {area.name}
              </h3>
              <p className="text-xs text-[#06233F]/70 mt-1 leading-relaxed">
                {area.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* --- Footer Anchor / Navigation Indicator --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-[#06233F]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#06233F]/60 font-light">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#216853]" />
          <span>Interactive Molecular Installation</span>
        </div>
        <div className="tracking-widest uppercase text-[10px] font-bold text-[#216853]">
          Novix R&D Portfolio • 2026
        </div>
      </div>
    </section>
  );
}