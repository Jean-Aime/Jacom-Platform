import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateSession, unauthorizedResponse } from '@/lib/auth-middleware';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      orderBy: { featured: 'desc' }
    });
    return NextResponse.json(careers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();
  
  try {
    const body = await request.json();
    const career = await prisma.career.create({
      data: body
    });
    return NextResponse.json(career);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create career" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    
    const career = await prisma.career.update({
      where: { id: id! },
      data: body
    });
    return NextResponse.json(career);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update career" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    await prisma.career.delete({
      where: { id: id! }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete career" }, { status: 500 });
  }
}
