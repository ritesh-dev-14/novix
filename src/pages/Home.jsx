import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Certifications from '../components/Certifications/Certifications';
import About from '../components/About/About';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-transparent text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.08),transparent_24%)] pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="absolute inset-16 rounded-[60px] border border-white/10 pointer-events-none" />
      <div className="absolute inset-x-12 top-12 h-0.5 bg-white/5 blur-sm pointer-events-none" />
      <div className="absolute inset-x-12 bottom-12 h-0.5 bg-white/5 blur-sm pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-start gap-32 pb-32 pt-10 px-4 md:px-8">
        <Hero />
        <Features />
        <Certifications />
        <About />
      </div>
    </div>
  );
}
