import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding industries...');

  // 1. Management Consulting
  await prisma.industry.upsert({
    where: { slug: 'management-consulting' },
    update: {},
    create: {
      name: 'Management Consulting',
      slug: 'management-consulting',
      description: 'Strategic consulting and innovation solutions for business transformation',
      overview: `The management consulting industry is highly popular among top students worldwide, and Japan is no exception. This field is recognized as an attractive first career due to the opportunity to work on diverse projects across various industries.

In recent years, there has been increasing demand for growth strategies, digital transformation (DX), and Environmental, Social, and Governance (ESG) initiatives within Japanese companies. In response, consulting firms are actively hiring to meet these needs.

JACOM provides comprehensive consulting services including strategy & planning, business IT, innovation, investment policy, program management, leadership and corporate governance, risk management, and financial advice.`,
      challenges: `• Acceleration of Digital Transformation
• ESG and Sustainability initiatives
• Global Expansion and Regional Specialization
• Impact of Generative AI on consulting workflows
• Credit risk and market risk management
• Operational and governance risk
• Compliance and regulatory requirements`,
      trends: `• Strategy & Planning for business growth
• Digital transformation and AI integration
• ESG (Environmental, Social, and Governance) consulting
• Risk management and compliance
• Leadership and corporate governance
• Market size reached approximately 2 trillion yen in Japan
• Expected annual growth rate of around 3.5%
• Tax Management and Insurance services
• Asset Management and Banking services`,
      featured: true
    }
  });

  // 2. Technology & IoT Solutions
  await prisma.industry.upsert({
    where: { slug: 'technology-iot-solutions' },
    update: {},
    create: {
      name: 'Technology & IoT Solutions',
      slug: 'technology-iot-solutions',
      description: 'IoT platform solutions, embedded systems, and smart technology integration',
      overview: `JACOM provides novel communication platform solutions by turning all devices into social infrastructure through digital transformation. We specialize in IoT, embedded systems, control automation, and smart technology integration.

Our expertise includes sensors, actuators, IoT, robots, machines, communications, electricity, electronics, computer architecture, and system control. We design systems that make all devices into social infrastructure through industrial standardization.

JACOME as a New IoT Ecommerce Platform - providing product and services as a special electromechanical system integration service.`,
      challenges: `• System integration for factory automation
• IoT device solutions and terminal development
• Security hardware and software for access control
• Embedded system hardware to web applications
• Autonomous driving robots and control systems
• VPP and EMS systems for energy management
• Standardization of products as secured IoT Software Application
• Integration of end user's Systems data`,
      trends: `• Research and development of embedded information systems
• IoT terminal solutions for smart devices
• AI and machine learning integration
• Cloud computing and platform services
• Smart factory equipment design
• Smart city facility design and development
• Communication platform systems using AI and IoT
• New solution proposals for consumers and smart device makers
• Platform Infrastructure as valuable low cost system integration`,
      featured: true
    }
  });

  // 3. Hospitality & Tourism
  await prisma.industry.upsert({
    where: { slug: 'hospitality-tourism' },
    update: {},
    create: {
      name: 'Hospitality & Tourism',
      slug: 'hospitality-tourism',
      description: 'Recruitment and training services for hospitality professionals',
      overview: `Partnership for recruitment and training services specializing in Nepal to Japan recruitment for hospitality professionals including hotel services, culinary arts, and tourism management.

We provide comprehensive recruitment solutions including sourcing, screening, pre-departure training, visa sponsorship, and onboarding support. Our services cover hotel services, culinary training, and specialized hospitality roles.

Cooking training programs with expert instructors, including 8-day intensive courses with daily allowances for overseas lecturers, teaching materials, and recipes.`,
      challenges: `• Sourcing and screening qualified hospitality candidates
• Pre-departure training including Japanese language (JLPT N3 & N4)
• Cultural orientation on Japanese customs and work ethics
• Industry-specific culinary and hospitality skills training
• Visa application and deployment documentation
• Accommodation arrangements and onboarding
• Hotel Services recruitment (Cooks, Chefs, Receptionists, Housekeeping, Hotel Management)`,
      trends: `• Cooking training lessons (16 lessons over 8 days)
• Professional chef development programs
• Japanese hospitality standards training
• Cultural adaptation programs
• 30% replacement guarantee within first month
• Partnership with Al Saheli Manpower and Grand Global Pvt. Ltd.
• Comprehensive pre-departure orientation
• Food costs, equipment, and venue management`,
      featured: true
    }
  });

  // 4. IT Services & Software Development
  await prisma.industry.upsert({
    where: { slug: 'it-services-software-development' },
    update: {},
    create: {
      name: 'IT Services & Software Development',
      slug: 'it-services-software-development',
      description: 'Comprehensive IT services, software development, and technical training',
      overview: `Professional IT services including software development, web development training, and technical consulting. We offer comprehensive education programs covering HTML, CSS, JavaScript, React, Node.js, and modern web technologies.

Our curriculum includes building static websites, learning coding fundamentals, mastering latest web development technologies, and deploying production-ready applications.

We are looking for programmers with skills in C, C++, Python, Java, database management (SQL, Windows, Linux), and interest in IoT, embedded systems, and robot control system development.`,
      challenges: `• Building static websites using HTML & CSS
• Learning coding with JavaScript fundamentals
• Mastering React, Node.js, and Express
• Responsive website development with Bootstrap
• Media queries and mobile-first design
• Deployment and launching websites
• Database management and system architecture
• Reading and understanding requirements definition documents`,
      trends: `• Online live sessions and recorded courses
• Face-to-face training programs
• Web development bootcamps
• Phase-based learning approach
• VS Code editor and Chrome Developer Tools
• DNS configurations and deployment
• Latest JavaScript syntax (ES6+)
• React library for dynamic applications
• npm and modern development workflows`,
      featured: true
    }
  });

  // 5. Manufacturing & Industry 4.0
  await prisma.industry.upsert({
    where: { slug: 'manufacturing-industry-4' },
    update: {},
    create: {
      name: 'Manufacturing & Industry 4.0',
      slug: 'manufacturing-industry-4',
      description: 'Smart factory automation and Industry 4.0 transformation solutions',
      overview: `System design and development for factory automation, smart manufacturing, and Industry 4.0 transformation. We provide comprehensive solutions for automating manufacturing processes and integrating IoT devices.

Our services include designing control systems, developing automation software, implementing smart factory equipment, and providing technical consulting for manufacturing digitalization.

We support digitalization and industrialization of multi-systems through domestic and overseas partnerships.`,
      challenges: `• Factory automation system design and development
• Smart factory equipment design
• Control automation for robots and machinery
• System integration design
• Production management and quality control
• Mechanical design and engineering
• IoT application development for manufacturing
• Physical system design for industrial facilities`,
      trends: `• Industry 4.0 transformation
• Smart manufacturing solutions
• Automation and robotics integration
• Real-time monitoring systems
• Predictive maintenance
• Digital twin technology
• Supply chain optimization
• Quality assurance automation`,
      featured: false
    }
  });

  // 6. Education & Training
  await prisma.industry.upsert({
    where: { slug: 'education-training' },
    update: {},
    create: {
      name: 'Education & Training',
      slug: 'education-training',
      description: 'Professional development programs and customized training solutions',
      overview: `Comprehensive education and training programs designed to empower individuals with cutting-edge skills in technology, business, and professional development.

We offer executive coaching, integrated coaching, team coaching, and virtual coaching programs. Our training includes online live sessions, recorded courses, and face-to-face instruction.

Customized training for career development with focus on ICT and digital literacy improvement, particularly in less developing countries.`,
      challenges: `• Executive Coaching and Leadership Development
• Integrated Coaching for career growth
• Team Coaching for organizational excellence
• Virtual Coaching and remote learning
• Customized training for career development
• ICT and digital literacy improvement
• Basic computer skills training
• Professional certification programs`,
      trends: `• Online live sessions and recorded courses
• Blended learning approaches
• Microlearning and bite-sized content
• Gamification in training
• Mobile learning platforms
• AI-powered personalized learning
• Virtual reality training simulations
• Continuous professional development`,
      featured: false
    }
  });

  // 7. Energy & Utilities
  await prisma.industry.upsert({
    where: { slug: 'energy-utilities' },
    update: {},
    create: {
      name: 'Energy & Utilities',
      slug: 'energy-utilities',
      description: 'Renewable energy systems, VPP, EMS, and utility infrastructure solutions',
      overview: `Innovative energy solutions focusing on renewable energy, Virtual Power Plants (VPP), Energy Management Systems (EMS), and sustainable infrastructure development.

We design and develop control systems for renewable energy, including solar power generation, wind power generation, and electric power generation equipment with integrated software solutions.

Electrical work including solar power generation equipment design, wind power generation equipment design, electric power generation equipment design & software development.`,
      challenges: `• Development of remote monitoring systems for renewable energy
• Control system design for energy infrastructure
• VPP (Virtual Power Plant) system innovation
• EMS (Energy Management System) development
• Integration of EV systems with power companies
• Energy system design and business model consulting
• Utility system design (electricity, gas, water)
• National grid infrastructure design`,
      trends: `• Solar power generation equipment design
• Wind power generation equipment design
• Electric power generation equipment and software
• VPP and EMS systems research and development
• EV integration with energy systems
• Smart grid and utility system design
• Sustainable energy infrastructure
• Real estate equipment construction (electrical, gas, water)
• Access control and security surveillance systems`,
      featured: false
    }
  });

  // 8. Real Estate & Infrastructure
  await prisma.industry.upsert({
    where: { slug: 'real-estate-infrastructure' },
    update: {},
    create: {
      name: 'Real Estate & Infrastructure',
      slug: 'real-estate-infrastructure',
      description: 'Infrastructure development, real estate systems, and facility management',
      overview: `Comprehensive real estate and infrastructure solutions including equipment construction, facility management systems, and smart building integration.

Real estate equipment construction including electrical equipment design, gas equipment design, water equipment design, access control/security surveillance camera equipment design & software development.

Physical system design for hotels, homes, hospitals, telecommunications, and education facilities with integrated IoT and automation systems.`,
      challenges: `• Real estate equipment construction
• Electrical equipment design and installation
• Gas equipment design and management
• Water equipment design and distribution
• Access control and security systems
• Security surveillance camera equipment design
• Smart building automation
• Facility management systems`,
      trends: `• Smart building technology
• IoT-enabled facility management
• Energy-efficient infrastructure
• Integrated security systems
• Building automation systems
• Sustainable construction practices
• Digital twin for buildings
• Predictive maintenance for infrastructure`,
      featured: false
    }
  });

  console.log('Industries seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
