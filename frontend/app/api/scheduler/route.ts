import { NextRequest, NextResponse } from 'next/server';
import { publishScheduledContent } from '@/lib/scheduler';

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'dev-secret';
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await publishScheduledContent();
    
    return NextResponse.json({
      success: true,
      message: `Published ${result.insights} insights and ${result.mediaItems} media items`,
      ...result
    });
  } catch (error) {
    console.error('Scheduler error:', error);
    return NextResponse.json({ error: 'Scheduler failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Scheduler endpoint. Use POST with authorization header to trigger.',
    usage: 'POST /api/scheduler with Authorization: Bearer YOUR_CRON_SECRET'
  });
}
