import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [
      leadsCount,
      applicationsCount,
      insightsCount,
      leadsThisMonth,
      applicationsThisMonth,
      leadsBySource,
      applicationsByStatus
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.application.count(),
      prisma.insight.count(),
      prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }),
      prisma.application.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }),
      prisma.lead.groupBy({
        by: ['source'],
        _count: true
      }),
      prisma.application.groupBy({
        by: ['status'],
        _count: true
      })
    ]);

    return NextResponse.json({
      overview: {
        totalLeads: leadsCount,
        totalApplications: applicationsCount,
        totalInsights: insightsCount,
        leadsThisMonth,
        applicationsThisMonth
      },
      leadsBySource: leadsBySource.map(item => ({
        name: item.source,
        value: item._count
      })),
      applicationsByStatus: applicationsByStatus.map(item => ({
        name: item.status,
        value: item._count
      }))
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
