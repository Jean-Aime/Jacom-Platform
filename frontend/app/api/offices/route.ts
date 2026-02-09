import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      orderBy: { region: 'asc' }
    });
    return NextResponse.json(offices);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch offices" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const office = await prisma.office.create({
      data: body
    });
    return NextResponse.json(office);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create office" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    
    const office = await prisma.office.update({
      where: { id: id! },
      data: body
    });
    return NextResponse.json(office);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update office" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    await prisma.office.delete({
      where: { id: id! }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete office" }, { status: 500 });
  }
}
