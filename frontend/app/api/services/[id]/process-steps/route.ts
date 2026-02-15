import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  
  const count = await prisma.serviceProcessStep.count({ where: { serviceId: id } });
  
  const step = await prisma.serviceProcessStep.create({
    data: {
      serviceId: id,
      step: body.step,
      title: body.title,
      description: body.description,
      order: count
    }
  });
  
  return NextResponse.json(step);
}
