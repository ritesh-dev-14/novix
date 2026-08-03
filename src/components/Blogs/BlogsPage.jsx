import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  Mail,
  Tag,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

const FONT_ID = "editorial-fonts";

const CATEGORIES = [
  "All",
  "Quality Control",
  "Injectable Formulations",
  "Industry Standards",
  "Healthcare Innovation",
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding WHO-GMP Standards in Injectable Manufacturing",
    excerpt:
      "A deep dive into why strict WHO-GMP compliance is critical for ampoules, vials, and parenteral formulations in modern hospital supply chains.",
    content: [
      "World Health Organization Good Manufacturing Practices (WHO-GMP) serve as the benchmark for pharmaceutical safety and quality worldwide. When manufacturing liquid injectables, ampoules, and vials, maintaining sterile conditions is not just a regulatory requirement—it is a critical patient safety imperative.",
      "At Novix Healthcare, our production facilities incorporate cleanrooms with ISO Class 5 air purity, automated aseptic filling lines, and multi-stage terminal sterilization systems. Every batch undergoes rigorous sterility, bacterial endotoxin, and particulate testing prior to distribution.",
      "Implementing continuous environmental monitoring and micro-filtration ensures that high-risk critical care formulations retain absolute purity from raw active pharmaceutical ingredients (APIs) to the final clinical packaging."
    ],
    category: "Quality Control",
    author: "Novix Quality Assurance Team",
    date: "July 12, 2026",
    readTime: "5 min read",
    image: "https://imgs.search.brave.com/QvviVHa08NfGqDJtkBV8stAGxlWBynHMAoawIaebcVc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jcGlt/Zy50aXN0YXRpYy5j/b20vMDQ5MDU0MDAv/Yi80L2luamVjdGFi/bGUtcHJvZHVjdHMu/anBn",
    featured: true,
  },
  {
    id: 2,
    title: "The Role of Critical Care Injectables in Emergency Medicine",
    excerpt:
      "How rapid-response parenteral formulations streamline emergency medical care and improve critical patient recovery rates.",
    content: [
      "In acute clinical settings, intravenous and intramuscular injectables offer immediate bioavailability—bypassing the gastrointestinal tract to deliver life-saving therapeutic active ingredients in seconds.",
      "Emergency response units rely heavily on liquid formulations that remain stable under varying conditions. Quality packaging, precise dosage concentrations, and clear labeling directly reduce administration errors during high-stress critical procedures.",
      "Modern manufacturing techniques now focus on pre-filled syringes and ready-to-use liquid vials, reducing preparation time at the hospital bedside."
    ],
    category: "Injectable Formulations",
    author: "Dr. Ananya Rao, Medical Affairs",
    date: "June 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 3,
    title: "Ensuring Cold-Chain Integrity Across Distribution Networks",
    excerpt:
      "Maintaining temperature control and chemical stability for sensitive parenteral formulations from facility to hospital beds.",
    category: "Industry Standards",
    author: "Novix Logistics & Supply Team",
    date: "June 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    featured: false,
    content: [
      "Thermolabile pharmaceutical injectables demand continuous temperature monitoring throughout storage, dispatch, and final delivery. A slight fluctuation in storage conditions can compromise therapeutic protein integrity or formulation shelf-life.",
      "By utilizing IoT-enabled temperature sensors and insulated thermal packaging solutions, suppliers can track real-time conditions across transit routes. Maintaining uninterrupted cold-chain logistics ensures hospital networks receive uncompromised medical inventory every time."
    ]
  },
  {
    id: 4,
    title: "Advancements in Sterile Glass Ampoule & Vial Packaging",
    excerpt:
      "Exploring Type-I borosilicate glass treatments and polymer ampoules engineered to prevent drug-container interactions.",
    category: "Healthcare Innovation",
    author: "Packaging Engineering Dept.",
    date: "May 30, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800",
    featured: false,
    content: [
      "Container closure integrity (CCI) is vital for liquid injectables. Type-I borosilicate glass remains the industry standard due to its high chemical resistance and low hydrolytic leaching properties.",
      "Recent innovations in internal surface treatments reduce delamination risks in high-pH drug formulations. Furthermore, snap-off ampoule designs allow healthcare practitioners to open sterile containers cleanly without glass particulate contamination."
    ]
  },
  {
    id: 5,
    title: "Lyophilization Tech: Extending Liquid Formulation Stability",
    excerpt:
      "How freeze-drying technology preserves fragile drug molecules for extended shelf-life without chemical degradation.",
    category: "Healthcare Innovation",
    author: "R&D Formulation Team",
    date: "May 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    featured: false,
    content: [
      "Lyophilization (freeze-drying) removes water from sensitive liquid formulations at low temperatures under vacuum conditions. This process converts unstable biological and chemical compounds into durable dry powders.",
      "When reconstituted with sterile water for injection (SWFI) right before administration, lyophilized drugs deliver full potency without needing harsh chemical preservatives."
    ]
  }
];

function useFonts() {
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById(FONT_ID)) {
      const link = document.createElement("link");
      link.id = FONT_ID;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);
}

/* 3D Magnetic Motion Tilt Container */
function TiltContainer({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-300 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Reveal({ children, delay = 0, y = 30, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function BlogsPage() {
  useFonts();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState(null);

  const containerRef = useRef();
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  const handleGlobalMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((post) => post.featured) || BLOG_POSTS[0];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative w-full max-w-full overflow-x-hidden min-h-screen bg-[#F8FAFC] text-[#06233F]/80 pt-20 m-0 p-0"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Dynamic Light Cursor Tracking Spotlight */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] bg-radial from-[#216853]/10 via-transparent to-transparent rounded-full blur-3xl z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${cursorPos.x - 300}px, ${cursorPos.y - 300}px)`,
        }}
      />

      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v100M30 0v100M50 0v100M70 0v100M90 0v100M0 10h100M0 30h100M0 50h100M0 70h100M0 90h100' stroke='%2306233F' stroke-width='1' fill='none'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%2306233F'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ================= HERO HEADER ================= */}
      <header className="relative z-10 pt-10 md:pt-16 pb-12 text-center border-b border-[#06233F]/10">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#216853] animate-ping" />
              Insights & Updates
            </p>
            <h1
              className="font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-[#06233F] mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Latest Articles &{" "}
              <span className="italic font-normal text-[#216853]">Knowledge</span>
            </h1>
            <p className="text-base md:text-lg text-[#06233F]/70 font-light leading-relaxed max-w-2xl mx-auto">
              Stay informed with expert insights on pharmaceutical standards, quality assurance, sterile injectable trends, and healthcare industry practices.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ================= FEATURED POST ================= */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-6 md:px-10">
        <Reveal delay={0.1}>
          <TiltContainer>
            <div className="rounded-[28px] border border-[#06233F]/10 bg-white/80 backdrop-blur-md overflow-hidden shadow-xl shadow-[#06233F]/5 grid lg:grid-cols-12 gap-0 hover:border-[#216853]/40 transition-all duration-500 group">
              <div className="lg:col-span-7 relative h-64 lg:h-auto min-h-[340px] bg-[#F8FAFC] overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06233F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                    <Sparkles size={14} className="text-[#216853]" />
                    Featured Novix Article
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-[#216853] bg-[#F4F8F6] px-3 py-1 rounded-full border border-[#216853]/20">
                      <Tag size={12} /> {featuredPost.category}
                    </span>
                    <span className="text-xs font-light text-[#06233F]/50">Featured</span>
                  </div>

                  <h2
                    className="text-2xl sm:text-3xl font-light text-[#06233F] leading-snug mb-4 group-hover:text-[#216853] transition-colors duration-300"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm md:text-base text-[#06233F]/70 font-light leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#06233F]/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-[#06233F]/60 font-light">
                    <span className="flex items-center gap-1">
                      <User size={14} className="text-[#216853]" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-[#216853]" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <button
                    onClick={() => setActivePost(featuredPost)}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#216853] hover:text-[#184d3d] hover:gap-3 transition-all duration-200"
                  >
                    Read Story <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </TiltContainer>
        </Reveal>
      </section>

      {/* ================= SEARCH & FILTER BAR ================= */}
      <section className="relative z-10 py-6 max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#06233F]/10">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-[#216853] text-white shadow-md shadow-[#216853]/20"
                      : "bg-white/80 backdrop-blur-md text-[#06233F]/70 border border-[#06233F]/10 hover:border-[#216853]/40"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#06233F]/40"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/80 backdrop-blur-md rounded-full border border-[#06233F]/10 text-sm text-[#06233F] placeholder-[#06233F]/40 font-light focus:outline-none focus:border-[#216853] transition-colors"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= ARTICLES GRID ================= */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-6 md:px-10">
        {filteredPosts.length === 0 ? (
          <Reveal>
            <div className="text-center py-16 bg-white/80 backdrop-blur-md rounded-[24px] border border-[#06233F]/10">
              <BookOpen size={40} className="mx-auto text-[#06233F]/30 mb-3" />
              <h3
                className="text-2xl font-light text-[#06233F]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                No articles found
              </h3>
              <p className="text-sm text-[#06233F]/60 font-light mt-1">
                Try adjusting your search terms or filter selection.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.08}>
                <TiltContainer className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="h-full rounded-[24px] border border-[#06233F]/10 bg-white/80 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-xl hover:border-[#216853]/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Article Image */}
                      <div className="relative h-48 w-full bg-[#F8FAFC] overflow-hidden border-b border-[#06233F]/10">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-[0.2em] text-[#216853] bg-white/95 px-3 py-1 rounded-full border border-[#216853]/20 shadow-sm">
                          {post.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <div className="flex items-center gap-4 text-xs text-[#06233F]/50 font-light mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} className="text-[#216853]" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={13} className="text-[#216853]" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3
                          onClick={() => setActivePost(post)}
                          className="text-xl font-light text-[#06233F] leading-snug mb-3 hover:text-[#216853] transition-colors cursor-pointer"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {post.title}
                        </h3>

                        <p className="text-sm text-[#06233F]/70 font-light leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Read Button */}
                    <div className="px-8 pb-8 pt-2">
                      <button
                        onClick={() => setActivePost(post)}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#216853] hover:gap-3 transition-all duration-200"
                      >
                        Read Story <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                </TiltContainer>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ================= BLOG DETAILS POPUP / MODAL ================= */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePost(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06233F]/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[28px] border border-[#06233F]/10 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-[#06233F]/10 flex items-center justify-center text-[#06233F] hover:bg-[#216853] hover:text-white transition-all shadow-md"
              >
                <X size={20} />
              </button>

              {/* Modal Image */}
              <div className="relative h-64 sm:h-80 w-full bg-[#F8FAFC]">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-6 text-xs font-bold uppercase tracking-[0.2em] text-[#216853] bg-white/95 px-4 py-1.5 rounded-full border border-[#216853]/20 shadow-md">
                  {activePost.category}
                </span>
              </div>

              {/* Modal Body */}
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#06233F]/60 font-light mb-4">
                  <span className="flex items-center gap-1">
                    <User size={14} className="text-[#216853]" />
                    {activePost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-[#216853]" />
                    {activePost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-[#216853]" />
                    {activePost.readTime}
                  </span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-light text-[#06233F] leading-tight mb-6"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {activePost.title}
                </h2>

                <div className="space-y-4 text-sm md:text-base text-[#06233F]/75 font-light leading-relaxed border-t border-[#06233F]/10 pt-6">
                  {activePost.content ? (
                    activePost.content.map((p, idx) => <p key={idx}>{p}</p>)
                  ) : (
                    <p>{activePost.excerpt}</p>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="mt-8 pt-6 border-t border-[#06233F]/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#216853]">
                    <CheckCircle2 size={18} /> Verified Pharmaceutical Publication
                  </div>
                  <button
                    onClick={() => setActivePost(null)}
                    className="px-7 py-3.5 rounded-full bg-[#06233F] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#216853] transition-colors"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CALL TO ACTION ================= */}
      <section className="relative z-10 bg-[#06233F] text-white py-24 text-center mb-0 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#216853]/30 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#216853] mb-4">
              Stay Connected
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6 !text-white leading-tight max-w-2xl mx-auto"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Have questions about our formulations or{" "}
              <span className="italic font-normal text-[#216853]">articles?</span>
            </h2>
            <p className="text-base text-slate-300 font-light max-w-xl mx-auto leading-relaxed mb-10">
              Connect with our medical and technical experts for institutional inquiries or product documentation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#184d3d] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#216853]/30"
              >
                <Mail size={16} className="!text-white" />
                <span className="!text-white">Get in Touch</span>
                <ArrowRight size={14} className="!text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
