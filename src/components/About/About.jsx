import {
  ShieldCheck,
  FlaskConical,
  Truck,
  Handshake,
  Target,
  Eye,
  Factory,
  ClipboardCheck,
  Package,
  Boxes,
  Scale,
  Lightbulb,
  HeartPulse,
  Clock,
  Building2,
  Stethoscope,
  Landmark,
  FileCheck,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  Send,
  Loader2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import factory from "../../assets/factory.png";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";

const FONT_ID = "editorial-fonts";

/* ---------- HOOKS ---------- */

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

/* ---------- ANIMATION & INTERACTIVE COMPONENTS ---------- */

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

function Eyebrow({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-4 flex items-center gap-2"
    >
      <span className="w-2 h-2 rounded-full bg-[#216853] animate-ping" />
      {children}
    </motion.p>
  );
}

function Divider() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 my-4">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#06233F]/15 to-transparent" />
    </div>
  );
}

/* 3D Magnetic Interactive Tilt Card */
function TiltCard({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
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
      className={`relative transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
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
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  const formRef = useRef();
  const containerRef = useRef();

  // Background Interactive Light Tracker
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

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);

    try {
      await emailjs.sendForm(
        "service_1ffcqqb",
        "template_66a2484",
        formRef.current,
        "TNb42PIBqGgV9OuhM"
      );

      setLoading(false);
      setSent(true);

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 4000);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  const manufacturingSteps = [
    { icon: Boxes, label: "Raw Material", desc: "Rigorous inspection of active raw ingredients." },
    { icon: Factory, label: "Manufacturing", desc: "Automated, untouched sterile formulation batch production." },
    { icon: FlaskConical, label: "Sterility Testing", desc: "Advanced incubation testing for absolute biological purity." },
    { icon: ClipboardCheck, label: "Quality Control", desc: "Chemical, assay, and physicochemical verification." },
    { icon: Package, label: "Packaging", desc: "Protected hermetic sealing and tamper-proof tagging." },
    { icon: Truck, label: "Distribution", desc: "Temperature-monitored logistically synchronized delivery." },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative w-full max-w-full overflow-x-hidden min-h-screen bg-[#F8FAFC] text-[#06233F]/80 pt-20 m-0 p-0"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Interactive Cursor Lighting Effect */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] bg-radial from-[#216853]/10 via-transparent to-transparent rounded-full blur-3xl z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${cursorPos.x - 300}px, ${cursorPos.y - 300}px)`,
        }}
      />

      {/* Grid Overlay Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h80v80H0z' fill='none'/%3E%3Cpath d='M0 80h80M80 0v80' stroke='%2306233F' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
      />

      <Helmet>
        <title>About Novix Healthcare | Quality Injectable Pharmaceutical Solutions</title>
        <meta
          name="description"
          content="Learn about Novix Healthcare, our commitment to quality injectable pharmaceutical solutions, scientific excellence, regulatory compliance, and trusted healthcare partnerships."
        />
        <meta
          name="keywords"
          content="Novix Healthcare, About Novix, Injectable Pharmaceuticals, Healthcare Company, Pharmaceutical Company India"
        />
        <link rel="canonical" href="https://novixhealthcare.com/about" />
        <meta property="og:title" content="About Novix Healthcare" />
        <meta
          property="og:description"
          content="Discover Novix Healthcare's commitment to quality, innovation, regulatory compliance, and trusted pharmaceutical partnerships."
        />
        <meta property="og:url" content="https://novixhealthcare.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://novixhealthcare.com/og-image.jpg" />
        <meta name="twitter:title" content="About Novix Healthcare" />
        <meta
          name="twitter:description"
          content="Learn about Novix Healthcare and our commitment to delivering high-quality injectable pharmaceutical solutions."
        />
        <meta name="twitter:image" content="https://novixhealthcare.com/og-image.jpg" />
      </Helmet>

      {/* ================= SECTION 1 — HERO ================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-24">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-14 items-center">
          <Reveal>
            <Eyebrow>About Novix Healthcare</Eyebrow>
            <h1
              className="font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-[#06233F] mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Advancing healthcare through{" "}
              <span className="italic font-normal text-[#216853] relative inline-block">
                high-quality
                <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#216853]/30 rounded-full" />
              </span>{" "}
              injectable medicines.
            </h1>
            <p className="text-base md:text-lg text-[#06233F]/75 font-light leading-relaxed max-w-xl mb-8">
              Manufactured with uncompromising quality standards, for hospitals, healthcare professionals, and distribution partners who cannot afford to compromise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#216853] !text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] transition-all duration-300 shadow-md shadow-[#216853]/20 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 !text-white">Explore Products</span>
                <ArrowRight size={15} className="relative z-10 !text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#06233F]/20 text-[#06233F] font-semibold text-xs uppercase tracking-[0.2em] hover:border-[#216853] hover:text-[#216853] hover:bg-white transition-all duration-300 bg-white/60 backdrop-blur-sm active:scale-95"
              >
                Contact Us
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <TiltCard className="rounded-[28px] p-2 bg-white/80 backdrop-blur-md border border-[#06233F]/10 shadow-2xl shadow-[#06233F]/5">
              <div className="relative overflow-hidden rounded-[20px] group">
                <img
                  src={factory}
                  alt="Novix Healthcare manufacturing facility"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[380px] md:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06233F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-[#216853]" />
                    <span className="text-xs font-semibold tracking-wider uppercase">State-of-the-art sterile manufacturing</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ================= SECTION 2 — OUR STORY ================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl font-light text-[#06233F] tracking-tight leading-tight max-w-md"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Built on Quality.{" "}
              <span className="italic font-normal text-[#216853]">Driven</span> by Responsibility.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 max-w-xl">
              <p className="text-base md:text-lg text-[#06233F]/75 font-light leading-relaxed">
                Novix Healthcare is dedicated to manufacturing and supplying high-quality injectable pharmaceutical formulations. Our commitment to scientific excellence, regulatory compliance, and ethical business practices enables us to deliver reliable healthcare solutions that meet the evolving needs of medical professionals and patients.
              </p>
              <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                Every formulation that leaves our facility carries the same standard — because in critical care, there is no room for inconsistency.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 3 — MISSION & VISION ================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="grid md:grid-cols-2 gap-8">
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
                <TiltCard className="h-full">
                  <div className="h-full rounded-[24px] border border-[#06233F]/10 bg-white/80 backdrop-blur-md p-10 shadow-sm hover:shadow-xl hover:border-[#216853]/40 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center mb-6 text-[#216853] transition-transform duration-300 group-hover:scale-110">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>
                    <h3
                      className="text-2xl font-light text-[#06233F] mb-3"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 4 — WHAT MAKES NOVIX DIFFERENT ================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>What Makes Novix Different</Eyebrow>
          <h2
            className="text-3xl md:text-5xl font-light text-[#06233F] tracking-tight leading-tight max-w-2xl mb-14"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Consistency you can build a hospital{" "}
            <span className="italic font-normal text-[#216853]">pharmacy</span> around.
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
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full bg-white/90 backdrop-blur-md border border-[#06233F]/10 rounded-[22px] p-8 shadow-sm hover:shadow-xl hover:border-[#216853]/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F4F8F6] flex items-center justify-center mb-6 group-hover:bg-[#216853] transition-colors duration-300">
                    <Icon size={22} strokeWidth={1.8} className="text-[#216853] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3
                    className="text-xl font-light text-[#06233F] mb-2 leading-snug group-hover:text-[#216853] transition-colors duration-300"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#06233F]/65 font-light leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 5 — MANUFACTURING EXCELLENCE ================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>Manufacturing Excellence</Eyebrow>
          <h2
            className="text-3xl md:text-5xl font-light text-[#06233F] tracking-tight leading-tight max-w-2xl mb-16"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            From raw material to your pharmacy{" "}
            <span className="italic font-normal text-[#216853]">shelf.</span>
          </h2>
        </Reveal>

        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-[27px] h-0.5 bg-gradient-to-r from-[#06233F]/5 via-[#216853]/30 to-[#06233F]/5" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-y-10 gap-x-4">
            {manufacturingSteps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              return (
                <Reveal key={step.label} delay={i * 0.07}>
                  <div
                    onMouseEnter={() => setActiveStep(i)}
                    onMouseLeave={() => setActiveStep(null)}
                    className="flex flex-col items-start md:items-center md:text-center group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`relative z-10 w-[58px] h-[58px] rounded-full border transition-all duration-300 flex items-center justify-center mb-4 ${
                        isActive
                          ? "border-[#216853] bg-[#216853] text-white shadow-lg shadow-[#216853]/30"
                          : "border-[#216853]/30 bg-white shadow-sm text-[#216853] group-hover:border-[#216853]"
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </motion.div>
                    <p className="text-xs font-semibold text-[#06233F] uppercase tracking-[0.18em] group-hover:text-[#216853] transition-colors duration-300 mb-1">
                      {step.label}
                    </p>
                    <p className="text-[11px] text-[#06233F]/50 font-light max-w-[140px] hidden md:block">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 6 — WHY PROFESSIONALS TRUST US ================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
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
              <motion.div
                whileHover={{ x: 5 }}
                className="border-t-2 border-[#216853] pt-6 group cursor-default"
              >
                <p
                  className="text-xl font-light text-[#06233F] leading-snug group-hover:text-[#216853] transition-colors duration-300"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {label}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 7 — CORE VALUES ================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>Core Values</Eyebrow>
          <h2
            className="text-3xl md:text-5xl font-light text-[#06233F] tracking-tight leading-tight max-w-2xl mb-14"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            The principles behind{" "}
            <span className="italic font-normal text-[#216853]">every batch.</span>
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
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-[20px] border border-[#06233F]/10 bg-white/90 backdrop-blur-sm p-8 text-center shadow-sm hover:shadow-xl hover:border-[#216853]/40 transition-all duration-300 group"
                >
                  <Icon size={26} strokeWidth={1.8} className="text-[#216853] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p
                    className="text-lg font-light text-[#06233F] group-hover:text-[#216853] transition-colors duration-300"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {v.title}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 8 — INDUSTRIES WE SERVE ================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 rounded-full border border-[#06233F]/15 bg-white/80 backdrop-blur-sm px-6 py-3.5 shadow-sm hover:border-[#216853] hover:shadow-md transition-all duration-300 cursor-default"
                >
                  <Icon size={18} strokeWidth={1.8} className="text-[#216853]" />
                  <span className="text-xs font-semibold text-[#06233F] uppercase tracking-[0.2em]">{item.label}</span>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ================= SECTION 9 — CERTIFICATIONS ================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24 text-center">
        <Reveal>
          <Eyebrow>Certifications</Eyebrow>
          <h2
            className="text-3xl md:text-5xl font-light text-[#06233F] tracking-tight mb-12"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Standards we hold{" "}
            <span className="italic font-normal text-[#216853]">ourselves</span> to.
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2.5 rounded-full border border-[#216853]/30 bg-[#F4F8F6] px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Icon size={18} strokeWidth={1.8} className="text-[#216853]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#06233F]">
                    {c.label}
                  </span>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ================= CONTACT ================= */}
      <section id="contact" className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>Get In Touch</Eyebrow>
          <h2
            className="text-3xl md:text-5xl font-light text-[#06233F] tracking-tight leading-tight max-w-2xl mb-5"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Let's build better healthcare{" "}
            <span className="italic font-normal text-[#216853]">together.</span>
          </h2>
          <p className="text-base text-[#06233F]/70 font-light max-w-xl leading-relaxed mb-16">
            Whether you're a hospital, distributor, healthcare institution, or business partner, our team is ready to assist you with product inquiries and partnership opportunities.
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
                  <motion.div
                    key={c.label}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full border border-[#216853]/20 bg-[#F4F8F6] flex items-center justify-center shrink-0 group-hover:bg-[#216853] transition-colors duration-300">
                      <Icon size={18} className="text-[#216853] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#216853] mb-1">
                        {c.label}
                      </p>
                      <p className="text-sm font-semibold text-[#06233F]">{c.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.1}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-[#06233F]/10 bg-white/80 backdrop-blur-md p-8 md:p-10 shadow-xl shadow-[#06233F]/5"
            >
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-sm text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] focus:ring-2 focus:ring-[#216853]/20 transition-all duration-300"
                />
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-sm text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] focus:ring-2 focus:ring-[#216853]/20 transition-all duration-300"
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
                  className="w-full rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-sm text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] focus:ring-2 focus:ring-[#216853]/20 transition-all duration-300"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-sm text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] focus:ring-2 focus:ring-[#216853]/20 transition-all duration-300"
                />
              </div>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full mb-5 rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-sm text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] focus:ring-2 focus:ring-[#216853]/20 transition-all duration-300"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={5}
                required
                className="w-full mb-6 rounded-xl border border-[#06233F]/15 bg-white px-4 py-3.5 text-sm text-[#06233F] placeholder:text-[#06233F]/40 focus:outline-none focus:border-[#216853] focus:ring-2 focus:ring-[#216853]/20 transition-all duration-300 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] active:scale-95 transition-all duration-300 shadow-md shadow-[#216853]/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin !text-white" />
                    <span className="!text-white">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} className="!text-white" />
                    <span className="!text-white">Send Message</span>
                  </>
                )}
              </button>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#216853]"
                >
                  <CheckCircle2 size={16} />
                  <span>Thank you! Your message has been sent successfully.</span>
                </motion.div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative z-10 w-full bg-[#06233F] text-white py-24 text-center mb-0 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#216853]/30 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] max-w-2xl mx-auto mb-6 !text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Ready to partner with <span className="italic font-normal text-[#216853]">Novix</span> Healthcare?
            </h2>
            <p className="text-base text-slate-300 font-light max-w-xl mx-auto leading-relaxed mb-10">
              Delivering trusted injectable medicines with uncompromising quality and manufacturing excellence.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#216853]/30"
              >
                <span className="!text-white">Explore Products</span>
                <ArrowRight size={15} className="!text-white" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm"
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
