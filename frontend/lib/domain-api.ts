// Domain API Abstraction Layer
// Provides unified interface for backend API calls with feature flag support

const USE_BACKEND = process.env.NEXT_PUBLIC_USE_BACKEND === 'true';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
const FRONTEND_URL = '/api';

class DomainAPI {
  private getUrl(endpoint: string): string {
    const baseUrl = USE_BACKEND ? BACKEND_URL : FRONTEND_URL;
    const url = `${baseUrl}${endpoint}`;
    
    if (typeof window !== 'undefined') {
      console.log(`[DomainAPI] ${USE_BACKEND ? 'Backend' : 'Frontend'} API: ${url}`);
    }
    
    return url;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = this.getUrl(endpoint);
    
    const config: RequestInit = {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Request failed with status ${response.status}`);
      }
      
      return await response.json() as T;
    } catch (error) {
      console.error('[DomainAPI] Error:', error);
      throw error;
    }
  }

  // Industries
  async getIndustries(): Promise<any[]> {
    return this.request<any[]>('/industries', { method: 'GET' });
  }

  async createIndustry(data: any): Promise<any> {
    return this.request<any>('/industries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateIndustry(id: string, data: any): Promise<any> {
    if (USE_BACKEND) {
      return this.request(`/industries/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } else {
      return this.request(`/industries?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, id }),
      });
    }
  }

  async deleteIndustry(id: string): Promise<any> {
    if (USE_BACKEND) {
      return this.request<any>(`/industries/${id}`, { method: 'DELETE' });
    } else {
      return this.request<any>(`/industries?id=${id}`, { method: 'DELETE' });
    }
  }

  // Services
  async getServices(): Promise<any[]> {
    return this.request<any[]>('/services', { method: 'GET' });
  }

  async createService(data: any): Promise<any> {
    return this.request<any>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: any): Promise<any> {
    if (USE_BACKEND) {
      return this.request(`/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } else {
      return this.request(`/services?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, id }),
      });
    }
  }

  async deleteService(id: string): Promise<any> {
    if (USE_BACKEND) {
      return this.request<any>(`/services/${id}`, { method: 'DELETE' });
    } else {
      return this.request<any>(`/services?id=${id}`, { method: 'DELETE' });
    }
  }

  // Insights
  async getInsights(): Promise<any[]> {
    return this.request<any[]>('/insights', { method: 'GET' });
  }

  async createInsight(data: any): Promise<any> {
    return this.request<any>('/insights', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInsight(id: string, data: any): Promise<any> {
    if (USE_BACKEND) {
      return this.request(`/insights/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } else {
      return this.request(`/insights?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, id }),
      });
    }
  }

  async deleteInsight(id: string): Promise<any> {
    if (USE_BACKEND) {
      return this.request<any>(`/insights/${id}`, { method: 'DELETE' });
    } else {
      return this.request<any>(`/insights?id=${id}`, { method: 'DELETE' });
    }
  }

  // Experts
  async getExperts(): Promise<any[]> {
    return this.request<any[]>('/experts', { method: 'GET' });
  }

  async createExpert(data: any): Promise<any> {
    return this.request<any>('/experts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateExpert(id: string, data: any): Promise<any> {
    if (USE_BACKEND) {
      return this.request(`/experts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } else {
      return this.request(`/experts?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, id }),
      });
    }
  }

  async deleteExpert(id: string): Promise<any> {
    if (USE_BACKEND) {
      return this.request<any>(`/experts/${id}`, { method: 'DELETE' });
    } else {
      return this.request<any>(`/experts?id=${id}`, { method: 'DELETE' });
    }
  }

  // Offices
  async getOffices(): Promise<any[]> {
    return this.request<any[]>('/offices', { method: 'GET' });
  }

  async createOffice(data: any): Promise<any> {
    return this.request<any>('/offices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOffice(id: string, data: any): Promise<any> {
    if (USE_BACKEND) {
      return this.request(`/offices/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } else {
      return this.request(`/offices?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, id }),
      });
    }
  }

  async deleteOffice(id: string): Promise<any> {
    if (USE_BACKEND) {
      return this.request<any>(`/offices/${id}`, { method: 'DELETE' });
    } else {
      return this.request<any>(`/offices?id=${id}`, { method: 'DELETE' });
    }
  }

  // Leads
  async getLeads(): Promise<any[]> {
    return this.request<any[]>('/leads', { method: 'GET' });
  }

  async createLead(data: any): Promise<any> {
    return this.request<any>('/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Careers
  async getCareers(): Promise<any[]> {
    return this.request<any[]>('/careers', { method: 'GET' });
  }

  async createCareer(data: any): Promise<any> {
    return this.request<any>('/careers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCareer(id: string, data: any): Promise<any> {
    if (USE_BACKEND) {
      return this.request(`/careers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } else {
      return this.request(`/careers?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, id }),
      });
    }
  }

  async deleteCareer(id: string): Promise<any> {
    if (USE_BACKEND) {
      return this.request<any>(`/careers/${id}`, { method: 'DELETE' });
    } else {
      return this.request<any>(`/careers?id=${id}`, { method: 'DELETE' });
    }
  }

  // Content
  async getContent(params?: { page?: string; section?: string }): Promise<any[]> {
    const query = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.request<any[]>(`/content${query}`, { method: 'GET' });
  }

  async createContent(data: any): Promise<any> {
    return this.request<any>('/content', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateContent(idOrKey: string, data: any): Promise<any> {
    if (USE_BACKEND) {
      // Backend uses key
      return this.request(`/content/${idOrKey}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } else {
      // Frontend uses id
      return this.request(`/content?id=${idOrKey}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, id: idOrKey }),
      });
    }
  }

  async deleteContent(idOrKey: string): Promise<any> {
    if (USE_BACKEND) {
      // Backend uses key
      return this.request<any>(`/content/${idOrKey}`, { method: 'DELETE' });
    } else {
      // Frontend uses id
      return this.request<any>(`/content?id=${idOrKey}`, { method: 'DELETE' });
    }
  }
}

export const domainAPI = new DomainAPI();
