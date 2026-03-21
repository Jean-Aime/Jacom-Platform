'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MegaMenuHeader from '@/components/Header/MegaMenuHeader';
import Footer from '@/components/Footer/Footer';
import { 
  BookOpen, Lock, CheckCircle, Clock, Users, 
  Award, ArrowRight, Calendar, DollarSign, Sparkles,
  Target, TrendingUp, Star, Zap, Shield, Play,
  FileText, Video, Code, Download, ExternalLink,
  ChevronDown, ChevronRight, AlertCircle, Unlock
} from 'lucide-react';

interface Resource {
  id: string;
  type: string;
  title: string;
  url?: string;
  content?: string;
  orderIndex: number;
}

interface Topic {
  id: string;
  title: string;
  orderIndex: number;
  resources: Resource[];
  progress: {
    status: 'locked' | 'not_started' | 'in_progress' | 'completed';
    completedAt: string | null;
  };
  isUnlocked: boolean;
}

interface Week {
  id: string;
  weekNumber: number;
  title: string;
  description?: string;
  topics: Topic[];
}

interface Phase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  weeks: Week[];
}

interface Course {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  phases: Phase[];
  progress: {
    totalTopics: number;
    completedTopics: number;
    percentage: number;
    isComplete: boolean;
  };
}

export default function CourseLearnPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());
  const [completingTopic, setCompletingTopic] = useState(false);

  useEffect(() => {
    fetchFullCurriculum();
  }, [courseId]);

  const fetchFullCurriculum = async () => {
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const response = await fetch(`${BACKEND}/student-progress/courses/${courseId}/curriculum`, {
        headers: {
          'X-Session-Token': token || ''
        },
        credentials: 'include'
      });
      
      const data = await response.json();

      if (data.success) {
        setCourse(data.course);
        // Auto-expand first phase and week
        if (data.course.phases.length > 0) {
          setExpandedPhases(new Set([data.course.phases[0].id]));
          if (data.course.phases[0].weeks.length > 0) {
            setExpandedWeeks(new Set([data.course.phases[0].weeks[0].id]));
          }
        }
      } else {
        setError(data.error || 'Failed to load curriculum');
      }
    } catch (err) {
      setError('Network error. Please try again.');
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

  const handleTopicClick = (topic: Topic) => {
    if (!topic.isUnlocked) {
      return;
    }
    setSelectedTopic(topic);
  };

  const handleMarkComplete = async (topicId: string) => {
    setCompletingTopic(true);
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');
      
      const response = await fetch(`${BACKEND}/student-progress/topics/${topicId}/complete`, {
        method: 'POST',
        headers: {
          'X-Session-Token': token || ''
        },
        credentials: 'include'
      });
      
      const data = await response.json();

      if (data.success) {
        // Refresh curriculum to update progress and unlock next topic
        await fetchFullCurriculum();
        setSelectedTopic(null);
      } else {
        alert(data.error || 'Failed to mark topic as complete');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setCompletingTopic(false);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'reading': return FileText;
      case 'code': return Code;
      case 'download': return Download;
      default: return FileText;
    }
  };

  if (loading) {
    return (
      <>
        <MegaMenuHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your course...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !course) {
    return (
      <>
        <MegaMenuHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">{error || 'You must be enrolled to access this course'}</p>
            <button
              onClick={() => router.push('/training')}
              className="px-8 py-3 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
            >
              Back to Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MegaMenuHeader />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black py-12 border-b-4 border-primary">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{course.name}</h1>
                <p className="text-gray-300">{course.description}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">{course.progress.percentage}%</div>
                  <div className="text-sm text-gray-300">Complete</div>
                  <div className="mt-3 text-xs text-gray-400">
                    {course.progress.completedTopics} / {course.progress.totalTopics} Topics
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${course.progress.percentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Curriculum Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg sticky top-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Curriculum
                  </h2>
                </div>
                
                <div className="p-4">
                  {course.phases.map((phase) => (
                    <div key={phase.id} className="mb-4">
                      {/* Phase Header */}
                      <button
                        onClick={() => togglePhase(phase.id)}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-red-50 rounded-xl hover:from-primary/20 hover:to-red-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {phase.phaseNumber}
                          </div>
                          <span className="font-bold text-gray-900 text-left">{phase.title}</span>
                        </div>
                        {expandedPhases.has(phase.id) ? (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        )}
                      </button>

                      {/* Weeks */}
                      {expandedPhases.has(phase.id) && (
                        <div className="ml-4 mt-2 space-y-2">
                          {phase.weeks.map((week) => (
                            <div key={week.id}>
                              {/* Week Header */}
                              <button
                                onClick={() => toggleWeek(week.id)}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                    W{week.weekNumber}
                                  </div>
                                  <span className="font-semibold text-gray-800 text-sm text-left">{week.title}</span>
                                </div>
                                {expandedWeeks.has(week.id) ? (
                                  <ChevronDown className="w-4 h-4 text-gray-600" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-gray-600" />
                                )}
                              </button>

                              {/* Topics */}
                              {expandedWeeks.has(week.id) && (
                                <div className="ml-6 mt-2 space-y-1">
                                  {week.topics.map((topic) => (
                                    <button
                                      key={topic.id}
                                      onClick={() => handleTopicClick(topic)}
                                      disabled={!topic.isUnlocked}
                                      className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all ${
                                        topic.progress.status === 'completed'
                                          ? 'bg-green-50 text-green-900'
                                          : topic.isUnlocked
                                          ? 'bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-900'
                                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                      } ${selectedTopic?.id === topic.id ? 'ring-2 ring-primary' : ''}`}
                                    >
                                      {topic.progress.status === 'completed' ? (
                                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                      ) : topic.isUnlocked ? (
                                        <Unlock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                      ) : (
                                        <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                      )}
                                      <span className="text-sm flex-1">{topic.title}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-2">
              {selectedTopic ? (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Topic Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">{selectedTopic.title}</h2>
                        {selectedTopic.progress.status === 'completed' && (
                          <div className="inline-flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full text-sm font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedTopic(null)}
                        className="text-white/80 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Learning Materials</h3>
                    
                    {selectedTopic.resources.length > 0 ? (
                      <div className="space-y-4">
                        {selectedTopic.resources.map((resource) => {
                          const Icon = getResourceIcon(resource.type);
                          return (
                            <div key={resource.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary/50 transition-colors">
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-900 text-lg mb-2">{resource.title}</h4>
                                  {resource.content && (
                                    <div className="prose prose-sm max-w-none text-gray-600 mb-4">
                                      {resource.content}
                                    </div>
                                  )}
                                  {resource.url && (
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-primary hover:text-red-700 font-semibold"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      Open Resource
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>No resources available for this topic yet.</p>
                      </div>
                    )}

                    {/* Mark Complete Button */}
                    {selectedTopic.progress.status !== 'completed' && (
                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <button
                          onClick={() => handleMarkComplete(selectedTopic.id)}
                          disabled={completingTopic}
                          className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {completingTopic ? (
                            <>
                              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                              Marking Complete...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-6 h-6" />
                              Mark as Complete
                            </>
                          )}
                        </button>
                        <p className="text-sm text-gray-500 text-center mt-3">
                          Complete this topic to unlock the next one
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Select a Topic to Begin</h3>
                    <p className="text-gray-600 mb-6">
                      Choose a topic from the curriculum on the left to start learning. You must complete topics in order.
                    </p>
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-left">
                          <p className="font-semibold text-blue-900 mb-1">Sequential Learning</p>
                          <p className="text-sm text-blue-700">
                            Topics are unlocked one at a time. Complete each topic to unlock the next.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
