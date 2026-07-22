import { Link, NavLink } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full relative z-10 bg-[#06233F] text-white border-t border-[#06233F]/20 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Logo & Description */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/20 mb-6">
              <img
                src={logo}
                alt="NOVIX Healthcare Logo"
                className="h-8 w-auto object-contain"
              />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-sans mb-6">
              Advancing health. Improving lives. Delivering high-quality, 
              precision-engineered pharmaceutical solutions globally.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#216853]/30 border border-[#216853]/50 text-xs font-semibold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              WHO-GMP & ISO Certified Operations
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-[#216853] font-bold text-xs tracking-widest uppercase mb-2 font-mono">
              Navigation
            </h4>
            
            {[
              { name: "Home", path: "/" },
              { name: "Products & Solutions", path: "/products" },
              { name: "About Novix", path: "/about" },
            ].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={scrollToTop}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium w-fit flex items-center gap-1 group"
              >
                <span>{link.name}</span>
                <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#216853]" />
              </NavLink>
            ))}
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-[#216853] font-bold text-xs tracking-widest uppercase mb-2 font-mono">
              Get in Touch
            </h4>

            <div className="flex items-start gap-3 text-slate-300 text-sm">
              <MapPin size={18} className="text-[#216853] shrink-0 mt-0.5" />
              <span>Shop No. 55, Near Punjab National Bank (PNB), Barara, Ambala, Haryana – 133201, India</span>
            </div>

            <a
              href="mailto:info@novixhealthcare.com"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm"
            >
              <Mail size={18} className="text-[#216853] shrink-0" />
              <span>info@novixhealthcare.com</span>
            </a>

            <a
              href="tel:+918053868387"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm"
            >
              <Phone size={18} className="text-[#216853] shrink-0" />
              <span>+91 8053868387</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-800 text-xs text-slate-400 gap-4">
          <p>© 2026 NOVIX Healthcare. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              onClick={scrollToTop}
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              onClick={scrollToTop}
              className="hover:text-slate-200 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}