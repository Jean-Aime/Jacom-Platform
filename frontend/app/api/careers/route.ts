import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
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

export async function PUT(request: Request) {
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

export async function DELETE(request: Request) {
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
