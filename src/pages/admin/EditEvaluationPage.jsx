import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft } from 'react-icons/fi';

const EditEvaluationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [trainees, setTrainees] = useState([]);
  const [formData, setFormData] = useState({
    traineeId: '',
    score: '',
    feedback: '',
  });

  useEffect(() => {
    fetchEvaluation();
    fetchTrainees();
  }, [id]);

  const fetchEvaluation = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/training/evaluations/${id}`);
      const evaluation = response.data?.data;

      if (evaluation) {
        setFormData({
          traineeId: evaluation.traineeId || '',
          score: evaluation.score || '',
          feedback: evaluation.feedback || '',
        });
      }
    } catch (error) {
      console.error('Error fetching evaluation:', error);
      alert('Failed to load evaluation');
      navigate('/admin/training');
    } finally {
      setFetching(false);
    }
  };

  const fetchTrainees = async () => {
    try {
      const response = await api.get('/users?role=TRAINEE');
      setTrainees(response.data?.data?.data || []);
    } catch (error) {
      console.error('Error fetching trainees:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        traineeId: formData.traineeId,
        score: parseFloat(formData.score),
        feedback: formData.feedback || undefined,
      };

      await api.put(`/training/evaluations/${id}`, payload);
      navigate('/admin/training');
    } catch (error) {
      console.error('Error updating evaluation:', error);
      alert(error.response?.data?.message || 'Failed to update evaluation');
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
          onClick={() => navigate('/admin/training')}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Edit Evaluation</h1>
      </div>

      <div className="card max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trainee <span className="text-red-500">*</span>
            </label>
            <select
              name="traineeId"
              value={formData.traineeId}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select a trainee</option>
              {trainees.map((trainee) => (
                <option key={trainee.id} value={trainee.id}>
                  {trainee.firstName} {trainee.lastName} ({trainee.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Score (0-100) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              required
              min="0"
              max="100"
              step="0.1"
              className="input"
              placeholder="Enter score (0-100)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows="6"
              className="input resize-none"
              placeholder="Enter evaluation feedback"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Updating...' : 'Update Evaluation'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/training')}
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

export default EditEvaluationPage;



