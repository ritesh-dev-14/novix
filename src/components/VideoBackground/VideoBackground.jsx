import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";

const FRAME_COUNT = 109;

function getFrameUrl(index) {
  return `/sequence/frame_${String(index + 1).padStart(3, "0")}.webp`;
}

export default function VideoBackground() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const currentFrame = useRef(-1);
  const preloadedFramesRef = useRef([]);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // ------------------------
  // 1. Preload Architecture
  // ------------------------
  useEffect(() => {
    let isCancelled = false;

    const loadAllFrames = async () => {
      let loadedCount = 0;
      const frames = new Array(FRAME_COUNT);

      const promises = Array.from({ length: FRAME_COUNT }).map(async (_, index) => {
        const img = new Image();
        img.src = getFrameUrl(index);

        try {
          // Decode the image completely before storing it in memory
          await img.decode();
          frames[index] = img;
        } catch (error) {
          console.error(`Error decoding frame ${index}:`, error);
        }

        if (!isCancelled) {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
        }
      });

      await Promise.all(promises);

      if (!isCancelled) {
        preloadedFramesRef.current = frames;
        setIsLoaded(true);
      }
    };

    // Begin preload immediately
    loadAllFrames();

    return () => {
      isCancelled = true;
    };
  }, []);

  // ------------------------
  // 2. Lock Scrolling Until Loaded
  // ------------------------
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  // ------------------------
  // 3. Canvas Initialization & Resize
  // ------------------------
  useEffect(() => {
    if (!isLoaded) return;

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      // Optimize canvas performance for production
      const ctx = canvas.getContext("2d", {
        alpha: false, // Disabling alpha channel improves rendering performance
        desynchronized: true, // Reduces latency
      });

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctxRef.current = ctx;

      // Draw initial frame on resize
      drawFrame(currentFrame.current === -1 ? 0 : currentFrame.current);
    };

    resize();

    let timeout;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(resize, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, [isLoaded]);

  // ------------------------
  // 4. Draw Frame (Optimized)
  // ------------------------
  function drawFrame(index) {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    // Frames are 100% preloaded in memory, no lazy loading required
    const img = preloadedFramesRef.current[index];
    if (!img) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    const ratio = Math.max(
      canvasWidth / img.width,
      canvasHeight / img.height
    );

    const width = img.width * ratio;
    const height = img.height * ratio;

    const x = (canvasWidth - width) / 2;
    const y = (canvasHeight - height) / 2;

    // Clear previous and draw next frame immediately
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, width, height);
  }

  // ------------------------
  // 5. Lenis Integration & Rendering
  // ------------------------
  useEffect(() => {
    if (!isLoaded) return;

    const lenis = new Lenis({
      duration: 0.7,
      smoothWheel: true,
      smoothTouch: false,
    });

    // Synchronize frame progress directly with Lenis smooth scroll value
    lenis.on('scroll', (e) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, e.scroll / maxScroll));

      const frame = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(progress * (FRAME_COUNT - 1)))
      );

      // Only queue a render if the required frame has actually changed
      if (frame !== currentFrame.current) {
        currentFrame.current = frame;
        requestAnimationFrame(() => drawFrame(frame));
      }
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLoaded]);

  return (
    <>
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F5F0] text-[#0E355C] transition-all duration-700 pointer-events-none ${isLoaded ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
      >
        <p className="text-sm font-bold tracking-[0.25em] uppercase mb-4 opacity-70">
          Loading Assets
        </p>
        <p className="text-5xl font-light" style={{ fontFamily: "'Cinzel', serif" }}>
          {loadingProgress}%
        </p>
      </div>

      {/* Optimized Canvas */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-0 h-screen w-screen pointer-events-none transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
        aria-hidden="true"
      />
    </>
  );
}