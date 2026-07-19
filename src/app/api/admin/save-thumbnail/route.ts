import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const { templateId, imageData } = await request.json();

    if (!templateId || !imageData) {
      return NextResponse.json({ error: 'Missing templateId or imageData' }, { status: 400 });
    }

    // Ensure it's a base64 string
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Convert to webp using sharp
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 82 })
      .toBuffer();

    // Determine the save path
    const savePath = path.join(process.cwd(), 'public', 'images', 'templates', `${templateId}.webp`);

    // Create directory if it doesn't exist
    const dir = path.dirname(savePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write file
    fs.writeFileSync(savePath, webpBuffer);
    const imagePath = `/images/templates/${templateId}.webp`;

    // Update the database
    try {
      // Community map: key = templateId (lowercase, hyphen or underscore), value = community string
      const communityMap: Record<string, string> = {
        // Muslim templates
        'emerald-paradise': 'Muslim', 'emerald_paradise': 'Muslim',
        'turquoise-arabesque': 'Muslim', 'turquoise_arabesque': 'Muslim',
        'midnight-lantern': 'Muslim', 'midnight_lantern': 'Muslim',
        'sandstone-grace': 'Muslim', 'sandstone_grace': 'Muslim',
        'imperial-nikah': 'Muslim', 'imperial_nikah': 'Muslim',
        // Christian templates
        'celestial-grace': 'Christian', 'celestial_grace': 'Christian',
        'ivory-chapel': 'Christian', 'ivory_chapel': 'Christian',
        'azure-faith': 'Christian', 'azure_faith': 'Christian',
        'silver-blessing': 'Christian', 'silver_blessing': 'Christian',
        // Multi-community: Christian + Hindu (floral/universal design)
        'rose-garden': 'Christian,Hindu', 'rose_garden': 'Christian,Hindu',
        // Sikh templates
        'golden-khanda': 'Sikh', 'golden_khanda': 'Sikh',
        'saffron-glory': 'Sikh', 'saffron_glory': 'Sikh',
        'anand-karaj': 'Sikh', 'anand_karaj': 'Sikh',
        'steel-akali': 'Sikh', 'steel_akali': 'Sikh',
        // Multi-community: Sikh + Hindu (Punjab shared heritage)
        'punjab-heritage': 'Sikh,Hindu', 'punjab_heritage': 'Sikh,Hindu',
        // New Hindu templates
        'aura-crimson': 'Hindu', 'aura_crimson': 'Hindu',
        'sanskrit-sandalwood': 'Hindu', 'sanskrit_sandalwood': 'Hindu',
        'marigold-garden': 'Hindu', 'marigold_garden': 'Hindu',
        'royal-peacock': 'Hindu', 'royal_peacock': 'Hindu',
        'temple-lotus': 'Hindu', 'temple_lotus': 'Hindu',
      };

      const defaultCommunity = communityMap[templateId.toLowerCase()] || 'Hindu';

      await prisma.template.upsert({
        where: { templateId: templateId },
        update: { image: imagePath },
        create: {
          templateId: templateId,
          name: templateId.split(/[-_]/).map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          image: imagePath,
          category: 'Premium',
          community: defaultCommunity,
          gender: 'BOTH'
        }
      });
    } catch (dbError) {
      console.error('Failed to update template in DB:', dbError);
    }


    return NextResponse.json({ success: true, path: imagePath });
  } catch (error) {
    console.error('Error saving thumbnail:', error);
    return NextResponse.json({ error: 'Failed to save thumbnail' }, { status: 500 });
  }
}
