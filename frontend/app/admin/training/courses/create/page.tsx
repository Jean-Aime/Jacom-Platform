'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  materials: Material[];
  quiz?: Quiz;
  order: number;
}

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
}

interface Quiz {
  id: string;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function CreateCourse() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  
  const [courseData, setCourseData] = useState({
    name: '',
    slug: '',
    category: 'Web Development',
    description: '',
    instructor: '',
    duration: '',
    price: '',
    discountPrice: '',
    level: 'Beginner',
    language: 'English',
    requirements: [''],
    learningOutcomes: [''],
    thumbnail: '',
    status: 'draft'
  });

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Partial<Lesson>>({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    materials: [],
    order: 1
  });

  const handleCourseDataChange = (field: string, value: any) => {
    setCourseData({ ...courseData, [field]: value });
  };

  const handleArrayFieldChange = (field: 'requirements' | 'learningOutcomes', index: number, value: string) => {
    const newArray = [...courseData[field]];
    newArray[index] = value;
    setCourseData({ ...courseData, [field]: newArray });
  };

  const addArrayField = (field: 'requirements' | 'learningOutcomes') => {
    setCourseData({ ...courseData, [field]: [...courseData[field], ''] });
  };

  const removeArrayField = (field: 'requirements' | 'learningOutcomes', index: number) => {
    const newArray = courseData[field].filter((_, i) => i !== index);
    setCourseData({ ...courseData, [field]: newArray });
  };

  const addLesson = () => {
    if (!currentLesson.title || !currentLesson.description) {
      alert('Please fill in lesson title and description');
      return;
    }

    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: currentLesson.title || '',
      description: currentLesson.description || '',
      videoUrl: currentLesson.videoUrl || '',
      duration: currentLesson.duration || '',
      materials: currentLesson.materials || [],
      order: lessons.length + 1
    };

    setLessons([...lessons, newLesson]);
    setCurrentLesson({
      title: '',
      description: '',
      videoUrl: '',
      duration: '',
      materials: [],
      order: lessons.length + 2
    });
  };

  const removeLesson = (lessonId: string) => {
    setLessons(lessons.filter(l => l.id !== lessonId));
  };

  const addMaterial = () => {
    const newMaterial: Material = {
      id: Date.now().toString(),
      title: 'New Material',
      type: 'pdf',
      url: ''
    };
    setCurrentLesson({
      ...currentLesson,
      materials: [...(currentLesson.materials || []), newMaterial]
    });
  };

  const updateMaterial = (index: number, field: keyof Material, value: any) => {
    const newMaterials = [...(currentLesson.materials || [])];
    newMaterials[index] = { ...newMaterials[index], [field]: value };
    setCurrentLesson({ ...currentLesson, materials: newMaterials });
  };

  const removeMaterial = (index: number) => {
    const newMaterials = (currentLesson.materials || []).filter((_, i) => i !== index);
    setCurrentLesson({ ...currentLesson, materials: newMaterials });
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    setSaving(true);

    const finalCourseData = {
      ...courseData,
      status,
      lessons,
      createdAt: new Date().toISOString()
    };

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/admin/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: JSON.stringify(finalCourseData)
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Course ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
        router.push(`/admin/training/courses/${data.courseId}`);
      } else {
        alert('Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="flex items-center gap-3">
                <img src="/jascomelogo.png" alt="JACOM Logo" className="h-12 w-auto" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Create New Course</h1>
            </div>
            <Link href="/admin/training" className="text-gray-600 hover:text-primary text-sm font-medium">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200 mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-semibold">Course Details</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center gap-3 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-semibold">Course Content</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center gap-3 ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="font-semibold">Review & Publish</span>
            </div>
          </div>
        </div>

        {/* Step 1: Course Details */}
        {step === 1 && (
          <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Information</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Course Name *</label>
                  <input
                    type="text"
                    value={courseData.name}
                    onChange={(e) => handleCourseDataChange('name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="e.g., Full Stack Web Development"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Course Slug *</label>
                  <input
                    type="text"
                    value={courseData.slug}
                    onChange={(e) => handleCourseDataChange('slug', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="e.g., full-stack-web-development"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description *</label>
                <textarea
                  value={courseData.description}
                  onChange={(e) => handleCourseDataChange('description', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  rows={4}
                  placeholder="Describe what students will learn in this course..."
                  required
                ></textarea>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Category *</label>
                  <select
                    value={courseData.category}
                    onChange={(e) => handleCourseDataChange('category', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  >
                    <option>Web Development</option>
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Mobile Development</option>
                    <option>Data Science</option>
                    <option>DevOps</option>
                    <option>UI/UX Design</option>
                    <option>Cloud Computing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Level *</label>
                  <select
                    value={courseData.level}
                    onChange={(e) => handleCourseDataChange('level', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>All Levels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Language *</label>
                  <select
                    value={courseData.language}
                    onChange={(e) => handleCourseDataChange('language', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  >
                    <option>English</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>Kinyarwanda</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Instructor *</label>
                  <input
                    type="text"
                    value={courseData.instructor}
                    onChange={(e) => handleCourseDataChange('instructor', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="Instructor name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Duration *</label>
                  <input
                    type="text"
                    value={courseData.duration}
                    onChange={(e) => handleCourseDataChange('duration', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="e.g., 12 weeks"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Thumbnail URL</label>
                  <input
                    type="text"
                    value={courseData.thumbnail}
                    onChange={(e) => handleCourseDataChange('thumbnail', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    value={courseData.price}
                    onChange={(e) => handleCourseDataChange('price', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="1200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Discount Price ($)</label>
                  <input
                    type="number"
                    value={courseData.discountPrice}
                    onChange={(e) => handleCourseDataChange('discountPrice', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="450"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Requirements</label>
                {courseData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      placeholder="e.g., Basic HTML knowledge"
                    />
                    <button
                      onClick={() => removeArrayField('requirements', index)}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayField('requirements')}
                  className="mt-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition text-sm"
                >
                  + Add Requirement
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Learning Outcomes</label>
                {courseData.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={outcome}
                      onChange={(e) => handleArrayFieldChange('learningOutcomes', index, e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      placeholder="e.g., Build full-stack web applications"
                    />
                    <button
                      onClick={() => removeArrayField('learningOutcomes', index)}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayField('learningOutcomes')}
                  className="mt-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition text-sm"
                >
                  + Add Learning Outcome
                </button>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition"
                >
                  Next: Add Course Content
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Course Content */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Added Lessons */}
            {lessons.length > 0 && (
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Course Lessons ({lessons.length})</h3>
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{lesson.title}</div>
                          <div className="text-sm text-gray-600">{lesson.duration} • {lesson.materials.length} materials</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeLesson(lesson.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Lesson */}
            <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Lesson</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Lesson Title *</label>
                  <input
                    type="text"
                    value={currentLesson.title}
                    onChange={(e) => setCurrentLesson({ ...currentLesson, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="e.g., Introduction to React"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Lesson Description *</label>
                  <textarea
                    value={currentLesson.description}
                    onChange={(e) => setCurrentLesson({ ...currentLesson, description: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    rows={3}
                    placeholder="Describe what this lesson covers..."
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Video URL</label>
                    <input
                      type="text"
                      value={currentLesson.videoUrl}
                      onChange={(e) => setCurrentLesson({ ...currentLesson, videoUrl: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Duration</label>
                    <input
                      type="text"
                      value={currentLesson.duration}
                      onChange={(e) => setCurrentLesson({ ...currentLesson, duration: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      placeholder="e.g., 45 min"
                    />
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Lesson Materials</label>
                  {(currentLesson.materials || []).map((material, index) => (
                    <div key={material.id} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={material.title}
                        onChange={(e) => updateMaterial(index, 'title', e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        placeholder="Material title"
                      />
                      <select
                        value={material.type}
                        onChange={(e) => updateMaterial(index, 'type', e.target.value)}
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      >
                        <option value="pdf">PDF</option>
                        <option value="video">Video</option>
                        <option value="link">Link</option>
                        <option value="document">Document</option>
                      </select>
                      <input
                        type="text"
                        value={material.url}
                        onChange={(e) => updateMaterial(index, 'url', e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        placeholder="URL"
                      />
                      <button
                        onClick={() => removeMaterial(index)}
                        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addMaterial}
                    className="mt-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition text-sm"
                  >
                    + Add Material
                  </button>
                </div>

                <button
                  onClick={addLesson}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Add This Lesson to Course
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold transition"
              >
                Back: Course Details
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition"
              >
                Next: Review & Publish
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Publish */}
        {step === 3 && (
          <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Course</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-semibold">Name:</span> {courseData.name}</div>
                  <div><span className="font-semibold">Category:</span> {courseData.category}</div>
                  <div><span className="font-semibold">Level:</span> {courseData.level}</div>
                  <div><span className="font-semibold">Duration:</span> {courseData.duration}</div>
                  <div><span className="font-semibold">Instructor:</span> {courseData.instructor}</div>
                  <div><span className="font-semibold">Price:</span> ${courseData.price}</div>
                  <div><span className="font-semibold">Total Lessons:</span> {lessons.length}</div>
                  <div><span className="font-semibold">Language:</span> {courseData.language}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Content</h3>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 bg-primary rounded text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="font-semibold">{lesson.title}</span>
                      <span className="text-gray-600">• {lesson.duration}</span>
                      <span className="text-gray-600">• {lesson.materials.length} materials</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold transition"
                >
                  Back: Edit Content
                </button>
                <button
                  onClick={() => handleSubmit('draft')}
                  disabled={saving}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save as Draft'}
                </button>
                <button
                  onClick={() => handleSubmit('published')}
                  disabled={saving}
                  className="flex-1 bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {saving ? 'Publishing...' : 'Publish Course'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
