import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding industries...');

  // Industry 1: Financial Services
  await prisma.industry.create({
    data: {
      name: 'Financial Services',
      slug: 'financial-services',
      description: 'Transforming financial institutions through digital innovation and risk management',
      overview: 'We help financial services organizations navigate digital transformation, regulatory compliance, and customer experience enhancement while managing risk and driving sustainable growth.',
      challenges: JSON.stringify([]),
      trends: JSON.stringify([]),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      featured: true
    }
  });

  // Industry 2: Technology
  await prisma.industry.create({
    data: {
      name: 'Technology',
      slug: 'technology',
      description: 'Driving innovation through cutting-edge technology solutions',
      overview: 'We partner with technology companies to accelerate innovation, scale operations, and deliver transformative solutions across IoT, AI, embedded systems, and digital platforms.',
      challenges: JSON.stringify([]),
      trends: JSON.stringify([]),
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      featured: true
    }
  });

  // Industry 3: Manufacturing
  await prisma.industry.create({
    data: {
      name: 'Manufacturing',
      slug: 'manufacturing',
      description: 'Modernizing manufacturing through automation and smart technology',
      overview: 'We help manufacturers embrace Industry 4.0 through factory automation, IoT integration, and smart manufacturing solutions that improve efficiency and competitiveness.',
      challenges: JSON.stringify([]),
      trends: JSON.stringify([]),
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      featured: true
    }
  });

  // Industry 4: Energy
  await prisma.industry.create({
    data: {
      name: 'Energy',
      slug: 'energy',
      description: 'Sustainable energy solutions for a cleaner future',
      overview: 'We support energy sector transformation through renewable energy systems, smart grid technology, and innovative energy management solutions.',
      challenges: JSON.stringify([]),
      trends: JSON.stringify([]),
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      featured: true
    }
  });

  // Industry 5: Public Sector
  await prisma.industry.create({
    data: {
      name: 'Public Sector',
      slug: 'public-sector',
      description: 'Enhancing public services through innovation and evidence-based policy',
      overview: 'We work with government and public sector organizations to design and deliver effective policies, programs, and services that improve outcomes for communities.',
      challenges: JSON.stringify([]),
      trends: JSON.stringify([]),
      image: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800',
      featured: true
    }
  });

  // Industry 6: Healthcare
  await prisma.industry.create({
    data: {
      name: 'Healthcare',
      slug: 'healthcare',
      description: 'Transforming healthcare delivery through innovation and technology',
      overview: 'We help healthcare organizations improve patient outcomes, operational efficiency, and service delivery through strategic planning and technology integration.',
      challenges: JSON.stringify([]),
      trends: JSON.stringify([]),
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      featured: false
    }
  });

  // Industry 7: Retail
  await prisma.industry.create({
    data: {
      name: 'Retail',
      slug: 'retail',
      description: 'Reimagining retail experiences in the digital age',
      overview: 'We support retailers in digital transformation, customer experience enhancement, and operational optimization to thrive in evolving markets.',
      challenges: JSON.stringify([]),
      trends: JSON.stringify([]),
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      featured: false
    }
  });

  // Industry 8: Education
  await prisma.industry.create({
    data: {
      name: 'Education',
      slug: 'education',
      description: 'Advancing education through innovation and technology',
      overview: 'We work with educational institutions to enhance learning outcomes, improve operational efficiency, and embrace digital transformation.',
      challenges: JSON.stringify([]),
      trends: JSON.stringify([]),
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      featured: false
    }
  });

  console.log('✅ Industries seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
