import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiFileText } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';

const ViewCompanyFormationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [formation, setFormation] = useState(null);

  useEffect(() => {
    fetchCompanyFormation();
  }, [id]);

  const fetchCompanyFormation = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/company-formation/${id}`);
      setFormation(response.data?.data || null);
    } catch (error) {
      console.error('Error fetching company formation:', error);
      alert('Failed to load company formation');
      navigate('/admin/company-formation');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      DRAFT: 'bg-gray-100 text-gray-800',
      SUBMITTED: 'bg-blue-100 text-blue-800',
      UNDER_REVIEW: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      COMPLETED: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
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

  if (!formation) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Company formation request not found</p>
        <Link to="/admin/company-formation" className="btn btn-primary mt-4">
          Back to Company Formations
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/company-formation')}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Company Formation Details</h1>
        </div>
        <Link
          to={`/admin/company-formation/${id}/edit`}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiEdit />
          Edit
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{formation.tradeName}</h2>
              <p className="text-gray-600">{formation.legalForm}</p>
            </div>

            {formation.notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{formation.notes}</p>
              </div>
            )}

            {/* Steps Progress */}
            {formation.steps && formation.steps.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Formation Steps</h3>
                <div className="space-y-4">
                  {formation.steps.map((step) => (
                    <div
                      key={step.id}
                      className={`p-4 rounded-lg border-2 ${
                        step.isCompleted
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              step.isCompleted
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-300 text-gray-600'
                            }`}
                          >
                            {step.stepNumber}
                          </div>
                          <div>
                            <h4 className="font-medium">{step.title}</h4>
                            {step.description && (
                              <p className="text-sm text-gray-600">{step.description}</p>
                            )}
                          </div>
                        </div>
                        {step.isCompleted && (
                          <span className="text-green-600 font-medium">✓ Completed</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {formation.documents && formation.documents.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Documents</h3>
                <div className="space-y-2">
                  {formation.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FiFileText className="text-gray-500" />
                        <span className="text-sm font-medium">{doc.originalName}</span>
                      </div>
                      <a
                        href={`/api/v1/documents/${doc.id}/download`}
                        className="text-info-600 hover:text-info-800 text-sm"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Request Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                      formation.status
                    )}`}
                  >
                    {formation.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Progress</label>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Step {formation.currentStep} of {formation.totalSteps}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.round((formation.currentStep / formation.totalSteps) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(formation.currentStep / formation.totalSteps) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Client</label>
                <p className="mt-1 text-gray-900">
                  {formation.client?.firstName} {formation.client?.lastName}
                </p>
                {formation.client?.email && (
                  <p className="text-sm text-gray-500">{formation.client.email}</p>
                )}
                {formation.client?.phone && (
                  <p className="text-sm text-gray-500">{formation.client.phone}</p>
                )}
              </div>

              {formation.submittedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Submitted At</label>
                  <p className="mt-1 text-gray-900">{formatDate(formation.submittedAt)}</p>
                </div>
              )}

              {formation.completedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Completed At</label>
                  <p className="mt-1 text-gray-900">{formatDate(formation.completedAt)}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="mt-1 text-gray-900">{formatDate(formation.createdAt)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Updated At</label>
                <p className="mt-1 text-gray-900">{formatDate(formation.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCompanyFormationPage;

