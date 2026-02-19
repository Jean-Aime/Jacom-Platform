"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";

interface TrainingProgram {
  id: string;
  name: string;
  slug: string;
  description: string;
  overview: string;
  upcoming: boolean;
  startDate: string | null;
  duration: string | null;
  price: string | null;
  capacity: number | null;
  enrollmentStatus: string;
  image: string | null;
}

export default function AcademyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await fetch('/api/services?type=training');
      const data = await res.json();
      setPrograms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const upcomingPrograms = programs.filter(p => p.upcoming);
  const ongoingPrograms = programs.filter(p => !p.upcoming);

  return (
    <>
      <MegaMenuHeader />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-medium mb-6">
                JACOM ACADEMY STUDENTS
              </div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Invest in Your Future with <span className="text-yellow-300">Professional Training.</span>
              </h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Empowering Global Talents through world-class Work Development, Technical Training, and Executive Leadership. Start your journey today.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Explore Programs
                </button>
                <button className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Overview
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <img src="/api/placeholder/600/400" alt="Student learning" className="w-full h-80 object-cover" />
                <div className="absolute top-6 right-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-3xl font-bold text-gray-900">90%</div>
                  <div className="text-sm text-gray-600">Job Placement Rate</div>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                      <circle cx="32" cy="32" r="28" stroke="#2563eb" strokeWidth="6" fill="none" strokeDasharray="176" strokeDashoffset="18" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">95%</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Student Satisfaction</div>
                    <div className="text-xs text-gray-500">Based on 2024 survey</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Professional Programs</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Specialized training designed to equip you with in-demand skills and accelerate your career
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Web Development</h3>
              <p className="text-gray-600 text-sm">Full-stack development with modern frameworks and best practices</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Skills</h3>
              <p className="text-gray-600 text-sm">Leadership, communication, and business acumen for career growth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Training</h3>
              <p className="text-gray-600 text-sm">Hands-on experience with cutting-edge technologies and tools</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Executive Coaching</h3>
              <p className="text-gray-600 text-sm">Strategic leadership development for senior managers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Web Development Bootcamp */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Web Development Bootcamp</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Phase 1: Foundations</h3>
                    <p className="text-gray-600">Master HTML, CSS, JavaScript, and Responsive Design Principles</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Phase 2: Logic & Interactivity</h3>
                    <p className="text-gray-600">Deep dive into JavaScript, DOM manipulation, and modern ES6+ features</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Phase 3: Modern Ecosystem</h3>
                    <p className="text-gray-600">React, Node.js, databases, and full-stack application development</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-bold text-gray-900">Recent Enrolls</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">JAN 2024</div>
                    <div className="text-lg font-bold text-gray-900">45 Students Enrolled</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">JAN 2025</div>
                    <div className="text-lg font-bold text-gray-900">78 Students Enrolled</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <img src="/api/placeholder/600/400" alt="Coding workspace" className="w-full h-96 object-cover" />
                <div className="absolute bottom-6 right-6 bg-blue-600 text-white rounded-xl p-6 shadow-2xl">
                  <div className="text-sm mb-1">Starting from</div>
                  <div className="text-4xl font-bold mb-3">¥1,200</div>
                  <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cooking Training */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                <img src="/api/placeholder/600/400" alt="Professional chef" className="w-full h-96 object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6">5-Day Intensive Cooking Training</h2>
              <p className="text-gray-300 text-lg mb-8">
                Master the art of Japanese cuisine. Designed for aspiring chefs seeking excellence in culinary techniques and hospitality standards.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm text-gray-300 mb-1">Duration</div>
                  <div className="text-2xl font-bold">5 Full Days</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm text-gray-300 mb-1">Next Session</div>
                  <div className="text-2xl font-bold">Kathmandu</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm text-gray-300 mb-1">Certification</div>
                  <div className="text-2xl font-bold">Professional Chef</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm text-gray-300 mb-1">Investment</div>
                  <div className="text-2xl font-bold">NPR 45,000</div>
                </div>
              </div>
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Download Syllabus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Japanese Language */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Japanese Language & Orientation</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Preparing for life and work in Japan with comprehensive language and cultural training
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border border-red-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  🇯🇵
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">JLPT Preparation</h3>
                  <p className="text-gray-600">N5 to N1 Level Courses</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>N5 Level Certification</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Interactive Learning</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Native Japanese Instructors</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Cultural Orientation</h3>
                  <p className="text-gray-600">Work & Life in Japan</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Duration</div>
                  <div className="text-xl font-bold text-gray-900">3 Months</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Format</div>
                  <div className="text-xl font-bold text-gray-900">Hybrid</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Coaching */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Executive & Team Coaching</h2>
              <p className="text-blue-100 text-lg mb-8">
                Unlocking potential in managers and teams through personalized coaching, strategic mentorship and leadership development.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">1-on-1 Leadership Mentorship</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Team Dynamics Workshops</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <img src="/api/placeholder/300/250" alt="Team meeting" className="w-full h-48 object-cover" />
              </div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <img src="/api/placeholder/300/250" alt="Coaching session" className="w-full h-48 object-cover" />
              </div>
              <div className="col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Executives Coached in 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Process & FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Simple Enrollment Process</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Online Application</h3>
                    <p className="text-gray-600">Fill out the simple form and choose your desired program</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Consultation & Interview</h3>
                    <p className="text-gray-600">Our advisors will guide you and ensure the program fits your goals</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Start Learning</h3>
                    <p className="text-gray-600">Get access to your portal and begin your transformation journey</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Questions</h2>
              <div className="space-y-4">
                {[
                  { q: "Are there any prerequisites for these courses?", a: "Most programs are beginner-friendly. Specific requirements are listed on each program page." },
                  { q: "Can I learn while working full-time?", a: "Yes, we offer flexible schedules including evening and weekend batches." },
                  { q: "Are the learning materials free?", a: "All course materials, resources, and tools are included in your tuition." },
                  { q: "What about placement assistance?", a: "We provide career counseling, resume building, and job placement support." }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{faq.q}</span>
                      <svg className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-4 text-gray-600">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to transform your professional life?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Enroll in one of our upcoming cohorts and join thousands of successful alumni worldwide.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Secure My Spot
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Talk to an Advisor
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
