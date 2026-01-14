import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft } from 'react-icons/fi';

const EditPayrollRecordPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    period: '',
    baseSalary: '',
    bonuses: '',
    deductions: '',
    notes: '',
  });

  useEffect(() => {
    fetchPayrollRecord();
    fetchUsers();
  }, [id]);

  const fetchPayrollRecord = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/hr/payroll/${id}`);
      const payroll = response.data?.data;

      if (payroll) {
        setFormData({
          userId: payroll.userId || '',
          period: payroll.period || '',
          baseSalary: payroll.baseSalary || '',
          bonuses: payroll.bonuses || '0',
          deductions: payroll.deductions || '0',
          notes: payroll.notes || '',
        });
      }
    } catch (error) {
      console.error('Error fetching payroll record:', error);
      alert('Failed to load payroll record');
      navigate('/admin/hr');
    } finally {
      setFetching(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      const data = response.data?.data?.data || response.data?.data || [];
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateNetSalary = () => {
    const base = parseFloat(formData.baseSalary) || 0;
    const bonuses = parseFloat(formData.bonuses) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    return base + bonuses - deductions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        userId: formData.userId,
        period: formData.period,
        baseSalary: parseFloat(formData.baseSalary),
        bonuses: parseFloat(formData.bonuses) || 0,
        deductions: parseFloat(formData.deductions) || 0,
        notes: formData.notes || undefined,
      };

      await api.put(`/hr/payroll/${id}`, payload);
      navigate('/admin/hr');
    } catch (error) {
      console.error('Error updating payroll record:', error);
      alert(error.response?.data?.message || 'Failed to update payroll record');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/hr')}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Edit Payroll Record</h1>
      </div>

      <div className="card max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee <span className="text-red-500">*</span>
              </label>
              <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select an employee</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period (YYYY-MM) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="period"
                value={formData.period}
                onChange={handleChange}
                required
                pattern="\d{4}-\d{2}"
                placeholder="2024-01"
                className="input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Salary <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="input"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bonuses
              </label>
              <input
                type="number"
                name="bonuses"
                value={formData.bonuses}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="input"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="input"
                placeholder="0.00"
              />
            </div>
          </div>

          {formData.baseSalary && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Net Salary:</strong>{' '}
                {calculateNetSalary().toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                EGP
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="input resize-none"
              placeholder="Enter payroll notes"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Updating...' : 'Update Payroll Record'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/hr')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPayrollRecordPage;



