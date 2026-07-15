import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Factory, Award, Heart, X } from 'lucide-react';

// Import product images
import img1 from '../../Images/NORA.png';
import img2 from '../../Images/AMIKA.png';
import img3 from '../../Images/CEF1MG.png';
import img4 from '../../Images/CEFO.png';
import img5 from '../../Images/HEPARIN.png';
import img6 from '../../Images/ONDA.png';
import img7 from '../../Images/7.png';
import img8 from '../../Images/DOXY.png';
import img9 from '../../Images/paracetamol.png';
import img10 from '../../Images/multivitamin.png';
import img11 from '../../Images/trane.png';
import img12 from '../../Images/sulbactum.png';
import img13 from '../../Images/hepa.png';
import img14 from '../../Images/infussion.png';
import img15 from '../../Images/amo.png';

gsap.registerPlugin(ScrollTrigger);

const productData = [
  {
    id: 1,
    name: "LBPC",
    generic: "NORARENAKINE INJECTION",
    strength: "4MG/2ML",
    image: img1
  },
  {
    id: 2,
    name: "MULTI-DR",
    generic: "AMIKACIN INJECTION",
    strength: "500MG",
    image: img2
  },
  {
    id: 3,
    name: "CEFVIX",
    generic: "CEFTRIAXONE INJECTION",
    strength: "1GM",
    image: img3
  },
  {
    id: 4,
    name: "CEFVIX-SB",
    generic: "CEFTRIAXONE + SULBACTUM INJECTION",
    strength: "1.5 GM",
    image: img4
  },
  {
    id: 5,
    name: "O-CLOT 25000 IU",
    generic: "HEPARIN 25000 IU",
    strength: "25000 IU",
    image: img5
  },
  {
    id: 6,
    name: "NOVISET",
    generic: "ONDANSETRON INJECTION",
    strength: "2ML",
    image: img6
  },
  {
    id: 7,
    name: "NOVPRA",
    generic: "PANTAPRAZOLE 40 MG",
    strength: "40 MG",
    image: img7
  },
  {
    id: 8,
    name: "DOXVIX",
    generic: "DOXYCYCLINE 100 MG",
    strength: "100 MG",
    image: img8
  },
  {
    id: 9,
    name: "NFEVO",
    generic: "PARACETAMOL INJECTION ",
    strength: "150MG/2ML",
    image: img9
  },

  {
    id: 10,
    name: "N-VIT",
    generic: "MULTIVITAMIN 10ML",
    strength: "10ML",
    image: img10

  },
  {
    id: 11,
    name: "NOVIX-TX",
    generic: "TRANEXAMIC ACID 500MG/5ML ",
    strength: "500MG/5ML",
    image: img11
  
  },
  {
    id: 12,
    name: "NFEVO",
    generic: "CEFTRIXONE + SULBACTUM 1.5GM ",
    strength: "1.5GM",
    image: img12
  
  },
  {
    id: 13,
    name: "0-CLOT",
    generic: "HEPARIN 5000 IU",
    strength: "5000 IU",
    image: img13
  
  },
  {
    id: 14,
    name: "NFEVO IV",
    generic: "PARACETAMOL INFUSSION ",
    strength: "100ML",
    image: img14
  },
  {
    id: 15,
    name: "N-CLAV",
    generic: "AMOXYCILLIN + CLAVULANATE ",
    strength: "1.2 GM",
    image: img15
  },
  ];

export default function Products() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  
  // Full-screen overlay state
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeRect, setActiveRect] = useState(null);
  const overlayCardRef = useRef(null);
  const backdropRef = useRef(null);

  // Initial scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".prod-header-text", 
        { opacity: 0, y: 50, scale: 0.92, filter: "blur(15px)" },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out"
        }
      );

      gsap.fromTo(".prod-badge-item", 
        { opacity: 0, y: 30, scale: 0.85 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.9, ease: "back.out(1.2)"
        }
      );

      gsap.utils.toArray(".prod-card").forEach((card) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 60, scale: 0.85 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            },
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.2)"
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle overlay open animation
  useEffect(() => {
    if (activeProduct && activeRect && overlayCardRef.current && backdropRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });

        // Set initial state matching the grid card precisely
        gsap.set(overlayCardRef.current, {
          position: 'fixed',
          top: activeRect.top,
          left: activeRect.left,
          width: activeRect.width,
          height: activeRect.height,
          margin: 0,
          zIndex: 60,
          transform: "none",
          borderRadius: "32px"
        });

        // Animate to full screen center
        tl.to(overlayCardRef.current, {
          top: '5vh',
          left: '5vw',
          width: '90vw',
          height: '90vh',
          duration: 0.6,
          ease: "power3.inOut"
        }, "<");
        // Fade in additional text
        tl.to(".overlay-info-content", {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.2");
      });
      return () => {
        ctx.revert();
      }
    }
  }, [activeProduct, activeRect]);

  // Handle overlay close animation
  const closeOverlay = () => {
    if (!activeRect || !overlayCardRef.current) {
      setActiveProduct(null);
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProduct(null);
        setActiveRect(null);
      }
    });

    // Fade out text immediately
    tl.to(".overlay-info-content", {
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut"
    });

    // Animate back to original grid slot
    tl.to(overlayCardRef.current, {
      top: activeRect.top,
      left: activeRect.left,
      width: activeRect.width,
      height: activeRect.height,
      duration: 0.5,
      ease: "power3.inOut"
    }, "<");

    tl.to(backdropRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    }, "<0.1");
  };

  return (
    <section
      ref={containerRef}
      id="novix-products-section"
      className="w-full max-w-[1280px] mx-auto bg-transparent text-white py-24 px-6 md:px-12 relative overflow-visible flex flex-col select-none shrink-0"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="w-full flex flex-col items-center justify-center text-center mb-16 relative z-10">
        <div className="prod-header-text flex flex-col items-center text-center max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.25em] text-blue-400 font-bold font-sans mb-4 block">
            Novix Pharmaceuticals
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Products</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 leading-relaxed font-sans max-w-2xl">
            Quality healthcare solutions manufactured with precision, care and innovation.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 bg-white/[0.02] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] backdrop-blur-md rounded-3xl p-6 lg:p-8 mt-10">
          {[
            { icon: ShieldCheck, title: "Trusted Quality", desc: "WHO-GMP Certified" },
            { icon: Factory, title: "Advanced", desc: "Manufacturing" },
            { icon: Award, title: "Affordable", desc: "Healthcare" },
            { icon: Heart, title: "Better Health", desc: "Better Tomorrow" }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="prod-badge-item flex items-center gap-3 px-4 border-r last:border-0 border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[13px] font-bold text-white font-sans">{item.title}</span>
                  <span className="text-[10px] text-white/50 font-sans font-medium">{item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3-COLUMN PRODUCT GRID */}
      <div ref={gridRef} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 px-2">
        {productData.map((prod) => (
          <div
            key={prod.id}
            onMouseEnter={(e) => {
              // Don't trigger if one is already active
              if (activeProduct) return;
              const rect = e.currentTarget.getBoundingClientRect();
              setActiveRect(rect);
              setActiveProduct(prod);
            }}
            style={{ opacity: activeProduct?.id === prod.id ? 0 : 1 }}
            className="prod-card bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 flex flex-col justify-between hover:bg-gradient-to-br hover:from-white/[0.06] hover:to-white/[0.02] hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 cursor-pointer group relative text-left transition-colors duration-300"
          >
            <div className="w-full aspect-[4/3] flex items-center justify-center mb-8 relative pointer-events-none">
              <img
                src={prod.image}
                alt={prod.name}
                className="max-h-[85%] object-contain rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div className="flex flex-col mt-auto pt-4 border-t border-white/[0.04] pointer-events-none">
              <h3 className="text-2xl font-bold text-white tracking-wide mb-1 group-hover:text-blue-400 transition-colors duration-300">
                {prod.name}
              </h3>
              <p className="text-xs text-white/40 tracking-wider font-semibold mb-4 uppercase">
                {prod.generic}
              </p>
              <div className="w-fit px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-blue-400 tracking-wider">
                {prod.strength}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL SCREEN OVERLAY (HOVER DRIVEN) */}
      {activeProduct && activeRect && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          {/* Backdrop */}
          <div 
            ref={backdropRef}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl pointer-events-auto opacity-0"
            onMouseEnter={closeOverlay}
          />
          
          {/* Expanded Card (initialized perfectly over the grid card to avoid 1-frame flash) */}
          <div 
            ref={overlayCardRef}
            onMouseLeave={closeOverlay}
            style={{
              position: 'fixed',
              top: activeRect.top,
              left: activeRect.left,
              width: activeRect.width,
              height: activeRect.height,
              margin: 0,
              zIndex: 60,
              borderRadius: "32px",
              opacity: 1
            }}
            className="bg-transparent p-8 md:p-16 flex flex-col md:flex-row gap-8 md:gap-16 pointer-events-auto overflow-hidden"
          >
            {/* Big Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-full flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-[24px] relative p-8">
              <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
              <img 
                src={activeProduct.image} 
                alt={activeProduct.name} 
                className="max-h-[90%] object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" 
              />
            </div>

            {/* Detailed Info Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left py-8 opacity-0 overlay-info-content">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">{activeProduct.name}</h2>
              <p className="text-2xl text-blue-400 font-semibold mb-8 uppercase tracking-wider">{activeProduct.generic}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="w-fit px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm font-bold text-white tracking-wider">
                  {activeProduct.strength}
                </div>
                <div className="w-fit px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-bold text-blue-400 tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  WHO-GMP
                </div>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent mb-8" />

              <h3 className="text-sm uppercase tracking-[0.2em] text-white/40 font-bold mb-4">Product Details</h3>
              <p className="text-white/70 leading-relaxed text-lg font-medium mb-12 max-w-xl">
                {activeProduct.name} is a premium healthcare solution carefully formulated with {activeProduct.generic} ({activeProduct.strength}). Manufactured under strict international quality guidelines to ensure maximum clinical efficacy, safety, and rapid patient recovery.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
