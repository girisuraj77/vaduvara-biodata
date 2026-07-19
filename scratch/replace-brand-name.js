const fs = require('fs');
const path = require('path');

const files = [
  'src/lib/email.ts',
  'src/components/templates/template-card.tsx',
  'src/components/layout/navbar.tsx',
  'src/components/layout/footer.tsx',
  'src/components/builder/preview-step.tsx',
  'src/app/templates/page.tsx',
  'src/app/shipping/page.tsx',
  'src/app/privacy-policy/page.tsx',
  'src/app/page.tsx',
  'src/app/pricing/page.tsx',
  'src/app/layout.tsx',
  'src/app/formats/marriage-biodata-for-boys/page.tsx',
  'src/app/formats/word-format/page.tsx',
  'src/app/formats/pdf-format/page.tsx',
  'src/app/formats/marriage-biodata-for-girls/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/community/hindu-marriage-biodata/page.tsx',
  'src/app/community/sikh-marriage-biodata/page.tsx',
  'src/app/community/marathi-biodata-format/page.tsx',
  'src/app/community/muslim-marriage-biodata/page.tsx',
  'src/app/community/gujarati-matrimonial-profile/page.tsx',
  'src/app/community/christian-wedding-profile/page.tsx',
  'src/app/checkout/page.tsx',
  'src/app/cancellation/page.tsx',
  'src/app/blogs/[slug]/page.tsx',
  'src/app/about/page.tsx'
];

files.forEach(relPath => {
  const fullPath = path.join('d:/vadhuvara-biodata', relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let original = content;

  // 1. Replace mywedprofile.com -> vadhuvarbiodata.com (case insensitive)
  content = content.replace(/mywedprofile\.com/gi, 'vadhuvarbiodata.com');

  // 2. Replace MyWedProfile -> Vadhuvar Biodata
  content = content.replace(/MyWedProfile/g, 'Vadhuvar Biodata');

  // 3. Replace mywedprofile -> vadhuvarbiodata
  content = content.replace(/mywedprofile/g, 'vadhuvarbiodata');
  
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Rebranded content in: ${relPath}`);
  } else {
    console.log(`No brand name match in: ${relPath}`);
  }
});
