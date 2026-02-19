import { prisma } from './prisma';
import { apiClient } from './api-client';

const USE_BACKEND = process.env.NEXT_PUBLIC_USE_BACKEND === 'true';

export const dataFetcher = {
  async getIndustries() {
    if (USE_BACKEND) return apiClient.getIndustries();
    return prisma.industry.findMany({ where: { status: 'published' } });
  },

  async getIndustryBySlug(slug: string) {
    if (USE_BACKEND) return apiClient.getIndustryBySlug(slug);
    return prisma.industry.findUnique({
      where: { slug },
      include: { services: true, insights: { take: 3, include: { author: true }, orderBy: { publishedAt: 'desc' } }, experts: true }
    });
  },

  async getServices() {
    if (USE_BACKEND) return apiClient.getServices();
    return prisma.service.findMany({ where: { status: 'published' } });
  },

  async getServiceBySlug(slug: string) {
    if (USE_BACKEND) return apiClient.getServiceBySlug(slug);
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

  async getInsights() {
    if (USE_BACKEND) return apiClient.getInsights();
    return prisma.insight.findMany({ where: { status: 'published' }, orderBy: { publishedAt: 'desc' } });
  },

  async getInsightBySlug(slug: string) {
    if (USE_BACKEND) return apiClient.getInsightBySlug(slug);
    return prisma.insight.findUnique({ where: { slug }, include: { author: true } });
  },

  async getExperts() {
    if (USE_BACKEND) return apiClient.getExperts();
    return prisma.expert.findMany();
  },

  async getExpertBySlug(slug: string) {
    if (USE_BACKEND) return apiClient.getExpertBySlug(slug);
    return prisma.expert.findUnique({ where: { slug } });
  },

  async getOffices() {
    if (USE_BACKEND) return apiClient.getOffices();
    return prisma.office.findMany({ where: { status: 'published' } });
  },

  async getOfficeBySlug(slug: string) {
    if (USE_BACKEND) return apiClient.getOfficeBySlug(slug);
    return prisma.office.findUnique({ where: { slug } });
  },

  async getCareers() {
    if (USE_BACKEND) return apiClient.getCareers();
    return prisma.career.findMany({ where: { status: 'published' } });
  },

  async getCareerBySlug(slug: string) {
    if (USE_BACKEND) return apiClient.getCareerBySlug(slug);
    return prisma.career.findUnique({ where: { slug } });
  }
};
