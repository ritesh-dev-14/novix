import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="w-full relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl mt-auto">
      <div className="max-w-[1280px] mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1 flex flex-col">
            
            {/* Styled with a clean background container matching the navbar's look */}
            <div 
              style={{
                background: "rgba(245, 247, 250, 0.9)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "16px",
              }}
              className="flex items-center justify-start w-max px-4 py-2.5 mb-6"
            >
              <img 
                src={logo} 
                alt="Novix Healthcare Logo" 
                className="h-9 w-auto object-contain"
              />
            </div>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-sans">
              Advancing health. Improving lives. Delivering high-quality
              pharmaceutical solutions globally.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2 font-sans">
              Quick Links
            </h4>
            <a
              href="/"
              className="text-white/60 hover:text-white transition-colors text-sm font-sans"
            >
              Home
            </a>
            <a
              href="/products"
              className="text-white/60 hover:text-white transition-colors text-sm font-sans"
            >
              Solutions
            </a>
            <a
              href="/about"
              className="text-white/60 hover:text-white transition-colors text-sm font-sans"
            >
              About Us
            </a>
          </div>

          {/* Products */}
          {/* <div className="col-span-1 flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2 font-sans">
              Products
            </h4>
            <span className="text-white/60 text-sm font-sans cursor-pointer hover:text-white transition-colors">
              Therapeutics
            </span>
            <span className="text-white/60 text-sm font-sans cursor-pointer hover:text-white transition-colors">
              Active Ingredients
            </span>
            <span className="text-white/60 text-sm font-sans cursor-pointer hover:text-white transition-colors">
              Manufacturing
            </span>
            <span className="text-white/60 text-sm font-sans cursor-pointer hover:text-white transition-colors">
              R&D Capabilities
            </span>
          </div> */}

          {/* Contact */}
          <div className="col-span-1 flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2 font-sans">
              Contact
            </h4>
            <span className="text-white/60 text-sm font-sans">
              India
              <br />
            </span>
            <span className="text-white/60 text-sm font-sans">
              info@novixhealthcare.com
            </span>
            <span className="text-white/60 text-sm font-sans">
              +91 8053868387
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-white/40 text-xs font-sans">
            © 2026 Novix Healthcare. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="text-white/40 text-xs font-sans hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-white/40 text-xs font-sans hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}