import { motion } from 'motion/react';
import { Target, Eye, Handshake } from 'lucide-react';

export default function About() {
  const cardData = [
    {
      icon: Target,
      title: 'Mission',
      desc: 'To manufacture and deliver world-class critical care injectables meeting the highest standards of safety, efficacy, and quality for every patient.',
    },
    {
      icon: Eye,
      title: 'Vision',
      desc: 'To become India’s most trusted hospital-sector pharmaceutical brand, serving every ICU and critical care unit with reliable, affordable medicines.',
    },
    {
      icon: Handshake,
      title: 'Values',
      desc: 'Quality • Integrity • Patient First • Innovation • Accessibility — the pillars of every decision we make at Novix Healthcare.',
    },
  ];

  return (
    <section id="novix-about-section" className="relative w-full max-w-[1280px] mx-auto py-24 px-6 md:px-12 select-none">
      <div className="absolute left-0 top-12 h-[300px] w-[300px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="max-w-3xl space-y-8 text-white">
          <span className="block text-sm uppercase tracking-[0.32em] text-sky-300/80">
            About Novix Healthcare
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Driven by Science. <span className="text-sky-300">Guided by Compassion.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            Novix Healthcare is committed to delivering healthcare excellence in India. Combining rigorous science with genuine care, we manufacture and distribute high-impact therapies, with a strong emphasis on critical care. Our experienced leadership team brings diverse expertise across the biopharmaceutical ecosystem, united by a singular purpose: improving patient outcomes.
          </p>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Our guiding philosophy: precision, passion, and partnership.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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

      {/* Add a simplified placeholder section below that reflects the bottom half of the image's purpose if needed, or simply style the existing 'impact' card to be more aligned with the image's clean white card aesthetic in the other section of the page. Given the image has contact and team info below, let's keep the impact card but make it match the design language. */}

      <div className="relative z-10 mt-16 rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_35px_90px_rgba(0,0,0,0.15)] backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-sky-300/80 mb-3">Our impact</p>
            <h3 className="text-3xl font-bold text-white">Serving partners nationwide.</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-950/70 p-5 text-center">
              <p className="text-3xl font-semibold text-white">20+</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">Therapies</p>
            </div>
            <div className="rounded-3xl bg-slate-950/70 p-5 text-center">
              <p className="text-3xl font-semibold text-white">28</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">States served</p>
            </div>
            <div className="rounded-3xl bg-slate-950/70 p-5 text-center">
              <p className="text-3xl font-semibold text-white">800+</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">Hospitals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}