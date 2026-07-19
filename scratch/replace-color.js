const fs = require('fs');
const path = require('path');

const files = [
  'src/components/templates/templates-client.tsx',
  'src/components/pricing/pricing-client.tsx',
  'src/components/builder/step-one.tsx',
  'src/components/builder/step-two.tsx',
  'src/components/builder/step-three.tsx',
  'src/components/blogs/BlogsList.tsx',
  'src/components/blogs/BlogContent.tsx',
  'src/components/builder/builder-container.tsx',
  'src/app/terms/page.tsx',
  'src/app/shipping/page.tsx',
  'src/app/privacy-policy/page.tsx',
  'src/app/how-to-create-biodata/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/checkout/page.tsx',
  'src/app/cancellation/page.tsx',
  'src/app/about/page.tsx',
  'src/components/admin/RichTextEditor.tsx'
];

files.forEach(relPath => {
  const fullPath = path.join('d:/vadhuvara-biodata', relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace #d60d2c or d60d2c (case-insensitive)
  const regex = /d60d2c/gi;
  if (regex.test(content)) {
    content = content.replace(regex, '430917');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated color in: ${relPath}`);
  } else {
    console.log(`No color match in: ${relPath}`);
  }
});
