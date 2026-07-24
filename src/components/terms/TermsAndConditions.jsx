import React, { useEffect } from "react";
import {
  FileText,
  Scale,
  Building2,
  Mail,
  ShieldAlert,
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

export default function TermsAndConditions() {
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
            <Scale size={14} /> Legal Agreement
          </div>
          <h1
            className="font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-[#06233F] mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Terms & <span className="italic font-normal text-[#216853]">Conditions</span>
          </h1>
          <p className="text-base md:text-lg text-[#06233F]/70 font-light leading-relaxed max-w-2xl mx-auto">
            Please read these terms and conditions carefully before accessing or using the digital services and product information provided by {COMPANY_INFO.name}.
          </p>
          <p className="text-xs font-mono text-[#06233F]/50 mt-4">
            Last Updated: {COMPANY_INFO.lastUpdated}
          </p>
        </div>
      </header>

      {/* ================= MAIN CONTENT SECTION ================= */}
      <section className="relative z-10 py-16 max-w-5xl mx-auto px-6 md:px-10">
        <div className="space-y-12">
          
          {/* Key Terms Summary Grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-[#06233F]/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center text-[#216853] mb-4">
                <Building2 size={18} />
              </div>
              <h3
                className="text-lg font-light text-[#06233F] mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Institutional Use
              </h3>
              <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                Designed for healthcare professionals, institutions, and B2B partners.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-[#06233F]/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center text-[#216853] mb-4">
                <ShieldAlert size={18} />
              </div>
              <h3
                className="text-lg font-light text-[#06233F] mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Medical Disclaimer
              </h3>
              <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                Portal content is informational and does not replace medical advice.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-[#06233F]/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center text-[#216853] mb-4">
                <FileText size={18} />
              </div>
              <h3
                className="text-lg font-light text-[#06233F] mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                WHO-GMP Standards
              </h3>
              <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                All manufacturing and compliance follow strict international regulations.
              </p>
            </div>
          </div>

          {/* Detailed Terms Card */}
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
                  Acceptance of Terms
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11">
                By accessing this website and utilizing our contact, catalog, or inquiry portals, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must refrain from using our services.
              </p>
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
                  Medical & Product Disclaimer
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11 mb-3">
                The information provided on this platform regarding sterile formulations, critical care products, and pharmaceutical manufacturing is intended strictly for professional and educational reference:
              </p>
              <ul className="space-y-2 pl-11 text-sm sm:text-base text-[#06233F]/70 font-light list-disc list-inside">
                <li>Content on this site should not be used as a substitute for direct medical diagnosis or treatment by a qualified healthcare professional.</li>
                <li>Product availability and prescription specifications are subject to local regulatory approvals and WHO-GMP guidelines in your jurisdiction.</li>
                <li>Inquiries submitted through this site do not constitute an immediate binding sale contract until formally confirmed by {COMPANY_INFO.name}.</li>
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
                  Intellectual Property Rights
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11">
                All content, brand assets, logos, product graphics, technical documentation, and layout designs on this platform are the exclusive intellectual property of <strong className="text-[#06233F] font-medium">{COMPANY_INFO.name}</strong>. Reproduction, distribution, or commercial exploitation without prior written consent is strictly prohibited.
              </p>
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
                  Institutional Inquiries & Supply Contracts
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11">
                For hospital supply orders, export arrangements, or contract manufacturing agreements:
              </p>
              <ul className="mt-3 space-y-2 pl-11 text-sm sm:text-base text-[#06233F]/70 font-light list-disc list-inside">
                <li>Parties must provide valid drug license details and official organization registration when requested.</li>
                <li>Formal terms regarding pricing, delivery schedules, and quality assurance protocols are governed by individual master service agreements (MSAs).</li>
              </ul>
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
                  Limitation of Liability
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11">
                {COMPANY_INFO.name} shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our website, technical delays, or reliance on information provided on the platform.
              </p>
            </div>

            <hr className="border-[#06233F]/10" />

            {/* Section 6 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#06233F] text-white font-mono text-xs font-bold flex items-center justify-center">
                  06
                </div>
                <h2
                  className="text-xl font-light text-[#06233F]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Governing Law & Jurisdiction
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#06233F]/70 font-light leading-relaxed pl-11">
                These Terms and Conditions are governed by and construed in accordance with the laws of <strong className="text-[#06233F] font-medium">{COMPANY_INFO.country}</strong>. Any legal action or proceeding arising out of or related to these terms shall be brought exclusively in the competent courts located in {COMPANY_INFO.country}.
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
                Questions Regarding Our <span className="italic font-normal text-[#216853]">Terms</span>?
              </h3>
              <p className="text-sm text-slate-300 font-light max-w-xl">
                Our legal and regulatory compliance team is available to address any inquiries regarding terms or institutional agreements.
              </p>
            </div>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] transition-all duration-300 shadow-lg shadow-[#216853]/25"
            >
              <Mail size={16} /> Email Legal Department
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}