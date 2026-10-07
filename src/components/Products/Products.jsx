import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
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
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

import img1 from "../../Images/n-vit-b1.webp";
import img2 from "../../Images/novix-tx.webp";
import img3 from "../../Images/panta-n.webp";
import img4 from "../../Images/cefvix-1gm.webp";
import img5 from "../../Images/n-clav.webp";
import img6 from "../../Images/ncef-sb.webp";
import img7 from "../../Images/onda-n.webp";
import img8 from "../../Images/o-clot-25000.webp";
import img9 from "../../Images/onda-n-tray.webp";
import img10 from "../../Images/cefvix-sb.webp";
import img11 from "../../Images/lbpc.webp";
import img12 from "../../Images/docvix.webp";
import img13 from "../../Images/o-clot-5000.webp";
import img14 from "../../Images/tazovix.webp";
import img15 from "../../Images/n-vit.webp";

// Register GSAP Plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FONT_ID = "editorial-fonts";

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
    category: "Supportive Care",
    name: "N-VIT B1",
    generic: "THIAMINE INJECTION I.P.",
    strength: "100MG/2ML",
    image: img1,
    description:
      "Indicated for the prevention and treatment of thiamine deficiency, especially when rapid parenteral replacement is required.",
  },
  {
    id: 2,
    category: "Critical Care",
    name: "Novix-TX",
    generic: "TRANEXAMIC ACID INJECTION I.P.",
    strength: "500MG/5ML",
    image: img2,
    description:
      "Formulated for the reduction of bleeding caused by excessive fibrinolysis and control of significant surgical bleeding.",
  },
  {
    id: 3,
    category: "Gastrointestinal",
    name: "PANTA-N 40 mg",
    generic: "PANTOPRAZOLE FOR INJECTION IP",
    strength: "40 MG",
    image: img3,
    description:
      "Used for the treatment of acid-related disorders such as GERD, peptic ulcers, and hyperacidity-related conditions.",
  },
  {
    id: 4,
    category: "Injectable Antibiotics",
    name: "CEFVIX 1 GM",
    generic: "CEFTRIAXONE FOR INJECTION IP",
    strength: "1 GM",
    image: img4,
    description:
      "Broad-spectrum cephalosporin antibiotic for susceptible bacterial infections, including serious respiratory and urinary tract cases.",
  },
  {
    id: 5,
    category: "Injectable Antibiotics",
    name: "N-CLAV",
    generic: "AMOXYCILLIN & POTASSIUM CLAVULANATE FOR INJECTION IP",
    strength: "1.2 GM",
    image: img5,
    description:
      "Potent antibiotic combination for treating susceptible respiratory, urinary, and skin/soft-tissue bacterial infections.",
  },
  {
    id: 6,
    category: "Injectable Antibiotics",
    name: "NCEF-SB 1.5 GM",
    generic: "CEFOPERAZONE & SULBACTAM FOR INJECTION I.P.",
    strength: "1.5 GM",
    image: img6,
    description:
      "Combination therapy targeting severe bacterial respiratory tract, urinary tract, and intra-abdominal infections.",
  },
  {
    id: 7,
    category: "Gastrointestinal",
    name: "ONDA-N",
    generic: "ONDANSETRON HYDROCHLORIDE INJECTION I.P.",
    strength: "4MG/2ML",
    image: img7,
    description:
      "Provides effective prevention and relief from nausea and vomiting caused by chemotherapy or surgical procedures.",
  },
  {
    id: 8,
    category: "Critical Care",
    name: "O-CLOT 25000",
    generic: "HEPARIN SODIUM INJECTION IP",
    strength: "25000 IU/5ML",
    image: img8,
    description:
      "High-dose anticoagulant for treatment of venous thromboembolic disorders and preventing clotting during extracorporeal circulation.",
  },
  {
    id: 9,
    category: "Gastrointestinal",
    name: "ONDA-N — TRAY PACK",
    generic: "ONDANSETRON HYDROCHLORIDE INJECTION I.P.",
    strength: "8MG/4ML",
    image: img9,
    description:
      "Hospital tray pack format engineered for rapid ward delivery and postoperative nausea/vomiting management.",
  },
  {
    id: 10,
    category: "Injectable Antibiotics",
    name: "CEFVIX-SB 1.5 GM",
    generic: "CEFTRIAXONE & SULBACTAM FOR INJECTION IP",
    strength: "1.5 GM",
    image: img10,
    description:
      "Synergistic antibiotic pairing for resistant bacterial infections, severe lower respiratory, and urinary tract infections.",
  },
  {
    id: 11,
    category: "Critical Care",
    name: "LBPC",
    generic: "NORADRENALINE BITARTRATE INJECTION IP",
    strength: "4MG/2ML",
    image: img11,
    description:
      "Essential vasopressor for management of acute severe hypotension and blood-pressure support in vasodilatory shock.",
  },
  {
    id: 12,
    category: "Injectable Antibiotics",
    name: "DOCVIX",
    generic: "DOXYCYCLINE FOR INJECTION USP",
    strength: "100 MG",
    image: img12,
    description:
      "Injectable tetracycline antibiotic formulated for susceptible bacterial and rickettsial infection protocols.",
  },
  {
    id: 13,
    category: "Critical Care",
    name: "O-CLOT 5000",
    generic: "HEPARIN SODIUM INJECTION IP",
    strength: "5000 IU/5ML",
    image: img13,
    description:
      "Standard-dose heparin for prevention and treatment of venous thromboembolic disorders and line maintenance.",
  },
  {
    id: 14,
    category: "Injectable Antibiotics",
    name: "TAZOVIX-4.5 GM",
    generic: "PIPERACILLIN & TAZOBACTAM FOR INJECTION I.P.",
    strength: "4.5 GM",
    image: img14,
    description:
      "Broad-spectrum extended penicillin formulation for treating severe hospital-acquired respiratory and abdominal infections.",
  },
  {
    id: 15,
    category: "Supportive Care",
    name: "N-VIT",
    generic: "MULTIVITAMIN INJECTION",
    strength: "10 ML",
    image: img15,
    description:
      "Multivitamin complex for intravenous supplementation when oral nutrition is inadequate or not clinically suitable.",
  },
];

const STATS = [
  { icon: Boxes, value: "15", label: "Core Formulations" },
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

const injectFonts = () => {
  if (typeof window !== "undefined" && !document.getElementById(FONT_ID)) {
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }
};

const ProductImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      />
    </div>
  );
};

// Interactive 3D Tilt Card Sub-Component
const ProductCard = ({ product, onSelect }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col rounded-[24px] border border-[#06233F]/10 bg-white/80 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#216853]/40 transition-all duration-300 transform-gpu"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Badge */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-[#F4F8F6]/90 backdrop-blur-sm border border-[#216853]/20 px-3 py-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
        <ShieldCheck size={12} className="text-[#216853] animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#06233F]">
          WHO-GMP
        </span>
      </div>

      {/* Image Container with Dynamic Float */}
      <div className="h-64 flex items-center justify-center bg-gradient-to-b from-[#F8FAFC] to-white p-8 border-b border-[#06233F]/5 overflow-hidden relative">
        <div className="absolute inset-0 bg-[#216853]/5 rounded-full blur-2xl transform scale-50 group-hover:scale-125 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-full w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-md group-hover:drop-shadow-xl"
        />
      </div>

      <div className="p-7 flex flex-col flex-1 relative z-10 bg-white/50">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#216853] mb-2 flex items-center gap-1">
          <Sparkles size={10} className="inline-block" />
          {product.category}
        </p>
        <h3
          className="text-2xl font-light text-[#06233F] mb-1 leading-snug group-hover:text-[#216853] transition-colors duration-300"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {product.name}
        </h3>
        <p className="text-[11px] text-[#06233F]/60 font-semibold uppercase tracking-[0.2em] mb-4">
          {product.generic} · {product.strength}
        </p>
        <p className="text-sm text-[#06233F]/70 font-light leading-relaxed mb-6 flex-1">
          {product.description}
        </p>

        <button
          onClick={() => onSelect(product)}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#216853] text-xs font-semibold uppercase tracking-[0.2em] !text-white hover:bg-[#184d3d] transition-all duration-300 shadow-md shadow-[#216853]/20 group/btn active:scale-95 overflow-hidden relative"
        >
          <span className="relative z-10 !text-white">View Details</span>
          <ArrowRight
            size={15}
            className="relative z-10 !text-white transition-transform duration-300 group-hover/btn:translate-x-2"
          />
        </button>
      </div>
    </div>
  );
};

export default function NovixProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProduct, setActiveProduct] = useState(null);
  const gridRef = useRef(null);
  const cursorLightRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const trustRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    injectFonts();
  }, []);

  // Cursor Light Tracking Effect
  const handleMouseMoveGlobal = (e) => {
    if (!cursorLightRef.current) return;
    gsap.to(cursorLightRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  // Scroll Animations using GSAP ScrollTrigger
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from(heroRef.current.querySelectorAll(".hero-animate"), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Stats Section Scroll Reveal
      gsap.from(statsRef.current.children, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Trust Cards Scroll Reveal
      gsap.from(trustRef.current.children, {
        scrollTrigger: {
          trigger: trustRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // Category change grid animation
  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(1.2)",
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

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

  const filteredProducts =
    activeCategory === "All"
      ? productData
      : productData.filter((p) => p.category === activeCategory);

  return (
    <div
      onMouseMove={handleMouseMoveGlobal}
      className="relative min-h-screen w-full text-[#06233F]/80 bg-[#F8FAFC] overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Dynamic Interactive Background Cursor Light */}
      <div
        ref={cursorLightRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-radial from-[#216853]/10 to-transparent rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 transition-opacity duration-500"
      />

      {/* Grid Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v100M30 0v100M50 0v100M70 0v100M90 0v100M0 10h100M0 30h100M0 50h100M0 70h100M0 90h100' stroke='%2306233F' stroke-width='1' fill='none'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%2306233F'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ================= HERO ================= */}
      <header ref={heroRef} className="relative z-10 bg-[#F8FAFC] w-full pt-16">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-20 grid lg:grid-cols-[1.3fr,1fr] gap-16 items-center">
          <div>
            <p className="hero-animate text-xs font-bold tracking-[0.3em] uppercase text-[#216853] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#216853] animate-ping" />
              Novix Healthcare · Product Portfolio
            </p>
            <h1
              className="hero-animate font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-[#06233F] mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Medicines hospitals{" "}
              <span className="italic font-normal text-[#216853] relative inline-block">
                count on.
                <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#216853]/30 rounded-full" />
              </span>
            </h1>
            <p className="hero-animate text-base md:text-lg text-[#06233F]/75 max-w-xl font-light leading-relaxed mb-8">
              We manufacture sterile injectables for hospitals and clinics
              across India — tested carefully, packed with care, and delivered
              on time, every time.
            </p>
            <div className="hero-animate flex flex-wrap gap-4">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#216853] !text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#216853]/20"
              >
                <span className="!text-white">Browse Products</span>
                <ArrowRight size={15} className="!text-white" />
              </a>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#06233F]/20 text-[#06233F] font-semibold text-xs uppercase tracking-[0.2em] hover:border-[#216853] hover:text-[#216853] hover:bg-white transition-all duration-300 bg-white/50 backdrop-blur-sm">
                <FileText size={15} />
                Download Catalogue
              </button>
            </div>
          </div>

          {/* WHO-GMP Floating Card */}
          <div className="hero-animate rounded-[28px] border border-[#06233F]/10 bg-white/70 backdrop-blur-md p-8 shadow-2xl shadow-[#06233F]/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#216853]/20 to-transparent rounded-[30px] blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#F4F8F6] border border-[#216853]/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <ShieldCheck size={22} className="text-[#216853]" />
                </div>
                <div>
                  <p
                    className="text-[#06233F] font-semibold text-lg leading-tight mb-1"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    WHO-GMP Certified
                  </p>
                  <p className="text-[#06233F]/60 text-xs font-light">
                    Manufacturing facility
                  </p>
                </div>
              </div>
              <div className="h-px bg-[#06233F]/10 mb-6" />
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-[#06233F]/80 font-light">
                  <CheckCircle2
                    size={18}
                    className="text-[#216853] shrink-0 animate-bounce"
                  />{" "}
                  Batch-tested for purity and sterility
                </li>
                <li className="flex items-center gap-3 text-sm text-[#06233F]/80 font-light">
                  <CheckCircle2 size={18} className="text-[#216853] shrink-0" />{" "}
                  Proudly made in India
                </li>
                <li className="flex items-center gap-3 text-sm text-[#06233F]/80 font-light">
                  <CheckCircle2 size={18} className="text-[#216853] shrink-0" />{" "}
                  Trusted by 500+ hospitals & clinics
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="border-y border-[#06233F]/10 bg-white/80 backdrop-blur-md">
          <div
            ref={statsRef}
            className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F8F6] flex items-center justify-center shrink-0 group-hover:bg-[#216853] group-hover:rotate-6 transition-all duration-300">
                    <Icon
                      size={22}
                      className="text-[#216853] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <p
                      className="text-3xl text-[#06233F] font-medium leading-none mb-1 group-hover:text-[#216853] transition-colors duration-300"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-[10px] text-[#06233F]/60 font-bold uppercase tracking-[0.3em] leading-snug">
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
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#216853] mb-3">
                Our Range
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-[#06233F] tracking-tight leading-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Browse by category
              </h2>
            </div>
            <p className="text-base text-[#06233F]/70 max-w-sm font-light leading-relaxed">
              Every product below is WHO-GMP manufactured and quality-tested
              before it reaches you.
            </p>
          </div>

          {/* Interactive Category Filters */}
          <div className="flex flex-wrap gap-2.5 mb-14">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 ${
                    active
                      ? "bg-[#06233F] !text-white border border-[#06233F] shadow-lg shadow-[#06233F]/20"
                      : "bg-white text-[#06233F]/70 border border-[#06233F]/15 hover:border-[#216853] hover:text-[#216853] hover:bg-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Animated Product Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setActiveProduct}
              />
            ))}
          </div>
        </div>
      </main>

      {/* ================= WHY TRUST US ================= */}
      <section className="relative z-10 bg-white/60 backdrop-blur-md border-t border-[#06233F]/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#216853] mb-3">
            Why Hospitals Choose Novix
          </p>
          <h2
            className="text-3xl md:text-5xl font-light text-[#06233F] tracking-tight leading-tight mb-16 max-w-2xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Quality you can check,{" "}
            <span className="italic font-normal text-[#216853]">
              every single time.
            </span>
          </h2>

          <div
            ref={trustRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-[24px] border border-[#06233F]/10 bg-white p-8 shadow-sm hover:border-[#216853]/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F8F6] flex items-center justify-center mb-6 group-hover:bg-[#216853] transition-colors duration-300">
                    <Icon
                      size={24}
                      className="text-[#216853] group-hover:text-white transition-colors duration-300"
                    />
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative z-10 bg-[#06233F] text-white py-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#216853]/30 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#216853] mb-4">
            Need Bulk Supply?
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] max-w-3xl mx-auto mb-8 !text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Let's talk about your hospital's supply needs.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-[#216853]/30">
              <FileText size={15} className="!text-white" />
              <span className="!text-white">Download Catalogue</span>
            </button>
            <button
              onClick={() => nav("/contact")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm"
            >
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
            className="absolute inset-0 bg-[#06233F]/50 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
            onClick={() => setActiveProduct(null)}
          />

          <div className="relative w-full max-w-4xl rounded-[32px] border border-[#06233F]/10 bg-white p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-300 z-10">
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full border border-[#06233F]/10 bg-[#F8FAFC] text-[#06233F] hover:bg-[#216853] hover:text-white hover:border-[#216853] transition-all duration-300 hover:rotate-90"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-[24px] border border-[#06233F]/10 bg-[#F8FAFC] p-8 flex items-center justify-center h-80 relative overflow-hidden group">
                <ProductImage
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-auto max-h-72 object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853]">
                  {activeProduct.category}
                </span>
                <h2
                  className="text-3xl md:text-4xl font-light text-[#06233F] mt-2 mb-1 leading-tight"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {activeProduct.name}
                </h2>
                <p className="text-[11px] text-[#06233F]/60 font-semibold uppercase tracking-[0.2em] mb-6">
                  {activeProduct.generic} &middot; {activeProduct.strength}
                </p>

                <p className="text-base text-[#06233F]/75 font-light leading-relaxed mb-6">
                  {activeProduct.description}
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#216853]" />
                    <span className="text-sm font-semibold text-[#06233F]">
                      WHO-GMP certified manufacturing
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#216853]" />
                    <span className="text-sm font-semibold text-[#06233F]">
                      Every batch quality-tested
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#216853]" />
                    <span className="text-sm font-semibold text-[#06233F]">
                      Proudly made in India
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => nav("/contact")}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#216853] !text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#216853]/20"
                  >
                    <Mail size={15} className="!text-white" />
                    <span className="!text-white">Enquire Now</span>
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
