import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  ShieldCheck,
  HeartHandshake,
  Award,
  Sparkles,
  CheckCircle2,
  Mail,
  FlaskConical,
  Globe2,
} from "lucide-react";

// Image import (Replace with your actual asset path if available)
import visionImage from "../../assets/factory.png";

const FONT_ID = "novix-font-import";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Quality First",
    description:
      "Adhering to strict WHO-GMP compliance standards across every batch to ensure complete purity and efficacy.",
  },
  {
    icon: FlaskConical,
    title: "Continuous Innovation",
    description:
      "Investing in modern drug formulations and advanced manufacturing processes to address evolving clinical needs.",
  },
  {
    icon: Globe2,
    title: "Widespread Reach",
    description:
      "Building a seamless, highly reliable supply chain network across critical care centers and institutions.",
  },
  {
    icon: HeartHandshake,
    title: "Patient-Centricity",
    description:
      "Keeping human health at the core of every strategic decision, partner collaboration, and product release.",
  },
];

const OBJECTIVES = [
  "Zero-defect manufacturing protocols for all injectable lines.",
  "Expanding critical care access across tier-2 and tier-3 healthcare systems.",
  "Fostering ethical long-term partnerships with healthcare institutions.",
  "Continuous workforce training and technological upgrades.",
];

function useFonts() {
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById(FONT_ID)) {
      const link = document.createElement("link");
      link.id = FONT_ID;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@200;300;400;500&display=swap";
      document.head.appendChild(link);
    }
  }, []);
}

export default function MissionVisionPage() {
  useFonts();

  return (
    <div
      className="relative min-h-screen w-full pt-28 text-[#06233F]/80 bg-[#F8FAFC]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v100M30 0v100M50 0v100M70 0v100M90 0v100M0 10h100M0 30h100M0 50h100M0 70h100M0 90h100' stroke='%2306233F' stroke-width='1' fill='none'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%2306233F'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ================= HERO HEADER ================= */}
      <header className="relative z-10 pt-10 md:pt-16 pb-12 bg-[#F8FAFC] text-center border-b border-[#06233F]/10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-4">
            Purpose & Roadmap
          </p>
          <h1
            className="font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-[#06233F] mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Our Mission & <span className="italic font-normal text-[#216853]">Vision</span>
          </h1>
          <p className="text-base md:text-lg text-[#06233F]/70 font-light leading-relaxed max-w-2xl mx-auto">
            Driven by purpose and guided by high standards, we are dedicated to transforming healthcare delivery through safe, precise, and high-impact pharmaceutical solutions.
          </p>
        </div>
      </header>

      {/* ================= MISSION & VISION GRID ================= */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Mission Card */}
          <div className="rounded-[28px] border border-[#06233F]/10 bg-white p-8 md:p-12 shadow-lg shadow-[#06233F]/5 flex flex-col justify-between hover:border-[#216853]/40 transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center mb-8">
                <Target size={28} className="text-[#216853]" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-3">
                Our Purpose
              </p>
              <h2
                className="text-2xl sm:text-3xl font-light text-[#06233F] leading-tight mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed mb-6">
                To formulate, manufacture, and distribute critical care pharmaceuticals that adhere strictly to international quality standardizations. We strive to empower clinicians with dependable therapeutics that enhance patient care and restore health.
              </p>
            </div>
            <div className="pt-6 border-t border-[#06233F]/10 flex items-center gap-3 text-xs uppercase tracking-[0.1em] font-semibold text-[#06233F]">
              <Award className="text-[#216853]" size={18} />
              <span>WHO-GMP Compliant Manufacturing Standards</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="rounded-[28px] border border-[#06233F]/10 bg-white p-8 md:p-12 shadow-lg shadow-[#06233F]/5 flex flex-col justify-between hover:border-[#216853]/40 transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center mb-8">
                <Eye size={28} className="text-[#216853]" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-3">
                Our Horizon
              </p>
              <h2
                className="text-2xl sm:text-3xl font-light text-[#06233F] leading-tight mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed mb-6">
                To become a trusted global leader in injectable and specialized pharmaceutical formulations—recognized for unwavering quality, manufacturing integrity, and accessible healthcare solutions.
              </p>
            </div>
            <div className="pt-6 border-t border-[#06233F]/10 flex items-center gap-3 text-xs uppercase tracking-[0.1em] font-semibold text-[#06233F]">
              <Sparkles className="text-[#216853]" size={18} />
              <span>Expanding Healthcare Accessibility Everywhere</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= STRATEGIC OBJECTIVES SECTION ================= */}
      <section className="relative z-10 py-20 bg-white border-y border-[#06233F]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column Text */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-4">
                Strategic Goals
              </p>
              <h2
                className="text-3xl sm:text-4xl font-light text-[#06233F] tracking-tight leading-tight mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                How We Translate Vision into <span className="italic font-normal text-[#216853]">Action</span>
              </h2>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed mb-8">
                Our mission is supported by continuous operational refinements and strict adherence to protocol. We focus on structured growth that directly benefits hospital ecosystems.
              </p>

              <div className="space-y-4">
                {OBJECTIVES.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#216853] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#06233F]/80 font-light leading-relaxed">
                      {obj}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Image Container */}
            <div className="relative">
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-[28px] overflow-hidden border border-[#216853]/20 bg-[#F8FAFC] shadow-xl">
                <img
                  src={visionImage}
                  alt="Novix Healthcare Infrastructure"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/600x500?text=Novix+Infrastructure";
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CORE PILLARS ================= */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-3">
            Key Drivers
          </p>
          <h2
            className="text-3xl sm:text-4xl font-light text-[#06233F] tracking-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Pillars of Our <span className="italic font-normal text-[#216853]">Commitment</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[24px] border border-[#06233F]/10 bg-white p-8 shadow-sm hover:shadow-md hover:border-[#216853]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center mb-6">
                    <Icon size={24} className="text-[#216853]" />
                  </div>
                  <h3
                    className="text-xl font-light text-[#06233F] mb-3"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="relative z-10 bg-[#06233F] text-white py-24 text-center mb-0">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-4">
            Work With Us
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6 !text-white leading-tight max-w-2xl mx-auto"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Share in our vision for <span className="italic font-normal text-[#216853]">quality healthcare</span>
          </h2>
          <p className="text-base text-slate-300 font-light max-w-xl mx-auto leading-relaxed mb-10">
            Partner with Novix Healthcare to deliver pharmaceutical reliability and excellence across hospitals and supply networks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] transition-all duration-300 shadow-lg shadow-[#216853]/30"
            >
              <Mail size={16} className="!text-white" />
              <span className="!text-white">Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}