import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, User, Pencil, ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left Column Animation (Fade + Slide Right)
      gsap.fromTo(leftColRef.current,
        { opacity: 0, x: -50, filter: "blur(10px)" },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out"
        }
      );

      // Right Column Animation (Fade + Slide Left + Scale)
      gsap.fromTo(rightColRef.current,
        { opacity: 0, x: 50, scale: 0.98, filter: "blur(10px)" },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out"
        }
      );

      // Info Cards stagger lift
      gsap.fromTo(".info-item-card",
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out"
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="novix-contact-section"
      className="w-full max-w-[1280px] mx-auto bg-transparent text-white py-28 px-6 md:px-12 relative overflow-visible flex flex-col items-center select-none shrink-0"
    >
      {/* Premium ambient radial glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-600/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* TWO COLUMN PREMIUM LAYOUT */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* LEFT COLUMN: BRANDING & CONTACT INFO */}
        <div ref={leftColRef} className="lg:col-span-5 flex flex-col text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold font-sans">
              Connect With Us
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Let’s start<br />something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">extraordinary.</span>
          </h2>

          <p className="text-base text-white/60 leading-relaxed font-sans mb-12 max-w-md">
            Have questions about our medical solutions, formulations, or global partnerships? Our dedicated support team is here to assist you.
          </p>

          {/* Elegant Detail Stack */}
          <div className="flex flex-col gap-6 w-full max-w-sm">
            {[
              { icon: Phone, title: "Call Our Support", value: "+91 98765 43210", link: "tel:+919876543210" },
              { icon: Mail, title: "General Inquiries", value: "info@novixpharma.com", link: "mailto:info@novixpharma.com" },
              { icon: MapPin, title: "Manufacturing Headquarters", value: "Baddi, Himachal Pradesh, India", link: null }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="info-item-card flex items-start gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-blue-500/30 transition-all duration-500 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/5 border border-blue-500/15 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-500">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider font-sans mb-1">
                      {item.title}
                    </span>
                    {item.link ? (
                      <a href={item.link} className="text-sm font-bold text-white/80 hover:text-blue-400 transition-colors duration-300 font-sans">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-bold text-white/80 font-sans">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: MAJESTIC FORM CARD */}
        <div ref={rightColRef} className="lg:col-span-7 w-full">
          <div className="w-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.15] shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)] backdrop-blur-[40px] rounded-[36px] p-8 md:p-12 relative overflow-hidden">
            
            {/* Corner Light Glow Accent */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />

            <div className="text-left mb-10">
              <h3 className="text-2xl font-bold text-white mb-2 font-sans tracking-wide">
                Send Us a Message
              </h3>
              <p className="text-xs text-white/40 font-sans">
                Fill out the form below and we will respond to you within 24 business hours.
              </p>
            </div>

            {/* FORM */}
            <form className="w-full flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              
              {/* Name Input with Floating Label */}
              <div className="relative group w-full">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-blue-400 transition-colors duration-300">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="name"
                  placeholder=" "
                  className="peer w-full bg-[#000000]/60 border border-white/20 rounded-2xl pl-12 pr-6 pt-6 pb-2 text-sm text-white placeholder-transparent focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/40 focus:bg-[#050505] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                />
                <label
                  htmlFor="name"
                  className="absolute left-12 top-4 text-white/70 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-400 font-medium"
                >
                  Full Name
                </label>
              </div>

              {/* Contact No. Input with Floating Label */}
              <div className="relative group w-full">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-blue-400 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  id="phone"
                  placeholder=" "
                  className="peer w-full bg-[#000000]/60 border border-white/20 rounded-2xl pl-12 pr-6 pt-6 pb-2 text-sm text-white placeholder-transparent focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/40 focus:bg-[#050505] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-12 top-4 text-white/70 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-400 font-medium"
                >
                  Contact Number
                </label>
              </div>

              {/* Email Input with Floating Label */}
              <div className="relative group w-full">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-blue-400 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  className="peer w-full bg-[#000000]/60 border border-white/20 rounded-2xl pl-12 pr-6 pt-6 pb-2 text-sm text-white placeholder-transparent focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/40 focus:bg-[#050505] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                />
                <label
                  htmlFor="email"
                  className="absolute left-12 top-4 text-white/70 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-400 font-medium"
                >
                  Email Address
                </label>
              </div>

              {/* Address Input with Floating Label */}
              <div className="relative group w-full">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-blue-400 transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="address"
                  placeholder=" "
                  className="peer w-full bg-[#000000]/60 border border-white/20 rounded-2xl pl-12 pr-6 pt-6 pb-2 text-sm text-white placeholder-transparent focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/40 focus:bg-[#050505] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                />
                <label
                  htmlFor="address"
                  className="absolute left-12 top-4 text-white/70 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-400 font-medium"
                >
                  Location / Address
                </label>
              </div>

              {/* Description Input with Floating Label */}
              <div className="relative group w-full">
                <span className="absolute top-5 left-5 text-white/60 group-focus-within:text-blue-400 transition-colors duration-300">
                  <Pencil className="w-4 h-4" />
                </span>
                <textarea
                  id="desc"
                  rows={4}
                  placeholder=" "
                  className="peer w-full bg-[#000000]/60 border border-white/20 rounded-2xl pl-12 pr-6 pt-6 pb-2 text-sm text-white placeholder-transparent focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/40 focus:bg-[#050505] transition-all duration-300 resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                />
                <label
                  htmlFor="desc"
                  className="absolute left-12 top-4 text-white/70 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-400 font-medium"
                >
                  How can we help you? (Message)
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wider py-4 px-8 rounded-2xl shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.5)] transition-all duration-500 flex items-center justify-center gap-2 group cursor-pointer mt-4"
              >
                Send Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

            </form>
          </div>
        </div>

      </div>

      {/* FOOTER VALUES BAR */}
      <div className="w-full flex flex-col items-center mt-28 relative z-10 border-t border-white/[0.04] pt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]" />
          <span className="text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase font-sans">
            Caring for life, committed to excellence
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]" />
        </div>
        <p className="text-[11px] text-white/40 font-sans tracking-wide">
          © 2025 Novix Pharmaceuticals. All Rights Reserved.
        </p>
      </div>

    </section>
  );
}
