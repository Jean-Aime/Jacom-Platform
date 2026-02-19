"use client";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export default function CaseStudiesAdmin() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    company: "",
    industry: "",
    challenge: "",
    solution: "",
    results: "",
    quote: "",
    author: "",
    authorRole: "",
    image: "",
    featured: false,
    status: "published"
  });

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    try {
      const data = await apiClient.getCaseStudies();
      setCaseStudies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading case studies:", error);
      setCaseStudies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.updateCaseStudy(editingId, formData);
      } else {
        await apiClient.createCaseStudy(formData);
      }
      resetForm();
      loadCaseStudies();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving case study");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('http://localhost/Jacom-Platform/backend/upload.php?type=case-studies', {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    }
  };

  const handleEdit = (cs: any) => {
    setEditingId(cs.id);
    setFormData({
      title: cs.title,
      slug: cs.slug,
      company: cs.company,
      industry: cs.industry || "",
      challenge: cs.challenge,
      solution: cs.solution,
      results: cs.results,
      quote: cs.quote || "",
      author: cs.author || "",
      authorRole: cs.authorRole || "",
      image: cs.image || "",
      featured: cs.featured || false,
      status: cs.status || "published"
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    try {
      await apiClient.deleteCaseStudy(id);
      loadCaseStudies();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      company: "",
      industry: "",
      challenge: "",
      solution: "",
      results: "",
      quote: "",
      author: "",
      authorRole: "",
      image: "",
      featured: false,
      status: "published"
    });
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Case Studies Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Case Study" : "Add New Case Study"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Challenge</label>
              <textarea
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Solution</label>
              <textarea
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Results</label>
              <textarea
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Quote (Optional)</label>
              <textarea
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full border rounded px-3 py-2"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Author Role</label>
                <input
                  type="text"
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border rounded px-3 py-2 mb-2"
              />
              {formData.image && (
                <div className="mt-2">
                  <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="text-red-600 text-xs mt-1 hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Featured</span>
              </label>

              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="border rounded px-3 py-2"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Existing Case Studies</h2>
          <div className="space-y-4">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="border rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">{cs.title}</h3>
                    <p className="text-sm text-gray-600">{cs.company} - {cs.industry}</p>
                    <p className="text-xs text-gray-500">/case-studies/{cs.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cs)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cs.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 text-xs">
                  {cs.featured && (
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800">Featured</span>
                  )}
                  <span className={`px-2 py-1 rounded ${cs.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {cs.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
