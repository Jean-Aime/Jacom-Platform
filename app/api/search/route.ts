import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const [industries, services, insights, experts] = await Promise.all([
      prisma.industry.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } }
          ]
        },
        take: 5
      }),
      prisma.service.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } }
          ]
        },
        take: 5
      }),
      prisma.insight.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { excerpt: { contains: query } }
          ]
        },
        take: 5
      }),
      prisma.expert.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { role: { contains: query } }
          ]
        },
        take: 5
      })
    ]);

    const results = {
      industries: industries.map(i => ({ ...i, type: 'industry' })),
      services: services.map(s => ({ ...s, type: 'service' })),
      insights: insights.map(i => ({ ...i, type: 'insight' })),
      experts: experts.map(e => ({ ...e, type: 'expert' }))
    };

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
