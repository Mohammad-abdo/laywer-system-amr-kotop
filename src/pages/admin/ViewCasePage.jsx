import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiCalendar, FiUser, FiBriefcase } from 'react-icons/fi';

const ViewCasePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    fetchCase();
  }, [id]);

  const fetchCase = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/cases/${id}`);
      setCaseData(response.data?.data);
    } catch (error) {
      console.error('Error fetching case:', error);
      alert('Failed to load case');
      navigate('/admin/cases');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      ON_HOLD: 'bg-gray-100 text-gray-800',
      CLOSED: 'bg-green-100 text-green-800',
      ARCHIVED: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      CIVIL: 'bg-blue-50 text-blue-700',
      CRIMINAL: 'bg-red-50 text-red-700',
      COMMERCIAL: 'bg-green-50 text-green-700',
      LABOR: 'bg-yellow-50 text-yellow-700',
      FAMILY: 'bg-pink-50 text-pink-700',
      ADMINISTRATIVE: 'bg-purple-50 text-purple-700',
      CONSTITUTIONAL: 'bg-indigo-50 text-indigo-700',
      OTHER: 'bg-gray-50 text-gray-700',
    };
    return colors[type] || 'bg-gray-50 text-gray-700';
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

  if (!caseData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Case not found</p>
        <Link to="/admin/cases" className="btn btn-primary">
          Back to Cases
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/cases')}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Case Details</h1>
        </div>
        <Link
          to={`/admin/cases/${id}/edit`}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiEdit />
          Edit
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Case Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Case Number</label>
                <p className="text-lg font-semibold text-gray-900">{caseData.caseNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Title</label>
                <p className="text-gray-900">{caseData.title}</p>
              </div>
              {caseData.description && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-gray-700 whitespace-pre-wrap">{caseData.description}</p>
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
                      caseData.status
                    )}`}
                  >
                    {caseData.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeBadgeColor(
                      caseData.type
                    )}`}
                  >
                    {caseData.type.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiUser />
                  Client
                </label>
                <p className="mt-1 text-gray-900">
                  {caseData.client?.firstName} {caseData.client?.lastName}
                </p>
                {caseData.client?.email && (
                  <p className="text-sm text-gray-500">{caseData.client.email}</p>
                )}
              </div>

              {caseData.lawyer && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <FiBriefcase />
                    Lawyer
                  </label>
                  <p className="mt-1 text-gray-900">
                    {caseData.lawyer.firstName} {caseData.lawyer.lastName}
                  </p>
                </div>
              )}

              {caseData.trainee && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Trainee</label>
                  <p className="mt-1 text-gray-900">
                    {caseData.trainee.firstName} {caseData.trainee.lastName}
                  </p>
                </div>
              )}

              {caseData.court && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Court</label>
                  <p className="mt-1 text-gray-900">{caseData.court}</p>
                  {caseData.courtNumber && (
                    <p className="text-sm text-gray-500">Number: {caseData.courtNumber}</p>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiCalendar />
                  Start Date
                </label>
                <p className="mt-1 text-gray-900">{formatDate(caseData.startDate)}</p>
              </div>

              {caseData.endDate && (
                <div>
                  <label className="text-sm font-medium text-gray-500">End Date</label>
                  <p className="mt-1 text-gray-900">{formatDate(caseData.endDate)}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="mt-1 text-gray-900">
                  {new Date(caseData.createdAt).toLocaleString('en-US')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCasePage;

