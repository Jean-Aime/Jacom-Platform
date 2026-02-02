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
      
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">{heroTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">{heroSubtitle}</p>
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
                      <p className="flex items-start gap-2"><span className="text-primary mt-1">📍</span><span>{office.address}</span></p>
                      <p className="flex items-center gap-2"><span className="text-primary">📞</span><a href={`tel:${office.phone}`} className="hover:text-primary transition-colors">{office.phone}</a></p>
                      <p className="flex items-center gap-2"><span className="text-primary">✉️</span><a href={`mailto:${office.email}`} className="hover:text-primary transition-colors">{office.email}</a></p>
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
