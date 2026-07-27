import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import favicon from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";

export default function NovixContactCTA() {
  const sectionRef = useRef(null);
  const nav = useNavigate();

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".cta-animate-card",
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 }
      );

      tl.fromTo(
        ".cta-animate-element",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-16 px-6 flex items-center justify-center overflow-hidden select-none"
      style={{ fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <div className="cta-animate-card relative w-full max-w-4xl bg-[#F5F5F7] border border-black/5 rounded-[32px] py-12 px-8 sm:px-16 flex flex-col items-center text-center shadow-sm overflow-hidden">
        
        {/* Top Logo Badge */}
        <div className="flex items-center gap-3 mb-6 cta-animate-element">
          <img
            src={favicon}
            alt="Novix Logo"
            className="w-6 h-6 object-contain"
          />
          <span className="text-xs uppercase tracking-[0.25em] text-[#136149] font-semibold">
            Novix Healthcare
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="cta-animate-element text-[clamp(28px,4vw,42px)] font-semibold text-[#05192E] tracking-tight leading-[1.15] mb-4 max-w-2xl" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
          LET'S ADVANCE HEALTHCARE TOGETHER
        </h2>

        {/* Subtitle Paragraph */}
        <p className="cta-animate-element text-neutral-600 text-sm sm:text-base font-light max-w-xl mb-8 leading-relaxed">
          Partner with Novix Healthcare to discover trusted, quality-focused pharmaceutical solutions backed by science and responsible partnerships.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 cta-animate-element mb-10 z-10">
          <button
            onClick={() => nav('/products')}
            className="px-7 py-3.5 bg-[#05192E] text-white rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#136149] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Products
          </button>
          <button
            onClick={() => nav('/contact')}
            className="px-7 py-3.5 bg-white border border-black/10 text-[#05192E] rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 hover:bg-black/5 hover:border-black/20 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
          >
            Contact Our Team
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/10 mb-8 cta-animate-element" />

        {/* Features / Checkmarks List */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-neutral-600 font-medium cta-animate-element">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#136149]/10 text-[#136149] flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Quality Focused</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#136149]/10 text-[#136149] flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Trusted Partnerships</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#136149]/10 text-[#136149] flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Compliance</span>
          </div>
        </div>

      </div>
    </section>
  );
}
