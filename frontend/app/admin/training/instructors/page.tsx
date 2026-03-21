'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  expertise: string[];
  coursesTeaching: number;
  totalStudents: number;
  averageRating: number;
  totalRevenue: number;
  joinedDate: string;
  status: 'active' | 'inactive';
  profileImage?: string;
}

export default function InstructorsManagementPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);

  const [instructorForm, setInstructorForm] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    expertise: [] as string[],
    status: 'active' as 'active' | 'inactive'
  });

  const [newExpertise, setNewExpertise] = useState('');

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/instructors`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setInstructors(await response.json());
      } else {
        useMockData();
      }
    } catch (error) {
      console.error('Error fetching instructors:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setInstructors([
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        bio: 'Senior Full Stack Developer with 10+ years of experience in web development and teaching.',
        expertise: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Next.js'],
        coursesTeaching: 3,
        totalStudents: 156,
        averageRating: 4.8,
        totalRevenue: 62400,
        joinedDate: '2023-06-15',
        status: 'active'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 234 567 8901',
        bio: 'Frontend specialist and UI/UX expert passionate about creating beautiful user experiences.',
        expertise: ['React', 'Vue.js', 'CSS', 'UI/UX Design', 'Tailwind CSS'],
        coursesTeaching: 2,
        totalStudents: 98,
        averageRating: 4.9,
        totalRevenue: 39200,
        joinedDate: '2023-08-20',
        status: 'active'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        phone: '+1 234 567 8902',
        bio: 'Backend engineer specializing in scalable systems and database architecture.',
        expertise: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS'],
        coursesTeaching: 2,
        totalStudents: 88,
        averageRating: 4.7,
        totalRevenue: 35200,
        joinedDate: '2023-09-10',
        status: 'active'
      }
    ]);
  };

  const handleSaveInstructor = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const method = editingInstructor ? 'PUT' : 'POST';
      const url = editingInstructor
        ? `${backendUrl}/api/admin/training/instructors/${editingInstructor.id}`
        : `${backendUrl}/api/admin/training/instructors`;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(instructorForm)
      });

      if (response.ok) {
        alert(editingInstructor ? 'Instructor updated!' : 'Instructor created!');
        fetchInstructors();
        setShowModal(false);
        setEditingInstructor(null);
        resetForm();
      } else {
        alert('Failed to save instructor');
      }
    } catch (error) {
      console.error('Error saving instructor:', error);
      alert('Error saving instructor');
    }
  };

  const handleDeleteInstructor = async (instructorId: string) => {
    if (!confirm('Are you sure you want to delete this instructor?')) return;

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/admin/training/instructors/${instructorId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setInstructors(instructors.filter(i => i.id !== instructorId));
        alert('Instructor deleted successfully!');
      } else {
        alert('Failed to delete instructor');
      }
    } catch (error) {
      console.error('Error deleting instructor:', error);
      alert('Error deleting instructor');
    }
  };

  const openEditModal = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setInstructorForm({
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone,
      bio: instructor.bio,
      expertise: instructor.expertise,
      status: instructor.status
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setInstructorForm({
      name: '',
      email: '',
      phone: '',
      bio: '',
      expertise: [],
      status: 'active'
    });
  };

  const addExpertise = () => {
    if (newExpertise.trim() && !instructorForm.expertise.includes(newExpertise.trim())) {
      setInstructorForm({
        ...instructorForm,
        expertise: [...instructorForm.expertise, newExpertise.trim()]
      });
      setNewExpertise('');
    }
  };

  const removeExpertise = (skill: string) => {
    setInstructorForm({
      ...instructorForm,
      expertise: instructorForm.expertise.filter(s => s !== skill)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Instructors...</p>
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
              <h1 className="text-xl font-bold text-gray-900">Instructor Management</h1>
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
            <h2 className="text-2xl font-bold text-gray-900">All Instructors</h2>
            <p className="text-gray-600 mt-1">Manage your teaching staff</p>
          </div>
          <button
            onClick={() => {
              setEditingInstructor(null);
              resetForm();
              setShowModal(true);
            }}
            className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Instructor
          </button>
        </div>

        {/* Instructors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map(instructor => (
            <div key={instructor.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-primary transition-all">
              <div className="h-32 bg-gradient-to-br from-primary/10 to-red-700/10 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{instructor.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{instructor.email}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-bold text-gray-900">{instructor.averageRating}</span>
                      <span className="text-sm text-gray-600">({instructor.totalStudents} students)</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    instructor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {instructor.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{instructor.bio}</p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {instructor.expertise.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                        {skill}
                      </span>
                    ))}
                    {instructor.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                        +{instructor.expertise.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-gray-600">Courses</div>
                    <div className="font-bold text-gray-900">{instructor.coursesTeaching}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Revenue</div>
                    <div className="font-bold text-green-600">${instructor.totalRevenue.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(instructor)}
                    className="flex-1 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteInstructor(instructor.id)}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {instructors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-200">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No instructors yet</h3>
            <p className="text-gray-600 mb-4">Add your first instructor to get started</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add First Instructor
            </button>
          </div>
        )}
      </main>

      {/* Create/Edit Instructor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}
            </h3>
            <form onSubmit={handleSaveInstructor} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={instructorForm.name}
                    onChange={(e) => setInstructorForm({ ...instructorForm, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    value={instructorForm.email}
                    onChange={(e) => setInstructorForm({ ...instructorForm, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={instructorForm.phone}
                    onChange={(e) => setInstructorForm({ ...instructorForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                  <select
                    value={instructorForm.status}
                    onChange={(e) => setInstructorForm({ ...instructorForm, status: e.target.value as any })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Bio</label>
                <textarea
                  value={instructorForm.bio}
                  onChange={(e) => setInstructorForm({ ...instructorForm, bio: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  rows={4}
                  placeholder="Brief bio about the instructor..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Expertise</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                  <button
                    type="button"
                    onClick={addExpertise}
                    className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {instructorForm.expertise.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeExpertise(skill)}
                        className="text-blue-700 hover:text-blue-900"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  {editingInstructor ? 'Update Instructor' : 'Add Instructor'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingInstructor(null);
                    resetForm();
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
