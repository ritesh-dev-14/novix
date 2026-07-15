export default function Footer() {
  return (
    <footer className="w-full relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl mt-auto">
      <div className="max-w-[1280px] mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1 flex flex-col">
            <div className="flex flex-col items-start leading-none mb-6">
              <span className="font-extrabold tracking-[0.25em] text-2xl text-white font-sans">NOVIX</span>
              <span className="font-medium tracking-[0.4em] text-[10px] text-white/50 font-sans mt-0.5">PHARMA</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-sans">
              Advancing health. Improving lives. Delivering high-quality pharmaceutical solutions globally.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2 font-sans">Quick Links</h4>
            <a href="/" className="text-white/60 hover:text-white transition-colors text-sm font-sans">Home</a>
            <a href="/products" className="text-white/60 hover:text-white transition-colors text-sm font-sans">Solutions</a>
            <a href="/contact" className="text-white/60 hover:text-white transition-colors text-sm font-sans">About Us</a>
            <a href="/contact" className="text-white/60 hover:text-white transition-colors text-sm font-sans">Contact</a>
          </div>

          {/* Products */}
          <div className="col-span-1 flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2 font-sans">Products</h4>
            <span className="text-white/60 text-sm font-sans cursor-pointer hover:text-white transition-colors">Therapeutics</span>
            <span className="text-white/60 text-sm font-sans cursor-pointer hover:text-white transition-colors">Active Ingredients</span>
            <span className="text-white/60 text-sm font-sans cursor-pointer hover:text-white transition-colors">Manufacturing</span>
            <span className="text-white/60 text-sm font-sans cursor-pointer hover:text-white transition-colors">R&D Capabilities</span>
          </div>

          {/* Contact */}
          <div className="col-span-1 flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2 font-sans">Contact</h4>
            <span className="text-white/60 text-sm font-sans">123 Health Avenue<br />London, UK</span>
            <span className="text-white/60 text-sm font-sans">contact@novixpharma.com</span>
            <span className="text-white/60 text-sm font-sans">+44 20 7946 0958</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-white/40 text-xs font-sans">© 2026 Novix Pharma. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="text-white/40 text-xs font-sans hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-white/40 text-xs font-sans hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
