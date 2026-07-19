const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'd:/vadhuvara-biodata';
const EXCLUDE_DIRS = ['node_modules', '.next', '.git', '.gemini', 'package-lock.json', 'yarn.lock'];
const EXTENSIONS = ['.ts', '.tsx', '.json', '.js', '.jsx', '.css', '.md', '.html', '.prisma', '.yml', '.yaml'];

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return EXTENSIONS.includes(ext);
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (EXCLUDE_DIRS.includes(item)) continue;
      processDirectory(fullPath);
    } else {
      if (!shouldProcessFile(fullPath)) continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      // Replace vadhuvar -> vadhuvar
      // Replace Vadhuvar -> Vadhuvar
      // Replace VADHUVAR -> VADHUVAR
      content = content.replace(/vadhuvar/g, 'vadhuvar');
      content = content.replace(/Vadhuvar/g, 'Vadhuvar');
      content = content.replace(/VADHUVAR/g, 'VADHUVAR');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${path.relative(ROOT_DIR, fullPath)}`);
      }
    }
  }
}

console.log('Starting branding replacement: vadhuvar -> vadhuvar...');
processDirectory(ROOT_DIR);
console.log('Branding replacement complete.');
