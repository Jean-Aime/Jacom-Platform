import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  
  const service = await prisma.service.update({
    where: { id },
    data: {
      caseStudyLabel: body.label,
      caseStudyTitle: body.title,
      caseStudyDescription: body.description,
      caseStudyImage: body.image,
      caseStudyMetric1Label: body.metric1Label,
      caseStudyMetric1Value: body.metric1Value,
      caseStudyMetric2Label: body.metric2Label,
      caseStudyMetric2Value: body.metric2Value,
      caseStudyCtaText: body.ctaText,
      caseStudyCtaLink: body.ctaLink
    }
  });
  
  return NextResponse.json(service);
}
