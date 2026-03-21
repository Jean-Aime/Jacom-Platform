"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";

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

interface CoursePhase {
  phaseNumber: number;
  title: string;
  description: string;
  materialPrice: number;
  materialDiscountedPrice: number;
  classPrice: number;
  duration: string;
}

interface CoursePricing {
  location: string;
  planType: string;
  originalPrice: number;
  discountedPrice: number;
  features: string;
}

interface ClassSchedule {
  sessionType: string;
  groupNumber: number | null;
  daysOfWeek: string;
  timeEST: string;
  timePST: string;
  timeEAT: string;
  timeETH: string;
}

interface AcademySettings {
  heroTitle: string;
  heroSubtitle: string;
  classStartDate: string;
  scholarshipAnnouncementDate: string;
  registrationOpen: boolean;
  contactPhone: string;
  featuredCourse?: Course & {
    phases: CoursePhase[];
    pricing: CoursePricing[];
    schedule: ClassSchedule[];
  };
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

export default function AcademyPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<AcademySettings | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<'Outside Rwanda' | 'Inside Rwanda'>('Outside Rwanda');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuthentication();
    fetchPageData();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('session-token');
      if (!token) {
        setIsAuthenticated(false);
        setCheckingAuth(false);
        return;
      }

      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const response = await fetch(`${BACKEND}/auth/check`, {
        headers: { 'X-Session-Token': token },
        credentials: 'include'
      });

      setIsAuthenticated(response.ok);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const fetchPageData = async () => {
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
    
    try {
      const [settingsRes, coursesRes] = await Promise.all([
        fetch(`${BACKEND}/academy-settings`),
        fetch(`${BACKEND}/academy/courses`)
      ]);
      
      const settingsData = await settingsRes.json();
      const coursesData = await coursesRes.json();
      
      setSettings(settingsData);
      
      // If no courses from backend, use mock data
      if (!Array.isArray(coursesData) || coursesData.length === 0) {
        console.log('No courses from backend, using mock data');
        setCourses(getMockCourses());
      } else {
        setCourses(coursesData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Use mock data on error
      setCourses(getMockCourses());
    } finally {
      setLoading(false);
    }
  };

  const getMockCourses = (): Course[] => [
    {
      id: 'course_001',
      name: 'Full Stack Web Development',
      slug: 'full-stack-web-development',
      category: 'Web Development',
      description: 'Master modern web development with React, Next.js, Node.js, and PostgreSQL. Build production-ready applications from scratch.',
      icon: 'Code',
      totalPrice: 1200.00,
      fullPaymentPrice: 1080.00,
      installmentCount: 3,
      installmentAmount: 400.00,
      startDate: '2024-04-01',
      duration: '12 weeks',
      deliveryMode: 'hybrid',
      status: 'published',
      featured: true,
      maxStudents: 50,
      currentEnrolled: 15
    },
    {
      id: 'course_002',
      name: 'React & Next.js Mastery',
      slug: 'react-nextjs-mastery',
      category: 'Frontend Development',
      description: 'Deep dive into React 18 and Next.js 14. Learn advanced patterns, server components, and modern frontend architecture.',
      icon: 'React',
      totalPrice: 800.00,
      fullPaymentPrice: 720.00,
      installmentCount: 2,
      installmentAmount: 400.00,
      startDate: '2024-04-15',
      duration: '8 weeks',
      deliveryMode: 'online',
      status: 'published',
      featured: true,
      maxStudents: 40,
      currentEnrolled: 23
    },
    {
      id: 'course_003',
      name: 'Mobile App Development',
      slug: 'mobile-app-development',
      category: 'Mobile Development',
      description: 'Build cross-platform mobile apps with React Native. Deploy to iOS and Android from a single codebase.',
      icon: 'Smartphone',
      totalPrice: 950.00,
      fullPaymentPrice: 855.00,
      installmentCount: 3,
      installmentAmount: 317.00,
      startDate: '2024-05-01',
      duration: '10 weeks',
      deliveryMode: 'online',
      status: 'published',
      featured: false,
      maxStudents: 35,
      currentEnrolled: 8
    },
    {
      id: 'course_004',
      name: 'Python for Data Science',
      slug: 'python-data-science',
      category: 'Data Science',
      description: 'Learn Python, NumPy, Pandas, and machine learning fundamentals. Analyze data and build predictive models.',
      icon: 'Database',
      totalPrice: 1100.00,
      fullPaymentPrice: 990.00,
      installmentCount: 3,
      installmentAmount: 367.00,
      startDate: '2024-05-15',
      duration: '12 weeks',
      deliveryMode: 'hybrid',
      status: 'published',
      featured: true,
      maxStudents: 45,
      currentEnrolled: 12
    },
    {
      id: 'course_005',
      name: 'Cloud Computing with AWS',
      slug: 'cloud-computing-aws',
      category: 'Cloud Computing',
      description: 'Master AWS services, cloud architecture, and DevOps practices. Prepare for AWS certification.',
      icon: 'Cloud',
      totalPrice: 1000.00,
      fullPaymentPrice: 900.00,
      installmentCount: 3,
      installmentAmount: 333.00,
      startDate: '2024-06-01',
      duration: '10 weeks',
      deliveryMode: 'online',
      status: 'published',
      featured: false,
      maxStudents: 30,
      currentEnrolled: 18
    },
    {
      id: 'course_006',
      name: 'UI/UX Design Fundamentals',
      slug: 'ui-ux-design',
      category: 'Design',
      description: 'Learn user interface and user experience design principles. Create beautiful, user-friendly applications.',
      icon: 'Design',
      totalPrice: 750.00,
      fullPaymentPrice: 675.00,
      installmentCount: 2,
      installmentAmount: 375.00,
      startDate: '2024-06-15',
      duration: '8 weeks',
      deliveryMode: 'online',
      status: 'published',
      featured: false,
      maxStudents: 40,
      currentEnrolled: 25
    }
  ];

  const handleEnrollClick = (course?: Course) => {
    // Find the course object if only ID is provided
    const courseToEnroll = course || courses.find(c => c.id === settings?.featuredCourse?.id);
    
    if (!courseToEnroll) {
      console.error('Course not found');
      return;
    }

    // Navigate to enrollment page with course ID
    router.push(`/training/enroll?courseId=${courseToEnroll.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Training...</p>
        </div>
      </div>
    );
  }

  const featuredCourse = settings?.featuredCourse;
  const startDate = settings?.classStartDate ? new Date(settings.classStartDate) : null;
  const scholarshipDate = settings?.scholarshipAnnouncementDate ? new Date(settings.scholarshipAnnouncementDate) : null;

  return (
    <>
      <MegaMenuHeader />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-primary/30">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                {settings?.registrationOpen ? 'Enrollment Open - Limited Seats Available' : 'Registration Closed'}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {settings?.heroTitle || 'AI-Powered Application Development Class'}
              </h1>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
                {settings?.heroSubtitle || 'Master modern application development with AI-powered tools and industry-leading practices'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => handleEnrollClick()}
                  className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-base transition shadow-lg flex items-center justify-center gap-2"
                >
                  Enroll Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-base transition">
                  Download Syllabus
                </button>
              </div>
            </div>
          </div>
        </section>

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
                    <div className="text-4xl font-bold text-primary mb-2">{startDate ? startDate.getDate() : '--'}</div>
                    <div className="text-sm text-gray-600">Class Starts</div>
                    <div className="text-xs text-gray-500 mt-1">{startDate ? startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'TBD'}</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{featuredCourse?.maxStudents || 100}</div>
                    <div className="text-sm text-gray-600">Max Students</div>
                    <div className="text-xs text-gray-500 mt-1">Limited Seats</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{scholarshipDate ? scholarshipDate.getDate() : '--'}</div>
                    <div className="text-sm text-gray-600">Scholarship Day</div>
                    <div className="text-xs text-gray-500 mt-1">{scholarshipDate ? scholarshipDate.toLocaleDateString('en-US', { month: 'short' }) : 'TBD'}</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{featuredCourse?.duration || '12wks'}</div>
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

                    <button 
                      onClick={() => handleEnrollClick()}
                      className="w-full py-2 bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 rounded-md font-medium text-sm transition-all block text-center"
                    >
                      Enroll Now
                    </button>
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

                  <button 
                    onClick={() => handleEnrollClick()}
                    className="w-full py-2 bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 rounded-md font-medium text-sm transition-all mb-3 block text-center"
                  >
                    Get The Bundle
                  </button>
                </div>

                {/* Bottom CTA Buttons - Red Bar */}
                <div className="bg-primary rounded-b-2xl">
                  <div className="flex">
                    <button onClick={() => handleEnrollClick()} className="flex-1 py-3 text-white font-semibold text-xs border-r border-red-700 text-center hover:bg-red-700 transition">
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

                    <button 
                      onClick={() => handleEnrollClick(course)}
                      className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-red-700 transition-all block text-center"
                    >
                      Enroll Now
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

        {/* Scholarship Opportunity */}
        <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-yellow-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold mb-4">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    Scholarship Opportunity
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply for Full Scholarship</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We believe in empowering talented individuals regardless of their financial situation. Apply for our scholarship program and get a chance to learn for free.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {['100% tuition coverage', 'Access to all course materials', 'Mentorship support', 'Certificate upon completion'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleEnrollClick()} className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-block">
                    Apply for Scholarship
                  </button>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-8 text-center">
                  <div className="text-6xl font-bold text-primary mb-4">{scholarshipDate ? scholarshipDate.getDate() : '--'}</div>
                  <div className="text-xl font-bold text-gray-900 mb-2">Announcement Date</div>
                  <p className="text-gray-600 mb-6">{scholarshipDate ? scholarshipDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'To be announced'}</p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-3xl font-bold text-primary mb-1">10+</div>
                    <div className="text-sm text-gray-600">Scholarships Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learn from Real Professionals */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Learn from Real Professionals</h2>
              <p className="text-gray-600 text-lg">Industry experts with years of practical experience</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'John Smith', role: 'Senior Developer', image: '/images/instructor-1.jpg' },
                { name: 'Sarah Johnson', role: 'Tech Lead', image: '/images/instructor-2.jpg' },
                { name: 'Michael Chen', role: 'Solutions Architect', image: '/images/instructor-3.jpg' },
                { name: 'Emily Davis', role: 'DevOps Engineer', image: '/images/instructor-4.jpg' }
              ].map((instructor, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                  <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{instructor.name}</h3>
                    <p className="text-sm text-primary font-semibold">{instructor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kickstart Your Job */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Kickstart Your Job with Our Career Support</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We don't just teach you skills—we help you land your dream job. Get personalized career guidance, resume reviews, interview preparation, and direct connections to hiring companies.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Resume and portfolio building',
                    'Mock interviews with industry experts',
                    'Direct referrals to partner companies',
                    'Career counseling and mentorship',
                    'Job placement assistance'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleEnrollClick()} className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-block">
                  Start Your Journey
                </button>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { stat: '95%', label: 'Job Placement Rate' },
                    { stat: '$75K+', label: 'Average Starting Salary' },
                    { stat: '200+', label: 'Hiring Partners' },
                    { stat: '3 Months', label: 'Avg. Time to Hire' }
                  ].map((item, i) => (
                    <div key={i} className="text-center p-6 bg-gradient-to-br from-gray-50 to-red-50 rounded-xl">
                      <div className="text-4xl font-bold text-primary mb-2">{item.stat}</div>
                      <div className="text-sm text-gray-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
              <p className="text-gray-600 text-lg">Real stories from graduates who transformed their careers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Alex Thompson', role: 'Software Engineer at Google', quote: 'This program completely changed my career trajectory. The hands-on projects and mentorship were invaluable.' },
                { name: 'Maria Garcia', role: 'Full Stack Developer', quote: 'Best investment I ever made. The instructors are world-class and the curriculum is cutting-edge.' },
                { name: 'David Kim', role: 'Tech Lead at Startup', quote: 'From zero coding experience to landing my dream job in 6 months. The support was incredible.' }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-lg">Everything you need to know about our program</p>
            </div>

            <div className="space-y-4">
              {[
                { q: 'Do I need prior programming experience?', a: 'No prior experience required. Our curriculum starts from the basics and gradually builds up to advanced topics.' },
                { q: 'What is the class schedule?', a: 'We offer flexible schedules with live classes in multiple time zones. You can also access recorded sessions anytime.' },
                { q: 'How long is the program?', a: 'The complete program is 12 weeks long, with approximately 15-20 hours of commitment per week.' },
                { q: 'Do you offer job placement assistance?', a: 'Yes! We provide resume reviews, interview prep, and direct referrals to our 200+ hiring partners.' },
                { q: 'What if I miss a live class?', a: 'All live sessions are recorded and available for 24/7 access. You can watch them at your convenience.' },
                { q: 'Is there a refund policy?', a: 'Yes, we offer a 14-day money-back guarantee if you\'re not satisfied with the program.' }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-lg text-gray-300 mb-8">Have questions? Our team is here to help you get started</p>
            <a href={`tel:${settings?.contactPhone}`} className="inline-block px-10 py-4 bg-primary hover:bg-red-700 text-white rounded-lg font-bold text-lg transition-all shadow-lg">
              {settings?.contactPhone || 'Contact Us'}
            </a>
          </div>
        </section>

        <Footer />
      </div>

    </>
  );
}
