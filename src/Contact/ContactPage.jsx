import React, { useState, useEffect } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  MessageSquare,
  Globe,
} from "lucide-react";

const FONT_ID = "novix-font-import";

const CONTACT_DETAILS = {
  location: "Shop No. 55, Near Punjab National Bank (PNB), Barara, Ambala, Haryana – 133201, India",
  email: "info@novixhealthcare.com",
  phone: "+91 8053868387",
  hours: "Mon - Sat: 9:00 AM - 6:00 PM IST",
};

const INQUIRY_TYPES = [
  "General Inquiry",
  "Institutional / Hospital Supply",
  "Contract Manufacturing & Export",
  "Quality & Regulatory Query",
  "Careers & HR",
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

export default function ContactPage() {
  useFonts();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: INQUIRY_TYPES[0],
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        inquiryType: INQUIRY_TYPES[0],
        message: "",
      });
    }, 3000);
  };

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
            Get In Touch
          </p>
          <h1 className="font-bold text-[38px] sm:text-[48px] md:text-[56px] leading-[1.1] tracking-tight text-[#06233F] mb-6">
            Let's Start a <span className="text-[#216853]">Conversation</span>
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#06233F]/70 leading-relaxed max-w-2xl mx-auto">
            Have questions about our sterile formulations, institutional orders, or partnership opportunities? Reach out to our dedicated support team.
          </p>
        </div>
      </header>

      {/* ================= MAIN CONTENT SECTION ================= */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Contact Card */}
            <div className="bg-[#06233F] text-white p-8 sm:p-10 rounded-[28px] shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#216853]/10 pointer-events-none" />

              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#216853] mb-8 font-mono">
                GET IN TOUCH
              </p>

              <div className="space-y-6 relative z-10">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#216853]/20 flex items-center justify-center shrink-0 border border-[#216853]/30">
                    <MapPin size={20} className="text-[#216853]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-wider uppercase text-white/50 font-mono mb-1">
                      Headquarters
                    </p>
                    <span className="text-[18px] font-semibold text-white">
                      {CONTACT_DETAILS.location}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#216853]/20 flex items-center justify-center shrink-0 border border-[#216853]/30">
                    <Mail size={20} className="text-[#216853]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-wider uppercase text-white/50 font-mono mb-1">
                      Email Us
                    </p>
                    <a
                      href={`mailto:${CONTACT_DETAILS.email}`}
                      className="text-[17px] font-semibold text-[#216853] hover:underline break-all"
                    >
                      {CONTACT_DETAILS.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#216853]/20 flex items-center justify-center shrink-0 border border-[#216853]/30">
                    <Phone size={20} className="text-[#216853]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-wider uppercase text-white/50 font-mono mb-1">
                      Call Us Directly
                    </p>
                    <a
                      href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, "")}`}
                      className="text-[18px] font-semibold text-[#216853] hover:underline"
                    >
                      {CONTACT_DETAILS.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white p-8 rounded-[28px] border border-[#06233F]/10 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center text-[#216853]">
                  <Clock size={18} />
                </div>
                <h3 className="text-[18px] font-bold text-[#06233F]">
                  Operating Hours
                </h3>
              </div>
              <p className="text-[14px] text-[#06233F]/70 leading-relaxed">
                {CONTACT_DETAILS.hours}
              </p>
              <p className="text-[12px] text-[#06233F]/50 mt-2 font-mono">
                Emergency institutional support is available 24/7 via phone.
              </p>
            </div>

            {/* Global Reach Highlight */}
            <div className="bg-white p-8 rounded-[28px] border border-[#06233F]/10 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center text-[#216853] shrink-0">
                <Globe size={22} />
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-[#06233F]">
                  WHO-GMP Certified Operations
                </h4>
                <p className="text-[13px] text-[#06233F]/70 mt-0.5">
                  Supplying critical care products with international quality compliance.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[28px] border border-[#06233F]/10 shadow-lg shadow-[#06233F]/5">
            <div className="mb-8">
              <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#216853] bg-[#F4F8F6] px-3 py-1 rounded-full border border-[#216853]/20 font-mono mb-3">
                Online Inquiry
              </span>
              <h2 className="text-[28px] font-bold text-[#06233F]">
                Send Us a Message
              </h2>
              <p className="text-[14px] text-[#06233F]/70 mt-1">
                Fill out the form below and our medical affairs or business team will get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 px-6 bg-[#F4F8F6] border border-[#216853]/30 rounded-[20px] text-center space-y-3">
                <CheckCircle2 size={48} className="mx-auto text-[#216853]" />
                <h3 className="text-[20px] font-bold text-[#06233F]">
                  Message Sent Successfully!
                </h3>
                <p className="text-[14px] text-[#06233F]/70 max-w-md mx-auto">
                  Thank you for reaching out to Novix Healthcare. A representative will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#06233F]/80 mb-2 font-mono">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="e.g. Dr. Rajesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#06233F]/10 text-[14px] text-[#06233F] focus:outline-none focus:border-[#216853] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#06233F]/80 mb-2 font-mono">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="name@organization.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#06233F]/10 text-[14px] text-[#06233F] focus:outline-none focus:border-[#216853] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#06233F]/80 mb-2 font-mono">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#06233F]/10 text-[14px] text-[#06233F] focus:outline-none focus:border-[#216853] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Company/Hospital */}
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#06233F]/80 mb-2 font-mono">
                      Organization / Hospital
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Organization Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#06233F]/10 text-[14px] text-[#06233F] focus:outline-none focus:border-[#216853] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Subject / Inquiry Type */}
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#06233F]/80 mb-2 font-mono">
                    Inquiry Type *
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#06233F]/10 text-[14px] text-[#06233F] focus:outline-none focus:border-[#216853] focus:bg-white transition-all cursor-pointer"
                  >
                    {INQUIRY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#06233F]/80 mb-2 font-mono">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    placeholder="Provide details about your inquiry or product requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#06233F]/10 text-[14px] text-[#06233F] focus:outline-none focus:border-[#216853] focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-[#216853] text-white font-bold text-[13px] uppercase tracking-[0.08em] hover:bg-[#184d3d] transition-all duration-300 shadow-lg shadow-[#216853]/25"
                >
                  <Send size={16} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}