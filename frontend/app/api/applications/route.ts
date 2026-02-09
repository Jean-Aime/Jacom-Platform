import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const application = await prisma.application.create({
      data: {
        careerId: body.careerId,
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        linkedin: body.linkedin || '',
        coverLetter: body.coverLetter || '',
        resumeUrl: body.resumeUrl || '',
        status: 'pending'
      }
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        career: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const application = await prisma.application.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}
