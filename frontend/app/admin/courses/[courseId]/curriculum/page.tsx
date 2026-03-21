'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Plus, Edit, Trash2, Save, X, ChevronDown, ChevronRight,
  BookOpen, Calendar, FileText, Video, Link as LinkIcon,
  Code, Download, AlertCircle, CheckCircle, Loader
} from 'lucide-react';

interface Resource {
  id: string;
  topicId: string;
  type: string;
  title: string;
  url?: string;
  content?: string;
  orderIndex: number;
}

interface Topic {
  id: string;
  weekId: string;
  title: string;
  orderIndex: number;
  resources: Resource[];
}

interface Week {
  id: string;
  phaseId: string;
  weekNumber: number;
  title: string;
  description?: string;
  topics: Topic[];
}

interface Phase {
  id: string;
  courseId: string;
  phaseNumber: number;
  title: string;
  description: string;
  weeks: Week[];
}

export default function AdminCurriculumPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [phases, setPhases] = useState<Phase[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  // Modal states
  const [showPhaseModal, setShowPhaseModal] = useState(false);
  const [showWeekModal, setShowWeekModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);

  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);
  const [editingWeek, setEditingWeek] = useState<Week | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('');
  const [selectedWeekId, setSelectedWeekId] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');

  useEffect(() => {
    fetchCurriculum();
  }, [courseId]);

  const fetchCurriculum = async () => {
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const response = await fetch(`${BACKEND}/curriculum/courses/${courseId}`, {
        headers: { 'X-Session-Token': token || '' },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setPhases(data);
      } else {
        setError('Failed to load curriculum');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const toggleWeek = (weekId: string) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(weekId)) {
      newExpanded.delete(weekId);
    } else {
      newExpanded.add(weekId);
    }
    setExpandedWeeks(newExpanded);
  };

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  // Phase CRUD
  const handleCreatePhase = () => {
    setEditingPhase(null);
    setShowPhaseModal(true);
  };

  const handleEditPhase = (phase: Phase) => {
    setEditingPhase(phase);
    setShowPhaseModal(true);
  };

  const handleSavePhase = async (formData: any) => {
    setSaving(true);
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const url = editingPhase 
        ? `${BACKEND}/phases/${editingPhase.id}`
        : `${BACKEND}/phases`;
      
      const method = editingPhase ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: JSON.stringify({ ...formData, courseId })
      });

      if (response.ok) {
        setSuccess('Phase saved successfully');
        setShowPhaseModal(false);
        fetchCurriculum();
      } else {
        setError('Failed to save phase');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePhase = async (phaseId: string) => {
    if (!confirm('Are you sure? This will delete all weeks, topics, and resources in this phase.')) {
      return;
    }

    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const response = await fetch(`${BACKEND}/phases/${phaseId}`, {
        method: 'DELETE',
        headers: { 'X-Session-Token': token || '' },
        credentials: 'include'
      });

      if (response.ok) {
        setSuccess('Phase deleted successfully');
        fetchCurriculum();
      } else {
        setError('Failed to delete phase');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  // Week CRUD
  const handleCreateWeek = (phaseId: string) => {
    setSelectedPhaseId(phaseId);
    setEditingWeek(null);
    setShowWeekModal(true);
  };

  const handleEditWeek = (week: Week) => {
    setEditingWeek(week);
    setShowWeekModal(true);
  };

  const handleSaveWeek = async (formData: any) => {
    setSaving(true);
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const url = editingWeek 
        ? `${BACKEND}/weeks/${editingWeek.id}`
        : `${BACKEND}/weeks`;
      
      const method = editingWeek ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: JSON.stringify({ ...formData, phaseId: selectedPhaseId })
      });

      if (response.ok) {
        setSuccess('Week saved successfully');
        setShowWeekModal(false);
        fetchCurriculum();
      } else {
        setError('Failed to save week');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteWeek = async (weekId: string) => {
    if (!confirm('Are you sure? This will delete all topics and resources in this week.')) {
      return;
    }

    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const response = await fetch(`${BACKEND}/weeks/${weekId}`, {
        method: 'DELETE',
        headers: { 'X-Session-Token': token || '' },
        credentials: 'include'
      });

      if (response.ok) {
        setSuccess('Week deleted successfully');
        fetchCurriculum();
      } else {
        setError('Failed to delete week');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  // Topic CRUD
  const handleCreateTopic = (weekId: string) => {
    setSelectedWeekId(weekId);
    setEditingTopic(null);
    setShowTopicModal(true);
  };

  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setShowTopicModal(true);
  };

  const handleSaveTopic = async (formData: any) => {
    setSaving(true);
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const url = editingTopic 
        ? `${BACKEND}/topics/${editingTopic.id}`
        : `${BACKEND}/topics`;
      
      const method = editingTopic ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: JSON.stringify({ ...formData, weekId: selectedWeekId })
      });

      if (response.ok) {
        setSuccess('Topic saved successfully');
        setShowTopicModal(false);
        fetchCurriculum();
      } else {
        setError('Failed to save topic');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    if (!confirm('Are you sure? This will delete all resources in this topic.')) {
      return;
    }

    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const response = await fetch(`${BACKEND}/topics/${topicId}`, {
        method: 'DELETE',
        headers: { 'X-Session-Token': token || '' },
        credentials: 'include'
      });

      if (response.ok) {
        setSuccess('Topic deleted successfully');
        fetchCurriculum();
      } else {
        setError('Failed to delete topic');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  // Resource CRUD
  const handleCreateResource = (topicId: string) => {
    setSelectedTopicId(topicId);
    setEditingResource(null);
    setShowResourceModal(true);
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setShowResourceModal(true);
  };

  const handleSaveResource = async (formData: any) => {
    setSaving(true);
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const url = editingResource 
        ? `${BACKEND}/resources/${editingResource.id}`
        : `${BACKEND}/resources`;
      
      const method = editingResource ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: JSON.stringify({ ...formData, topicId: selectedTopicId })
      });

      if (response.ok) {
        setSuccess('Resource saved successfully');
        setShowResourceModal(false);
        fetchCurriculum();
      } else {
        setError('Failed to save resource');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) {
      return;
    }

    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const response = await fetch(`${BACKEND}/resources/${resourceId}`, {
        method: 'DELETE',
        headers: { 'X-Session-Token': token || '' },
        credentials: 'include'
      });

      if (response.ok) {
        setSuccess('Resource deleted successfully');
        fetchCurriculum();
      } else {
        setError('Failed to delete resource');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading curriculum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Course Curriculum Management</h1>
              <p className="text-gray-600">Manage phases, weeks, topics, and resources</p>
            </div>
            <button
              onClick={handleCreatePhase}
              className="px-6 py-3 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Phase
            </button>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <p className="text-red-800">{error}</p>
            <button onClick={() => setError('')} className="ml-auto text-red-600 hover:text-red-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <p className="text-green-800">{success}</p>
            <button onClick={() => setSuccess('')} className="ml-auto text-green-600 hover:text-green-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Curriculum Tree */}
        <div className="space-y-6">
          {phases.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Curriculum Yet</h3>
              <p className="text-gray-600 mb-6">Start by creating your first phase</p>
              <button
                onClick={handleCreatePhase}
                className="px-8 py-3 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
              >
                Create First Phase
              </button>
            </div>
          ) : (
            phases.map((phase) => (
              <div key={phase.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Phase Header */}
                <div className="bg-gradient-to-r from-primary to-red-600 p-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => togglePhase(phase.id)}
                      className="flex items-center gap-4 flex-1 text-left"
                    >
                      {expandedPhases.has(phase.id) ? (
                        <ChevronDown className="w-6 h-6 text-white" />
                      ) : (
                        <ChevronRight className="w-6 h-6 text-white" />
                      )}
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{phase.phaseNumber}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                        <p className="text-white/90">{phase.description}</p>
                      </div>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditPhase(phase)}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => handleDeletePhase(phase.id)}
                        className="p-2 bg-white/20 hover:bg-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Weeks */}
                {expandedPhases.has(phase.id) && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-900">Weeks</h4>
                      <button
                        onClick={() => handleCreateWeek(phase.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Week
                      </button>
                    </div>

                    {phase.weeks.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No weeks yet. Add your first week.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {phase.weeks.map((week) => (
                          <div key={week.id} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                            {/* Week Header */}
                            <div className="bg-gray-50 p-4">
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => toggleWeek(week.id)}
                                  className="flex items-center gap-3 flex-1 text-left"
                                >
                                  {expandedWeeks.has(week.id) ? (
                                    <ChevronDown className="w-5 h-5 text-gray-600" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                  )}
                                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                                    W{week.weekNumber}
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-bold text-gray-900">{week.title}</h5>
                                    {week.description && (
                                      <p className="text-sm text-gray-600">{week.description}</p>
                                    )}
                                  </div>
                                </button>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleEditWeek(week)}
                                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                  >
                                    <Edit className="w-4 h-4 text-gray-600" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteWeek(week.id)}
                                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Topics */}
                            {expandedWeeks.has(week.id) && (
                              <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h6 className="font-semibold text-gray-900">Topics</h6>
                                  <button
                                    onClick={() => handleCreateTopic(week.id)}
                                    className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors flex items-center gap-1"
                                  >
                                    <Plus className="w-3 h-3" />
                                    Add Topic
                                  </button>
                                </div>

                                {week.topics.length === 0 ? (
                                  <div className="text-center py-6 text-gray-500 text-sm">
                                    <FileText className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                                    <p>No topics yet.</p>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    {week.topics.map((topic) => (
                                      <div key={topic.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                        {/* Topic Header */}
                                        <div className="bg-white p-3">
                                          <div className="flex items-center justify-between">
                                            <button
                                              onClick={() => toggleTopic(topic.id)}
                                              className="flex items-center gap-2 flex-1 text-left"
                                            >
                                              {expandedTopics.has(topic.id) ? (
                                                <ChevronDown className="w-4 h-4 text-gray-600" />
                                              ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-600" />
                                              )}
                                              <span className="font-medium text-gray-900">{topic.title}</span>
                                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                {topic.resources.length} resources
                                              </span>
                                            </button>
                                            <div className="flex items-center gap-1">
                                              <button
                                                onClick={() => handleEditTopic(topic)}
                                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                              >
                                                <Edit className="w-3 h-3 text-gray-600" />
                                              </button>
                                              <button
                                                onClick={() => handleDeleteTopic(topic.id)}
                                                className="p-1 hover:bg-red-50 rounded transition-colors"
                                              >
                                                <Trash2 className="w-3 h-3 text-red-600" />
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Resources */}
                                        {expandedTopics.has(topic.id) && (
                                          <div className="bg-gray-50 p-3 border-t border-gray-200">
                                            <div className="flex items-center justify-between mb-2">
                                              <span className="text-xs font-semibold text-gray-700">Resources</span>
                                              <button
                                                onClick={() => handleCreateResource(topic.id)}
                                                className="px-2 py-1 bg-purple-500 text-white rounded text-xs font-semibold hover:bg-purple-600 transition-colors flex items-center gap-1"
                                              >
                                                <Plus className="w-3 h-3" />
                                                Add
                                              </button>
                                            </div>

                                            {topic.resources.length === 0 ? (
                                              <p className="text-xs text-gray-500 text-center py-2">No resources</p>
                                            ) : (
                                              <div className="space-y-1">
                                                {topic.resources.map((resource) => (
                                                  <div key={resource.id} className="flex items-center justify-between bg-white p-2 rounded">
                                                    <div className="flex items-center gap-2 flex-1">
                                                      {resource.type === 'video' && <Video className="w-3 h-3 text-purple-600" />}
                                                      {resource.type === 'reading' && <FileText className="w-3 h-3 text-blue-600" />}
                                                      {resource.type === 'code' && <Code className="w-3 h-3 text-green-600" />}
                                                      {resource.type === 'link' && <LinkIcon className="w-3 h-3 text-orange-600" />}
                                                      {resource.type === 'download' && <Download className="w-3 h-3 text-red-600" />}
                                                      <span className="text-xs text-gray-900">{resource.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                      <button
                                                        onClick={() => handleEditResource(resource)}
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                      >
                                                        <Edit className="w-3 h-3 text-gray-600" />
                                                      </button>
                                                      <button
                                                        onClick={() => handleDeleteResource(resource.id)}
                                                        className="p-1 hover:bg-red-50 rounded"
                                                      >
                                                        <Trash2 className="w-3 h-3 text-red-600" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals would go here - Phase, Week, Topic, Resource forms */}
      {/* For brevity, modal implementations are omitted but would include form fields for each entity */}
    </div>
  );
}
