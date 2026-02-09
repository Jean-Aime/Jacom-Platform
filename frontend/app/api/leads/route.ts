import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendLeadNotification } from '@/lib/email';
import { syncLeadToCRM } from '@/lib/crm';
import { calculateLeadScore } from '@/lib/scoring';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Calculate lead score
    const score = calculateLeadScore({
      email: data.email,
      company: data.company,
      jobTitle: data.jobTitle,
      source: data.source || 'website',
      downloadedContent: data.downloadedContent || 0,
      pagesVisited: data.pagesVisited || 0,
      timeOnSite: data.timeOnSite || 0
    });

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        message: data.message,
        source: data.source || 'website',
        metadata: JSON.stringify({
          score,
          jobTitle: data.jobTitle,
          downloadedContent: data.downloadedContent || 0,
          ...data.metadata
        })
      }
    });

    // Send email notification
    await sendLeadNotification({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      source: data.source
    });

    // Sync to CRM (async, don't wait)
    syncLeadToCRM({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      jobTitle: data.jobTitle,
      message: data.message,
      source: data.source || 'website',
      score,
      metadata: data.metadata
    }).catch(err => console.error('CRM sync failed:', err));

    return NextResponse.json({ success: true, lead, score });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        phone: true,
        message: true,
        source: true,
        metadata: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      take: 500
    });

    // Parse metadata and add score
    const leadsWithScore = leads.map(lead => {
      const metadata = lead.metadata ? JSON.parse(lead.metadata as string) : {};
      return {
        ...lead,
        score: metadata.score || 0,
        jobTitle: metadata.jobTitle || null
      };
    });

    return NextResponse.json(leadsWithScore);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
