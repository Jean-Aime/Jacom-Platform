'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

interface EnrollmentWizardProps {
  course: Course;
  onClose: () => void;
  isAuthenticated: boolean;
}

export default function PremiumEnrollmentWizard({ course, onClose, isAuthenticated }: EnrollmentWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<'Inside Rwanda' | 'Outside Rwanda'>('Outside Rwanda');
  const [learningMode, setLearningMode] = useState<'in_class' | 'online' | 'hybrid'>('hybrid');
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'installment'>('full');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const totalSteps = 5;

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  useEffect(() => {
    if (success) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    }
  }, [success]);

  if (!isAuthenticated) {
    router.push(`/login?redirect=/training&course=${course.id}`);
    return null;
  }

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
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
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
          courseId: course.id,
          location: selectedLocation,
          planType: learningMode,
          paymentPlan: paymentPlan
        })
      });

      const data = await response.json();

      if (response.ok) {
        setEnrollmentId(data.enrollmentId || 'ENROLL-' + Math.random().toString(36).substr(2, 9).toUpperCase());
        setSuccess(true);
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
    return paymentPlan === 'full' ? course.fullPaymentPrice : course.totalPrice;
  };

  const getSavings = () => {
    return course.totalPrice - course.fullPaymentPrice;
  };

  // Confetti Animation
  const ConfettiPiece = ({ delay }: { delay: number }) => (
    <div
      className="absolute w-2 h-2 rounded-full animate-confetti"
      style={{
        left: `${Math.random() * 100}%`,
        top: '-10px',
        backgroundColor: ['#c00', '#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf'][Math.floor(Math.random() * 5)],
        animationDelay: `${delay}ms`,
        animationDuration: `${2000 + Math.random() * 1000}ms`
      }}
    />
  );

  // Success Modal with Celebration
  if (success) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-md z-[100] flex items-center justify-center px-4">
        {confetti && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <ConfettiPiece key={i} delay={i * 50} />
            ))}
          </div>
        )}
        
        <div className={`bg-white rounded-3xl shadow-2xl max-w-3xl w-full transform transition-all duration-700 ${animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          {/* Success Header with Gradient */}
          <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-t-3xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-xl mb-4 animate-bounce">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">🎉 Enrollment Successful!</h2>
              <p className="text-white/90 text-lg">Welcome to {course.name}</p>
            </div>
          </div>

          <div className="p-8">
            {/* Enrollment Details Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 text-lg mb-1">📧 Confirmation Email Sent</h3>
                  <p className="text-sm text-blue-700">Check your inbox for enrollment details and next steps</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border-2 border-blue-300 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Enrollment ID</span>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Copy</button>
                </div>
                <div className="font-mono font-bold text-xl text-gray-900 tracking-wider">{enrollmentId}</div>
                <p className="text-xs text-gray-500 mt-2">💾 Save this for your records</p>
              </div>
            </div>

            {/* Timeline - What Happens Next */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-red-600 rounded-xl flex items-center justify-center text-white text-xl">📍</span>
                What Happens Next?
              </h3>
              
              <div className="space-y-4">
                {[
                  { num: 1, title: 'Admin Review', desc: 'Our team will review your enrollment request', time: '1-2 business days', icon: '👨‍💼', color: 'from-purple-500 to-purple-600' },
                  { num: 2, title: 'Approval Notification', desc: "You'll receive an email when approved", time: 'Via email', icon: '✅', color: 'from-blue-500 to-blue-600' },
                  { num: 3, title: 'Payment Instructions', desc: 'Detailed payment information will be sent', time: 'After approval', icon: '💳', color: 'from-green-500 to-green-600' },
                  { num: 4, title: 'Course Access', desc: 'Immediate access after payment confirmation', time: 'After payment', icon: '🚀', color: 'from-orange-500 to-orange-600' }
                ].map((step) => (
                  <div key={step.num} className="flex gap-4 group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300">
                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
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
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Redirecting to dashboard in 6 seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm z-[100] flex items-center justify-center px-4 overflow-y-auto py-8">
      <div className={`bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl transform transition-all duration-500 ${animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        
        {/* Premium Header with Gradient */}
        <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-t-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          
          <div className="relative flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Enroll in Course</h2>
              <p className="text-gray-300">Complete your enrollment in just a few steps</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modern Progress Bar */}
          <div className="relative">
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

          {/* Step Indicators with Animation */}
          <div className="flex items-center justify-between mt-6">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step < currentStep ? 'bg-gradient-to-br from-green-400 to-green-600 text-white scale-110 shadow-lg' :
                  step === currentStep ? 'bg-gradient-to-br from-primary to-red-600 text-white scale-125 shadow-xl ring-4 ring-white/30' :
                  'bg-white/20 text-white/50 backdrop-blur-sm'
                }`}>
                  {step < currentStep ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
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

        {/* Content Area with Smooth Transitions */}
        <div className="p-10">
          <div className={`transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            {/* Step 1: Course Confirmation */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    Step 1: Confirm Your Course
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Let's Get Started!</h3>
                </div>
                
                <div className="bg-gradient-to-br from-primary/5 via-red-50 to-orange-50 border-2 border-primary/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                      📚
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h4>
                      <p className="text-gray-600">{course.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: '📅', label: 'Start Date', value: new Date(course.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
                      { icon: '⏱️', label: 'Duration', value: course.duration },
                      { icon: '👨‍🏫', label: 'Instructor', value: course.instructor || 'Expert Instructor' },
                      { icon: '💰', label: 'Price', value: `$${course.totalPrice}` }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-primary/50 transition-colors duration-300">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
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
                  <h5 className="font-bold text-blue-900 text-lg mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    This course includes:
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      '📹 Video lessons and tutorials',
                      '📄 Downloadable materials',
                      '✍️ Assignments and quizzes',
                      '🏆 Certificate of completion',
                      '♾️ Lifetime access',
                      '💬 Community support'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-blue-800 bg-white rounded-lg p-3 hover:shadow-md transition-shadow duration-300">
                        <span>{item}</span>
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
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    Step 2: Select Your Location
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">📍 Where are you located?</h3>
                  <p className="text-gray-600">We offer special pricing based on your location</p>
                </div>

                <div className="space-y-4">
                  {[
                    { value: 'Inside Rwanda', flag: '🇷🇼', title: 'Inside Rwanda', desc: 'Special local pricing for Rwandan residents', price: course.fullPaymentPrice * 0.8, discount: '20% OFF' },
                    { value: 'Outside Rwanda', flag: '🌍', title: 'Outside Rwanda', desc: 'International student pricing', price: course.totalPrice, discount: null }
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
                            <span className="text-4xl">{option.flag}</span>
                            <div>
                              <h4 className="font-bold text-gray-900 text-xl">{option.title}</h4>
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
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-5">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-yellow-900 mb-1">💡 Why we ask</h5>
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
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Step 3: Choose Learning Mode
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">📖 How would you like to learn?</h3>
                  <p className="text-gray-600">Select the learning style that fits your schedule</p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      value: 'in_class',
                      icon: '🏫',
                      title: 'In-Class Learning',
                      features: ['Attend physical classes', 'Face-to-face interaction', 'Hands-on practice', 'Networking opportunities'],
                      schedule: 'Mon-Fri, 9AM-5PM',
                      color: 'from-blue-500 to-blue-600'
                    },
                    {
                      value: 'online',
                      icon: '💻',
                      title: 'Online Learning',
                      features: ['Learn at your own pace', 'Access from anywhere', 'Recorded video lessons', 'Online support'],
                      schedule: 'Flexible schedule',
                      color: 'from-purple-500 to-purple-600'
                    },
                    {
                      value: 'hybrid',
                      icon: '🔄',
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
                            <div className={`w-14 h-14 bg-gradient-to-br ${mode.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                              {mode.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-900 text-xl">{mode.title}</h4>
                                {mode.recommended && (
                                  <span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                                    ⭐ Recommended
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">📅 {mode.schedule}</p>
                            </div>
                          </div>
                          <ul className="grid grid-cols-2 gap-2">
                            {mode.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 bg-white rounded-lg p-2">
                                <span className="text-primary font-bold">✓</span>
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
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
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
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    Step 4: Select Payment Plan
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">💰 Choose your payment option</h3>
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
                          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                            💎
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-900 text-xl">Full Payment</h4>
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
                          <span className="text-green-600 font-bold text-lg">Save ${getSavings()}</span>
                        </div>
                        <ul className="grid grid-cols-2 gap-2">
                          {['Immediate course access', 'No installment fees', 'Best value for money', 'Priority support'].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 bg-white rounded-lg p-2">
                              <span className="text-green-600 font-bold">✓</span>
                              {item}
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
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
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
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                            📅
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-xl">Installment Plan</h4>
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
                          {['First payment due at enrollment', 'Flexible payment schedule', 'Spread the cost', 'Easy budgeting'].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 bg-white rounded-lg p-2">
                              <span className="text-blue-600 font-bold">ℹ️</span>
                              {item}
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
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </label>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5">
                  <h5 className="font-bold text-blue-900 text-lg mb-3">📋 Payment Information</h5>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Payment methods: Bank transfer, Mobile money, Credit/Debit card</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>You'll receive payment instructions after enrollment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
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
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Step 5: Review & Confirm
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">📋 Review Your Enrollment</h3>
                  <p className="text-gray-600">Please review your selections before confirming</p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
                  <h4 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                    <span className="w-10 h-10 bg-gradient-to-br from-primary to-red-600 rounded-xl flex items-center justify-center text-white">📝</span>
                    Enrollment Summary
                  </h4>

                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                      <p className="text-sm text-gray-500 mb-2 font-medium">Course</p>
                      <p className="font-bold text-gray-900 text-lg">{course.name}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>📅 {new Date(course.startDate).toLocaleDateString()}</span>
                        <span>⏱️ {course.duration}</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                      <p className="text-sm text-gray-500 mb-3 font-medium">Your Preferences</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">Location</p>
                          <p className="font-bold text-gray-900">{selectedLocation}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">Learning Mode</p>
                          <p className="font-bold text-gray-900 capitalize">{learningMode.replace('_', ' ')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-red-50 rounded-xl p-5 border-2 border-primary/20">
                      <p className="text-sm text-gray-500 mb-3 font-medium">Payment Details</p>
                      <div className="bg-white rounded-xl p-4 border border-primary/20">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-700 font-medium">Payment Plan:</span>
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
                              <span className="font-medium">You Save:</span>
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
                  <h5 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    What happens next?
                  </h5>
                  <ol className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">1.</span>
                      <span>Your enrollment will be submitted for review</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">2.</span>
                      <span>Admin will review and approve your enrollment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">3.</span>
                      <span>You'll receive payment instructions via email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">4.</span>
                      <span>After payment confirmation, you get immediate course access</span>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl animate-shake">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Action Buttons */}
        <div className="border-t-2 border-gray-100 p-8 bg-gray-50 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <button
              onClick={currentStep === 1 ? onClose : handleBack}
              className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-bold text-gray-700 flex items-center gap-2 group"
              disabled={submitting}
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-10 py-4 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg flex items-center gap-2 group"
              >
                Continue
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Confirm Enrollment
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
