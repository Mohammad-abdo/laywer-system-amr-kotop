import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiCalendar, FiUser, FiDollarSign } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';

const ViewPayrollRecordPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [payrollRecord, setPayrollRecord] = useState(null);

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';

  useEffect(() => {
    fetchPayrollRecord();
  }, [id]);

  const fetchPayrollRecord = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/hr/payroll/${id}`);
      setPayrollRecord(response.data?.data);
    } catch (error) {
      console.error('Error fetching payroll record:', error);
      alert('Failed to load payroll record');
      navigate('/admin/hr');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!payrollRecord) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Payroll record not found</p>
        <Link to="/admin/hr" className="btn btn-primary">
          Back to HR
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/hr')}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Payroll Record Details</h1>
        </div>
        {isAdmin && (
          <Link
            to={`/admin/hr/payroll/${id}/edit`}
            className="btn btn-primary flex items-center gap-2"
          >
            <FiEdit />
            Edit
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiDollarSign />
              Payroll Information
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Base Salary</label>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(payrollRecord.baseSalary)} EGP
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Bonuses</label>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    +{formatCurrency(payrollRecord.bonuses)} EGP
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Deductions</label>
                  <p className="text-2xl font-bold text-red-600 mt-1">
                    -{formatCurrency(payrollRecord.deductions)} EGP
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Net Salary</label>
                  <p className="text-3xl font-bold text-blue-600 mt-1">
                    {formatCurrency(payrollRecord.netSalary)} EGP
                  </p>
                </div>
              </div>

              {payrollRecord.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Notes</label>
                  <p className="text-gray-700 whitespace-pre-wrap mt-1">{payrollRecord.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <div className="space-y-4">
              {payrollRecord.user && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <FiUser />
                    Employee
                  </label>
                  <p className="mt-1 text-gray-900">
                    {payrollRecord.user.firstName} {payrollRecord.user.lastName}
                  </p>
                  {payrollRecord.user.email && (
                    <p className="text-sm text-gray-500">{payrollRecord.user.email}</p>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiCalendar />
                  Period
                </label>
                <p className="mt-1 text-gray-900 font-semibold">{payrollRecord.period}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiCalendar />
                  Created At
                </label>
                <p className="mt-1 text-gray-900">
                  {new Date(payrollRecord.createdAt).toLocaleString('en-US')}
                </p>
              </div>

              {payrollRecord.updatedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="mt-1 text-gray-900">
                    {new Date(payrollRecord.updatedAt).toLocaleString('en-US')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPayrollRecordPage;



