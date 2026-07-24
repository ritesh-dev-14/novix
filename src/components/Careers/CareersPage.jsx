import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Heart,
  Award,
} from "lucide-react";

const FONT_ID = "novix-font-import";

const PERKS = [
  {
    icon: ShieldCheck,
    title: "Health & Safety",
    description:
      "Comprehensive medical coverages and strict safety compliance across all manufacturing units.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description:
      "Regular training workshops on global WHO-GMP regulations and advanced sterile technologies.",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description:
      "Supportive workplace policies designed to prioritize employee well-being and personal growth.",
  },
  {
    icon: Award,
    title: "Meritocracy & Growth",
    description:
      "Clear career advancement pathways based on performance, innovation, and leadership.",
  },
];

const CONTACT_INFO = {
  location: "Shop No. 55, Near Punjab National Bank (PNB), Barara, Ambala, Haryana – 133201, India",
  email: "info@novixhealthcare.com",
  phone: "+91 8053868387",
};

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

export default function CareersPage() {
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
            Join Our Team
          </p>
          <h1
            className="font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-[#06233F] mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Build Your Career in <span className="italic font-normal text-[#216853]">Healthcare</span>
          </h1>
          <p className="text-base md:text-lg text-[#06233F]/70 font-light leading-relaxed max-w-2xl mx-auto">
            At Novix Healthcare, we empower dedicated professionals to engineer precision therapeutics and deliver high-impact critical care solutions.
          </p>
        </div>
      </header>

      {/* ================= CULTURE & PERKS ================= */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-3">
            Why Novix?
          </p>
          <h2
            className="text-3xl sm:text-4xl font-light text-[#06233F] tracking-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Our Work Culture
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERKS.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="rounded-[24px] border border-[#06233F]/10 bg-white p-8 shadow-sm hover:shadow-md hover:border-[#216853]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center mb-6">
                  <Icon size={24} className="text-[#216853]" />
                </div>
                <h3
                  className="text-xl font-light text-[#06233F] mb-3"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {perk.title}
                </h3>
                <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= NO ACTIVE OPENINGS & CONTACT DISPLAY ================= */}
      <section className="relative z-10 pb-20 max-w-4xl mx-auto px-6">
        <div className="rounded-[28px] border border-[#06233F]/10 bg-white p-8 sm:p-12 text-center shadow-lg shadow-[#06233F]/5">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center mb-6">
            <Briefcase size={28} className="text-[#216853]" />
          </div>

          <h2
            className="text-2xl sm:text-3xl font-light text-[#06233F] mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            No Active Openings Currently
          </h2>
          <p className="text-sm md:text-base text-[#06233F]/70 font-light max-w-xl mx-auto mb-8 leading-relaxed">
            We are not actively hiring for any open positions right now. However, we are always open to connecting with talented healthcare professionals for future opportunities.
          </p>

          {/* Contact Details Card */}
          <div className="bg-[#06233F] text-white p-8 rounded-[24px] max-w-lg mx-auto text-left shadow-xl mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-6">
              Get in Touch
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#216853]/20 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#216853]" />
                </div>
                <span className="text-sm font-light text-white/90 leading-relaxed">
                  {CONTACT_INFO.location}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#216853]/20 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#216853]" />
                </div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm font-light text-[#216853] hover:underline break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#216853]/20 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#216853]" />
                </div>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
                  className="text-sm font-light text-[#216853] hover:underline"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Redirect Button */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] transition-all duration-300 shadow-lg shadow-[#216853]/30"
          >
            <span>Contact Us</span>
            <ArrowRight size={16} className="!text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}