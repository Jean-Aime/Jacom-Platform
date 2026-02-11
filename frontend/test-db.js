const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test subscriber table
    const subscriberCount = await prisma.subscriber.count();
    console.log(`📧 Subscribers in database: ${subscriberCount}`);
    
    // Test insight table
    const insightCount = await prisma.insight.count();
    console.log(`📝 Insights in database: ${insightCount}`);
    
    // Add a test subscriber if none exist
    if (subscriberCount === 0) {
      await prisma.subscriber.create({
        data: {
          email: 'test@example.com',
          status: 'active',
          source: 'test'
        }
      });
      console.log('✅ Test subscriber added');
    }
    
    console.log('🎉 Database test completed successfully');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();