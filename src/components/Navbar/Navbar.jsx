import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const aboutSubLinks = [
    { name: "About Us", path: "/about" },
    { name: "Director's Message", path: "/directors-message" },
    { name: "Mission & Vision", path: "/mission-vision" },
  ];

  const mainTabs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about", isDropdown: true },
    { name: "Blogs", path: "/blogs" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const handleTabClick = () => {
    setIsMobileMenuOpen(false);
    setIsAboutOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isAboutActive = location.pathname === "/about";

  return (
    <>
      <header
        id="banner-header"
        className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ease-in-out ${
          isScrolled
            ? "top-0 w-full rounded-none bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md py-3 px-6 md:px-12"
            : "top-5 w-[min(1280px,94%)] rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-900/5 py-2.5 px-6"
        } flex items-center justify-between`}
      >
        {/* Logo */}
        <NavLink
          id="navbar-logo-link"
          to="/"
          onClick={handleTabClick}
          className="flex items-center justify-start cursor-pointer transition-opacity hover:opacity-80 shrink-0"
        >
          <img
            src={logo}
            alt="NOVIX Healthcare Logo"
            className="h-7 md:h-8 w-auto object-contain"
          />
        </NavLink>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60">
          {mainTabs.map((tab) => {
            if (tab.isDropdown) {
              return (
                <div
                  key={tab.name}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  <button
                    onClick={() => setIsAboutOpen((prev) => !prev)}
                    className={`relative flex items-center gap-1 px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer ${
                      isAboutActive ? "!text-white" : "text-[#06233F] hover:text-[#216853]"
                    }`}
                  >
                    {isAboutActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-[#06233F] rounded-full shadow-sm z-0"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.name}</span>
                    <ChevronDown
                      size={14}
                      className={`relative z-10 transition-transform duration-200 ${
                        isAboutOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isAboutOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white p-2 border border-slate-200/80 shadow-xl shadow-slate-900/10 z-50"
                      >
                        {aboutSubLinks.map((subItem) => (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            onClick={handleTabClick}
                            className={({ isActive }) =>
                              `block px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors ${
                                isActive
                                  ? "bg-[#216853] !text-white"
                                  : "text-[#06233F] hover:bg-slate-100 hover:text-[#216853]"
                              }`
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = location.pathname === tab.path;
            return (
              <NavLink
                key={tab.name}
                to={tab.path}
                onClick={handleTabClick}
                className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer ${
                  isActive ? "!text-white" : "text-[#06233F] hover:text-[#216853]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#06233F] rounded-full shadow-sm z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/products"
            onClick={handleTabClick}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#216853] !text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-[#184d3d] hover:shadow-md active:scale-95 border border-transparent"
          >
            <span className="!text-white">Explore Solutions</span>
            <ArrowUpRight size={15} className="!text-white" />
          </NavLink>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#06233F] hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white z-[110] flex flex-col justify-between p-8 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <NavLink to="/" onClick={handleTabClick}>
                <img src={logo} alt="NOVIX Healthcare Logo" className="h-8 w-auto object-contain" />
              </NavLink>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full text-[#06233F] hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-5 my-auto text-left pl-2 py-6">
              {/* Home */}
              <NavLink
                to="/"
                onClick={handleTabClick}
                className={({ isActive }) =>
                  `text-2xl font-bold tracking-tight transition-colors ${
                    isActive ? "text-[#06233F]" : "text-slate-400 hover:text-[#216853]"
                  }`
                }
              >
                Home
              </NavLink>

              {/* Products */}
              <NavLink
                to="/products"
                onClick={handleTabClick}
                className={({ isActive }) =>
                  `text-2xl font-bold tracking-tight transition-colors ${
                    isActive ? "text-[#06233F]" : "text-slate-400 hover:text-[#216853]"
                  }`
                }
              >
                Products
              </NavLink>

              {/* About Us Accordion Section */}
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold text-[#06233F] tracking-tight">About</p>
                <div className="pl-4 flex flex-col gap-2.5 border-l-2 border-[#216853]/30 my-1">
                  {aboutSubLinks.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      onClick={handleTabClick}
                      className="text-base font-semibold text-slate-500 hover:text-[#216853] transition-colors"
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Blogs */}
              <NavLink
                to="/blogs"
                onClick={handleTabClick}
                className={({ isActive }) =>
                  `text-2xl font-bold tracking-tight transition-colors ${
                    isActive ? "text-[#06233F]" : "text-slate-400 hover:text-[#216853]"
                  }`
                }
              >
                Blogs
              </NavLink>

              {/* Careers */}
              <NavLink
                to="/careers"
                onClick={handleTabClick}
                className={({ isActive }) =>
                  `text-2xl font-bold tracking-tight transition-colors ${
                    isActive ? "text-[#06233F]" : "text-slate-400 hover:text-[#216853]"
                  }`
                }
              >
                Careers
              </NavLink>

              {/* Contact */}
              <NavLink
                to="/contact"
                onClick={handleTabClick}
                className={({ isActive }) =>
                  `text-2xl font-bold tracking-tight transition-colors ${
                    isActive ? "text-[#06233F]" : "text-slate-400 hover:text-[#216853]"
                  }`
                }
              >
                Contact
              </NavLink>

              <NavLink
                to="/products"
                onClick={handleTabClick}
                className="mt-4 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white text-base font-semibold w-full shadow-lg shadow-[#216853]/20"
              >
                <span className="!text-white">Explore Solutions</span>
                <ArrowUpRight size={18} className="!text-white" />
              </NavLink>
            </div>

            {/* Footer */}
            <div className="w-full border-t border-slate-100 pt-5 flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>© 2026 NOVIX Healthcare</span>
              <span className="uppercase text-[#216853]">Quality & Care</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}