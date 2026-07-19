import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Run direct raw SQL migration
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Template" ADD COLUMN IF NOT EXISTS "isViewHomePage" BOOLEAN DEFAULT true;
    `);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully migrated database: added isViewHomePage column to Template table.' 
    });
  } catch (error: any) {
    console.error('Error running SQL migration:', error);
    return NextResponse.json({ error: error.message || 'Migration failed' }, { status: 500 });
  }
}
