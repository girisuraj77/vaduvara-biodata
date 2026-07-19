import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const templates = await prisma.template.findMany();
    const duplicatesToDelete = [
      'traditional-gold',
      'basic-template',
      'modern-teal',
      'royal-gold',
      'floral-gold',
      'brown-bird',
      'sona-sanskriti',
      'scarlet-aura',
      'royal-amethyst',
      'ivory-filigree',
      'emerald-paradise',
      'turquoise-arabesque',
      'midnight-lantern',
      'sandstone-grace',
      'imperial-nikah'
    ];

    let deleteCount = 0;
    const log: string[] = [];

    for (const id of duplicatesToDelete) {
      // Check if the underscored version exists
      const underscoreId = id.replace(/-/g, '_');
      const hasUnderscore = templates.some(t => t.templateId === underscoreId);

      if (hasUnderscore) {
        // Delete the hyphenated version if it exists
        const exists = templates.some(t => t.templateId === id);
        if (exists) {
          log.push(`Deleting duplicate hyphenated template: ${id} (since ${underscoreId} exists)`);
          await prisma.template.delete({ where: { templateId: id } });
          deleteCount++;
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully deleted ${deleteCount} duplicate template records!`,
      log 
    });
  } catch (error: any) {
    console.error('Error cleaning duplicates:', error);
    return NextResponse.json({ error: error.message || 'Failed to clean duplicates' }, { status: 500 });
  }
}
