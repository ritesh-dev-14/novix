const fs = require('fs');

let content = fs.readFileSync('c:\\Novix application\\vite-project\\src\\App.jsx', 'utf-8');

// 1. Overlay Layer Updates
content = content.replace(
  /<div style={{\s*position: 'fixed',\s*inset: 0,\s*background: 'rgba\(0,0,0,0\.55\)'[^>]*\/>/,
  `<div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,8,18,0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, rgba(40,120,255,0.12), transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.55))' }} />
      </div>`
);

// 2. Navbar Updates
content = content.replace(
  /background: 'rgba\(0,0,0,\.35\)',/g,
  `background: 'rgba(8,12,18,.45)',`
);
content = content.replace(
  /backdropFilter: 'blur\(16px\)',/g,
  `backdropFilter: 'blur(30px)',`
);
content = content.replace(
  /WebkitBackdropFilter: 'blur\(16px\)',/g,
  `WebkitBackdropFilter: 'blur(30px)',\n          boxShadow: '0 10px 40px rgba(0,0,0,.35)',`
);

// 3. Spacing globally
content = content.replace(/gap-\[150px\] py-\[150px\]/g, 'gap-[160px] py-[160px]');
content = content.replace(/gap-6/g, 'gap-[32px]');

// 4. Hero Section layout
content = content.replace(
  /className="w-full max-w-\[1280px\] min-h-\[900px\] text-white font-sans flex flex-col justify-between p-8 md:p-12 relative overflow-visible select-none shrink-0"/,
  'className="w-full max-w-[1280px] min-h-[100vh] text-white font-sans flex flex-col justify-start pt-[160px] pb-12 px-8 md:px-12 relative overflow-visible select-none shrink-0"'
);

content = content.replace(
  /className="flex-1 flex flex-col justify-center items-center gap-6 md:gap-8 z-10 w-full my-auto"/,
  'className="flex flex-col justify-start items-center z-10 w-full"'
);

// Replace hero heading
content = content.replace(
  /className="text-\[36px\] sm:text-5xl md:text-\[64px\] font-normal tracking-tight text-white mb-4 leading-\[1\.12\] font-sans"/,
  'className="text-[clamp(72px,7vw,120px)] font-extrabold tracking-[-0.04em] text-white leading-[0.95] mb-6 font-[\'Outfit\',\'Satoshi\',sans-serif]" style={{ textShadow: "0 0 30px rgba(0,0,0,.45)" }}'
);

// Replace hero description
content = content.replace(
  /className="text-\[14px\] sm:text-\[15px\] md:text-\[16px\] text-white\/60 font-normal max-w-xl mx-auto mb-6 leading-relaxed font-sans"/,
  'className="text-[22px] text-white/78 font-normal max-w-[720px] mx-auto mb-[40px] leading-relaxed font-sans"'
);

// Replace CTA button
content = content.replace(
  /className="group flex items-center gap-4 bg-white text-black pl-7 pr-3\.5 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-white\/95 hover:scale-102 hover:shadow-lg hover:shadow-white\/5 active:scale-98 cursor-pointer font-sans"/,
  'className="group flex items-center gap-4 bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] text-white pl-8 pr-4 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[rgba(255,255,255,0.15)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_30px_rgba(65,145,255,0.25)] active:scale-95 cursor-pointer font-sans"'
);

content = content.replace(
  /transition={{ duration: 0\.8, delay: 0\.2, ease: \[0\.16, 1, 0\.3, 1\] }}/,
  'transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}\n              className="mb-[80px]"'
);

// 5. Section titles & subtitles
content = content.replace(
  /className="text-3xl sm:text-4xl md:text-\[52px\] font-normal leading-\[1\.15\] tracking-tight mb-4 text-white max-w-3xl"/g,
  'className="premium-heading mb-4 text-white max-w-[900px]"'
);
content = content.replace(
  /className="text-3xl sm:text-4xl md:text-\[42px\] lg:text-\[46px\] font-normal leading-\[1\.25\] tracking-tight mb-6 max-w-4xl text-center text-white"/g,
  'className="premium-heading mb-6 max-w-[900px] text-center text-white"'
);

// Replace subtitles
content = content.replace(
  /text-\[13px\] sm:text-sm md:text-\[15px\] text-white\/50 font-normal max-w-2xl mx-auto mb-16/g,
  'text-[20px] text-white/75 font-normal max-w-[700px] mx-auto mb-[64px]'
);
content = content.replace(
  /text-\[13px\] sm:text-sm md:text-\[14px\] text-white\/50 font-normal max-w-xl mx-auto mb-16/g,
  'text-[20px] text-white/75 font-normal max-w-[700px] mx-auto mb-[64px]'
);

// 6. Glass Cards
const oldCardClass = 'w-full md:max-w-\\[340px\\] bg-\\[rgba\\(10,10,10,0\\.35\\)\\] backdrop-blur-\\[18px\\] border border-white/\\[0\\.08\\] shadow-\\[inset_0_1px_1px_rgba\\(255,255,255,0\\.05\\)\\] rounded-\\[20px\\] p-5 flex flex-col justify-between hover:bg-white/\\[0\\.05\\] hover:border-white/\\[0\\.15\\] transition-all duration-500 group cursor-pointer text-left';
const newCardClass = 'w-full md:max-w-[400px] premium-glass-card p-[40px] flex flex-col justify-between cursor-pointer text-left';
content = content.replace(new RegExp(oldCardClass, 'g'), newCardClass);

const oldCertCardClass = 'bg-\\[rgba\\(10,10,10,0\\.35\\)\\] backdrop-blur-\\[18px\\] border border-\\[rgba\\(255,255,255,0\\.08\\)\\] shadow-\\[inset_0_1px_1px_rgba\\(255,255,255,0\\.02\\)\\] rounded-\\[24px\\] p-6 flex items-start gap-5 hover:bg-white/\\[0\\.02\\] hover:border-white/\\[0\\.12\\] transition-all duration-500 group relative cursor-pointer text-left min-h-\\[170px\\]';
const newCertCardClass = 'premium-glass-card p-[40px] flex items-start gap-5 relative cursor-pointer text-left min-h-[220px]';
content = content.replace(new RegExp(oldCertCardClass, 'g'), newCertCardClass);


// 7. Icon Badges
content = content.replace(
  /w-8\.5 h-8\.5 rounded-full bg-white flex items-center justify-center mb-3\.5 group-hover:scale-105 transition-transform duration-300 shadow-md text-blue-600/g,
  'premium-icon-badge mb-6'
);

content = content.replace(
  /w-14 h-14 rounded-full border border-white\/\[0\.08\] bg-white\/\[0\.01\] flex items-center justify-center shrink-0 text-white\/90 group-hover:scale-105 transition-transform duration-300/g,
  'premium-icon-badge shrink-0'
);

content = content.replace(
  /w-11 h-11 rounded-xl border border-white\/\[0\.08\] bg-white\/\[0\.02\] flex items-center justify-center shrink-0 shadow-\[inset_0_1px_1px_rgba\(255,255,255,0\.03\)\] text-white\/90/g,
  'premium-icon-badge shrink-0'
);

// 8. Card Titles & Text
content = content.replace(
  /text-\[15px\] font-semibold text-white mb-1\.5 font-sans/g,
  'text-[26px] font-bold text-white mb-3 font-["Outfit","Satoshi",sans-serif]'
);
content = content.replace(
  /text-\[12px\] text-white\/60 font-normal leading-relaxed font-sans/g,
  'text-[18px] text-white/78 font-normal leading-[1.8] font-sans'
);

content = content.replace(
  /text-\[17px\] font-bold text-white tracking-wide font-sans/g,
  'text-[26px] font-bold text-white mb-3 font-["Outfit","Satoshi",sans-serif]'
);
content = content.replace(
  /text-\[12px\] text-white\/55 font-normal leading-relaxed font-sans/g,
  'text-[18px] text-white/78 font-normal leading-[1.8] font-sans'
);

// 9. Misc
content = content.replace(/className="w-4\.5 h-4\.5 /g, 'className="w-7 h-7 ');
content = content.replace(/className="w-5 h-5 /g, 'className="w-7 h-7 ');
content = content.replace(/className="w-5\.5 h-5\.5 /g, 'className="w-7 h-7 ');
content = content.replace(/text-\[13px\] font-black/g, 'text-[18px] font-black');
content = content.replace(/text-\[15px\] font-black/g, 'text-[20px] font-black');


fs.writeFileSync('c:\\Novix application\\vite-project\\src\\App.jsx', content);
