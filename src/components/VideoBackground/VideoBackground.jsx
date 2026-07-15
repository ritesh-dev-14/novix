import { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const frameCount = 271;
const getFrameUrl = (index) => `/frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

export default function VideoBackground() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          requestAnimationFrame(() => updateCanvas(0, loadedImages));
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const updateCanvas = (frameIndex, imgs = images) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgs[frameIndex] || !imgs[frameIndex].complete) return;

    const context = canvas.getContext('2d');
    const img = imgs[frameIndex];

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScrollTop <= 0) return;

      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(scrollFraction * frameCount))
      );

      requestAnimationFrame(() => updateCanvas(frameIndex));
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        handleScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [images]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          objectFit: 'cover'
        }}
      />
      <div className="fixed inset-0 bg-black/10 z-[-1]" />
    </>
  );
}
