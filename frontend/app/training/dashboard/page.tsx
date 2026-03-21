"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EnrolledCourse {
  id: string;
  courseId: string;
  courseName: string;
  courseSlug: string;
  category: string;
  thumbnail: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: string;
  nextLesson: string;
  instructor: string;
  enrolledDate: string;
  certificateEarned: boolean;
}

interface UpcomingClass {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  meetingLink: string;
  type: 'live' | 'group';
  status: 'upcoming' | 'live' | 'completed';
}

interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  maxGrade: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCoursesCount: number;
  completedCoursesCount: number;
  certificatesCount: number;
  totalLearningHours: number;
}

const getCourseIcon = (category: string) => {
  const icons: { [key: string]: JSX.Element } = {
    'Application Development': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    'Cloud Computing': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    'Data Analytics': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    'Database': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
    'Development': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    'Integration': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
    'Testing': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  };
  return icons[category] || icons['Development'];
};

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'schedule' | 'assignments'>('overview');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('session-token');
      if (!token) {
        router.push('/login');
        return;
      }

      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const response = await fetch(`${BACKEND}/auth/check`, {
        headers: { 'X-Session-Token': token },
        credentials: 'include'
      });

      if (!response.ok) {
        localStorage.removeItem('session-token');
        router.push('/login');
        return;
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      
      // Fetch enrolled courses, upcoming classes, and assignments
      const [coursesRes, classesRes, assignmentsRes] = await Promise.all([
        fetch(`${BACKEND}/student/enrolled-courses`, {
          headers: { 'X-Session-Token': token || '' }
        }),
        fetch(`${BACKEND}/student/upcoming-classes`, {
          headers: { 'X-Session-Token': token || '' }
        }),
        fetch(`${BACKEND}/student/assignments`, {
          headers: { 'X-Session-Token': token || '' }
        })
      ]);

      if (coursesRes.ok) {
        const data = await coursesRes.json();
        setEnrolledCourses(Array.isArray(data) ? data : getMockEnrolledCourses());
      } else {
        setEnrolledCourses(getMockEnrolledCourses());
      }

      if (classesRes.ok) {
        const data = await classesRes.json();
        setUpcomingClasses(Array.isArray(data) ? data : getMockUpcomingClasses());
      } else {
        setUpcomingClasses(getMockUpcomingClasses());
      }

      if (assignmentsRes.ok) {
        const data = await assignmentsRes.json();
        setAssignments(Array.isArray(data) ? data : getMockAssignments());
      } else {
        setAssignments(getMockAssignments());
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Use mock data for development
      setEnrolledCourses(getMockEnrolledCourses());
      setUpcomingClasses(getMockUpcomingClasses());
      setAssignments(getMockAssignments());
    }
  };

  // Mock data functions for development
  const getMockEnrolledCourses = (): EnrolledCourse[] => [
    {
      id: '1',
      courseId: 'app-dev-2026',
      courseName: 'AI-Powered Application Development',
      courseSlug: 'ai-powered-app-dev',
      category: 'Application Development',
      thumbnail: '/course-thumbnails/app-dev.jpg',
      progress: 65,
      completedLessons: 26,
      totalLessons: 40,
      lastAccessed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      nextLesson: 'Phase 3: Building REST APIs with Express.js',
      instructor: 'Jean-Aime Akilimali',
      enrolledDate: '2026-02-15',
      certificateEarned: false
    },
    {
      id: '2',
      courseId: 'cloud-computing',
      courseName: 'Cloud Computing Fundamentals',
      courseSlug: 'cloud-computing',
      category: 'Cloud Computing',
      thumbnail: '/course-thumbnails/cloud.jpg',
      progress: 30,
      completedLessons: 9,
      totalLessons: 30,
      lastAccessed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      nextLesson: 'AWS EC2 Instance Setup',
      instructor: 'Sarah Johnson',
      enrolledDate: '2026-03-01',
      certificateEarned: false
    }
  ];

  const getMockUpcomingClasses = (): UpcomingClass[] => [
    {
      id: '1',
      title: 'Live Class: React State Management',
      courseId: 'app-dev-2026',
      courseName: 'AI-Powered Application Development',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      time: '10:00 AM EST',
      duration: '2 hours',
      instructor: 'Jean-Aime Akilimali',
      meetingLink: 'https://zoom.us/j/123456789',
      type: 'live',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Group Session: Project Review',
      courseId: 'app-dev-2026',
      courseName: 'AI-Powered Application Development',
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      time: '1:00 PM EST',
      duration: '2 hours',
      instructor: 'Jean-Aime Akilimali',
      meetingLink: 'https://zoom.us/j/987654321',
      type: 'group',
      status: 'upcoming'
    }
  ];

  const getMockAssignments = (): Assignment[] => [
    {
      id: '1',
      title: 'Build a Todo App with React',
      courseId: 'app-dev-2026',
      courseName: 'AI-Powered Application Development',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      maxGrade: 100
    },
    {
      id: '2',
      title: 'Deploy Application to AWS',
      courseId: 'cloud-computing',
      courseName: 'Cloud Computing Fundamentals',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      maxGrade: 100
    },
    {
      id: '3',
      title: 'JavaScript Fundamentals Quiz',
      courseId: 'app-dev-2026',
      courseName: 'AI-Powered Application Development',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'graded',
      grade: 92,
      maxGrade: 100
    }
  ];

  const handleLogout = async () => {
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      await fetch(`${BACKEND}/auth/logout`, { 
        method: 'POST', 
        credentials: 'include' 
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('session-token');
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return formatDate(dateString);
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3 group">
                <img 
                  src="/jascomelogo.png" 
                  alt="JACOM Logo" 
                  className="h-12 w-auto transition-transform group-hover:scale-105"
                />
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === 'overview' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === 'courses' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  My Courses
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === 'schedule' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Schedule
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === 'assignments' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Assignments
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/training" className="text-gray-600 hover:text-primary text-sm font-medium hidden sm:block">
                Browse Courses
              </Link>
              <div className="flex items-center gap-3 border-l pl-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-700 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden lg:block text-sm">
                  <div className="font-semibold text-gray-900">{user?.name}</div>
                  <div className="text-gray-500 text-xs">{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-gray-600">Continue your learning journey and track your progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-primary transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{enrolledCourses.length}</div>
            <div className="text-sm text-gray-600">Enrolled Courses</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-primary transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {enrolledCourses.reduce((sum, c) => sum + c.completedLessons, 0)}
            </div>
            <div className="text-sm text-gray-600">Lessons Completed</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-primary transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{upcomingClasses.length}</div>
            <div className="text-sm text-gray-600">Upcoming Classes</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-primary transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {assignments.filter(a => a.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending Assignments</div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Continue Learning */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
                <button onClick={() => setActiveTab('courses')} className="text-primary hover:text-red-700 font-medium text-sm flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {enrolledCourses.slice(0, 2).map(course => (
                  <div key={course.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-primary transition-all hover:shadow-xl group">
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-red-700/10 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          {getCourseIcon(course.category)}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-900 shadow-md">
                          {course.progress}% Complete
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">{course.category}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{course.courseName}</h3>
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-red-700 h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Next:</span> {course.nextLesson}
                        </div>
                      </div>
                      <Link
                        href={`/training/course/${course.courseSlug}`}
                        className="mt-4 w-full bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2 group"
                      >
                        Continue Learning
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Classes */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Classes</h2>
                <button onClick={() => setActiveTab('schedule')} className="text-primary hover:text-red-700 font-medium text-sm flex items-center gap-1">
                  View Schedule
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingClasses.slice(0, 2).map(classItem => {
                  const daysUntil = getDaysUntil(classItem.date);
                  return (
                    <div key={classItem.id} className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-primary transition-all hover:shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              classItem.type === 'live' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {classItem.type === 'live' ? '🔴 Live Class' : '👥 Group Session'}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{classItem.title}</h3>
                          <p className="text-sm text-gray-600">{classItem.courseName}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(classItem.date)} • {classItem.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {classItem.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {classItem.instructor}
                        </div>
                      </div>
                      {daysUntil <= 1 && (
                        <a
                          href={classItem.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Join Meeting
                        </a>
                      )}
                      {daysUntil > 1 && (
                        <div className="text-center py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-600">
                          Starts in {daysUntil} days
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Recent Assignments */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Assignments</h2>
                <button onClick={() => setActiveTab('assignments')} className="text-primary hover:text-red-700 font-medium text-sm flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                {assignments.slice(0, 3).map((assignment, index) => (
                  <div key={assignment.id} className={`p-6 hover:bg-gray-50 transition-colors ${
                    index !== assignments.slice(0, 3).length - 1 ? 'border-b border-gray-200' : ''
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            assignment.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {assignment.status === 'pending' ? '⏳ Pending' :
                             assignment.status === 'submitted' ? '📤 Submitted' :
                             `✅ ${assignment.grade}/${assignment.maxGrade}`}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{assignment.courseName}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Due: {formatDate(assignment.dueDate)}
                          </span>
                          {assignment.status === 'pending' && getDaysUntil(assignment.dueDate) < 0 && (
                            <span className="text-red-600 font-semibold">Overdue</span>
                          )}
                        </div>
                      </div>
                      {assignment.status === 'pending' && (
                        <Link
                          href={`/training/assignment/${assignment.id}`}
                          className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all hover:shadow-lg"
                        >
                          Submit
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab === 'courses' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-primary transition-all">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        {getCourseIcon(course.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.category}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{course.completedLessons} / {course.totalLessons} lessons</span>
                      <span>{course.duration}</span>
                    </div>

                    <Link
                      href={`/training/course/${course.slug}`}
                      className="block w-full bg-primary hover:bg-red-700 text-white text-center px-4 py-2 rounded-lg font-semibold transition"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Class Schedule</h2>
            <div className="space-y-4">
              {upcomingClasses.map(classItem => (
                <div key={classItem.id} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">{classItem.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {classItem.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {classItem.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          {classItem.type}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      classItem.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                      classItem.status === 'live' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {classItem.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Assignments</h2>
            <div className="space-y-4">
              {assignments.map(assignment => (
                <div key={assignment.id} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">{assignment.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{assignment.course}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Due: {assignment.dueDate}
                        </span>
                        {assignment.grade && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Grade: {assignment.grade}%
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      assignment.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                      assignment.status === 'graded' ? 'bg-green-100 text-green-700' :
                      assignment.status === 'overdue' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {assignment.status.toUpperCase()}
                    </span>
                  </div>
                  {assignment.status === 'pending' && (
                    <button className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                      Submit Assignment
                    </button>
                  )}
                  {assignment.status === 'graded' && assignment.feedback && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Instructor Feedback:</p>
                      <p className="text-sm text-gray-600">{assignment.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
