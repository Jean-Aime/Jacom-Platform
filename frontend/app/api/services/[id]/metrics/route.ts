import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  
  const count = await prisma.serviceMetric.count({ where: { serviceId: id } });
  
  const metric = await prisma.serviceMetric.create({
    data: {
      serviceId: id,
      label: body.label,
      value: body.value,
      change: body.change,
      order: count
    }
  });
  
  return NextResponse.json(metric);
}
