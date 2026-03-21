'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Course {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  totalLessons: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  discountPrice?: number;
  rating: number;
  enrolledStudents: number;
  thumbnail?: string;
  features: string[];
}

export default function CourseBrowsePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Web Development', 'Frontend', 'Backend', 'Mobile Development', 'Data Science', 'DevOps'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${backendUrl}/api/training/courses`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });

      if (response.ok) {
        setCourses(await response.json());
      } else {
        useMockData();
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setCourses([
      {
        id: '1',
        name: 'Full Stack Web Development',
        slug: 'full-stack-web-development',
        description: 'Master modern web development from frontend to backend. Build complete applications using React, Node.js, and databases.',
        category: 'Web Development',
        instructor: 'John Doe',
        duration: '12 weeks',
        totalLessons: 45,
        level: 'Intermediate',
        price: 1200,
        discountPrice: 450,
        rating: 4.8,
        enrolledStudents: 156,
        features: ['45 video lessons', 'Hands-on projects', 'Certificate of completion', 'Lifetime access']
      },
      {
        id: '2',
        name: 'React & Next.js Mastery',
        slug: 'react-nextjs-mastery',
        description: 'Deep dive into React and Next.js. Learn advanced patterns, server-side rendering, and build production-ready applications.',
        category: 'Frontend',
        instructor: 'Jane Smith',
        duration: '8 weeks',
        totalLessons: 32,
        level: 'Advanced',
        price: 900,
        discountPrice: 350,
        rating: 4.9,
        enrolledStudents: 98,
        features: ['32 video lessons', 'Real-world projects', 'Code reviews', 'Certificate']
      },
      {
        id: '3',
        name: 'Node.js Backend Development',
        slug: 'nodejs-backend',
        description: 'Build scalable backend applications with Node.js, Express, and databases. Learn API design and deployment.',
        category: 'Backend',
        instructor: 'Mike Johnson',
        duration: '10 weeks',
        totalLessons: 28,
        level: 'Intermediate',
        price: 1000,
        discountPrice: 400,
        rating: 4.7,
        enrolledStudents: 88,
        features: ['28 video lessons', 'API projects', 'Database design', 'Certificate']
      },
      {
        id: '4',
        name: 'Python for Data Science',
        slug: 'python-data-science',
        description: 'Learn Python programming and data analysis. Master pandas, NumPy, and machine learning basics.',
        category: 'Data Science',
        instructor: 'Sarah Williams',
        duration: '14 weeks',
        totalLessons: 50,
        level: 'Beginner',
        price: 1100,
        discountPrice: 425,
        rating: 4.8,
        enrolledStudents: 142,
        features: ['50 video lessons', 'Data projects', 'ML basics', 'Certificate']
      },
      {
        id: '5',
        name: 'Mobile App Development with React Native',
        slug: 'react-native-mobile',
        description: 'Build cross-platform mobile apps with React Native. Deploy to iOS and Android from a single codebase.',
        category: 'Mobile Development',
        instructor: 'David Chen',
        duration: '10 weeks',
        totalLessons: 35,
        level: 'Intermediate',
        price: 950,
        discountPrice: 375,
        rating: 4.6,
        enrolledStudents: 76,
        features: ['35 video lessons', 'Mobile projects', 'App deployment', 'Certificate']
      },
      {
        id: '6',
        name: 'DevOps & Cloud Infrastructure',
        slug: 'devops-cloud',
        description: 'Master DevOps practices, CI/CD pipelines, Docker, Kubernetes, and cloud platforms like AWS.',
        category: 'DevOps',
        instructor: 'Alex Kumar',
        duration: '12 weeks',
        totalLessons: 40,
        level: 'Advanced',
        price: 1300,
        discountPrice: 500,
        rating: 4.9,
        enrolledStudents: 65,
        features: ['40 video lessons', 'Cloud projects', 'CI/CD setup', 'Certificate']
      }
    ]);
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleEnroll = (courseSlug: string) => {
    const token = localStorage.getItem('session-token');
    if (!token) {
      router.push('/login?redirect=/training/courses');
    } else {
      router.push(`/training/enroll/${courseSlug}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
              <p className="text-gray-600 mt-2">Choose from our professional training programs</p>
            </div>
            <Link href="/training/dashboard" className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              My Dashboard
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              >
                {levels.map(level => (
                  <option key={level} value={level.toLowerCase()}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold text-gray-900">{filteredCourses.length}</span> courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-primary transition-all hover:shadow-lg">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-red-700/10 flex items-center justify-center">
                <svg className="w-20 h-20 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                    {course.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {course.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">({course.enrolledStudents} students)</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {course.instructor}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration} • {course.totalLessons} lessons
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    {course.discountPrice ? (
                      <div>
                        <span className="text-2xl font-bold text-primary">${course.discountPrice}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">${course.price}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleEnroll(course.slug)}
                  className="w-full bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Enroll Now
                </button>

                <Link
                  href={`/training/courses/${course.slug}`}
                  className="block text-center text-primary hover:text-red-700 font-medium text-sm mt-3"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-200">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your filters or search term</p>
          </div>
        )}
      </main>
    </div>
  );
}
