'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'enrollment' | 'payment' | 'assignment' | 'completion' | 'announcement' | 'reminder';
  title: string;
  message: string;
  recipients: 'all' | 'students' | 'instructors' | 'specific';
  specificRecipients?: string[];
  courseId?: string;
  courseName?: string;
  status: 'sent' | 'scheduled' | 'draft';
  sentDate?: string;
  scheduledDate?: string;
  createdBy: string;
  readCount: number;
  totalRecipients: number;
}

export default function NotificationManagement() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newNotification, setNewNotification] = useState({
    type: 'announcement',
    title: '',
    message: '',
    recipients: 'all',
    courseId: '',
    scheduledDate: ''
  });

  useEffect(() => {
    checkAdminAuth();
    fetchNotifications();
  }, []);

  const checkAdminAuth = () => {
    const token = localStorage.getItem('session-token');
    if (!token) {
      router.push('/login');
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/admin/notifications`, {
        headers: {
          'X-Session-Token': token || ''
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      } else {
        useMockData();
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setNotifications([
      {
        id: '1',
        type: 'announcement',
        title: 'New Course Available: Mobile App Development',
        message: 'We are excited to announce a new course on Mobile App Development with React Native. Enroll now!',
        recipients: 'all',
        status: 'sent',
        sentDate: '2024-03-15T10:00:00',
        createdBy: 'Admin',
        readCount: 89,
        totalRecipients: 145
      },
      {
        id: '2',
        type: 'reminder',
        title: 'Assignment Due Tomorrow',
        message: 'Reminder: Your assignment for Full Stack Web Development is due tomorrow at 11:59 PM.',
        recipients: 'specific',
        courseId: '1',
        courseName: 'Full Stack Web Development',
        status: 'sent',
        sentDate: '2024-03-17T09:00:00',
        createdBy: 'Admin',
        readCount: 67,
        totalRecipients: 89
      },
      {
        id: '3',
        type: 'payment',
        title: 'Payment Reminder',
        message: 'Your payment for the course is overdue. Please complete your payment to continue accessing course materials.',
        recipients: 'specific',
        status: 'scheduled',
        scheduledDate: '2024-03-20T08:00:00',
        createdBy: 'Admin',
        readCount: 0,
        totalRecipients: 12
      },
      {
        id: '4',
        type: 'completion',
        title: 'Congratulations on Course Completion!',
        message: 'Congratulations! You have successfully completed the React & Next.js Mastery course. Your certificate is ready.',
        recipients: 'specific',
        courseId: '2',
        courseName: 'React & Next.js Mastery',
        status: 'sent',
        sentDate: '2024-03-16T14:30:00',
        createdBy: 'Admin',
        readCount: 5,
        totalRecipients: 5
      },
      {
        id: '5',
        type: 'enrollment',
        title: 'Welcome to Your New Course!',
        message: 'Welcome! You have been successfully enrolled in the course. Start learning today!',
        recipients: 'students',
        status: 'draft',
        createdBy: 'Admin',
        readCount: 0,
        totalRecipients: 0
      }
    ]);
  };

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/admin/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: JSON.stringify(newNotification)
      });

      if (response.ok) {
        alert('Notification created successfully');
        setShowCreateModal(false);
        setNewNotification({
          type: 'announcement',
          title: '',
          message: '',
          recipients: 'all',
          courseId: '',
          scheduledDate: ''
        });
        fetchNotifications();
      } else {
        alert('Failed to create notification');
      }
    } catch (error) {
      console.error('Error creating notification:', error);
      alert('Error creating notification');
    }
  };

  const handleSendNow = async (notificationId: string) => {
    if (!confirm('Send this notification now?')) return;

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/admin/notifications/${notificationId}/send`, {
        method: 'POST',
        headers: {
          'X-Session-Token': token || ''
        },
        credentials: 'include'
      });

      if (response.ok) {
        alert('Notification sent successfully');
        fetchNotifications();
      } else {
        alert('Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Error sending notification');
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    scheduled: notifications.filter(n => n.status === 'scheduled').length,
    draft: notifications.filter(n => n.status === 'draft').length,
    totalReach: notifications.reduce((sum, n) => sum + n.totalRecipients, 0),
    avgReadRate: notifications.filter(n => n.status === 'sent').length > 0
      ? Math.round(notifications.filter(n => n.status === 'sent').reduce((sum, n) => sum + (n.readCount / n.totalRecipients * 100), 0) / notifications.filter(n => n.status === 'sent').length)
      : 0
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="flex items-center gap-3">
                <img src="/jascomelogo.png" alt="JACOM Logo" className="h-12 w-auto" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Notification Management</h1>
            </div>
            <Link href="/admin/training" className="text-gray-600 hover:text-primary text-sm font-medium">
              Back to Training Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600 mb-2">Total Notifications</div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-green-600 font-semibold">{stats.sent} Sent</span>
              <span className="text-gray-400">•</span>
              <span className="text-blue-600 font-semibold">{stats.scheduled} Scheduled</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalReach}</div>
            <div className="text-sm text-gray-600 mb-2">Total Reach</div>
            <div className="text-xs text-gray-600">Recipients reached</div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.avgReadRate}%</div>
            <div className="text-sm text-gray-600 mb-2">Avg Read Rate</div>
            <div className="text-xs text-gray-600">Engagement metric</div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.draft}</div>
            <div className="text-sm text-gray-600 mb-2">Draft Notifications</div>
            <div className="text-xs text-gray-600">Pending review</div>
          </div>
        </div>

        {/* Actions and Filters */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Notification
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="announcement">Announcement</option>
              <option value="reminder">Reminder</option>
              <option value="payment">Payment</option>
              <option value="enrollment">Enrollment</option>
              <option value="completion">Completion</option>
              <option value="assignment">Assignment</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
            <button
              onClick={() => {
                setFilterType('all');
                setFilterStatus('all');
              }}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map(notification => (
            <div key={notification.id} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      notification.type === 'announcement' ? 'bg-blue-100 text-blue-700' :
                      notification.type === 'reminder' ? 'bg-yellow-100 text-yellow-700' :
                      notification.type === 'payment' ? 'bg-orange-100 text-orange-700' :
                      notification.type === 'enrollment' ? 'bg-green-100 text-green-700' :
                      notification.type === 'completion' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {notification.type.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      notification.status === 'sent' ? 'bg-green-100 text-green-700' :
                      notification.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {notification.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{notification.title}</h3>
                  <p className="text-gray-600 mb-3">{notification.message}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Recipients: <span className="font-semibold">{notification.recipients}</span></span>
                    {notification.courseName && (
                      <>
                        <span>•</span>
                        <span>Course: <span className="font-semibold">{notification.courseName}</span></span>
                      </>
                    )}
                    {notification.status === 'sent' && (
                      <>
                        <span>•</span>
                        <span>Read: <span className="font-semibold">{notification.readCount}/{notification.totalRecipients}</span></span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {notification.status === 'sent' && notification.sentDate && (
                    <span className="text-xs text-gray-600">
                      Sent: {new Date(notification.sentDate).toLocaleString()}
                    </span>
                  )}
                  {notification.status === 'scheduled' && notification.scheduledDate && (
                    <span className="text-xs text-blue-600 font-semibold">
                      Scheduled: {new Date(notification.scheduledDate).toLocaleString()}
                    </span>
                  )}
                  {(notification.status === 'draft' || notification.status === 'scheduled') && (
                    <button
                      onClick={() => handleSendNow(notification.id)}
                      className="text-primary hover:text-red-700 text-sm font-medium"
                    >
                      Send Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create Notification Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Notification</h3>
            <form onSubmit={handleCreateNotification} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Type</label>
                <select
                  value={newNotification.type}
                  onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                >
                  <option value="announcement">Announcement</option>
                  <option value="reminder">Reminder</option>
                  <option value="payment">Payment</option>
                  <option value="enrollment">Enrollment</option>
                  <option value="completion">Completion</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Notification title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  rows={4}
                  placeholder="Notification message"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Recipients</label>
                <select
                  value={newNotification.recipients}
                  onChange={(e) => setNewNotification({ ...newNotification, recipients: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                >
                  <option value="all">All Users</option>
                  <option value="students">All Students</option>
                  <option value="instructors">All Instructors</option>
                  <option value="specific">Specific Course</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Schedule (Optional)</label>
                <input
                  type="datetime-local"
                  value={newNotification.scheduledDate}
                  onChange={(e) => setNewNotification({ ...newNotification, scheduledDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                />
                <p className="text-xs text-gray-600 mt-1">Leave empty to send immediately</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  {newNotification.scheduledDate ? 'Schedule Notification' : 'Send Notification'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewNotification({
                      type: 'announcement',
                      title: '',
                      message: '',
                      recipients: 'all',
                      courseId: '',
                      scheduledDate: ''
                    });
                  }}
                  className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
