import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { insightId, subject, preview } = await request.json();
    
    if (!insightId) {
      return NextResponse.json({ error: 'Insight ID required' }, { status: 400 });
    }

    // Get the insight details
    const insight = await prisma.insight.findUnique({
      where: { id: insightId },
      include: { author: true }
    });

    if (!insight) {
      return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
    }

    // Get all active subscribers
    const subscribers = await prisma.subscriber.findMany({
      where: { status: 'active' }
    });

    if (subscribers.length === 0) {
      return NextResponse.json({ error: 'No active subscribers found' }, { status: 400 });
    }

    const emailData = {
      subject: subject || `New Insight: ${insight.title}`,
      preview: preview || insight.excerpt,
      insightTitle: insight.title,
      insightUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/insights/${insight.slug}`,
      authorName: insight.author.name,
      subscriberCount: subscribers.length
    };

    // TODO: Implement actual email sending with Resend/SendGrid
    
    return NextResponse.json({ 
      success: true, 
      message: `Newsletter prepared for ${subscribers.length} subscribers`,
      emailData 
    });

  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json({ error: 'Failed to send newsletter' }, { status: 500 });
  }
}