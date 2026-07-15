import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Microscope, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(heroRef.current.querySelectorAll('.hero-element'), {
        opacity: 0,
        y: 36,
        scale: 0.98,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
      }).from(
        statsRef.current.querySelectorAll('.hero-stat'),
        {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
        },
        '-=0.55'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-[1280px] mx-auto min-h-[88vh] px-6 md:px-12 py-24 flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-500/8 blur-[120px]" />
        <div className="absolute right-0 top-32 h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center text-center gap-8">
        <div className="hero-element inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.36em] text-slate-200 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
          Made in India · DCGI Approved
        </div>

        <div ref={heroRef} className="max-w-4xl space-y-8">
          <h1 className="hero-element text-5xl md:text-[5.5rem] font-black tracking-tight text-white leading-[0.95]">
            Premium pharmaceutical manufacturing,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-sky-300">
              designed for India.
            </span>
          </h1>

          <p className="hero-element mx-auto max-w-3xl text-lg md:text-xl text-slate-300 leading-relaxed">
            Novix Pharma combines clinical-grade science, trusted approvals and a modern Indian supply chain to deliver medicines that stay true to comfort, compliance and care.
          </p>

          <div className="hero-element flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center rounded-full bg-white text-slate-950 px-8 py-4 text-base font-semibold shadow-[0_18px_60px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50">
              Explore product range
              <ArrowUpRight className="ml-3 h-5 w-5 stroke-[3]" />
            </button>
            <a className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-slate-200 transition-all duration-300 hover:border-white/30 hover:bg-white/10">
              View our manufacturing
            </a>
          </div>
        </div>

        <div
          ref={statsRef}
          className="hero-element grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3"
        >
          <div className="hero-stat rounded-[32px] border border-white/10 bg-white/5 p-8 text-left shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <span className="block text-sm uppercase tracking-[0.32em] text-sky-200/70 mb-4">Scale</span>
            <p className="text-4xl font-semibold text-white">120+</p>
            <p className="mt-2 text-sm text-slate-300">Core pharmaceutical products across key therapeutic categories.</p>
          </div>
          <div className="hero-stat rounded-[32px] border border-white/10 bg-white/5 p-8 text-left shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <span className="block text-sm uppercase tracking-[0.32em] text-sky-200/70 mb-4">Trust</span>
            <p className="text-4xl font-semibold text-white">DCGI</p>
            <p className="mt-2 text-sm text-slate-300">Approved medicines built for the Indian healthcare ecosystem.</p>
          </div>
          <div className="hero-stat rounded-[32px] border border-white/10 bg-white/5 p-8 text-left shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <span className="block text-sm uppercase tracking-[0.32em] text-sky-200/70 mb-4">Reach</span>
            <p className="text-4xl font-semibold text-white">28</p>
            <p className="mt-2 text-sm text-slate-300">States supported through a reliable supply network and local partnerships.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
