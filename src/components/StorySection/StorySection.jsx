import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PremiumHealthcareStory() {
  const containerRef = useRef(null);

  // Scene Content Refs
  const scene1Ref = useRef(null);
  const scene2Ref = useRef(null);
  const scene3Ref = useRef(null);
  const scene4Ref = useRef(null);

  // Background Media Containers
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);
  const bg4Ref = useRef(null);

  // Stat Counter Refs
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize starting visual states for ultra-clean load
      gsap.set([scene2Ref.current, scene3Ref.current, scene4Ref.current], {
        opacity: 0,
        y: 40,
        scale: 0.96,
        pointerEvents: "none",
      });
      gsap.set(scene1Ref.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
      });

      gsap.set([bg2Ref.current, bg3Ref.current, bg4Ref.current], { opacity: 0 });
      gsap.set(bg1Ref.current, { opacity: 0.2, scale: 1 });

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=320%", // Balanced scroll runway for realistic pacing
          pin: true,
          scrub: 0.6, // Smooth spring response to scroll wheel/touch
          snap: {
            snapTo: [0, 0.33, 0.66, 1],
            duration: { min: 0.3, max: 0.7 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          anticipatePin: 1,
        },
      });

      const stats = { count1: 0, count2: 0 };

      // ==================== SCENE 1 (0 -> 1.0) ====================
      mainTl
        // BG Subtle Scale
        .to(bg1Ref.current, { scale: 1.06, duration: 1, ease: "none" }, 0)
        
        // Scene 1 Exit Smooth Drift
        .to(
          scene1Ref.current,
          { opacity: 0, y: -30, scale: 0.97, pointerEvents: "none", duration: 0.4, ease: "power1.in" },
          0.6
        )
        .to(bg1Ref.current, { opacity: 0, duration: 0.4, ease: "power1.in" }, 0.6);

      // ==================== SCENE 2 (1.0 -> 2.0) ====================
      mainTl
        // BG 2 Fade In
        .to(bg2Ref.current, { opacity: 0.18, duration: 0.4, ease: "power2.out" }, 0.9)
        .to(bg2Ref.current, { scale: 1.05, duration: 1.1, ease: "none" }, 0.9)

        // Scene 2 Content Entrance
        .to(
          scene2Ref.current,
          { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.out" },
          0.95
        )
        .fromTo(
          scene2Ref.current.querySelectorAll(".glass-card"),
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" },
          1.05
        )

        // Scene 2 Exit
        .to(
          scene2Ref.current,
          { opacity: 0, y: -30, scale: 0.97, pointerEvents: "none", duration: 0.4, ease: "power1.in" },
          1.65
        )
        .to(bg2Ref.current, { opacity: 0, duration: 0.4, ease: "power1.in" }, 1.65);

      // ==================== SCENE 3 (2.0 -> 3.0) ====================
      mainTl
        // BG 3 Fade In
        .to(bg3Ref.current, { opacity: 0.18, duration: 0.4, ease: "power2.out" }, 1.95)
        .to(bg3Ref.current, { scale: 1.05, duration: 1.1, ease: "none" }, 1.95)

        // Scene 3 Content Entrance
        .to(
          scene3Ref.current,
          { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.out" },
          2.0
        )
        // Counter Animation Sync
        .to(
          stats,
          {
            count1: 100,
            count2: 20,
            duration: 0.5,
            ease: "power1.out",
            onUpdate: () => {
              if (stat1Ref.current) stat1Ref.current.innerText = `${Math.floor(stats.count1)}+`;
              if (stat2Ref.current) stat2Ref.current.innerText = `${Math.floor(stats.count2)}+`;
            },
          },
          2.05
        )

        // Scene 3 Exit
        .to(
          scene3Ref.current,
          { opacity: 0, y: -30, scale: 0.97, pointerEvents: "none", duration: 0.4, ease: "power1.in" },
          2.65
        )
        .to(bg3Ref.current, { opacity: 0, duration: 0.4, ease: "power1.in" }, 2.65);

      // ==================== SCENE 4 (3.0 -> End) ====================
      mainTl
        // BG 4 Soft Glow Fade In
        .to(bg4Ref.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, 2.95)

        // Scene 4 Final Content Entrance
        .to(
          scene4Ref.current,
          { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.out" },
          3.0
        )
        .fromTo(
          scene4Ref.current.querySelectorAll(".anim-final"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" },
          3.05
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#F8FAFC] text-[#06233F] overflow-hidden select-none"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-sans-clean { font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
      `}</style>

      {/* Light Overlay Gradients */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#F8FAFC]/90 via-[#F8FAFC]/65 to-[#F8FAFC]/90" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(33,104,83,0.05)_0%,transparent_70%)]" />

      {/* Background Images */}
      <div ref={bg1Ref} className="absolute inset-0 w-full h-full z-0 opacity-20 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2000&q=80"
          alt="Bright Medical Lab"
          className="w-full h-full object-cover object-center filter brightness-125 contrast-100"
        />
      </div>

      <div ref={bg2Ref} className="absolute inset-0 w-full h-full z-0 opacity-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=2000&q=80"
          alt="Pharmaceutical Facility"
          className="w-full h-full object-cover object-center filter brightness-110"
        />
      </div>

      <div ref={bg3Ref} className="absolute inset-0 w-full h-full z-0 opacity-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80"
          alt="Clinical Research"
          className="w-full h-full object-cover object-center filter brightness-110"
        />
      </div>

      <div ref={bg4Ref} className="absolute inset-0 w-full h-full z-0 opacity-0 bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-[#216853]/10 blur-[120px] pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-center font-sans-clean">

        {/* --- SCENE 1 --- */}
        <div ref={scene1Ref} className="absolute max-w-4xl text-center flex flex-col items-center will-change-transform">
          <span className="anim-text inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#216853]/25 shadow-sm text-xs tracking-[0.2em] uppercase text-[#216853] font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#216853] animate-pulse" />
            Novix Innovation
          </span>

          <h1 className="anim-text font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#06233F] leading-[1.15] mb-6">
            Innovating Healthcare.
          </h1>

          <p className="anim-text text-base sm:text-lg md:text-xl text-[#06233F]/80 font-normal max-w-xl leading-relaxed">
            Scientific research powering tomorrow&apos;s medical solutions.
          </p>
        </div>

        {/* --- SCENE 2 --- */}
        <div ref={scene2Ref} className="absolute w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center will-change-transform">
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs tracking-[0.2em] uppercase text-[#216853] font-semibold mb-3">
              02 / Global Standards
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-normal text-[#06233F] leading-[1.2] mb-6">
              Precision Manufacturing & Uncompromised Quality
            </h2>
            <p className="text-base text-[#06233F]/80 font-normal max-w-md leading-relaxed">
              Every formula is produced in world-class partner facilities adhering to international clinical integrity benchmarks.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4">
            {[
              { title: "WHO GMP Certified", desc: "Exceeding World Health Organization Manufacturing Practices." },
              { title: "ISO Certified Facilities", desc: "Rigorous analytical quality validation at every phase." },
              { title: "Quality Assured", desc: "Continuous testing for absolute batch consistency." },
            ].map((card, i) => (
              <div
                key={i}
                className="glass-card p-6 rounded-2xl bg-white/95 border border-[#06233F]/10 shadow-[0_8px_25px_rgba(6,35,63,0.04)] flex items-start gap-4 hover:border-[#216853]/40 transition-colors duration-300"
              >
                <div className="p-2.5 rounded-xl bg-[#216853]/10 border border-[#216853]/20 text-[#216853]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-medium text-[#06233F] mb-1">{card.title}</h3>
                  <p className="text-sm text-[#06233F]/75 font-normal leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SCENE 3 --- */}
        <div ref={scene3Ref} className="absolute w-full flex flex-col items-center text-center will-change-transform">
          <span className="text-xs tracking-[0.2em] uppercase text-[#216853] font-semibold mb-3">
            03 / Impact & Reach
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-normal text-[#06233F] max-w-3xl leading-[1.2] mb-14">
            Pioneering Medical Excellence Across Therapeutics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 w-full max-w-4xl">
            <div className="p-8 rounded-2xl bg-white border border-[#06233F]/10 shadow-sm">
              <span ref={stat1Ref} className="block font-cinzel text-5xl md:text-6xl font-normal text-[#216853] mb-2">
                0+
              </span>
              <span className="text-xs uppercase tracking-wider text-[#06233F]/70 font-medium">
                Products Delivered
              </span>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#06233F]/10 shadow-sm">
              <span ref={stat2Ref} className="block font-cinzel text-5xl md:text-6xl font-normal text-[#216853] mb-2">
                0+
              </span>
              <span className="text-xs uppercase tracking-wider text-[#06233F]/70 font-medium">
                Therapeutic Categories
              </span>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#06233F]/10 shadow-sm flex flex-col justify-center items-center">
              <span className="font-cinzel text-2xl md:text-3xl font-normal text-[#06233F] mb-1">
                Global Quality
              </span>
              <span className="text-xs uppercase tracking-wider text-[#216853] font-semibold">
                Verified Standards
              </span>
            </div>
          </div>
        </div>

        {/* --- SCENE 4 --- */}
        <div ref={scene4Ref} className="absolute max-w-3xl text-center flex flex-col items-center will-change-transform">
          <div className="anim-final mb-6 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-white border border-[#216853]/30 shadow-md flex items-center justify-center">
              <span className="font-cinzel text-2xl font-semibold text-[#216853]">N</span>
            </div>
          </div>

          <h2 className="anim-final font-cinzel text-4xl sm:text-5xl lg:text-6xl font-normal text-[#06233F] leading-[1.15] mb-6">
            Partnering for Better Healthcare
          </h2>

          <p className="anim-final text-base sm:text-lg text-[#06233F]/80 font-normal max-w-lg leading-relaxed mb-10">
            Advancing global health outcomes through dedicated medical innovation and trusted partnerships.
          </p>

          <div className="anim-final flex flex-col sm:flex-row items-center gap-4">
            <a
              href="/products"
              className="px-8 py-3.5 rounded-full bg-[#216853] !text-white text-sm font-medium tracking-wide hover:bg-[#1a5342] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Explore Solutions
            </a>
            <a
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-white border border-[#06233F]/20 text-[#06233F] text-sm font-medium tracking-wide hover:bg-[#F8FAFC] hover:border-[#06233F]/40 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
