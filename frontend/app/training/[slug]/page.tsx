"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

interface Resource {
  id: string;
  type: 'video_syllabus' | 'video_curriculum' | 'video_notes' | 'webaccess';
  title: string;
  url?: string;
  content?: string;
}

interface Topic {
  id: string;
  title: string;
  resources: Resource[];
}

interface Week {
  id: string;
  weekNumber: number;
  title: string;
  description?: string;
  topics: Topic[];
  taskList?: string;
  practicalExercises?: string;
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
  slug: string;
  category: string;
  description: string;
  fullDescription?: string;
  phases: Phase[];
}

const getResourceIcon = (type: string) => {
  const icons: { [key: string]: JSX.Element } = {
    'video_syllabus': <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>,
    'video_curriculum': <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>,
    'video_notes': <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
    'webaccess': <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" /></svg>
  };
  return icons[type] || icons['video_curriculum'];
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['phase-1']));
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set(['week-1-1']));
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCourseDetails();
  }, [slug]);

  const fetchCourseDetails = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const url = `${BACKEND}/courses/${slug}`;
      
      console.log('Fetching course from:', url);
      
      const response = await fetch(url, {
        headers: {
          'X-Session-Token': token || '',
        },
        credentials: 'include'
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Course data:', data);
        setCourse(data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', response.status, errorData);
        if (response.status === 401) {
          localStorage.removeItem('session-token');
          window.location.href = '/login';
        }
      }
    } catch (error) {
      console.error('Failed to fetch course details:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(phaseId)) {
        newSet.delete(phaseId);
      } else {
        newSet.add(phaseId);
      }
      return newSet;
    });
  };

  const toggleWeek = (weekId: string) => {
    setExpandedWeeks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(weekId)) {
        newSet.delete(weekId);
      } else {
        newSet.add(weekId);
      }
      return newSet;
    });
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <>
        <MegaMenuHeader />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
            <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
            <a href="/training" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              Back to Courses
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MegaMenuHeader />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Course Header */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-semibold mb-4">
                  {course.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{course.name}</h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-4xl">
                  {course.fullDescription || course.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Course Curriculum */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-6">
              {course.phases && course.phases.length > 0 ? (
                course.phases.map((phase) => {
                  const phaseId = `phase-${phase.phaseNumber}`;
                  const isPhaseExpanded = expandedPhases.has(phaseId);

                  return (
                    <div key={phase.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                      {/* Phase Header */}
                      <button
                        onClick={() => togglePhase(phaseId)}
                        className="w-full bg-gradient-to-r from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 px-6 py-4 flex items-center justify-between transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h2 className="text-xl font-bold text-gray-900">{phase.title}</h2>
                            <p className="text-sm text-gray-600 mt-1">{phase.description}</p>
                          </div>
                        </div>
                        <svg 
                          className={`w-6 h-6 text-gray-600 transition-transform ${isPhaseExpanded ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Phase Content */}
                      {isPhaseExpanded && (
                        <div className="p-6 space-y-4">
                          {phase.weeks && phase.weeks.map((week) => {
                            const weekId = `week-${phase.phaseNumber}-${week.weekNumber}`;
                            const isWeekExpanded = expandedWeeks.has(weekId);

                            return (
                              <div key={week.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                {/* Week Header */}
                                <button
                                  onClick={() => toggleWeek(weekId)}
                                  className="w-full bg-orange-50 hover:bg-orange-100 px-4 py-3 flex items-center justify-between transition-all"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-900">
                                      Week {week.weekNumber}: {week.title}
                                    </span>
                                  </div>
                                  <svg 
                                    className={`w-5 h-5 text-gray-600 transition-transform ${isWeekExpanded ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>

                                {/* Week Content */}
                                {isWeekExpanded && (
                                  <div className="bg-white p-4 space-y-3">
                                    {/* Task List & Practical Exercises */}
                                    {week.taskList && (
                                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <div className="flex items-center gap-2 mb-2">
                                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                          </svg>
                                          <span className="text-sm font-semibold text-gray-900">{week.taskList}</span>
                                        </div>
                                      </div>
                                    )}

                                    {week.practicalExercises && (
                                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <div className="flex items-center gap-2 mb-2">
                                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                                          </svg>
                                          <span className="text-sm font-semibold text-gray-900">{week.practicalExercises}</span>
                                        </div>
                                      </div>
                                    )}

                                    {/* Topics */}
                                    {week.topics && week.topics.map((topic) => {
                                      const topicId = `topic-${topic.id}`;
                                      const isTopicExpanded = expandedTopics.has(topicId);

                                      return (
                                        <div key={topic.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                          {/* Topic Header */}
                                          <button
                                            onClick={() => toggleTopic(topicId)}
                                            className="w-full bg-gray-50 hover:bg-gray-100 px-4 py-3 flex items-center justify-between transition-all text-left"
                                          >
                                            <span className="text-sm font-semibold text-gray-900">{topic.title}</span>
                                            <svg 
                                              className={`w-4 h-4 text-gray-600 transition-transform flex-shrink-0 ${isTopicExpanded ? 'rotate-180' : ''}`}
                                              fill="none" 
                                              stroke="currentColor" 
                                              viewBox="0 0 24 24"
                                            >
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                          </button>

                                          {/* Topic Resources */}
                                          {isTopicExpanded && (
                                            <div className="bg-white p-3 space-y-2">
                                              {topic.resources && topic.resources.map((resource) => (
                                                <div 
                                                  key={resource.id}
                                                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all cursor-pointer group"
                                                >
                                                  <div className="flex items-center gap-3">
                                                    {getResourceIcon(resource.type)}
                                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                                      {resource.title}
                                                    </span>
                                                  </div>
                                                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                  </svg>
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
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Course Curriculum Coming Soon</h3>
                  <p className="text-gray-600">The detailed curriculum for this course will be available shortly.</p>
                </div>
              )}
            </div>

            {/* Back Button */}
            <div className="mt-12 text-center">
              <a 
                href="/training" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Courses
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
