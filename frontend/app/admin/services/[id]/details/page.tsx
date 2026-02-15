"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ServiceDetailAdmin({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [serviceId, setServiceId] = useState("");
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Capabilities
  const [capabilities, setCapabilities] = useState<any[]>([]);
  const [newCapability, setNewCapability] = useState({ icon: "integration", title: "", description: "" });

  // Process Steps
  const [processSteps, setProcessSteps] = useState<any[]>([]);
  const [newStep, setNewStep] = useState({ step: "01", title: "", description: "" });

  // Metrics
  const [metrics, setMetrics] = useState<any[]>([]);
  const [metricsTitle, setMetricsTitle] = useState("Performance Metrics");
  const [newMetric, setNewMetric] = useState({ label: "", value: "", change: "" });

  // Case Study
  const [caseStudy, setCaseStudy] = useState({
    label: "",
    title: "",
    description: "",
    image: "",
    metric1Label: "",
    metric1Value: "",
    metric2Label: "",
    metric2Value: "",
    ctaText: "",
    ctaLink: ""
  });

  useEffect(() => {
    params.then(p => {
      setServiceId(p.id);
      fetchServiceDetails(p.id);
    });
  }, []);

  const fetchServiceDetails = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}/details`);
      const data = await res.json();
      setService(data.service);
      setCapabilities(data.capabilities || []);
      setProcessSteps(data.processSteps || []);
      setMetrics(data.metrics || []);
      setMetricsTitle(data.service.impactMetricsTitle || "Performance Metrics");
      setCaseStudy({
        label: data.service.caseStudyLabel || "",
        title: data.service.caseStudyTitle || "",
        description: data.service.caseStudyDescription || "",
        image: data.service.caseStudyImage || "",
        metric1Label: data.service.caseStudyMetric1Label || "",
        metric1Value: data.service.caseStudyMetric1Value || "",
        metric2Label: data.service.caseStudyMetric2Label || "",
        metric2Value: data.service.caseStudyMetric2Value || "",
        ctaText: data.service.caseStudyCtaText || "",
        ctaLink: data.service.caseStudyCtaLink || ""
      });
    } catch (error) {
      console.error("Error fetching service details:", error);
    } finally {
      setLoading(false);
    }
  };

  const addCapability = async () => {
    if (!newCapability.title || !newCapability.description) return;
    try {
      await fetch(`/api/services/${serviceId}/capabilities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCapability)
      });
      fetchServiceDetails(serviceId);
      setNewCapability({ icon: "integration", title: "", description: "" });
    } catch (error) {
      console.error("Error adding capability:", error);
    }
  };

  const deleteCapability = async (id: string) => {
    try {
      await fetch(`/api/services/${serviceId}/capabilities/${id}`, { method: "DELETE" });
      fetchServiceDetails(serviceId);
    } catch (error) {
      console.error("Error deleting capability:", error);
    }
  };

  const addProcessStep = async () => {
    if (!newStep.title || !newStep.description) return;
    try {
      await fetch(`/api/services/${serviceId}/process-steps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStep)
      });
      fetchServiceDetails(serviceId);
      setNewStep({ step: `0${processSteps.length + 2}`, title: "", description: "" });
    } catch (error) {
      console.error("Error adding process step:", error);
    }
  };

  const deleteProcessStep = async (id: string) => {
    try {
      await fetch(`/api/services/${serviceId}/process-steps/${id}`, { method: "DELETE" });
      fetchServiceDetails(serviceId);
    } catch (error) {
      console.error("Error deleting process step:", error);
    }
  };

  const addMetric = async () => {
    if (!newMetric.label || !newMetric.value || !newMetric.change) return;
    try {
      await fetch(`/api/services/${serviceId}/metrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMetric)
      });
      fetchServiceDetails(serviceId);
      setNewMetric({ label: "", value: "", change: "" });
    } catch (error) {
      console.error("Error adding metric:", error);
    }
  };

  const deleteMetric = async (id: string) => {
    try {
      await fetch(`/api/services/${serviceId}/metrics/${id}`, { method: "DELETE" });
      fetchServiceDetails(serviceId);
    } catch (error) {
      console.error("Error deleting metric:", error);
    }
  };

  const saveCaseStudy = async () => {
    try {
      await fetch(`/api/services/${serviceId}/case-study`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseStudy)
      });
      alert("Case study saved successfully!");
    } catch (error) {
      console.error("Error saving case study:", error);
    }
  };

  const saveMetricsTitle = async () => {
    try {
      await fetch(`/api/services/${serviceId}/metrics-title`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: metricsTitle })
      });
      alert("Metrics title saved!");
    } catch (error) {
      console.error("Error saving metrics title:", error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="mb-6">
        <button onClick={() => router.push("/admin/services")} className="text-blue-600 hover:underline mb-4">
          ← Back to Services
        </button>
        <h1 className="text-3xl font-bold">Manage Service Details: {service?.name}</h1>
        <p className="text-gray-600 mt-2">Add and manage capabilities, process steps, metrics, and case study</p>
      </div>

      {/* Capabilities Section */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Core Capabilities</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <select
            value={newCapability.icon}
            onChange={(e) => setNewCapability({...newCapability, icon: e.target.value})}
            className="p-3 border rounded"
          >
            <option value="integration">Integration Icon</option>
            <option value="predictive">Predictive Icon</option>
            <option value="robotics">Robotics Icon</option>
            <option value="twins">Digital Twins Icon</option>
          </select>
          <input
            type="text"
            placeholder="Capability Title"
            value={newCapability.title}
            onChange={(e) => setNewCapability({...newCapability, title: e.target.value})}
            className="p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCapability.description}
            onChange={(e) => setNewCapability({...newCapability, description: e.target.value})}
            className="p-3 border rounded"
          />
        </div>
        <button onClick={addCapability} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Capability
        </button>

        <div className="mt-6 space-y-3">
          {capabilities.map((cap) => (
            <div key={cap.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
              <div>
                <strong>{cap.title}</strong> - {cap.description}
              </div>
              <button onClick={() => deleteCapability(cap.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Process Steps Section */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Implementation Process Steps</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Step Number (01, 02, 03)"
            value={newStep.step}
            onChange={(e) => setNewStep({...newStep, step: e.target.value})}
            className="p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Step Title"
            value={newStep.title}
            onChange={(e) => setNewStep({...newStep, title: e.target.value})}
            className="p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newStep.description}
            onChange={(e) => setNewStep({...newStep, description: e.target.value})}
            className="p-3 border rounded"
          />
        </div>
        <button onClick={addProcessStep} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Process Step
        </button>

        <div className="mt-6 space-y-3">
          {processSteps.map((step) => (
            <div key={step.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
              <div>
                <strong>Step {step.step}: {step.title}</strong> - {step.description}
              </div>
              <button onClick={() => deleteProcessStep(step.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Section */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Business Impact Metrics</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Section Title</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={metricsTitle}
              onChange={(e) => setMetricsTitle(e.target.value)}
              className="flex-1 p-3 border rounded"
            />
            <button onClick={saveMetricsTitle} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save Title
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Metric Label (e.g., PRODUCTION YIELD)"
            value={newMetric.label}
            onChange={(e) => setNewMetric({...newMetric, label: e.target.value})}
            className="p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Value (e.g., 30)"
            value={newMetric.value}
            onChange={(e) => setNewMetric({...newMetric, value: e.target.value})}
            className="p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Change (e.g., +30%)"
            value={newMetric.change}
            onChange={(e) => setNewMetric({...newMetric, change: e.target.value})}
            className="p-3 border rounded"
          />
        </div>
        <button onClick={addMetric} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Metric
        </button>

        <div className="mt-6 space-y-3">
          {metrics.map((metric) => (
            <div key={metric.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
              <div>
                <strong>{metric.label}</strong>: {metric.value} ({metric.change})
              </div>
              <button onClick={() => deleteMetric(metric.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Section */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Featured Case Study</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Label</label>
            <input
              type="text"
              placeholder="e.g., FEATURED CASE STUDY"
              value={caseStudy.label}
              onChange={(e) => setCaseStudy({...caseStudy, label: e.target.value})}
              className="w-full p-3 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Case study title"
              value={caseStudy.title}
              onChange={(e) => setCaseStudy({...caseStudy, title: e.target.value})}
              className="w-full p-3 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              rows={3}
              placeholder="Case study description"
              value={caseStudy.description}
              onChange={(e) => setCaseStudy({...caseStudy, description: e.target.value})}
              className="w-full p-3 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={caseStudy.image}
              onChange={(e) => setCaseStudy({...caseStudy, image: e.target.value})}
              className="w-full p-3 border rounded"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Metric 1 Label</label>
              <input
                type="text"
                placeholder="e.g., DEFECTS REDUCTION"
                value={caseStudy.metric1Label}
                onChange={(e) => setCaseStudy({...caseStudy, metric1Label: e.target.value})}
                className="w-full p-3 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Metric 1 Value</label>
              <input
                type="text"
                placeholder="e.g., 42%"
                value={caseStudy.metric1Value}
                onChange={(e) => setCaseStudy({...caseStudy, metric1Value: e.target.value})}
                className="w-full p-3 border rounded"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Metric 2 Label</label>
              <input
                type="text"
                placeholder="e.g., ANNUAL COST SAVINGS"
                value={caseStudy.metric2Label}
                onChange={(e) => setCaseStudy({...caseStudy, metric2Label: e.target.value})}
                className="w-full p-3 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Metric 2 Value</label>
              <input
                type="text"
                placeholder="e.g., $2.4M"
                value={caseStudy.metric2Value}
                onChange={(e) => setCaseStudy({...caseStudy, metric2Value: e.target.value})}
                className="w-full p-3 border rounded"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">CTA Button Text</label>
              <input
                type="text"
                placeholder="e.g., Read the Full Report"
                value={caseStudy.ctaText}
                onChange={(e) => setCaseStudy({...caseStudy, ctaText: e.target.value})}
                className="w-full p-3 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CTA Link</label>
              <input
                type="text"
                placeholder="/case-studies/example"
                value={caseStudy.ctaLink}
                onChange={(e) => setCaseStudy({...caseStudy, ctaLink: e.target.value})}
                className="w-full p-3 border rounded"
              />
            </div>
          </div>
          <button onClick={saveCaseStudy} className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
            Save Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
