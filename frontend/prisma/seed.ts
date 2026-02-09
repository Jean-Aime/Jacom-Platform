import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jas.com' },
    update: {},
    create: {
      email: 'admin@jas.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin'
    }
  });
  console.log('✓ Admin user created');

  // Create experts
  const expert1 = await prisma.expert.upsert({
    where: { slug: 'michael-rodriguez' },
    update: {},
    create: {
      name: 'Michael Rodriguez',
      slug: 'michael-rodriguez',
      role: 'Senior Consultant',
      bio: 'Expert in digital transformation and technology consulting',
      expertise: 'Digital Transformation, AI, IoT',
      locations: 'New York, London',
      featured: true
    }
  });

  const expert2 = await prisma.expert.upsert({
    where: { slug: 'sarah-chen' },
    update: {},
    create: {
      name: 'Sarah Chen',
      slug: 'sarah-chen',
      role: 'Lead Consultant',
      bio: 'Specialist in business strategy and operations',
      expertise: 'Strategy, Operations, Change Management',
      locations: 'San Francisco, Tokyo',
      featured: true
    }
  });
  console.log('✓ Experts created');

  // Create industries
  const industries = await Promise.all([
    prisma.industry.upsert({
      where: { slug: 'healthcare' },
      update: {},
      create: {
        name: 'Healthcare',
        slug: 'healthcare',
        description: 'Healthcare and life sciences consulting',
        overview: 'Comprehensive healthcare solutions',
        challenges: 'Digital transformation, regulatory compliance',
        trends: 'AI in healthcare, telemedicine',
        featured: true
      }
    }),
    prisma.industry.upsert({
      where: { slug: 'financial-services' },
      update: {},
      create: {
        name: 'Financial Services',
        slug: 'financial-services',
        description: 'Banking and financial services consulting',
        overview: 'Digital banking solutions',
        challenges: 'Fintech disruption, compliance',
        trends: 'Digital payments, blockchain',
        featured: true
      }
    }),
    prisma.industry.upsert({
      where: { slug: 'technology' },
      update: {},
      create: {
        name: 'Technology',
        slug: 'technology',
        description: 'Technology sector consulting',
        overview: 'Innovation and digital solutions',
        challenges: 'Rapid change, competition',
        trends: 'AI, cloud computing, IoT',
        featured: true
      }
    })
  ]);
  console.log('✓ Industries created');

  // Create services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: 'digital-transformation' },
      update: {},
      create: {
        name: 'Digital Transformation',
        slug: 'digital-transformation',
        description: 'End-to-end digital transformation consulting',
        overview: 'Transform your business digitally',
        methodologies: 'Agile, Design Thinking',
        tools: 'Cloud, AI, Analytics',
        featured: true
      }
    }),
    prisma.service.upsert({
      where: { slug: 'strategy-consulting' },
      update: {},
      create: {
        name: 'Strategy Consulting',
        slug: 'strategy-consulting',
        description: 'Business strategy and planning',
        overview: 'Strategic planning and execution',
        methodologies: 'Porter Five Forces, SWOT',
        tools: 'Analytics, Market Research',
        featured: true
      }
    })
  ]);
  console.log('✓ Services created');

  // Create insights
  await prisma.insight.upsert({
    where: { slug: 'future-of-digital-banking' },
    update: {},
    create: {
      title: 'The Future of Digital Banking',
      slug: 'future-of-digital-banking',
      type: 'Article',
      excerpt: 'Exploring how AI and digital technologies are transforming the banking industry.',
      content: `The banking industry is undergoing a profound transformation driven by digital technologies and changing customer expectations.

Key Trends:

1. Artificial Intelligence
AI is revolutionizing customer service through chatbots, personalized recommendations, and fraud detection. Banks are investing heavily in AI to improve efficiency and customer experience.

2. Mobile-First Banking
Customers now expect seamless mobile experiences. Digital-only banks are challenging traditional institutions with superior mobile apps and user experiences.

3. Open Banking
APIs and open banking regulations are enabling new partnerships and innovative financial products. This is creating a more competitive and customer-centric ecosystem.

4. Blockchain and Cryptocurrencies
Distributed ledger technology is being explored for faster, more secure transactions. Central banks are even considering digital currencies.

Conclusion:
Banks that embrace digital transformation will thrive, while those that resist change risk becoming obsolete. The future belongs to institutions that put customer experience and innovation at the center of their strategy.`,
      authorId: expert1.id,
      readTime: 8,
      featured: true,
      trending: true,
      topics: JSON.stringify(['Digital Banking', 'AI', 'Fintech']),
      regions: JSON.stringify(['Global']),
      status: 'published',
      industries: {
        connect: [{ id: industries[1].id }]
      },
      services: {
        connect: [{ id: services[0].id }]
      }
    }
  });

  await prisma.insight.upsert({
    where: { slug: 'healthcare-digital-transformation' },
    update: {},
    create: {
      title: 'Healthcare Digital Transformation: A Comprehensive Guide',
      slug: 'healthcare-digital-transformation',
      type: 'Whitepaper',
      excerpt: 'Complete roadmap for healthcare digital transformation',
      content: `Healthcare organizations worldwide are embracing digital transformation to improve patient outcomes, reduce costs, and enhance operational efficiency.

Introduction:
The healthcare industry faces unique challenges including regulatory compliance, data security, and the need to maintain high-quality patient care while managing costs.

Digital Health Technologies:

1. Electronic Health Records (EHR)
Modern EHR systems enable seamless information sharing across healthcare providers, improving care coordination and reducing medical errors.

2. Telemedicine
Remote consultations have become essential, especially post-pandemic. Telemedicine platforms enable access to care for patients in remote areas.

3. AI and Machine Learning
AI is being used for diagnostic imaging, drug discovery, and predicting patient outcomes. Machine learning algorithms can identify patterns that humans might miss.

4. IoT and Wearables
Connected devices monitor patient health in real-time, enabling proactive interventions and personalized care plans.

Implementation Strategy:

Phase 1: Assessment
- Evaluate current systems
- Identify gaps and opportunities
- Define clear objectives

Phase 2: Planning
- Develop roadmap
- Secure stakeholder buy-in
- Allocate resources

Phase 3: Execution
- Implement in phases
- Train staff
- Monitor progress

Phase 4: Optimization
- Gather feedback
- Continuous improvement
- Scale successful initiatives

Conclusion:
Digital transformation in healthcare is not optional—it's essential for survival and growth in the modern healthcare landscape.`,
      authorId: expert2.id,
      readTime: 15,
      featured: true,
      gated: true,
      downloadUrl: '/downloads/healthcare-digital-guide.pdf',
      topics: JSON.stringify(['Digital Transformation', 'Healthcare', 'Technology']),
      regions: JSON.stringify(['Global']),
      status: 'published',
      industries: {
        connect: [{ id: industries[0].id }]
      },
      services: {
        connect: [{ id: services[0].id }]
      }
    }
  });

  console.log('✓ Insights created');
  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
