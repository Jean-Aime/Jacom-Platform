import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateSession, unauthorizedResponse } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();
  
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const section = searchParams.get('section');

  try {
    const where: any = { active: true };
    if (page) where.page = page;
    if (section) where.section = section;

    const blocks = await prisma.contentBlock.findMany({
      where,
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(blocks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();
  
  try {
    const data = await request.json();
    const block = await prisma.contentBlock.create({ data });
    return NextResponse.json(block);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const data = await request.json();
    const block = await prisma.contentBlock.update({ where: { id }, data });
    return NextResponse.json(block);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.contentBlock.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}
