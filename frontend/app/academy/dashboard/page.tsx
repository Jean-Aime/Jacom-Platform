"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Course {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  totalPrice: number;
  fullPaymentPrice: number;
  installmentCount: number;
  installmentAmount: number;
  startDate: string;
  duration: string;
  deliveryMode: string;
  status: string;
  featured: boolean;
  maxStudents: number;
  currentEnrolled: number;
}

interface User {
  name: string;
  email: string;
}

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchCourses();
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

  const fetchCourses = async () => {
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const response = await fetch(`${BACKEND}/courses`);
      if (response.ok) {
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

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

  const getCourseIcon = (category: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'Application Development': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
      'Cloud Computing': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
      'Data Analytics': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      'Development': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    };
    return icons[category] || icons['Development'];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-3 group">
                <img 
                  src="/jascomelogo.png" 
                  alt="JAS.COME Logo" 
                  className="h-16 w-auto transition-transform group-hover:scale-105"
                />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-primary text-sm">
                Back to Home
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{user?.name}</div>
                  <div className="text-gray-500">{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-gray-600 ml-2"
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

      {/* Welcome Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Illustration */}
          <div className="mb-8">
            <div className="w-64 h-48 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-purple-200/50"></div>
              <div className="relative z-10 text-6xl">🎓</div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">⭐</span>
              </div>
              <div className="absolute bottom-4 left-4 w-12 h-8 bg-red-400 rounded-lg"></div>
              <div className="absolute top-1/2 left-8 w-6 h-6 bg-green-400 rounded-full"></div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-orange-500">JAS.COM</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            Your request to join the class has been received.
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-gray-600 mb-4">
              Everyone in here understands how intimidating and challenging this journey is.
            </p>
            <p className="text-gray-600 mb-6">
              A welcoming community is here to support you at every turn.
            </p>
            
            <p className="text-gray-600">
              If you want to get started right away, please feel free to contact us using
              our phone number <span className="font-semibold text-gray-900">202-386-2702</span> or email address{" "}
              <a href="mailto:support@jas.com" className="text-orange-500 hover:underline font-semibold">
                support@jas.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Course Overview Banner */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-gray-50 to-red-50 rounded-2xl p-8 md:p-12 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Equipped with Cutting-Edge Technology</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Learn to build modern applications using AI-powered development tools, cloud infrastructure, and industry best practices. Our curriculum is designed by experts and updated regularly.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-gray-700 font-medium">Live Interactive Classes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-gray-700 font-medium">Hands-on Projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-gray-700 font-medium">Career Support</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">14</div>
                  <div className="text-sm text-gray-600">Class Starts</div>
                  <div className="text-xs text-gray-500 mt-1">Mar 2026</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100</div>
                  <div className="text-sm text-gray-600">Max Students</div>
                  <div className="text-xs text-gray-500 mt-1">Limited Seats</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15</div>
                  <div className="text-sm text-gray-600">Scholarship Day</div>
                  <div className="text-xs text-gray-500 mt-1">Mar</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">12wks</div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="text-xs text-gray-500 mt-1">Full Program</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Courses</h2>
            <p className="text-gray-600 text-lg">Choose from our comprehensive training programs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {courses.slice(0, 4).map((course) => (
              <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-red-100 flex items-center justify-center">
                  <div className="w-20 h-20 text-primary">{getCourseIcon(course.category)}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{course.category}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {course.duration}
                    </div>
                    <div>
                      <span className="text-gray-400 line-through text-sm">${course.totalPrice}</span>
                      <span className="text-xl font-bold text-primary ml-2">${course.fullPaymentPrice}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-red-700 transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Methodology */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The Five Step Week We Follow</h2>
            <p className="text-gray-300 text-lg">A proven methodology to accelerate your learning</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>, text: 'Watch lecture videos', num: '1' },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, text: 'Attend live discussions', num: '2' },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>, text: 'Complete checklist items', num: '3' },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, text: 'Work on exercises', num: '4' },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, text: 'Join group sessions', num: '5' }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto border border-white/20 text-white">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.num}
                  </div>
                </div>
                <p className="text-white/90 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}