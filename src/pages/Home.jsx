import React, { useEffect, useRef, useState } from "react";
import VideoBackground from "../components/VideoBackground/VideoBackground";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Award,
  Beaker,
  Globe,
  ShieldCheck,
  MapPin,
  Plus,
  Sparkles,
  Navigation,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Injection of Google Fonts for Editorial Sophistication
const injectFonts = () => {
  if (
    typeof window !== "undefined" &&
    !document.getElementById("editorial-fonts")
  ) {
    const link = document.createElement("link");
    link.id = "editorial-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@200;300;400;500&display=swap";
    document.head.appendChild(link);
  }
};

// ─────────────────────────────────────────────────────────
// HANDCRAFTED PREMIUM COMPONENTS
// ─────────────────────────────────────────────────────────

// Ultra-subtle, premium floating panel (5-12% opacity glass)
const FloatingPanel = ({ children, className = "", style = {} }) => (
  <div
    style={style}
    className={`backdrop-blur-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.4)] ${className}`}
  >
    {children}
  </div>
);

// High-Contrast Text Shield: Dark elegant gradient to guarantee 100% readability over any background
const TextShield = ({ children, className = "", type = "radial" }) => {
  const backgroundStyle = type === "linear" ? "" : "";

  return (
    <div
      className={`relative p-8 md:p-12 rounded-[2.5rem] ${backgroundStyle} ${className}`}
    >
      {children}
    </div>
  );
};

// Magnetic Luxury Button with physical feedback
const LuxuryButton = ({ children, onClick }) => {
  const buttonRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
        transition: isHovered
          ? "none"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
      className="relative group px-10 py-5 rounded-full overflow-hidden border border-white/20 bg-white/[0.03] backdrop-blur-md text-white tracking-[0.25em] text-xs uppercase transition-colors duration-500 hover:border-white/80"
    >
      <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-x-100" />
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-black">
        {children}{" "}
        <ArrowUpRight
          size={14}
          className="transition-transform duration-500 group-hover:rotate-45"
        />
      </span>
    </button>
  );
};

// ─────────────────────────────────────────────────────────
// REDESIGNED HOMEPAGE COMPONENT
// ─────────────────────────────────────────────────────────

export default function PremiumPharmaHomepage() {
  const nav = useNavigate()
  const [activeCert, setActiveCert] = useState(0);
  const containerRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    injectFonts();

    // 1. HERO ANIMATION: Dramatic Letter Assembly and Parallax
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    heroTl
      .fromTo(
        ".hero-title-line",
        { y: 120, opacity: 0, rotate: 2 },
        { y: 0, opacity: 1, rotate: 0, duration: 1.8, stagger: 0.2 },
      )
    

    // 2. PINNED HORIZONTAL PRODUCT SHOWCASE
    const horizontalTrack = horizontalTrackRef.current;
    if (horizontalTrack) {
      const scrollLength = horizontalTrack.scrollWidth - window.innerWidth;
      gsap.to(horizontalTrack, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          scrub: 1.2,
          end: () => `+=${scrollLength}`,
          invalidateOnRefresh: true,
        },
      });
    }





    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full bg-transparent overflow-x-hidden selection:bg-white selection:text-black"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <VideoBackground/>
      <section className="relative min-h-screen w-full flex flex-col justify-center px-8 md:px-24 pt-32 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
          {/* Main Heading Section */}
          <div className="lg:col-span-8">
            <TextShield type="linear" className="!p-0">
              <span className="block text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">
                Premium Healthcare Standards
              </span>
              <h1
  className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight"
  style={{ fontFamily: "'Cinzel', serif" }}
>
  <span className="hero-title-line block overflow-hidden">
    Science That
  </span>

  <span className="hero-title-line block overflow-hidden text-white/80 italic">
    Protects Lives.
  </span>

  <span className="hero-title-line block overflow-hidden">
    Quality You Can Trust.
  </span>
</h1>
            </TextShield>
          </div>

          {/* Stats Section */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-10 border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-12">
            <div className="flex-1">
              <span className="block text-xs tracking-widest uppercase text-white/50 mb-2">
                Purity Rate
              </span>
              <p
                className="text-4xl md:text-5xl font-light text-white mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                99.9%
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                Strictly lab-tested to ensure maximum safety and effectiveness.
              </p>
            </div>

            <div className="flex-1">
              <span className="block text-xs tracking-widest uppercase text-white/50 mb-2">
                Trusted By
              </span>
              <p
                className="text-4xl md:text-5xl font-light text-white mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                620+
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                Hospitals, clinics, and medical facilities worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Float Specimen Aesthetic Graphic */}
        {/* <div className="hero-specimen absolute right-0 bottom-0 w-[50vw] h-[50vw] opacity-40 pointer-events-none mix-blend-screen select-none">
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505] z-10" />
          <img
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop"
            alt="Pharmaceutical Compound Structure"
            className="w-full h-full object-cover filter grayscale sepia brightness-90 animate-[spin_120s_linear_infinite]"
          />
        </div> */}
      </section>

      {/* ─────────────────────────────────────────────────────
          SECTION 2: INFINITE TRUST RIBBON (The Luxury Ticker)
          ───────────────────────────────────────────────────── */}
      <section className="relative py-10 border-y border-white/[0.06] bg-black/40 z-20 backdrop-blur-sm overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="flex gap-16 text-[10px] tracking-[0.4em] uppercase text-white/40 font-light"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span>CRITICAL CARE INJECTABLES</span> •{" "}
              <span>ANTIBIOTIC THERAPEUTICS</span> •{" "}
              <span>ADVANCED FORMULATIONS</span> •{" "}
              <span>STERILE SYNTHESIZERS</span> •{" "}
              <span>BIO-AVAILABLE DELIVERY</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          SECTION 3: EDITORIAL ABOUT (Pure Typography and Scale)
          ───────────────────────────────────────────────────── */}
      <section
        id="about"
        className="relative py-24 md:py-32 px-6 md:px-16 z-20 bg-black/30"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <span className="block text-xs font-bold tracking-widest uppercase text-white/40 mb-6">
              Our Vision
            </span>
            <h2
              className="text-3xl md:text-5xl font-light text-white leading-snug"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Where advanced science meets human biology.
            </h2>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <TextShield type="radial" className="!p-0">
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
                We develop medical treatments with the precision of fine art. We
                believe that since the human body is a masterpiece of design,
                the molecules used to heal it must be crafted with the same
                level of care and structural beauty.
              </p>

              <div className="h-px w-16 bg-white/20 my-6"></div>

              <p className="text-base text-white/60 font-light leading-relaxed">
                Every product is refined and verified using advanced technology.
                By optimizing how our treatments are absorbed at a microscopic
                level, we ensure the most effective and reliable results for
                your health.
              </p>
            </TextShield>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          SECTION 4: PINNED HORIZONTAL PRODUCT EXPERIENCE (Apple-Style)
          ───────────────────────────────────────────────────── */}
      <section
        id="pipeline"
        ref={horizontalSectionRef}
        className="relative  h-screen bg-black/30 backdrop-blur-md z-20"
      >
        <div className="absolute top-25 left-8 md:left-24 z-30">
          <span className="block text-[11px] font-medium tracking-[0.3em] uppercase text-white/50">
            Our Products
          </span>
          <h2
            className="text-3xl font-light text-white mt-2"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Injectable Solutions
          </h2>
        </div>

        <div
          ref={horizontalTrackRef}
          className="absolute top-19 left-0 h-full flex items-center pl-8 md:pl-24 pr-[30vw] gap-16 md:gap-32"
        >
          {/* Card 1 */}
          <div className="w-[85vw] md:w-[70vw] lg:w-[60vw] h-[75vh] flex-shrink-0 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4">
                Category: Antibiotics
              </span>
              <h3
                className="text-5xl md:text-7xl font-light text-white mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Injectable Antibiotics
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
                A wide range of high-quality injectable antibiotics designed for
                effective infection control and rapid patient recovery in
                hospital settings.
              </p>
              <div className="flex gap-8 text-[11px] tracking-wider text-white/40 uppercase border-t border-white/10 pt-6">
                <div>
                  <span className="block text-white">STERILE</span> FORMULA
                </div>
                <div>
                  <span className="block text-white">CLINICAL</span> GRADE
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full rounded-[2.5rem] overflow-hidden border border-white/10 relative group">
              <img
                src="https://imgs.search.brave.com/eKRHBsPlb2TqOH5aeD3QJS0U8mTO9Tx6PT_usbgB4as/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/OTM0NTc0MS9waG90/by92YWNjaW5lLWlu/LWxhYm9yYXRvcnkt/Zmx1LXNob3QtYW5k/LWNvdmlkLTE5LXZh/Y2NpbmF0aW9uLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz14/c3ltTzlzR0kwc2oy/ZGUxeUNzd3pBd0pL/N3RfTFRHN3lmdVNP/ZlBubW13PQ"
                alt="Injectable Antibiotics"
                className="w-full h-full object-cover filter brightness-70 scale-100 group-hover:scale-105 transition-transform duration-[2s] cubic-bezier(0.16, 1, 0.3, 1)"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-[85vw] md:w-[70vw] lg:w-[60vw] h-[75vh] flex-shrink-0 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4">
                Category: Pain Management
              </span>
              <h3
                className="text-5xl md:text-7xl font-light text-white mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Pain Relief
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
                Safe and reliable injectable treatments developed to provide
                fast-acting relief for patients managing acute pain and
                inflammation.
              </p>
              <div className="flex gap-8 text-[11px] tracking-wider text-white/40 uppercase border-t border-white/10 pt-6">
                <div>
                  <span className="block text-white">FAST</span> ACTION
                  HALF-LIFE
                </div>
                <div>
                  <span className="block text-white">PROVEN</span> SAFETY
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full rounded-[2.5rem] overflow-hidden border border-white/10 relative group">
              <img
                src="https://imgs.search.brave.com/2OX578HLbpYdXZjQXE09EKpR7ZuJjeFk62E1GcIdy2U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ub3Z1/c3NwaW5lY2VudGVy/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMi8xMS9Ucmln/Z2VyLXBvaW50LWlu/amVjdGlvbi1pbGx1/c3RyYXRpb25fMTIw/MHg5MDAuanBn"
                alt="Pain Relief Treatment"
                className="w-full h-full object-cover filter brightness-70 scale-100 group-hover:scale-105 transition-transform duration-[2s] cubic-bezier(0.16, 1, 0.3, 1)"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-[85vw] md:w-[70vw] lg:w-[60vw] h-[75vh] flex-shrink-0 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4">
                Category: Essential Care
              </span>
              <h3
                className="text-5xl md:text-7xl font-light text-white mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Critical Care
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
                Essential injectable solutions for emergency care and
                stabilizing vital patient functions, trusted by healthcare
                professionals daily.
              </p>
              <div className="flex gap-8 text-[11px] tracking-wider text-white/40 uppercase border-t border-white/10 pt-6">
                <div>
                  <span className="block text-white">TRUSTED</span> PURITY
                </div>
                <div>
                  <span className="block text-white">STABLE</span> RESULTS
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full rounded-[2.5rem] overflow-hidden border border-white/10 relative group">
              <img
                src="https://imgs.search.brave.com/nqXgM05fDmGUW36JPGm-LkbTxa2VcxdkzQ9nHdkG4gg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bW9uYXJrY3JpdGlj/YXJlLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8wOC9x/dWFsaXR5LWNvbnRy/b2wtcGhhcm1hY2V1/dGljYWwtcHJvZHVj/dGlvbi1tZWRpY2Fs/LXZpYWxzLXByb2R1/Y3Rpb24tbGluZS1z/dGVyaWxlLXBoYXJt/YWNldXRpY2FsXzQ5/MDQ3LTE2NjEuanBn"
                alt="Critical Care Injections"
                className="w-full h-full object-cover filter brightness-70 scale-100 group-hover:scale-105 transition-transform duration-[2s] cubic-bezier(0.16, 1, 0.3, 1)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          SECTION 5: MANUFACTURING TIMELINE (Asymmetric SVG Flow)
          ───────────────────────────────────────────────────── */}
      <section
        id="timeline"
        ref={timelineRef}
        className="relative py-24 md:py-32 px-8 md:px-24 z-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-24">
            <span className="block text-[11px] font-bold tracking-[0.3em] uppercase text-white/40 mb-3">
              Our Process
            </span>
            <h2
              className="text-4xl md:text-6xl font-light text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Manufacturing Excellence
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            {/* Left side: Timeline Steps */}
            <div className="md:col-span-5 sticky top-32 flex flex-col gap-8">
              {[
                {
                  stage: "Stage 01",
                  title: "Raw Material Sourcing",
                  desc: "Selection of high-purity pharmaceutical grade inputs under strict quality control protocols.",
                },
                {
                  stage: "Stage 02",
                  title: "Sterile Formulation",
                  desc: "Precision compounding of injectables within climate-controlled, aseptic manufacturing zones.",
                },
                {
                  stage: "Stage 03",
                  title: "Final Certification",
                  desc: "Rigorous laboratory testing to ensure every batch meets global clinical safety standards.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500"
                >
                  <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
                    {item.stage}
                  </span>
                  <h3
                    className="text-xl font-light text-white mt-2 mb-3"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right side: Image Container */}
            <div className="md:col-span-7 h-[600px] relative rounded-3xl overflow-hidden border border-white/5">
              <img
                src="https://plus.unsplash.com/premium_photo-1661962958582-e30be4c3a2aa?w=900&auto=format&fit=crop&q=60"
                alt="Pharmaceutical Manufacturing Facility"
                className="w-full h-full object-cover opacity-0  transition-opacity duration-700"
              />
              {/* Subtle Gradient Overlay for premium feel */}

            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          SECTION 6: INTERACTIVE CERTIFICATIONS (Physical Seals)
          ───────────────────────────────────────────────────── */}
      <section
        id="certifications"
        className="relative py-32 px-8 md:px-24 z-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <span className="block text-[11px] font-bold tracking-[0.3em] uppercase text-white/40 mb-3">
              Regulatory Standards
            </span>
            <h2
              className="text-4xl md:text-5xl font-light text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Global Accreditation
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Interactive Certification Cards */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {[
                {
                  name: "ISO 9001:2015",
                  code: "QUALITY MANAGEMENT",
                  desc: "International standard confirming our ability to consistently provide high-quality medical products.",
                },
                {
                  name: "WHO-GMP Certified",
                  code: "GOOD MANUFACTURING",
                  desc: "Ensures all injectable products are produced and controlled according to global quality standards.",
                },
                {
                  name: "CE Marking Approved",
                  code: "EUROPEAN COMPLIANCE",
                  desc: "Certification confirming our products meet rigorous health, safety, and environmental protection requirements.",
                },
              ].map((cert, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveCert(idx)}
                  className={`group p-8 rounded-3xl border cursor-pointer transition-all duration-500 ${
                    activeCert === idx
                      ? "bg-white/[0.04] border-white/20"
                      : "bg-white/[0.01] border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] tracking-[0.3em] font-bold text-white/30 uppercase">
                      {cert.code}
                    </span>
                    <div
                      className={`transition-transform duration-500 ${activeCert === idx ? "rotate-45" : ""}`}
                    >
                      <Plus size={16} className="text-white/50" />
                    </div>
                  </div>
                  <h4
                    className="text-2xl font-light text-white mt-4"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {cert.name}
                  </h4>
                </div>
              ))}
            </div>

            {/* Right side Detail Display */}
            <div className="lg:col-span-6 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCert}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-md"
                >
                  <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-center backdrop-blur-xl">
                    <div className="w-20 h-20 rounded-full border border-white/10 mx-auto flex items-center justify-center mb-8 bg-white/[0.02]">
                      <Award
                        size={28}
                        className="text-white/80"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3
                      className="text-2xl font-light text-white mb-4"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {
                        [
                          "ISO 9001:2015",
                          "WHO-GMP Certified",
                          "CE Marking Approved",
                        ][activeCert]
                      }
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
                      {
                        [
                          "International standard confirming our ability to consistently provide high-quality medical products.",
                          "Ensures all injectable products are produced and controlled according to global quality standards.",
                          "Certification confirming our products meet rigorous health, safety, and environmental protection requirements.",
                        ][activeCert]
                      }
                    </p>
                    <div className="inline-block px-4 py-2 rounded-full border border-white/10 text-[10px] tracking-widest uppercase text-white/50">
                      Valid for 2026
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          SECTION 7: PREMIUM PRODUCT SPOTLIGHT (Light Sweep & Detail)
          ───────────────────────────────────────────────────── */}
      <section id="spotlight" className="relative py-32 px-8 md:px-24 z-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 backdrop-blur-sm">
            {/* Content Side */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-4">
                Featured Solution
              </span>
              <h2
                className="text-5xl md:text-6xl font-light text-white mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Aura Injectable
              </h2>
              <p className="text-sm text-white/60 leading-relaxed font-light mb-8 max-w-md">
                A high-purity regenerative solution engineered for precision and
                rapid results. Aura represents the highest standard in
                injectable care.
              </p>

              <div className="space-y-4">
                {[
                  "Rapid Bioavailability",
                  "Clinical Grade Formulation",
                  "Batch-Certified Quality",
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-xs tracking-widest text-white/50 uppercase"
                  >
                    <div className="w-1 h-1 rounded-full bg-white/30" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Side */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-sm h-[400px] rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="https://imgs.search.brave.com/sqlx0hvqA6hIGTco_fST1QUgbSlVg1Ifn09XFD8xW6o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE5/NTM1NTI3My9waG90/by9tYWxlLWRvY3Rv/ci1ob2xkaW5nLWEt/Ym90dGxlLW9mLW1l/ZGljaW5lLWZvci12/YWNjaW5hdGlvbi1m/b3ItaW5qZWN0aW9u/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1YbEtPLXBndHpE/b1NETlhYUzRhNURw/TXNsMzdHVmhxLWdW/MkNzYkRqNjRjPQ"
                  alt="Aura Injectable Formulation"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ─────────────────────────────────────────────────────
          SECTION 8: DISTRIBUTION MAP
          ───────────────────────────────────────────────────── */}
  <section className="relative py-32 px-8 md:px-24 bg-black/30 z-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
    
    {/* Content Side */}
    <div className="lg:col-span-5">
      <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-4">
        Nationwide Distribution
      </span>
      <h2
        className="text-4xl md:text-5xl font-light text-white mb-6"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        Secure Cold-Chain Logic
      </h2>
      <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
        We ensure the integrity of every injectable shipment through specialized temperature-controlled logistics across India. Our systems monitor stability from our facility to the hospital door.
      </p>
      
      <div className="flex gap-8 text-[11px] tracking-wider text-white/40 uppercase">
        <div>
          <span className="block text-2xl font-light text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            PAN-INDIA
          </span>
          COVERAGE
        </div>
        <div>
          <span className="block text-2xl font-light text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            100%
          </span>
          SAFETY RATING
        </div>
      </div>
    </div>

    {/* Visual Side: India Map Image */}
    <div className="lg:col-span-7 flex justify-center">
      <div className="w-full h-96 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center p-8 bg-white/[0.02] border border-white/5">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* India Map Image */}
        <img 
          src="https://imgs.search.brave.com/erosFY_2M0c91izR4EkNyIXyNbo-DjTw03ZBzVcjew4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM0/MTU5NTE1NS92ZWN0/b3IvYWJzdHJhY3Qt/ZG90dGVkLWhhbGZ0/b25lLXdpdGgtc3Rh/ci1lZmZlY3QtaW4t/ZGFyay1iYWNrZ3Jv/dW5kLXdpdGgtbWFw/LW9mLWluZGlhLWRp/Z2l0YWwuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVZHSGpo/LUZ1UmRUVU9HN3Uw/TG45YWRKam9XcWJF/Qy1DR3hIakNBdWFy/SW89" 
          alt="Map of India"
          className="relative z-10 h-64 w-auto object-contain "
        />

        <div className="absolute bottom-10 z-20">
          <span className="text-[10px] tracking-[0.4em] text-white/60 uppercase">
            National Cold-Chain Monitoring
          </span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ─────────────────────────────────────────────────────
          SECTION 9: HOSPITAL PARTNERS (Minimalist Grid)
          ───────────────────────────────────────────────────── */}
    <section className="relative py-48 px-8 md:px-24 flex flex-col items-center justify-center text-center z-20 border-t border-white/10">
  <div className="max-w-4xl w-full flex flex-col items-center p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm">
    
    <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 mb-6">
      Get Started
    </span>
    
    <h2
      className="text-5xl md:text-7xl font-light text-white mb-12 leading-tight"
      style={{ fontFamily: "'Cinzel', serif" }}
    >
      Ready to start
      <br />

    </h2>
    
    <button 
      onClick={() => nav("/about")}
      className="px-10 py-4 border border-white/20 text-white text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 rounded-full font-bold"
    >
      Contact Us Now
    </button>
    
  </div>
</section>

      {/* ─────────────────────────────────────────────────────
          SECTION 10: CINEMATIC CALL TO ACTION
          ───────────────────────────────────────────────────── */}
      {/* <section className="relative py-48 px-8 md:px-24 flex flex-col items-center justify-center text-center z-20 border-t border-white/10">
  <div className="max-w-4xl w-full flex flex-col items-center p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm">
    
    <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 mb-6">
      Initiate Partnership
    </span>
    
    <h2
      className="text-5xl md:text-7xl font-light text-white mb-12 leading-tight"
      style={{ fontFamily: "'Cinzel', serif" }}
    >
      Ready to secure
      <br />
      the pipeline?
    </h2>
    
    <button 
      onClick={() => alert("Onboarding initiated")}
      className="px-10 py-4 border border-white/20 text-white text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 rounded-full font-bold"
    >
      Commence Onboarding
    </button>
    
  </div>
</section> */}

      {/* ─────────────────────────────────────────────────────
          GLOBAL FOOTER
          ───────────────────────────────────────────────────── */}
     
    </main>
  );
}
