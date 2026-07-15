import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "./Preloader.css";

const languages = ["NOVIX", "नोविक्स", "NOVIX"];

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef(null);
  const maskRevealRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const subtitleRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const words = wordRefs.current;

      gsap.set(".preloader-char", {
        opacity: 0,
        y: "118%",
        rotateX: 88,
        filter: "blur(6px)",
      });
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 24,
        filter: "blur(10px)",
        letterSpacing: "0.28em",
      });
      gsap.set(maskRevealRef.current, {
        clipPath: "circle(0% at 50% 50%)",
      });
      gsap.set(contentWrapperRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      });

      words.forEach((wordEl, index) => {
        if (!wordEl) return;

        const chars = wordEl.querySelectorAll(".preloader-char");
        const isFirst = index === 0;
        const isLast = index === words.length - 1;

        tl.to(
          chars,
          {
            opacity: 1,
            y: "0%",
            rotateX: 0,
            filter: "blur(0px)",
            duration: isFirst ? 0.32 : 0.2,
            stagger: 0.01,
            ease: "power2.out",
          },
          isFirst ? 0.08 : "-=0.15",
        );

        const holdTime = isLast ? 0.24 : 0.08;
        tl.to({}, { duration: holdTime });

        if (!isLast) {
          tl.to(chars, {
            opacity: 0,
            y: "-110%",
            rotateX: -20,
            filter: "blur(4px)",
            duration: 0.16,
            stagger: 0.006,
            ease: "power2.in",
          });
        }
      });

      tl.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 24,
          letterSpacing: "0.2em",
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.35em",
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.08",
      );

      tl.to({}, { duration: 0.12 });

      const navbarLogo = document.getElementById("navbar-logo-link");
      let targetX = 0;
      let targetY = 0;
      let targetScale = 0.8;

      if (navbarLogo && contentWrapperRef.current) {
        const navRect = navbarLogo.getBoundingClientRect();
        const wrapRect = contentWrapperRef.current.getBoundingClientRect();

        targetX =
          navRect.left +
          navRect.width / 2 -
          (wrapRect.left + wrapRect.width / 2);
        targetY =
          navRect.top +
          navRect.height / 2 -
          (wrapRect.top + wrapRect.height / 2);
        targetScale = navRect.width / wrapRect.width;
      }

      tl.addLabel("exitPhase");

      tl.to(
        contentWrapperRef.current,
        {
          x: targetX,
          y: targetY,
          scale: targetScale,
          opacity: navbarLogo ? 1 : 0,
          duration: 0.65,
          ease: "power3.inOut",
        },
        "exitPhase",
      );

      if (navbarLogo) {
        tl.to(navbarLogo, { opacity: 1, duration: 0.1 }, "exitPhase+=0.85");
      }

      tl.to(
        maskRevealRef.current,
        {
          clipPath: "circle(150% at 50% 50%)",
          duration: 0.75,
          ease: "power3.inOut",
        },
        "exitPhase",
      );

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.2,
          onComplete: () => setIsVisible(false),
        },
        "-=0.12",
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="preloader-master-container">
      <div className="preloader-glow" aria-hidden="true" />
      <div className="preloader-grid" aria-hidden="true" />
      <div ref={maskRevealRef} className="preloader-mask-layer" />

      <div ref={contentWrapperRef} className="preloader-artistic-wrapper">
        <div className="preloader-word-viewport">
          <div className="preloader-txt anchor-ghost" aria-hidden="true">
            NOVIX
          </div>

          {languages.map((word, wordIdx) => (
            <div
              key={`${word}-${wordIdx}`}
              ref={(el) => {
                wordRefs.current[wordIdx] = el;
              }}
              className="preloader-txt precise-absolute-word"
            >
              {word.split("").map((char, charIdx) => (
                <span
                  key={`${wordIdx}-${charIdx}`}
                  className="preloader-char-wrapper"
                >
                  <span className="preloader-char">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>

        <div ref={subtitleRef} className="preloader-subtext">
          Healthcare Innovation
        </div>
      </div>
    </div>
  );
}
