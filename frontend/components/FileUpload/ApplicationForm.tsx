"use client";
import { useState } from "react";

interface ApplicationFormProps {
  jobTitle: string;
  jobId: string;
}

export default function ApplicationForm({ jobTitle, jobId }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    coverLetter: ""
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    setLoading(true);

    try {
      // Upload resume
      const uploadData = new FormData();
      uploadData.append('file', resume);
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      });
      
      const { url } = await uploadResponse.json();

      // Submit application
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerId: jobId,
          ...formData,
          resumeUrl: url
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
        <p className="text-gray-600 mb-4">Thank you for applying to {jobTitle}. We'll review your application and get back to you within 2 weeks.</p>
        <a href="/careers" className="text-primary hover:underline font-medium">
          Browse More Opportunities →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Resume/CV * (PDF, DOC, DOCX - Max 5MB)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />
          <label htmlFor="resume-upload" className="cursor-pointer">
            {resume ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">{resume.name}</span>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setResume(null); }}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"/>
                </svg>
                <p className="text-gray-600">Click to upload or drag and drop</p>
              </>
            )}
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Letter</label>
        <textarea
          rows={6}
          value={formData.coverLetter}
          onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
          placeholder="Tell us why you're interested in this role..."
          className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}