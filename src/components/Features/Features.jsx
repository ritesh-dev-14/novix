import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, FlaskConical, Globe, Users, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.querySelectorAll('.feature-heading'),
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        featuresRef.current.querySelectorAll('.feature-card'),
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: 'back.out(1.24)',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      icon: ShieldCheck,
      title: 'Regulatory confidence',
      desc: 'Optimized compliance and approvals for Indian market entry and distribution.',
    },
    {
      icon: FlaskConical,
      title: 'Precision formulation',
      desc: 'Science-led development, tailored to local patients, climate and affordability.',
    },
    {
      icon: Globe,
      title: 'Focused distribution',
      desc: 'A resilient supply chain built for dependable delivery to clinics across India.',
    },
    {
      icon: Users,
      title: 'Patient-first service',
      desc: 'Commitment to better outcomes through education, reliability and care.',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="trusted-partners-section"
      className="relative w-full max-w-[1280px] mx-auto py-24 px-6 md:px-12 select-none"
    >
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute left-0 top-10 h-[360px] w-[360px] rounded-full bg-sky-500/5 blur-[120px]" />
        <div className="absolute right-0 top-24 h-[240px] w-[240px] rounded-full bg-violet-500/6 blur-[100px]" />
      </div>

      <div ref={headingRef} className="relative z-10 mx-auto max-w-4xl text-center mb-14">
        <p className="feature-heading text-sm uppercase tracking-[0.3em] text-sky-300/80 mb-4">
          Why Novix Healthcare?
        </p>
        <h2 className="feature-heading text-4xl md:text-5xl font-bold tracking-tight text-white">
          A premium Indian pharmaceutical partner with modern precision.
        </h2>
        <p className="feature-heading mt-6 text-base md:text-lg text-slate-300 leading-relaxed">
          We combine advanced manufacturing discipline, trusted approval frameworks and a patient-first vision to make better medicines available across India.
        </p>
      </div>

      <div ref={featuresRef} className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="feature-card group rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 border border-white/10 text-sky-200 transition-all duration-500 group-hover:bg-sky-500/10 group-hover:text-sky-200">
                <Icon className="h-7 w-7 stroke-[1.7]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
