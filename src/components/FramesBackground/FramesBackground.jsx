import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FramesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    canvas.width = 1920;
    canvas.height = 1080;

    const frameCount = 190;
    const currentFrame = (index) =>
      `/products-jpg/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    const images = [];
    const seq = { frame: 0 };

    let initialRendered = false;

    const render = () => {
      const img = images[seq.frame];
      if (!img || !img.complete) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio,
      );
    };

    const renderInitial = () => {
      if (initialRendered) return;
      const img = images.find((image) => image.complete);
      if (!img) return;
      initialRendered = true;
      const index = images.indexOf(img);
      seq.frame = index >= 0 ? index : 0;
      render();
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        renderInitial();
      };
      img.src = currentFrame(i);
      images.push(img);
    }

    if (images[0]?.complete) {
      renderInitial();
    }

    const ctx = gsap.context(() => {
      gsap.to(seq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: "#page-wrapper",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        onUpdate: render,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-100"
      />
    </div>
  );
}
