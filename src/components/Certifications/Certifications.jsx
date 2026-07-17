import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Award, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cert-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current.querySelectorAll('.cert-card'),
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'back.out(1.2)',
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const certifications = [
    {
      label: 'WHO GMP',
      desc: 'Manufacturing in certified facilities for consistent pharmaceutical quality.',
      icon: Globe,
      accent: 'from-sky-400 to-cyan-300',
    },
    {
      label: 'ISO 9001',
      desc: 'Structured quality management systems across production and logistics.',
      icon: Award,
      accent: 'from-violet-400 to-fuchsia-400',
    },
    {
      label: 'ISO 14001',
      desc: 'Sustainable operations designed to minimize environmental impact.',
      icon: ShieldCheck,
      accent: 'from-emerald-400 to-teal-400',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="novix-certifications-section"
      className="relative w-full max-w-[1280px] mx-auto py-24 px-6 md:px-12 select-none"
    >
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute left-8 top-12 h-[260px] w-[260px] rounded-full bg-blue-500/8 blur-[120px]" />
        <div className="absolute right-0 bottom-16 h-[300px] w-[300px] rounded-full bg-violet-500/8 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center mb-16">
        <p className="text-sm uppercase tracking-[0.32em] text-sky-300/80 mb-4">Certifications</p>
        <h2 className="cert-heading text-4xl md:text-5xl font-bold tracking-tight text-white">
          Built to earn trust at every step.
        </h2>
        <p className="mt-6 text-base md:text-lg text-slate-300 leading-relaxed">
          Novix Healthcare operates with a modern quality system that aligns manufacturing excellence with local Indian standards.
        </p>
      </div>

      <div ref={cardsRef} className="relative z-10 grid gap-6 md:grid-cols-3">
        {certifications.map((cert) => {
          const Icon = cert.icon;
          return (
            <div key={cert.label} className="cert-card rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10">
              <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${cert.accent} text-white shadow-lg`}>
                <Icon className="h-7 w-7 stroke-[1.5]" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">{cert.label}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{cert.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-16 rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-sky-300/80 mb-2">Quality bar</p>
            <h3 className="text-3xl font-bold text-white">Strict compliance, consistently delivered.</h3>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/30 px-5 py-4 text-sm text-slate-100">
            <ShieldCheck className="h-5 w-5 stroke-[2] text-sky-300" />
            Approved for India’s regulated healthcare market.
          </div>
        </div>
      </div>
    </section>
  );
}
