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

const getCourseIcon = (category: string) => {
  const icons: { [key: string]: JSX.Element } = {
    'Application Development': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    'Cloud Computing': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    'Data Analytics': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    'Database': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
    'Development': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    'Integration': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
    'Testing': <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  };
  return icons[category] || icons['Development'];
};

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<'Outside Rwanda' | 'Inside Rwanda'>('Outside Rwanda');
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      {/* Student Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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
              <Link href="/" className="text-gray-600 hover:text-primary text-sm font-medium">
                Back to Home
              </Link>
              <div className="flex items-center gap-3 border-l pl-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
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
                  className="text-gray-400 hover:text-gray-600 ml-2 p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Logout"
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

      {/* Course Overview Banner */}
      <section className="py-16 bg-white">
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

      {/* Jas.com Coding Training Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Jas.com</h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 mb-6">Coding Training</h2>
            
            {/* Orange divider line */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-20 h-0.5 bg-gray-300"></div>
              <div className="w-8 h-1 bg-primary"></div>
              <div className="w-20 h-0.5 bg-gray-300"></div>
            </div>
            
            {/* Location Toggle and Discount Badge */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex gap-0 shadow-lg rounded-full overflow-hidden">
                <button
                  onClick={() => setSelectedLocation('Outside Rwanda')}
                  className={`px-8 py-3 font-semibold text-sm transition-all ${selectedLocation === 'Outside Rwanda' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 border-r border-gray-300'}`}
                >
                  Outside Rwanda
                </button>
                <button
                  onClick={() => setSelectedLocation('Inside Rwanda')}
                  className={`px-8 py-3 font-semibold text-sm transition-all ${selectedLocation === 'Inside Rwanda' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
                >
                  Inside Rwanda
                </button>
              </div>
              <div className="inline-flex items-center px-5 py-2.5 bg-primary text-white rounded-lg font-bold text-sm shadow-lg">
                Up to 66% OFF
              </div>
            </div>
          </div>

          {/* Two Column Layout: Pricing LEFT, Course Info RIGHT */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* LEFT COLUMN - Pricing Plans */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="text-center p-6 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing Plans</h2>
                <p className="text-gray-600 text-sm">Choose the option that fits your location and learning style.</p>
              </div>

              {/* In-class students */}
              <div className="mx-6 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg px-4 py-2 font-bold text-center text-sm">
                  In-class students
                </div>
                <div className="bg-gray-50 rounded-b-lg p-4">
                  <div className="text-center mb-4">
                    <div className="flex items-baseline justify-center gap-2 mb-1">
                      <span className="text-lg text-gray-400 line-through">$2400</span>
                      <span className="text-3xl font-bold text-primary">$1600</span>
                    </div>
                    <p className="text-xs text-gray-600">One - Time Payment</p>
                  </div>

                  <ul className="space-y-1 mb-4">
                    <li className="flex items-start gap-2 text-xs">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      <span className="text-gray-700">Full Program access</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      <span className="text-gray-700">All phases included</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      <span className="text-gray-700">Instructor-led classes</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      <span className="text-gray-700">Instructor-led group sessions</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Save More Banner */}
              <div className="mx-6 mb-4">
                <div className="bg-primary text-white rounded-md px-4 py-2 font-semibold text-center text-xs">
                  — Save More • First Batch 2026 —
                </div>
              </div>

              {/* Material Access Only */}
              <div className="mx-6 mb-4">
                <div className="text-center mb-3">
                  <h3 className="text-base font-bold text-gray-900">Material Access Only</h3>
                </div>
                <div className="text-center mb-3">
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-lg text-gray-400 line-through">$1200</span>
                    <span className="text-3xl font-bold text-primary">$450</span>
                  </div>
                  <p className="text-xs text-gray-600">One - Time Payment</p>
                </div>

                <ul className="space-y-1 mb-3">
                  <li className="flex items-start gap-2 text-xs">
                    <svg className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-gray-700">All 4 phases bundle</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs">
                    <svg className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-gray-700">Self paced learning</span>
                  </li>
                </ul>

                <p className="text-xs text-gray-500 mb-3 text-center">* Discounted introductory prices are valid only for first batch students of 2026!</p>
              </div>

              {/* Bottom CTA Buttons - Red Bar */}
              <div className="bg-primary rounded-b-2xl">
                <div className="flex">
                  <button className="flex-1 py-3 text-white font-semibold text-xs border-r border-red-700">
                    Join Class
                  </button>
                  <button className="flex-1 py-3 text-white font-semibold text-xs">
                    Learn How to Code & Build an Application
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Course Info & Phases */}
            <div className="space-y-4">
              {/* Next Class Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-primary mb-1">
                  Next class will start on
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-3">
                  March 14th, 2026
                </p>
                <p className="text-gray-600 text-xs mb-4">
                  Learning application development is fundamental in today's digital age, as it forms the cornerstone of the technology-driven world we live in.
                </p>
                
                <div className="bg-gradient-to-r from-gray-50 to-red-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                    <div className="text-xl font-bold text-primary">202-386-2702</div>
                  </div>
                  <p className="text-xs text-gray-600">
                    If you are looking to register, or have questions you want to ask, please feel free to give us a call. We will address your questions and guide you on the next steps.
                  </p>
                </div>
              </div>

              {/* Course Phases */}
              <div className="space-y-3">
                {/* Phase 1 */}
                  <div className="bg-red-100 rounded-lg p-4 shadow-md border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">
                        Phase 1: Building static websites using HTML, CSS & Bootstrap
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">Learn about the underlying structure of the web.</p>
                      <div className="space-y-0.5 text-xs">
                        <div>
                          <span className="text-gray-600">Material access only price: </span>
                          <span className="text-gray-400 line-through">$300</span>
                          <span className="text-primary font-bold ml-1">$118</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Class access price: </span>
                          <span className="text-primary font-bold">$600</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">
                        Phase 2: Learn coding with JavaScript
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">Learn programming fundamentals using JavaScript.</p>
                      <div className="space-y-0.5 text-xs">
                        <div>
                          <span className="text-gray-600">Material access only price: </span>
                          <span className="text-gray-400 line-through">$300</span>
                          <span className="text-primary font-bold ml-1">$149</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Class access price: </span>
                          <span className="text-primary font-bold">$600</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">
                        Phase 3: React.js, Node.js, MySQL & Express.js
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">Learn the backend side of application development.</p>
                      <div className="space-y-0.5 text-xs">
                        <div>
                          <span className="text-gray-600">Material access only price: </span>
                          <span className="text-gray-400 line-through">$300</span>
                          <span className="text-primary font-bold ml-1">$149</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Class access price: </span>
                          <span className="text-primary font-bold">$600</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 4 */}
                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">
                        Phase 4: Building AI-Powered Products | AI Integration
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">Learn how to convert your application into an intelligent one by connecting it with AI models.</p>
                      <div className="space-y-0.5 text-xs">
                        <div>
                          <span className="text-gray-600">Material access only price: </span>
                          <span className="text-gray-400 line-through">$300</span>
                          <span className="text-primary font-bold ml-1">$199</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Class access price: </span>
                          <span className="text-primary font-bold">$600</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Schedule */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Class Schedule</h2>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              This schedule shows live classes and group sessions in multiple time zones. Each session time is displayed in EST (Eastern Standard Time), PST (Pacific Standard Time), EAT (East Africa Time), and Ethiopian local time so you can easily follow along no matter where you are.
            </p>
          </div>

          {/* Live Classes */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-gray-900">Live Classes</h3>
            </div>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Saturday & Sunday</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                      <span className="font-semibold text-gray-700 text-sm">EST</span>
                    </div>
                    <span className="text-gray-600 text-sm">10:00 AM - 12:00 PM</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                      <span className="font-semibold text-gray-700 text-sm">PST</span>
                    </div>
                    <span className="text-gray-600 text-sm">7:00 AM - 9:00 AM</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                      <span className="font-semibold text-gray-700 text-sm">EAT</span>
                    </div>
                    <span className="text-gray-600 text-sm">6:00 PM - 8:00 PM</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                      <span className="font-semibold text-gray-700 text-sm">ETH+T</span>
                    </div>
                    <span className="text-gray-600 text-sm">12:00 - 2:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Group Sessions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Group 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Group 1</h3>
                <p className="text-sm text-gray-600">Tue & Thu</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">EST</span>
                  </div>
                  <span className="text-gray-600 text-sm">10:00 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">PST</span>
                  </div>
                  <span className="text-gray-600 text-sm">7:00 AM - 9:00 AM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">EAT</span>
                  </div>
                  <span className="text-gray-600 text-sm">6:00 PM - 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">ETH+T</span>
                  </div>
                  <span className="text-gray-600 text-sm">12:00 - 2:00</span>
                </div>
              </div>
            </div>

            {/* Group 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Group 2</h3>
                <p className="text-sm text-gray-600">Tue & Thu</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">EST</span>
                  </div>
                  <span className="text-gray-600 text-sm">1:00 PM - 3:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">PST</span>
                  </div>
                  <span className="text-gray-600 text-sm">10:00 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">EAT</span>
                  </div>
                  <span className="text-gray-600 text-sm">9:00 PM - 11:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">ETH+T</span>
                  </div>
                  <span className="text-gray-600 text-sm">3:00 - 5:00</span>
                </div>
              </div>
            </div>

            {/* Group 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Group 3</h3>
                <p className="text-sm text-gray-600">Tue & Thu</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">EST</span>
                  </div>
                  <span className="text-gray-600 text-sm">7:00 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">PST</span>
                  </div>
                  <span className="text-gray-600 text-sm">4:00 PM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">EAT</span>
                  </div>
                  <span className="text-gray-600 text-sm">3:00 AM - 5:00 AM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">ETH+T</span>
                  </div>
                  <span className="text-gray-600 text-sm">9:00 - 11:00</span>
                </div>
              </div>
            </div>

            {/* Group 4 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Group 4</h3>
                <p className="text-sm text-gray-600">Tue & Thu</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">EST</span>
                  </div>
                  <span className="text-gray-600 text-sm">9:00 PM - 11:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">PST</span>
                  </div>
                  <span className="text-gray-600 text-sm">6:00 PM - 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">EAT</span>
                  </div>
                  <span className="text-gray-600 text-sm">5:00 AM - 7:00 AM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
                    <span className="font-semibold text-gray-700 text-sm">ETH+T</span>
                  </div>
                  <span className="text-gray-600 text-sm">11:00 - 1:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h2>
            <p className="text-gray-600 text-lg">Choose from our comprehensive training programs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.isArray(courses) && courses.map((course) => (
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

                  <Link 
                    href={`/training/${course.slug}`}
                    className="block w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-red-700 transition-all text-center"
                  >
                    View Details
                  </Link>
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
