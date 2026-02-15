import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ metricId: string }> }) {
  const { metricId } = await params;
  
  await prisma.serviceMetric.delete({
    where: { id: metricId }
  });
  
  return NextResponse.json({ success: true });
}
