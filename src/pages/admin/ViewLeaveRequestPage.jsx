import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiCalendar, FiUser, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';

const ViewLeaveRequestPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [leaveRequest, setLeaveRequest] = useState(null);
  const [processing, setProcessing] = useState(false);

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';

  useEffect(() => {
    fetchLeaveRequest();
  }, [id]);

  const fetchLeaveRequest = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/hr/leave-requests/${id}`);
      setLeaveRequest(response.data?.data);
    } catch (error) {
      console.error('Error fetching leave request:', error);
      alert('Failed to load leave request');
      navigate('/admin/hr');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!confirm('Are you sure you want to approve this leave request?')) return;

    try {
      setProcessing(true);
      await api.post(`/hr/leave-requests/${id}/approve`);
      fetchLeaveRequest();
      alert('Leave request approved successfully');
    } catch (error) {
      console.error('Error approving leave request:', error);
      alert(error.response?.data?.message || 'Failed to approve leave request');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      setProcessing(true);
      await api.post(`/hr/leave-requests/${id}/reject`, { reason });
      fetchLeaveRequest();
      alert('Leave request rejected successfully');
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      alert(error.response?.data?.message || 'Failed to reject leave request');
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type) => {
    return type.replace('_', ' ');
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

  if (!leaveRequest) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Leave request not found</p>
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
          <h1 className="text-3xl font-bold">Leave Request Details</h1>
        </div>
        {isAdmin && leaveRequest.status === 'PENDING' && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleApprove}
              disabled={processing}
              className="btn btn-success flex items-center gap-2"
            >
              <FiCheckCircle />
              Approve
            </button>
            <button
              onClick={handleReject}
              disabled={processing}
              className="btn btn-danger flex items-center gap-2"
            >
              <FiXCircle />
              Reject
            </button>
            <Link
              to={`/admin/hr/leave/${id}/edit`}
              className="btn btn-primary flex items-center gap-2"
            >
              <FiEdit />
              Edit
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiCalendar />
              Leave Request Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Leave Type</label>
                <p className="text-lg font-semibold text-gray-900">{getTypeLabel(leaveRequest.type)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Start Date</label>
                  <p className="text-gray-900">{formatDate(leaveRequest.startDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">End Date</label>
                  <p className="text-gray-900">{formatDate(leaveRequest.endDate)}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Duration</label>
                <p className="text-gray-900">{leaveRequest.days} day(s)</p>
              </div>

              {leaveRequest.reason && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Reason</label>
                  <p className="text-gray-700 whitespace-pre-wrap">{leaveRequest.reason}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                      leaveRequest.status
                    )}`}
                  >
                    {leaveRequest.status}
                  </span>
                </div>
              </div>

              {leaveRequest.user && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <FiUser />
                    Employee
                  </label>
                  <p className="mt-1 text-gray-900">
                    {leaveRequest.user.firstName} {leaveRequest.user.lastName}
                  </p>
                  {leaveRequest.user.email && (
                    <p className="text-sm text-gray-500">{leaveRequest.user.email}</p>
                  )}
                </div>
              )}

              {leaveRequest.approvedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Approved At</label>
                  <p className="mt-1 text-gray-900">
                    {new Date(leaveRequest.approvedAt).toLocaleString('en-US')}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiCalendar />
                  Created At
                </label>
                <p className="mt-1 text-gray-900">
                  {new Date(leaveRequest.createdAt).toLocaleString('en-US')}
                </p>
              </div>

              {leaveRequest.updatedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="mt-1 text-gray-900">
                    {new Date(leaveRequest.updatedAt).toLocaleString('en-US')}
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

export default ViewLeaveRequestPage;



