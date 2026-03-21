'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
  completed: boolean;
  materials: Material[];
  quiz?: Quiz;
}

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'document' | 'code' | 'link';
  url: string;
  size?: string;
}

interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
  userScore?: number;
  completed: boolean;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
}

interface Course {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  enrolledDate: string;
}

export default function CourseViewerPage() {
  const router = useRouter();
  const params = useParams();
  const courseSlug = params?.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    checkAuth();
    if (courseSlug) {
      fetchCourseData();
    }
  }, [courseSlug]);

  const checkAuth = () => {
    const token = localStorage.getItem('session-token');
    if (!token) {
      router.push('/login');
    }
  };

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/student/course/${courseSlug}`, {
        headers: {
          'X-Session-Token': token || ''
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setCourse(data.course);
        setLessons(data.lessons);
        if (data.lessons.length > 0) {
          setCurrentLesson(data.lessons[0]);
        }
      } else {
        useMockCourseData();
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      useMockCourseData();
    } finally {
      setLoading(false);
    }
  };

  const useMockCourseData = () => {
    const mockCourse: Course = {
      id: '1',
      name: 'Full Stack Web Development',
      slug: courseSlug,
      description: 'Learn to build modern web applications from scratch',
      category: 'Web Development',
      instructor: 'John Doe',
      totalLessons: 5,
      completedLessons: 2,
      progress: 40,
      enrolledDate: '2024-01-15'
    };

    const mockLessons: Lesson[] = [
      {
        id: '1',
        title: 'Introduction to Web Development',
        description: 'Learn the basics of web development and what you will build in this course',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '15 min',
        order: 1,
        completed: true,
        materials: [
          { id: '1', title: 'Course Syllabus', type: 'pdf', url: '/materials/syllabus.pdf', size: '2.5 MB' },
          { id: '2', title: 'Setup Guide', type: 'document', url: '/materials/setup.pdf', size: '1.2 MB' }
        ]
      },
      {
        id: '2',
        title: 'HTML & CSS Fundamentals',
        description: 'Master the building blocks of web pages',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '45 min',
        order: 2,
        completed: true,
        materials: [
          { id: '3', title: 'HTML Cheat Sheet', type: 'pdf', url: '/materials/html.pdf', size: '800 KB' },
          { id: '4', title: 'CSS Examples', type: 'code', url: '/materials/css-examples.zip', size: '1.5 MB' }
        ],
        quiz: {
          id: 'q1',
          passingScore: 70,
          completed: true,
          userScore: 85,
          questions: [
            {
              id: 'q1-1',
              question: 'What does HTML stand for?',
              options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
              correctAnswer: 0
            },
            {
              id: 'q1-2',
              question: 'Which CSS property is used to change text color?',
              options: ['text-color', 'font-color', 'color', 'text-style'],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: '3',
        title: 'JavaScript Basics',
        description: 'Learn programming fundamentals with JavaScript',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '60 min',
        order: 3,
        completed: false,
        materials: [
          { id: '5', title: 'JavaScript Guide', type: 'pdf', url: '/materials/js-guide.pdf', size: '3.2 MB' },
          { id: '6', title: 'Practice Exercises', type: 'code', url: '/materials/js-exercises.zip', size: '2.1 MB' }
        ],
        quiz: {
          id: 'q2',
          passingScore: 70,
          completed: false,
          questions: [
            {
              id: 'q2-1',
              question: 'Which keyword is used to declare a variable in JavaScript?',
              options: ['var', 'let', 'const', 'All of the above'],
              correctAnswer: 3
            },
            {
              id: 'q2-2',
              question: 'What is the result of 2 + "2" in JavaScript?',
              options: ['4', '22', 'Error', 'NaN'],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: '4',
        title: 'React Framework',
        description: 'Build modern user interfaces with React',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '90 min',
        order: 4,
        completed: false,
        materials: [
          { id: '7', title: 'React Documentation', type: 'link', url: 'https://react.dev', size: '' },
          { id: '8', title: 'React Project Template', type: 'code', url: '/materials/react-template.zip', size: '5.5 MB' }
        ]
      },
      {
        id: '5',
        title: 'Building Your First Full Stack App',
        description: 'Put everything together and build a complete application',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '120 min',
        order: 5,
        completed: false,
        materials: [
          { id: '9', title: 'Final Project Requirements', type: 'pdf', url: '/materials/final-project.pdf', size: '1.8 MB' },
          { id: '10', title: 'Starter Code', type: 'code', url: '/materials/starter-code.zip', size: '8.2 MB' }
        ]
      }
    ];

    setCourse(mockCourse);
    setLessons(mockLessons);
    if (mockLessons.length > 0) {
      const firstIncomplete = mockLessons.find(l => !l.completed) || mockLessons[0];
      setCurrentLesson(firstIncomplete);
    }
    setLoading(false);
  };

  const markLessonComplete = async (lessonId: string) => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/student/lesson/${lessonId}/complete`, {
        method: 'POST',
        headers: {
          'X-Session-Token': token || ''
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update lesson as completed
        setLessons(prevLessons => 
          prevLessons.map(l => 
            l.id === lessonId ? { ...l, completed: true } : l
          )
        );

        // Update course progress
        if (course) {
          const completedCount = lessons.filter(l => l.id === lessonId || l.completed).length;
          const newProgress = Math.round((completedCount / lessons.length) * 100);
          setCourse({
            ...course,
            completedLessons: completedCount,
            progress: newProgress
          });

          // Check if course is complete and generate certificate
          if (completedCount === lessons.length) {
            await generateCertificate();
          }
        }

        alert('Lesson marked as complete! Great job!');
      }
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      // Still update UI even if backend fails
      setLessons(prevLessons => 
        prevLessons.map(l => 
          l.id === lessonId ? { ...l, completed: true } : l
        )
      );
    }
  };

  const generateCertificate = async () => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/student/course/${course?.id}/certificate`, {
        method: 'POST',
        headers: {
          'X-Session-Token': token || ''
        },
        credentials: 'include'
      });

      if (response.ok) {
        alert('🎉 Congratulations! You have completed the course! Your certificate has been generated and is available in your dashboard.');
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const submitQuiz = async () => {
    if (!currentLesson?.quiz) return;

    const score = currentLesson.quiz.questions.reduce((acc, q) => {
      return acc + (quizAnswers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / currentLesson.quiz.questions.length) * 100);
    const passed = percentage >= currentLesson.quiz.passingScore;

    setQuizSubmitted(true);

    if (currentLesson.quiz) {
      currentLesson.quiz.userScore = percentage;
      currentLesson.quiz.completed = passed;
    }

    if (passed) {
      alert(`Quiz passed with ${percentage}%! You can now proceed to the next lesson.`);
      await markLessonComplete(currentLesson.id);
    } else {
      alert(`Quiz score: ${percentage}%. You need ${currentLesson.quiz.passingScore}% to pass. Please review the lesson and try again.`);
    }
  };

  const goToNextLesson = () => {
    if (!currentLesson) return;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
      setShowQuiz(false);
      setQuizSubmitted(false);
      setQuizAnswers({});
    }
  };

  const goToPreviousLesson = () => {
    if (!currentLesson) return;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
      setShowQuiz(false);
      setQuizSubmitted(false);
      setQuizAnswers({});
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Course...</p>
        </div>
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <Link href="/training/dashboard" className="text-primary hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/training/dashboard" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-white font-bold text-lg">{course.name}</h1>
                <p className="text-gray-400 text-sm">{currentLesson.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
                <div className="text-sm text-gray-300">Progress:</div>
                <div className="w-32 bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="text-sm font-bold text-white">{course.progress}%</div>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video/Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {!showQuiz ? (
            <>
              {/* Video Player */}
              <div className="bg-black aspect-video w-full">
                <iframe
                  src={currentLesson.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={currentLesson.title}
                ></iframe>
              </div>

              {/* Lesson Info */}
              <div className="bg-gray-800 p-6">
                <div className="max-w-5xl mx-auto">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">{currentLesson.title}</h2>
                      <p className="text-gray-300 mb-4">{currentLesson.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {currentLesson.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {course.instructor}
                        </span>
                      </div>
                    </div>
                    {!currentLesson.completed && (
                      <button
                        onClick={() => markLessonComplete(currentLesson.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Mark Complete
                      </button>
                    )}
                    {currentLesson.completed && (
                      <div className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Completed
                      </div>
                    )}
                  </div>

                  {/* Materials */}
                  {currentLesson.materials.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-white mb-3">Course Materials</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {currentLesson.materials.map(material => (
                          <a
                            key={material.id}
                            href={material.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition flex items-center gap-3"
                          >
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                              {material.type === 'pdf' && (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              )}
                              {material.type === 'code' && (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                              )}
                              {material.type === 'document' && (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="text-white font-medium">{material.title}</div>
                              {material.size && <div className="text-gray-400 text-sm">{material.size}</div>}
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quiz Button */}
                  {currentLesson.quiz && (
                    <div className="mt-6">
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Take Quiz
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Quiz View */
            <div className="bg-gray-800 p-6 flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="text-gray-400 hover:text-white flex items-center gap-2 mb-4"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Lesson
                  </button>
                  <h2 className="text-2xl font-bold text-white mb-2">Lesson Quiz</h2>
                  <p className="text-gray-400">Passing score: {currentLesson.quiz?.passingScore}%</p>
                </div>

                <div className="space-y-6">
                  {currentLesson.quiz?.questions.map((question, qIndex) => (
                    <div key={question.id} className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">
                        {qIndex + 1}. {question.question}
                      </h3>
                      <div className="space-y-3">
                        {question.options.map((option, oIndex) => (
                          <label
                            key={oIndex}
                            className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition ${
                              quizSubmitted
                                ? oIndex === question.correctAnswer
                                  ? 'bg-green-600 text-white'
                                  : quizAnswers[question.id] === oIndex
                                  ? 'bg-red-600 text-white'
                                  : 'bg-gray-600 text-gray-300'
                                : quizAnswers[question.id] === oIndex
                                ? 'bg-primary text-white'
                                : 'bg-gray-600 hover:bg-gray-500 text-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name={question.id}
                              value={oIndex}
                              checked={quizAnswers[question.id] === oIndex}
                              onChange={() => setQuizAnswers({ ...quizAnswers, [question.id]: oIndex })}
                              disabled={quizSubmitted}
                              className="w-5 h-5"
                            />
                            <span>{option}</span>
                            {quizSubmitted && oIndex === question.correctAnswer && (
                              <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  {!quizSubmitted ? (
                    <button
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length !== currentLesson.quiz?.questions.length}
                      className="bg-primary hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition"
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="text-white text-lg">
                        Score: {Math.round((Object.keys(quizAnswers).filter(qId => 
                          quizAnswers[qId] === currentLesson.quiz?.questions.find(q => q.id === qId)?.correctAnswer
                        ).length / (currentLesson.quiz?.questions.length || 1)) * 100)}%
                      </div>
                      <button
                        onClick={goToNextLesson}
                        className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                      >
                        Next Lesson
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Lesson List */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} md:w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto transition-all`}>
          <div className="p-6">
            <h3 className="text-white font-bold text-lg mb-4">Course Content</h3>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setCurrentLesson(lesson);
                    setShowQuiz(false);
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                  className={`w-full text-left p-4 rounded-lg transition ${
                    currentLesson?.id === lesson.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {lesson.completed ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-gray-500">{index + 1}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium mb-1 truncate">{lesson.title}</div>
                      <div className="text-xs opacity-75">{lesson.duration}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
