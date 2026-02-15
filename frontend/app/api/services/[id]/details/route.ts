import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const service = await prisma.service.findUnique({
    where: { id }
  });
  
  const capabilities = await prisma.serviceCapability.findMany({
    where: { serviceId: id },
    orderBy: { order: 'asc' }
  });
  
  const processSteps = await prisma.serviceProcessStep.findMany({
    where: { serviceId: id },
    orderBy: { order: 'asc' }
  });
  
  const metrics = await prisma.serviceMetric.findMany({
    where: { serviceId: id },
    orderBy: { order: 'asc' }
  });
  
  return NextResponse.json({ service, capabilities, processSteps, metrics });
}
