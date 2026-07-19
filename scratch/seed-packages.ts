import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding download packages...');

  // Upsert PDF/Image Download Package
  await prisma.package.upsert({
    where: { id: 'image_download' },
    update: {
      name: 'PDF / Image Download',
      price: 49.00,
      originalPrice: 99.00,
      validityDays: 30,
      biodataLimit: 1,
      downloadLimit: 4,
      features: ['High Quality PDF', '4 Downloads Allowed', 'Single Matrimonial Card'],
      isActive: true,
    },
    create: {
      id: 'image_download',
      name: 'PDF / Image Download',
      price: 49.00,
      originalPrice: 99.00,
      validityDays: 30,
      biodataLimit: 1,
      downloadLimit: 4,
      features: ['High Quality PDF', '4 Downloads Allowed', 'Single Matrimonial Card'],
      isActive: true,
    },
  });

  // Upsert Word Download Package
  await prisma.package.upsert({
    where: { id: 'word_download' },
    update: {
      name: 'Word Document (.docx) Download',
      price: 99.00,
      originalPrice: 199.00,
      validityDays: 30,
      biodataLimit: 1,
      downloadLimit: 4,
      features: ['Editable MS Word (.doc)', '4 Downloads Allowed', 'Single Matrimonial Card', 'Easy Offline Customization'],
      isActive: true,
    },
    create: {
      id: 'word_download',
      name: 'Word Document (.docx) Download',
      price: 99.00,
      originalPrice: 199.00,
      validityDays: 30,
      biodataLimit: 1,
      downloadLimit: 4,
      features: ['Editable MS Word (.doc)', '4 Downloads Allowed', 'Single Matrimonial Card', 'Easy Offline Customization'],
      isActive: true,
    },
  });

  console.log('Packages seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding packages:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
