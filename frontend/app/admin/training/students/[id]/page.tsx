'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedDate: string;
  status: 'active' | 'inactive' | 'suspended';
  totalProgress: number;
  enrolledCourses: number;
  completedCourses: number;
  totalLearningHours: number;
  certificatesEarned: number;
}

interface Enrollment {
  id: string;
  courseId: string;
  courseName: string;
  enrolledDate: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  status: 'active' | 'completed' | 'dropped';
  lastAccessedDate: string;
  grade?: number;
}

interface Payment {
  id: string;
  courseId: string;
  courseName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  transactionId: string;
}

interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  dueDate: string;
  submittedDate?: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  maxGrade: number;
}

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params?.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'enrollments' | 'payments' | 'assignments'>('overview');
  const [editMode, setEditMode] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    if (studentId) {
      fetchStudentData();
    }
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const [studentRes, enrollmentsRes, paymentsRes, assignmentsRes] = await Promise.all([
        fetch(`${backendUrl}/api/admin/training/students/${studentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/api/admin/training/students/${studentId}/enrollments`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/api/admin/training/students/${studentId}/payments`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/api/admin/training/students/${studentId}/assignments`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (studentRes.ok && enrollmentsRes.ok && paymentsRes.ok && assignmentsRes.ok) {
        setStudent(await studentRes.json());
        setEnrollments(await enrollmentsRes.json());
        setPayments(await paymentsRes.json());
        setAssignments(await assignmentsRes.json());
      } else {
        useMockData();
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setStudent({
      id: studentId,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1 234 567 8900',
      address: '123 Main St, New York, NY 10001',
      joinedDate: '2024-01-10',
      status: 'active',
      totalProgress: 65,
      enrolledCourses: 3,
      completedCourses: 1,
      totalLearningHours: 45,
      certificatesEarned: 1
    });

    setEnrollments([
      {
        id: '1',
        courseId: '1',
        courseName: 'Full Stack Web Development',
        enrolledDate: '2024-01-10',
        progress: 75,
        completedLessons: 30,
        totalLessons: 40,
        status: 'active',
        lastAccessedDate: '2024-03-15',
        grade: 88
      },
      {
        id: '2',
        courseId: '2',
        courseName: 'React & Next.js Mastery',
        enrolledDate: '2024-02-01',
        progress: 100,
        completedLessons: 32,
        totalLessons: 32,
        status: 'completed',
        lastAccessedDate: '2024-03-10',
        grade: 95
      },
      {
        id: '3',
        courseId: '3',
        courseName: 'Node.js Backend Development',
        enrolledDate: '2024-02-15',
        progress: 45,
        completedLessons: 12,
        totalLessons: 28,
        status: 'active',
        lastAccessedDate: '2024-03-17'
      }
    ]);

    setPayments([
      {
        id: '1',
        courseId: '1',
        courseName: 'Full Stack Web Development',
        amount: 450,
        paymentDate: '2024-01-10',
        paymentMethod: 'Credit Card',
        status: 'completed',
        transactionId: 'TXN-001-2024'
      },
      {
        id: '2',
        courseId: '2',
        courseName: 'React & Next.js Mastery',
        amount: 350,
        paymentDate: '2024-02-01',
        paymentMethod: 'PayPal',
        status: 'completed',
        transactionId: 'TXN-002-2024'
      }
    ]);

    setAssignments([
      {
        id: '1',
        courseId: '1',
        courseName: 'Full Stack Web Development',
        title: 'Build a REST API',
        dueDate: '2024-03-20',
        submittedDate: '2024-03-18',
        status: 'graded',
        grade: 92,
        maxGrade: 100
      },
      {
        id: '2',
        courseId: '3',
        courseName: 'Node.js Backend Development',
        title: 'Database Design Project',
        dueDate: '2024-03-25',
        status: 'pending',
        maxGrade: 100
      }
    ]);

    setAvailableCourses([
      { id: '4', name: 'Python for Data Science' },
      { id: '5', name: 'Mobile App Development' }
    ]);
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/students/${studentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      });

      if (response.ok) {
        alert('Student updated successfully!');
        setEditMode(false);
      } else {
        alert('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Error updating student');
    }
  };

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/enrollments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId,
          courseId: selectedCourse
        })
      });

      if (response.ok) {
        alert('Student enrolled successfully!');
        fetchStudentData();
        setShowEnrollModal(false);
        setSelectedCourse('');
      } else {
        alert('Failed to enroll student');
      }
    } catch (error) {
      console.error('Error enrolling student:', error);
      alert('Error enrolling student');
    }
  };

  const handleUnenroll = async (enrollmentId: string) => {
    if (!confirm('Are you sure you want to unenroll this student from the course?')) return;

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/enrollments/${enrollmentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setEnrollments(enrollments.filter(e => e.id !== enrollmentId));
        alert('Student unenrolled successfully!');
      } else {
        alert('Failed to unenroll student');
      }
    } catch (error) {
      console.error('Error unenrolling student:', error);
      alert('Error unenrolling student');
    }
  };

  const handleGradeAssignment = async (assignmentId: string, grade: number) => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/assignments/${assignmentId}/grade`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ grade })
      });

      if (response.ok) {
        alert('Assignment graded successfully!');
        fetchStudentData();
      } else {
        alert('Failed to grade assignment');
      }
    } catch (error) {
      console.error('Error grading assignment:', error);
      alert('Error grading assignment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Student Data...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Not Found</h2>
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
                <h1 className="text-xl font-bold text-gray-900">Student Details</h1>
                <p className="text-sm text-gray-600">{student.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                student.status === 'active' ? 'bg-green-100 text-green-700' :
                student.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                'bg-red-100 text-red-700'
              }`}>
                {student.status}
              </span>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
                >
                  Edit Student
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
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
              onClick={() => setActiveTab('enrollments')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'enrollments'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Enrollments ({enrollments.length})
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'payments'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Payments ({payments.length})
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'assignments'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Assignments ({assignments.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{student.enrolledCourses}</div>
                <div className="text-sm text-gray-600">Enrolled Courses</div>
                <div className="mt-2 text-xs text-green-600 font-medium">{student.completedCourses} Completed</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{student.totalProgress}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{student.totalLearningHours}</div>
                <div className="text-sm text-gray-600">Learning Hours</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{student.certificatesEarned}</div>
                <div className="text-sm text-gray-600">Certificates</div>
              </div>
            </div>

            {/* Student Information */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Information</h2>
              {editMode ? (
                <form onSubmit={handleUpdateStudent} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={student.name}
                        onChange={(e) => setStudent({ ...student, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                      <input
                        type="email"
                        value={student.email}
                        onChange={(e) => setStudent({ ...student, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={student.phone}
                        onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                      <select
                        value={student.status}
                        onChange={(e) => setStudent({ ...student, status: e.target.value as any })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Address</label>
                    <textarea
                      value={student.address}
                      onChange={(e) => setStudent({ ...student, address: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Full Name</div>
                    <div className="text-lg text-gray-900">{student.name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Email</div>
                    <div className="text-lg text-gray-900">{student.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Phone</div>
                    <div className="text-lg text-gray-900">{student.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Joined Date</div>
                    <div className="text-lg text-gray-900">{new Date(student.joinedDate).toLocaleDateString()}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Address</div>
                    <div className="text-lg text-gray-900">{student.address}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enrollments Tab */}
        {activeTab === 'enrollments' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Course Enrollments</h2>
              <button
                onClick={() => setShowEnrollModal(true)}
                className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Enroll in Course
              </button>
            </div>

            <div className="space-y-4">
              {enrollments.map(enrollment => (
                <div key={enrollment.id} className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-primary transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{enrollment.courseName}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>Enrolled: {new Date(enrollment.enrolledDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Last Accessed: {new Date(enrollment.lastAccessedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>{enrollment.completedLessons} of {enrollment.totalLessons} lessons</span>
                          <span className="font-bold">{enrollment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      {enrollment.grade && (
                        <div className="text-sm">
                          <span className="text-gray-600">Grade: </span>
                          <span className="font-bold text-green-600">{enrollment.grade}%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-center ${
                        enrollment.status === 'active' ? 'bg-green-100 text-green-700' :
                        enrollment.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {enrollment.status}
                      </span>
                      <button
                        onClick={() => handleUnenroll(enrollment.id)}
                        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold text-sm transition"
                      >
                        Unenroll
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {enrollments.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-200">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No enrollments yet</h3>
                  <p className="text-gray-600">Enroll this student in a course to get started</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
            <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payments.map(payment => (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-gray-900">{payment.transactionId}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{payment.courseName}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">${payment.amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{payment.paymentMethod}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-700' :
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Assignments</h2>
            <div className="space-y-4">
              {assignments.map(assignment => (
                <div key={assignment.id} className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-primary transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          assignment.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{assignment.courseName}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        {assignment.submittedDate && (
                          <>
                            <span>•</span>
                            <span>Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}</span>
                          </>
                        )}
                        {assignment.grade !== undefined && (
                          <>
                            <span>•</span>
                            <span className="font-bold text-green-600">Grade: {assignment.grade}/{assignment.maxGrade}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {assignment.status === 'submitted' && assignment.grade === undefined && (
                      <button
                        onClick={() => {
                          const grade = prompt('Enter grade (0-100):');
                          if (grade) handleGradeAssignment(assignment.id, parseInt(grade));
                        }}
                        className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition"
                      >
                        Grade
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {assignments.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-200">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments</h3>
                  <p className="text-gray-600">This student has no assignments yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Enroll Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Enroll in Course</h3>
            <form onSubmit={handleEnrollStudent} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Select Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                >
                  <option value="">Choose a course...</option>
                  {availableCourses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  Enroll Student
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEnrollModal(false);
                    setSelectedCourse('');
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
