'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
  materials: Material[];
  quiz?: Quiz;
}

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'document' | 'code' | 'link';
  url: string;
  size?: string;
}

interface Quiz {
  id: string;
  passingScore: number;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Course {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  instructor: string;
  duration: string;
  price: string;
  discountPrice: string;
  status: 'active' | 'draft' | 'archived';
}

export default function CourseEditorPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'lessons'>('details');
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    order: 1
  });

  const [quizForm, setQuizForm] = useState({
    passingScore: 70,
    questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]
  });

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const [courseRes, lessonsRes] = await Promise.all([
        fetch(`${backendUrl}/api/admin/training/courses/${courseId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/api/admin/training/courses/${courseId}/lessons`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (courseRes.ok && lessonsRes.ok) {
        setCourse(await courseRes.json());
        setLessons(await lessonsRes.json());
      } else {
        useMockData();
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setCourse({
      id: courseId,
      name: 'Full Stack Web Development',
      slug: 'full-stack-web-development',
      category: 'Web Development',
      description: 'Complete web development bootcamp covering frontend and backend',
      instructor: 'John Doe',
      duration: '12 weeks',
      price: '1200',
      discountPrice: '450',
      status: 'active'
    });

    setLessons([
      {
        id: '1',
        title: 'Introduction to Web Development',
        description: 'Overview of web development technologies',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '15:30',
        order: 1,
        materials: []
      },
      {
        id: '2',
        title: 'HTML Fundamentals',
        description: 'Learn HTML basics',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '22:45',
        order: 2,
        materials: [],
        quiz: {
          id: 'q1',
          passingScore: 70,
          questions: [
            {
              id: 'q1-1',
              question: 'What does HTML stand for?',
              options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text'],
              correctAnswer: 0
            }
          ]
        }
      }
    ]);
  };

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      });

      if (response.ok) {
        alert('Course updated successfully!');
      } else {
        alert('Failed to update course');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Error updating course');
    }
  };

  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const method = editingLesson ? 'PUT' : 'POST';
      const url = editingLesson
        ? `${backendUrl}/api/admin/training/lessons/${editingLesson.id}`
        : `${backendUrl}/api/admin/training/courses/${courseId}/lessons`;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...lessonForm, courseId })
      });

      if (response.ok) {
        alert(editingLesson ? 'Lesson updated!' : 'Lesson created!');
        fetchCourseData();
        setShowLessonModal(false);
        setEditingLesson(null);
        setLessonForm({ title: '', description: '', videoUrl: '', duration: '', order: lessons.length + 1 });
      } else {
        alert('Failed to save lesson');
      }
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('Error saving lesson');
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setLessons(lessons.filter(l => l.id !== lessonId));
      } else {
        alert('Failed to delete lesson');
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert('Error deleting lesson');
    }
  };

  const openLessonModal = (lesson?: Lesson) => {
    if (lesson) {
      setEditingLesson(lesson);
      setLessonForm({
        title: lesson.title,
        description: lesson.description,
        videoUrl: lesson.videoUrl,
        duration: lesson.duration,
        order: lesson.order
      });
    } else {
      setEditingLesson(null);
      setLessonForm({ title: '', description: '', videoUrl: '', duration: '', order: lessons.length + 1 });
    }
    setShowLessonModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <Link href="/admin/training" className="text-primary hover:underline">
            Return to Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/training" className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Edit Course</h1>
                <p className="text-sm text-gray-600">{course.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                course.status === 'active' ? 'bg-green-100 text-green-700' :
                course.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {course.status}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'details'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Course Details
            </button>
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'lessons'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Lessons ({lessons.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Course Details Tab */}
        {activeTab === 'details' && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Information</h2>
            <form onSubmit={handleUpdateCourse} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Course Name</label>
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => setCourse({ ...course, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Slug</label>
                <input
                  type="text"
                  value={course.slug}
                  onChange={(e) => setCourse({ ...course, slug: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                <select
                  value={course.category}
                  onChange={(e) => setCourse({ ...course, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                >
                  <option>Web Development</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Mobile Development</option>
                  <option>Data Science</option>
                  <option>DevOps</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  value={course.description}
                  onChange={(e) => setCourse({ ...course, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Instructor</label>
                  <input
                    type="text"
                    value={course.instructor}
                    onChange={(e) => setCourse({ ...course, instructor: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Duration</label>
                  <input
                    type="text"
                    value={course.duration}
                    onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={course.price}
                    onChange={(e) => setCourse({ ...course, price: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Discount Price ($)</label>
                  <input
                    type="number"
                    value={course.discountPrice}
                    onChange={(e) => setCourse({ ...course, discountPrice: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                <select
                  value={course.status}
                  onChange={(e) => setCourse({ ...course, status: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Update Course
              </button>
            </form>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Course Lessons</h2>
              <button
                onClick={() => openLessonModal()}
                className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Lesson
              </button>
            </div>

            <div className="space-y-4">
              {lessons.sort((a, b) => a.order - b.order).map((lesson, index) => (
                <div key={lesson.id} className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-primary transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {lesson.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Video
                        </span>
                        {lesson.quiz && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Quiz ({lesson.quiz.questions.length} questions)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openLessonModal(lesson)}
                        className="px-4 py-2 bg-primary hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold text-sm transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {lessons.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-200">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No lessons yet</h3>
                  <p className="text-gray-600 mb-4">Start building your course by adding lessons</p>
                  <button
                    onClick={() => openLessonModal()}
                    className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add First Lesson
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
            </h3>
            <form onSubmit={handleSaveLesson} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Lesson Title</label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="e.g., Introduction to React"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  value={lessonForm.description}
                  onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  rows={3}
                  placeholder="Lesson description..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Video URL</label>
                <input
                  type="url"
                  value={lessonForm.videoUrl}
                  onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="https://www.youtube.com/embed/..."
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Duration</label>
                  <input
                    type="text"
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="e.g., 15:30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Order</label>
                  <input
                    type="number"
                    value={lessonForm.order}
                    onChange={(e) => setLessonForm({ ...lessonForm, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  {editingLesson ? 'Update Lesson' : 'Create Lesson'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLessonModal(false);
                    setEditingLesson(null);
                    setLessonForm({ title: '', description: '', videoUrl: '', duration: '', order: lessons.length + 1 });
                  }}
                  className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
