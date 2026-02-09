import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const industries = await prisma.industry.findMany({
      include: {
        services: true,
        insights: true,
        experts: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(industries || []);
  } catch (error) {
    console.error('Error fetching industries:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const industry = await prisma.industry.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        overview: data.overview || '',
        challenges: data.challenges || '',
        trends: data.trends || '',
        featured: data.featured || false,
        image: data.image || null,
        services: data.serviceIds?.length ? { connect: data.serviceIds.map((id: string) => ({ id })) } : undefined,
        experts: data.expertIds?.length ? { connect: data.expertIds.map((id: string) => ({ id })) } : undefined,
        insights: data.insightIds?.length ? { connect: data.insightIds.map((id: string) => ({ id })) } : undefined
      }
    });
    return NextResponse.json(industry);
  } catch (error) {
    console.error('Error creating industry:', error);
    return NextResponse.json({ error: 'Failed to create industry' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const industry = await prisma.industry.update({
      where: { id: data.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        overview: data.overview || '',
        challenges: data.challenges || '',
        trends: data.trends || '',
        featured: data.featured,
        image: data.image || null,
        services: data.serviceIds?.length ? { set: data.serviceIds.map((id: string) => ({ id })) } : { set: [] },
        experts: data.expertIds?.length ? { set: data.expertIds.map((id: string) => ({ id })) } : { set: [] },
        insights: data.insightIds?.length ? { set: data.insightIds.map((id: string) => ({ id })) } : { set: [] }
      }
    });
    return NextResponse.json(industry);
  } catch (error) {
    console.error('Error updating industry:', error);
    return NextResponse.json({ error: 'Failed to update industry' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.industry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete industry' }, { status: 500 });
  }
}
