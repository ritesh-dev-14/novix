import { motion } from 'motion/react';
import { Microscope, Pill, Globe, Users } from 'lucide-react';

export default function About() {
  const cardData = [
    {
      icon: Microscope,
      title: 'India-first manufacturing',
      desc: 'Manufactured and packaged in India for the needs of Indian patients, doctors and clinics.',
    },
    {
      icon: Pill,
      title: 'Focused product range',
      desc: 'A sleek portfolio of high-impact therapies across critical categories.',
    },
    {
      icon: Globe,
      title: 'Local trust, modern scale',
      desc: 'A trusted partner to distributors, chemists and hospitals across 28 states.',
    },
    {
      icon: Users,
      title: 'Patient-centred care',
      desc: 'We deliver clarity, support and quality at every touchpoint.',
    },
  ];

  return (
    <section id="novix-about-section" className="relative w-full max-w-[1280px] mx-auto py-24 px-6 md:px-12 select-none">
      <div className="absolute left-0 top-12 h-[300px] w-[300px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="max-w-3xl space-y-8 text-white">
          <span className="block text-sm uppercase tracking-[0.32em] text-sky-300/80">
            About Novix Pharma
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Modern pharmaceutical precision grounded in India’s healthcare story.
          </h2>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            Novix Pharma is built for Indian healthcare delivery — combining rigorous manufacturing, trusted approvals, and a confident promise to patients and providers nationwide.
          </p>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Our promise: clarity, compliance, and care.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {cardData.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950/70 text-white shadow-lg">
                  <Icon className="h-7 w-7 stroke-[1.6]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mt-16 rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_35px_90px_rgba(0,0,0,0.15)] backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-sky-300/80 mb-3">Our impact</p>
            <h3 className="text-3xl font-bold text-white">Trusted by partners across India.</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-950/70 p-5 text-center">
              <p className="text-3xl font-semibold text-white">120+</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">SKUs</p>
            </div>
            <div className="rounded-3xl bg-slate-950/70 p-5 text-center">
              <p className="text-3xl font-semibold text-white">28</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">States served</p>
            </div>
            <div className="rounded-3xl bg-slate-950/70 p-5 text-center">
              <p className="text-3xl font-semibold text-white">1,200+</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">partners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
