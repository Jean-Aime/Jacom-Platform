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
    const mockEnrollments: Enrollment[] = [
      {
        id: '1',
        studentId: 's1',
        studentName: 'John Doe',
        studentEmail: 'john@example.com',
        courseId: 'c1',
        courseName: 'Full Stack Web Development',
        enrollmentDate: '2024-01-15',
        status: 'active',
        paymentStatus: 'paid',
        totalAmount: 1200,
        amountPaid: 1200,
        amountDue: 0,
        progress: 65,
        lastActive: '2024-03-17',
        certificateIssued: false
      },
      {
        id: '2',
        studentId: 's2',
        studentName: 'Jane Smith',
        studentEmail: 'jane@example.com',
        courseId: 'c2',
        courseName: 'React & Next.js Mastery',
        enrollmentDate: '2024-02-01',
        status: 'active',
        paymentStatus: 'partial',
        totalAmount: 800,
        amountPaid: 400,
        amountDue: 400,
        progress: 40,
        lastActive: '2024-03-18',
        certificateIssued: false
      },
      {
        id: '3',
        studentId: 's3',
        studentName: 'Mike Johnson',
        studentEmail: 'mike@example.com',
        courseId: 'c1',
        courseName: 'Full Stack Web Development',
        enrollmentDate: '2024-01-20',
        status: 'completed',
        paymentStatus: 'paid',
        totalAmount: 1200,
        amountPaid: 1200,
        amountDue: 0,
        progress: 100,
        lastActive: '2024-03-10',
        completionDate: '2024-03-10',
        certificateIssued: true
      },
      {
        id: '4',
        studentId: 's4',
        studentName: 'Sarah Williams',
        studentEmail: 'sarah@example.com',
        courseId: 'c3',
        courseName: 'Mobile App Development',
        enrollmentDate: '2024-02-15',
        status: 'active',
        paymentStatus: 'pending',
        totalAmount: 950,
        amountPaid: 0,
        amountDue: 950,
        progress: 15,
        lastActive: '2024-03-16',
        certificateIssued: false
      },
      {
        id: '5',
        studentId: 's5',
        studentName: 'David Brown',
        studentEmail: 'david@example.com',
        courseId: 'c2',
        courseName: 'React & Next.js Mastery',
        enrollmentDate: '2024-03-01',
        status: 'suspended',
        paymentStatus: 'overdue',
        totalAmount: 800,
        amountPaid: 200,
        amountDue: 600,
        progress: 20,
        lastActive: '2024-03-05',
        certificateIssued: false
      }
    ];

    setEnrollments(mockEnrollments);
    setPayments([]);
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
        setNewPayment({
          amount: '',
          method: 'card',
          reference: '',
          date: new Date().toISOString().split('T')[0]
        });
        fetchEnrollments();
      } else {
        alert('Failed to record payment');
      }
    } catch (error) {
      console.error('Error recording payment:', error);
      alert('Error recording payment');
    }
  };

  const updateEnrollmentStatus = async (enrollmentId: string, newStatus: string) => {
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
        alert('Enrollment status updated');
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
      enrollment.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPayment && matchesSearch;
  });

  const stats = {
    total: enrollments.length,
    active: enrollments.filter(e => e.status === 'active').length,
    completed: enrollments.filter(e => e.status === 'completed').length,
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
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Enrollments</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.active}</div>
            <div className="text-sm text-gray-600">Active Students</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-primary mb-1">${stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-1">${stats.pendingPayments.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Pending Payments</div>
          </div>
        </div>

        {/* Filters */}
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
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
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
                setFilterStatus('all');
                setFilterPayment('all');
                setSearchQuery('');
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
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Enrolled</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Progress</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEnrollments.map(enrollment => (
                  <tr key={enrollment.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{enrollment.studentName}</div>
                      <div className="text-sm text-gray-600">{enrollment.studentEmail}</div>
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
                        enrollment.status === 'suspended' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {enrollment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block w-fit ${
                          enrollment.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                          enrollment.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                          enrollment.paymentStatus === 'overdue' ? 'bg-red-100 text-red-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {enrollment.paymentStatus.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-600">
                          ${enrollment.amountPaid} / ${enrollment.totalAmount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{enrollment.progress}%</span>
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
                              setShowPaymentModal(true);
                            }}
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            Record Payment
                          </button>
                        )}
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Record Payment</h3>
            <div className="mb-6">
              <p className="text-sm text-gray-600">Student: <span className="font-semibold text-gray-900">{selectedEnrollment.studentName}</span></p>
              <p className="text-sm text-gray-600">Course: <span className="font-semibold text-gray-900">{selectedEnrollment.courseName}</span></p>
              <p className="text-sm text-gray-600">Amount Due: <span className="font-semibold text-primary">${selectedEnrollment.amountDue}</span></p>
            </div>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Amount</label>
                <input
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Enter amount"
                  required
                  max={selectedEnrollment.amountDue}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Payment Method</label>
                <select
                  value={newPayment.method}
                  onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Transaction reference"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Payment Date</label>
                <input
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  Record Payment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setNewPayment({
                      amount: '',
                      method: 'card',
                      reference: '',
                      date: new Date().toISOString().split('T')[0]
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

      {/* Details Modal */}
      {showDetailsModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Enrollment Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Student Name</p>
                  <p className="font-semibold text-gray-900">{selectedEnrollment.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{selectedEnrollment.studentEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="font-semibold text-gray-900">{selectedEnrollment.courseName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Enrollment Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedEnrollment.enrollmentDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <select
                    value={selectedEnrollment.status}
                    onChange={(e) => updateEnrollmentStatus(selectedEnrollment.id, e.target.value)}
                    className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none font-semibold"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="font-semibold text-gray-900">{selectedEnrollment.progress}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold text-gray-900">${selectedEnrollment.totalAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount Paid</p>
                  <p className="font-semibold text-green-600">${selectedEnrollment.amountPaid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount Due</p>
                  <p className="font-semibold text-red-600">${selectedEnrollment.amountDue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Active</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedEnrollment.lastActive).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold transition mt-6"
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
