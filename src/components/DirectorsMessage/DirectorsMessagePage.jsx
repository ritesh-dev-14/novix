import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Quote,
  Target,
  ShieldCheck,
  HeartHandshake,
  Mail,
  Sparkles,
  ArrowRight,
  Award,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const FONT_ID = "novix-font-import";

const DIRECTORS = [
  {
    name: "Pankaj",
    role: "CEO",
    image: "https://res.cloudinary.com/x5rakscg/image/upload/v1785762896/WhatsApp_Image_2026-08-03_at_6.40.56_PM_wcdata.jpg",
    tagline: "Uncompromising Quality & Manufacturing Standards",
    quote:
      "Welcome to Novix Healthcare. Every vial and ampoule produced in our WHO-GMP-certified facility reflects our unwavering dedication to precision, safety, and purity. We don't just manufacture medicine; we manufacture peace of mind for doctors and safety for patients.",
  },
  {
    name: "Harsh Arora",
    role: "Chief Growth & Strategy Officer",
    image: "https://res.cloudinary.com/x5rakscg/image/upload/v1785762896/WhatsApp_Image_2026-08-03_at_6.43.28_PM_tqqfa6.jpg",
    tagline: "Scalable Operations & Institutional Distribution",
    quote:
      "Our focus is on driving operational efficiency and expanding our distribution network so that critical formulations reach hospitals without delay. Reliability is our primary product, and we ensure seamless access across healthcare systems nationwide.",
  },
  {
    name: "Nishchay Sharma",
    role: "Chief Marketing Officer (CMO)",
    image: "https://res.cloudinary.com/x5rakscg/image/upload/v1785762896/WhatsApp_Image_2026-08-03_at_6.34.32_PM_wlrcki.jpg",
    tagline: "Market Innovation & Modern Clinical Solutions",
    quote:
      "Innovating our product portfolio while strict quality controls are maintained is key. We strive to introduce formulations that meet modern clinical challenges, establishing meaningful partnerships across the global pharmaceutical landscape.",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Uncompromised Quality",
    description:
      "Every product leaving our facility undergoes rigorous multi-tier quality checks and WHO-GMP standards compliance.",
  },
  {
    icon: Target,
    title: "Patient-Centric Innovation",
    description:
      "Our focus remains laser-targeted on creating effective, highly reliable injectable formulations that save lives.",
  },
  {
    icon: HeartHandshake,
    title: "Ethical Leadership",
    description:
      "Transparency, integrity, and trust form the core foundation of how we build partnerships across the healthcare ecosystem.",
  },
];

function useFonts() {
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById(FONT_ID)) {
      const link = document.createElement("link");
      link.id = FONT_ID;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);
}

/* 3D Magnetic Card Motion Element */
function TiltContainer({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-300 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Reveal({ children, delay = 0, y = 30, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function DirectorsMessagePage() {
  useFonts();

  const containerRef = useRef();
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  const handleGlobalMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen w-full pt-28 text-[#06233F]/80 bg-[#F8FAFC] overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Interactive Ambient Cursor Glow */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] bg-radial from-[#216853]/10 via-transparent to-transparent rounded-full blur-3xl z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${cursorPos.x - 300}px, ${cursorPos.y - 300}px)`,
        }}
      />

      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v100M30 0v100M50 0v100M70 0v100M90 0v100M0 10h100M0 30h100M0 50h100M0 70h100M0 90h100' stroke='%2306233F' stroke-width='1' fill='none'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%2306233F'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ================= HERO HEADER ================= */}
      <header className="relative z-10 pt-10 md:pt-16 pb-16 text-center border-b border-[#06233F]/10">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#216853] animate-ping" />
              Leadership & Vision
            </p>
            <h1
              className="font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-[#06233F] mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Message from the{" "}
              <span className="italic font-normal text-[#216853]">Board of Directors</span>
            </h1>
            <p className="text-base md:text-lg text-[#06233F]/70 font-light leading-relaxed max-w-2xl mx-auto">
              Guided by a commitment to healthcare excellence, our leadership team
              strives to deliver high-quality pharmaceutical formulations that empower hospitals and save lives nationwide.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ================= FULL-WIDTH DIRECTORS SPOTLIGHT ================= */}
      <section className="relative z-10 py-12">
        <div className="space-y-16 max-w-7xl mx-auto px-6 md:px-10">
          {DIRECTORS.map((director, index) => {
            const isEven = index % 2 === 0;
            return (
              <Reveal key={director.name} delay={index * 0.1}>
                <div className="relative rounded-[32px] border border-[#06233F]/10 bg-white/80 backdrop-blur-md p-8 md:p-14 shadow-xl shadow-[#06233F]/5 overflow-hidden hover:border-[#216853]/30 transition-all duration-500">
                  {/* Subtle Background Role Accent */}
                  <span
                    className="absolute -bottom-6 right-6 text-7xl md:text-9xl font-bold text-[#06233F]/[0.02] select-none pointer-events-none"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    0{index + 1}
                  </span>

                  <div
                    className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                      isEven ? "" : "lg:direction-rtl"
                    }`}
                  >
                    {/* Image Block */}
                    <div className="lg:col-span-5">
                      <TiltContainer>
                        <div className="relative rounded-[24px] overflow-hidden border border-[#216853]/20 bg-[#F8FAFC] shadow-inner group">
                          <img
                            src={director.image}
                            alt={director.name}
                            className="w-full h-[380px] md:h-[420px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://via.placeholder.com/500x600?text=${encodeURIComponent(
                                director.name
                              )}`;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#06233F]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                              <Sparkles size={14} className="text-[#216853]" />
                              Novix Executive Leadership
                            </span>
                          </div>
                        </div>
                      </TiltContainer>
                    </div>

                    {/* Content Block */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F8F6] border border-[#216853]/20 mb-4">
                          <Award size={14} className="text-[#216853]" />
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#216853]">
                            {director.role}
                          </span>
                        </div>
                        <h2
                          className="text-3xl md:text-5xl font-light text-[#06233F] tracking-tight mb-2"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {director.name}
                        </h2>
                        <p className="text-sm font-medium text-[#216853] italic">
                          {director.tagline}
                        </p>
                      </div>

                      <div className="relative pt-4 border-t border-[#06233F]/10">
                        <Quote className="w-10 h-10 text-[#216853]/20 mb-3 -scale-x-100" />
                        <p className="text-base md:text-lg text-[#06233F]/80 font-light leading-relaxed italic">
                          "{director.quote}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================= GUIDING PRINCIPLES ================= */}
      <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-3">
              Core Beliefs
            </p>
            <h2
              className="text-3xl sm:text-4xl font-light text-[#06233F] tracking-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Our Guiding <span className="italic font-normal text-[#216853]">Pillars</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-8">
          {VALUES.map((val, i) => {
            const Icon = val.icon;
            return (
              <Reveal key={val.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full rounded-[24px] border border-[#06233F]/10 bg-white/80 backdrop-blur-md p-8 shadow-sm hover:shadow-xl hover:border-[#216853]/40 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center mb-6 group-hover:bg-[#216853] transition-colors duration-300">
                    <Icon size={26} className="text-[#216853] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3
                    className="text-xl font-light text-[#06233F] mb-3 group-hover:text-[#216853] transition-colors duration-300"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="relative z-10 bg-[#06233F] text-white py-24 text-center mb-0 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#216853]/30 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-4">
              Partner With Us
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6 !text-white leading-tight max-w-2xl mx-auto"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Connect directly with our{" "}
              <span className="italic font-normal text-[#216853]">leadership team</span>
            </h2>
            <p className="text-base text-slate-300 font-light max-w-xl mx-auto leading-relaxed mb-10">
              Interested in institutional supply, distribution partnerships, or manufacturing collaborations? We'd love to hear from you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#216853]/30"
              >
                <Mail size={16} className="!text-white" />
                <span className="!text-white">Get in Touch</span>
                <ArrowRight size={14} className="!text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
