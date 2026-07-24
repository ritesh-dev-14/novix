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
  ChevronRight, Activity, ThermometerSnowflake,
  BadgeCheck,
  FlaskConical,
  Truck,
  ClipboardCheck,
  CheckCircle2,
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

const certifications = [
  {
    title: "WHO-GMP Certified",
    short: "WHO-GMP",
    category: "Manufacturing",
    year: "2026",
    region: "Global",
    description:
      "Manufacturing facility complies with World Health Organization Good Manufacturing Practices for sterile injectable medicines.",
    icon: Award,
  },
  {
    title: "ISO 9001:2015",
    short: "ISO",
    category: "Quality",
    year: "2026",
    region: "International",
    description:
      "Certified quality management system ensuring consistent manufacturing and operational excellence.",
    icon: ShieldCheck,
  },
  {
    title: "CE Compliance",
    short: "CE",
    category: "European",
    year: "2026",
    region: "Europe",
    description:
      "Products meet applicable European health, safety and environmental requirements.",
    icon: BadgeCheck,
  },
  {
    title: "GLP Standards",
    short: "GLP",
    category: "Laboratory",
    year: "2026",
    region: "International",
    description:
      "Laboratory processes follow Good Laboratory Practice for reliable testing and documentation.",
    icon: FlaskConical,
  },
  {
    title: "GDP Compliance",
    short: "GDP",
    category: "Distribution",
    year: "2026",
    region: "Global",
    description:
      "Distribution system follows Good Distribution Practices for pharmaceutical products.",
    icon: Truck,
  },
  {
    title: "Quality Assurance",
    short: "QA",
    category: "Inspection",
    year: "Continuous",
    region: "Internal",
    description: "Every batch undergoes rigorous inspection before release.",
    icon: ClipboardCheck,
  },
];


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
      className="relative group px-10 py-5 rounded-full overflow-hidden border border-[var(--color-border)] bg-white/5 backdrop-blur-xl border-white/10 shadow-sm backdrop-blur-md text-[#06233F] tracking-[0.25em] text-xs uppercase transition-colors duration-500 hover:border-[var(--color-primary-navy)]"
    >
      <span className="absolute inset-0 bg-white/5 backdrop-blur-xl border-white/10 scale-x-0 origin-left transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-x-100" />
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-[#06233F]">
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
  const nav = useNavigate();
  const [activeCert, setActiveCert] = useState(0);
  const containerRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const timelineRef = useRef(null);
  const current = certifications[activeCert];

  useEffect(() => {
    injectFonts();

    // 1. HERO ANIMATION: Dramatic Letter Assembly and Parallax
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    heroTl.fromTo(
      ".hero-title-line",
      { y: 120, opacity: 0, rotate: 2 },
      { y: 0, opacity: 1, rotate: 0, duration: 1.8, stagger: 0.2 },
    );

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

  const marqueeItems = [
    "WHO-GMP CERTIFIED",
    "STERILE INJECTABLES",
    "CRITICAL CARE SOLUTIONS",
    "QUALITY ASSURED",
    "HOSPITAL TRUSTED",
    "PAN-INDIA SUPPLY",
    "ADVANCED FORMULATIONS",
    "PATIENT-FIRST INNOVATION",
  ];

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F8FAFC] overflow-x-hidden selection:bg-white selection:text-black"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* <VideoBackground /> */}

      {/* VIGNETTE & ATMOSPHERIC LIGHTING */}
      <div className="fixed inset-0 pointer-events-none z-[1] shadow-[inset_0_0_150px_rgba(255,255,255,0.4)]" />
      <div className="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-b from-white/10 via-transparent to-white/20" />
      <section className="relative min-h-screen w-full flex flex-col justify-center px-8 md:px-24 pt-32 overflow-hidden bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
          {/* Main Heading Section */}
          <div className="lg:col-span-8">
            <TextShield type="linear" className="!p-0">
              <span className="block text-xs font-bold tracking-widest uppercase text-[#216853] opacity-90 mb-4">
                Premium Healthcare Standards
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#06233F] leading-tight tracking-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <span className="hero-title-line block overflow-hidden">
                  Science That
                </span>

                <span className="hero-title-line block overflow-hidden text-[#216853] italic font-normal">
                  Protects Lives.
                </span>

                <span className="hero-title-line block overflow-hidden">
                  Quality You Can Trust.
                </span>
              </h1>
            </TextShield>
          </div>

          {/* Stats Section */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-10 border-t lg:border-t-0 lg:border-l border-[var(--color-primary-navy)]/20 pt-10 lg:pt-0 lg:pl-12">
            <div className="flex-1">
              <span className="block text-xs font-bold tracking-widest uppercase text-[#216853] mb-2">
                Purity Rate
              </span>
              <p
                className="text-4xl md:text-5xl font-semibold text-[#06233F] mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                99.9%
              </p>
              <p className="text-sm text-[#06233F]/70 font-medium leading-relaxed">
                Strictly lab-tested to ensure maximum safety and effectiveness.
              </p>
            </div>

            <div className="flex-1">
              <span className="block text-xs font-bold tracking-widest uppercase text-[#216853] mb-2">
                Trusted By
              </span>
              <p
                className="text-4xl md:text-5xl font-semibold text-[#06233F] mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                620+
              </p>
              <p className="text-sm text-[#06233F]/70 font-medium leading-relaxed">
                Hospitals, clinics, and medical facilities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          SECTION 2: INFINITE TRUST RIBBON (The Luxury Ticker)
          ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-[#163A63]/10 bg-transparent py-10">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] whitespace-nowrap">
          {[...Array(2)].map((_, copyIndex) => (
            <div key={copyIndex} className="flex items-center gap-12 pr-12">
              {marqueeItems.map((item, index) => (
                <React.Fragment key={`${copyIndex}-${index}`}>
                  <span
                    className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#216853] font-semibold"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {item}
                  </span>

                  {index !== marqueeItems.length - 1 && (
                    <span className="text-[#216853]/40 text-lg">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          SECTION 3: EDITORIAL ABOUT (Pure Typography and Scale)
          ───────────────────────────────────────────────────── */}
      <section
        id="about"
        className="relative py-24 md:py-32 px-6 md:px-16 z-20 bg-transparent"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <span className="block text-xs font-bold tracking-widest uppercase text-[#216853] mb-6">
              Our Vision
            </span>
            <h2
              className="text-3xl md:text-5xl font-light text-[#06233F] leading-snug"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Where advanced science meets human biology.
            </h2>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <TextShield type="radial" className="!p-0">
              <p className="text-lg md:text-xl text-[#06233F]/70 font-light leading-relaxed">
                We develop medical treatments with the precision of fine art. We
                believe that since the human body is a masterpiece of design,
                the molecules used to heal it must be crafted with the same
                level of care and structural beauty.
              </p>

              <div className="h-px w-16 bg-white/5 backdrop-blur-xl border-white/10 shadow-sm my-6"></div>

              <p className="text-base text-[#06233F]/70 font-light leading-relaxed">
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
        className="relative  h-screen bg-transparent backdrop-blur-md z-20"
      >
        <div className="absolute top-25 left-8 md:left-24 z-30">
          <span className="block text-[11px] font-medium tracking-[0.3em] uppercase text-[#216853]">
            Our Products
          </span>
          <h2
            className="text-3xl font-light text-[#06233F] mt-2"
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
              <span className="text-[10px] tracking-[0.3em] text-[#216853] uppercase mb-4">
                Category: Antibiotics
              </span>
              <h3
                className="text-5xl md:text-7xl font-light text-[#06233F] mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Injectable Antibiotics
              </h3>
              <p className="text-sm text-[#06233F]/70 leading-relaxed font-light mb-8">
                A wide range of high-quality injectable antibiotics designed for
                effective infection control and rapid patient recovery in
                hospital settings.
              </p>
              <div className="flex gap-8 text-[11px] tracking-wider text-[#06233F]/60 uppercase border-t border-[var(--color-border)] pt-6">
                <div>
                  <span className="block text-[#06233F]">
                    STERILE
                  </span>{" "}
                  FORMULA
                </div>
                <div>
                  <span className="block text-[#06233F]">
                    CLINICAL
                  </span>{" "}
                  GRADE
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full rounded-[2.5rem] overflow-hidden border border-[var(--color-border)] relative group">
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
              <span className="text-[10px] tracking-[0.3em] text-[#216853] uppercase mb-4">
                Category: Pain Management
              </span>
              <h3
                className="text-5xl md:text-7xl font-light text-[#06233F] mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Pain Relief
              </h3>
              <p className="text-sm text-[#06233F]/70 leading-relaxed font-light mb-8">
                Safe and reliable injectable treatments developed to provide
                fast-acting relief for patients managing acute pain and
                inflammation.
              </p>
              <div className="flex gap-8 text-[11px] tracking-wider text-[#06233F]/60 uppercase border-t border-[var(--color-border)] pt-6">
                <div>
                  <span className="block text-[#06233F]">
                    FAST
                  </span>{" "}
                  ACTION HALF-LIFE
                </div>
                <div>
                  <span className="block text-[#06233F]">
                    PROVEN
                  </span>{" "}
                  SAFETY
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full rounded-[2.5rem] overflow-hidden border border-[var(--color-border)] relative group">
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
              <span className="text-[10px] tracking-[0.3em] text-[#216853] uppercase mb-4">
                Category: Essential Care
              </span>
              <h3
                className="text-5xl md:text-7xl font-light text-[#06233F] mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Critical Care
              </h3>
              <p className="text-sm text-[#06233F]/70 leading-relaxed font-light mb-8">
                Essential injectable solutions for emergency care and
                stabilizing vital patient functions, trusted by healthcare
                professionals daily.
              </p>
              <div className="flex gap-8 text-[11px] tracking-wider text-[#06233F]/60 uppercase border-t border-[var(--color-border)] pt-6">
                <div>
                  <span className="block text-[#06233F]">
                    TRUSTED
                  </span>{" "}
                  PURITY
                </div>
                <div>
                  <span className="block text-[#06233F]">
                    STABLE
                  </span>{" "}
                  RESULTS
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full rounded-[2.5rem] overflow-hidden border border-[var(--color-border)] relative group">
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
            <span className="block text-[11px] font-bold tracking-[0.3em] uppercase text-[#216853] mb-3">
              Our Process
            </span>
            <h2
              className="text-4xl md:text-6xl font-light text-[#06233F]"
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
                  className="group p-6 rounded-2xl bg-white/5 backdrop-blur-xl border-white/10 shadow-sm border border-[var(--color-border)] hover:border-[var(--color-border)] transition-all duration-500"
                >
                  <span className="text-[10px] tracking-[0.3em] text-[#216853] uppercase">
                    {item.stage}
                  </span>
                  <h3
                    className="text-xl font-light text-[#06233F] mt-2 mb-3"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right side: Image Container */}
            <div className="md:col-span-7 h-[600px] relative rounded-3xl overflow-hidden border border-[var(--color-border)]">
              <img
                src="https://plus.unsplash.com/premium_photo-1661962958582-e30be4c3a2aa?w=900&auto=format&fit=crop&q=60"
                alt="Pharmaceutical Manufacturing Facility"
                className="w-full h-full object-cover opacity-100  transition-opacity duration-700"
              />
              {/* Subtle Gradient Overlay for premium feel */}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          SECTION 6: INTERACTIVE CERTIFICATIONS (Physical Seals)
          ───────────────────────────────────────────────────── */}
      <section id="certifications" className="relative py-28 px-6 md:px-16 lg:px-24 bg-transparent border-y border-slate-200">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="mb-16 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 border border-slate-300 mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary-navy,#0f172a)]" />
              <span className="text-xs font-bold tracking-wider uppercase text-[#216853]">
                Regulatory & Compliance
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-semibold text-[#06233F] tracking-tight leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Global Accreditation Standards
            </h2>
            <p className="mt-4 text-base text-[#06233F]/70 font-normal leading-relaxed">
              Engineered to exceed international health regulations, ensuring uncompromised purity and safety in every dosage.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Interactive Navigation List */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {certifications.map((cert, idx) => {
                const isActive = activeCert === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCert(idx)}
                    className={`group relative text-left p-5 rounded-xl border transition-all duration-200 flex items-center justify-between ${isActive
                        ? "bg-white/5 backdrop-blur-xl border-white/10 border-[var(--color-primary-navy,#0f172a)] shadow-sm"
                        : "bg-white/5 backdrop-blur-xl border-white/10/60 border-slate-200 hover:bg-white/5 backdrop-blur-xl border-white/10 hover:border-slate-300"
                      }`}
                  >
                    {/* Left Active Accent Indicator Bar */}
                    <div
                      className={`absolute left-0 top-3 bottom-3 w-1 rounded-r transition-all ${isActive ? "bg-[var(--color-primary-navy,#0f172a)]" : "bg-transparent"
                        }`}
                    />

                    <div className="pl-3">
                      <span className="block text-[11px] font-bold tracking-widest uppercase text-[#216853] mb-1">
                        {cert.category}
                      </span>
                      <h3 className="text-lg font-bold text-[#06233F] group-hover:text-[#06233F]">
                        {cert.title}
                      </h3>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-200 ${isActive
                          ? "text-[#06233F] translate-x-1"
                          : "text-[#06233F]/60 group-hover:text-[#06233F]"
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: High-Precision Spec Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCert}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl border border-slate-200 p-8 md:p-10 shadow-lg relative overflow-hidden"
                >
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#06233F] shadow-inner">
                        {React.createElement(current.icon, {
                          size: 28,
                          strokeWidth: 1.75,
                        })}
                      </div>
                      <div>
                        <span className="text-xs font-bold tracking-widest uppercase text-[#216853] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/60 inline-flex items-center gap-1.5">
                          <CheckCircle2 size={13} /> Verified Standard
                        </span>
                        <h3
                          className="text-2xl md:text-3xl font-semibold text-[#06233F] mt-1"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {current.title}
                        </h3>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block text-3xl font-bold text-[#06233F]/50 select-none font-mono">
                      #{current.short}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[#06233F]/70 text-base md:text-lg leading-relaxed font-normal mb-8">
                    {current.description}
                  </p>

                  {/* Technical Specifications Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 bg-slate-50/80 -mx-8 -mb-8 p-8 mt-auto">
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#06233F]/60 mb-1">
                        Domain
                      </span>
                      <span className="text-sm font-bold text-[#06233F]">
                        {current.category}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#06233F]/60 mb-1">
                        Territory
                      </span>
                      <span className="text-sm font-bold text-[#06233F]">
                        {current.region}
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#06233F]/60 mb-1">
                        Compliance Period
                      </span>
                      <span className="text-sm font-bold text-[#06233F]">
                        Valid through {current.year}
                      </span>
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
          <div className="relative rounded-[2.5rem] overflow-hidden border border-[var(--color-border)] bg-white/5 backdrop-blur-xl border-white/10 shadow-sm p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 backdrop-blur-sm">
            {/* Content Side */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#216853] mb-4">
                Featured Solution
              </span>
              <h2
                className="text-5xl md:text-6xl font-light text-[#06233F] mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Aura Injectable
              </h2>
              <p className="text-sm text-[#06233F]/70 leading-relaxed font-light mb-8 max-w-md">
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
                    className="flex items-center gap-3 text-xs tracking-widest text-[#216853] uppercase"
                  >
                    <div className="w-1 h-1 rounded-full bg-white/5 backdrop-blur-xl border-white/10 shadow-sm" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Side */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-sm h-[400px] rounded-3xl overflow-hidden border border-[var(--color-border)]">
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
      <section className="relative py-32 px-8 md:px-24 bg-transparent z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Content Side */}
          <div className="lg:col-span-5">
            <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-[#216853] mb-4">
              Nationwide Distribution
            </span>
            <h2
              className="text-4xl md:text-5xl font-light text-[#06233F] mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Secure Cold-Chain Logic
            </h2>
            <p className="text-sm text-[#06233F]/70 leading-relaxed font-light mb-8">
              We ensure the integrity of every injectable shipment through
              specialized temperature-controlled logistics across India. Our
              systems monitor stability from our facility to the hospital door.
            </p>

            <div className="flex gap-8 text-[11px] tracking-wider text-[#06233F]/60 uppercase">
              <div>
                <span
                  className="block text-2xl font-light text-[#06233F]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  PAN-INDIA
                </span>
                COVERAGE
              </div>
              <div>
                <span
                  className="block text-2xl font-light text-[#06233F]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  100%
                </span>
                SAFETY RATING
              </div>
            </div>
          </div>

          {/* Visual Side: India Map Image */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full h-96 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center p-8 bg-white/5 backdrop-blur-xl border-white/10 shadow-sm border border-[var(--color-border)]">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

              {/* India Map Image */}
              <img
                src="https://imgs.search.brave.com/erosFY_2M0c91izR4EkNyIXyNbo-DjTw03ZBzVcjew4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM0/MTU5NTE1NS92ZWN0/b3IvYWJzdHJhY3Qt/ZG90dGVkLWhhbGZ0/b25lLXdpdGgtc3Rh/ci1lZmZlY3QtaW4t/ZGFyay1iYWNrZ3Jv/dW5kLXdpdGgtbWFw/LW9mLWluZGlhLWRp/Z2l0YWwuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVZHSGpo/LUZ1UmRUVU9HN3Uw/TG45YWRKam9XcWJF/Qy1DR3hIakNBdWFy/SW89"
                alt="Map of India"
                className="relative z-10 h-64 w-auto object-contain "
              />

              <div className="absolute bottom-10 z-20">
                <span className="text-[10px] tracking-[0.4em] text-[#216853] uppercase">
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
      <section className="relative py-48 px-8 md:px-24 flex flex-col items-center justify-center text-center z-20 border-t border-[var(--color-border)]">
        <div className="max-w-4xl w-full flex flex-col items-center p-12 rounded-[3rem] bg-white/5 backdrop-blur-xl border-white/10 shadow-sm border border-[var(--color-border)] backdrop-blur-sm">
          <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-[#216853] mb-6">
            Get Started
          </span>

          <h2
            className="text-5xl md:text-7xl font-light text-[#06233F] mb-12 leading-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Ready to start
            <br />
          </h2>

          <button
            onClick={() => nav("/contact")}
            className="px-10 py-4 border border-[var(--color-border)] text-[#06233F] text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--color-primary-navy)] hover:text-white transition-all duration-500 rounded-full font-bold"
          >
            Contact Us Now
          </button>
        </div>
      </section>

    </main>
  );
}