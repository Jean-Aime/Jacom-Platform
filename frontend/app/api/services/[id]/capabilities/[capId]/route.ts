import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ capId: string }> }) {
  const { capId } = await params;
  
  await prisma.serviceCapability.delete({
    where: { id: capId }
  });
  
  return NextResponse.json({ success: true });
}
