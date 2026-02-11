import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Test subscriber table
    const subscriberCount = await prisma.subscriber.count();
    
    // Test insight table  
    const insightCount = await prisma.insight.count();
    
    return NextResponse.json({ 
      success: true,
      database: 'connected',
      subscribers: subscriberCount,
      insights: insightCount,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false,
      error: error.message,
      code: error.code
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}