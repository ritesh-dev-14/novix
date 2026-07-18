import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const FRAME_COUNT = 271;
const MAX_CACHE = 40;

const cache = new Map();

function getFrameUrl(index) {
  return `/frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
}

function loadFrame(index) {
  if (index < 0 || index >= FRAME_COUNT) return null;

  if (cache.has(index)) {
    return cache.get(index);
  }

  const img = new Image();
  img.decoding = "async";
  img.loading = "eager";
  img.src = getFrameUrl(index);

  cache.set(index, img);

  if (cache.size > MAX_CACHE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }

  return img;
}

export default function VideoBackground() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const currentFrame = useRef(-1);
  const ticking = useRef(false);

  // ------------------------
  // Lenis
  // ------------------------

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      smoothTouch: false,
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
  }, []);

  // ------------------------
  // Resize Canvas
  // ------------------------

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      const ctx = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "low";

      ctxRef.current = ctx;

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
  }, []);

  // ------------------------
  // Draw Frame
  // ------------------------

  function drawFrame(index) {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    const img = loadFrame(index);

    if (!img) return;

    if (!img.complete) {
      img.onload = () => {
        if (currentFrame.current === index) {
          drawFrame(index);
        }
      };
      return;
    }

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

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(img, x, y, width, height);

    // Preload nearby frames
    for (let i = 1; i <= 4; i++) {
      loadFrame(index + i);
      loadFrame(index - i);
    }
  }

  // ------------------------
  // Scroll Animation
  // ------------------------

  useEffect(() => {
    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        ticking.current = false;
        return;
      }

      const progress = window.scrollY / maxScroll;

      const frame = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(progress * (FRAME_COUNT - 1)))
      );

      if (frame !== currentFrame.current) {
        currentFrame.current = frame;
        drawFrame(frame);
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 h-screen w-screen pointer-events-none"
      aria-hidden="true"
    />
  );
}