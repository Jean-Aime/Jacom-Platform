import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type');
  const industry = searchParams.get('industry');
  const service = searchParams.get('service');
  const region = searchParams.get('region');
  const contentType = searchParams.get('contentType');

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], filters: {} });
  }

  try {
    const searchConditions = {
      industries: {
        where: {
          AND: [
            {
              OR: [
                { name: { contains: query } },
                { description: { contains: query } },
                { overview: { contains: query } }
              ]
            },
            ...(industry ? [{ id: industry }] : [])
          ]
        },
        include: { services: true, experts: true }
      },
      services: {
        where: {
          AND: [
            {
              OR: [
                { name: { contains: query } },
                { description: { contains: query } },
                { overview: { contains: query } }
              ]
            },
            ...(service ? [{ id: service }] : []),
            ...(industry ? [{ industries: { some: { id: industry } } }] : [])
          ]
        },
        include: { industries: true, experts: true }
      },
      insights: {
        where: {
          AND: [
            {
              OR: [
                { title: { contains: query } },
                { excerpt: { contains: query } },
                { content: { contains: query } }
              ]
            },
            ...(contentType ? [{ type: contentType }] : []),
            ...(industry ? [{ industries: { some: { id: industry } } }] : []),
            ...(service ? [{ services: { some: { id: service } } }] : []),
            ...(region ? [{ regions: { contains: region } }] : [])
          ]
        },
        include: { author: true, industries: true, services: true }
      },
      experts: {
        where: {
          AND: [
            {
              OR: [
                { name: { contains: query } },
                { role: { contains: query } },
                { bio: { contains: query } }
              ]
            },
            ...(industry ? [{ industries: { some: { id: industry } } }] : []),
            ...(service ? [{ services: { some: { id: service } } }] : [])
          ]
        },
        include: { industries: true, services: true }
      }
    };

    const [industries, services, insights, experts, allIndustries, allServices] = await Promise.all([
      !type || type === 'industry' ? prisma.industry.findMany({ ...searchConditions.industries, take: 20 }) : [],
      !type || type === 'service' ? prisma.service.findMany({ ...searchConditions.services, take: 20 }) : [],
      !type || type === 'insight' ? prisma.insight.findMany({ ...searchConditions.insights, take: 20 }) : [],
      !type || type === 'expert' ? prisma.expert.findMany({ ...searchConditions.experts, take: 20 }) : [],
      prisma.industry.findMany({ select: { id: true, name: true } }),
      prisma.service.findMany({ select: { id: true, name: true } })
    ]);

    const insightTypes = insights.reduce((acc: any, i: any) => {
      acc[i.type] = (acc[i.type] || 0) + 1;
      return acc;
    }, {});

    const regions = ['North America', 'Europe', 'Asia Pacific', 'Middle East & Africa', 'Latin America'];

    const results = {
      industries: industries.map(i => ({ ...i, type: 'industry' })),
      services: services.map(s => ({ ...s, type: 'service' })),
      insights: insights.map(i => ({ ...i, type: 'insight' })),
      experts: experts.map(e => ({ ...e, type: 'expert' }))
    };

    // Flat results for autocomplete
    const flatResults = [
      ...industries.map(i => ({ title: i.name, excerpt: i.description, type: 'industry', url: `/industries/${i.slug}` })),
      ...services.map(s => ({ title: s.name, excerpt: s.description, type: 'service', url: `/services/${s.slug}` })),
      ...insights.map(i => ({ title: i.title, excerpt: i.excerpt, type: i.type, url: `/insights/${i.slug}` })),
      ...experts.map(e => ({ title: e.name, excerpt: e.role, type: 'expert', url: `/experts/${e.slug}` }))
    ].slice(0, 10);

    const filters = {
      types: {
        industry: industries.length,
        service: services.length,
        insight: insights.length,
        expert: experts.length
      },
      industries: allIndustries,
      services: allServices,
      contentTypes: insightTypes,
      regions
    };

    return NextResponse.json({ results, flatResults, filters });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
