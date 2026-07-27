export default function HandSVG({ variant = "human" }) {
  // variant: 'human' | 'glove' — one shape, mirrored via CSS scale-x-[-1] for the right hand.
  const isGlove = variant === "glove";
  const grad = isGlove
    ? { a: "#D6E4E0", b: "#9FBAB5", c: "#5F7E79" }
    : { a: "#F6D9BC", b: "#E8B48C", c: "#C4885A" };
  const gid = isGlove ? "gGlove" : "gSkin";
  const gooId = "goo" + gid;

  return (
    <svg viewBox="-60 0 320 220" className="w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="-60" y1="60" x2="260" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={grad.a} />
          <stop offset="55%" stopColor={grad.b} />
          <stop offset="100%" stopColor={grad.c} />
        </linearGradient>
        <filter id={gooId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11"
            result="goo"
          />
        </filter>
      </defs>

      {/* fused capsule shapes -> reads as one continuous, softly shaded hand */}
      <g filter={`url(#${gooId})`} fill={`url(#${gid})`}>
        <rect x="-60" y="78" width="150" height="72" rx="34" />
        <ellipse cx="92" cy="112" rx="54" ry="46" />
        <rect x="118" y="58" width="66" height="21" rx="10.5" transform="rotate(-9 118 68)" />
        <rect x="122" y="47" width="82" height="23" rx="11.5" transform="rotate(-3 122 58)" />
        <rect x="126" y="40" width="94" height="25" rx="12.5" transform="rotate(2 126 52)" />
        <rect x="122" y="52" width="82" height="23" rx="11.5" transform="rotate(7 122 63)" />
        <rect x="66" y="140" width="58" height="26" rx="13" transform="rotate(38 66 153)" />
      </g>

      {/* crisp crease + highlight detail, kept outside the blur */}
      <g
        opacity={isGlove ? 0.28 : 0.22}
        stroke={isGlove ? "#5F7E79" : "#C4885A"}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M120 84 Q150 90 168 84" />
        <path d="M118 96 Q152 103 176 96" />
        <path d="M96 138 Q108 150 122 152" />
      </g>

      {isGlove && (
        <g opacity="0.5" stroke="#D6E4E0" strokeWidth="1.2" fill="none" strokeLinecap="round">
          <path d="M150 44 L172 100" />
          <path d="M128 50 L148 104" />
          <path d="M-10 82 L-10 142" strokeDasharray="2 4" opacity="0.6" />
        </g>
      )}

      <ellipse
        cx="70"
        cy="96"
        rx="22"
        ry="14"
        fill={isGlove ? "#D6E4E0" : "#F6D9BC"}
        opacity="0.35"
      />
    </svg>
  );
}
