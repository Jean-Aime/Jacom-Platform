import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding experts...');

  // Expert 1: Alastair
  await prisma.expert.create({
    data: {
      name: 'Alastair',
      slug: 'alastair',
      role: 'Senior Consultant - Economic Development',
      bio: 'A highly experienced consultant with over 30 years\' experience in research and project management. He has been involved in many different projects for a large number of clients from the European Commission to community groups.',
      expertise: JSON.stringify([
        'Economic impact assessments',
        'Social return on investment',
        'Project development',
        'Strategic economic planning',
        'Policy analysis',
        'Infrastructure development'
      ]),
      locations: JSON.stringify(['United Kingdom', 'Europe']),
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      email: 'alastair@jas.com',
      linkedin: '',
      featured: true
    }
  });

  // Expert 2: Liam
  await prisma.expert.create({
    data: {
      name: 'Liam',
      slug: 'liam',
      role: 'Evaluation Specialist',
      bio: 'An expert in monitoring and evaluation with extensive experience in designing and delivering evaluations across a wide range of areas, including complex multi-partner projects. Specializes in quantitative research and data analysis.',
      expertise: JSON.stringify([
        'Monitoring and evaluation',
        'Quantitative research',
        'Data analysis',
        'Consultation processes',
        'Partnership development',
        'Organizational development'
      ]),
      locations: JSON.stringify(['United Kingdom', 'Europe']),
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      email: 'liam@jas.com',
      linkedin: '',
      featured: true
    }
  });

  // Expert 3: Abraha Desale Tesfamariam
  await prisma.expert.create({
    data: {
      name: 'Abraha Desale Tesfamariam',
      slug: 'abraha-desale-tesfamariam',
      role: 'CEO & Founder',
      bio: 'Graduated from Waseda University International Relations (2018) and Ashikaga Institute of Technology with a Master\'s in Information and Industrial Engineering (2017). Extensive experience as a system engineer specializing in IoT, AI, embedded systems, and industrial automation.',
      expertise: JSON.stringify([
        'IoT & AI',
        'System Engineering',
        'Embedded Systems',
        'Industrial Automation',
        'Smart Factory Design',
        'Renewable Energy Systems',
        'Robot Control Systems'
      ]),
      locations: JSON.stringify(['Tokyo', 'Japan']),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      email: 'abraha@jas.com',
      linkedin: '',
      featured: true
    }
  });

  console.log('✅ Experts seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
