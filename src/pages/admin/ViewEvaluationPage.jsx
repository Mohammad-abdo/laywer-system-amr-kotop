import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiCalendar, FiUser, FiAward } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';

const ViewEvaluationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [evaluation, setEvaluation] = useState(null);

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';
  const isLawyer = user?.role === 'LAWYER';

  useEffect(() => {
    fetchEvaluation();
  }, [id]);

  const fetchEvaluation = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/training/evaluations/${id}`);
      setEvaluation(response.data?.data);
    } catch (error) {
      console.error('Error fetching evaluation:', error);
      alert('Failed to load evaluation');
      navigate('/admin/training');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
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

  if (!evaluation) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Evaluation not found</p>
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
          <h1 className="text-3xl font-bold">Evaluation Details</h1>
        </div>
        {(isAdmin || isLawyer) && (
          <Link
            to={`/admin/training/evaluations/${id}/edit`}
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
              <FiAward />
              Evaluation Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Score</label>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-2xl font-bold ${getScoreColor(
                      evaluation.score
                    )}`}
                  >
                    {evaluation.score} / 100
                  </span>
                </div>
              </div>

              {evaluation.feedback && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Feedback</label>
                  <p className="text-gray-700 whitespace-pre-wrap mt-1">{evaluation.feedback}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <div className="space-y-4">
              {evaluation.trainee && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <FiUser />
                    Trainee
                  </label>
                  <p className="mt-1 text-gray-900">
                    {evaluation.trainee.firstName} {evaluation.trainee.lastName}
                  </p>
                  {evaluation.trainee.email && (
                    <p className="text-sm text-gray-500">{evaluation.trainee.email}</p>
                  )}
                </div>
              )}

              {evaluation.evaluator && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <FiUser />
                    Evaluator
                  </label>
                  <p className="mt-1 text-gray-900">
                    {evaluation.evaluator.firstName} {evaluation.evaluator.lastName}
                  </p>
                  {evaluation.evaluator.email && (
                    <p className="text-sm text-gray-500">{evaluation.evaluator.email}</p>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <FiCalendar />
                  Created At
                </label>
                <p className="mt-1 text-gray-900">
                  {new Date(evaluation.createdAt).toLocaleString('en-US')}
                </p>
              </div>

              {evaluation.updatedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="mt-1 text-gray-900">
                    {new Date(evaluation.updatedAt).toLocaleString('en-US')}
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

export default ViewEvaluationPage;

