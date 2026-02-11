import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSubscribers() {
  try {
    // Add some test subscribers
    const testSubscribers = [
      { email: 'test1@example.com', status: 'active', source: 'website' },
      { email: 'test2@example.com', status: 'active', source: 'website' },
      { email: 'admin@jacom.com', status: 'active', source: 'manual' }
    ];

    for (const subscriber of testSubscribers) {
      await prisma.subscriber.upsert({
        where: { email: subscriber.email },
        update: {},
        create: subscriber
      });
    }

    console.log('✅ Test subscribers seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding subscribers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSubscribers();