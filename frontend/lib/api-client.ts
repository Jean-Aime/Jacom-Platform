const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/webtest-backup/backend';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
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
        throw new Error(error.error || 'Request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Industries
  async getIndustries() {
    return this.request('/industries', { method: 'GET' });
  }

  async getIndustryBySlug(slug: string) {
    return this.request(`/industries/${slug}`, { method: 'GET' });
  }

  async createIndustry(data: any) {
    return this.request('/industries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateIndustry(id: string, data: any) {
    return this.request(`/industries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteIndustry(id: string) {
    return this.request(`/industries/${id}`, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
