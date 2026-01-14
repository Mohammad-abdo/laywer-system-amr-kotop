import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { FiArrowLeft } from 'react-icons/fi';

const CreateConsultationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [formData, setFormData] = useState({
    type: 'ONLINE',
    subject: '',
    description: '',
    scheduledAt: '',
    duration: 60,
    lawyerId: '',
  });

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await api.get('/users?role=LAWYER');
      setLawyers(response.data?.data?.data || []);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
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
        type: formData.type,
        subject: formData.subject,
        description: formData.description || undefined,
        scheduledAt: formData.scheduledAt || undefined,
        duration: formData.duration ? parseInt(formData.duration) : undefined,
        lawyerId: formData.lawyerId || undefined,
      };

      await api.post('/consultations', payload);
      navigate('/admin/consultations');
    } catch (error) {
      console.error('Error creating consultation:', error);
      alert(error.response?.data?.message || 'Failed to create consultation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/consultations')}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Create New Consultation</h1>
      </div>

      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="ONLINE">Online</option>
              <option value="IN_PERSON">In Person</option>
              <option value="PHONE">Phone</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="input"
              placeholder="Enter consultation subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="input resize-none"
              placeholder="Enter consultation description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled At
              </label>
              <input
                type="datetime-local"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="15"
                step="15"
                className="input"
                placeholder="60"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Lawyer (Optional)
            </label>
            <select
              name="lawyerId"
              value={formData.lawyerId}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select a lawyer</option>
              {lawyers.map((lawyer) => (
                <option key={lawyer.id} value={lawyer.id}>
                  {lawyer.firstName} {lawyer.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Creating...' : 'Create Consultation'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/consultations')}
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

export default CreateConsultationPage;

