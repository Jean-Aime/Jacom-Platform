import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { slug } = await context.params;
  try {
    const response = await fetch(`${BACKEND_URL}/solutions/${slug}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    const solution = await response.json();
    return NextResponse.json(solution);
  } catch (error) {
    console.error('Solution API error:', error);
    return NextResponse.json({ error: 'Failed to fetch solution' }, { status: 500 });
  }
}
