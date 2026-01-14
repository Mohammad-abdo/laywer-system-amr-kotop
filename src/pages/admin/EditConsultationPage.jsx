import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft } from 'react-icons/fi';

const EditConsultationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [lawyers, setLawyers] = useState([]);
  const [formData, setFormData] = useState({
    type: 'ONLINE',
    subject: '',
    description: '',
    scheduledAt: '',
    duration: 60,
    status: 'PENDING',
    lawyerId: '',
  });

  useEffect(() => {
    fetchConsultation();
    fetchLawyers();
  }, [id]);

  const fetchConsultation = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/consultations/${id}`);
      const consultation = response.data?.data;
      
      if (consultation) {
        setFormData({
          type: consultation.type || 'ONLINE',
          subject: consultation.subject || '',
          description: consultation.description || '',
          scheduledAt: consultation.scheduledAt 
            ? new Date(consultation.scheduledAt).toISOString().slice(0, 16)
            : '',
          duration: consultation.duration || 60,
          status: consultation.status || 'PENDING',
          lawyerId: consultation.lawyerId || '',
        });
      }
    } catch (error) {
      console.error('Error fetching consultation:', error);
      alert('Failed to load consultation');
      navigate('/admin/consultations');
    } finally {
      setFetching(false);
    }
  };

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
        status: formData.status,
        lawyerId: formData.lawyerId || undefined,
      };

      await api.put(`/consultations/${id}`, payload);
      navigate('/admin/consultations');
    } catch (error) {
      console.error('Error updating consultation:', error);
      alert(error.response?.data?.message || 'Failed to update consultation');
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
          onClick={() => navigate('/admin/consultations')}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Edit Consultation</h1>
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
              <option value="SCHEDULED">Scheduled</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
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
              {loading ? 'Updating...' : 'Update Consultation'}
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

export default EditConsultationPage;

