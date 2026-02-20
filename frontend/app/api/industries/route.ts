import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const industries = await prisma.industry.findMany({
      select: { id: true, name: true, slug: true }
    });
    return NextResponse.json(industries);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
