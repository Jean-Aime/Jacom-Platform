import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        subServices: true,
        industries: true,
        insights: true,
        experts: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const service = await prisma.service.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        overview: data.overview,
        methodologies: data.methodologies || [],
        tools: data.tools || [],
        featured: data.featured || false,
        image: data.image,
        industries: data.industryIds ? { connect: data.industryIds.map((id: string) => ({ id })) } : undefined,
        experts: data.expertIds ? { connect: data.expertIds.map((id: string) => ({ id })) } : undefined,
        insights: data.insightIds ? { connect: data.insightIds.map((id: string) => ({ id })) } : undefined
      }
    });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const service = await prisma.service.update({
      where: { id: data.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        overview: data.overview,
        methodologies: data.methodologies,
        tools: data.tools,
        featured: data.featured,
        image: data.image,
        industries: data.industryIds ? { set: data.industryIds.map((id: string) => ({ id })) } : undefined,
        experts: data.expertIds ? { set: data.expertIds.map((id: string) => ({ id })) } : undefined,
        insights: data.insightIds ? { set: data.insightIds.map((id: string) => ({ id })) } : undefined
      }
    });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
