import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  
  const service = await prisma.service.update({
    where: { id },
    data: {
      impactMetricsTitle: body.title
    }
  });
  
  return NextResponse.json(service);
}
