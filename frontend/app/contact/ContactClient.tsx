"use client";
import { useState } from "react";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export default function ContactPage({ content }: { content: any }) {
  const heroTitle = content?.contact_hero_title || 'Contact Us';
  const heroSubtitle = content?.contact_hero_subtitle || 'Ready to transform your business? Get in touch with our experts to discuss your challenges and explore solutions.';
  const formTitle = content?.contact_form_title || 'Get in Touch';
  const officesTitle = content?.contact_offices_title || 'Our Offices';
  const offices = content?.contact_offices_data || [
    { city: "New York", address: "200 West Street, New York, NY 10013", phone: "+1 212 555 0100", email: "newyork@jas.com" },
    { city: "London", address: "1 Poultry, London EC2R 8EJ, UK", phone: "+44 20 7556 1000", email: "london@jas.com" },
    { city: "Singapore", address: "8 Marina Boulevard, Singapore 018981", phone: "+65 6212 5000", email: "singapore@jas.com" }
  ];

  const [formData, setFormData] = useState({ name: "", email: "", company: "", industry: "", message: "", inquiry: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [toast, setToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({show: false, message: '', type: 'success'});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({show: true, message, type});
    setTimeout(() => setToast({show: false, message: '', type: 'success'}), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contact_form', type: formData.inquiry || 'general' })
      });

      if (response.ok) {
        showToast("Thank you! We'll be in touch within 24 hours.", 'success');
        setFormData({ name: "", email: "", company: "", industry: "", message: "", inquiry: "" });
        setErrors({});
      } else {
        showToast("Something went wrong. Please try again.", 'error');
      }
    } catch (error) {
      showToast("Failed to submit. Please try again.", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {toast.show && (
        <div className={`fixed top-24 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transition-all ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          <div className="flex items-center gap-3">
            <span>{toast.type === 'success' ? '✓' : '✕'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 py-20 pt-32 overflow-hidden">
        {/* Animated Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-ping" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-6 text-white">{heroTitle}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">{heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">{formTitle}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => {setFormData({...formData, name: e.target.value}); if(errors.name) setErrors({...errors, name: undefined});}} className={`w-full p-3 border rounded-lg focus:border-primary focus:outline-none transition-colors ${errors.name ? 'border-red-500' : ''}`} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value}); if(errors.email) setErrors({...errors, email: undefined});}} className={`w-full p-3 border rounded-lg focus:border-primary focus:outline-none transition-colors ${errors.email ? 'border-red-500' : ''}`} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type of Inquiry</label>
                  <select value={formData.inquiry} onChange={(e) => setFormData({...formData, inquiry: e.target.value})} className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none">
                    <option value="">Select Inquiry Type</option>
                    <option value="consulting">Consulting Services</option>
                    <option value="digital">Digital Transformation</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="careers">Career Opportunities</option>
                    <option value="media">Media Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea rows={6} value={formData.message} onChange={(e) => {setFormData({...formData, message: e.target.value}); if(errors.message) setErrors({...errors, message: undefined});}} placeholder="Tell us about your challenges and how we can help..." className={`w-full p-3 border rounded-lg focus:border-primary focus:outline-none transition-colors ${errors.message ? 'border-red-500' : ''}`} />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button type="submit" disabled={loading} className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">{officesTitle}</h2>
              <div className="space-y-6">
                {offices.map((office: any) => (
                  <div key={office.city} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-4">{office.city}</h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                        <span>{office.address}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                        <a href={`tel:${office.phone}`} className="hover:text-primary transition-colors">{office.phone}</a>
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        <a href={`mailto:${office.email}`} className="hover:text-primary transition-colors">{office.email}</a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
