import { prisma } from './prisma';

// Publish scheduled content that has reached its scheduled time
export async function publishScheduledContent() {
  const now = new Date();

  try {
    // Update insights
    const insights = await prisma.insight.updateMany({
      where: {
        status: 'scheduled',
        scheduledAt: { lte: now }
      },
      data: {
        status: 'published',
        publishedAt: now
      }
    });

    // Update media items
    const mediaItems = await prisma.mediaItem.updateMany({
      where: {
        status: 'scheduled',
        scheduledAt: { lte: now }
      },
      data: {
        status: 'published',
        publishedAt: now
      }
    });

    console.log(`Published ${insights.count} insights and ${mediaItems.count} media items`);
    
    return {
      success: true,
      insights: insights.count,
      mediaItems: mediaItems.count
    };
  } catch (error) {
    console.error('Scheduled publishing failed:', error);
    return { success: false, error };
  }
}

// Get content scheduled for publishing
export async function getScheduledContent() {
  try {
    const insights = await prisma.insight.findMany({
      where: { status: 'scheduled' },
      select: {
        id: true,
        title: true,
        scheduledAt: true,
        author: { select: { name: true } }
      },
      orderBy: { scheduledAt: 'asc' }
    });

    const mediaItems = await prisma.mediaItem.findMany({
      where: { status: 'scheduled' },
      select: {
        id: true,
        title: true,
        scheduledAt: true
      },
      orderBy: { scheduledAt: 'asc' }
    });

    return { insights, mediaItems };
  } catch (error) {
    console.error('Failed to get scheduled content:', error);
    return { insights: [], mediaItems: [] };
  }
}
