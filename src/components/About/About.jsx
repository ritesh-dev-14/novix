import {
  ShieldCheck, FlaskConical, Truck, Handshake, Target, Eye, Factory,
  ClipboardCheck, Package, Boxes, Scale, Lightbulb, HeartPulse, Clock,
  Building2, Stethoscope, Landmark, FileCheck, MapPin, Phone, Mail,
  Globe, ArrowRight, Send
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import factory from "../../assets/factory.png";

/* ---------- hooks ---------- */

function useFonts() {
  useEffect(() => {
    const fontId = "inter-font-stylesheet";
    if (document.getElementById(fontId)) return;
    
    const link = document.createElement("link");
    link.id = fontId;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ---------- shared building blocks ---------- */

function Reveal({ children, delay = 0, y = 22, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 0.8, 0.24, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#216853] mb-4 font-mono">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[#06233F]/10" />;
}

/* ============================================================ */

export default function About() {
  useFonts();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="relative w-full max-w-full overflow-x-hidden min-h-screen bg-[#F8FAFC] text-[#06233F] font-['Inter'] font-normal pt-20 m-0 p-0">
      {/* ================= SECTION 1 — HERO ================= */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-24">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-14 items-center">
          <Reveal>
            <Eyebrow>About Novix Healthcare</Eyebrow>
            <h1 className="text-[40px] sm:text-[52px] md:text-[60px] font-bold tracking-tight leading-[1.08] text-[#06233F] mb-6">
              Advancing healthcare through high-quality injectable medicines.
            </h1>
            <p className="text-[17px] md:text-[19px] text-[#06233F]/75 leading-relaxed max-w-xl mb-8">
              Manufactured with uncompromising quality standards, for
              hospitals, healthcare professionals, and distribution partners
              who cannot afford to compromise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#216853] !text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-[#184d3d] transition-all duration-300 shadow-md shadow-[#216853]/20"
              >
                <span className="!text-white">Explore Products</span>
                <ArrowRight size={15} className="!text-white" />
              </Link>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#06233F]/20 text-[#06233F] font-semibold text-[13px] uppercase tracking-[0.08em] hover:border-[#216853] hover:text-[#216853] transition-colors duration-300 bg-white/50"
              >
                Contact Us
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-[24px] overflow-hidden border border-[#06233F]/10 shadow-xl shadow-[#06233F]/5 bg-white p-2">
              <img
                src={factory}
                alt="Novix Healthcare manufacturing facility"
                className="w-full h-[380px] md:h-[460px] object-cover rounded-[18px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= SECTION 2 — OUR STORY ================= */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <Reveal>
            <h2 className="text-[32px] md:text-[42px] font-bold text-[#06233F] tracking-tight leading-[1.15] max-w-md">
              Built on Quality. Driven by Responsibility.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 max-w-xl">
              <p className="text-[16px] md:text-[17px] text-[#06233F]/80 leading-relaxed font-normal">
                Novix Healthcare is dedicated to manufacturing and supplying
                high-quality injectable pharmaceutical formulations. Our
                commitment to scientific excellence, regulatory compliance,
                and ethical business practices enables us to deliver reliable
                healthcare solutions that meet the evolving needs of medical
                professionals and patients.
              </p>
              <p className="text-[15px] text-[#06233F]/60 leading-relaxed">
                Every formulation that leaves our facility carries the same
                standard — because in critical care, there is no room for
                inconsistency.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 3 — MISSION & VISION ================= */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Target,
              title: "Mission",
              text: "Deliver safe, effective, and affordable injectable medicines through world-class manufacturing, continuous innovation, and uncompromising quality.",
            },
            {
              icon: Eye,
              title: "Vision",
              text: "Become a globally trusted pharmaceutical company recognised for manufacturing excellence, patient safety, and long-term partnerships.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="h-full rounded-[20px] border border-[#06233F]/10 bg-white p-10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center mb-6">
                    <Icon size={24} strokeWidth={1.8} className="text-[#216853]" />
                  </div>
                  <h3 className="text-[22px] font-bold text-[#06233F] mb-3">{item.title}</h3>
                  <p className="text-[15px] text-[#06233F]/70 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 4 — WHAT MAKES NOVIX DIFFERENT ================= */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>What Makes Novix Different</Eyebrow>
          <h2 className="text-[30px] md:text-[38px] font-bold text-[#06233F] tracking-tight leading-tight max-w-2xl mb-14">
            Consistency you can build a hospital pharmacy around.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "WHO-GMP Manufacturing",
              text: "Manufactured under strict international quality standards.",
            },
            {
              icon: FlaskConical,
              title: "Quality Assurance",
              text: "Every batch undergoes rigorous quality testing before release.",
            },
            {
              icon: Truck,
              title: "Trusted Supply Chain",
              text: "Reliable manufacturing and distribution for healthcare institutions.",
            },
            {
              icon: Handshake,
              title: "Customer Commitment",
              text: "Long-term partnerships built on transparency, consistency, and service.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="h-full bg-white border border-[#06233F]/10 rounded-[20px] p-8 shadow-sm hover:border-[#216853]/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-lg bg-[#F4F8F6] flex items-center justify-center mb-6">
                    <Icon size={22} strokeWidth={1.8} className="text-[#216853]" />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#06233F] mb-2 leading-snug">{item.title}</h3>
                  <p className="text-[14px] text-[#06233F]/65 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 5 — MANUFACTURING EXCELLENCE ================= */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>Manufacturing Excellence</Eyebrow>
          <h2 className="text-[30px] md:text-[38px] font-bold text-[#06233F] tracking-tight leading-tight max-w-2xl mb-16">
            From raw material to your pharmacy shelf.
          </h2>
        </Reveal>

        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-[27px] h-0.5 bg-[#06233F]/10" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-y-10 gap-x-4">
            {[
              { icon: Boxes, label: "Raw Material" },
              { icon: Factory, label: "Manufacturing" },
              { icon: FlaskConical, label: "Sterility Testing" },
              { icon: ClipboardCheck, label: "Quality Control" },
              { icon: Package, label: "Packaging" },
              { icon: Truck, label: "Distribution" },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.label} delay={i * 0.07}>
                  <div className="flex flex-col items-start md:items-center md:text-center">
                    <div className="relative z-10 w-[54px] h-[54px] rounded-full border border-[#216853]/30 bg-white shadow-sm flex items-center justify-center mb-4">
                      <Icon size={22} strokeWidth={1.8} className="text-[#216853]" />
                    </div>
                    <p className="text-[13.5px] font-semibold text-[#06233F]">{step.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 6 — WHY PROFESSIONALS TRUST US ================= */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>Why Healthcare Professionals Trust Us</Eyebrow>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-10">
          {[
            "WHO-GMP Certified",
            "100% Batch Tested",
            "Hospital Grade",
            "Manufacturing Excellence",
            "Trusted Distribution",
          ].map((label, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div className="border-t-2 border-[#216853] pt-6">
                <p className="text-[18px] font-bold text-[#06233F] leading-snug">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 7 — CORE VALUES ================= */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>Core Values</Eyebrow>
          <h2 className="text-[30px] md:text-[38px] font-bold text-[#06233F] tracking-tight leading-tight max-w-2xl mb-14">
            The principles behind every batch.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { icon: ShieldCheck, title: "Quality" },
            { icon: Scale, title: "Integrity" },
            { icon: Lightbulb, title: "Innovation" },
            { icon: HeartPulse, title: "Patient Safety" },
            { icon: Clock, title: "Reliability" },
          ].map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="rounded-[18px] border border-[#06233F]/10 bg-white p-8 text-center shadow-sm">
                  <Icon size={24} strokeWidth={1.8} className="text-[#216853] mx-auto mb-4" />
                  <p className="text-[15px] font-bold text-[#06233F]">{v.title}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 8 — INDUSTRIES WE SERVE ================= */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>Industries We Serve</Eyebrow>
        </Reveal>
        <div className="flex flex-wrap gap-4 mt-8">
          {[
            { icon: Building2, label: "Hospitals" },
            { icon: Stethoscope, label: "Healthcare Institutions" },
            { icon: Truck, label: "Medical Distributors" },
            { icon: Landmark, label: "Government Supply" },
            { icon: Handshake, label: "Pharmaceutical Partners" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} delay={i * 0.06}>
                <div className="flex items-center gap-3 rounded-full border border-[#06233F]/15 bg-white px-6 py-3.5 shadow-sm">
                  <Icon size={18} strokeWidth={1.8} className="text-[#216853]" />
                  <span className="text-[14px] font-semibold text-[#06233F]">{item.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 9 — CERTIFICATIONS ================= */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-24 text-center">
        <Reveal>
          <Eyebrow>Certifications</Eyebrow>
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#06233F] tracking-tight mb-12">
            Standards we hold ourselves to.
          </h2>
        </Reveal>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { icon: ShieldCheck, label: "WHO-GMP" },
            { icon: Factory, label: "Quality Manufacturing" },
            { icon: FlaskConical, label: "Sterile Production" },
            { icon: FileCheck, label: "Regulatory Compliance" },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.label} delay={i * 0.07}>
                <div className="flex items-center gap-2.5 rounded-full border border-[#216853]/30 bg-[#F4F8F6] px-6 py-3">
                  <Icon size={18} strokeWidth={1.8} className="text-[#216853]" />
                  <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#06233F]">
                    {c.label}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ================= CONTACT ================= */}
      <section id="contact" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>Get In Touch</Eyebrow>
          <h2 className="text-[32px] md:text-[44px] font-bold text-[#06233F] tracking-tight leading-tight max-w-2xl mb-5">
            Let's build better healthcare together.
          </h2>
          <p className="text-[16px] text-[#06233F]/70 max-w-xl leading-relaxed mb-16">
            Whether you're a hospital, distributor, healthcare institution, or
            business partner, our team is ready to assist you with product
            inquiries and partnership opportunities.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[0.8fr,1.2fr] gap-14">
          {/* Contact info */}
          <Reveal>
            <div className="space-y-8">
              {[
                { icon: MapPin, label: "Office Address", value: "Shop No. 55, Near Punjab National Bank (PNB), Barara, Ambala, Haryana – 133201, India" },
                { icon: Phone, label: "Phone", value: "+91 8053868387" },
                { icon: Mail, label: "Email", value: "info@novixhealthcare.com" },
                { icon: Clock, label: "Business Hours", value: "Mon – Sat, 9:00 AM – 6:00 PM" },
                { icon: Globe, label: "Website", value: "www.novixhealthcare.com" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-[#216853]/20 bg-[#F4F8F6] flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#216853]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#06233F]/50 mb-1 font-mono">
                        {c.label}
                      </p>
                      <p className="text-[15px] font-semibold text-[#06233F]">{c.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-[24px] border border-[#06233F]/10 bg-white p-8 md:p-10 shadow-sm"
            >
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-[14px] text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] transition-colors"
                />
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-[14px] text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] transition-colors"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-[14px] text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] transition-colors"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-[14px] text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] transition-colors"
                />
              </div>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full mb-5 rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-[14px] text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] transition-colors"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={5}
                required
                className="w-full mb-6 rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-[14px] text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] transition-colors resize-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#216853] !text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-[#184d3d] transition-all duration-300 shadow-md shadow-[#216853]/20"
              >
                <Send size={14} className="!text-white" />
                <span className="!text-white">Send Message</span>
              </button>
              {sent && (
                <p className="mt-4 text-[13.5px] font-semibold text-[#216853]">
                  Thank you — we've received your message and will be in touch shortly.
                </p>
              )}
            </form>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={0.15} className="mt-10">
          <div className="rounded-[20px] overflow-hidden border border-[#06233F]/10 shadow-sm bg-white p-2">
            <iframe
              title="Novix Healthcare location"
              src="https://www.google.com/maps?q=India&output=embed"
              className="w-full h-[320px] border-0 rounded-[14px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="w-full bg-[#06233F] text-white py-24 text-center mb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold tracking-tight leading-[1.1] max-w-2xl mx-auto mb-6 !text-white">
              Ready to partner with Novix Healthcare?
            </h2>
            <p className="text-[16px] text-slate-300 max-w-xl mx-auto leading-relaxed mb-10">
              Delivering trusted injectable medicines with uncompromising
              quality and manufacturing excellence.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-[#184d3d] transition-all duration-300 shadow-lg shadow-[#216853]/30"
              >
                <span className="!text-white">Explore Products</span>
                <ArrowRight size={15} className="!text-white" />
              </Link>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-white/10 transition-colors duration-300"
              >
                Contact Our Team
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}