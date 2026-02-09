import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const media = await prisma.mediaItem.findMany({
      orderBy: { publishedAt: 'desc' }
    });
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const media = await prisma.mediaItem.create({
      data: body
    });
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create media" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    
    const media = await prisma.mediaItem.update({
      where: { id: id! },
      data: body
    });
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    await prisma.mediaItem.delete({
      where: { id: id! }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
