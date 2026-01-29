import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const insights = await prisma.insight.findMany({
      where: {
        OR: [
          { status: 'published' },
          { status: 'scheduled', scheduledAt: { lte: new Date() } }
        ]
      },
      include: {
        author: true,
        industries: true,
        services: true
      },
      orderBy: { publishedAt: 'desc' }
    });
    return NextResponse.json(insights);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const insight = await prisma.insight.create({
      data: {
        title: data.title,
        slug: data.slug,
        type: data.type,
        content: data.content,
        excerpt: data.excerpt,
        authorId: data.authorId,
        topics: data.topics || [],
        regions: data.regions || [],
        featured: data.featured || false,
        trending: data.trending || false,
        gated: data.gated || false,
        downloadUrl: data.downloadUrl,
        image: data.image,
        readTime: data.readTime || 5,
        status: data.status || 'draft',
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        industries: data.industryIds ? { connect: data.industryIds.map((id: string) => ({ id })) } : undefined,
        services: data.serviceIds ? { connect: data.serviceIds.map((id: string) => ({ id })) } : undefined
      }
    });
    return NextResponse.json(insight);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create insight' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const updateData: any = {
      title: data.title,
      slug: data.slug,
      type: data.type,
      content: data.content,
      excerpt: data.excerpt,
      topics: data.topics,
      regions: data.regions,
      featured: data.featured,
      trending: data.trending,
      gated: data.gated,
      downloadUrl: data.downloadUrl,
      image: data.image,
      readTime: data.readTime,
      industries: data.industryIds ? { set: data.industryIds.map((id: string) => ({ id })) } : undefined,
      services: data.serviceIds ? { set: data.serviceIds.map((id: string) => ({ id })) } : undefined
    };

    if (data.status) {
      updateData.status = data.status;
      if (data.status === 'published' && data.publishNow) {
        updateData.publishedAt = new Date();
      }
    }

    if (data.scheduledAt) {
      updateData.scheduledAt = new Date(data.scheduledAt);
    }

    const insight = await prisma.insight.update({
      where: { id: data.id },
      data: updateData
    });
    return NextResponse.json(insight);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update insight' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.insight.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete insight' }, { status: 500 });
  }
}
