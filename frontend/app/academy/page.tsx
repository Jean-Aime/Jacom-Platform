"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import RegistrationForm from "@/components/Academy/RegistrationForm";

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
  const [settings, setSettings] = useState<AcademySettings | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<'Outside Rwanda' | 'Inside Rwanda'>('Outside Rwanda');
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
    Promise.all([
      fetch(`${BACKEND}/academy-settings`).then(r => r.json()),
      fetch(`${BACKEND}/courses`).then(r => r.json())
    ]).then(([settingsData, coursesData]) => {
      setSettings(settingsData);
      setCourses(coursesData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Academy...</p>
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
        
        {/* Hero Section - Matching Services Page Style */}
        <section className="relative bg-gradient-to-br from-primary via-red-700 to-red-800 pt-32 pb-56 overflow-hidden min-h-[580px]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-red-900/30 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {settings?.registrationOpen ? 'Enrollment Open - Limited Seats' : 'Registration Closed'}
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {settings?.heroTitle || 'Transform Your Career with Professional Training'}
              </h1>
              
              <p className="text-base text-red-100 mb-8 leading-relaxed">
                {settings?.heroSubtitle || 'Join our world-class training programs and accelerate your career growth'}
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowRegistration(true)}
                  className="bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-md font-medium text-sm transition shadow-lg flex items-center gap-2"
                >
                  Register to Class
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="border-2 border-white hover:bg-white hover:text-primary text-white px-6 py-3 rounded-md font-medium text-sm transition">
                  View Courses
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Dates Timeline - Modern Cards */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Dates</h2>
              <p className="text-gray-600">Mark your calendar for these key milestones</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Class Start Date */}
              <div className="group relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl transform hover:-translate-y-2">
                <div className="absolute top-4 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-6xl font-bold text-primary mb-3">
                  {startDate ? startDate.getDate() : '--'}
                </div>
                <div className="text-sm font-semibold text-red-800 mb-2 uppercase tracking-wide">
                  {startDate ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD'}: Class Starts
                </div>
                <p className="text-gray-700">
                  The {startDate ? startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''} batch begins at 10:00am EST. First day orientation session.
                </p>
              </div>

              {/* Scholarship Day */}
              <div className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 border-2 border-yellow-200 hover:border-yellow-400 transition-all hover:shadow-xl transform hover:-translate-y-2">
                <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-6xl font-bold text-yellow-600 mb-3">
                  {scholarshipDate ? scholarshipDate.getDate() : '--'}
                </div>
                <div className="text-sm font-semibold text-yellow-800 mb-2 uppercase tracking-wide">
                  {scholarshipDate ? scholarshipDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD'}: Scholarship Day
                </div>
                <p className="text-gray-700">
                  Scholarship winners for the {startDate ? startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''} batch will be announced.
                </p>
              </div>

              {/* Student Capacity */}
              <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl transform hover:-translate-y-2">
                <div className="absolute top-4 right-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-6xl font-bold text-green-600 mb-3">
                  {featuredCourse?.maxStudents || 100}
                </div>
                <div className="text-sm font-semibold text-green-800 mb-2 uppercase tracking-wide">
                  Students
                </div>
                <p className="text-gray-700">
                  {featuredCourse?.maxStudents || 100} students will start their journey together with a collective goal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans - Premium Design */}
        {featuredCourse?.pricing && featuredCourse.pricing.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-red-100 text-primary rounded-full text-sm font-semibold mb-4">
                  Up to 66% OFF - First Batch 2026
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
                <p className="text-gray-600 mb-8">Choose the option that fits your location and learning style</p>
                
                {/* Location Selector */}
                <div className="flex justify-center gap-4 mb-8">
                  <button
                    onClick={() => setSelectedLocation('Outside Rwanda')}
                    className={`px-8 py-4 rounded-xl font-bold text-base transition-all ${
                      selectedLocation === 'Outside Rwanda'
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-400'
                    }`}
                  >
                    Outside Rwanda
                  </button>
                  <button
                    onClick={() => setSelectedLocation('Inside Rwanda')}
                    className={`px-8 py-4 rounded-xl font-bold text-base transition-all ${
                      selectedLocation === 'Inside Rwanda'
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-400'
                    }`}
                  >
                    Inside Rwanda <span className="text-sm">(Up to 66% OFF)</span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {featuredCourse.pricing
                  .filter(plan => plan.location === selectedLocation)
                  .map((plan, idx) => {
                  const features = typeof plan.features === 'string' ? JSON.parse(plan.features) : plan.features;
                  const isPopular = plan.planType === 'in_class';
                  
                  return (
                    <div key={idx} className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 ${isPopular ? 'border-primary transform scale-105' : 'border-gray-200'} hover:shadow-2xl transition-all`}>
                      {isPopular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-indigo-600 text-white text-sm font-bold rounded-full">
                          MOST POPULAR
                        </div>
                      )}
                      
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {plan.planType === 'in_class' ? 'In-Class Students' : 'Material Access Only'}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {plan.planType === 'in_class' ? 'Full interactive learning experience' : 'Self-paced learning materials'}
                        </p>
                      </div>

                      <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <span className="text-xl text-gray-400 line-through">${plan.originalPrice}</span>
                          <span className="text-4xl font-bold text-primary">${plan.discountedPrice}</span>
                        </div>
                        <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          Save ${plan.originalPrice - plan.discountedPrice}
                        </div>
                        <p className="text-gray-600 text-sm mt-2">One-Time Payment</p>
                      </div>

                      <ul className="space-y-4 mb-8">
                        {features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button 
                        onClick={() => setShowRegistration(true)}
                        className={`w-full py-3 rounded-xl font-bold text-base transition-all transform hover:scale-105 ${isPopular ? 'bg-gradient-to-r from-primary to-indigo-600 text-white hover:from-red-700 hover:to-indigo-700 shadow-lg' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                      >
                        Enroll Now
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="text-center text-sm text-gray-500 mt-8">
                * Discounted introductory prices are valid only for first batch students of 2026!
              </p>
            </div>
          </section>
        )}

        {/* Course Phases - Modern Timeline */}
        {featuredCourse?.phases && featuredCourse.phases.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Curriculum</h2>
                <p className="text-gray-600">Learn step-by-step with our structured program</p>
              </div>

              <div className="space-y-6">
                {featuredCourse.phases.map((phase, idx) => (
                  <div key={phase.phaseNumber} className="group relative bg-gradient-to-r from-white to-red-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-red-400 hover:shadow-xl transition-all">
                    <div className="flex items-start gap-6">
                      {/* Phase Number Badge */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform">
                        {phase.phaseNumber}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              Phase {phase.phaseNumber}: {phase.title}
                            </h3>
                            <p className="text-gray-600 text-lg">{phase.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">Duration</div>
                            <div className="text-lg font-bold text-primary">{phase.duration}</div>
                          </div>
                        </div>

                        {/* Pricing Info */}
                        <div className="flex flex-wrap gap-6 bg-white rounded-xl p-4 border border-gray-200">
                          <div>
                            <span className="text-sm text-gray-500">Material access: </span>
                            <span className="text-gray-400 line-through">${phase.materialPrice}</span>
                            <span className="text-primary font-bold text-lg ml-2">${phase.materialDiscountedPrice}</span>
                          </div>
                          <div className="border-l border-gray-300 pl-6">
                            <span className="text-sm text-gray-500">Class access: </span>
                            <span className="text-primary font-bold text-lg">${phase.classPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Class Schedule - Beautiful Grid */}
        {featuredCourse?.schedule && featuredCourse.schedule.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Class Schedule</h2>
                <p className="text-gray-600">Multiple time zones to fit your schedule</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCourse.schedule.map((schedule, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-red-400 hover:shadow-xl transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white">
                        {schedule.sessionType === 'live_class' ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {schedule.sessionType === 'live_class' ? 'Live Classes' : `Group ${schedule.groupNumber}`}
                        </h3>
                        <p className="text-sm text-gray-600">{schedule.daysOfWeek.replace(',', ' & ')}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: 'EST', time: schedule.timeEST },
                        { label: 'PST', time: schedule.timePST },
                        { label: 'EAT', time: schedule.timeEAT },
                        { label: 'ETH-LT', time: schedule.timeETH }
                      ].map((tz, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                          <span className="font-semibold text-gray-700">{tz.label}</span>
                          <span className="text-gray-600">{tz.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Courses - Modern Cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Courses</h2>
              <p className="text-gray-600">Explore our comprehensive training programs</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-red-400 p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="w-14 h-14 bg-red-50 rounded-lg flex items-center justify-center text-primary mb-4">
                    {getCourseIcon(course.category)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{course.category}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(course.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-gray-400 line-through text-sm">${course.totalPrice}</span>
                    <span className="text-3xl font-bold text-primary ml-2">${course.fullPaymentPrice}</span>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedCourse({ id: course.id, name: course.name });
                      setShowRegistration(true);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-indigo-700 transform group-hover:scale-105 transition-all"
                  >
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Methodology - Visual Steps */}
        <section className="py-20 bg-gradient-to-br from-primary to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The Five Step Week We Follow</h2>
              <p className="text-red-100">Refined and perfected to accelerate your learning journey</p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                { 
                  icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
                  text: 'Start by watching the lecture videos' 
                },
                { 
                  icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
                  text: 'Attend the live discussion sessions' 
                },
                { 
                  icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
                  text: 'Complete the checklist items of the week' 
                },
                { 
                  icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                  text: 'Work on the weekly exercises' 
                },
                { 
                  icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                  text: 'Attend the group discussion sessions' 
                }
              ].map((step, idx) => (
                <div key={idx} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform border-2 border-white/30 text-white">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                  </div>
                  <p className="text-white/90 font-medium">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA - Premium */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-red-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg text-gray-300 mb-8">
              If you have questions or want to register, give us a call
            </p>
            <a 
              href={`tel:${settings?.contactPhone}`} 
              className="inline-block px-12 py-5 bg-gradient-to-r from-primary to-indigo-500 text-white rounded-2xl font-bold text-xl hover:from-primary hover:to-indigo-600 transform hover:scale-105 transition-all shadow-2xl"
            >
              {settings?.contactPhone || 'Contact Us'}
            </a>
          </div>
        </section>

        <Footer />
      </div>

      {showRegistration && (
        <RegistrationForm
          courseId={selectedCourse?.id}
          courseName={selectedCourse?.name}
          onClose={() => {
            setShowRegistration(false);
            setSelectedCourse(null);
          }}
        />
      )}
    </>
  );
}
