import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
