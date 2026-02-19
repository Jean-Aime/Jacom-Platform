import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateSession, unauthorizedResponse } from '@/lib/auth-middleware';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await validateSession(req);
  if (!user) return unauthorizedResponse();
  
  const { id } = await params;
  const body = await req.json();
  
  const count = await prisma.serviceCapability.count({ where: { serviceId: id } });
  
  const capability = await prisma.serviceCapability.create({
    data: {
      serviceId: id,
      icon: body.icon,
      title: body.title,
      description: body.description,
      order: count
    }
  });
  
  return NextResponse.json(capability);
}
