'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  maxGrade: number;
  attachments: string[];
  createdDate: string;
  totalSubmissions: number;
  gradedSubmissions: number;
  averageGrade: number;
}

interface Course {
  id: string;
  name: string;
}

export default function AssignmentsManagementPage() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  const [assignmentForm, setAssignmentForm] = useState({
    courseId: '',
    title: '',
    description: '',
    dueDate: '',
    maxGrade: 100,
    attachments: [] as string[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const [assignmentsRes, coursesRes] = await Promise.all([
        fetch(`${backendUrl}/api/admin/training/assignments`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/api/admin/training/courses`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (assignmentsRes.ok && coursesRes.ok) {
        setAssignments(await assignmentsRes.json());
        setCourses(await coursesRes.json());
      } else {
        useMockData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setAssignments([
      {
        id: '1',
        courseId: '1',
        courseName: 'Full Stack Web Development',
        title: 'Build a REST API',
        description: 'Create a RESTful API using Node.js and Express',
        dueDate: '2024-03-25',
        maxGrade: 100,
        attachments: ['requirements.pdf'],
        createdDate: '2024-03-01',
        totalSubmissions: 45,
        gradedSubmissions: 38,
        averageGrade: 85
      },
      {
        id: '2',
        courseId: '2',
        courseName: 'React & Next.js Mastery',
        title: 'Build a Dashboard',
        description: 'Create an interactive dashboard using React and Next.js',
        dueDate: '2024-03-28',
        maxGrade: 100,
        attachments: [],
        createdDate: '2024-03-05',
        totalSubmissions: 32,
        gradedSubmissions: 32,
        averageGrade: 92
      }
    ]);

    setCourses([
      { id: '1', name: 'Full Stack Web Development' },
      { id: '2', name: 'React & Next.js Mastery' },
      { id: '3', name: 'Node.js Backend Development' }
    ]);
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const method = editingAssignment ? 'PUT' : 'POST';
      const url = editingAssignment
        ? `${backendUrl}/api/admin/training/assignments/${editingAssignment.id}`
        : `${backendUrl}/api/admin/training/assignments`;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignmentForm)
      });

      if (response.ok) {
        alert(editingAssignment ? 'Assignment updated!' : 'Assignment created!');
        fetchData();
        setShowCreateModal(false);
        setEditingAssignment(null);
        setAssignmentForm({
          courseId: '',
          title: '',
          description: '',
          dueDate: '',
          maxGrade: 100,
          attachments: []
        });
      } else {
        alert('Failed to save assignment');
      }
    } catch (error) {
      console.error('Error saving assignment:', error);
      alert('Error saving assignment');
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (!confirm('Are you sure you want to delete this assignment?')) return;

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/assignments/${assignmentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setAssignments(assignments.filter(a => a.id !== assignmentId));
        alert('Assignment deleted successfully!');
      } else {
        alert('Failed to delete assignment');
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
      alert('Error deleting assignment');
    }
  };

  const openEditModal = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setAssignmentForm({
      courseId: assignment.courseId,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      maxGrade: assignment.maxGrade,
      attachments: assignment.attachments
    });
    setShowCreateModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Assignments...</p>
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
            <div className="flex items-center gap-6">
              <Link href="/admin/training" className="flex items-center gap-3">
                <img src="/jascomelogo.png" alt="JACOM Logo" className="h-12 w-auto" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Assignment Management</h1>
            </div>
            <Link href="/admin/training" className="text-gray-600 hover:text-primary text-sm font-medium">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Assignments</h2>
            <p className="text-gray-600 mt-1">Create and manage course assignments</p>
          </div>
          <button
            onClick={() => {
              setEditingAssignment(null);
              setAssignmentForm({
                courseId: '',
                title: '',
                description: '',
                dueDate: '',
                maxGrade: 100,
                attachments: []
              });
              setShowCreateModal(true);
            }}
            className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Assignment
          </button>
        </div>

        {/* Assignments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map(assignment => (
            <div key={assignment.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-primary transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{assignment.title}</h3>
                    <p className="text-sm text-primary font-semibold">{assignment.courseName}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{assignment.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-semibold text-gray-900">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Max Grade:</span>
                    <span className="font-semibold text-gray-900">{assignment.maxGrade} points</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Submissions:</span>
                    <span className="font-semibold text-gray-900">{assignment.totalSubmissions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Graded:</span>
                    <span className="font-semibold text-green-600">{assignment.gradedSubmissions}/{assignment.totalSubmissions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Avg Grade:</span>
                    <span className="font-semibold text-blue-600">{assignment.averageGrade}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(assignment)}
                    className="flex-1 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
                  >
                    Edit
                  </button>
                  <Link
                    href={`/admin/training/assignments/${assignment.id}/submissions`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition text-center"
                  >
                    View Submissions
                  </Link>
                  <button
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {assignments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-200">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments yet</h3>
            <p className="text-gray-600 mb-4">Create your first assignment to get started</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create First Assignment
            </button>
          </div>
        )}
      </main>

      {/* Create/Edit Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
            </h3>
            <form onSubmit={handleCreateAssignment} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Course</label>
                <select
                  value={assignmentForm.courseId}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, courseId: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                >
                  <option value="">Select a course...</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Assignment Title</label>
                <input
                  type="text"
                  value={assignmentForm.title}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="e.g., Build a REST API"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  value={assignmentForm.description}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  rows={4}
                  placeholder="Assignment description and requirements..."
                  required
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={assignmentForm.dueDate}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Max Grade</label>
                  <input
                    type="number"
                    value={assignmentForm.maxGrade}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, maxGrade: parseInt(e.target.value) })}
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
                  {editingAssignment ? 'Update Assignment' : 'Create Assignment'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingAssignment(null);
                    setAssignmentForm({
                      courseId: '',
                      title: '',
                      description: '',
                      dueDate: '',
                      maxGrade: 100,
                      attachments: []
                    });
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
