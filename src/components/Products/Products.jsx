import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Microscope,
  CheckCircle2,
  Building2,
  X,
  FileText,
  Mail,
  ArrowRight,
  Award,
  Users,
  Truck,
  Boxes,
} from "lucide-react";
import img1 from "../../Images/NORA.png";
import img2 from "../../Images/AMIKA.png";
import img3 from "../../Images/CEF1MG.png";
import img4 from "../../Images/CEFO.png";
import img5 from "../../Images/HEPARIN.png";
import img6 from "../../Images/ONDA.png";
import img7 from "../../Images/40mg.png";
import img8 from "../../Images/DOXY.png";
import img9 from "../../Images/paracetamol.png";
import img10 from "../../Images/multivitamin.png";
import img11 from "../../Images/trane.png";
import img12 from "../../Images/sulbactum.png";
import img13 from "../../Images/hepa.png";
import img14 from "../../Images/infussion.png";
import img15 from "../../Images/amo.png";
import img16 from "../../Images/nora2.png";
import { useNavigate } from "react-router-dom";

const FONT_ID = "novix-font-import";

const categories = [
  "All",
  "Injectable Antibiotics",
  "Critical Care",
  "Gastrointestinal",
  "Pain & Fever",
  "Supportive Care",
];

const productData = [
  {
    id: 1,
    category: "Injectable Antibiotics",
    name: "LBPC",
    generic:
      "NORADRENALINE BITARTRATE INJECTION IP (STERILE NORADRENALINE CONCENTRATE 4mg)",
    strength: "4MG",
    image: img1,
    description:
      "Used in emergency care to quickly stabilise blood pressure. Made under strict sterile conditions so hospitals can trust every vial.",
  },
  {
    id: 2,
    category: "Injectable Antibiotics",
    name: "MULTI-DR",
    generic: "AMIKACIN INJECTION",
    strength: "500MG",
    image: img2,
    description:
      "A dependable antibiotic for serious infections that don't respond to common treatments. Hospital-grade sterility, every batch.",
  },
  {
    id: 3,
    category: "Injectable Antibiotics",
    name: "CEFVIX",
    generic: "CEFTRIAXONE INJECTION",
    strength: "1GM",
    image: img3,
    description:
      "A widely trusted antibiotic for serious bacterial infections. Dissolves quickly, so it's ready when every minute counts.",
  },
  {
    id: 4,
    category: "Injectable Antibiotics",
    name: "CEFVIX-SB",
    generic: "CEFTRIAXONE + SULBACTUM INJECTION",
    strength: "1.5 GM",
    image: img4,
    description:
      "A stronger combination for infections that need extra support. Built for hospitals treating tougher cases.",
  },
  {
    id: 5,
    category: "Critical Care",
    name: "O-CLOT 25000 IU",
    generic: "HEPARIN 25000 IU",
    strength: "25000 IU",
    image: img5,
    description:
      "Helps prevent dangerous blood clots in critical care and surgery. Every batch is tested for consistent strength.",
  },
  {
    id: 6,
    category: "Gastrointestinal",
    name: "NOVISET",
    generic: "ONDANSETRON INJECTION",
    strength: "2ML",
    image: img6,
    description:
      "Gives fast relief from nausea after surgery or chemotherapy. Gentle, reliable, and easy to administer.",
  },
  {
    id: 7,
    category: "Gastrointestinal",
    name: "NOVPRA",
    generic: "PANTAPRAZOLE 40 MG",
    strength: "40 MG",
    image: img7,
    description:
      "Used for serious stomach bleeding and ulcers when a patient can't take tablets. A trusted IV option for doctors.",
  },
  {
    id: 8,
    category: "Injectable Antibiotics",
    name: "DOXVIX",
    generic: "DOXYCYCLINE 100 MG",
    strength: "100 MG",
    image: img8,
    description:
      "A well-established antibiotic for IV use, formulated for steady, reliable absorption in the body.",
  },
  {
    id: 9,
    category: "Pain & Fever",
    name: "NFEVO",
    generic: "PARACETAMOL INJECTION",
    strength: "150MG/2ML",
    image: img9,
    description:
      "Brings down fever and pain quickly for patients who need fast relief on the ward.",
  },
  {
    id: 10,
    category: "Supportive Care",
    name: "N-VIT",
    generic: "MULTIVITAMIN 10ML",
    strength: "10ML",
    image: img10,
    description:
      "A complete vitamin support shot to help patients recover strength during treatment.",
  },
  {
    id: 11,
    category: "Critical Care",
    name: "NOVIX-TX",
    generic: "TRANEXAMIC ACID 500MG/5ML",
    strength: "500MG/5ML",
    image: img11,
    description:
      "Helps control severe bleeding — an essential medicine for trauma and surgery teams.",
  },
  {
    id: 12,
    category: "Injectable Antibiotics",
    name: "CEFVIX-SB",
    generic: "CEFTRIXONE + SULBACTUM 1.5GM",
    strength: "1.5GM",
    image: img12,
    description:
      "A two-in-one antibiotic formula for serious infections, made in our dedicated manufacturing unit.",
  },
  {
    id: 13,
    category: "Critical Care",
    name: "0-CLOT",
    generic: "HEPARIN 5000 IU",
    strength: "5000 IU",
    image: img13,
    description:
      "A standard dose to prevent clots after surgery and keep IV lines working smoothly.",
  },
  {
    id: 14,
    category: "Pain & Fever",
    name: "NFEVO IV",
    generic: "PARACETAMOL INFUSSION",
    strength: "100ML",
    image: img14,
    description:
      "A ready-to-use IV drip for fast, effective pain and fever relief after surgery.",
  },
  {
    id: 15,
    category: "Injectable Antibiotics",
    name: "N-CLAV",
    generic: "AMOXYCILLIN + CLAVULANATE",
    strength: "1.2 GM",
    image: img15,
    description:
      "A trusted broad-spectrum antibiotic, manufactured to WHO-GMP purity standards you can rely on.",
  },
  {
    id: 16,
    category: "Injectable Antibiotics",
    name: "LBPC",
    generic:
      "NORADRENALINE BITARTRATE INJECTION IP (STERILE NORADRENALINE CONCENTRATE 2ml)",
    strength: "2ML",
    image: img16,
    description:
      "Used in emergency care to quickly stabilise blood pressure. Made under strict sterile conditions so hospitals can trust every vial.",
  },
];

const STATS = [
  { icon: Boxes, value: "15+", label: "Formulations" },
  { icon: Users, value: "500+", label: "Hospitals & clinics served" },
  { icon: Award, value: "WHO-GMP", label: "Certified facility" },
  { icon: Truck, value: "Pan-India", label: "Delivery network" },
];

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "WHO-GMP Certified",
    text: "Our facility meets WHO Good Manufacturing Practice standards, checked and re-checked.",
  },
  {
    icon: Microscope,
    title: "Every Batch Tested",
    text: "No batch leaves our facility without passing quality and sterility testing.",
  },
  {
    icon: Building2,
    title: "Built for Hospitals",
    text: "Packaging, dosing and supply designed around how hospitals actually work.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    text: "We plan supply in advance so wards never run short when it matters.",
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

export default function NovixProductsPage() {
  useFonts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProduct, setActiveProduct] = useState(null);

  const filteredProducts =
    activeCategory === "All"
      ? productData
      : productData.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (!activeProduct) return;
    const onKey = (e) => e.key === "Escape" && setActiveProduct(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeProduct]);

  const nav = useNavigate()

  return (
    <div className="relative min-h-screen w-full text-[#06233F]/80 font-['Inter'] bg-[#F8FAFC]">
      {/* Subtle Grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v100M30 0v100M50 0v100M70 0v100M90 0v100M0 10h100M0 30h100M0 50h100M0 70h100M0 90h100' stroke='%2306233F' stroke-width='1' fill='none'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%2306233F'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ================= HERO ================= */}
      <header className="relative z-10 bg-[#F8FAFC] w-full pt-16">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-20 grid lg:grid-cols-[1.3fr,1fr] gap-16 items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#216853] mb-4 font-mono">
              Novix Healthcare · Product Portfolio
            </p>
            <h1 className="font-bold text-[40px] sm:text-[52px] md:text-[62px] leading-[1.08] tracking-tight text-[#06233F] mb-6">
              Medicines hospitals <span className="text-[#216853]">count on.</span>
            </h1>
            <p className="text-[17px] md:text-[19px] text-[#06233F]/75 max-w-xl leading-relaxed mb-8">
              We manufacture sterile injectables for hospitals and clinics
              across India — tested carefully, packed with care, and delivered
              on time, every time.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#216853] !text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-[#184d3d] transition-all duration-300 shadow-md shadow-[#216853]/20"
              >
                <span className="!text-white">Browse Products</span>
                <ArrowRight size={15} className="!text-white" />
              </a>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#06233F]/20 text-[#06233F] font-semibold text-[13px] uppercase tracking-[0.08em] hover:border-[#216853] hover:text-[#216853] transition-colors duration-300 bg-white/50">
                <FileText size={15} />
                Download Catalogue
              </button>
            </div>
          </div>

          {/* WHO-GMP Information Card */}
          <div className="rounded-[24px] border border-[#06233F]/10 bg-white p-8 shadow-xl shadow-[#06233F]/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center">
                <ShieldCheck size={22} className="text-[#216853]" />
              </div>
              <div>
                <p className="text-[#06233F] font-bold text-[17px] leading-tight mb-1">
                  WHO-GMP Certified
                </p>
                <p className="text-[#06233F]/60 text-[13px]">
                  Manufacturing facility
                </p>
              </div>
            </div>
            <div className="h-px bg-[#06233F]/10 mb-6" />
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[14px] text-[#06233F]/80 font-medium">
                <CheckCircle2 size={18} className="text-[#216853] shrink-0" />{" "}
                Batch-tested for purity and sterility
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#06233F]/80 font-medium">
                <CheckCircle2 size={18} className="text-[#216853] shrink-0" />{" "}
                Proudly made in India
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#06233F]/80 font-medium">
                <CheckCircle2 size={18} className="text-[#216853] shrink-0" />{" "}
                Trusted by 500+ hospitals & clinics
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Row */}
        <div className="border-y border-[#06233F]/10 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F4F8F6] flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#216853]" />
                  </div>
                  <div>
                    <p className="text-[24px] text-[#06233F] font-bold leading-none mb-1">
                      {s.value}
                    </p>
                    <p className="text-[11px] text-[#06233F]/60 font-bold uppercase tracking-wider leading-snug">
                      {s.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* ================= CATALOGUE ================= */}
      <main id="catalogue" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#216853] mb-3 font-mono">
                Our Range
              </p>
              <h2 className="text-[32px] md:text-[42px] font-bold text-[#06233F] tracking-tight leading-tight">
                Browse by category
              </h2>
            </div>
            <p className="text-[15px] text-[#06233F]/70 max-w-sm leading-relaxed">
              Every product below is WHO-GMP manufactured and quality-tested
              before it reaches you.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2.5 mb-14">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                    active
                      ? "bg-[#06233F] !text-white border border-[#06233F] shadow-sm"
                      : "bg-white text-[#06233F]/70 border border-[#06233F]/15 hover:border-[#216853] hover:text-[#216853]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-[20px] border border-[#06233F]/10 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-[#216853]/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* WHO-GMP corner badge */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-[#F4F8F6] border border-[#216853]/20 px-3 py-1">
                  <ShieldCheck size={12} className="text-[#216853]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#06233F]">
                    WHO-GMP
                  </span>
                </div>

                <div className="h-64 flex items-center justify-center bg-[#F8FAFC] p-8 border-b border-[#06233F]/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#216853] mb-2 font-mono">
                    {product.category}
                  </p>
                  <h3 className="text-[22px] font-bold text-[#06233F] mb-1 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[12px] text-[#06233F]/60 font-semibold uppercase tracking-[0.05em] mb-4">
                    {product.generic} · {product.strength}
                  </p>
                  <p className="text-[14px] text-[#06233F]/70 leading-relaxed mb-6 flex-1">
                    {product.description}
                  </p>

                  <button
                    onClick={() => setActiveProduct(product)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#216853] text-[13px] font-semibold uppercase tracking-[0.08em] !text-white hover:bg-[#184d3d] transition-all duration-300 shadow-md shadow-[#216853]/20 group/btn"
                  >
                    <span className="!text-white">View Details</span>
                    <ArrowRight
                      size={15}
                      className="!text-white transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ================= WHY TRUST US ================= */}
      <section className="relative z-10 bg-white border-t border-[#06233F]/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#216853] mb-3 font-mono">
            Why Hospitals Choose Novix
          </p>
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#06233F] tracking-tight leading-tight mb-16 max-w-2xl">
            Quality you can check, every single time.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[20px] border border-[#06233F]/10 bg-white p-8 shadow-sm hover:border-[#216853]/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F4F8F6] flex items-center justify-center mb-6">
                    <Icon size={22} className="text-[#216853]" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#06233F] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[#06233F]/65 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative z-10 bg-[#06233F] text-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#216853] mb-4 font-mono">
            Need Bulk Supply?
          </p>
          <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold tracking-tight leading-[1.1] max-w-3xl mx-auto mb-8 !text-white">
            Let's talk about your hospital's supply needs.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-[#184d3d] transition-all duration-300 shadow-lg shadow-[#216853]/30">
              <FileText size={15} className="!text-white" />
              <span className="!text-white">Download Catalogue</span>
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-white/10 transition-colors duration-300">
              <Mail size={15} />
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#06233F]/40 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveProduct(null)}
          />

          <div className="relative w-full max-w-4xl rounded-[28px] border border-[#06233F]/10 bg-white p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full border border-[#06233F]/10 bg-[#F8FAFC] text-[#06233F] hover:bg-[#216853] hover:text-white hover:border-[#216853] transition-colors duration-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-[20px] border border-[#06233F]/10 bg-[#F8FAFC] p-8 flex items-center justify-center">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-auto max-h-80 object-contain"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#216853] font-mono">
                  {activeProduct.category}
                </span>
                <h2 className="text-[32px] md:text-[38px] font-bold text-[#06233F] mt-2 mb-1 leading-tight">
                  {activeProduct.name}
                </h2>
                <p className="text-[13px] text-[#06233F]/60 font-semibold uppercase tracking-[0.05em] mb-6">
                  {activeProduct.generic} &middot; {activeProduct.strength}
                </p>

                <p className="text-[15px] text-[#06233F]/75 leading-relaxed mb-6">
                  {activeProduct.description}
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#216853]" />
                    <span className="text-[14px] font-semibold text-[#06233F]">
                      WHO-GMP certified manufacturing
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#216853]" />
                    <span className="text-[14px] font-semibold text-[#06233F]">
                      Every batch quality-tested
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#216853]" />
                    <span className="text-[14px] font-semibold text-[#06233F]">
                      Proudly made in India
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                  onClick={() => nav("/contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#216853] !text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-[#184d3d] transition-all duration-300 shadow-md shadow-[#216853]/20">
                    <Mail size={15} className="!text-white" />
                    <span className="!text-white">Enquire Now</span>
                  </button>
                  {/* <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#06233F]/20 text-[#06233F] font-semibold text-[13px] uppercase tracking-[0.08em] hover:border-[#216853] hover:text-[#216853] transition-colors duration-200">
                    <FileText size={15} />
                    Spec Sheet
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}