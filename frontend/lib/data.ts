import { Industry, Service, Insight, Expert, Office, Career, MediaItem } from './types';

// Mock data service - In production, this would connect to your CMS/Database
export class DataService {
  static async getIndustries(): Promise<Industry[]> {
    return [
      {
        id: '1',
        name: 'Healthcare & Life Sciences',
        slug: 'healthcare-life-sciences',
        description: 'Transforming healthcare delivery and life sciences innovation',
        overview: 'We help healthcare organizations and life sciences companies navigate complex challenges...',
        challenges: ['Digital transformation', 'Regulatory compliance', 'Cost optimization'],
        trends: ['AI in diagnostics', 'Personalized medicine', 'Value-based care'],
        services: ['digital-health', 'regulatory-strategy', 'operations-excellence'],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['North America', 'Europe', 'Asia Pacific'],
        featured: true,
        image: '/images/industries/healthcare.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Financial Services',
        slug: 'financial-services',
        description: 'Driving innovation in banking, insurance, and capital markets',
        overview: 'We partner with financial institutions to accelerate digital transformation...',
        challenges: ['Regulatory change', 'Digital disruption', 'Customer expectations'],
        trends: ['Open banking', 'Embedded finance', 'ESG investing'],
        services: ['digital-banking', 'risk-management', 'customer-experience'],
        caseStudies: [],
        insights: [],
        experts: [],
        regions: ['Global'],
        featured: true,
        image: '/images/industries/financial.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  static async getServices(): Promise<Service[]> {
    return [
      {
        id: '1',
        name: 'Digital Transformation',
        slug: 'digital-transformation',
        description: 'End-to-end digital transformation for modern enterprises',
        overview: 'We help organizations reimagine their business models...',
        subServices: [
          { id: '1', name: 'Digital Strategy', description: 'Strategic roadmap development', parentService: '1' },
          { id: '2', name: 'Technology Implementation', description: 'Platform deployment', parentService: '1' }
        ],
        methodologies: ['Agile transformation', 'Design thinking', 'Lean startup'],
        tools: ['Cloud platforms', 'AI/ML frameworks', 'Analytics tools'],
        industries: ['healthcare-life-sciences', 'financial-services'],
        insights: [],
        experts: [],
        results: [],
        featured: true,
        image: '/images/services/digital.jpg',
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