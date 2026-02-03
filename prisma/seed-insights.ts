import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding insights...');

  // Get first expert as author (you may need to adjust this)
  const author = await prisma.expert.findFirst();
  
  if (!author) {
    console.error('No experts found. Please seed experts first.');
    return;
  }

  // Insight 1: Japanese Consulting Market
  await prisma.insight.create({
    data: {
      title: 'The Evolving Japanese Consulting Market and the Impact of Digital Transformation',
      slug: 'japanese-consulting-market-digital-transformation',
      type: 'Article',
      excerpt: 'The management consulting industry is highly popular among top students worldwide, and Japan is no exception. This field is recognized as an attractive first career due to the opportunity to work on diverse projects across various industries.',
      content: 'The management consulting industry is highly popular among top students worldwide, and Japan is no exception. In recent years, there has been increasing demand for growth strategies, digital transformation (DX), and Environmental, Social, and Governance (ESG) initiatives within Japanese companies.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
      authorId: author.id,
      readTime: 15,
      topics: JSON.stringify(['Consulting', 'Career Development', 'Japan Market', 'Digital Transformation', 'DX', 'ESG', 'PMO']),
      regions: JSON.stringify(['Japan', 'Asia']),
      featured: true,
      trending: false,
      gated: false,
      status: 'published',
      publishedAt: new Date()
    }
  });

  // Insight 2: J-Find Visa Guide
  await prisma.insight.create({
    data: {
      title: 'Ultimate Guide to Job Searching with J-Find Visa: Utilizing Jelper Club and More',
      slug: 'j-find-visa-job-search-guide',
      type: 'Guide',
      excerpt: 'The Japanese government has introduced the J-Find (Future Creation Individuals Visa) to attract young, highly skilled professionals. This comprehensive guide covers what steps to take after obtaining a J-Find to secure employment in Japan.',
      content: 'Known as being traditionally cautious about accepting foreign workers, the Japanese government has recently introduced the J-Find (Future Creation Individuals Visa) to attract young, highly skilled professionals.',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      authorId: author.id,
      readTime: 20,
      topics: JSON.stringify(['Career', 'Japan', 'Visa', 'Job Search', 'Immigration', 'Employment']),
      regions: JSON.stringify(['Japan', 'Asia']),
      featured: true,
      trending: false,
      gated: false,
      status: 'published',
      publishedAt: new Date()
    }
  });

  // Insight 3: Digital Financial Inclusion
  await prisma.insight.create({
    data: {
      title: 'Digital Financial Inclusion or Expanding Financial Abuse Online?',
      slug: 'digital-financial-inclusion-abuse-online',
      type: 'Article',
      excerpt: 'As we interact more with AI-backed online services, digital financial services must develop with end users in mind who could be exposed to fraud and abuse.',
      content: 'As we interact more and more with Artificial Intelligence backed online every day, digital financial services are expected to develop their services with the end user in mind who could potentially be exposed and be prone to abusive domestic, fraud and other harms.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
      authorId: author.id,
      readTime: 8,
      topics: JSON.stringify(['FinTech', 'AI', 'Financial Security', 'Digital Inclusion', 'Consumer Protection']),
      regions: JSON.stringify(['Global']),
      downloadUrl: 'https://www.powertopersuade.org.au/blog/digital-financial-inclusion-or-expanding-financial-abuse-online/14/8/2019',
      featured: false,
      trending: true,
      gated: false,
      status: 'published',
      publishedAt: new Date()
    }
  });

  // Insight 4: Blockchain in Public Sector
  await prisma.insight.create({
    data: {
      title: 'Blockchain Applications in the Public Sector: Transparency, Security, and Integrity',
      slug: 'blockchain-public-sector-applications',
      type: 'Research',
      excerpt: 'Blockchain is finding adoption in the public sector with versatile uses across domains including real estate, digital identity, infrastructure management, and smart contracts.',
      content: 'Blockchain has become the buzz word as it is finding adoption and use in the public sector with versatile uses across several domains and the further potential increase in uses fulfilling government\'s transparency, security, and integrity in the long term.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      authorId: author.id,
      readTime: 12,
      topics: JSON.stringify(['Blockchain', 'Public Sector', 'Government Technology', 'Smart Contracts', 'Digital Identity']),
      regions: JSON.stringify(['Global']),
      downloadUrl: 'https://link.springer.com/chapter/10.1007/978-981-19-8730-4_4',
      featured: true,
      trending: true,
      gated: false,
      status: 'published',
      publishedAt: new Date()
    }
  });

  // Insight 5: Blockchain for SDGs
  await prisma.insight.create({
    data: {
      title: 'Blockchain\'s Role in Achieving Sustainable Development Goals in the Global South',
      slug: 'blockchain-sdgs-global-south',
      type: 'Research',
      excerpt: 'Blockchain can play a key role in achieving SDGs in the Global South. The untapped potential in sustainable energy and integrity verification is promising.',
      content: 'Blockchain can play a key role in the achievement of Sustainable Development Goals (SDGs) in the Global South without any doubt as blockchain based tech expands in many areas of life.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
      authorId: author.id,
      readTime: 15,
      topics: JSON.stringify(['Blockchain', 'SDGs', 'Sustainable Development', 'Global South', 'Energy']),
      regions: JSON.stringify(['Africa', 'Asia', 'Latin America']),
      downloadUrl: 'https://www.sciencedirect.com/science/article/pii/S0040162523001312',
      featured: true,
      trending: false,
      gated: false,
      status: 'published',
      publishedAt: new Date()
    }
  });

  // Insight 6: Blockchain in IoT & Smart Grids
  await prisma.insight.create({
    data: {
      title: 'Blockchain Technology in Wireless Networks, IoT, and Smart Grids: A Survey',
      slug: 'blockchain-iot-smart-grids-survey',
      type: 'Research',
      excerpt: 'Blockchain technology\'s evaluative use in Wireless Networks, IoT, and Smart Grids is explored in this survey study, examining current challenges and future research directions.',
      content: 'As blockchain tech makes its way with its fundamental qualities beyond digital currencies as a cutting-edge technology, evaluative use specifically in Wireless Networks, the Internet of Things (IoT), and Smart Grids (SGs) is explored in this survey study.',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800',
      authorId: author.id,
      readTime: 20,
      topics: JSON.stringify(['Blockchain', 'IoT', 'Smart Grids', 'Wireless Networks', 'Energy Management']),
      regions: JSON.stringify(['Global']),
      downloadUrl: 'https://link.springer.com/chapter/10.1007/978-3-031-21101-0_13',
      featured: false,
      trending: true,
      gated: false,
      status: 'published',
      publishedAt: new Date()
    }
  });

  console.log('✅ Insights seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
