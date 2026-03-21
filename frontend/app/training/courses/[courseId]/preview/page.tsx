'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MegaMenuHeader from '@/components/Header/MegaMenuHeader';
import Footer from '@/components/Footer/Footer';
import { 
  BookOpen, Lock, CheckCircle, Clock, Users, 
  Award, ArrowRight, Calendar, DollarSign, Sparkles,
  Target, TrendingUp, Star, Zap, Shield
} from 'lucide-react';

interface Phase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  weeks: Week[];
}

interface Week {
  id: string;
  weekNumber: number;
  title: string;
  topics: Topic[];
}

interface Topic {
  id: string;
  title: string;
}

interface Course {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  totalPrice: number;
  fullPaymentPrice: number;
  startDate: string;
  phases: Phase[];
  isPreview: boolean;
  message: string;
}

export default function CoursePreviewPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCoursePreview();
  }, [courseId]);

  const fetchCoursePreview = async () => {
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';
      const response = await fetch(`${BACKEND}/student-progress/courses/${courseId}/preview`);
      const data = await response.json();

      if (data.success) {
        setCourse(data.course);
      } else {
        setError(data.error || 'Failed to load course preview');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    router.push(`/training/enroll?courseId=${courseId}`);
  };

  if (loading) {
    return (
      <>
        <MegaMenuHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading course preview...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !course) {
    return (
      <>
        <MegaMenuHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Course</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push('/training')}
              className="px-8 py-3 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
            >
              Back to Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MegaMenuHeader />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-white rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Course Preview
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">{course.name}</h1>
              <p className="text-xl text-gray-300 mb-8">{course.description}</p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{new Date(course.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{course.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleEnroll}
                  className="px-10 py-4 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
                >
                  Enroll Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-white">
                  <div className="text-sm text-gray-400">Starting at</div>
                  <div className="text-2xl font-bold">${course.fullPaymentPrice}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-y-2 border-blue-200 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 text-lg">Preview Mode</h3>
                <p className="text-blue-700">{course.message}</p>
              </div>
              <button
                onClick={handleEnroll}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                Enroll to Unlock
              </button>
            </div>
          </div>
        </div>

        {/* Course Curriculum Preview */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Course Curriculum</h2>
            <p className="text-xl text-gray-600">Get a glimpse of what you'll learn in this course</p>
          </div>

          <div className="space-y-8">
            {course.phases.map((phase, phaseIdx) => (
              <div key={phase.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-200">
                {/* Phase Header */}
                <div className="bg-gradient-to-r from-primary to-red-600 p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">{phase.phaseNumber}</span>
                    </div>
                    <div className="flex-1 text-white">
                      <h3 className="text-2xl font-bold mb-2">{phase.title}</h3>
                      <p className="text-white/90">{phase.description}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">{phase.weeks.length} Weeks</span>
                    </div>
                  </div>
                </div>

                {/* Weeks */}
                <div className="p-8">
                  <div className="space-y-4">
                    {phase.weeks.map((week, weekIdx) => (
                      <div key={week.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-primary/50 transition-colors duration-300">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                            W{week.weekNumber}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg mb-3">{week.title}</h4>
                            
                            {/* Topics Preview */}
                            <div className="space-y-2">
                              {week.topics.map((topic, topicIdx) => (
                                <div key={topic.id} className="flex items-center gap-3 text-gray-600 bg-gray-50 rounded-lg p-3">
                                  <Lock className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm">{topic.title}</span>
                                  <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full font-medium">
                                    Locked
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-primary/5 via-red-50 to-orange-50 border-2 border-primary/20 rounded-3xl p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h3>
              <p className="text-xl text-gray-600 mb-8">
                Enroll now to unlock the full curriculum, access all materials, and start your learning journey!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                {[
                  { icon: CheckCircle, text: 'Full curriculum access' },
                  { icon: Award, text: 'Certificate upon completion' },
                  { icon: Users, text: 'Expert instructors' },
                  { icon: Shield, text: 'Lifetime access' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleEnroll}
                className="px-12 py-5 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl font-bold text-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 group"
              >
                Enroll in This Course
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="mt-6 text-sm text-gray-500">
                Starting at <span className="font-bold text-2xl text-primary">${course.fullPaymentPrice}</span> • Flexible payment plans available
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
