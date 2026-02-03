import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding services...');

  // Service 2: Monitoring & Evaluation
  await prisma.service.create({
    data: {
      name: 'Monitoring and Evaluation',
      slug: 'monitoring-evaluation',
      description: 'Demonstrating impact and enabling continuous improvement',
      overview: 'We work with clients to enable them to demonstrate the difference they have made and provide intelligence to inform the continuous improvement of their operations and enhance impact and value for money.',
      methodologies: JSON.stringify([
        'Summative assessments',
        'Formative evaluations',
        'Impact measurement',
        'Theory of change development',
        'Data collection and analysis'
      ]),
      tools: JSON.stringify([
        'Evaluation frameworks',
        'Data analytics platforms',
        'Survey tools',
        'Reporting dashboards'
      ]),
      featured: true
    }
  });

  // Service 3: Business Case Development
  await prisma.service.create({
    data: {
      name: 'Developing Business Cases',
      slug: 'business-case-development',
      description: 'Intelligence and insight for informed investment decisions',
      overview: 'We work closely with clients to provide intelligence and insight to enable them to make informed investment decisions. Services range from market research to feasibility testing and social and economic impact assessments.',
      methodologies: JSON.stringify([
        'Market research',
        'Feasibility studies',
        'Cost-benefit analysis',
        'Social return on investment',
        'Economic impact modeling'
      ]),
      tools: JSON.stringify([
        'Financial modeling software',
        'Market analysis tools',
        'Impact assessment frameworks',
        'Risk analysis matrices'
      ]),
      featured: true
    }
  });

  // Service 4: Securing Funding
  await prisma.service.create({
    data: {
      name: 'Securing Funding',
      slug: 'securing-funding',
      description: 'Successfully securing funding through competitive processes',
      overview: 'We help clients successfully secure funding through competitive processes within an increasingly challenging environment. We understand funder requirements and have a proven track record of developing successful bids.',
      methodologies: JSON.stringify([
        'Opportunity identification',
        'Bid development',
        'Proposal writing',
        'Funder relationship management',
        'Grant application support'
      ]),
      tools: JSON.stringify([
        'Funding databases',
        'Proposal templates',
        'Budget planning tools',
        'Compliance checklists'
      ]),
      featured: false
    }
  });

  // Service 5: IoT Platform Solutions
  await prisma.service.create({
    data: {
      name: 'IoT Platform Solutions',
      slug: 'iot-platform-solutions',
      description: 'Industrial standardization using AI and IoT technology',
      overview: 'We consider customer\'s problems and provide platform services using a wide range of technologies. Our collaboration supports digitalization and industrialization of multi-systems.',
      methodologies: JSON.stringify([
        'System integration design',
        'IoT terminal development',
        'Communication platform design',
        'Industrial standardization',
        'End-user data integration'
      ]),
      tools: JSON.stringify([
        'AI & Machine Learning',
        'IoT Software Applications',
        'Cloud Integration Platforms',
        'Embedded Systems',
        'Communication Protocols'
      ]),
      featured: true
    }
  });

  // Service 6: Embedded Systems Development
  await prisma.service.create({
    data: {
      name: 'Embedded Systems Development',
      slug: 'embedded-systems-development',
      description: 'Research and development of embedded information systems',
      overview: 'We provide comprehensive embedded system solutions from hardware design to software development, including control systems, automation, and IoT device integration.',
      methodologies: JSON.stringify([
        'Hardware design',
        'Firmware development',
        'System architecture',
        'Real-time operating systems',
        'Device driver development'
      ]),
      tools: JSON.stringify([
        'C/C++ Programming',
        'Python',
        'Microcontroller platforms',
        'RTOS',
        'Debugging tools'
      ]),
      featured: false
    }
  });

  // Service 7: Factory Automation
  await prisma.service.create({
    data: {
      name: 'Factory Automation',
      slug: 'factory-automation',
      description: 'System design and development for factory automation',
      overview: 'We design and develop automation systems for factories, including robotics, control systems, and IoT integration to improve efficiency and productivity.',
      methodologies: JSON.stringify([
        'Process automation design',
        'Robot control systems',
        'PLC programming',
        'SCADA systems',
        'Production line optimization'
      ]),
      tools: JSON.stringify([
        'Industrial robots',
        'PLCs and controllers',
        'IoT sensors',
        'Machine vision systems',
        'Automation software'
      ]),
      featured: false
    }
  });

  // Service 8: Renewable Energy Systems
  await prisma.service.create({
    data: {
      name: 'Renewable Energy Systems',
      slug: 'renewable-energy-systems',
      description: 'Design and development of renewable energy solutions',
      overview: 'We provide comprehensive solutions for renewable energy systems including solar, wind, and EV integration with smart grid technology and remote monitoring capabilities.',
      methodologies: JSON.stringify([
        'Energy system design',
        'Remote monitoring development',
        'VPP and EMS systems',
        'Grid integration',
        'Energy management optimization'
      ]),
      tools: JSON.stringify([
        'Solar power systems',
        'Wind power systems',
        'EV charging infrastructure',
        'Smart grid technology',
        'Energy monitoring platforms'
      ]),
      featured: true
    }
  });

  // Service 9: Training & Coaching
  await prisma.service.create({
    data: {
      name: 'Training & Coaching',
      slug: 'training-coaching',
      description: 'Customized training for career development and business growth',
      overview: 'We provide comprehensive training and coaching services including executive coaching, team coaching, and technical training programs delivered through online and face-to-face sessions.',
      methodologies: JSON.stringify([
        'Executive coaching',
        'Integrated coaching',
        'Team coaching',
        'Virtual coaching',
        'Competency-based training'
      ]),
      tools: JSON.stringify([
        'Online learning platforms',
        'Video conferencing',
        'Learning management systems',
        'Assessment tools',
        'Progress tracking'
      ]),
      featured: false
    }
  });

  console.log('✅ Services seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
