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
  date: string;
  method: 'card' | 'bank_transfer' | 'cash' | 'mobile_money';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  reference: string;
  invoiceNumber: string;
  receiptNumber?: string;
  notes?: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

export default function PaymentManagement() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'payments' | 'invoices'>('payments');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  useEffect(() => {
    checkAdminAuth();
    fetchPayments();
  }, []);

  const checkAdminAuth = () => {
    const token = localStorage.getItem('session-token');
    if (!token) {
      router.push('/login');
    }
  };

  const fetchPayments = async () => {
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
      console.error('Error fetching payments:', error);
      useMockData();
    } finally {
      setLoading(false);
    }
  };

  const useMockData = () => {
    setPayments([
      {
        id: '1',
        studentId: '1',
        studentName: 'Alice Johnson',
        studentEmail: 'alice@example.com',
        courseId: '1',
        courseName: 'Full Stack Web Development',
        amount: 1200,
        date: '2024-01-15',
        method: 'card',
        status: 'completed',
        reference: 'PAY-001-2024',
        invoiceNumber: 'INV-001-2024',
        receiptNumber: 'REC-001-2024',
        notes: 'Full payment received'
      },
      {
        id: '2',
        studentId: '3',
        studentName: 'Carol White',
        studentEmail: 'carol@example.com',
        courseId: '3',
        courseName: 'Node.js Backend Development',
        amount: 450,
        date: '2024-02-20',
        method: 'bank_transfer',
        status: 'completed',
        reference: 'PAY-002-2024',
        invoiceNumber: 'INV-002-2024',
        receiptNumber: 'REC-002-2024',
        notes: 'Partial payment - first installment'
      },
      {
        id: '3',
        studentId: '4',
        studentName: 'David Brown',
        studentEmail: 'david@example.com',
        courseId: '4',
        courseName: 'Python for Data Science',
        amount: 1000,
        date: '2024-03-01',
        method: 'card',
        status: 'pending',
        reference: 'PAY-003-2024',
        invoiceNumber: 'INV-003-2024',
        notes: 'Payment processing'
      },
      {
        id: '4',
        studentId: '2',
        studentName: 'Bob Smith',
        studentEmail: 'bob@example.com',
        courseId: '2',
        courseName: 'React & Next.js Mastery',
        amount: 800,
        date: '2024-02-01',
        method: 'mobile_money',
        status: 'completed',
        reference: 'PAY-004-2024',
        invoiceNumber: 'INV-004-2024',
        receiptNumber: 'REC-004-2024'
      },
      {
        id: '5',
        studentId: '5',
        studentName: 'Emma Davis',
        studentEmail: 'emma@example.com',
        courseId: '1',
        courseName: 'Full Stack Web Development',
        amount: 400,
        date: '2024-01-25',
        method: 'cash',
        status: 'completed',
        reference: 'PAY-005-2024',
        invoiceNumber: 'INV-005-2024',
        receiptNumber: 'REC-005-2024',
        notes: 'Cash payment at office'
      }
    ]);

    setInvoices([
      {
        id: '1',
        invoiceNumber: 'INV-001-2024',
        studentName: 'Alice Johnson',
        studentEmail: 'alice@example.com',
        courseName: 'Full Stack Web Development',
        amount: 1200,
        issueDate: '2024-01-10',
        dueDate: '2024-01-20',
        status: 'paid',
        paidDate: '2024-01-15'
      },
      {
        id: '2',
        invoiceNumber: 'INV-006-2024',
        studentName: 'Emma Davis',
        studentEmail: 'emma@example.com',
        courseName: 'Full Stack Web Development',
        amount: 800,
        issueDate: '2024-03-10',
        dueDate: '2024-03-20',
        status: 'pending'
      },
      {
        id: '3',
        invoiceNumber: 'INV-007-2024',
        studentName: 'Frank Wilson',
        studentEmail: 'frank@example.com',
        courseName: 'Mobile App Development',
        amount: 950,
        issueDate: '2024-02-15',
        dueDate: '2024-02-25',
        status: 'overdue'
      }
    ]);
  };

  const handlePrintReceipt = (payment: Payment) => {
    window.print();
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    alert(`Downloading invoice ${invoice.invoiceNumber}`);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    const matchesSearch = searchQuery === '' || 
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesMethod && matchesSearch;
  });

  const stats = {
    totalRevenue: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    pendingPayments: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: payments.length,
    completedTransactions: payments.filter(p => p.status === 'completed').length,
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
      {/* Header */}
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
              Back to Training Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">${stats.totalRevenue.toLocaleString()}</div>
            <div className="text-white/90 text-sm">Total Revenue</div>
            <div className="mt-2 text-xs text-white/80">{stats.completedTransactions} completed</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalTransactions}</div>
            <div className="text-white/90 text-sm">Total Transactions</div>
            <div className="mt-2 text-xs text-white/80">All time</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">${stats.pendingPayments.toLocaleString()}</div>
            <div className="text-white/90 text-sm">Pending Payments</div>
            <div className="mt-2 text-xs text-white/80">Awaiting confirmation</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.pendingInvoices}</div>
            <div className="text-white/90 text-sm">Pending Invoices</div>
            <div className="mt-2 text-xs text-white/80">{stats.overdueInvoices} overdue</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b mb-6 rounded-t-xl">
          <nav className="flex gap-1 px-6">
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'payments'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-6 py-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'invoices'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Invoices
            </button>
          </nav>
        </div>

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 mb-6">
              <div className="grid md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Search payments..."
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
                  <option value="refunded">Refunded</option>
                </select>
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
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterStatus('all');
                    setFilterMethod('all');
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Reference</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Method</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPayments.map(payment => (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-mono text-sm font-semibold text-gray-900">{payment.reference}</div>
                          <div className="text-xs text-gray-600">{payment.invoiceNumber}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{payment.studentName}</div>
                          <div className="text-sm text-gray-600">{payment.studentEmail}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{payment.courseName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-gray-900">${payment.amount}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                            {payment.method.replace('_', ' ').toUpperCase()}
                          </span>
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
                          <div className="flex items-center gap-2">
                            {payment.receiptNumber && (
                              <button
                                onClick={() => {
                                  setSelectedPayment(payment);
                                  setShowReceiptModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                Receipt
                              </button>
                            )}
                            <Link
                              href={`/admin/training/students/${payment.studentId}`}
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
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div>
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Invoice #</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Issue Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Due Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map(invoice => (
                      <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-mono text-sm font-semibold text-gray-900">{invoice.invoiceNumber}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{invoice.studentName}</div>
                          <div className="text-sm text-gray-600">{invoice.studentEmail}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{invoice.courseName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-gray-900">${invoice.amount}</div>
                        </td>
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
                            onClick={() => handleDownloadInvoice(invoice)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Receipt Modal */}
      {showReceiptModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full" id="receipt-print">
            <div className="text-center mb-6">
              <img src="/jascomelogo.png" alt="JACOM Logo" className="h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Payment Receipt</h2>
              <p className="text-gray-600">Receipt #{selectedPayment.receiptNumber}</p>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Student Information</h3>
                  <p className="text-gray-900 font-semibold">{selectedPayment.studentName}</p>
                  <p className="text-gray-600 text-sm">{selectedPayment.studentEmail}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Payment Details</h3>
                  <p className="text-gray-900"><span className="font-semibold">Date:</span> {new Date(selectedPayment.date).toLocaleDateString()}</p>
                  <p className="text-gray-900"><span className="font-semibold">Method:</span> {selectedPayment.method.replace('_', ' ').toUpperCase()}</p>
                  <p className="text-gray-900"><span className="font-semibold">Reference:</span> {selectedPayment.reference}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-4">Course Details</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-900 font-semibold">{selectedPayment.courseName}</span>
                  <span className="text-2xl font-bold text-gray-900">${selectedPayment.amount}</span>
                </div>
                {selectedPayment.notes && (
                  <p className="text-sm text-gray-600 mt-2">{selectedPayment.notes}</p>
                )}
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount Paid</span>
                <span className="text-3xl font-bold text-primary">${selectedPayment.amount}</span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 mb-6">
              <p>Thank you for your payment!</p>
              <p>This is an official receipt from JACOM Training Center</p>
            </div>

            <div className="flex gap-4 print:hidden">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Print Receipt
              </button>
              <button
                onClick={() => {
                  setShowReceiptModal(false);
                  setSelectedPayment(null);
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
