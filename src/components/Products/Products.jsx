import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Factory, Award, X } from 'lucide-react';

import ProductsBackground from './ProductsBackground';
import ProductCard, { TrustBadge } from './ProductCard';
import { MOTION } from './Usescrollreveal';

// Import product images
import img1 from '../../Images/NORA.png';
import img2 from '../../Images/AMIKA.png';
import img3 from '../../Images/CEF1MG.png';
import img4 from '../../Images/CEFO.png';
import img5 from '../../Images/HEPARIN.png';
import img6 from '../../Images/ONDA.png';
import img7 from '../../Images/40mg.png';
import img8 from '../../Images/DOXY.png';
import img9 from '../../Images/paracetamol.png';
import img10 from '../../Images/multivitamin.png';
import img11 from '../../Images/trane.png';
import img12 from '../../Images/sulbactum.png';
import img13 from '../../Images/hepa.png';
import img14 from '../../Images/infussion.png';
import img15 from '../../Images/amo.png';

gsap.registerPlugin(ScrollTrigger);

const productData = [
  { id: 1, name: 'LBPC', generic: 'NORARENAKINE INJECTION', strength: '4MG/2ML', image: img1 },
  { id: 2, name: 'MULTI-DR', generic: 'AMIKACIN INJECTION', strength: '500MG', image: img2 },
  { id: 3, name: 'CEFVIX', generic: 'CEFTRIAXONE INJECTION', strength: '1GM', image: img3 },
  { id: 4, name: 'CEFVIX-SB', generic: 'CEFTRIAXONE + SULBACTUM INJECTION', strength: '1.5 GM', image: img4 },
  { id: 5, name: 'O-CLOT 25000 IU', generic: 'HEPARIN 25000 IU', strength: '25000 IU', image: img5 },
  { id: 6, name: 'NOVISET', generic: 'ONDANSETRON INJECTION', strength: '2ML', image: img6 },
  { id: 7, name: 'NOVPRA', generic: 'PANTAPRAZOLE 40 MG', strength: '40 MG', image: img7 },
  { id: 8, name: 'DOXVIX', generic: 'DOXYCYCLINE 100 MG', strength: '100 MG', image: img8 },
  { id: 9, name: 'NFEVO', generic: 'PARACETAMOL INJECTION', strength: '150MG/2ML', image: img9 },
  { id: 10, name: 'N-VIT', generic: 'MULTIVITAMIN 10ML', strength: '10ML', image: img10 },
  { id: 11, name: 'NOVIX-TX', generic: 'TRANEXAMIC ACID 500MG/5ML', strength: '500MG/5ML', image: img11 },
  { id: 12, name: 'NFEVO', generic: 'CEFTRIXONE + SULBACTUM 1.5GM', strength: '1.5GM', image: img12 },
  { id: 13, name: '0-CLOT', generic: 'HEPARIN 5000 IU', strength: '5000 IU', image: img13 },
  { id: 14, name: 'NFEVO IV', generic: 'PARACETAMOL INFUSSION', strength: '100ML', image: img14 },
  { id: 15, name: 'N-CLAV', generic: 'AMOXYCILLIN + CLAVULANATE', strength: '1.2 GM', image: img15 },
];

const CREDENTIALS = [
  { icon: ShieldCheck, title: 'Trusted Quality', desc: 'WHO-GMP Certified' },
  { icon: Factory, title: 'Advanced', desc: 'Manufacturing' },
  { icon: Award, title: 'Affordable', desc: 'Healthcare' },
];

export default function Products() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef(new Map());

  const [activeProduct, setActiveProduct] = useState(null);
  const [activeRect, setActiveRect] = useState(null);
  const overlayCardRef = useRef(null);
  const backdropRef = useRef(null);
  const openTimeline = useRef(null);

  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  // ---- Entrance choreography: one timeline, one language of motion ----
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced.current) {
        gsap.set('[data-reveal]', { opacity: 1, y: 0, clearProps: 'all' });
        return;
      }

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: MOTION.ease.reveal },
      });

      introTl
        .fromTo(
          '.prod-eyebrow',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: MOTION.duration.base }
        )
        .fromTo(
          '.prod-header-text',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: MOTION.duration.slow },
          '-=0.45'
        )
        .fromTo(
          '.prod-subhead',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: MOTION.duration.base },
          '-=0.6'
        )
        .fromTo(
          '.prod-badge-item',
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.base,
            stagger: MOTION.stagger,
          },
          '-=0.4'
        );

      // Card reveals: batched, staggered, GPU-only properties.
      gsap.set('.prod-card', { opacity: 0, y: 36, willChange: 'transform, opacity' });

      ScrollTrigger.batch('.prod-card', {
        start: 'top 92%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.base,
            ease: MOTION.ease.reveal,
            stagger: 0.06,
            overwrite: true,
          }),
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ---- Overlay open ----
  const openProduct = useCallback((product, element) => {
    if (activeProduct) return;
    const rect = element.getBoundingClientRect();
    setActiveRect(rect);
    setActiveProduct(product);
  }, [activeProduct]);

  useEffect(() => {
    if (!activeProduct || !activeRect || !overlayCardRef.current || !backdropRef.current) {
      return;
    }

    const reduced = prefersReduced.current;
    const tl = gsap.timeline();
    openTimeline.current = tl;

    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: reduced ? 0.15 : 0.4, ease: MOTION.ease.soft }
    );

    gsap.set(overlayCardRef.current, {
      position: 'fixed',
      top: activeRect.top,
      left: activeRect.left,
      width: activeRect.width,
      height: activeRect.height,
      margin: 0,
      zIndex: 60,
      borderRadius: '28px',
    });

    if (reduced) {
      gsap.set(overlayCardRef.current, {
        top: '5vh',
        left: '5vw',
        width: '90vw',
        height: '90vh',
      });
      gsap.set('.overlay-info-content', { opacity: 1 });
    } else {
      tl.to(
        overlayCardRef.current,
        {
          top: '5vh',
          left: '5vw',
          width: '90vw',
          height: '90vh',
          duration: 0.65,
          ease: MOTION.ease.snap,
        },
        '<'
      ).to(
        '.overlay-info-content',
        { opacity: 1, duration: 0.4, ease: MOTION.ease.soft },
        '-=0.25'
      );
    }

    return () => {
      tl.kill();
    };
  }, [activeProduct, activeRect]);

  const closeOverlay = useCallback(() => {
    if (!activeRect || !overlayCardRef.current) {
      setActiveProduct(null);
      setActiveRect(null);
      return;
    }

    const reduced = prefersReduced.current;
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProduct(null);
        setActiveRect(null);
      },
    });

    tl.to('.overlay-info-content', {
      opacity: 0,
      duration: reduced ? 0.1 : 0.2,
      ease: MOTION.ease.soft,
    });

    tl.to(
      overlayCardRef.current,
      {
        top: activeRect.top,
        left: activeRect.left,
        width: activeRect.width,
        height: activeRect.height,
        duration: reduced ? 0.15 : 0.5,
        ease: MOTION.ease.snap,
      },
      '<'
    );

    tl.to(
      backdropRef.current,
      { opacity: 0, duration: reduced ? 0.1 : 0.4, ease: MOTION.ease.soft },
      '<0.1'
    );
  }, [activeRect]);

  // Escape key closes overlay
  useEffect(() => {
    if (!activeProduct) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeOverlay();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeProduct, closeOverlay]);

  return (
    <section
      ref={containerRef}
      id="novix-products-section"
      className="relative flex w-full shrink-0 select-none flex-col overflow-hidden bg-transparent px-6 py-32 md:px-12"
    >
      {/* <ProductsBackground containerRef={containerRef} /> */}

      {/* HEADER */}
      <div className="relative z-10 mx-auto mb-24 flex w-full max-w-[1400px] flex-col items-center text-center">
        <span className="prod-eyebrow mb-6 block font-mono text-[11px] uppercase tracking-[0.32em] text-[#7FD8D0]/70">
          Novix Healthcare — Formulary
        </span>
        <h2 className="prod-header-text mb-7 max-w-4xl text-[56px] font-semibold leading-[1.02] tracking-[-0.03em] text-[#E7ECF3] md:text-[72px] lg:text-[84px]">
          Precision, in every dose.
        </h2>
        <p className="prod-subhead max-w-2xl text-lg font-light leading-relaxed text-[#94A2B8] md:text-xl">
          Fifteen formulations manufactured under WHO-GMP protocols — each
          one measured, verified, and released with the same clinical
          rigor.
        </p>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 px-4">
          {CREDENTIALS.map((item) => (
            <TrustBadge key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* GRID */}
      <div
        ref={gridRef}
        className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-6 px-2 md:grid-cols-2 lg:grid-cols-3"
      >
        {productData.map((prod, index) => (
          <ProductCard
            key={prod.id}
            ref={(el) => {
              if (el) cardRefs.current.set(prod.id, el);
            }}
            product={prod}
            index={index}
            isActive={activeProduct?.id === prod.id}
            onOpen={openProduct}
          />
        ))}
      </div>

      {/* OVERLAY */}
      {activeProduct && activeRect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            ref={backdropRef}
            role="presentation"
            className="absolute inset-0 bg-[#05070C]/92 opacity-0 pointer-events-auto backdrop-blur-[2px]"
            onClick={closeOverlay}
          />

          <div
            ref={overlayCardRef}
            role="dialog"
            aria-modal="true"
            aria-label={activeProduct.name}
            className="flex flex-col gap-8 overflow-hidden border border-[#1B2740] bg-[#0B1220] p-8 pointer-events-auto md:flex-row md:gap-16 md:p-16"
          >
            <div className="relative flex h-64 w-full items-center justify-center rounded-[20px] border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:h-full md:w-1/2">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="relative z-10 max-h-[85%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="overlay-info-content flex w-full flex-col justify-center py-8 text-left opacity-0 md:w-1/2">
              <div className="mb-4 flex items-start justify-between">
                <h2 className="text-6xl font-semibold tracking-[-0.03em] text-[#E7ECF3] md:text-7xl">
                  {activeProduct.name}
                </h2>
                <button
                  onClick={closeOverlay}
                  aria-label="Close product details"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#E7ECF3] transition-colors duration-300 pointer-events-auto hover:bg-white/[0.1]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mb-9 font-mono text-sm uppercase tracking-[0.14em] text-[#7C8BA3]">
                {activeProduct.generic.trim()}
              </p>

              <div className="mb-11 flex flex-wrap gap-3">
                <div className="flex w-fit items-center gap-1.5 rounded-full border border-[#7FD8D0]/25 bg-[#7FD8D0]/[0.08] px-4 py-2 font-mono text-[12px] font-medium tracking-[0.04em] text-[#9FE6DF]">
                  {activeProduct.strength}
                </div>
                <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-[12px] font-medium tracking-[0.04em] text-[#C7D2E0]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  WHO-GMP
                </div>
              </div>

              <div className="mb-9 h-px w-full bg-white/[0.07]" />

              <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#7C8BA3]">
                Product Details
              </h3>
              <p className="max-w-xl text-lg font-light leading-relaxed text-[#B7C1D1]">
                {activeProduct.name} is formulated with{' '}
                {activeProduct.generic.trim().toLowerCase()} (
                {activeProduct.strength}), manufactured under WHO-GMP
                protocols to ensure consistent clinical efficacy and
                patient safety at every dose.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}