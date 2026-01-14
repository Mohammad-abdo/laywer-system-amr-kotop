import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiCalendar, FiUser, FiBookOpen } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';

const ViewAssignmentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';
  const isLawyer = user?.role === 'LAWYER';

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/training/assignments/${id}`);
      setAssignment(response.data?.data);
    } catch (error) {
      console.error('Error fetching assignment:', error);
      alert('Failed to load training assignment');
      navigate('/admin/training');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      ASSIGNED: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
      COMPLETED: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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

  if (!assignment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Training assignment not found</p>
        <Link to="/admin/training" className="btn btn-primary">
          Back to Training
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/training')}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Training Assignment Details</h1>
        </div>
        {(isAdmin || isLawyer) && (
          <Link
            to={`/admin/training/assignments/${id}/edit`}
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
            <h2 className="text-xl font-bold mb-4">Assignment Information</h2>
            <div className="space-y-4">
              {assignment.program && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <FiBookOpen />
                    Training Program
                  </label>
                  <p className="text-lg font-semibold text-gray-900">{assignment.program.title}</p>
                  {assignment.program.description && (
                    <p className="text-sm text-gray-600 mt-1">{assignment.program.description}</p>
                  )}
                  <Link
                    to={`/admin/training/programs/${assignment.program.id}`}
                    className="text-primary-600 hover:text-primary-900 text-sm mt-1 inline-block"
                  >
                    View Program →
                  </Link>
                </div>
              )}

              {assignment.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Notes</label>
                  <p className="text-gray-700 whitespace-pre-wrap">{assignment.notes}</p>
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
                      assignment.status
                    )}`}
                  >
                    {assignment.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {assignment.trainee && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <FiUser />
                    Trainee
                  </label>
                  <p className="mt-1 text-gray-900">
                    {assignment.trainee.firstName} {assignment.trainee.lastName}
                  </p>
                  {assignment.trainee.email && (
                    <p className="text-sm text-gray-500">{assignment.trainee.email}</p>
                  )}
                </div>
              )}

              {assignment.lawyer && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <FiUser />
                    Supervisor (Lawyer)
                  </label>
                  <p className="mt-1 text-gray-900">
                    {assignment.lawyer.firstName} {assignment.lawyer.lastName}
                  </p>
                  {assignment.lawyer.email && (
                    <p className="text-sm text-gray-500">{assignment.lawyer.email}</p>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiCalendar />
                  Created At
                </label>
                <p className="mt-1 text-gray-900">
                  {new Date(assignment.createdAt).toLocaleString('en-US')}
                </p>
              </div>

              {assignment.updatedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="mt-1 text-gray-900">
                    {new Date(assignment.updatedAt).toLocaleString('en-US')}
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

export default ViewAssignmentPage;



