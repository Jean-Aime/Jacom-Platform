import { prisma } from './prisma';
import { apiClient } from './api-client';
import { Prisma, Industry, Service, Insight, Expert, Office, Career } from '@prisma/client';

const USE_BACKEND = process.env.NEXT_PUBLIC_USE_BACKEND === 'true';

type IndustryWithRelations = Prisma.IndustryGetPayload<{
  include: { services: true; insights: { include: { author: true } }; experts: true }
}>;

type ServiceWithRelations = Prisma.ServiceGetPayload<{
  include: {
    serviceCapabilities: true;
    serviceProcessSteps: true;
    serviceMetrics: true;
    subServices: true;
    industries: true;
    insights: true;
    experts: true;
  }
}>;

type InsightWithAuthor = Prisma.InsightGetPayload<{
  include: { author: true }
}>;

export const dataFetcher = {
  async getIndustries(): Promise<Industry[]> {
    if (USE_BACKEND) return apiClient.getIndustries() as Promise<Industry[]>;
    return prisma.industry.findMany();
  },

  async getIndustryBySlug(slug: string): Promise<IndustryWithRelations | null> {
    if (USE_BACKEND) return apiClient.getIndustryBySlug(slug) as Promise<IndustryWithRelations | null>;
    return prisma.industry.findUnique({
      where: { slug },
      include: { services: true, insights: { take: 3, include: { author: true }, orderBy: { publishedAt: 'desc' } }, experts: true }
    });
  },

  async getServices(): Promise<Service[]> {
    if (USE_BACKEND) return apiClient.getServices() as Promise<Service[]>;
    return prisma.service.findMany({ where: { status: 'published' } });
  },

  async getServiceBySlug(slug: string): Promise<ServiceWithRelations | null> {
    if (USE_BACKEND) return apiClient.getServiceBySlug(slug) as Promise<ServiceWithRelations | null>;
    return prisma.service.findUnique({
      where: { slug },
      include: {
        serviceCapabilities: { orderBy: { order: 'asc' } },
        serviceProcessSteps: { orderBy: { order: 'asc' } },
        serviceMetrics: { orderBy: { order: 'asc' } },
        subServices: true,
        industries: true,
        insights: { take: 3, orderBy: { publishedAt: 'desc' } },
        experts: true
      }
    });
  },

  async getInsights(): Promise<Insight[]> {
    if (USE_BACKEND) return apiClient.getInsights() as Promise<Insight[]>;
    return prisma.insight.findMany({ where: { status: 'published' }, orderBy: { publishedAt: 'desc' } });
  },

  async getInsightBySlug(slug: string): Promise<InsightWithAuthor | null> {
    if (USE_BACKEND) return apiClient.getInsightBySlug(slug) as Promise<InsightWithAuthor | null>;
    return prisma.insight.findUnique({ where: { slug }, include: { author: true } });
  },

  async getExperts(): Promise<Expert[]> {
    if (USE_BACKEND) return apiClient.getExperts() as Promise<Expert[]>;
    return prisma.expert.findMany();
  },

  async getExpertBySlug(slug: string): Promise<Expert | null> {
    if (USE_BACKEND) return apiClient.getExpertBySlug(slug) as Promise<Expert | null>;
    return prisma.expert.findUnique({ where: { slug } });
  },

  async getOffices(): Promise<Office[]> {
    if (USE_BACKEND) return apiClient.getOffices() as Promise<Office[]>;
    return prisma.office.findMany();
  },

  async getOfficeBySlug(slug: string): Promise<Office | null> {
    if (USE_BACKEND) return apiClient.getOfficeBySlug(slug) as Promise<Office | null>;
    return prisma.office.findUnique({ where: { slug } });
  },

  async getCareers(): Promise<Career[]> {
    if (USE_BACKEND) return apiClient.getCareers() as Promise<Career[]>;
    return prisma.career.findMany();
  },

  async getCareerBySlug(slug: string): Promise<Career | null> {
    if (USE_BACKEND) return apiClient.getCareerBySlug(slug) as Promise<Career | null>;
    return prisma.career.findUnique({ where: { slug } });
  }
};
