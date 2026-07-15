const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Simplify and brighten background overlay
c = c.replace(
  /<div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>[\s\S]*?<\/div>/,
  '<div className="fixed inset-0 bg-black/30 backdrop-blur-md z-[-1]" />'
);

// 2. Fix fonts and spacing
// Hero
c = c.replace(
  /className="text-\[clamp[^"]+"/g,
  'className="text-5xl md:text-7xl lg:text-[100px] font-extrabold tracking-tight text-white leading-none mb-6"'
);
c = c.replace(
  /className="text-\[22px\][^"]+"/g,
  'className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"'
);
c = c.replace(
  /className="premium-heading[^"]+"/g,
  'className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"'
);

// Section subtitles
c = c.replace(
  /className="text-\[20px\] text-white\/75 font-normal max-w-\[700px\] mx-auto mb-\[64px\]"/g,
  'className="text-lg md:text-xl text-white/70 font-medium max-w-[700px] mx-auto mb-16"'
);

// 3. Fix cards (replace premium-glass-card with native tailwind)
c = c.replace(
  /className="w-full md:max-w-\[400px\] premium-glass-card[^"]+"/g,
  'className="w-full md:max-w-[400px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/30 transition-all duration-500 cursor-pointer group"'
);
c = c.replace(
  /className="premium-glass-card[^"]+"/g,
  'className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex items-start gap-5 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/30 transition-all duration-500 cursor-pointer group"'
);

// 4. Fix icon badges
c = c.replace(
  /className="premium-icon-badge[^"]+"/g,
  'className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500 shrink-0 mb-6 md:mb-0"'
);

// 5. Card text sizes
c = c.replace(
  /className="text-\[26px\] font-bold text-white mb-3 font-\['Outfit','Satoshi',sans-serif\]"/g,
  'className="text-2xl font-bold text-white mb-3"'
);
c = c.replace(
  /className="text-\[18px\] text-white\/78 font-normal leading-\[1\.8\] font-sans"/g,
  'className="text-base text-white/70 leading-relaxed"'
);

// Clean up styles to just rely on font-sans
c = c.replace(/font-\['Outfit','Satoshi',sans-serif\]/g, 'font-sans');

fs.writeFileSync('src/App.jsx', c);
console.log('App.jsx updated with better UI.');
