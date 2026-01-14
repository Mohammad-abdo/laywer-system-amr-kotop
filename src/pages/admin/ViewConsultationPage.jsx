import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiCalendar, FiUser, FiClock } from 'react-icons/fi';

const ViewConsultationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [consultation, setConsultation] = useState(null);

  useEffect(() => {
    fetchConsultation();
  }, [id]);

  const fetchConsultation = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/consultations/${id}`);
      setConsultation(response.data?.data);
    } catch (error) {
      console.error('Error fetching consultation:', error);
      alert('Failed to load consultation');
      navigate('/admin/consultations');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      SCHEDULED: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-purple-100 text-purple-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      ONLINE: 'bg-blue-50 text-blue-700',
      IN_PERSON: 'bg-green-50 text-green-700',
      PHONE: 'bg-yellow-50 text-yellow-700',
    };
    return colors[type] || 'bg-gray-50 text-gray-700';
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Consultation not found</p>
        <Link to="/admin/consultations" className="btn btn-primary">
          Back to Consultations
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/consultations')}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Consultation Details</h1>
        </div>
        <Link
          to={`/admin/consultations/${id}/edit`}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiEdit />
          Edit
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Subject</h2>
            <p className="text-gray-700">{consultation.subject}</p>
          </div>

          {consultation.description && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{consultation.description}</p>
            </div>
          )}

          {consultation.report && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Report</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{consultation.report}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                      consultation.status
                    )}`}
                  >
                    {consultation.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeBadgeColor(
                      consultation.type
                    )}`}
                  >
                    {consultation.type.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiUser />
                  Client
                </label>
                <p className="mt-1 text-gray-900">
                  {consultation.client?.firstName} {consultation.client?.lastName}
                </p>
                {consultation.client?.email && (
                  <p className="text-sm text-gray-500">{consultation.client.email}</p>
                )}
              </div>

              {consultation.lawyer && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Assigned Lawyer</label>
                  <p className="mt-1 text-gray-900">
                    {consultation.lawyer.firstName} {consultation.lawyer.lastName}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiCalendar />
                  Scheduled At
                </label>
                <p className="mt-1 text-gray-900">{formatDateTime(consultation.scheduledAt)}</p>
              </div>

              {consultation.duration && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <FiClock />
                    Duration
                  </label>
                  <p className="mt-1 text-gray-900">{consultation.duration} minutes</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="mt-1 text-gray-900">
                  {new Date(consultation.createdAt).toLocaleString('en-US')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewConsultationPage;

