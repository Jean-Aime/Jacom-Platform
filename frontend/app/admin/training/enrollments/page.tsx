'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'suspended' | 'pending';
  paymentStatus: 'paid' | 'partial' | 'pending' | 'overdue';
  totalAmount: number;
  amountPaid: number;
  amountDue: number;
  progress: number;
  lastActive: string;
  completionDate?: string;
  certificateIssued: boolean;
}

interface Payment {
  id: string;
  enrollmentId: string;
  amount: number;
  date: string;
  method: 'card' | 'bank_transfer' | 'cash' | 'mobile_money';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

export default function EnrollmentManagement() {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPayment, setFilterPayment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    amount: '',
    method: 'card',
    reference: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    checkAdminAuth();
    fetchEnrollments();
  }, []);

  const checkAdminAuth = () => {
    const token = localStorage.getItem('session-token');
    if (!token) {
      router.push('/login');
    }
  };

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/admin/enrollments`, {
        headers: {
          'X-Session-Token': token || ''
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setEnrollments(data.enrollments || []);
        setPayments(data.payments || []);
      } else {
        useMockData();
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setEnrollments([
      {
        id: '1',
        studentId: '1',
        studentName: 'Alice Johnson',
        studentEmail: 'alice@example.com',
        courseId: '1',
        courseName: 'Full Stack Web Development',
        enrollmentDate: '2024-01-15',
        status: 'active',
        paymentStatus: 'paid',
        totalAmount: 1200,
        amountPaid: 1200,
        amountDue: 0,
        progress: 65,
        lastActive: '2024-03-18T08:30:00',
        certificateIssued: false
      },
      {
        id: '2',
        studentId: '2',
        studentName: 'Bob Smith',
        studentEmail: 'bob@example.com',
        courseId: '2',
        courseName: 'React & Next.js Mastery',
        enrollmentDate: '2024-02-01',
        status: 'completed',
        paymentStatus: 'paid',
        totalAmount: 800,
        amountPaid: 800,
        amountDue: 0,
        progress: 100,
        lastActive: '2024-03-17T15:20:00',
        completionDate: '2024-03-15',
        certificateIssued: true
      },
      {
        id: '3',
        studentId: '3',
        studentName: 'Carol White',
        studentEmail: 'carol@example.com',
        courseId: '3',
        courseName: 'Node.js Backend Development',
        enrollmentDate: '2024-02-20',
        status: 'active',
        paymentStatus: 'partial',
        totalAmount: 900,
        amountPaid: 450,
        amountDue: 450,
        progress: 45,
        lastActive: '2024-03-17T22:45:00',
        certificateIssued: false
      },
      {
        id: '4',
        studentId: '4',
        studentName: 'David Brown',
        studentEmail: 'david@example.com',
        courseId: '4',
        courseName: 'Python for Data Science',
        enrollmentDate: '2024-03-01',
        status: 'pending',
        paymentStatus: 'pending',
        totalAmount: 1000,
        amountPaid: 0,
        amountDue: 1000,
        progress: 0,
        lastActive: '2024-03-18T06:00:00',
        certificateIssued: false
      },
      {
        id: '5',
        studentId: '5',
        studentName: 'Emma Davis',
        studentEmail: 'emma@example.com',
        courseId: '1',
        courseName: 'Full Stack Web Development',
        enrollmentDate: '2024-01-25',
        status: 'active',
        paymentStatus: 'overdue',
        totalAmount: 1200,
        amountPaid: 400,
        amountDue: 800,
        progress: 80,
        lastActive: '2024-03-16T15:20:00',
        certificateIssued: false
      }
    ]);

    setPayments([
      {
        id: '1',
        enrollmentId: '1',
        amount: 1200,
        date: '2024-01-15',
        method: 'card',
        status: 'completed',
        reference: 'PAY-001-2024'
      },
      {
        id: '2',
        enrollmentId: '3',
        amount: 450,
        date: '2024-02-20',
        method: 'bank_transfer',
        status: 'completed',
        reference: 'PAY-002-2024'
      }
    ]);
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnrollment) return;

    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/admin/enrollments/${selectedEnrollment.id}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: JSON.stringify(newPayment)
      });

      if (response.ok) {
        alert('Payment recorded successfully');
        setShowPaymentModal(false);
        setSelectedEnrollment(null);
        setNewPayment({ amount: '', method: 'card', reference: '', date: new Date().toISOString().split('T')[0] });
        fetchEnrollments();
      } else {
        alert('Failed to record payment');
      }
    } catch (error) {
      console.error('Error recording payment:', error);
      alert('Error recording payment');
    }
  };

  const handleUpdateStatus = async (enrollmentId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/admin/enrollments/${enrollmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token || ''
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        alert('Status updated successfully');
        fetchEnrollments();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesStatus = filterStatus === 'all' || enrollment.status === filterStatus;
    const matchesPayment = filterPayment === 'all' || enrollment.paymentStatus === filterPayment;
    const matchesSearch = searchQuery === '' || 
      enrollment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPayment && matchesSearch;
  });

  const stats = {
    total: enrollments.length,
    active: enrollments.filter(e => e.status === 'active').length,
    completed: enrollments.filter(e => e.status === 'completed').length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    totalRevenue: enrollments.reduce((sum, e) => sum + e.amountPaid, 0),
    pendingPayments: enrollments.reduce((sum, e) => sum + e.amountDue, 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Enrollments...</p>
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
              <h1 className="text-xl font-bold text-gray-900">Enrollment Management</h1>
            </div>
            <Link href="/admin/training" className="text-gray-600 hover:text-primary text-sm font-medium">
              Back to Training Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600 mb-2">Total Enrollments</div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-green-600 font-semibold">{stats.active} Active</span>
              <span className="text-gray-400">•</span>
              <span className="text-blue-600 font-semibold">{stats.completed} Completed</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">${stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">Total Revenue</div>
            <div className="text-xs text-green-600 font-semibold">Collected from enrollments</div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">${stats.pendingPayments.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">Pending Payments</div>
            <div className="text-xs text-orange-600 font-semibold">Outstanding balances</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search students or courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('all');
                setFilterPayment('all');
              }}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Enrolled</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEnrollments.map(enrollment => (
                  <tr key={enrollment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{enrollment.studentName}</div>
                        <div className="text-sm text-gray-600">{enrollment.studentEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{enrollment.courseName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        enrollment.status === 'active' ? 'bg-green-100 text-green-700' :
                        enrollment.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {enrollment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          enrollment.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                          enrollment.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                          enrollment.paymentStatus === 'overdue' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {enrollment.paymentStatus.toUpperCase()}
                        </span>
                        <div className="text-xs text-gray-600">
                          ${enrollment.amountPaid} / ${enrollment.totalAmount}
                        </div>
                        {enrollment.amountDue > 0 && (
                          <div className="text-xs text-red-600 font-semibold">
                            Due: ${enrollment.amountDue}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{enrollment.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedEnrollment(enrollment);
                            setShowDetailsModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View
                        </button>
                        {enrollment.amountDue > 0 && (
                          <button
                            onClick={() => {
                              setSelectedEnrollment(enrollment);
                              setNewPayment({ ...newPayment, amount: enrollment.amountDue.toString() });
                              setShowPaymentModal(true);
                            }}
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            Pay
                          </button>
                        )}
                        <Link
                          href={`/admin/training/students/${enrollment.studentId}`}
                          className="text-primary hover:text-red-700 text-sm font-medium"
                        >
                          Student
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Record Payment</h3>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Student: {selectedEnrollment.studentName}</div>
              <div className="text-sm text-gray-600 mb-1">Course: {selectedEnrollment.courseName}</div>
              <div className="text-sm font-bold text-gray-900">Amount Due: ${selectedEnrollment.amountDue}</div>
            </div>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Amount</label>
                <input
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Payment Method</label>
                <select
                  value={newPayment.method}
                  onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Reference Number</label>
                <input
                  type="text"
                  value={newPayment.reference}
                  onChange={(e) => setNewPayment({ ...newPayment, reference: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Payment Date</label>
                <input
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Record Payment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedEnrollment(null);
                    setNewPayment({ amount: '', method: 'card', reference: '', date: new Date().toISOString().split('T')[0] });
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Enrollment Details</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Student Information</h4>
                <div className="space-y-2">
                  <div className="text-sm"><span className="font-semibold">Name:</span> {selectedEnrollment.studentName}</div>
                  <div className="text-sm"><span className="font-semibold">Email:</span> {selectedEnrollment.studentEmail}</div>
                  <div className="text-sm"><span className="font-semibold">Last Active:</span> {new Date(selectedEnrollment.lastActive).toLocaleString()}</div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Course Information</h4>
                <div className="space-y-2">
                  <div className="text-sm"><span className="font-semibold">Course:</span> {selectedEnrollment.courseName}</div>
                  <div className="text-sm"><span className="font-semibold">Enrolled:</span> {new Date(selectedEnrollment.enrollmentDate).toLocaleDateString()}</div>
                  <div className="text-sm"><span className="font-semibold">Progress:</span> {selectedEnrollment.progress}%</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Payment Information</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Amount:</span>
                  <span className="font-bold">${selectedEnrollment.totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Amount Paid:</span>
                  <span className="font-bold text-green-600">${selectedEnrollment.amountPaid}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Amount Due:</span>
                  <span className="font-bold text-red-600">${selectedEnrollment.amountDue}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedEnrollment.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                    selectedEnrollment.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                    selectedEnrollment.paymentStatus === 'overdue' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedEnrollment.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Status Management</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedEnrollment.id, 'active')}
                  className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-semibold text-sm transition"
                >
                  Set Active
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedEnrollment.id, 'suspended')}
                  className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg font-semibold text-sm transition"
                >
                  Suspend
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedEnrollment.id, 'completed')}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold text-sm transition"
                >
                  Mark Completed
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/admin/training/students/${selectedEnrollment.studentId}`}
                className="flex-1 bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
              >
                View Student Profile
              </Link>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedEnrollment(null);
                }}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
