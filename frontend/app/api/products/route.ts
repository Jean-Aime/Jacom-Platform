import { NextRequest, NextResponse } from "next/server";

// Products are now handled by PHP backend
export async function GET() {
  return NextResponse.json({ error: "Use backend API" }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ error: "Use backend API" }, { status: 501 });
}

export async function PUT() {
  return NextResponse.json({ error: "Use backend API" }, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Use backend API" }, { status: 501 });
}
