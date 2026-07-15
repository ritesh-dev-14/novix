const fs = require('fs');

let content = fs.readFileSync('c:\\Novix application\\vite-project\\src\\App.jsx', 'utf-8');

// 1. Update Canvas styling and add Overlay
content = content.replace(
  /<canvas[\s\S]*?zIndex:\s*-1,[\s\S]*?\/>/,
  `<canvas
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
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(1px)',
        zIndex: -1
      }} />`
);

// 2. Fix the header / Navbar
// Find the <header id="banner-header"...> block
content = content.replace(
  /<header id="banner-header"[^>]*>/,
  `<header id="banner-header" style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(1280px, 92%)',
          background: 'rgba(0,0,0,.35)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,.08)',
          borderRadius: '999px',
          zIndex: 100
        }} className="flex items-center justify-between px-6 py-3">`
);

// We need to remove the wrapper absolute classes from the nav inside header
content = content.replace(
  /absolute left-1\/2 -translate-x-1\/2/g,
  'hidden md:flex' // remove absolute positioning for the nav links, keep it centered using flex if possible
);

// 3. Remove black containers from sections
// Banner container
content = content.replace(
  /className="w-full max-w-\[1200px\] h-\[900px\] bg-black text-white font-sans flex flex-col justify-between p-8 md:p-12 rounded-\[32px\] border border-white\/\[0\.08\] relative overflow-hidden select-none shadow-2xl shadow-black\/80 shrink-0"/,
  'className="w-full max-w-[1280px] min-h-[900px] text-white font-sans flex flex-col justify-between p-8 md:p-12 relative overflow-visible select-none shrink-0"'
);

// Other sections (e.g., trusted-partners, certifications, about)
content = content.replace(
  /className="w-full max-w-\[1200px\] bg-black text-white py-20 px-8 md:px-16 rounded-\[32px\] border border-white\/\[0\.08\] relative overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl select-none shrink-0"/g,
  'className="w-full max-w-[1280px] bg-transparent text-white py-20 px-8 md:px-16 relative overflow-visible flex flex-col items-center justify-center text-center select-none shrink-0"'
);
content = content.replace(
  /className="w-full max-w-\[1200px\] bg-black text-white py-24 px-8 md:px-16 rounded-\[32px\] border border-white\/\[0\.08\] relative overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl select-none shrink-0"/g,
  'className="w-full max-w-[1280px] bg-transparent text-white py-24 px-8 md:px-16 relative overflow-visible flex flex-col items-center justify-center text-center select-none shrink-0"'
);

// 4. Update Cards to Glassmorphism
// Trusted Solutions / Committed to Better Health cards
content = content.replace(
  /bg-white\/\[0\.03\] border border-white\/\[0\.08\] backdrop-blur-\[20px\] shadow-\[inset_0_1px_1px_rgba\(255,255,255,0\.05\)\]/g,
  'bg-[rgba(10,10,10,0.35)] backdrop-blur-[18px] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
);

// 6 Cards Grid & 4 Cards Grid
content = content.replace(
  /bg-\[#0A0A0A\] border border-white\/\[0\.06\]/g,
  'bg-[rgba(10,10,10,0.35)] backdrop-blur-[18px] border border-[rgba(255,255,255,0.08)]'
);

// 5. Generous vertical spacing
// #page-wrapper gap-16 -> gap-[150px]
content = content.replace(
  /gap-16 py-12 md:py-24/,
  'gap-[150px] py-[150px]'
);

// 6. Ensure transparent backgrounds for sections explicitly
content = content.replace(/bg-black/g, 'bg-transparent');

// Save it back
fs.writeFileSync('c:\\Novix application\\vite-project\\src\\App.jsx', content);
console.log('Refactor complete!');
