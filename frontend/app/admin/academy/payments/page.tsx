'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  amount: number;
  method: 'card' | 'bank_transfer' | 'cash' | 'mobile_money';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  reference: string;
  date: string;
  enrollmentId: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

export default function PaymentManagement() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'payments' | 'invoices'>('payments');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  useEffect(() => {
    checkAdminAuth();
    fetchPaymentData();
  }, []);

  const checkAdminAuth = () => {
    const token = localStorage.getItem('session-token');
    if (!token) {
      router.push('/login');
    }
  };

  const fetchPaymentData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('session-token');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

      const response = await fetch(`${backendUrl}/admin/payments`, {
        headers: {
          'X-Session-Token': token || ''
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setPayments(data.payments || []);
        setInvoices(data.invoices || []);
      } else {
        useMockData();
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    const mockPayments: Payment[] = [
      {
        id: 'p1',
        studentId: 's1',
        studentName: 'John Doe',
        studentEmail: 'john@example.com',
        courseId: 'c1',
        courseName: 'Full Stack Web Development',
        amount: 1200,
        method: 'card',
        status: 'completed',
        reference: 'TXN-2024-001',
        date: '2024-01-15',
        enrollmentId: 'e1'
      },
      {
        id: 'p2',
        studentId: 's2',
        studentName: 'Jane Smith',
        studentEmail: 'jane@example.com',
        courseId: 'c2',
        courseName: 'React & Next.js Mastery',
        amount: 400,
        method: 'bank_transfer',
        status: 'completed',
        reference: 'TXN-2024-002',
        date: '2024-02-01',
        enrollmentId: 'e2'
      },
      {
        id: 'p3',
        studentId: 's4',
        studentName: 'Sarah Williams',
        studentEmail: 'sarah@example.com',
        courseId: 'c3',
        courseName: 'Mobile App Development',
        amount: 950,
        method: 'mobile_money',
        status: 'pending',
        reference: 'TXN-2024-003',
        date: '2024-03-15',
        enrollmentId: 'e4'
      }
    ];

    const mockInvoices: Invoice[] = [
      {
        id: 'inv1',
        invoiceNumber: 'INV-2024-001',
        studentId: 's1',
        studentName: 'John Doe',
        studentEmail: 'john@example.com',
        courseId: 'c1',
        courseName: 'Full Stack Web Development',
        amount: 1200,
        issueDate: '2024-01-10',
        dueDate: '2024-01-20',
        status: 'paid',
        paidDate: '2024-01-15'
      },
      {
        id: 'inv2',
        invoiceNumber: 'INV-2024-002',
        studentId: 's2',
        studentName: 'Jane Smith',
        studentEmail: 'jane@example.com',
        courseId: 'c2',
        courseName: 'React & Next.js Mastery',
        amount: 800,
        issueDate: '2024-02-01',
        dueDate: '2024-02-15',
        status: 'pending'
      },
      {
        id: 'inv3',
        invoiceNumber: 'INV-2024-003',
        studentId: 's5',
        studentName: 'David Brown',
        studentEmail: 'david@example.com',
        courseId: 'c2',
        courseName: 'React & Next.js Mastery',
        amount: 800,
        issueDate: '2024-03-01',
        dueDate: '2024-03-10',
        status: 'overdue'
      }
    ];

    setPayments(mockPayments);
    setInvoices(mockInvoices);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    const matchesSearch = searchQuery === '' || 
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesMethod && matchesSearch;
  });

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      invoice.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const stats = {
    totalRevenue: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: payments.length,
    pendingPayments: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    pendingInvoices: invoices.filter(i => i.status === 'pending').length,
    overdueInvoices: invoices.filter(i => i.status === 'overdue').length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Payments...</p>
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
              <h1 className="text-xl font-bold text-gray-900">Payment Management</h1>
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
            <div className="text-3xl font-bold text-primary mb-1">${stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalTransactions}</div>
            <div className="text-sm text-gray-600">Total Transactions</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-1">${stats.pendingPayments.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Pending Payments</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.pendingInvoices}</div>
            <div className="text-sm text-gray-600">Pending Invoices</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-red-600 mb-1">{stats.overdueInvoices}</div>
            <div className="text-sm text-gray-600">Overdue Invoices</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border-2 border-gray-200 mb-6">
          <div className="flex border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'payments'
                  ? 'text-primary border-b-2 border-primary -mb-0.5'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'invoices'
                  ? 'text-primary border-b-2 border-primary -mb-0.5'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Invoices
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 border-b-2 border-gray-200">
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search..."
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                {activeTab === 'payments' && <option value="refunded">Refunded</option>}
                {activeTab === 'invoices' && <option value="overdue">Overdue</option>}
                {activeTab === 'invoices' && <option value="paid">Paid</option>}
              </select>
              {activeTab === 'payments' && (
                <select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                >
                  <option value="all">All Methods</option>
                  <option value="card">Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              )}
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setFilterMethod('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-x-auto">
            {activeTab === 'payments' ? (
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Reference</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Course</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Method</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.map(payment => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-mono text-sm text-gray-900">{payment.reference}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{payment.studentName}</div>
                        <div className="text-sm text-gray-600">{payment.studentEmail}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{payment.courseName}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">${payment.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                          {payment.method.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-700' :
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          payment.status === 'failed' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {payment.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowReceiptModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Invoice #</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Course</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Issue Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Due Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInvoices.map(invoice => (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-mono text-sm font-semibold text-gray-900">{invoice.invoiceNumber}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{invoice.studentName}</div>
                        <div className="text-sm text-gray-600">{invoice.studentEmail}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{invoice.courseName}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">${invoice.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(invoice.issueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                          invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {invoice.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => alert('Download invoice: ' + invoice.invoiceNumber)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Receipt Modal */}
      {showReceiptModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Payment Receipt</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Reference:</span>
                <span className="font-mono font-semibold">{selectedPayment.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Student:</span>
                <span className="font-semibold">{selectedPayment.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Course:</span>
                <span className="font-semibold">{selectedPayment.courseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-primary text-xl">${selectedPayment.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="font-semibold">{selectedPayment.method.replace('_', ' ').toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{new Date(selectedPayment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-bold ${
                  selectedPayment.status === 'completed' ? 'text-green-600' :
                  selectedPayment.status === 'pending' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {selectedPayment.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Print Receipt
              </button>
              <button
                onClick={() => setShowReceiptModal(false)}
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
