'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MegaMenuHeader from '@/components/Header/MegaMenuHeader';
import Footer from '@/components/Footer/Footer';
import { 
  BookOpen, MapPin, Globe, Laptop, Users, Video, 
  Calendar, Clock, DollarSign, CheckCircle, ArrowRight, 
  ArrowLeft, X, Mail, Award, FileText, Sparkles,
  CreditCard, Wallet, Info, Shield, Lock, Zap,
  Target, TrendingUp, Star, Gift, AlertCircle
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  startDate: string;
  totalPrice: number;
  fullPaymentPrice: number;
  installmentCount: number;
  installmentAmount: number;
  instructor?: string;
}

export default function EnrollmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<'Inside Rwanda' | 'Outside Rwanda'>('Outside Rwanda');
  const [learningMode, setLearningMode] = useState<'in_class' | 'online' | 'hybrid'>('hybrid');
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'installment'>('full');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const totalSteps = 5;

  useEffect(() => {
    if (courseId) {
      fetchCourse();
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [courseId]);

  const checkAuth = async () => {
    const token = localStorage.getItem('session-token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const response = await fetch(`${BACKEND}/auth/check`, {
        headers: { 'X-Session-Token': token },
        credentials: 'include'
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  const getMockCourses = (): Course[] => [
    {
      id: 'course_001',
      name: 'Full Stack Web Development',
      category: 'Web Development',
      description: 'Master modern web development with React, Next.js, Node.js, and PostgreSQL. Build production-ready applications from scratch.',
      totalPrice: 1200.00,
      fullPaymentPrice: 1080.00,
      installmentCount: 3,
      installmentAmount: 400.00,
      startDate: '2024-04-01',
      duration: '12 weeks',
      instructor: 'Senior Developer'
    },
    {
      id: 'course_002',
      name: 'React & Next.js Mastery',
      category: 'Frontend Development',
      description: 'Deep dive into React 18 and Next.js 14. Learn advanced patterns, server components, and modern frontend architecture.',
      totalPrice: 800.00,
      fullPaymentPrice: 720.00,
      installmentCount: 2,
      installmentAmount: 400.00,
      startDate: '2024-04-15',
      duration: '8 weeks',
      instructor: 'React Expert'
    },
    {
      id: 'course_003',
      name: 'Node.js & Backend Development',
      category: 'Backend Development',
      description: 'Build scalable backend systems with Node.js, Express, PostgreSQL, and microservices architecture.',
      totalPrice: 900.00,
      fullPaymentPrice: 810.00,
      installmentCount: 3,
      installmentAmount: 300.00,
      startDate: '2024-05-01',
      duration: '10 weeks',
      instructor: 'Backend Architect'
    }
  ];

  const fetchCourse = async () => {
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      console.log('Fetching courses from:', `${BACKEND}/academy/courses`);
      console.log('Looking for courseId:', courseId);
      
      const response = await fetch(`${BACKEND}/academy/courses`);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      let coursesData: any[] = [];
      
      if (data.success && Array.isArray(data.courses) && data.courses.length > 0) {
        coursesData = data.courses;
      } else {
        console.log('No courses from API, using mock data');
        coursesData = getMockCourses();
      }
      
      console.log('Available courses:', coursesData);
      const foundCourse = coursesData.find((c: any) => c.id === courseId || c.id === String(courseId));
      
      if (foundCourse) {
        console.log('Found course:', foundCourse);
        // Map the course data to ensure all required fields exist
        const mappedCourse: Course = {
          id: foundCourse.id,
          name: foundCourse.name || foundCourse.title || 'Unnamed Course',
          description: foundCourse.description || '',
          category: foundCourse.category || 'General',
          duration: foundCourse.duration || 'TBD',
          startDate: foundCourse.startDate || foundCourse.start_date || new Date().toISOString(),
          totalPrice: Number(foundCourse.totalPrice || foundCourse.total_price || 0),
          fullPaymentPrice: Number(foundCourse.fullPaymentPrice || foundCourse.full_payment_price || foundCourse.totalPrice || 0),
          installmentCount: Number(foundCourse.installmentCount || foundCourse.installment_count || 3),
          installmentAmount: Number(foundCourse.installmentAmount || foundCourse.installment_amount || 0),
          instructor: foundCourse.instructor || 'Expert Instructor'
        };
        setCourse(mappedCourse);
      } else {
        console.error('Course not found with ID:', courseId);
        console.log('Available course IDs:', coursesData.map((c: any) => c.id));
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      // Try mock courses on error
      const mockCourses = getMockCourses();
      const foundCourse = mockCourses.find((c) => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 2 && !selectedLocation) {
      setError('Please select your location');
      return;
    }
    if (currentStep === 3 && !learningMode) {
      setError('Please choose a learning mode');
      return;
    }
    if (currentStep === 4 && !paymentPlan) {
      setError('Please select a payment plan');
      return;
    }
    if (currentStep === 5 && (!agreeTerms || !agreePolicy)) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setError('');
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    // Check authentication first
    if (!isAuthenticated) {
      router.push(`/login?redirect=/training/enroll?courseId=${courseId}`);
      return;
    }

    if (!agreeTerms || !agreePolicy) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const token = localStorage.getItem('session-token');

      const response = await fetch(`${BACKEND}/academy/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: JSON.stringify({
          courseId: course?.id,
          location: selectedLocation,
          planType: learningMode,
          paymentPlan: paymentPlan
        })
      });

      const data = await response.json();

      if (response.ok) {
        setEnrollmentId(data.enrollmentId || 'ENROLL-' + Math.random().toString(36).substr(2, 9).toUpperCase());
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          router.push('/training/dashboard');
        }, 6000);
      } else {
        setError(data.error || 'Enrollment failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getPrice = () => {
    if (!course) return 0;
    return paymentPlan === 'full' ? course.fullPaymentPrice : course.totalPrice;
  };

  const getSavings = () => {
    if (!course) return 0;
    return course.totalPrice - course.fullPaymentPrice;
  };

  if (loading) {
    return (
      <>
        <MegaMenuHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading course details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!courseId) {
    return (
      <>
        <MegaMenuHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Course Selected</h2>
            <p className="text-gray-600 mb-6">Please select a course from the training page to enroll.</p>
            <button
              onClick={() => router.push('/training')}
              className="px-8 py-3 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
            >
              Browse Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <MegaMenuHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
            <p className="text-gray-600 mb-6">The course you're trying to enroll in could not be found.</p>
            <button
              onClick={() => router.push('/training')}
              className="px-8 py-3 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
            >
              Browse Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Success Page
  if (success) {
    return (
      <>
        <MegaMenuHeader />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Success Header */}
              <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-xl mb-6 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={3} />
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-3">Enrollment Successful!</h1>
                  <p className="text-white/90 text-xl">Welcome to {course.name}</p>
                </div>
              </div>

              <div className="p-10">
                {/* Enrollment Details */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-900 text-lg mb-2">Confirmation Email Sent</h3>
                      <p className="text-sm text-blue-700">Check your inbox for enrollment details and next steps</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border-2 border-blue-300 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Enrollment ID</span>
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Copy</button>
                    </div>
                    <div className="font-mono font-bold text-2xl text-gray-900 tracking-wider mb-2">{enrollmentId}</div>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      Save this for your records
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 text-2xl mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-600 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    What Happens Next?
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: Users, title: 'Admin Review', desc: 'Our team will review your enrollment request', time: '1-2 business days', color: 'from-purple-500 to-purple-600' },
                      { icon: CheckCircle, title: 'Approval Notification', desc: "You'll receive an email when approved", time: 'Via email', color: 'from-blue-500 to-blue-600' },
                      { icon: CreditCard, title: 'Payment Instructions', desc: 'Detailed payment information will be sent', time: 'After approval', color: 'from-green-500 to-green-600' },
                      { icon: Zap, title: 'Course Access', desc: 'Immediate access after payment confirmation', time: 'After payment', color: 'from-orange-500 to-orange-600' }
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-4 group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300">
                        <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <step.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-gray-900 text-lg">{step.title}</h4>
                            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">{step.time}</span>
                          </div>
                          <p className="text-sm text-gray-600">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => router.push('/training/dashboard')}
                    className="flex-1 py-4 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-bold text-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => router.push('/training')}
                    className="flex-1 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg text-gray-700"
                  >
                    Browse More Courses
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 animate-pulse" />
                    Redirecting to dashboard in 6 seconds...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MegaMenuHeader />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Header with Progress */}
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Course Enrollment</h1>
                <p className="text-gray-300">Complete your enrollment in just a few steps</p>
              </div>
              <button
                onClick={() => router.push('/training')}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-white/80 mb-3">
                <span className="font-semibold">Step {currentStep} of {totalSteps}</span>
                <span className="font-semibold">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-red-500 to-red-600 rounded-full transition-all duration-500 ease-out shadow-lg"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step < currentStep ? 'bg-gradient-to-br from-green-400 to-green-600 text-white scale-110 shadow-lg' :
                    step === currentStep ? 'bg-gradient-to-br from-primary to-red-600 text-white scale-125 shadow-xl ring-4 ring-white/30' :
                    'bg-white/20 text-white/50 backdrop-blur-sm'
                  }`}>
                    {step < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : step}
                    {step === currentStep && (
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></div>
                    )}
                  </div>
                  {step < 5 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${
                      step < currentStep ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-8">
            
            {/* Step 1: Course Confirmation */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                    <Sparkles className="w-4 h-4" />
                    Step 1: Confirm Your Course
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Let's Get Started!</h2>
                </div>
                
                <div className="bg-gradient-to-br from-primary/5 via-red-50 to-orange-50 border-2 border-primary/20 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h3>
                      <p className="text-gray-600">{course.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: Calendar, label: 'Start Date', value: new Date(course.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
                      { icon: Clock, label: 'Duration', value: course.duration },
                      { icon: Users, label: 'Instructor', value: course.instructor || 'Expert Instructor' },
                      { icon: DollarSign, label: 'Price', value: `$${course.totalPrice}` }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-primary/50 transition-colors duration-300">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-6 h-6 text-primary" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                            <p className="font-bold text-gray-900">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                  <h4 className="font-bold text-blue-900 text-lg mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    This course includes:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Video, text: 'Video lessons and tutorials' },
                      { icon: FileText, text: 'Downloadable materials' },
                      { icon: Award, text: 'Assignments and quizzes' },
                      { icon: Award, text: 'Certificate of completion' },
                      { icon: Zap, text: 'Lifetime access' },
                      { icon: Users, text: 'Community support' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-blue-800 bg-white rounded-lg p-3 hover:shadow-md transition-shadow duration-300">
                        <item.icon className="w-4 h-4 text-blue-600" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold mb-4">
                    <MapPin className="w-4 h-4" />
                    Step 2: Select Your Location
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Where are you located?</h2>
                  <p className="text-gray-600">We offer special pricing based on your location</p>
                </div>

                <div className="space-y-4">
                  {[
                    { value: 'Inside Rwanda', icon: MapPin, title: 'Inside Rwanda', desc: 'Special local pricing for Rwandan residents', price: course.fullPaymentPrice * 0.8, discount: '20% OFF' },
                    { value: 'Outside Rwanda', icon: Globe, title: 'Outside Rwanda', desc: 'International student pricing', price: course.totalPrice, discount: null }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`block border-3 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                        selectedLocation === option.value 
                          ? 'border-primary bg-gradient-to-br from-red-50 to-orange-50 shadow-xl ring-4 ring-primary/20' 
                          : 'border-gray-200 hover:border-primary/50 hover:shadow-lg bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="location"
                        value={option.value}
                        checked={selectedLocation === option.value}
                        onChange={(e) => setSelectedLocation(e.target.value as any)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                              <option.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-xl">{option.title}</h3>
                              {option.discount && (
                                <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold mt-1">
                                  {option.discount}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{option.desc}</p>
                          <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                              ${option.price}
                            </span>
                            {option.discount && (
                              <span className="text-lg text-gray-400 line-through">${course.totalPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full border-3 flex items-center justify-center transition-all duration-300 ${
                          selectedLocation === option.value 
                            ? 'border-primary bg-primary scale-110' 
                            : 'border-gray-300'
                        }`}>
                          {selectedLocation === option.value && (
                            <CheckCircle className="w-5 h-5 text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-5">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Info className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-900 mb-1">Why we ask</h4>
                      <p className="text-sm text-yellow-800">We offer different pricing based on location to make our courses accessible to everyone, regardless of where they're located.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Learning Mode */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-4">
                    <Laptop className="w-4 h-4" />
                    Step 3: Choose Learning Mode
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">How would you like to learn?</h2>
                  <p className="text-gray-600">Select the learning style that fits your schedule</p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      value: 'in_class',
                      icon: Users,
                      title: 'In-Class Learning',
                      features: ['Attend physical classes', 'Face-to-face interaction', 'Hands-on practice', 'Networking opportunities'],
                      schedule: 'Mon-Fri, 9AM-5PM',
                      color: 'from-blue-500 to-blue-600'
                    },
                    {
                      value: 'online',
                      icon: Laptop,
                      title: 'Online Learning',
                      features: ['Learn at your own pace', 'Access from anywhere', 'Recorded video lessons', 'Online support'],
                      schedule: 'Flexible schedule',
                      color: 'from-purple-500 to-purple-600'
                    },
                    {
                      value: 'hybrid',
                      icon: Zap,
                      title: 'Hybrid (Recommended)',
                      features: ['Best of both worlds', 'Attend some classes in-person', 'Access online materials 24/7', 'Maximum flexibility'],
                      schedule: 'Flexible with scheduled sessions',
                      recommended: true,
                      color: 'from-green-500 to-green-600'
                    }
                  ].map((mode) => (
                    <label
                      key={mode.value}
                      className={`block border-3 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                        learningMode === mode.value 
                          ? 'border-primary bg-gradient-to-br from-red-50 to-orange-50 shadow-xl ring-4 ring-primary/20' 
                          : 'border-gray-200 hover:border-primary/50 hover:shadow-lg bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="learningMode"
                        value={mode.value}
                        checked={learningMode === mode.value}
                        onChange={(e) => setLearningMode(e.target.value as any)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-14 h-14 bg-gradient-to-br ${mode.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                              <mode.icon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-900 text-xl">{mode.title}</h3>
                                {mode.recommended && (
                                  <span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {mode.schedule}
                              </p>
                            </div>
                          </div>
                          <ul className="grid grid-cols-2 gap-2">
                            {mode.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 bg-white rounded-lg p-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full border-3 flex items-center justify-center transition-all duration-300 ml-4 ${
                          learningMode === mode.value 
                            ? 'border-primary bg-primary scale-110' 
                            : 'border-gray-300'
                        }`}>
                          {learningMode === mode.value && (
                            <CheckCircle className="w-5 h-5 text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Payment Plan */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold mb-4">
                    <Wallet className="w-4 h-4" />
                    Step 4: Select Payment Plan
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose your payment option</h2>
                  <p className="text-gray-600">Flexible payment plans to suit your budget</p>
                </div>

                <div className="space-y-4">
                  <label className={`block border-3 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                    paymentPlan === 'full' 
                      ? 'border-primary bg-gradient-to-br from-red-50 to-orange-50 shadow-xl ring-4 ring-primary/20' 
                      : 'border-gray-200 hover:border-primary/50 hover:shadow-lg bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="paymentPlan"
                      value="full"
                      checked={paymentPlan === 'full'}
                      onChange={(e) => setPaymentPlan(e.target.value as any)}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Gift className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900 text-xl">Full Payment</h3>
                              <span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                                Save 10%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-baseline gap-3 mb-4">
                          <span className="text-4xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                            ${course.fullPaymentPrice}
                          </span>
                          <span className="text-xl text-gray-400 line-through">${course.totalPrice}</span>
                          <span className="text-green-600 font-bold text-lg flex items-center gap-1">
                            <TrendingUp className="w-5 h-5" />
                            Save ${getSavings()}
                          </span>
                        </div>
                        <ul className="grid grid-cols-2 gap-2">
                          {[
                            { icon: Zap, text: 'Immediate course access' },
                            { icon: DollarSign, text: 'No installment fees' },
                            { icon: Star, text: 'Best value for money' },
                            { icon: Shield, text: 'Priority support' }
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 bg-white rounded-lg p-2">
                              <item.icon className="w-4 h-4 text-green-600" />
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full border-3 flex items-center justify-center transition-all duration-300 ml-4 ${
                        paymentPlan === 'full' 
                          ? 'border-primary bg-primary scale-110' 
                          : 'border-gray-300'
                      }`}>
                        {paymentPlan === 'full' && (
                          <CheckCircle className="w-5 h-5 text-white" strokeWidth={3} />
                        )}
                      </div>
                    </div>
                  </label>

                  <label className={`block border-3 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                    paymentPlan === 'installment' 
                      ? 'border-primary bg-gradient-to-br from-red-50 to-orange-50 shadow-xl ring-4 ring-primary/20' 
                      : 'border-gray-200 hover:border-primary/50 hover:shadow-lg bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="paymentPlan"
                      value="installment"
                      checked={paymentPlan === 'installment'}
                      onChange={(e) => setPaymentPlan(e.target.value as any)}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <CreditCard className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-xl">Installment Plan</h3>
                            <p className="text-sm text-gray-600">Pay in {course.installmentCount} installments</p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                              ${course.installmentAmount}
                            </span>
                            <span className="text-gray-600">per installment</span>
                          </div>
                          <p className="text-sm text-gray-500">Total: ${course.totalPrice}</p>
                        </div>
                        <ul className="grid grid-cols-2 gap-2">
                          {[
                            { icon: Calendar, text: 'First payment due at enrollment' },
                            { icon: Clock, text: 'Flexible payment schedule' },
                            { icon: Wallet, text: 'Spread the cost' },
                            { icon: TrendingUp, text: 'Easy budgeting' }
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 bg-white rounded-lg p-2">
                              <item.icon className="w-4 h-4 text-blue-600" />
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full border-3 flex items-center justify-center transition-all duration-300 ml-4 ${
                        paymentPlan === 'installment' 
                          ? 'border-primary bg-primary scale-110' 
                          : 'border-gray-300'
                      }`}>
                        {paymentPlan === 'installment' && (
                          <CheckCircle className="w-5 h-5 text-white" strokeWidth={3} />
                        )}
                      </div>
                    </div>
                  </label>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5">
                  <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Payment Information
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <CreditCard className="w-4 h-4 mt-0.5 text-blue-600" />
                      <span>Payment methods: Bank transfer, Mobile money, Credit/Debit card</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="w-4 h-4 mt-0.5 text-blue-600" />
                      <span>You'll receive payment instructions after enrollment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 mt-0.5 text-blue-600" />
                      <span>Course access granted after payment confirmation</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 5: Review & Confirm */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-4">
                    <CheckCircle className="w-4 h-4" />
                    Step 5: Review & Confirm
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Enrollment</h2>
                  <p className="text-gray-600">Please review your selections before confirming</p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
                  <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    Enrollment Summary
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                      <p className="text-sm text-gray-500 mb-2 font-medium">Course</p>
                      <p className="font-bold text-gray-900 text-lg">{course.name}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(course.startDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                      <p className="text-sm text-gray-500 mb-3 font-medium">Your Preferences</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Location
                          </p>
                          <p className="font-bold text-gray-900">{selectedLocation}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <Laptop className="w-3 h-3" />
                            Learning Mode
                          </p>
                          <p className="font-bold text-gray-900 capitalize">{learningMode.replace('_', ' ')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-red-50 rounded-xl p-5 border-2 border-primary/20">
                      <p className="text-sm text-gray-500 mb-3 font-medium">Payment Details</p>
                      <div className="bg-white rounded-xl p-4 border border-primary/20">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-700 font-medium flex items-center gap-2">
                            <Wallet className="w-4 h-4" />
                            Payment Plan:
                          </span>
                          <span className="font-bold text-gray-900 capitalize">{paymentPlan} Payment</span>
                        </div>
                        {paymentPlan === 'full' ? (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-700">Total Amount:</span>
                              <span className="font-bold text-3xl bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                                ${course.fullPaymentPrice}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-green-600 bg-green-50 rounded-lg p-2">
                              <span className="font-medium flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                You Save:
                              </span>
                              <span className="font-bold text-lg">${getSavings()}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-700">First Payment:</span>
                              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                                ${course.installmentAmount}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                              <span>Remaining:</span>
                              <span>{course.installmentCount - 1} payments of ${course.installmentAmount}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                              <span className="font-bold">Total:</span>
                              <span className="font-bold text-lg">${course.totalPrice}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 w-6 h-6 text-primary border-2 border-gray-300 rounded-lg focus:ring-primary focus:ring-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      I agree to the <a href="/terms" className="text-primary hover:underline font-semibold" target="_blank">terms and conditions</a>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreePolicy}
                      onChange={(e) => setAgreePolicy(e.target.checked)}
                      className="mt-1 w-6 h-6 text-primary border-2 border-gray-300 rounded-lg focus:ring-primary focus:ring-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      I understand the <a href="/payment-policy" className="text-primary hover:underline font-semibold" target="_blank">payment policy</a>
                    </span>
                  </label>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5">
                  <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    What happens next?
                  </h4>
                  <ol className="space-y-2 text-sm text-blue-800">
                    {[
                      'Your enrollment will be submitted for review',
                      'Admin will review and approve your enrollment',
                      "You'll receive payment instructions via email",
                      'After payment confirmation, you get immediate course access'
                    ].map((text, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-blue-600">{idx + 1}.</span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl animate-shake">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center justify-between">
              <button
                onClick={currentStep === 1 ? () => router.push('/training') : handleBack}
                className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-bold text-gray-700 flex items-center gap-2 group"
                disabled={submitting}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                {currentStep === 1 ? 'Cancel' : 'Back'}
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="px-10 py-4 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg flex items-center gap-2 group"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !agreeTerms || !agreePolicy}
                  className="px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
                >
                  {submitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Confirm Enrollment
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}
