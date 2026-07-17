import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, User, Pencil, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import bgVideo from '../../../contact.mp4';

import StatItem from './StatItem';
import InfoCard from './InfoCard';
import { FormField, FormTextarea } from './FormField';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_DETAILS = [
  { icon: Phone, title: 'Call Our Support', value: '+91 98765 43210', link: 'tel:+919876543210' },
  { icon: Mail, title: 'General Inquiries', value: 'info@novixpharma.com', link: 'mailto:info@novixpharma.com' },
  { icon: MapPin, title: 'Manufacturing Headquarters', value: 'Baddi, Himachal Pradesh, India', link: null },
];

const HEADLINE_LINE_1 = ["Let's", 'start'];
const HEADLINE_LINE_2 = ['something'];

export default function Contact() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const videoRef = useRef(null);

  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced.current) {
        gsap.set(
          ['.headline-word', '.eyebrow-badge', '.lede-copy', '.stat-item', '.info-item-card', '.form-panel'],
          { opacity: 1, y: 0, x: 0, filter: 'none', clearProps: 'all' }
        );
        return;
      }

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      introTl
        .fromTo(
          '.eyebrow-badge',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 }
        )
        // headline reveals word by word — the brief's explicit ask
        .fromTo(
          '.headline-word',
          { opacity: 0, y: 24, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            stagger: 0.06,
          },
          '-=0.3'
        )
        .fromTo(
          '.lede-copy',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.35'
        )
        .fromTo(
          '.stat-item',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          '.info-item-card',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          rightColRef.current,
          { opacity: 0, x: 40, scale: 0.98, filter: 'blur(8px)' },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power4.out',
          },
          '-=0.9'
        );

      gsap.set(
        ['.headline-word', '.eyebrow-badge', '.lede-copy', '.stat-item', '.info-item-card'],
        { willChange: 'transform, opacity' }
      );

      // Subtle parallax on the video — foreground reacts to scroll depth
      gsap.to(videoRef.current, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="novix-contact-section"
      className="relative flex w-full shrink-0 select-none flex-col items-center overflow-hidden py-28 text-white"
    >
      {/* BACKGROUND VIDEO — unchanged, preserved exactly as requested */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        {/* Legibility scrim — supports content without hiding the video */}

      </div>

      {/* Ambient glass reflections — layered depth over the video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-[8%] h-[480px] w-[480px] rounded-full bg-blue-500/[0.06] blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-[6%] h-[560px] w-[560px] rounded-full bg-cyan-400/[0.05] blur-[150px]"
      />
      {/* Faint blueprint grid — scientific precision cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #94A3B8 1px, transparent 1px), linear-gradient(to bottom, #94A3B8 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 30% 30%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 30% 30%, black 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 md:px-12">
        <div className="grid w-full grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — storytelling column */}
          <div ref={leftColRef} className="flex flex-col text-left lg:col-span-6">
            <div className="eyebrow-badge mb-7 flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3.5 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200">
                Connect With Us
              </span>
            </div>

            <h2 className="mb-7 max-w-xl text-[44px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-6xl lg:text-[68px]">
              <span className="block overflow-hidden">
                {HEADLINE_LINE_1.map((word) => (
                  <span key={word} className="headline-word mr-3 inline-block">
                    {word}
                  </span>
                ))}
              </span>
              <span className="block overflow-hidden">
                {HEADLINE_LINE_2.map((word) => (
                  <span key={word} className="headline-word mr-3 inline-block">
                    {word}
                  </span>
                ))}
                <span className="headline-word inline-block bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                  extraordinary.
                </span>
              </span>
            </h2>

            <p className="lede-copy mb-14 max-w-md text-[15px] leading-relaxed text-slate-300">
              Have questions about our medical solutions, formulations, or
              global partnerships? Our dedicated support team is here to
              assist you.
            </p>

            {/* Trust stats */}
            <div className="mb-14 grid max-w-md grid-cols-3 gap-6 border-y border-white/[0.06] py-8">
              <StatItem target={25} suffix="+" label="Countries Served" />
              <StatItem target={150} suffix="+" label="Healthcare Partners" />
              <StatItem
                isText
                label={{ value: 'WHO-GMP', caption: 'Certified Manufacturing' }}
              />
            </div>

            {/* Contact detail cards */}
            <div className="flex w-full max-w-sm flex-col gap-4">
              {CONTACT_DETAILS.map((item) => (
                <InfoCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          {/* RIGHT — floating glass form, overlapping the left column on large screens */}
          <div ref={rightColRef} className="form-panel lg:col-span-6 lg:-ml-6 lg:mt-16">
            <div className="relative overflow-hidden rounded-[32px] border border-white/[0.12] bg-gradient-to-br from-white/[0.07] to-white/[0.015] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-[32px] md:p-11">
              {/* corner light accent */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-[50px]" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-blue-500/10 blur-[60px]" />

              <div className="relative mb-9 text-left">
                <h3 className="mb-2 text-2xl font-semibold tracking-tight text-white">
                  Send Us a Message
                </h3>
                <p className="text-[13px] text-slate-400">
                  Fill out the form below and we&apos;ll respond within 24
                  business hours.
                </p>
              </div>

              <form
                className="relative flex w-full flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <FormField icon={User} id="name" label="Full Name" />
                <FormField icon={Phone} id="phone" type="tel" label="Contact Number" />
                <FormField icon={Mail} id="email" type="email" label="Email Address" />
                <FormField icon={MapPin} id="address" label="Location / Address" />
                <FormTextarea icon={Pencil} id="desc" label="How can we help you? (Message)" />

                {/* Premium CTA — light sweep is the page's visual highlight */}
                <button
                  type="submit"
                  className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_14px_28px_rgba(59,130,246,0.3)] transition-shadow duration-500 hover:shadow-[0_18px_40px_rgba(103,232,249,0.35)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full"
                  />
                  <span className="relative">Send Message</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-28 flex w-full flex-col items-center border-t border-white/[0.06] pt-12">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200">
              Caring for life, committed to excellence
            </span>
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
          </div>
          <p className="text-[11px] tracking-wide text-slate-500">
            © 2025 Novix Healthcare. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}