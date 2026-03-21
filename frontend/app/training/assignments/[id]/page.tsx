'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  courseName: string;
  submissionId?: string;
  content?: string;
  fileUrl?: string;
  submittedAt?: string;
  grade?: number;
  feedback?: string;
  submissionStatus?: string;
}

export default function AssignmentSubmitPage() {
  const router = useRouter();
  const params = useParams();
  const assignmentId = params?.id as string;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
    if (assignmentId) {
      fetchAssignment();
    }
  }, [assignmentId]);

  const checkAuth = async () => {
    const token = localStorage.getItem('session-token');
    if (!token) {
      router.push('/login');
    }
  };

  const fetchAssignment = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${BACKEND}/assignment/student/assignment/${assignmentId}`, {
        headers: { 'X-Session-Token': token || '' },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setAssignment(data);
        setContent(data.content || '');
        setFileUrl(data.fileUrl || '');
      } else {
        setError('Assignment not found');
      }
    } catch (error) {
      console.error('Failed to fetch assignment:', error);
      setError('Failed to load assignment');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    await uploadFile(selectedFile);
  };

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploadProgress(0);
      const token = localStorage.getItem('session-token');
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const formData = new FormData();
      formData.append('file', fileToUpload);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setFileUrl(response.fileUrl);
          setUploadProgress(100);
        } else {
          setError('Failed to upload file');
        }
      });

      xhr.open('POST', `${BACKEND}/assignment/student/assignment/upload`);
      xhr.setRequestHeader('X-Session-Token', token || '');
      xhr.send(formData);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !fileUrl) {
      setError('Please provide either written content or upload a file');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('session-token');
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${BACKEND}/assignment/student/assignment/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: JSON.stringify({
          assignmentId,
          content,
          fileUrl
        })
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/training/assignments');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to submit assignment');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isOverdue = assignment && new Date(assignment.dueDate) < new Date();
  const canSubmit = assignment && (assignment.submissionStatus !== 'graded');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Assignment Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/training/assignments" className="text-primary hover:underline">
            ← Back to Assignments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/training/assignments" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Assignments
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{assignment.title}</h1>
          <p className="text-gray-600 mt-2">{assignment.courseName}</p>
        </div>

        {/* Assignment Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className={`font-semibold ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              {isOverdue && <p className="text-xs text-red-600 mt-1">Overdue</p>}
            </div>
            <div>
              <p className="text-sm text-gray-500">Max Score</p>
              <p className="font-semibold text-gray-900">{assignment.maxScore} points</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold text-gray-900 capitalize">
                {assignment.submissionStatus || 'Not Submitted'}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{assignment.description}</p>
          </div>
        </div>

        {/* Graded Assignment */}
        {assignment.submissionStatus === 'graded' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-green-900 mb-4">Assignment Graded</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-900 font-semibold">Your Score:</span>
                <span className="text-2xl font-bold text-green-900">
                  {assignment.grade}/{assignment.maxScore}
                </span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all"
                  style={{ width: `${(assignment.grade! / assignment.maxScore) * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-green-700 mt-1">
                {Math.round((assignment.grade! / assignment.maxScore) * 100)}%
              </p>
            </div>
            {assignment.feedback && (
              <div>
                <h4 className="font-semibold text-green-900 mb-2">Instructor Feedback:</h4>
                <p className="text-green-800 bg-white p-4 rounded border border-green-200">
                  {assignment.feedback}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Submission Form */}
        {canSubmit && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {assignment.submissionId ? 'Update Submission' : 'Submit Assignment'}
            </h3>

            {/* Text Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Written Response
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Type your answer here..."
              />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.zip,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600 mb-1">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, TXT, ZIP, JPG, PNG (max 10MB)
                  </p>
                </label>
                
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{uploadProgress}% uploaded</p>
                  </div>
                )}
                
                {fileUrl && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm text-green-800">✓ File uploaded successfully</p>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <Link
                href="/training/assignments"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting || (!content.trim() && !fileUrl)}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : assignment.submissionId ? 'Update Submission' : 'Submit Assignment'}
              </button>
            </div>
          </form>
        )}

        {/* Success Modal */}
        {success && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Assignment Submitted!</h3>
              <p className="text-gray-600">Redirecting to assignments...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
