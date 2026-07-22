const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove VideoBackground component
  content = content.replace(/import VideoBackground from ".*VideoBackground.*";\n/g, '');
  content = content.replace(/<VideoBackground\s*\/?>(<\/VideoBackground>)?/g, '<div className="bg-pattern-medical"></div>');
  
  // Replace dark backgrounds
  content = content.replace(/bg-black\/(30|40)/g, 'bg-[var(--color-bg-secondary)]');
  content = content.replace(/bg-white\/\[?0\.0[1-9]\]?/g, 'bg-[var(--color-bg-card)] shadow-sm');
  content = content.replace(/bg-white\/[0-9]+/g, 'bg-[var(--color-bg-card)] shadow-sm');
  
  // Replace borders
  content = content.replace(/border-white\/(5|10|20)/g, 'border-[var(--color-border)]');
  
  // Replace text colors
  content = content.replace(/text-white\/[0-9]+/g, 'text-[var(--color-text-secondary)]');
  content = content.replace(/text-white/g, 'text-[var(--color-primary-navy)]');
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src/pages'));
walkDir(path.join(__dirname, 'src/components'));
walkDir(path.join(__dirname, 'src/layouts'));

console.log("Refactoring complete.");
