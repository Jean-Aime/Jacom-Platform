import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { status: 'published' },
      select: { id: true, name: true, slug: true, featured: true }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
