import React from "react";
import { motion } from "framer-motion";

const CERTIFICATIONS = [
  {
    id: "01",
    title: "WHO-GMP Certified",
    subtitle: "World Health Organization Standard",
    description: "Strict adherence to international guidelines for pharmaceutical manufacturing, ensuring world-class safety, efficacy, and batch purity.",
    code: "REG: WHO-GMP-2026-X9",
    tag: "Global Standard"
  },
  {
    id: "02",
    title: "ISO 9001 : 2015",
    subtitle: "Quality Management System",
    description: "Rigorous quality control protocols enforced across every stage of formulation, aseptic packaging, and supply chain logistics.",
    code: "CERT: QMS-9001-NVX",
    tag: "Quality Assured"
  },
  {
    id: "03",
    title: "CDSCO Approved",
    subtitle: "Apex Regulator Accreditation",
    description: "Fully licensed by India’s central regulatory authority for critical care injectables and high-potency formulations.",
    code: "LIC: MFG-CDSCO-782",
    tag: "National Accredited"
  },
  {
    id: "04",
    title: "Class 100 Cleanrooms",
    subtitle: "ISO 5 Clean Air Facilities",
    description: "State-of-the-art sterile manufacturing environments equipped with automated environmental monitoring and contamination prevention.",
    code: "ENV: ISO-CLASS-5",
    tag: "Sterile Grade"
  }
];

// Premium cinematic easing curve
const premiumEase = [0.16, 1, 0.3, 1];

const headerVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)", scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.2,
      ease: premiumEase,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.95,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: premiumEase,
    },
  },
};

export default function NovixCertificationsSection() {
  return (
    <section
      className="relative w-full bg-[#F5F5F7] py-16 md:py-20 px-6 overflow-hidden flex flex-col items-center justify-center select-none"
      style={{ fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 -left-32 w-96 h-96 bg-[#136149]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-[#136149]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Elegant Section Title */}
      <motion.div 
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-6xl z-20 mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4"
      >
        <div>
          <h2
            className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-2"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Global Certifications
          </h2>
          <p className="text-[#86868b] text-sm md:text-base font-normal max-w-lg">
            Manufacturing excellence validated by apex regulatory authorities worldwide.
          </p>
        </div>
        <div className="hidden md:block">
          <span className="text-[10px] font-semibold tracking-widest text-[#136149] bg-[#136149]/10 px-4 py-1.5 rounded-full uppercase">
            Trust & Quality
          </span>
        </div>
      </motion.div>

      {/* Grid Layout Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 z-20"
      >
        {CERTIFICATIONS.map((cert) => (
          <motion.div
            key={cert.id}
            variants={cardVariants}
            className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-500 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Hover Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#136149] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card Content Top */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-semibold tracking-widest text-[#136149] bg-[#136149]/5 px-3 py-1 rounded-full uppercase">
                  {cert.tag}
                </span>
                <span className="text-2xl sm:text-3xl font-light text-[#1d1d1f]/10 font-mono group-hover:text-[#136149]/20 transition-colors duration-300">
                  {cert.id}
                </span>
              </div>

              <h3
                className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] mb-1 tracking-tight group-hover:text-[#136149] transition-colors duration-300"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {cert.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] font-medium text-[#136149] tracking-wider mb-3 uppercase">
                {cert.subtitle}
              </p>

              <p className="text-[#86868b] text-xs sm:text-sm font-normal leading-relaxed mb-6">
                {cert.description}
              </p>
            </div>

            {/* Card Footer / Status Badge */}
            <div className="pt-4 border-t border-black/[0.04] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#136149] animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-[#86868b] uppercase font-medium">
                  {cert.code}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
