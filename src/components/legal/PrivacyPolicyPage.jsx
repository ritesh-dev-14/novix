import React, { useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  UserCheck,
  Mail,
} from "lucide-react";

const FONT_ID = "novix-font-import";

const COMPANY_INFO = {
  name: "Novix Healthcare",
  email: "info@novixhealthcare.com",
  phone: "+91 8053868387",
  country: "India",
  lastUpdated: "July 2026",
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

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-4 bg-[#F4F8F6] px-3.5 py-1.5 rounded-full border border-[#216853]/20">
            <ShieldCheck size={14} /> Legal & Compliance
          </div>
          <h1
            className="font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-[#06233F] mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Privacy <span className="italic font-normal text-[#216853]">Policy</span>
          </h1>
          <p className="text-base md:text-lg text-[#06233F]/70 font-light leading-relaxed max-w-2xl mx-auto">
            At {COMPANY_INFO.name}, we prioritize the confidentiality and integrity of your data. This policy outlines how we collect, handle, and protect your information across our services.
          </p>
          <p className="text-xs font-mono text-[#06233F]/50 mt-4">
            Last Updated: {COMPANY_INFO.lastUpdated}
          </p>
        </div>
      </header>

      {/* ================= MAIN CONTENT SECTION ================= */}
      <section className="relative z-10 py-16 max-w-5xl mx-auto px-6 md:px-10">
        <div className="space-y-12">
          
          {/* Key Principles Grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-[#06233F]/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center text-[#216853] mb-4">
                <Lock size={18} />
              </div>
              <h3
                className="text-lg font-light text-[#06233F] mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Data Security
              </h3>
              <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                Enterprise-grade security standards to protect institutional and medical inquiry data.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-[#06233F]/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center text-[#216853] mb-4">
                <Eye size={18} />
              </div>
              <h3
                className="text-lg font-light text-[#06233F] mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Full Transparency
              </h3>
              <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                We clearly disclose all data processing activities. No hidden data selling or monetization.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-[#06233F]/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center text-[#216853] mb-4">
                <UserCheck size={18} />
              </div>
              <h3
                className="text-lg font-light text-[#06233F] mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                User Control
              </h3>
              <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                Request access, corrections, or deletion of your personal contact data anytime.
              </p>
            </div>
          </div>

          {/* Detailed Policy Card */}
          <div className="bg-white p-8 sm:p-12 rounded-[28px] border border-[#06233F]/10 shadow-lg shadow-[#06233F]/5 space-y-10">
            
            {/* Section 1 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#06233F] text-white font-mono text-xs font-bold flex items-center justify-center">
                  01
                </div>
                <h2
                  className="text-xl font-light text-[#06233F]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Information We Collect
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11">
                We collect personal and corporate information when you voluntarily submit inquiry forms, request institutional drug catalog access, or communicate with us regarding contract manufacturing.
              </p>
              <ul className="mt-4 space-y-2 pl-11 text-sm sm:text-base text-[#06233F]/70 font-light list-disc list-inside">
                <li><strong className="text-[#06233F] font-medium">Contact Details:</strong> Full name, professional email address, phone number, and mailing address.</li>
                <li><strong className="text-[#06233F] font-medium">Professional Details:</strong> Associated hospital, pharmaceutical organization, job role, or licensing details.</li>
                <li><strong className="text-[#06233F] font-medium">Technical Data:</strong> Standard server logs, IP address, browser type, and interaction metrics to optimize site performance.</li>
              </ul>
            </div>

            <hr className="border-[#06233F]/10" />

            {/* Section 2 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#06233F] text-white font-mono text-xs font-bold flex items-center justify-center">
                  02
                </div>
                <h2
                  className="text-xl font-light text-[#06233F]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  How We Use Your Information
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11 mb-3">
                Information collected is strictly utilized to fulfill professional healthcare inquiries and facilitate supply chain operations:
              </p>
              <ul className="space-y-2 pl-11 text-sm sm:text-base text-[#06233F]/70 font-light list-disc list-inside">
                <li>Processing and responding to hospital, institutional, or export inquiries.</li>
                <li>Fulfilling WHO-GMP compliant regulatory, quality control, and safety documentation requests.</li>
                <li>Communication regarding ongoing contract manufacturing processes or order updates.</li>
                <li>Maintaining compliance with national and international healthcare legislation.</li>
              </ul>
            </div>

            <hr className="border-[#06233F]/10" />

            {/* Section 3 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#06233F] text-white font-mono text-xs font-bold flex items-center justify-center">
                  03
                </div>
                <h2
                  className="text-xl font-light text-[#06233F]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Data Sharing & Disclosure
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11">
                <strong className="text-[#06233F] font-medium">{COMPANY_INFO.name} does not sell, trade, or rent personal data to third parties.</strong> We may share necessary details only under the following limited conditions:
              </p>
              <ul className="mt-3 space-y-2 pl-11 text-sm sm:text-base text-[#06233F]/70 font-light list-disc list-inside">
                <li><strong className="text-[#06233F] font-medium">Logistics Partners:</strong> Trusted delivery and freight services required to transport medical supplies.</li>
                <li><strong className="text-[#06233F] font-medium">Legal Requirements:</strong> To comply with applicable laws, health authorities, or judicial summons in {COMPANY_INFO.country}.</li>
              </ul>
            </div>

            <hr className="border-[#06233F]/10" />

            {/* Section 4 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#06233F] text-white font-mono text-xs font-bold flex items-center justify-center">
                  04
                </div>
                <h2
                  className="text-xl font-light text-[#06233F]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Cookies and Tracking
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11">
                Our web platform uses essential operational cookies to ensure seamless navigation and improve session stability. You can adjust your browser settings to refuse cookies, though certain interactive features of our portal may become limited.
              </p>
            </div>

            <hr className="border-[#06233F]/10" />

            {/* Section 5 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#06233F] text-white font-mono text-xs font-bold flex items-center justify-center">
                  05
                </div>
                <h2
                  className="text-xl font-light text-[#06233F]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Your Legal Rights
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11">
                Depending on your jurisdiction, you hold the right to inspect, amend, or request the deletion of your personal contact records held in our databases. To initiate a data request, please write to us at <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#216853] font-semibold underline">{COMPANY_INFO.email}</a>.
              </p>
            </div>

          </div>

          {/* Contact Box */}
          <div className="bg-[#06233F] text-white p-8 sm:p-10 rounded-[28px] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="text-xl sm:text-2xl font-light mb-2 text-white"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Have Questions About Our <span className="italic font-normal text-[#216853]">Privacy Policy</span>?
              </h3>
              <p className="text-sm text-slate-300 font-light max-w-xl">
                Our Legal & Quality Assurance team is available to address any privacy or data protection concerns.
              </p>
            </div>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] transition-all duration-300 shadow-lg shadow-[#216853]/25"
            >
              <Mail size={16} /> Contact Legal Team
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}