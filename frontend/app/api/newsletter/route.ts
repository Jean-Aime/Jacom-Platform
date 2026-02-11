import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const subscriber = await prisma.subscriber.create({
      data: { email }
    });
    
    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.subscriber.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
  }
}