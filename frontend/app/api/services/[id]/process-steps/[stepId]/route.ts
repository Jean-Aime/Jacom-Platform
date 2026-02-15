import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ stepId: string }> }) {
  const { stepId } = await params;
  
  await prisma.serviceProcessStep.delete({
    where: { id: stepId }
  });
  
  return NextResponse.json({ success: true });
}
