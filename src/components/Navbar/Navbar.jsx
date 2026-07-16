import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tabs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleTabClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header id="banner-header" style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(1280px, 92%)',
        background: 'rgba(8,12,18,.45)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        boxShadow: '0 10px 40px rgba(0,0,0,.35)',
        border: '1px solid rgba(255,255,255,.08)',
        borderRadius: '999px',
        zIndex: 100
      }} className="flex items-center justify-between px-6 py-3">
        
        {/* Logo Layer: Replaced raw text with your imported graphic asset */}
        <NavLink id="navbar-logo-link" to="/" className="flex items-center justify-start cursor-pointer transition-opacity hover:opacity-90">
          <img 
            src={logo} 
            alt="NOVIX Health Care Logo" 
            className="h-9 w-auto object-contain" 
          />
        </NavLink>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] rounded-full p-1 backdrop-blur-[20px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `px-5 py-2 text-[14px] font-medium rounded-full transition-all duration-300 relative cursor-pointer ${isActive ? 'text-black font-semibold font-sans bg-white' : 'text-white/60 hover:text-white font-sans'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/products"
            className="hidden md:flex px-5 py-2.5 text-sm font-medium border border-white/20 rounded-full text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer font-sans"
          >
            Explore Solutions
          </NavLink>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[110] flex flex-col justify-between p-8"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between">
              {/* Logo Layer: Mobile view integration */}
              <div className="flex items-center justify-start">
                <img 
                  src={logo} 
                  alt="NOVIX Pharma Logo" 
                  className="h-7 w-auto object-contain" 
                />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex flex-col gap-[32px] my-auto text-left pl-4">
              {tabs.map((tab, idx) => (
                <NavLink
                  key={tab.name}
                  to={tab.path}
                  onClick={handleTabClick}
                  className={({ isActive }) => `flex items-center justify-between w-full text-3xl font-medium tracking-tight text-left cursor-pointer font-sans ${isActive ? 'text-white' : 'text-white/40'}`}
                >
                  {({ isActive }) => (
                    <>
                      <span>{tab.name}</span>
                      {isActive && (
                        <motion.div layoutId="active-indicator-mobile" className="w-2.5 h-2.5 rounded-full bg-white mr-4" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="w-full flex flex-col gap-4">
              <div className="border-t border-white/10 pt-6 flex items-center justify-between text-sm text-white/50">
                <span className="font-sans">© 2026 NOVIX PHARMA</span>
                <span className="flex items-center gap-1 font-sans">🇬🇧 EN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}