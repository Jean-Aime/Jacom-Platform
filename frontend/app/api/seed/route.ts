import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  return seedData();
}

export async function GET() {
  return seedData();
}

async function seedData() {
  try {
    console.log('Seeding case studies...');

    // First, ensure we have an author (expert)
    const author = await prisma.expert.upsert({
      where: { slug: 'jacom-team' },
      update: {},
      create: {
        name: 'JACOM Team',
        slug: 'jacom-team',
        role: 'Consulting Team',
        bio: 'JACOM consulting team delivering innovative solutions across industries',
        expertise: 'Digital Transformation, AI, IoT, Business Strategy',
        locations: 'Global'
      }
    });

    // Case Study 1: Banca Investis
    await prisma.insight.upsert({
      where: { slug: 'banca-investis-ai-transformation' },
      update: {},
      create: {
        title: 'Banca Investis Transforms Customer Dialogue with AI',
        slug: 'banca-investis-ai-transformation',
        type: 'Case Study',
        excerpt: 'How Banca Investis revolutionized customer service with AI-powered solutions, achieving 500+ internal employees adoption in just 7 months.',
        content: `# Banca Investis Transforms Customer Dialogue with AI

## The Challenge
Banca Investis, a leading Italian investment bank, faced increasing customer service demands while maintaining personalized, high-quality interactions.

## Our Approach
JACOM partnered with Banca Investis to implement a comprehensive AI-powered customer dialogue system.

## The Results
- **500+** internal employees successfully using the tool
- **7 months** from ideation to full launch
- **40%** reduction in response time
- **85%** customer satisfaction improvement`,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
        readTime: 8,
        status: 'published',
        featured: true,
        authorId: author.id,
        topics: JSON.stringify(['AI', 'Digital Transformation', 'Banking']),
        regions: JSON.stringify(['Europe', 'Italy'])
      }
    });

    // Case Study 2: Social Innovation
    await prisma.insight.upsert({
      where: { slug: 'social-innovation-asia-africa' },
      update: {},
      create: {
        title: 'Social Innovation & Economic Development Across Asia & Africa',
        slug: 'social-innovation-asia-africa',
        type: 'Case Study',
        excerpt: 'Our global impact across Asia and Africa, delivering 3+ years of research and consultancy across 2 continents.',
        content: `# Social Innovation & Economic Development

## Our Mission
JACOM has been at the forefront of social innovation and economic development across Asia and Africa.

## Results
- **3+ years** of continuous operations
- **2 continents** with active programs
- **1000+ individuals** directly impacted`,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
        readTime: 10,
        status: 'published',
        featured: true,
        authorId: author.id,
        topics: JSON.stringify(['Social Innovation', 'Economic Development']),
        regions: JSON.stringify(['Asia', 'Africa'])
      }
    });

    // Case Study 3: Digital Transformation
    await prisma.insight.upsert({
      where: { slug: 'digital-transformation-smart-technology' },
      update: {},
      create: {
        title: 'Digital Transformation Solutions for Smart Technology',
        slug: 'digital-transformation-smart-technology',
        type: 'Case Study',
        excerpt: 'Innovation at scale: 100+ IoT & AI projects completed across 5 countries with active operations.',
        content: `# Digital Transformation Solutions

## Our Expertise
JACOM delivers cutting-edge IoT and AI solutions across multiple industries.

## Results
- **100+** IoT & AI projects completed
- **5 countries** with active operations
- **$10M+** in value created`,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
        readTime: 12,
        status: 'published',
        featured: true,
        authorId: author.id,
        topics: JSON.stringify(['Digital Transformation', 'IoT', 'AI']),
        regions: JSON.stringify(['Global'])
      }
    });

    // Case Study 4: Training & Development
    await prisma.insight.upsert({
      where: { slug: 'empowering-communities-training-development' },
      update: {},
      create: {
        title: 'Empowering Communities Through Training & Development',
        slug: 'empowering-communities-training-development',
        type: 'Case Study',
        excerpt: 'Building tomorrow\'s leaders: 1000+ professionals trained globally through 15+ specialized training programs.',
        content: `# Empowering Communities Through Training

## Our Programs
Comprehensive training programs designed to empower individuals and communities.

## Results
- **1000+** professionals trained globally
- **15+** specialized training programs
- **85%** job placement rate`,
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
        readTime: 15,
        status: 'published',
        featured: true,
        authorId: author.id,
        topics: JSON.stringify(['Training', 'Education', 'Professional Development']),
        regions: JSON.stringify(['Global'])
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Case studies seeded successfully!' 
    });

  } catch (error: any) {
    console.error('Error seeding case studies:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}