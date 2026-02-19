import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/solutions`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch solutions');
    }

    const solutions = await response.json();
    return NextResponse.json(solutions);
  } catch (error) {
    console.error('Solutions API error:', error);
    return NextResponse.json({ error: 'Failed to fetch solutions' }, { status: 500 });
  }
}
