import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Quote,
  Target,
  ShieldCheck,
  HeartHandshake,
  Mail,
} from "lucide-react";

// Director Images
import mdImage from "../../assets/factory.png"; // Pankaj
import director1Image from "../../assets/favicon.png"; // Harsh Arora
import director2Image from "../../assets/logo.jpeg"; // Nishchay Sharma

const FONT_ID = "novix-font-import";

const DIRECTORS = [
  {
    name: "Pankaj",
    image: mdImage,
    quote:
      "Welcome to Novix Healthcare. Every vial and ampoule produced in our WHO-GMP-certified facility reflects our unwavering dedication to precision, safety, and purity.",
  },
  {
    name: "Harsh Arora",
    image: director1Image,
    quote:
      "Our focus is on driving operational efficiency and expanding our distribution network so that critical formulations reach hospitals without delay. Reliability is our primary product.",
  },
  {
    name: "Nishchay Sharma",
    image: director2Image,
    quote:
      "Innovating our product portfolio while strict quality controls are maintained is key. We strive to introduce formulations that meet modern clinical challenges.",
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
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

export default function DirectorsMessagePage() {
  useFonts();

  return (
    <div className="relative min-h-screen w-full pt-28 text-[#06233F]/80 font-['Inter'] bg-[#F8FAFC]">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v100M30 0v100M50 0v100M70 0v100M90 0v100M0 10h100M0 30h100M0 50h100M0 70h100M0 90h100' stroke='%2306233F' stroke-width='1' fill='none'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%2306233F'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ================= HERO HEADER ================= */}
      <header className="relative z-10 pt-8 pb-12 bg-[#F8FAFC] text-center border-b border-[#06233F]/10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#216853] mb-3 font-mono">
            Leadership & Vision
          </p>
          <h1 className="font-bold text-[38px] sm:text-[48px] md:text-[56px] leading-[1.1] tracking-tight text-[#06233F] mb-6">
            Message from the <span className="text-[#216853]">Board of Directors</span>
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#06233F]/70 leading-relaxed max-w-2xl mx-auto">
            Guided by a commitment to healthcare excellence, our leadership team 
            strives to deliver high-quality pharmaceutical formulations that empower hospitals and save lives nationwide.
          </p>
        </div>
      </header>

      {/* ================= DIRECTORS GRID (3 EQUAL CARDS) ================= */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {DIRECTORS.map((director, index) => (
            <div
              key={index}
              className="rounded-[28px] border border-[#06233F]/10 bg-white p-8 shadow-lg shadow-[#06233F]/5 flex flex-col justify-between hover:border-[#216853]/40 transition-all duration-300"
            >
              <div>
                {/* Director Photo */}
                <div className="relative w-full h-64 rounded-[20px] overflow-hidden border border-[#216853]/20 bg-[#F8FAFC] shadow-inner mb-6">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/300x350?text=${encodeURIComponent(
                        director.name
                      )}`;
                    }}
                  />
                </div>

                {/* Director Name */}
                <h2 className="text-[22px] font-bold text-[#06233F] text-center mb-4">
                  {director.name}
                </h2>

                {/* Director Quote / Statement */}
                <div className="relative pt-2">
                  <Quote className="w-6 h-6 text-[#216853]/20 mb-2 -scale-x-100" />
                  <p className="text-[14px] text-[#06233F]/75 leading-relaxed">
                    "{director.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GUIDING PRINCIPLES ================= */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#216853] mb-3 font-mono">
            Core Beliefs
          </p>
          <h2 className="text-[30px] sm:text-[38px] font-bold text-[#06233F] tracking-tight">
            Our Guiding Pillars
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="rounded-[20px] border border-[#06233F]/10 bg-white p-8 shadow-sm hover:shadow-md hover:border-[#216853]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center mb-6">
                  <Icon size={24} className="text-[#216853]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#06233F] mb-3">
                  {val.title}
                </h3>
                <p className="text-[14px] text-[#06233F]/70 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="relative z-10 bg-[#06233F] text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#216853] mb-3 font-mono">
            Partner With Us
          </p>
          <h2 className="text-[32px] sm:text-[42px] font-bold tracking-tight mb-6 !text-white leading-tight">
            Connect directly with our leadership team
          </h2>
          <p className="text-[16px] text-white/70 max-w-xl mx-auto mb-8">
            Interested in institutional supply, distribution partnerships, or manufacturing collaborations? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-[#184d3d] transition-all duration-300 shadow-lg shadow-[#216853]/30"
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