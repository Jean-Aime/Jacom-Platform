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

export default function EnrollmentWizard({ course, onClose, isAuthenticated }: EnrollmentWizardProps) {
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

  const totalSteps = 5;
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Check authentication before showing wizard
  if (!isAuthenticated) {
    router.push(`/login?redirect=/training&course=${course.id}`);
    return null;
  }

  const handleNext = () => {
    // Validate current step
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
        setEnrollmentId(data.enrollmentId);
        setSuccess(true);
        setTimeout(() => {
          router.push('/training/dashboard');
        }, 5000);
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

  // Success Modal
  if (success) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🎉 Enrollment Submitted Successfully!</h2>
            <p className="text-gray-600">Your enrollment request has been submitted for</p>
            <p className="text-xl font-semibold text-primary mt-2">{course.name}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">📧 Confirmation Email Sent</h3>
                <p className="text-sm text-blue-800">Check your email for enrollment confirmation and details.</p>
              </div>
            </div>
            <div className="bg-white rounded p-3 border border-blue-200">
              <p className="text-sm text-gray-600">Enrollment ID:</p>
              <p className="font-mono font-semibold text-gray-900">{enrollmentId}</p>
              <p className="text-xs text-gray-500 mt-1">Save this for your records</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📍</span>
              What Happens Next?
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Admin Review (1-2 business days)</h4>
                  <p className="text-sm text-gray-600">Our team will review your enrollment request</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Approval Notification</h4>
                  <p className="text-sm text-gray-600">You'll receive an email when your enrollment is approved</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Payment Instructions</h4>
                  <p className="text-sm text-gray-600">We'll send detailed payment information via email</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Course Access</h4>
                  <p className="text-sm text-gray-600">Access granted immediately after payment confirmation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push('/training/dashboard')}
              className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.push('/training')}
              className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Enroll in Another Course
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Redirecting to dashboard in 5 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center px-4 overflow-y-auto py-8">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Enroll in Course</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mt-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step < currentStep ? 'bg-green-500 text-white' :
                  step === currentStep ? 'bg-primary text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? '✓' : step}
                </div>
                {step < 5 && (
                  <div className={`w-12 h-1 mx-1 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Step 1: Course Confirmation */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Step 1: Confirm Your Course</h3>
              
              <div className="bg-gradient-to-br from-primary/5 to-red-50 border border-primary/20 rounded-lg p-6 mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{course.name}</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="font-semibold">{new Date(course.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold">{course.duration}</p>
                    </div>
                  </div>
                  {course.instructor && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">Instructor</p>
                        <p className="font-semibold">{course.instructor}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-semibold">${course.totalPrice}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{course.description}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  This course includes:
                </h5>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span> Video lessons and tutorials
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span> Downloadable materials and resources
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span> Assignments and quizzes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span> Certificate of completion
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span> Lifetime access to course materials
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Location Selection */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Select Your Location</h3>
              <p className="text-gray-600 mb-6">📍 Where are you located?</p>

              <div className="space-y-4 mb-6">
                <label className={`block border-2 rounded-lg p-6 cursor-pointer transition ${
                  selectedLocation === 'Inside Rwanda' ? 'border-primary bg-red-50' : 'border-gray-200 hover:border-primary/50'
                }`}>
                  <input
                    type="radio"
                    name="location"
                    value="Inside Rwanda"
                    checked={selectedLocation === 'Inside Rwanda'}
                    onChange={(e) => setSelectedLocation(e.target.value as any)}
                    className="sr-only"
                  />
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-2xl">🇷🇼</span>
                        Inside Rwanda
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">Special local pricing available for Rwandan residents</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">${course.fullPaymentPrice * 0.8}</span>
                        <span className="text-sm text-gray-500 line-through">${course.totalPrice}</span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedLocation === 'Inside Rwanda' ? 'border-primary bg-primary' : 'border-gray-300'
                    }`}>
                      {selectedLocation === 'Inside Rwanda' && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </label>

                <label className={`block border-2 rounded-lg p-6 cursor-pointer transition ${
                  selectedLocation === 'Outside Rwanda' ? 'border-primary bg-red-50' : 'border-gray-200 hover:border-primary/50'
                }`}>
                  <input
                    type="radio"
                    name="location"
                    value="Outside Rwanda"
                    checked={selectedLocation === 'Outside Rwanda'}
                    onChange={(e) => setSelectedLocation(e.target.value as any)}
                    className="sr-only"
                  />
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-2xl">🌍</span>
                        Outside Rwanda
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">International student pricing</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">${course.totalPrice}</span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedLocation === 'Outside Rwanda' ? 'border-primary bg-primary' : 'border-gray-300'
                    }`}>
                      {selectedLocation === 'Outside Rwanda' && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </label>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-1">💡 Why we ask</h5>
                    <p className="text-sm text-yellow-800">We offer different pricing based on location to make our courses accessible to everyone, regardless of where they're located.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Learning Mode */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Choose Learning Mode</h3>
              <p className="text-gray-600 mb-6">📖 How would you like to learn?</p>

              <div className="space-y-4">
                {[
                  {
                    value: 'in_class',
                    icon: '🏫',
                    title: 'In-Class Learning',
                    features: ['Attend physical classes', 'Face-to-face interaction', 'Hands-on practice', 'Networking opportunities'],
                    schedule: 'Mon-Fri, 9AM-5PM'
                  },
                  {
                    value: 'online',
                    icon: '💻',
                    title: 'Online Learning',
                    features: ['Learn at your own pace', 'Access from anywhere', 'Recorded video lessons', 'Online support'],
                    schedule: 'Flexible schedule'
                  },
                  {
                    value: 'hybrid',
                    icon: '🔄',
                    title: 'Hybrid (Recommended)',
                    features: ['Best of both worlds', 'Attend some classes in-person', 'Access online materials 24/7', 'Maximum flexibility'],
                    schedule: 'Flexible with scheduled sessions',
                    recommended: true
                  }
                ].map((mode) => (
                  <label
                    key={mode.value}
                    className={`block border-2 rounded-lg p-6 cursor-pointer transition ${
                      learningMode === mode.value ? 'border-primary bg-red-50' : 'border-gray-200 hover:border-primary/50'
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
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl">{mode.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                              {mode.title}
                              {mode.recommended && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                                  Recommended
                                </span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">📅 {mode.schedule}</p>
                          </div>
                        </div>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {mode.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-primary">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        learningMode === mode.value ? 'border-primary bg-primary' : 'border-gray-300'
                      }`}>
                        {learningMode === mode.value && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Select Payment Plan</h3>
              <p className="text-gray-600 mb-6">💰 Choose your payment option</p>

              <div className="space-y-4 mb-6">
                <label className={`block border-2 rounded-lg p-6 cursor-pointer transition ${
                  paymentPlan === 'full' ? 'border-primary bg-red-50' : 'border-gray-200 hover:border-primary/50'
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
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-semibold text-gray-900">Full Payment</h4>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          Save 10%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-3xl font-bold text-primary">${course.fullPaymentPrice}</span>
                        <span className="text-lg text-gray-500 line-through">${course.totalPrice}</span>
                        <span className="text-green-600 font-semibold">Save ${getSavings()}</span>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          Immediate course access
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          No installment fees
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          Best value for money
                        </li>
                      </ul>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      paymentPlan === 'full' ? 'border-primary bg-primary' : 'border-gray-300'
                    }`}>
                      {paymentPlan === 'full' && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </label>

                <label className={`block border-2 rounded-lg p-6 cursor-pointer transition ${
                  paymentPlan === 'installment' ? 'border-primary bg-red-50' : 'border-gray-200 hover:border-primary/50'
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
                      <h4 className="font-semibold text-gray-900 mb-3">Installment Plan</h4>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">Pay in {course.installmentCount} installments</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-primary">${course.installmentAmount}</span>
                          <span className="text-gray-600">per installment</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Total: ${course.totalPrice}</p>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <span className="text-blue-600">ℹ️</span>
                          First payment due at enrollment
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-600">ℹ️</span>
                          Flexible payment schedule
                        </li>
                      </ul>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      paymentPlan === 'installment' ? 'border-primary bg-primary' : 'border-gray-300'
                    }`}>
                      {paymentPlan === 'installment' && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">📋 Payment Information</h5>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Payment methods: Bank transfer, Mobile money, Credit/Debit card</li>
                  <li>• You'll receive payment instructions after enrollment</li>
                  <li>• Course access granted after payment confirmation</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 5: Review & Confirm */}
          {currentStep === 5 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Step 5: Review Your Enrollment</h3>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">📋 Enrollment Summary</h4>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Course</p>
                    <p className="font-semibold text-gray-900">{course.name}</p>
                    <p className="text-sm text-gray-600">Start Date: {new Date(course.startDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Duration: {course.duration}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-500 mb-2">Your Preferences</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{selectedLocation}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Learning Mode</p>
                        <p className="font-medium text-gray-900 capitalize">{learningMode.replace('_', ' ')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-500 mb-2">Payment Details</p>
                    <div className="bg-white rounded p-4 border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Payment Plan:</span>
                        <span className="font-semibold text-gray-900 capitalize">{paymentPlan} Payment</span>
                      </div>
                      {paymentPlan === 'full' ? (
                        <>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">Total Amount:</span>
                            <span className="font-bold text-2xl text-primary">${course.fullPaymentPrice}</span>
                          </div>
                          <div className="flex justify-between items-center text-green-600">
                            <span>You Save:</span>
                            <span className="font-semibold">${getSavings()}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">First Payment:</span>
                            <span className="font-bold text-xl text-primary">${course.installmentAmount}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Remaining:</span>
                            <span>{course.installmentCount - 1} payments of ${course.installmentAmount}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                            <span className="font-semibold">Total:</span>
                            <span className="font-semibold">${course.totalPrice}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the <a href="/terms" className="text-primary hover:underline" target="_blank">terms and conditions</a>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreePolicy}
                    onChange={(e) => setAgreePolicy(e.target.checked)}
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">
                    I understand the <a href="/payment-policy" className="text-primary hover:underline" target="_blank">payment policy</a>
                  </span>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What happens next?
                </h5>
                <ol className="space-y-1 text-sm text-blue-800 list-decimal list-inside">
                  <li>Your enrollment will be submitted for review</li>
                  <li>Admin will review and approve your enrollment</li>
                  <li>You'll receive payment instructions via email</li>
                  <li>After payment confirmation, you get immediate course access</li>
                </ol>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={currentStep === 1 ? onClose : handleBack}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
              disabled={submitting}
            >
              {currentStep === 1 ? 'Cancel' : '← Back'}
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting || !agreeTerms || !agreePolicy}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  );
}
