"use client";
import { useState } from "react";

interface GatedContentProps {
  insightTitle: string;
  downloadUrl: string;
}

export default function GatedContent({ insightTitle, downloadUrl }: GatedContentProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: ""
  });
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert("Please fill in required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'gated_content',
          message: `Downloaded: ${insightTitle}`,
          downloadedContent: 1
        })
      });

      if (response.ok) {
        setUnlocked(true);
        window.open(downloadUrl, '_blank');
      }
    } catch (error) {
      alert("Failed to unlock content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (unlocked) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        <h3 className="text-xl font-bold mb-2">Content Unlocked!</h3>
        <p className="text-gray-600 mb-4">Your download should start automatically.</p>
        <a href={downloadUrl} className="text-primary hover:underline font-medium">
          Click here if download doesn't start →
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
        </svg>
        <h3 className="text-xl font-semibold">Unlock Full Report</h3>
      </div>
      <p className="text-gray-600 mb-6">Fill out the form below to download the complete insight.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 border rounded focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full p-2 border rounded focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              className="w-full p-2 border rounded focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 px-4 rounded font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Unlocking...' : 'Download Report'}
        </button>
      </form>
    </div>
  );
}
