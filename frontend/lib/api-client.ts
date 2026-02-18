const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

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
      headers: { 'Content-Type': 'application/json', ...options.headers },
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Backend not reachable. Check XAMPP Apache is running.');
      }
      throw error;
    }
  }

  // Auth
  login(email: string, password: string) {
    return this.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  }
  logout() { return this.request('/auth/logout', { method: 'POST' }); }
  checkAuth() { return this.request('/auth/check', { method: 'GET' }); }

  // Industries
  getIndustries() { return this.request('/industries', { method: 'GET' }); }
  getIndustryBySlug(slug: string) { return this.request(`/industries/${slug}`, { method: 'GET' }); }
  createIndustry(data: any) { return this.request('/industries', { method: 'POST', body: JSON.stringify(data) }); }
  updateIndustry(id: string, data: any) { return this.request(`/industries/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteIndustry(id: string) { return this.request(`/industries/${id}`, { method: 'DELETE' }); }

  // Services
  getServices() { return this.request('/services', { method: 'GET' }); }
  getServiceBySlug(slug: string) { return this.request(`/services/${slug}`, { method: 'GET' }); }
  createService(data: any) { return this.request('/services', { method: 'POST', body: JSON.stringify(data) }); }
  updateService(id: string, data: any) { return this.request(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteService(id: string) { return this.request(`/services/${id}`, { method: 'DELETE' }); }

  // Leads
  getLeads() { return this.request('/leads', { method: 'GET' }); }
  getLeadById(id: string) { return this.request(`/leads/${id}`, { method: 'GET' }); }
  createLead(data: any) { return this.request('/leads', { method: 'POST', body: JSON.stringify(data) }); }
  updateLead(id: string, data: any) { return this.request(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteLead(id: string) { return this.request(`/leads/${id}`, { method: 'DELETE' }); }

  // Content
  getContent() { return this.request('/content', { method: 'GET' }); }
  getContentByKey(key: string) { return this.request(`/content/${key}`, { method: 'GET' }); }
  createContent(data: any) { return this.request('/content', { method: 'POST', body: JSON.stringify(data) }); }
  updateContent(id: string, data: any) { return this.request(`/content/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteContent(id: string) { return this.request(`/content/${id}`, { method: 'DELETE' }); }

  // Experts
  getExperts() { return this.request('/experts', { method: 'GET' }); }
  getExpertBySlug(slug: string) { return this.request(`/experts/${slug}`, { method: 'GET' }); }
  createExpert(data: any) { return this.request('/experts', { method: 'POST', body: JSON.stringify(data) }); }
  updateExpert(id: string, data: any) { return this.request(`/experts/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteExpert(id: string) { return this.request(`/experts/${id}`, { method: 'DELETE' }); }

  // Insights
  getInsights() { return this.request('/insights', { method: 'GET' }); }
  getInsightBySlug(slug: string) { return this.request(`/insights/${slug}`, { method: 'GET' }); }
  createInsight(data: any) { return this.request('/insights', { method: 'POST', body: JSON.stringify(data) }); }
  updateInsight(id: string, data: any) { return this.request(`/insights/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteInsight(id: string) { return this.request(`/insights/${id}`, { method: 'DELETE' }); }

  // Offices
  getOffices() { return this.request('/offices', { method: 'GET' }); }
  getOfficeBySlug(slug: string) { return this.request(`/offices/${slug}`, { method: 'GET' }); }
  createOffice(data: any) { return this.request('/offices', { method: 'POST', body: JSON.stringify(data) }); }
  updateOffice(id: string, data: any) { return this.request(`/offices/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteOffice(id: string) { return this.request(`/offices/${id}`, { method: 'DELETE' }); }

  // Careers
  getCareers() { return this.request('/careers', { method: 'GET' }); }
  getCareerBySlug(slug: string) { return this.request(`/careers/${slug}`, { method: 'GET' }); }
  createCareer(data: any) { return this.request('/careers', { method: 'POST', body: JSON.stringify(data) }); }
  updateCareer(id: string, data: any) { return this.request(`/careers/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteCareer(id: string) { return this.request(`/careers/${id}`, { method: 'DELETE' }); }

  // Solutions
  getSolutions() { return this.request('/solutions', { method: 'GET' }); }
  getSolutionBySlug(slug: string) { return this.request(`/solutions/${slug}`, { method: 'GET' }); }
  createSolution(data: any) { return this.request('/solutions', { method: 'POST', body: JSON.stringify(data) }); }
  updateSolution(id: string, data: any) { return this.request(`/solutions/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteSolution(id: string) { return this.request(`/solutions/${id}`, { method: 'DELETE' }); }
}

export const apiClient = new ApiClient();
export default apiClient;
