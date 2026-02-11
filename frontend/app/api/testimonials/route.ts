import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      include: {
        industries: true,
        services: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        name: data.name,
        role: data.role,
        company: data.company,
        content: data.content,
        rating: data.rating || 5,
        image: data.image,
        featured: data.featured || false,
        industries: data.industryIds ? { connect: data.industryIds.map((id: string) => ({ id })) } : undefined,
        services: data.serviceIds ? { connect: data.serviceIds.map((id: string) => ({ id })) } : undefined
      }
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    const testimonial = await prisma.testimonial.update({
      where: { id: data.id },
      data: {
        name: data.name,
        role: data.role,
        company: data.company,
        content: data.content,
        rating: data.rating,
        image: data.image,
        featured: data.featured,
        industries: data.industryIds?.length ? { set: data.industryIds.map((id: string) => ({ id })) } : { set: [] },
        services: data.serviceIds?.length ? { set: data.serviceIds.map((id: string) => ({ id })) } : { set: [] }
      }
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}