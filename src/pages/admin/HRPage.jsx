import { useState, useEffect } from 'react';
import api from '../../config/api.js';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
// LeaveType and LeaveStatus enums (matching backend)
const LeaveType = {
  ANNUAL: 'ANNUAL',
  SICK: 'SICK',
  EMERGENCY: 'EMERGENCY',
  UNPAID: 'UNPAID',
  MATERNITY: 'MATERNITY',
  PATERNITY: 'PATERNITY',
};

const LeaveStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};
import { FiCalendar, FiDollarSign, FiPlus, FiEdit, FiEye } from 'react-icons/fi';

const HRPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('leave'); // 'leave' or 'payroll'
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'leave') {
      fetchLeaveRequests();
    } else {
      fetchPayrollRecords();
    }
  }, [activeTab]);

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/hr/leave-requests');
      const data = response.data?.data?.data || response.data?.data || [];
      setLeaveRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      setLeaveRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayrollRecords = async () => {
    try {
      setLoading(true);
      const response = await api.get('/hr/payroll');
      const data = response.data?.data?.data || response.data?.data || [];
      setPayrollRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching payroll records:', error);
      setPayrollRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">HR Management</h1>
        {isAdmin && activeTab === 'leave' && (
          <Link to="/admin/hr/leave/new" className="btn btn-primary flex items-center gap-2">
            <FiPlus />
            <span>New Leave Request</span>
          </Link>
        )}
        {isAdmin && activeTab === 'payroll' && (
          <Link to="/admin/hr/payroll/new" className="btn btn-primary flex items-center gap-2">
            <FiPlus />
            <span>New Payroll Record</span>
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('leave')}
            className={`${
              activeTab === 'leave'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <FiCalendar />
            Leave Requests
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveTab('payroll')}
              className={`${
                activeTab === 'payroll'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
            >
              <FiDollarSign />
              Payroll Records
            </button>
          )}
        </nav>
      </div>

      {/* Leave Requests Tab */}
      {activeTab === 'leave' && (
        <div className="card">
          {leaveRequests.length === 0 ? (
            <div className="text-center py-12">
              <FiCalendar className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500">No leave requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaveRequests.map((leave) => (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {leave.user?.firstName} {leave.user?.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {leave.type.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.days}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            leave.status === 'APPROVED'
                              ? 'bg-green-100 text-green-800'
                              : leave.status === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/hr/leave/${leave.id}`}
                            className="text-info-600 hover:text-info-900 flex items-center gap-1"
                            title="View"
                          >
                            <FiEye />
                          </Link>
                          {isAdmin && (
                            <Link
                              to={`/admin/hr/leave/${leave.id}/edit`}
                              className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                              title="Edit"
                            >
                              <FiEdit />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Payroll Records Tab */}
      {activeTab === 'payroll' && isAdmin && (
        <div className="card">
          {payrollRecords.length === 0 ? (
            <div className="text-center py-12">
              <FiDollarSign className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500">No payroll records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Base Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bonuses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deductions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payrollRecords.map((payroll) => (
                    <tr key={payroll.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payroll.user?.firstName} {payroll.user?.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Number(payroll.baseSalary).toLocaleString()} EGP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        +{Number(payroll.bonuses).toLocaleString()} EGP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        -{Number(payroll.deductions).toLocaleString()} EGP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {Number(payroll.netSalary).toLocaleString()} EGP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/hr/payroll/${payroll.id}`}
                            className="text-info-600 hover:text-info-900 flex items-center gap-1"
                            title="View"
                          >
                            <FiEye />
                          </Link>
                          {isAdmin && (
                            <Link
                              to={`/admin/hr/payroll/${payroll.id}/edit`}
                              className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                              title="Edit"
                            >
                              <FiEdit />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HRPage;
