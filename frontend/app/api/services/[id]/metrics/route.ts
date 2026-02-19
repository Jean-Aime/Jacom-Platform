import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateSession, unauthorizedResponse } from '@/lib/auth-middleware';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await validateSession(req);
  if (!user) return unauthorizedResponse();
  
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
