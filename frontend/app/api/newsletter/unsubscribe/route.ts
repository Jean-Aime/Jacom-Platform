import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    await prisma.subscriber.updateMany({
      where: { email },
      data: { status: 'unsubscribed' }
    });

    return NextResponse.json({ success: true, message: 'Successfully unsubscribed' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    await prisma.subscriber.updateMany({
      where: { email },
      data: { status: 'unsubscribed' }
    });

    return NextResponse.json({ success: true, message: 'Successfully unsubscribed' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
  }
}