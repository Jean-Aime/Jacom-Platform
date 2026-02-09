import { Industry, Service, Insight, Expert, Office, Career, MediaItem } from './types';

// Mock data service - In production, this would connect to your CMS/Database
export class DataService {
  static async getIndustries(): Promise<Industry[]> {
    return [
      {
        id: 'ind1',
        name: 'Management Consulting',
        slug: 'management-consulting',
        description: 'Strategic consulting for digital transformation and business growth in Japan',
        overview: 'JACOM provides comprehensive management consulting services focusing on digital transformation (DX), ESG initiatives, and PMO services.',
        challenges: ['Digital transformation adoption', 'ESG compliance', 'Project management efficiency'],
        trends: ['AI-driven consulting', 'Sustainability focus', 'Remote consulting models'],
        services: [],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['Japan', 'Asia Pacific'],
        featured: true,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ind2',
        name: 'Technology & IoT Solutions',
        slug: 'technology-iot',
        description: 'IoT platform and electromechanical system integration services',
        overview: 'JACOM specializes in IoT e-commerce platforms and electromechanical system integration.',
        challenges: ['System integration complexity', 'IoT security', 'Device interoperability'],
        trends: ['Smart device proliferation', 'Edge computing', '5G connectivity'],
        services: [],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['Global'],
        featured: true,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ind3',
        name: 'Hospitality & Tourism',
        slug: 'hospitality-tourism',
        description: 'Recruitment and training services for hospitality professionals',
        overview: 'Through our partnership with Nepal recruitment agencies, JACOM facilitates deployment of qualified hospitality professionals to Japan.',
        challenges: ['Skilled labor shortage', 'Cultural adaptation', 'Language barriers'],
        trends: ['International workforce mobility', 'Digital hospitality services'],
        services: [],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['Japan', 'Nepal'],
        featured: true,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ind4',
        name: 'IT Services & Software Development',
        slug: 'it-services',
        description: 'Software development and IT professional recruitment',
        overview: 'JACOM connects IT professionals with opportunities in Japan, supporting J-Find visa holders.',
        challenges: ['Tech talent shortage', 'Rapid technology evolution'],
        trends: ['AI and machine learning', 'Cloud-first strategies'],
        services: [],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['Japan'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ind5',
        name: 'Manufacturing & Industry 4.0',
        slug: 'manufacturing',
        description: 'Smart factory solutions and industrial automation',
        overview: 'JACOM delivers Industry 4.0 transformation through IoT integration and smart factory design.',
        challenges: ['Supply chain disruptions', 'Automation costs'],
        trends: ['Smart factories', 'Digital twins', 'Predictive maintenance'],
        services: [],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['Global'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ind6',
        name: 'Education & Training',
        slug: 'education-training',
        description: 'Professional development and technical training programs',
        overview: 'JACOM offers customized training programs including web development bootcamps and professional certifications.',
        challenges: ['Digital literacy gaps', 'Curriculum relevance'],
        trends: ['EdTech platforms', 'Hybrid learning models'],
        services: [],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['Global'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ind7',
        name: 'Energy & Utilities',
        slug: 'energy-utilities',
        description: 'Renewable energy systems and smart grid solutions',
        overview: 'JACOM provides renewable energy consulting including solar and wind power generation equipment design.',
        challenges: ['Grid modernization', 'Renewable integration'],
        trends: ['Clean energy transition', 'Smart grids'],
        services: [],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['Global'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ind8',
        name: 'Real Estate & Infrastructure',
        slug: 'real-estate-infrastructure',
        description: 'Smart building systems and infrastructure development',
        overview: 'JACOM designs intelligent building systems including access control and security surveillance.',
        challenges: ['Aging infrastructure', 'Smart building integration'],
        trends: ['Smart buildings', 'Green construction'],
        services: [],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['Japan'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ind9',
        name: 'Financial Services & Investment',
        slug: 'financial-services',
        description: 'Financial advisory and investment consulting',
        overview: 'JACOM offers financial consulting services including tax management and asset management.',
        challenges: ['Regulatory complexity', 'Market volatility'],
        trends: ['Fintech innovation', 'ESG investing'],
        services: [],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['Global'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  static async getServices(): Promise<Service[]> {
    return [
      {
        id: 'srv1',
        name: 'Digital Transformation & DX Consulting',
        slug: 'digital-transformation',
        description: 'Comprehensive DX strategy and implementation for Japanese enterprises',
        overview: 'JACOM provides end-to-end digital transformation consulting focusing on AI, IoT, and generative AI integration.',
        subServices: [],
        methodologies: ['Agile transformation', 'Design thinking', 'Lean methodology'],
        tools: ['AI/ML platforms', 'IoT systems', 'Cloud infrastructure'],
        industries: [],
        insights: [],
        experts: [],
        results: [],
        featured: true,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'srv2',
        name: 'IoT Platform & System Integration',
        slug: 'iot-platform',
        description: 'IoT e-commerce platform and electromechanical system integration',
        overview: 'Specialized IoT platform development and system integration services.',
        subServices: [],
        methodologies: ['System architecture design', 'API integration'],
        tools: ['IoT sensors', 'Edge computing', '5G networks'],
        industries: [],
        insights: [],
        experts: [],
        results: [],
        featured: true,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'srv3',
        name: 'Recruitment & Training Services',
        slug: 'recruitment-training',
        description: 'International workforce recruitment and professional training programs',
        overview: 'Comprehensive recruitment services connecting Nepal and Japan.',
        subServices: [],
        methodologies: ['Candidate screening', 'Skills assessment'],
        tools: ['JLPT preparation', 'Technical training platforms'],
        industries: [],
        insights: [],
        experts: [],
        results: [],
        featured: true,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'srv4',
        name: 'Smart Factory & Industry 4.0',
        slug: 'smart-factory',
        description: 'Industrial automation and smart manufacturing solutions',
        overview: 'Design and implementation of smart factory systems.',
        subServices: [],
        methodologies: ['Factory automation', 'Process optimization'],
        tools: ['Industrial IoT', 'Robotics'],
        industries: [],
        insights: [],
        experts: [],
        results: [],
        featured: false,
        image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'srv5',
        name: 'Renewable Energy Systems',
        slug: 'renewable-energy',
        description: 'Solar, wind power generation and smart grid solutions',
        overview: 'Renewable energy consulting including equipment design.',
        subServices: [],
        methodologies: ['Energy assessment', 'System design'],
        tools: ['Solar PV systems', 'Wind turbines'],
        industries: [],
        insights: [],
        experts: [],
        results: [],
        featured: false,
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  static async getInsights(): Promise<Insight[]> {
    return [
      {
        id: '1',
        title: 'The Future of Healthcare AI',
        slug: 'future-healthcare-ai',
        type: 'article',
        content: 'Artificial intelligence is revolutionizing healthcare...',
        excerpt: 'How AI is transforming patient care and operational efficiency',
        author: {
          id: '1',
          name: 'Dr. Sarah Johnson',
          slug: 'sarah-johnson',
          role: 'Partner, Healthcare Practice',
          bio: 'Leading healthcare transformation expert',
          expertise: ['Digital health', 'AI in healthcare'],
          industries: ['healthcare-life-sciences'],
          services: ['digital-transformation'],
          insights: ['1'],
          locations: ['New York'],
          image: '/images/experts/sarah-johnson.jpg',
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        industries: ['healthcare-life-sciences'],
        services: ['digital-transformation'],
        topics: ['AI', 'Healthcare', 'Innovation'],
        regions: ['Global'],
        featured: true,
        trending: true,
        gated: false,
        image: '/images/insights/healthcare-ai.jpg',
        readTime: 8,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  static async getExperts(): Promise<Expert[]> {
    return [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        slug: 'sarah-johnson',
        role: 'Partner, Healthcare Practice',
        bio: 'Dr. Johnson leads our healthcare transformation practice with 15+ years of experience...',
        expertise: ['Digital health', 'AI in healthcare', 'Regulatory strategy'],
        industries: ['healthcare-life-sciences'],
        services: ['digital-transformation'],
        insights: ['1'],
        locations: ['New York', 'Boston'],
        image: '/images/experts/sarah-johnson.jpg',
        email: 'sarah.johnson@company.com',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  static async getOffices(): Promise<Office[]> {
    return [
      {
        id: '1',
        name: 'New York',
        slug: 'new-york',
        region: 'North America',
        country: 'United States',
        city: 'New York',
        address: '200 West Street, New York, NY 10013',
        phone: '+1 212 555 0100',
        email: 'newyork@company.com',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        leadership: [],
        insights: [],
        careers: [],
        image: '/images/offices/new-york.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  static async getCareers(): Promise<Career[]> {
    return [
      {
        id: '1',
        title: 'Senior Consultant - Healthcare',
        slug: 'senior-consultant-healthcare',
        department: 'Healthcare Practice',
        location: 'New York',
        type: 'full-time',
        experience: 'mid',
        description: 'Join our healthcare practice to drive transformation...',
        requirements: ['MBA or equivalent', '3-5 years consulting experience'],
        benefits: ['Competitive salary', 'Health insurance', 'Professional development'],
        applicationUrl: '/careers/apply/1',
        featured: true,
        publishedAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  static async getMediaItems(): Promise<MediaItem[]> {
    return [
      {
        id: '1',
        title: 'Company Announces New Healthcare AI Partnership',
        slug: 'healthcare-ai-partnership',
        type: 'press-release',
        content: 'We are excited to announce our strategic partnership...',
        excerpt: 'Strategic partnership to accelerate AI adoption in healthcare',
        publishedAt: new Date(),
        featured: true,
        image: '/images/media/ai-partnership.jpg',
        attachments: ['/downloads/press-release-ai-partnership.pdf'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  // Search functionality
  static async search(query: string, filters?: {
    type?: string;
    industry?: string;
    service?: string;
    region?: string;
  }) {
    // In production, this would use Elasticsearch or similar
    const allContent = [
      ...(await this.getIndustries()).map(item => ({
        id: item.id,
        title: item.name,
        type: 'industry' as const,
        url: `/industries/${item.slug}`,
        excerpt: item.description,
        image: item.image,
        relevance: 1
      })),
      ...(await this.getServices()).map(item => ({
        id: item.id,
        title: item.name,
        type: 'service' as const,
        url: `/services/${item.slug}`,
        excerpt: item.description,
        image: item.image,
        relevance: 1
      })),
      ...(await this.getInsights()).map(item => ({
        id: item.id,
        title: item.title,
        type: 'insight' as const,
        url: `/insights/${item.slug}`,
        excerpt: item.excerpt,
        image: item.image,
        relevance: 1
      }))
    ];

    return allContent.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }
}