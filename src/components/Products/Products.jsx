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

const FONT_ID = "novix-font-import";

const categories = ["All", "Injectable Antibiotics", "Critical Care", "Gastrointestinal", "Pain & Fever", "Supportive Care"];

const productData = [
  {
    id: 1,
    category: "Injectable Antibiotics",
    name: "LBPC",
    generic: "NORARENAKINE INJECTION",
    strength: "4MG/2ML",
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
    name: "NFEVO",
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
];

const STATS = [
  { icon: Boxes, value: "15+", label: "Formulations" },
  { icon: Users, value: "500+", label: "Hospitals & clinics served" },
  { icon: Award, value: "WHO-GMP", label: "Certified facility" },
  { icon: Truck, value: "Pan-India", label: "Delivery network" },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, title: "WHO-GMP Certified", text: "Our facility meets WHO Good Manufacturing Practice standards, checked and re-checked." },
  { icon: Microscope, title: "Every Batch Tested", text: "No batch leaves our facility without passing quality and sterility testing." },
  { icon: Building2, title: "Built for Hospitals", text: "Packaging, dosing and supply designed around how hospitals actually work." },
  { icon: Truck, title: "Reliable Delivery", text: "We plan supply in advance so wards never run short when it matters." },
];

function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600;700&display=swap";
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

  return (
    // No bg-color on the outer div — your background frame stays visible,
    // dimmed evenly by the scrim below so text is readable everywhere.
    <div className="relative min-h-screen text-white font-['Inter'] selection:bg-[#69B6FF]/30 pb-24">
      <div className="fixed inset-0 -z-10 bg-black/55" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* ================= HERO ================= */}
      <header className="relative border-b border-white/15">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-[1.3fr,1fr] gap-14 items-end">
          <div>
            <p className="text-[12px] font-bold tracking-[0.32em] uppercase text-[#9FD1FF] mb-5 mt-10">
              Novix Healthcare · Product Portfolio
            </p>
            <h1 className="font-['Fraunces'] font-light text-[42px] sm:text-[56px] md:text-[68px] leading-[1.05] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] mb-6">
              Medicines hospitals <span className="italic text-[#69B6FF]">count on.</span>
            </h1>
            <p className="text-lg text-white/90 max-w-xl leading-relaxed mb-8">
              We manufacture sterile injectables for hospitals and clinics
              across India — tested carefully, packed with care, and
              delivered on time, every time.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#69B6FF] text-[#07111D] font-bold text-[12px] uppercase tracking-[0.1em] hover:bg-[#8EC7FF] transition-colors duration-300"
              >
                Browse Products
                <ArrowRight size={14} />
              </a>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white font-bold text-[12px] uppercase tracking-[0.1em] hover:border-[#2ED3C6]/70 hover:text-[#2ED3C6] transition-colors duration-300">
                <FileText size={14} />
                Download Catalogue
              </button>
            </div>
          </div>

          {/* Certification seal panel — solid, high-contrast trust block */}
          <div className="rounded-2xl border border-white/20 bg-[#0E1D31]/90 backdrop-blur-xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-[#69B6FF]/15 border border-[#69B6FF]/40 flex items-center justify-center">
                <ShieldCheck size={20} className="text-[#69B6FF]" />
              </div>
              <div>
                <p className="text-white font-bold text-[14px] leading-tight">WHO-GMP Certified</p>
                <p className="text-white/60 text-[12px]">Manufacturing facility</p>
              </div>
            </div>
            <div className="h-px bg-white/10 mb-5" />
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-[13px] text-white/85">
                <CheckCircle2 size={15} className="text-[#2ED3C6] shrink-0" /> Batch-tested for purity and sterility
              </li>
              <li className="flex items-center gap-2.5 text-[13px] text-white/85">
                <CheckCircle2 size={15} className="text-[#2ED3C6] shrink-0" /> Proudly made in India
              </li>
              <li className="flex items-center gap-2.5 text-[13px] text-white/85">
                <CheckCircle2 size={15} className="text-[#2ED3C6] shrink-0" /> Trusted by 500+ hospitals & clinics
              </li>
            </ul>
          </div>
        </div>

        {/* Stat strip */}
        <div className="border-t border-white/15 bg-black/35">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <Icon size={20} className="text-[#69B6FF] shrink-0" />
                  <div>
                    <p className="font-['Fraunces'] text-lg text-white leading-none mb-1">{s.value}</p>
                    <p className="text-[11px] text-white/65 leading-snug">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* ================= CATALOGUE ================= */}
      <main id="catalogue" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[12px] font-bold tracking-[0.28em] uppercase text-[#9FD1FF] mb-3">
              Our Range
            </p>
            <h2 className="font-['Fraunces'] font-light text-[32px] md:text-[42px] text-white leading-tight">
              Browse by category
            </h2>
          </div>
          <p className="text-sm text-white/70 max-w-sm">
            Every product below is WHO-GMP manufactured and quality-tested
            before it reaches you.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.1em] border transition-all duration-300 ${
                  active
                    ? "bg-[#69B6FF] text-[#07111D] border-[#69B6FF]"
                    : "bg-black/45 text-white border-white/25 hover:bg-black/60 hover:border-white/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product grid — premium 3-col cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col rounded-[22px] border border-white/15 bg-[#0E1D31]/90 backdrop-blur-xl overflow-hidden shadow-[0_10px_34px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#69B6FF]/60 hover:-translate-y-1"
            >
              {/* WHO-GMP corner ribbon */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-[#2ED3C6]/15 border border-[#2ED3C6]/40 px-3 py-1.5">
                <ShieldCheck size={11} className="text-[#2ED3C6]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#2ED3C6]">
                  WHO-GMP
                </span>
              </div>

              <div className="h-52 flex items-center justify-center bg-white p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55 mb-2">
                  {product.category}
                </p>
                <h3 className="font-['Fraunces'] text-[22px] text-white mb-1 leading-snug">
                  {product.name}
                </h3>
                <p className="text-[12px] text-[#8FC9FF] font-bold uppercase tracking-[0.14em] mb-4">
                  {product.generic} · {product.strength}
                </p>
                <p className="text-[13.5px] text-white/75 leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>

                <button
                  onClick={() => setActiveProduct(product)}
                  className="group/btn w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-white/30 text-[12px] font-bold uppercase tracking-[0.1em] text-white hover:bg-[#69B6FF] hover:text-[#07111D] hover:border-[#69B6FF] transition-colors duration-300"
                >
                  View Details
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= WHY TRUST US ================= */}
      <section className="border-t border-white/15 bg-black/35">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="text-[12px] font-bold tracking-[0.28em] uppercase text-[#9FD1FF] mb-3">
            Why Hospitals Choose Novix
          </p>
          <h2 className="font-['Fraunces'] font-light text-[32px] md:text-[42px] text-white leading-tight mb-14 max-w-2xl">
            Quality you can check, every single time.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/15 bg-[#0E1D31]/85 backdrop-blur-xl p-7"
                >
                  <div className="w-11 h-11 rounded-full bg-[#69B6FF]/15 border border-[#69B6FF]/35 flex items-center justify-center mb-5">
                    <Icon size={19} className="text-[#69B6FF]" />
                  </div>
                  <h3 className="font-['Fraunces'] text-[18px] text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/70 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="text-[12px] font-bold tracking-[0.28em] uppercase text-[#9FD1FF] mb-5">
            Need Bulk Supply?
          </p>
          <h2 className="font-['Fraunces'] font-light text-[32px] sm:text-[42px] md:text-[52px] text-white leading-[1.1] max-w-2xl mx-auto mb-10">
            Let's talk about your hospital's supply needs.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#69B6FF] text-[#07111D] font-bold text-[12px] uppercase tracking-[0.1em] hover:bg-[#8EC7FF] transition-colors duration-300">
              <FileText size={14} />
              Download Catalogue
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-bold text-[12px] uppercase tracking-[0.1em] hover:border-[#2ED3C6]/70 hover:text-[#2ED3C6] transition-colors duration-300">
              <Mail size={14} />
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setActiveProduct(null)}
          />

          <div className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0E1D31]/95 backdrop-blur-2xl p-10 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-7 right-7 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black/40 text-white hover:border-[#69B6FF]/60 hover:text-[#69B6FF] transition-colors duration-300"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-2xl border border-white/10 bg-white p-8 flex items-center justify-center">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-auto max-h-72 object-contain"
                />
              </div>

              <div>
                <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#69B6FF]">
                  {activeProduct.category}
                </span>
                <h2 className="font-['Fraunces'] text-3xl md:text-4xl text-white mt-2 mb-2 leading-tight">
                  {activeProduct.name}
                </h2>
                <p className="text-[13px] text-white/70 font-semibold mb-6">
                  {activeProduct.generic} &middot; {activeProduct.strength}
                </p>

                <p className="text-[15px] text-white/90 leading-relaxed mb-6">
                  {activeProduct.description}
                </p>

                <div className="flex flex-col gap-2 mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#2ED3C6]" />
                    <span className="text-[12px] font-semibold text-white/85">
                      WHO-GMP certified manufacturing
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#2ED3C6]" />
                    <span className="text-[12px] font-semibold text-white/85">
                      Every batch quality-tested
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#2ED3C6]" />
                    <span className="text-[12px] font-semibold text-white/85">
                      Proudly made in India
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#69B6FF] text-[#07111D] font-bold text-[12px] uppercase tracking-[0.1em] hover:bg-[#8EC7FF] transition-colors duration-300">
                    <Mail size={14} />
                    Enquire Now
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-bold text-[12px] uppercase tracking-[0.1em] hover:border-[#2ED3C6]/70 hover:text-[#2ED3C6] transition-colors duration-300">
                    <FileText size={14} />
                    Spec Sheet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}