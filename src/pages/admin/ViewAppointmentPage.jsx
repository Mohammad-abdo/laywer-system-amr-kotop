import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiCalendar, FiUser, FiMapPin, FiClock } from 'react-icons/fi';

const ViewAppointmentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const fetchAppointment = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/appointments/${id}`);
      setAppointment(response.data?.data);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      alert('Failed to load appointment');
      navigate('/admin/appointments');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      SCHEDULED: 'bg-blue-100 text-blue-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      IN_PROGRESS: 'bg-purple-100 text-purple-800',
      COMPLETED: 'bg-gray-100 text-gray-800',
      CANCELLED: 'bg-red-100 text-red-800',
      NO_SHOW: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not set';
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

  if (!appointment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Appointment not found</p>
        <Link to="/admin/appointments" className="btn btn-primary">
          Back to Appointments
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/appointments')}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Appointment Details</h1>
        </div>
        <Link
          to={`/admin/appointments/${id}/edit`}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiEdit />
          Edit
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Appointment Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Title</label>
                <p className="text-lg font-semibold text-gray-900">{appointment.title}</p>
              </div>
              {appointment.description && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-gray-700 whitespace-pre-wrap">{appointment.description}</p>
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
                      appointment.status
                    )}`}
                  >
                    {appointment.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiUser />
                  User
                </label>
                <p className="mt-1 text-gray-900">
                  {appointment.user?.firstName} {appointment.user?.lastName}
                </p>
                {appointment.user?.email && (
                  <p className="text-sm text-gray-500">{appointment.user.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiCalendar />
                  Start Time
                </label>
                <p className="mt-1 text-gray-900">{formatDateTime(appointment.startTime)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiClock />
                  End Time
                </label>
                <p className="mt-1 text-gray-900">{formatDateTime(appointment.endTime)}</p>
              </div>

              {appointment.location && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <FiMapPin />
                    Location
                  </label>
                  <p className="mt-1 text-gray-900">{appointment.location}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="mt-1 text-gray-900">
                  {new Date(appointment.createdAt).toLocaleString('en-US')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointmentPage;

