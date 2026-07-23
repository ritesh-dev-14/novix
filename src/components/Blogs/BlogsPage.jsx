import React, { useState, useEffect } from "react";
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
  Share2,
  CheckCircle2,
} from "lucide-react";

const FONT_ID = "novix-font-import";

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
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

export default function BlogsPage() {
  useFonts();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState(null); // Controls Modal state

  // Filter posts based on category and search query
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
    <div className="relative min-h-screen w-full pt-28 text-[#06233F]/80 font-['Inter'] bg-[#F8FAFC]">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v100M30 0v100M50 0v100M70 0v100M90 0v100M0 10h100M0 30h100M0 50h100M0 70h100M0 90h100' stroke='%2306233F' stroke-width='1' fill='none'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%2306233F'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ================= HERO HEADER ================= */}
      <header className="relative z-10 pt-8 pb-12 bg-[#F8FAFC] text-center border-b border-[#06233F]/10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#216853] mb-3 font-mono">
            Insights & Updates
          </p>
          <h1 className="font-bold text-[38px] sm:text-[48px] md:text-[56px] leading-[1.1] tracking-tight text-[#06233F] mb-6">
            Latest Articles & <span className="text-[#216853]">Knowledge</span>
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#06233F]/70 leading-relaxed max-w-2xl mx-auto">
            Stay informed with expert insights on pharmaceutical standards, quality assurance, sterile injectable trends, and healthcare industry practices.
          </p>
        </div>
      </header>

      {/* ================= FEATURED POST ================= */}
      <section className="relative z-10 py-12 max-w-7xl mx-auto px-6">
        <div className="rounded-[28px] border border-[#06233F]/10 bg-white overflow-hidden shadow-xl shadow-[#06233F]/5 grid lg:grid-cols-12 gap-0 hover:border-[#216853]/40 transition-all duration-300">
          <div className="lg:col-span-7 relative h-64 lg:h-auto min-h-[320px] bg-[#F8FAFC]">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-[#216853] bg-[#F4F8F6] px-3 py-1 rounded-full border border-[#216853]/20 font-mono">
                  <Tag size={12} /> {featuredPost.category}
                </span>
                <span className="text-[12px] text-[#06233F]/50 font-mono">Featured</span>
              </div>

              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06233F] leading-tight mb-4">
                {featuredPost.title}
              </h2>

              <p className="text-[14px] sm:text-[15px] text-[#06233F]/70 leading-relaxed mb-6">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-[#06233F]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-[12px] text-[#06233F]/60">
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
                className="inline-flex items-center gap-2 text-[13px] font-bold text-[#216853] hover:text-[#184d3d] transition-colors"
              >
                Read Story <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEARCH & FILTER BAR ================= */}
      <section className="relative z-10 py-6 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#06233F]/10">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#216853] text-white shadow-md shadow-[#216853]/20"
                    : "bg-white text-[#06233F]/70 border border-[#06233F]/10 hover:border-[#216853]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#06233F]/40"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full border border-[#06233F]/10 text-[13px] text-[#06233F] placeholder-[#06233F]/40 focus:outline-none focus:border-[#216853] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ================= ARTICLES GRID ================= */}
      <section className="relative z-10 py-12 max-w-7xl mx-auto px-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[24px] border border-[#06233F]/10">
            <BookOpen size={40} className="mx-auto text-[#06233F]/30 mb-3" />
            <h3 className="text-[18px] font-bold text-[#06233F]">No articles found</h3>
            <p className="text-[14px] text-[#06233F]/60 mt-1">
              Try adjusting your search terms or filter selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-[24px] border border-[#06233F]/10 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-[#216853]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Article Image */}
                  <div className="relative h-48 w-full bg-[#F8FAFC] overflow-hidden border-b border-[#06233F]/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 text-[10px] font-bold tracking-wider uppercase text-[#216853] bg-white/95 px-3 py-1 rounded-full border border-[#216853]/20 font-mono shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[12px] text-[#06233F]/50 font-mono mb-3">
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
                      className="text-[18px] font-bold text-[#06233F] leading-snug mb-3 hover:text-[#216853] transition-colors cursor-pointer"
                    >
                      {post.title}
                    </h3>

                    <p className="text-[14px] text-[#06233F]/70 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read Button */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setActivePost(post)}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#216853] hover:gap-3 transition-all duration-200"
                  >
                    Read Story <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= BLOG DETAILS POPUP / MODAL ================= */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06233F]/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[28px] border border-[#06233F]/10 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-[#06233F]/10 flex items-center justify-center text-[#06233F] hover:bg-[#216853] hover:text-white transition-all shadow-md"
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
              <span className="absolute bottom-4 left-6 text-[11px] font-bold tracking-wider uppercase text-[#216853] bg-white/95 px-4 py-1.5 rounded-full border border-[#216853]/20 font-mono shadow-md">
                {activePost.category}
              </span>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#06233F]/60 font-mono mb-4">
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

              <h2 className="text-[24px] sm:text-[32px] font-bold text-[#06233F] leading-tight mb-6">
                {activePost.title}
              </h2>

              <div className="space-y-4 text-[15px] text-[#06233F]/80 leading-relaxed border-t border-[#06233F]/10 pt-6">
                {activePost.content ? (
                  activePost.content.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>{activePost.excerpt}</p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-[#06233F]/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-[#216853]">
                  <CheckCircle2 size={18} /> Verified Pharmaceutical Publication
                </div>
                <button
                  onClick={() => setActivePost(null)}
                  className="px-6 py-2.5 rounded-full bg-[#06233F] text-white text-[13px] font-semibold hover:bg-[#216853] transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CALL TO ACTION ================= */}
      <section className="relative z-10 bg-[#06233F] text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#216853] mb-3 font-mono">
            Stay Connected
          </p>
          <h2 className="text-[32px] sm:text-[42px] font-bold tracking-tight mb-6 !text-white leading-tight">
            Have questions about our formulations or articles?
          </h2>
          <p className="text-[16px] text-white/70 max-w-xl mx-auto mb-8">
            Connect with our medical and technical experts for institutional inquiries or product documentation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#216853] !text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-[#184d3d] transition-all duration-300 shadow-lg shadow-[#216853]/30"
            >
              <Mail size={16} className="!text-white" />
              <span className="!text-white">Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}