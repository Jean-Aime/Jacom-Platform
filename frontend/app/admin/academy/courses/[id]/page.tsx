"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Phase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  materialPrice: number;
  materialDiscountedPrice: number;
  classPrice: number;
  duration: string;
}

interface Week {
  id: string;
  phaseId: string;
  weekNumber: number;
  title: string;
  description: string;
  taskList: string;
  practicalExercises: string;
}

interface Topic {
  id: string;
  weekId: string;
  title: string;
  orderIndex: number;
}

interface Resource {
  id: string;
  topicId: string;
  type: 'video_syllabus' | 'video_curriculum' | 'video_notes' | 'webaccess';
  title: string;
  url: string;
  content: string;
  orderIndex: number;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [course, setCourse] = useState<any>(null);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'phases' | 'curriculum'>('overview');

  const [showPhaseModal, setShowPhaseModal] = useState(false);
  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);
  const [showWeekModal, setShowWeekModal] = useState(false);
  const [editingWeek, setEditingWeek] = useState<Week | null>(null);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('session-token');
    return {
      'X-Session-Token': token || '',
      'Content-Type': 'application/json'
    };
  };

  const fetchCourseData = async () => {
    try {
      // Fetch course details
      const courseRes = await fetch(`${BACKEND}/academy/courses/${courseId}`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (courseRes.ok) {
        const courseData = await courseRes.json();
        setCourse(courseData);
      }

      // Fetch phases
      const phasesRes = await fetch(`${BACKEND}/course-phases/${courseId}`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (phasesRes.ok) {
        const phasesData = await phasesRes.json();
        setPhases(phasesData);
      }

      // Fetch all curriculum data
      const weeksRes = await fetch(`${BACKEND}/curriculum/weeks`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (weeksRes.ok) {
        const weeksData = await weeksRes.json();
        setWeeks(weeksData);
      }

      const topicsRes = await fetch(`${BACKEND}/curriculum/topics`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (topicsRes.ok) {
        const topicsData = await topicsRes.json();
        setTopics(topicsData);
      }

      const resourcesRes = await fetch(`${BACKEND}/curriculum/resources`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (resourcesRes.ok) {
        const resourcesData = await resourcesRes.json();
        setResources(resourcesData);
      }

    } catch (error) {
      console.error('Failed to fetch course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePhase = async (phaseData: any) => {
    try {
      const url = editingPhase 
        ? `${BACKEND}/course-phases/${editingPhase.id}`
        : `${BACKEND}/course-phases`;
      
      const response = await fetch(url, {
        method: editingPhase ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ ...phaseData, courseId })
      });

      if (response.ok) {
        setShowPhaseModal(false);
        fetchCourseData();
      }
    } catch (error) {
      console.error('Failed to save phase:', error);
    }
  };

  const handleDeletePhase = async (id: string) => {
    if (!confirm('Delete this phase? All weeks, topics, and resources will be deleted.')) return;
    
    try {
      const response = await fetch(`${BACKEND}/course-phases/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (response.ok) {
        fetchCourseData();
      }
    } catch (error) {
      console.error('Failed to delete phase:', error);
    }
  };

  const handleSaveWeek = async (weekData: any) => {
    try {
      const url = editingWeek 
        ? `${BACKEND}/curriculum/weeks/${editingWeek.id}`
        : `${BACKEND}/curriculum/weeks`;
      
      const response = await fetch(url, {
        method: editingWeek ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(weekData)
      });

      if (response.ok) {
        setShowWeekModal(false);
        fetchCourseData();
      }
    } catch (error) {
      console.error('Failed to save week:', error);
    }
  };

  const handleDeleteWeek = async (id: string) => {
    if (!confirm('Delete this week? All topics and resources will be deleted.')) return;
    
    try {
      const response = await fetch(`${BACKEND}/curriculum/weeks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (response.ok) {
        fetchCourseData();
      }
    } catch (error) {
      console.error('Failed to delete week:', error);
    }
  };

  const handleSaveTopic = async (topicData: any) => {
    try {
      const url = editingTopic 
        ? `${BACKEND}/curriculum/topics/${editingTopic.id}`
        : `${BACKEND}/curriculum/topics`;
      
      const response = await fetch(url, {
        method: editingTopic ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(topicData)
      });

      if (response.ok) {
        setShowTopicModal(false);
        fetchCourseData();
      }
    } catch (error) {
      console.error('Failed to save topic:', error);
    }
  };

  const handleDeleteTopic = async (id: string) => {
    if (!confirm('Delete this topic? All resources will be deleted.')) return;
    
    try {
      const response = await fetch(`${BACKEND}/curriculum/topics/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (response.ok) {
        fetchCourseData();
      }
    } catch (error) {
      console.error('Failed to delete topic:', error);
    }
  };

  const handleSaveResource = async (resourceData: any) => {
    try {
      const url = editingResource 
        ? `${BACKEND}/curriculum/resources/${editingResource.id}`
        : `${BACKEND}/curriculum/resources`;
      
      const response = await fetch(url, {
        method: editingResource ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(resourceData)
      });

      if (response.ok) {
        setShowResourceModal(false);
        fetchCourseData();
      }
    } catch (error) {
      console.error('Failed to save resource:', error);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!confirm('Delete this resource?')) return;
    
    try {
      const response = await fetch(`${BACKEND}/curriculum/resources/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (response.ok) {
        fetchCourseData();
      }
    } catch (error) {
      console.error('Failed to delete resource:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Course not found</p>
          <Link href="/admin/academy/courses" className="text-primary hover:underline mt-4 inline-block">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin/academy/courses" className="text-sm text-gray-600 hover:text-primary mb-2 inline-block">
                ← Back to Courses
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{course.name}</h1>
              <p className="text-sm text-gray-600 mt-1">{course.category} • {course.duration}</p>
            </div>
            <div className="flex gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                course.status === 'published' ? 'bg-green-100 text-green-800' :
                course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {course.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('phases')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'phases'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Phases ({phases.length})
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'curriculum'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Curriculum ({weeks.length} weeks, {topics.length} topics)
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                    <p className="text-gray-900">{course.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                    <p className="text-gray-600 font-mono text-sm">{course.slug}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <p className="text-gray-900">{course.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <p className="text-gray-900">{course.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <p className="text-gray-900">{new Date(course.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Mode</label>
                    <p className="text-gray-900 capitalize">{course.deliveryMode}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="text-gray-900">{course.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Price</label>
                    <p className="text-2xl font-bold text-gray-900">${course.totalPrice}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Payment Price</label>
                    <p className="text-2xl font-bold text-green-600">${course.fullPaymentPrice}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Students</label>
                    <p className="text-2xl font-bold text-gray-900">{course.maxStudents}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Phases Tab */}
            {activeTab === 'phases' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Course Phases</h2>
                  <button
                    onClick={() => {
                      setEditingPhase(null);
                      setShowPhaseModal(true);
                    }}
                    className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    + Add Phase
                  </button>
                </div>

                <div className="space-y-4">
                  {phases.map((phase) => (
                    <div key={phase.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
                              Phase {phase.phaseNumber}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-4">{phase.description}</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Material Price:</span>
                              <span className="ml-2 font-semibold">${phase.materialPrice}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Discounted:</span>
                              <span className="ml-2 font-semibold text-green-600">${phase.materialDiscountedPrice}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Duration:</span>
                              <span className="ml-2 font-semibold">{phase.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => {
                              setEditingPhase(phase);
                              setShowPhaseModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePhase(phase.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Show weeks for this phase */}
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Weeks in this Phase ({weeks.filter(w => w.phaseId === phase.id).length})
                        </h4>
                        <div className="space-y-2">
                          {weeks.filter(w => w.phaseId === phase.id).map(week => (
                            <div key={week.id} className="text-sm text-gray-600 pl-4 border-l-2 border-gray-200">
                              Week {week.weekNumber}: {week.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Complete Curriculum</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingWeek(null);
                        setShowWeekModal(true);
                      }}
                      className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      + Add Week
                    </button>
                    <button
                      onClick={() => {
                        setEditingTopic(null);
                        setShowTopicModal(true);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      + Add Topic
                    </button>
                    <button
                      onClick={() => {
                        setEditingResource(null);
                        setShowResourceModal(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      + Add Resource
                    </button>
                  </div>
                </div>

                {/* Hierarchical View */}
                <div className="space-y-6">
                  {phases.map((phase) => {
                    const phaseWeeks = weeks.filter(w => w.phaseId === phase.id);
                    if (phaseWeeks.length === 0) return null;

                    return (
                      <div key={phase.id} className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                          Phase {phase.phaseNumber}: {phase.title}
                        </h3>

                        <div className="space-y-4">
                          {phaseWeeks.map((week) => {
                            const weekTopics = topics.filter(t => t.weekId === week.id);

                            return (
                              <div key={week.id} className="bg-white border rounded-lg p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
                                        Week {week.weekNumber}
                                      </span>
                                      <h4 className="font-semibold text-gray-900">{week.title}</h4>
                                    </div>
                                    {week.description && (
                                      <p className="text-sm text-gray-600 mb-2">{week.description}</p>
                                    )}
                                    {week.taskList && (
                                      <p className="text-xs text-gray-500">📋 {week.taskList}</p>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => {
                                        setEditingWeek(week);
                                        setShowWeekModal(true);
                                      }}
                                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteWeek(week.id)}
                                      className="text-red-600 hover:text-red-800 text-xs font-medium"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>

                                {/* Topics */}
                                {weekTopics.length > 0 && (
                                  <div className="ml-4 space-y-2">
                                    {weekTopics.map((topic) => {
                                      const topicResources = resources.filter(r => r.topicId === topic.id);

                                      return (
                                        <div key={topic.id} className="border-l-2 border-gray-300 pl-4">
                                          <div className="flex justify-between items-start mb-2">
                                            <p className="text-sm font-medium text-gray-900">{topic.title}</p>
                                            <div className="flex gap-2">
                                              <button
                                                onClick={() => {
                                                  setEditingTopic(topic);
                                                  setShowTopicModal(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-800 text-xs"
                                              >
                                                Edit
                                              </button>
                                              <button
                                                onClick={() => handleDeleteTopic(topic.id)}
                                                className="text-red-600 hover:text-red-800 text-xs"
                                              >
                                                Delete
                                              </button>
                                            </div>
                                          </div>

                                          {/* Resources */}
                                          {topicResources.length > 0 && (
                                            <div className="ml-4 space-y-1">
                                              {topicResources.map((resource) => (
                                                <div key={resource.id} className="flex justify-between items-center text-xs">
                                                  <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-0.5 rounded ${
                                                      resource.type === 'video_syllabus' ? 'bg-purple-100 text-purple-800' :
                                                      resource.type === 'video_curriculum' ? 'bg-blue-100 text-blue-800' :
                                                      resource.type === 'video_notes' ? 'bg-yellow-100 text-yellow-800' :
                                                      'bg-gray-100 text-gray-800'
                                                    }`}>
                                                      {resource.type.replace('_', ' ')}
                                                    </span>
                                                    <span className="text-gray-600">{resource.title}</span>
                                                  </div>
                                                  <div className="flex gap-2">
                                                    <button
                                                      onClick={() => {
                                                        setEditingResource(resource);
                                                        setShowResourceModal(true);
                                                      }}
                                                      className="text-blue-600 hover:text-blue-800"
                                                    >
                                                      Edit
                                                    </button>
                                                    <button
                                                      onClick={() => handleDeleteResource(resource.id)}
                                                      className="text-red-600 hover:text-red-800"
                                                    >
                                                      Delete
                                                    </button>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPhaseModal && (
        <PhaseModal
          phase={editingPhase}
          onSave={handleSavePhase}
          onClose={() => setShowPhaseModal(false)}
        />
      )}

      {showWeekModal && (
        <WeekModal
          week={editingWeek}
          phases={phases}
          onSave={handleSaveWeek}
          onClose={() => setShowWeekModal(false)}
        />
      )}

      {showTopicModal && (
        <TopicModal
          topic={editingTopic}
          weeks={weeks}
          onSave={handleSaveTopic}
          onClose={() => setShowTopicModal(false)}
        />
      )}

      {showResourceModal && (
        <ResourceModal
          resource={editingResource}
          topics={topics}
          onSave={handleSaveResource}
          onClose={() => setShowResourceModal(false)}
        />
      )}
    </div>
  );
}

// Modal Components
function PhaseModal({ phase, onSave, onClose }: any) {
  const [formData, setFormData] = useState({
    phaseNumber: phase?.phaseNumber || 1,
    title: phase?.title || '',
    description: phase?.description || '',
    materialPrice: phase?.materialPrice || 0,
    materialDiscountedPrice: phase?.materialDiscountedPrice || 0,
    classPrice: phase?.classPrice || 0,
    duration: phase?.duration || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{phase ? 'Edit Phase' : 'Add Phase'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phase Number</label>
              <input
                type="number"
                value={formData.phaseNumber}
                onChange={(e) => setFormData({...formData, phaseNumber: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="4 weeks"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Comprehensive Power BI Essentials"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
              placeholder="This course covers the core aspects of Power BI..."
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material Price</label>
              <input
                type="number"
                value={formData.materialPrice}
                onChange={(e) => setFormData({...formData, materialPrice: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
              <input
                type="number"
                value={formData.materialDiscountedPrice}
                onChange={(e) => setFormData({...formData, materialDiscountedPrice: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class Price</label>
              <input
                type="number"
                value={formData.classPrice}
                onChange={(e) => setFormData({...formData, classPrice: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-primary hover:bg-red-700 text-white py-2 rounded-lg font-medium">
              Save Phase
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function WeekModal({ week, phases, onSave, onClose }: any) {
  const [formData, setFormData] = useState({
    phaseId: week?.phaseId || phases[0]?.id || '',
    weekNumber: week?.weekNumber || 1,
    title: week?.title || '',
    description: week?.description || '',
    taskList: week?.taskList || '',
    practicalExercises: week?.practicalExercises || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{week ? 'Edit Week' : 'Add Week'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phase</label>
            <select
              value={formData.phaseId}
              onChange={(e) => setFormData({...formData, phaseId: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              {phases.map((phase: any) => (
                <option key={phase.id} value={phase.id}>Phase {phase.phaseNumber}: {phase.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Week Number</label>
            <input
              type="number"
              value={formData.weekNumber}
              onChange={(e) => setFormData({...formData, weekNumber: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border rounded-lg"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Introduction to BI, Power BI, and Data Extraction"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task List</label>
            <input
              type="text"
              value={formData.taskList}
              onChange={(e) => setFormData({...formData, taskList: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="TASK LIST - TOPIC OF the week"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Practical Exercises</label>
            <input
              type="text"
              value={formData.practicalExercises}
              onChange={(e) => setFormData({...formData, practicalExercises: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Practical Exercises - Introduction to BI, Power BI"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-primary hover:bg-red-700 text-white py-2 rounded-lg font-medium">
              Save Week
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TopicModal({ topic, weeks, onSave, onClose }: any) {
  const [formData, setFormData] = useState({
    weekId: topic?.weekId || weeks[0]?.id || '',
    title: topic?.title || '',
    orderIndex: topic?.orderIndex || 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{topic ? 'Edit Topic' : 'Add Topic'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Week</label>
            <select
              value={formData.weekId}
              onChange={(e) => setFormData({...formData, weekId: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              {weeks.map((week: any) => (
                <option key={week.id} value={week.id}>Week {week.weekNumber}: {week.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="1. Introduction to Business Intelligence & Power BI"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
            <input
              type="number"
              value={formData.orderIndex}
              onChange={(e) => setFormData({...formData, orderIndex: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border rounded-lg"
              required
              min="1"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-primary hover:bg-red-700 text-white py-2 rounded-lg font-medium">
              Save Topic
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ResourceModal({ resource, topics, onSave, onClose }: any) {
  const [formData, setFormData] = useState({
    topicId: resource?.topicId || topics[0]?.id || '',
    type: resource?.type || 'video_syllabus',
    title: resource?.title || '',
    url: resource?.url || '',
    content: resource?.content || '',
    orderIndex: resource?.orderIndex || 1
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async (resourceId: string) => {
    if (!selectedFile) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', selectedFile);
    uploadFormData.append('resourceId', resourceId);
    uploadFormData.append('fileType', selectedFile.type);

    try {
      const token = localStorage.getItem('session-token');
      const response = await fetch(`${BACKEND}/upload`, {
        method: 'POST',
        headers: {
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: uploadFormData
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      }
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save resource first
    await onSave(formData);
    
    // If file selected and resource exists, upload it
    if (selectedFile && resource?.id) {
      await handleFileUpload(resource.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{resource ? 'Edit Resource' : 'Add Resource'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
            <select
              value={formData.topicId}
              onChange={(e) => setFormData({...formData, topicId: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              {topics.map((topic: any) => (
                <option key={topic.id} value={topic.id}>{topic.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="video_syllabus">Video Syllabus</option>
              <option value="video_curriculum">Video Curriculum</option>
              <option value="video_notes">Video Notes</option>
              <option value="webaccess">Web Access</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Video Syllabus"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL (Optional if uploading file)</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File (PDF, Video, Document)</label>
            <input
              type="file"
              onChange={handleFileSelect}
              className="w-full px-4 py-2 border rounded-lg"
              accept=".pdf,.mp4,.mpeg,.mov,.avi,.webm,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp"
            />
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
            {resource?.fileName && (
              <p className="text-sm text-green-600 mt-2">
                Current file: {resource.fileName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content/Notes</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
              placeholder="Additional content or notes..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
            <input
              type="number"
              value={formData.orderIndex}
              onChange={(e) => setFormData({...formData, orderIndex: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border rounded-lg"
              required
              min="1"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-red-700 text-white py-2 rounded-lg font-medium disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Save Resource'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
