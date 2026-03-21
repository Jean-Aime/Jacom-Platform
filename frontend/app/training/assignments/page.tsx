'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  courseName: string;
  courseSlug: string;
  submissionId?: string;
  submittedAt?: string;
  grade?: number;
  feedback?: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
}

export default function AssignmentsPage() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  useEffect(() => {
    checkAuth();
    fetchAssignments();
  }, []);

  const checkAuth = async () => {
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
    }
  };

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${BACKEND}/assignment/student/assignments`, {
        headers: { 'X-Session-Token': token || '' },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setAssignments(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter(a => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      submitted: 'bg-blue-100 text-blue-800',
      graded: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
              <p className="text-gray-600 mt-2">Track and submit your course assignments</p>
            </div>
            <Link
              href="/training/dashboard"
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { key: 'all', label: 'All Assignments' },
                { key: 'pending', label: 'Pending' },
                { key: 'submitted', label: 'Submitted' },
                { key: 'graded', label: 'Graded' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                    filter === tab.key
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100">
                    {tab.key === 'all' 
                      ? assignments.length 
                      : assignments.filter(a => a.status === tab.key).length}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Assignments List */}
        {filteredAssignments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You don't have any assignments yet." 
                : `No ${filter} assignments.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{assignment.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(assignment.status)}`}>
                        {assignment.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{assignment.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>{assignment.courseName}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className={isOverdue(assignment.dueDate) && assignment.status === 'pending' ? 'text-red-600 font-semibold' : ''}>
                          Due: {formatDate(assignment.dueDate)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Max Score: {assignment.maxScore}</span>
                      </div>
                    </div>
                    
                    {assignment.status === 'graded' && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-green-900">Grade: {assignment.grade}/{assignment.maxScore}</span>
                          <span className="text-sm text-green-700">
                            {Math.round((assignment.grade! / assignment.maxScore) * 100)}%
                          </span>
                        </div>
                        {assignment.feedback && (
                          <div className="text-sm text-green-800">
                            <strong>Feedback:</strong> {assignment.feedback}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {assignment.status === 'submitted' && assignment.submittedAt && (
                      <div className="mt-4 text-sm text-blue-600">
                        ✓ Submitted on {formatDate(assignment.submittedAt)}
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6">
                    <Link
                      href={`/training/assignments/${assignment.id}`}
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition font-semibold"
                    >
                      {assignment.status === 'pending' || assignment.status === 'overdue' ? 'Submit' : 'View'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
