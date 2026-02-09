import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const experts = await prisma.expert.findMany({
      include: {
        industries: true,
        services: true,
        insights: true
      },
      orderBy: { featured: 'desc' }
    });
    return NextResponse.json(experts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const expert = await prisma.expert.create({
      data: {
        name: body.name,
        slug: body.slug,
        role: body.role,
        bio: body.bio,
        expertise: body.expertise,
        locations: body.locations,
        image: body.image,
        email: body.email,
        linkedin: body.linkedin,
        featured: body.featured || false,
        industries: body.industryIds ? { connect: body.industryIds.map((id: string) => ({ id })) } : undefined,
        services: body.serviceIds ? { connect: body.serviceIds.map((id: string) => ({ id })) } : undefined
      }
    });
    return NextResponse.json(expert);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create expert" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    
    const expert = await prisma.expert.update({
      where: { id: id! },
      data: {
        name: body.name,
        slug: body.slug,
        role: body.role,
        bio: body.bio,
        expertise: body.expertise,
        locations: body.locations,
        image: body.image,
        email: body.email,
        linkedin: body.linkedin,
        featured: body.featured,
        industries: body.industryIds ? { set: body.industryIds.map((id: string) => ({ id })) } : undefined,
        services: body.serviceIds ? { set: body.serviceIds.map((id: string) => ({ id })) } : undefined
      }
    });
    return NextResponse.json(expert);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update expert" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    await prisma.expert.delete({
      where: { id: id! }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete expert" }, { status: 500 });
  }
}
