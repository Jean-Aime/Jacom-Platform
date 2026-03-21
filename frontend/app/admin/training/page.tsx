'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardStats {
  totalCourses: number;
  activeCourses: number;
  draftCourses: number;
  totalStudents: number;
  activeStudents: number;
  newStudentsThisMonth: number;
  totalRevenue: number;
  revenueThisMonth: number;
  totalEnrollments: number;
  completionRate: number;
  averageRating: number;
  totalAssignments: number;
  pendingGrading: number;
  certificatesIssued: number;
}

interface RecentActivity {
  id: string;
  type: 'enrollment' | 'completion' | 'assignment' | 'payment';
  studentName: string;
  courseName: string;
  timestamp: string;
  details: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  color: string;
}

interface Course {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
  enrolledStudents: number;
  activeStudents: number;
  completionRate: number;
  averageGrade: number;
  revenue: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  lastUpdated: string;
  thumbnail?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: number;
  completedCourses: number;
  totalProgress: number;
  currentCourse?: string;
  lastActive: string;
  joinedDate: string;
  status: 'active' | 'inactive';
  totalSpent: number;
}

export default function AdminTrainingDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'students' | 'analytics'>('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const quickActions: QuickAction[] = [
    {
      title: 'Create Course',
      description: 'Add a new course to the platform',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
      link: '/admin/training/courses/create',
      color: 'blue'
    },
    {
      title: 'Manage Enrollments',
      description: 'Track student enrollments and status',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
      link: '/admin/training/enrollments',
      color: 'green'
    },
    {
      title: 'Payment Management',
      description: 'Track payments, invoices & receipts',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      link: '/admin/training/payments',
      color: 'emerald'
    },
    {
      title: 'Grade Assignments',
      description: 'Review and grade student submissions',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      link: '/admin/training/assignments',
      color: 'purple'
    },
    {
      title: 'Send Notifications',
      description: 'Communicate with students & instructors',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
      link: '/admin/training/notifications',
      color: 'yellow'
    },
    {
      title: 'View Analytics',
      description: 'Track performance and revenue',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      link: '/admin/training/analytics',
      color: 'orange'
    },
    {
      title: 'Manage Instructors',
      description: 'Add and manage instructor profiles',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
      link: '/admin/training/instructors',
      color: 'indigo'
    },
    {
      title: 'Issue Certificates',
      description: 'Generate and manage certificates',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
      link: '/admin/training/certificates',
      color: 'red'
    },
    {
      title: 'Browse Courses',
      description: 'View all available courses',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      link: '/training/courses',
      color: 'teal'
    }
  ];

  useEffect(() => {
    checkAdminAuth();
    fetchDashboardData();
  }, []);

  const checkAdminAuth = () => {
    const token = localStorage.getItem('session-token');
    if (!token) {
      router.push('/login');
      return;
    }
    // In production, verify admin role from token
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const [statsRes, coursesRes, studentsRes] = await Promise.all([
        fetch(`${backendUrl}/api/admin/training/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/api/admin/training/courses`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/api/admin/training/students`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (statsRes.ok && coursesRes.ok && studentsRes.ok) {
        setStats(await statsRes.json());
        setCourses(await coursesRes.json());
        setStudents(await studentsRes.json());
      } else {
        useMockData();
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setStats({
      totalCourses: 8,
      activeCourses: 6,
      draftCourses: 2,
      totalStudents: 145,
      activeStudents: 128,
      newStudentsThisMonth: 23,
      totalRevenue: 125450,
      revenueThisMonth: 28900,
      totalEnrollments: 342,
      completionRate: 68,
      averageRating: 4.7,
      totalAssignments: 45,
      pendingGrading: 12,
      certificatesIssued: 87
    });

    setRecentActivity([
      {
        id: '1',
        type: 'enrollment',
        studentName: 'Alice Johnson',
        courseName: 'Full Stack Web Development',
        timestamp: '2024-03-18T08:30:00',
        details: 'New enrollment'
      },
      {
        id: '2',
        type: 'completion',
        studentName: 'Bob Smith',
        courseName: 'React & Next.js Mastery',
        timestamp: '2024-03-18T07:15:00',
        details: 'Course completed with 95% grade'
      },
      {
        id: '3',
        type: 'assignment',
        studentName: 'Carol White',
        courseName: 'Node.js Backend Development',
        timestamp: '2024-03-18T06:45:00',
        details: 'Assignment submitted'
      },
      {
        id: '4',
        type: 'payment',
        studentName: 'David Brown',
        courseName: 'Python for Data Science',
        timestamp: '2024-03-17T22:30:00',
        details: 'Payment received: $425'
      },
      {
        id: '5',
        type: 'enrollment',
        studentName: 'Emma Davis',
        courseName: 'DevOps & Cloud Infrastructure',
        timestamp: '2024-03-17T20:10:00',
        details: 'New enrollment'
      }
    ]);

    setCourses([
      {
        id: '1',
        name: 'Full Stack Web Development',
        slug: 'full-stack-web-development',
        category: 'Web Development',
        description: 'Complete web development bootcamp covering frontend and backend',
        instructor: 'John Doe',
        totalLessons: 45,
        completedLessons: 1250,
        enrolledStudents: 89,
        activeStudents: 76,
        completionRate: 70,
        averageGrade: 85,
        revenue: 40050,
        status: 'active',
        createdAt: '2024-01-15',
        lastUpdated: '2024-03-17'
      },
      {
        id: '2',
        name: 'React & Next.js Mastery',
        slug: 'react-nextjs-mastery',
        category: 'Frontend',
        description: 'Advanced React and Next.js course with real-world projects',
        instructor: 'Jane Smith',
        totalLessons: 32,
        completedLessons: 890,
        enrolledStudents: 67,
        activeStudents: 58,
        completionRate: 87,
        averageGrade: 92,
        revenue: 23450,
        status: 'active',
        createdAt: '2024-02-01',
        lastUpdated: '2024-03-16'
      },
      {
        id: '3',
        name: 'Node.js Backend Development',
        slug: 'nodejs-backend',
        category: 'Backend',
        description: 'Build scalable backend applications with Node.js and Express',
        instructor: 'Mike Johnson',
        totalLessons: 28,
        completedLessons: 645,
        enrolledStudents: 54,
        activeStudents: 42,
        completionRate: 59,
        averageGrade: 78,
        revenue: 24300,
        status: 'active',
        createdAt: '2024-02-15',
        lastUpdated: '2024-03-15'
      },
      {
        id: '4',
        name: 'Python for Data Science',
        slug: 'python-data-science',
        category: 'Data Science',
        description: 'Learn Python programming and data analysis fundamentals',
        instructor: 'Sarah Williams',
        totalLessons: 50,
        completedLessons: 1120,
        enrolledStudents: 72,
        activeStudents: 65,
        completionRate: 75,
        averageGrade: 88,
        revenue: 30600,
        status: 'active',
        createdAt: '2024-01-20',
        lastUpdated: '2024-03-18'
      },
      {
        id: '5',
        name: 'Mobile App Development',
        slug: 'mobile-app-development',
        category: 'Mobile Development',
        description: 'Build cross-platform mobile apps with React Native',
        instructor: 'David Chen',
        totalLessons: 35,
        completedLessons: 0,
        enrolledStudents: 0,
        activeStudents: 0,
        completionRate: 0,
        averageGrade: 0,
        revenue: 0,
        status: 'draft',
        createdAt: '2024-03-10',
        lastUpdated: '2024-03-17'
      }
    ]);

    setStudents([
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        enrolledCourses: 3,
        completedCourses: 1,
        totalProgress: 65,
        currentCourse: 'Full Stack Web Development',
        lastActive: '2024-03-18T08:30:00',
        joinedDate: '2024-01-10',
        status: 'active',
        totalSpent: 1225
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        enrolledCourses: 2,
        completedCourses: 2,
        totalProgress: 100,
        currentCourse: 'Node.js Backend Development',
        lastActive: '2024-03-18T07:15:00',
        joinedDate: '2024-01-20',
        status: 'active',
        totalSpent: 800
      },
      {
        id: '3',
        name: 'Carol White',
        email: 'carol@example.com',
        enrolledCourses: 4,
        completedCourses: 0,
        totalProgress: 45,
        currentCourse: 'React & Next.js Mastery',
        lastActive: '2024-03-17T22:45:00',
        joinedDate: '2024-02-05',
        status: 'active',
        totalSpent: 1650
      },
      {
        id: '4',
        name: 'David Brown',
        email: 'david@example.com',
        enrolledCourses: 1,
        completedCourses: 0,
        totalProgress: 25,
        currentCourse: 'Python for Data Science',
        lastActive: '2024-03-17T20:10:00',
        joinedDate: '2024-03-01',
        status: 'active',
        totalSpent: 425
      },
      {
        id: '5',
        name: 'Emma Davis',
        email: 'emma@example.com',
        enrolledCourses: 2,
        completedCourses: 1,
        totalProgress: 80,
        currentCourse: 'Full Stack Web Development',
        lastActive: '2024-03-16T15:20:00',
        joinedDate: '2024-01-25',
        status: 'active',
        totalSpent: 875
      }
    ]);
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/courses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
      });

      if (response.ok) {
        alert('Course created successfully!');
        setNewCourse({
          name: '',
          slug: '',
          category: 'Web Development',
          description: '',
          instructor: '',
          duration: '',
          price: '',
          discountPrice: ''
        });
        fetchDashboardData();
        setActiveTab('courses');
      } else {
        alert('Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/courses/${courseId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setCourses(courses.filter(c => c.id !== courseId));
        setShowDeleteModal(false);
        setSelectedCourse(null);
      } else {
        alert('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="flex items-center gap-3">
                <img src="/jascomelogo.png" alt="JACOM Logo" className="h-12 w-auto" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Training Management</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-primary text-sm font-medium">
                Admin Dashboard
              </Link>
              <Link href="/training/dashboard" className="text-gray-600 hover:text-primary text-sm font-medium">
                Student View
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'courses'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'students'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-red-700 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Training Management Dashboard</h2>
              <p className="text-white/90">Manage courses, students, and track performance metrics</p>
            </div>

            {/* Comprehensive Stats Grid */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-500 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalCourses}</div>
                  <div className="text-xs text-gray-600 mb-2">Total Courses</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-600 font-semibold">{stats.activeCourses} Active</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-yellow-600 font-semibold">{stats.draftCourses} Draft</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-green-500 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalStudents}</div>
                  <div className="text-xs text-gray-600 mb-2">Total Students</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-600 font-semibold">{stats.activeStudents} Active</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-blue-600 font-semibold">+{stats.newStudentsThisMonth} This Month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-purple-500 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">${(stats.totalRevenue / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-gray-600 mb-2">Total Revenue</div>
                  <div className="text-xs text-green-600 font-semibold">+${(stats.revenueThisMonth / 1000).toFixed(1)}k This Month</div>
                </div>

                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-orange-500 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stats.completionRate}%</div>
                  <div className="text-xs text-gray-600 mb-2">Completion Rate</div>
                  <div className="text-xs text-gray-600">{stats.totalEnrollments} Total Enrollments</div>
                </div>

                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-yellow-500 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stats.averageRating}</div>
                  <div className="text-xs text-gray-600 mb-2">Average Rating</div>
                  <div className="text-xs text-gray-600">Across All Courses</div>
                </div>

                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-indigo-500 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalAssignments}</div>
                  <div className="text-xs text-gray-600 mb-2">Total Assignments</div>
                  <div className="text-xs text-orange-600 font-semibold">{stats.pendingGrading} Pending Grading</div>
                </div>

                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-red-500 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stats.certificatesIssued}</div>
                  <div className="text-xs text-gray-600 mb-2">Certificates Issued</div>
                  <div className="text-xs text-gray-600">To Graduates</div>
                </div>

                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-pink-500 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalEnrollments}</div>
                  <div className="text-xs text-gray-600 mb-2">Total Enrollments</div>
                  <div className="text-xs text-green-600 font-semibold">Growing Steadily</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.link}
                    className={`bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-${action.color}-500 hover:shadow-lg transition-all group`}
                  >
                    <div className={`w-12 h-12 bg-${action.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <div className={`text-${action.color}-600`}>{action.icon}</div>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`p-5 hover:bg-gray-50 transition-colors ${
                      index !== recentActivity.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'enrollment' ? 'bg-blue-100' :
                        activity.type === 'completion' ? 'bg-green-100' :
                        activity.type === 'assignment' ? 'bg-purple-100' :
                        'bg-orange-100'
                      }`}>
                        {activity.type === 'enrollment' && (
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        )}
                        {activity.type === 'completion' && (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {activity.type === 'assignment' && (
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {activity.type === 'payment' && (
                          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{activity.studentName}</p>
                        <p className="text-sm text-gray-600">{activity.courseName}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                      </div>
                      <div className="text-xs text-gray-500 flex-shrink-0">
                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Courses & Active Students */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Courses */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top Performing Courses</h3>
                <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                  {courses.filter(c => c.status === 'active').slice(0, 3).map((course, index) => (
                    <div
                      key={course.id}
                      className={`p-5 hover:bg-gray-50 transition-colors ${
                        index !== 2 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-red-700/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{course.name}</h4>
                          <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                            <span>{course.enrolledStudents} students</span>
                            <span>•</span>
                            <span>{course.completionRate}% completion</span>
                            <span>•</span>
                            <span className="text-green-600 font-semibold">${course.revenue.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${course.completionRate}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-gray-900">{course.averageGrade}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Students */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recently Active Students</h3>
                <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                  {students.slice(0, 3).map((student, index) => (
                    <Link
                      key={student.id}
                      href={`/admin/training/students/${student.id}`}
                      className={`block p-5 hover:bg-gray-50 transition-colors ${
                        index !== 2 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{student.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">{student.currentCourse}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-gray-600">{student.enrolledCourses} courses</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-green-600 font-semibold">{student.totalProgress}% progress</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">${student.totalSpent}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Courses</h2>
                <p className="text-gray-600 mt-1">Create, edit, and manage your training courses</p>
              </div>
              <Link
                href="/admin/training/courses/create"
                className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Course
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <div key={course.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-primary hover:shadow-lg transition-all">
                  <div className="h-40 bg-gradient-to-br from-primary/10 to-red-700/10 flex items-center justify-center relative">
                    <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                      course.status === 'active' ? 'bg-green-500 text-white' :
                      course.status === 'draft' ? 'bg-yellow-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {course.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{course.name}</h3>
                      <p className="text-sm text-primary font-semibold">{course.category}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Students</div>
                        <div className="text-lg font-bold text-gray-900">{course.enrolledStudents}</div>
                        <div className="text-xs text-green-600">{course.activeStudents} active</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Lessons</div>
                        <div className="text-lg font-bold text-gray-900">{course.totalLessons}</div>
                        <div className="text-xs text-gray-600">{course.completedLessons} completed</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Completion</div>
                        <div className="text-lg font-bold text-gray-900">{course.completionRate}%</div>
                        <div className="text-xs text-gray-600">avg grade {course.averageGrade}%</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Revenue</div>
                        <div className="text-lg font-bold text-gray-900">${(course.revenue / 1000).toFixed(1)}k</div>
                        <div className="text-xs text-gray-600">total earned</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span>Course Progress</span>
                        <span className="font-bold">{course.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${course.completionRate}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/training/courses/${course.id}`}
                        className="flex-1 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition text-center"
                      >
                        Manage Course
                      </Link>
                      <Link
                        href={`/training/course/${course.slug}`}
                        target="_blank"
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold text-sm transition"
                        title="Preview as Student"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                    </div>

                    {/* Last Updated */}
                    <div className="mt-3 text-xs text-gray-500 text-center">
                      Updated {new Date(course.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
                <p className="text-gray-600 mt-1">View and manage all enrolled students</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map(student => (
                <Link
                  key={student.id}
                  href={`/admin/training/students/${student.id}`}
                  className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="h-24 bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {student.name.charAt(0)}
                    </div>
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                      student.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {student.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>

                    {student.currentCourse && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Currently Learning</div>
                        <div className="text-sm font-semibold text-gray-900">{student.currentCourse}</div>
                      </div>
                    )}

                    {/* Student Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Enrolled</div>
                        <div className="text-lg font-bold text-gray-900">{student.enrolledCourses}</div>
                        <div className="text-xs text-green-600">{student.completedCourses} completed</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Progress</div>
                        <div className="text-lg font-bold text-gray-900">{student.totalProgress}%</div>
                        <div className="text-xs text-gray-600">overall</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span>Overall Progress</span>
                        <span className="font-bold">{student.totalProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${student.totalProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                      <span>Total Spent: <span className="font-bold text-gray-900">${student.totalSpent}</span></span>
                      <span>Joined {new Date(student.joinedDate).toLocaleDateString()}</span>
                    </div>

                    {/* Last Active */}
                    <div className="text-xs text-gray-500 text-center pt-3 border-t border-gray-200">
                      Last active {new Date(student.lastActive).toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && stats && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
              <p className="text-gray-600 mt-1">Track performance, revenue, and student engagement</p>
            </div>

            {/* Quick Analytics Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Link href="/admin/training/analytics" className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-3xl font-bold mb-1">${(stats.totalRevenue / 1000).toFixed(1)}k</div>
                <div className="text-white/90 text-sm">Total Revenue</div>
                <div className="mt-2 text-xs text-white/80">+${(stats.revenueThisMonth / 1000).toFixed(1)}k this month</div>
              </Link>

              <Link href="/admin/training/analytics" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.totalEnrollments}</div>
                <div className="text-white/90 text-sm">Total Enrollments</div>
                <div className="mt-2 text-xs text-white/80">Across all courses</div>
              </Link>

              <Link href="/admin/training/analytics" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.completionRate}%</div>
                <div className="text-white/90 text-sm">Completion Rate</div>
                <div className="mt-2 text-xs text-white/80">Average across courses</div>
              </Link>

              <Link href="/admin/training/analytics" className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.averageRating}</div>
                <div className="text-white/90 text-sm">Average Rating</div>
                <div className="mt-2 text-xs text-white/80">Student satisfaction</div>
              </Link>
            </div>

            {/* Analytics Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Detailed Analytics Links */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Detailed Reports</h3>
                <div className="space-y-3">
                  <Link href="/admin/training/analytics" className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Full Analytics Dashboard</div>
                        <div className="text-xs text-gray-600">Revenue, engagement, trends</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <Link href="/admin/training/assignments" className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Assignment Analytics</div>
                        <div className="text-xs text-gray-600">{stats.pendingGrading} pending grading</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <Link href="/admin/training/certificates" className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Certificates Issued</div>
                        <div className="text-xs text-gray-600">{stats.certificatesIssued} total certificates</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Course Performance */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Courses</h3>
                <div className="space-y-4">
                  {courses.filter(c => c.status === 'active').slice(0, 3).map((course, index) => (
                    <div key={course.id} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-red-700/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">{course.name}</div>
                        <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                          <span>{course.enrolledStudents} students</span>
                          <span>•</span>
                          <span className="text-green-600 font-semibold">${(course.revenue / 1000).toFixed(1)}k</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{course.completionRate}%</div>
                        <div className="text-xs text-gray-600">completion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Course?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedCourse.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDeleteCourse(selectedCourse.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCourse(null);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
