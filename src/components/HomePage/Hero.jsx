import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const FEATURES = [
  {
    title: "Scientific Quality",
    desc: "Rigorous quality control and precise formulation standards designed for optimal clinical outcomes.",
    tag: "01 / Precision",
  },
  {
    title: "WHO-GMP Standards",
    desc: "Fully compliant manufacturing facilities ensuring absolute safety, hygiene, and global regulatory adherence.",
    tag: "02 / Compliance",
  },
  {
    title: "Extensive Portfolio",
    desc: "Over 30+ comprehensive critical care and specialized therapeutic categories serving diverse medical needs.",
    tag: "03 / Portfolio",
  },
  {
    title: "Trusted Partnerships",
    desc: "Built on foundational reliability, chosen and trusted by leading healthcare institutions nationwide.",
    tag: "04 / Reliability",
  },
];

export default function NovixHero() {
  const videoRef = useRef(null);
  const nextSectionRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const eyebrowRef = useRef(null);
  const charRefs = useRef([]);
  const subRef = useRef(null);
  const ctaBarRef = useRef(null);
  const scrollCueRef = useRef(null);
  const finalCalloutRef = useRef(null);

  const scrollLocked = useRef(true);
  const userInteracted = useRef(false);

  const headlineText = "Novix";

  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  const [videoLoaded, setVideoLoaded] = useState(false);

  // Feature list entrance animation
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hero entrance + scroll-lock + video-end -> scroll-to-next
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const unlockScroll = () => {
      if (!scrollLocked.current) return;
      scrollLocked.current = false;
      document.body.classList.remove("novix-locked");
    };

    const scrollToNext = () => {
      unlockScroll();
      if (nextSectionRef.current) {
        gsap.to(window, {
          duration: 1.6,
          scrollTo: { y: nextSectionRef.current, autoKill: true },
          ease: "power2.inOut",
        });
      }
    };

    const onUserScrollAttempt = (e) => {
      if (scrollLocked.current) {
        e.preventDefault();
      }
      if (!userInteracted.current) {
        userInteracted.current = true;
        scrollToNext();
      }
    };

    const onKeyScrollAttempt = (e) => {
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "];
      if (keys.includes(e.key)) onUserScrollAttempt(e);
    };

    document.body.classList.add("novix-locked");
    window.addEventListener("wheel", onUserScrollAttempt, { passive: false });
    window.addEventListener("touchmove", onUserScrollAttempt, {
      passive: false,
    });
    window.addEventListener("keydown", onKeyScrollAttempt);

    // Video finished -> move to next section automatically
    const videoEl = videoRef.current;
    const handleVideoEnded = () => {
      if (!userInteracted.current) {
        userInteracted.current = true;
        scrollToNext();
      }
    };

    if (videoEl) {
      // Guard against the "ended" event firing before this listener attaches
      // (e.g. a very short clip that finishes while the effect is still running)
      if (videoEl.ended) {
        handleVideoEnded();
      } else {
        videoEl.addEventListener("ended", handleVideoEnded);
      }
    }

    if (reduced) {
      unlockScroll();
      gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
      gsap.set(charRefs.current, { opacity: 1, y: 0 });
      gsap.set(subRef.current, { opacity: 1, y: 0 });
      gsap.set(ctaBarRef.current, { opacity: 1, y: 0 });
      if (scrollCueRef.current) gsap.set(scrollCueRef.current, { opacity: 1 });
      return () => {
        if (videoEl) videoEl.removeEventListener("ended", handleVideoEnded);
        window.removeEventListener("wheel", onUserScrollAttempt);
        window.removeEventListener("touchmove", onUserScrollAttempt);
        window.removeEventListener("keydown", onKeyScrollAttempt);
        document.body.classList.remove("novix-locked");
      };
    }

    // Entrance timeline: text fades in, then a brief blur beat, then the
    // final clean headline. This is purely decorative — it no longer gates
    // the scroll-to-next behaviour, which is driven solely by the video's
    // "ended" event above.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
      .to(
        charRefs.current,
        { opacity: 1, y: 0, duration: 1.0, stagger: 0.045 },
        0.6,
      )
      .to(subRef.current, { opacity: 1, y: 0, duration: 1.0 }, 1.1)
      .to(ctaBarRef.current, { opacity: 1, y: 0, duration: 1.0 }, 1.4);

    if (scrollCueRef.current) {
      tl.to(scrollCueRef.current, { opacity: 1, duration: 0.9 }, 1.7);
    }

    tl.to(
      contentWrapperRef.current,
      {
        filter: "blur(12px)",
        scale: 0.96,
        opacity: 0.4,
        duration: 1.2,
        ease: "power2.inOut",
      },
      3.0,
    ).to(
      finalCalloutRef.current,
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      },
      8.0,
    );

    return () => {
      tl.kill();
      if (videoEl) videoEl.removeEventListener("ended", handleVideoEnded);
      document.body.classList.remove("novix-locked");
      window.removeEventListener("wheel", onUserScrollAttempt);
      window.removeEventListener("touchmove", onUserScrollAttempt);
      window.removeEventListener("keydown", onKeyScrollAttempt);
    };
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-black">
        {/* Top Video Container Area */}
        <div className="relative w-full flex-1 min-h-[50vh] overflow-hidden bg-black flex items-center justify-center">
          <>
            {/* Poster */}
            <img
              src="/videos/hero-poster.jpg"
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                videoLoaded ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Video — plays once, then scrolls to the next section on "ended" */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="metadata"
              onCanPlay={() => setVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </>

          <div className="absolute inset-0 bg-black/40 lg:bg-transparent pointer-events-none" />

          {/* Center Text Container (Initial Animation) */}
          <div
            ref={contentWrapperRef}
            className="absolute inset-0 z-[12] flex flex-col items-center justify-center pointer-events-none text-center px-4 will-change-[filter,transform,opacity]"
          >
            <div
              ref={eyebrowRef}
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#216853] mb-3 sm:mb-5 opacity-0 translate-y-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#216853]/20 shadow-sm"
            >
              Pioneering Healthcare Intelligence
            </div>

            <h1
              className="font-light text-[56px] sm:text-[80px] md:text-[110px] lg:text-[156px] leading-[0.9] tracking-[-0.02em] text-white m-0 flex justify-center drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {headlineText.split("").map((ch, i) => (
                <span
                  key={i}
                  ref={(el) => (charRefs.current[i] = el)}
                  className="inline-block opacity-0 translate-y-[45px]"
                >
                  {ch}
                </span>
              ))}
            </h1>

            <p
              ref={subRef}
              className="mt-3 sm:mt-6 text-sm sm:text-base md:text-lg text-white/95 font-light tracking-[0.01em] opacity-0 translate-y-[12px] max-w-[540px] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] px-4"
            >
              The moment human intuition meets computational precision —
              engineered into every diagnostic pathway Novix delivers.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/80 font-semibold md:hidden">
              <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
                WHO-GMP Certified
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
                Global Standards
              </span>
            </div>
          </div>

          {/* Final 4 Seconds Re-introduction of Original Style Title/Subtitle */}
          <div
            ref={finalCalloutRef}
            className="absolute inset-0 z-[15] flex flex-col items-center justify-center pointer-events-none text-center px-4 opacity-0 scale-95 will-change-[opacity,transform]"
          >
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#216853] mb-3 sm:mb-5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#216853]/20 shadow-sm">
              Pioneering Healthcare Intelligence
            </div>

            <h2
              className="font-light text-[56px] sm:text-[80px] md:text-[110px] lg:text-[156px] leading-[0.9] tracking-[-0.02em] text-white m-0 flex justify-center drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {headlineText}
            </h2>

            <p className="mt-3 sm:mt-6 text-sm sm:text-base md:text-lg text-white/95 font-light tracking-[0.01em] max-w-[340px] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] px-4">
              The moment human intuition meets computational precision —
              engineered into every diagnostic pathway Novix delivers.
            </p>
          </div>

          {/* Desktop Floating Mid-Banner */}
          <div className="absolute inset-x-0 bottom-6 z-20 hidden md:flex justify-center items-center pointer-events-none opacity-80">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full flex items-center gap-8 text-white/80 text-xs tracking-widest uppercase">
              <span>WHO-GMP Certified</span>
              <span className="w-1 h-1 rounded-full bg-[#216853]" />
              <span>Global Standards</span>
              <span className="w-1 h-1 rounded-full bg-[#216853]" />
              <span>Critical Care Excellence</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div
          ref={ctaBarRef}
          className="relative z-30 bg-white backdrop-blur-[12px] border-t border-[#06233F]/10 px-5 sm:px-8 md:px-16 py-5 sm:py-6 md:py-8 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 opacity-100 pointer-events-auto shadow-[0_-15px_35px_rgba(0,0,0,0.1)] shrink-0"
        >
          <div className="flex flex-col text-center lg:text-left max-w-xl">
            <span className="text-[10px] tracking-[0.3em] font-bold text-[#216853] uppercase mb-0.5">
              Therapeutic Portfolio & Access
            </span>
            <p
              className="text-sm sm:text-lg md:text-xl text-[#06233F] font-normal leading-snug"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Explore our certified formulations or get in touch with our team.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3">
            <Link
              to="/products"
              className="w-full sm:w-auto font-semibold text-xs md:text-sm tracking-[0.03em] !text-white bg-[#216853] rounded-full px-6 py-3 hover:bg-[#184d3d] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#216853]/30 text-center"
            >
              View Products
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto font-semibold text-xs md:text-sm tracking-[0.03em] text-[#06233F] border border-[#06233F]/20 rounded-full px-6 py-3 bg-[#F8FAFC] hover:bg-[#06233F] hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Scroll Target Section */}
      <section
        ref={(el) => {
          sectionRef.current = el;
          nextSectionRef.current = el;
        }}
        className="relative bg-[#F8FAFC] px-6 md:px-14 py-24 md:py-32 flex flex-col items-center text-center select-none"
      >
        <div className="w-full max-w-4xl border-t border-b border-[#06233F]/15 py-16 md:py-20 flex flex-col items-center">
          <h2
            className="font-normal text-3xl md:text-4xl lg:text-5xl max-w-[600px] leading-[1.2] mb-16 md:mb-20 text-[#06233F]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Why Healthcare Professionals Choose Novix Healthcare
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-16 gap-x-8">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                ref={(el) => (itemRefs.current[index] = el)}
                className="opacity-0 flex flex-col items-center group cursor-default"
              >
                <h3
                  className="font-normal text-lg md:text-xl text-[#06233F] tracking-wide mb-4 transition-all duration-300 group-hover:text-[#216853] group-hover:scale-105"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {feature.title}
                </h3>
                {/* Premium Glow & Ring Indicator */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full bg-[#216853]/10 scale-0 transition-transform duration-500 ease-out group-hover:scale-100" />
                  <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#216853] bg-white transition-all duration-300 group-hover:scale-125 group-hover:bg-[#216853] shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}