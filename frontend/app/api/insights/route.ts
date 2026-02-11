import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');
    
    const where: any = {
      OR: [
        { status: 'published' },
        { status: 'scheduled', scheduledAt: { lte: new Date() } }
      ]
    };
    
    if (type) {
      where.type = type;
    }
    
    if (featured === 'true') {
      where.featured = true;
    }
    
    const insights = await prisma.insight.findMany({
      where,
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const data = await request.json();
    console.log('Updating insight:', id, 'Content length:', data.content?.length);
    
    // Check if status is changing to published
    const currentInsight = await prisma.insight.findUnique({ where: { id } });
    const isBeingPublished = currentInsight?.status !== 'published' && data.status === 'published';
    
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
      status: data.status || 'draft',
      industries: data.industryIds ? { set: data.industryIds.map((id: string) => ({ id })) } : undefined,
      services: data.serviceIds ? { set: data.serviceIds.map((id: string) => ({ id })) } : undefined
    };

    if (data.scheduledAt) {
      updateData.scheduledAt = new Date(data.scheduledAt);
    }

    // Set publishedAt when publishing
    if (isBeingPublished) {
      updateData.publishedAt = new Date();
    }

    const insight = await prisma.insight.update({
      where: { id },
      data: updateData
    });

    // Send newsletter if insight is being published
    if (isBeingPublished) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/newsletter/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ insightId: id })
        });
      } catch (emailError) {
        console.error('Failed to send newsletter:', emailError);
        // Don't fail the insight update if newsletter fails
      }
    }

    return NextResponse.json(insight);
  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update insight', details: error.message }, { status: 500 });
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
