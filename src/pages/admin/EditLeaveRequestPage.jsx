import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft } from 'react-icons/fi';

const EditLeaveRequestPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    type: 'ANNUAL',
    status: 'PENDING',
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    fetchLeaveRequest();
  }, [id]);

  const fetchLeaveRequest = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/hr/leave-requests/${id}`);
      const leaveRequest = response.data?.data;

      if (leaveRequest) {
        setFormData({
          type: leaveRequest.type || 'ANNUAL',
          status: leaveRequest.status || 'PENDING',
          startDate: leaveRequest.startDate
            ? new Date(leaveRequest.startDate).toISOString().split('T')[0]
            : '',
          endDate: leaveRequest.endDate
            ? new Date(leaveRequest.endDate).toISOString().split('T')[0]
            : '',
          reason: leaveRequest.reason || '',
        });
      }
    } catch (error) {
      console.error('Error fetching leave request:', error);
      alert('Failed to load leave request');
      navigate('/admin/hr');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        type: formData.type,
        status: formData.status,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        reason: formData.reason || undefined,
      };

      await api.put(`/hr/leave-requests/${id}`, payload);
      navigate('/admin/hr');
    } catch (error) {
      console.error('Error updating leave request:', error);
      alert(error.response?.data?.message || 'Failed to update leave request');
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
        <h1 className="text-3xl font-bold">Edit Leave Request</h1>
      </div>

      <div className="card max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="ANNUAL">Annual</option>
                <option value="SICK">Sick</option>
                <option value="EMERGENCY">Emergency</option>
                <option value="UNPAID">Unpaid</option>
                <option value="MATERNITY">Maternity</option>
                <option value="PATERNITY">Paternity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          </div>

          {formData.startDate && formData.endDate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Duration:</strong> {calculateDays()} day(s)
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              className="input resize-none"
              placeholder="Enter reason for leave"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Updating...' : 'Update Leave Request'}
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

export default EditLeaveRequestPage;



