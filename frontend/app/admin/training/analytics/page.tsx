'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AnalyticsData {
  overview: {
    totalRevenue: number;
    revenueGrowth: number;
    totalEnrollments: number;
    enrollmentGrowth: number;
    activeStudents: number;
    studentGrowth: number;
    completionRate: number;
    completionGrowth: number;
  };
  coursePerformance: {
    courseId: string;
    courseName: string;
    enrollments: number;
    completions: number;
    averageGrade: number;
    revenue: number;
    completionRate: number;
  }[];
  studentEngagement: {
    date: string;
    activeStudents: number;
    lessonsCompleted: number;
    averageTimeSpent: number;
  }[];
  revenueByMonth: {
    month: string;
    revenue: number;
    enrollments: number;
  }[];
  topPerformers: {
    studentId: string;
    studentName: string;
    coursesCompleted: number;
    averageGrade: number;
    totalHours: number;
  }[];
  instructorStats: {
    instructorId: string;
    instructorName: string;
    coursesTeaching: number;
    totalStudents: number;
    averageRating: number;
    totalRevenue: number;
  }[];
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/analytics?range=${timeRange}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setAnalytics(await response.json());
      } else {
        useMockData();
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setAnalytics({
      overview: {
        totalRevenue: 125450,
        revenueGrowth: 15.3,
        totalEnrollments: 342,
        enrollmentGrowth: 12.8,
        activeStudents: 245,
        studentGrowth: 8.5,
        completionRate: 68,
        completionGrowth: 5.2
      },
      coursePerformance: [
        {
          courseId: '1',
          courseName: 'Full Stack Web Development',
          enrollments: 89,
          completions: 62,
          averageGrade: 85,
          revenue: 40050,
          completionRate: 70
        },
        {
          courseId: '2',
          courseName: 'React & Next.js Mastery',
          enrollments: 67,
          completions: 58,
          averageGrade: 92,
          revenue: 23450,
          completionRate: 87
        },
        {
          courseId: '3',
          courseName: 'Node.js Backend Development',
          enrollments: 54,
          completions: 32,
          averageGrade: 78,
          revenue: 24300,
          completionRate: 59
        }
      ],
      studentEngagement: [
        { date: '2024-03-10', activeStudents: 180, lessonsCompleted: 245, averageTimeSpent: 3.5 },
        { date: '2024-03-11', activeStudents: 195, lessonsCompleted: 268, averageTimeSpent: 3.8 },
        { date: '2024-03-12', activeStudents: 210, lessonsCompleted: 290, averageTimeSpent: 4.1 },
        { date: '2024-03-13', activeStudents: 205, lessonsCompleted: 275, averageTimeSpent: 3.9 },
        { date: '2024-03-14', activeStudents: 220, lessonsCompleted: 310, averageTimeSpent: 4.2 },
        { date: '2024-03-15', activeStudents: 235, lessonsCompleted: 325, averageTimeSpent: 4.5 },
        { date: '2024-03-16', activeStudents: 245, lessonsCompleted: 340, averageTimeSpent: 4.7 }
      ],
      revenueByMonth: [
        { month: 'Oct 2023', revenue: 18500, enrollments: 42 },
        { month: 'Nov 2023', revenue: 22300, enrollments: 51 },
        { month: 'Dec 2023', revenue: 28700, enrollments: 65 },
        { month: 'Jan 2024', revenue: 35200, enrollments: 78 },
        { month: 'Feb 2024', revenue: 41800, enrollments: 92 },
        { month: 'Mar 2024', revenue: 48950, enrollments: 108 }
      ],
      topPerformers: [
        { studentId: '1', studentName: 'Alice Johnson', coursesCompleted: 5, averageGrade: 95, totalHours: 120 },
        { studentId: '2', studentName: 'Bob Smith', coursesCompleted: 4, averageGrade: 92, totalHours: 98 },
        { studentId: '3', studentName: 'Carol White', coursesCompleted: 4, averageGrade: 90, totalHours: 105 },
        { studentId: '4', studentName: 'David Brown', coursesCompleted: 3, averageGrade: 94, totalHours: 87 },
        { studentId: '5', studentName: 'Emma Davis', coursesCompleted: 3, averageGrade: 91, totalHours: 92 }
      ],
      instructorStats: [
        { instructorId: '1', instructorName: 'John Doe', coursesTeaching: 3, totalStudents: 156, averageRating: 4.8, totalRevenue: 62400 },
        { instructorId: '2', instructorName: 'Jane Smith', coursesTeaching: 2, totalStudents: 98, averageRating: 4.9, totalRevenue: 39200 },
        { instructorId: '3', instructorName: 'Mike Johnson', coursesTeaching: 2, totalStudents: 88, averageRating: 4.7, totalRevenue: 35200 }
      ]
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin/training" className="flex items-center gap-3">
                <img src="/jascomelogo.png" alt="JACOM Logo" className="h-12 w-auto" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Training Analytics</h1>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm font-medium"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <Link href="/admin/training" className="text-gray-600 hover:text-primary text-sm font-medium">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overview Stats */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className={`text-sm font-bold ${analytics.overview.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.overview.revenueGrowth >= 0 ? '+' : ''}{analytics.overview.revenueGrowth}%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">${analytics.overview.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className={`text-sm font-bold ${analytics.overview.enrollmentGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.overview.enrollmentGrowth >= 0 ? '+' : ''}{analytics.overview.enrollmentGrowth}%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{analytics.overview.totalEnrollments}</div>
              <div className="text-sm text-gray-600">Total Enrollments</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className={`text-sm font-bold ${analytics.overview.studentGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.overview.studentGrowth >= 0 ? '+' : ''}{analytics.overview.studentGrowth}%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{analytics.overview.activeStudents}</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className={`text-sm font-bold ${analytics.overview.completionGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.overview.completionGrowth >= 0 ? '+' : ''}{analytics.overview.completionGrowth}%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{analytics.overview.completionRate}%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Course Performance */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Performance</h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Enrollments</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Completions</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Completion Rate</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Avg Grade</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analytics.coursePerformance.map(course => (
                    <tr key={course.courseId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{course.courseName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{course.enrollments}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{course.completions}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${course.completionRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{course.completionRate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-600">{course.averageGrade}%</td>
                      <td className="px-6 py-4 text-sm font-bold text-green-600">${course.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Revenue Trend */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <div className="space-y-4">
              {analytics.revenueByMonth.map((month, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{month.month}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{month.enrollments} enrollments</span>
                      <span className="text-sm font-bold text-green-600">${month.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-red-700 h-3 rounded-full transition-all"
                      style={{ width: `${(month.revenue / 50000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers & Instructor Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Performers */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Performers</h2>
            <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {analytics.topPerformers.map((student, index) => (
                  <div key={student.studentId} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{student.studentName}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{student.coursesCompleted} courses</span>
                          <span>•</span>
                          <span className="font-bold text-green-600">{student.averageGrade}% avg</span>
                          <span>•</span>
                          <span>{student.totalHours}h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructor Stats */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor Performance</h2>
            <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {analytics.instructorStats.map(instructor => (
                  <div key={instructor.instructorId} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{instructor.instructorName}</h3>
                      <div className="flex items-center gap-1">
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold text-gray-900">{instructor.averageRating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Courses</div>
                        <div className="font-bold text-gray-900">{instructor.coursesTeaching}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Students</div>
                        <div className="font-bold text-gray-900">{instructor.totalStudents}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Revenue</div>
                        <div className="font-bold text-green-600">${instructor.totalRevenue.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Student Engagement Chart */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Engagement</h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <div className="space-y-4">
              {analytics.studentEngagement.map((day, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{new Date(day.date).toLocaleDateString()}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">{day.activeStudents} students</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">{day.lessonsCompleted} lessons</span>
                      <span className="text-gray-600">•</span>
                      <span className="font-bold text-blue-600">{day.averageTimeSpent}h avg</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(day.activeStudents / 250) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
