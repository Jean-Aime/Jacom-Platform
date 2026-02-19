import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateSession, unauthorizedResponse } from '@/lib/auth-middleware';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const where: any = {};
    if (type) {
      where.type = type.toUpperCase();
    }
    
    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Services error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();
  
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
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();
  
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
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();
  
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
