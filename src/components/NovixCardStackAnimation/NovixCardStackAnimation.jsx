import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import img1 from "../../Images/NORA.webp";
import img5 from "../../Images/HEPARIN.webp";
import img6 from "../../Images/ONDA.webp";
import img9 from "../../Images/paracetamol.webp";
import img10 from "../../Images/multivitamin.webp";

const CARDS = [
  {
    id: 1,
    category: "Injectable Antibiotics",
    name: "LBPC",
    composition: "Noradrenaline Bitartrate Injection IP (4mg)",
    desc: "Used in emergency care to quickly stabilise blood pressure. Made under strict sterile conditions so hospitals can trust every vial.",
    image: img1,
  },
  {
    id: 2,
    category: "Critical Care",
    name: "O-CLOT 25000 IU",
    composition: "Heparin 25000 IU",
    desc: "Helps prevent dangerous blood clots in critical care and surgery. Every batch is tested for consistent strength.",
    image: img5,
  },
  {
    id: 3,
    category: "Gastrointestinal",
    name: "NOVISET",
    composition: "Ondansetron Injection (2ml)",
    desc: "Gives fast relief from nausea after surgery or chemotherapy. Gentle, reliable, and easy to administer.",
    image: img6,
  },
  {
    id: 4,
    category: "Pain & Fever",
    name: "NFEVO",
    composition: "Paracetamol Injection (150mg/2ml)",
    desc: "Brings down fever and pain quickly for patients who need fast relief on the ward.",
    image: img9,
  },
  {
    id: 5,
    category: "Supportive Care",
    name: "N-VIT",
    composition: "Multivitamin Injection (10ml)",
    desc: "A complete vitamin support shot to help patients recover strength during treatment.",
    image: img10,
  },
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
      delayChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60, 
    scale: 0.9,
    filter: "blur(10px)"
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

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

export default function NovixCinematicStage() {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full min-h-screen bg-[#F5F5F7] overflow-hidden select-none flex flex-col items-center justify-center py-20"
      style={{
        fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Apple-style Header Lockup */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center z-30 px-6 max-w-4xl mb-12"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] text-[#136149] block mb-3 uppercase">
          Precision Engineering & Intelligence
        </span>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-[1.08]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Touching tomorrow, <span className="text-[#1d1d1f]/30 font-light">today</span>
        </h2>
      </motion.div>

      {/* Bento Box Premium Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch mx-auto"
      >
        {CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            className={`bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] border border-black/[0.04] flex flex-col justify-between transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group relative overflow-hidden ${
              index < 2 ? "md:col-span-3" : "md:col-span-2"
            }`}
          >
            {/* Top Category & Status dot */}
            <div className="flex justify-between items-center mb-5">
              <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#136149]">
                {card.category}
              </span>
            </div>

            {/* Product Image Preview - Dynamic Height based on layout */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`w-full rounded-2xl bg-[#F5F5F7] border border-black/[0.03] flex items-center justify-center p-4 mb-6 transition-colors group-hover:bg-[#EFEFF1] ${
                index < 2 ? "h-48" : "h-36"
              }`}
            >
              <motion.img
                whileHover={{ y: -5, scale: 1.08 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                src={card.image}
                alt={card.name}
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </motion.div>

            {/* Product Information Details */}
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <h3
                  className="text-[#1d1d1f] text-lg font-semibold mb-1 tracking-tight"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {card.name}
                </h3>
                <p className="text-[#136149] text-[11px] font-medium mb-3 leading-snug">
                  {card.composition}
                </p>
                <p className="text-[#86868b] text-[12px] font-normal leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Products Button */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-12 text-center z-30"
      >
        <motion.button
          variants={buttonVariants}
          onClick={() => navigate("/products")}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#136149] text-white text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 hover:bg-[#0d4634] hover:shadow-[0_10px_20px_rgba(19,97,73,0.25)] hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
        >
          <span>View All Products</span>
          <span className="ml-2 text-sm transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
