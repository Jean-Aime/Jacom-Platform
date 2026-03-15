"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Phase {
  id: string;
  phaseNumber: number;
  title: string;
  courseId: string;
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
  orderIndex: number;
}

export default function CurriculumManagementPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [phases, setPhases] = useState<Phase[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'weeks' | 'topics' | 'resources'>('weeks');
  
  // Modal states
  const [showWeekModal, setShowWeekModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [editingWeek, setEditingWeek] = useState<Week | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchPhases();
      fetchWeeks();
      fetchTopics();
      fetchResources();
    }
  }, [selectedCourse]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('session-token');
    return {
      'X-Session-Token': token || '',
      'Content-Type': 'application/json'
    };
  };

  const fetchCourses = async () => {
    try {
      console.log('Fetching courses from:', `${BACKEND}/academy/courses`);
      const response = await fetch(`${BACKEND}/academy/courses`, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      console.log('Courses response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Courses data:', data);
        setCourses(data);
        if (data.length > 0) {
          setSelectedCourse(data[0].id);
        }
      } else {
        console.error('Courses fetch failed:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhases = async () => {
    try {
      const url = `${BACKEND}/course-phases/${selectedCourse}`;
      console.log('Fetching phases from:', url);
      const response = await fetch(url, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      console.log('Phases response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Phases data:', data);
        setPhases(data);
      } else {
        console.error('Phases fetch failed:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Failed to fetch phases:', error);
    }
  };

  const fetchWeeks = async () => {
    try {
      const url = `${BACKEND}/curriculum/weeks`;
      console.log('Fetching weeks from:', url);
      const response = await fetch(url, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      console.log('Weeks response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Weeks data:', data);
        setWeeks(data);
      } else {
        console.error('Weeks fetch failed:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Failed to fetch weeks:', error);
    }
  };

  const fetchTopics = async () => {
    try {
      const url = `${BACKEND}/curriculum/topics`;
      console.log('Fetching topics from:', url);
      const response = await fetch(url, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      console.log('Topics response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Topics data:', data);
        setTopics(data);
      } else {
        console.error('Topics fetch failed:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Failed to fetch topics:', error);
    }
  };

  const fetchResources = async () => {
    try {
      const url = `${BACKEND}/curriculum/resources`;
      console.log('Fetching resources from:', url);
      const response = await fetch(url, {
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      console.log('Resources response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Resources data:', data);
        setResources(data);
      } else {
        console.error('Resources fetch failed:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    }
  };

  const handleCreateWeek = () => {
    setEditingWeek(null);
    setShowWeekModal(true);
  };

  const handleEditWeek = (week: Week) => {
    setEditingWeek(week);
    setShowWeekModal(true);
  };

  const handleDeleteWeek = async (id: string) => {
    if (!confirm('Are you sure? This will delete all topics and resources in this week.')) return;
    
    try {
      const response = await fetch(`${BACKEND}/curriculum/weeks/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchWeeks();
        fetchTopics();
        fetchResources();
      }
    } catch (error) {
      console.error('Failed to delete week:', error);
    }
  };

  const handleSaveWeek = async (weekData: any) => {
    try {
      const url = editingWeek 
        ? `${BACKEND}/curriculum/weeks/${editingWeek.id}`
        : `${BACKEND}/curriculum/weeks`;
      
      const response = await fetch(url, {
        method: editingWeek ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weekData)
      });

      if (response.ok) {
        setShowWeekModal(false);
        fetchWeeks();
      }
    } catch (error) {
      console.error('Failed to save week:', error);
    }
  };

  const handleCreateTopic = () => {
    setEditingTopic(null);
    setShowTopicModal(true);
  };

  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setShowTopicModal(true);
  };

  const handleDeleteTopic = async (id: string) => {
    if (!confirm('Are you sure? This will delete all resources in this topic.')) return;
    
    try {
      const response = await fetch(`${BACKEND}/curriculum/topics/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchTopics();
        fetchResources();
      }
    } catch (error) {
      console.error('Failed to delete topic:', error);
    }
  };

  const handleSaveTopic = async (topicData: any) => {
    try {
      const url = editingTopic 
        ? `${BACKEND}/curriculum/topics/${editingTopic.id}`
        : `${BACKEND}/curriculum/topics`;
      
      const response = await fetch(url, {
        method: editingTopic ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(topicData)
      });

      if (response.ok) {
        setShowTopicModal(false);
        fetchTopics();
      }
    } catch (error) {
      console.error('Failed to save topic:', error);
    }
  };

  const handleCreateResource = () => {
    setEditingResource(null);
    setShowResourceModal(true);
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setShowResourceModal(true);
  };

  const handleDeleteResource = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    
    try {
      const response = await fetch(`${BACKEND}/curriculum/resources/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchResources();
      }
    } catch (error) {
      console.error('Failed to delete resource:', error);
    }
  };

  const handleSaveResource = async (resourceData: any) => {
    try {
      const url = editingResource 
        ? `${BACKEND}/curriculum/resources/${editingResource.id}`
        : `${BACKEND}/curriculum/resources`;
      
      const response = await fetch(url, {
        method: editingResource ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resourceData)
      });

      if (response.ok) {
        setShowResourceModal(false);
        fetchResources();
      }
    } catch (error) {
      console.error('Failed to save resource:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading curriculum...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Curriculum Management</h1>
              <p className="text-sm text-gray-600 mt-1">Manage course weeks, topics, and learning resources</p>
            </div>
            <Link href="/admin/academy" className="text-gray-600 hover:text-primary text-sm">
              ← Back to Training
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Course Selector */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('weeks')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'weeks'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Weeks ({weeks.length})
              </button>
              <button
                onClick={() => setActiveTab('topics')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'topics'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Topics ({topics.length})
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'resources'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Resources ({resources.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Weeks Tab */}
            {activeTab === 'weeks' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Course Weeks</h2>
                  <button
                    onClick={handleCreateWeek}
                    className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    + Add Week
                  </button>
                </div>

                <div className="space-y-4">
                  {weeks.map(week => (
                    <div key={week.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                              Week {week.weekNumber}
                            </span>
                            <span className="text-sm text-gray-500">{week.phaseTitle}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{week.title}</h3>
                          <p className="text-sm text-gray-600">{week.description}</p>
                          {week.taskList && (
                            <p className="text-xs text-gray-500 mt-2">📋 {week.taskList}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditWeek(week)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteWeek(week.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Topics Tab */}
            {activeTab === 'topics' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Course Topics</h2>
                  <button
                    onClick={handleCreateTopic}
                    className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    + Add Topic
                  </button>
                </div>

                <div className="space-y-4">
                  {topics.map(topic => (
                    <div key={topic.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                              Order: {topic.orderIndex}
                            </span>
                            <span className="text-sm text-gray-500">{topic.weekTitle}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditTopic(topic)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTopic(topic.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Learning Resources</h2>
                  <button
                    onClick={handleCreateResource}
                    className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    + Add Resource
                  </button>
                </div>

                <div className="space-y-4">
                  {resources.map(resource => (
                    <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${
                              resource.type === 'video_syllabus' ? 'bg-purple-100 text-purple-800' :
                              resource.type === 'video_curriculum' ? 'bg-blue-100 text-blue-800' :
                              resource.type === 'video_notes' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {resource.type.replace('_', ' ').toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-500">{resource.topicTitle}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                          {resource.url && (
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                              {resource.url}
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditResource(resource)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteResource(resource.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals would go here - simplified for now */}
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
              {phases.map((phase: Phase) => (
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
              placeholder="Week 1 - TASK LIST of the week"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Practical Exercises</label>
            <input
              type="text"
              value={formData.practicalExercises}
              onChange={(e) => setFormData({...formData, practicalExercises: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
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
              {weeks.map((week: Week) => (
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
              placeholder="1. Introduction to Business Intelligence"
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
    orderIndex: resource?.orderIndex || 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
              {topics.map((topic: Topic) => (
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="https://..."
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
              Save Resource
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
