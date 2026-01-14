import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';

const EditCompanyFormationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: '',
    tradeName: '',
    legalForm: '',
    status: 'DRAFT',
    notes: '',
  });

  useEffect(() => {
    if (user?.role !== 'CLIENT') {
      fetchClients();
    }
    fetchCompanyFormation();
  }, [id, user]);

  const fetchClients = async () => {
    try {
      const response = await api.get('/users?role=CLIENT&limit=100');
      const data = response.data?.data?.data || [];
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchCompanyFormation = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/company-formation/${id}`);
      const formation = response.data?.data || {};

      setFormData({
        clientId: formation.clientId || '',
        tradeName: formation.tradeName || '',
        legalForm: formation.legalForm || '',
        status: formation.status || 'DRAFT',
        notes: formation.notes || '',
      });
    } catch (error) {
      console.error('Error fetching company formation:', error);
      alert('Failed to load company formation');
      navigate('/admin/company-formation');
    } finally {
      setFetching(false);
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
        tradeName: formData.tradeName,
        legalForm: formData.legalForm,
        status: formData.status,
        notes: formData.notes || undefined,
      };

      // Only include clientId if user is admin
      if (user?.role !== 'CLIENT') {
        payload.clientId = formData.clientId;
      }

      await api.put(`/company-formation/${id}`, payload);
      navigate('/admin/company-formation');
    } catch (error) {
      console.error('Error updating company formation:', error);
      alert(error.response?.data?.message || 'Failed to update company formation');
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
          onClick={() => navigate('/admin/company-formation')}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Edit Company Formation Request</h1>
      </div>

      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {user?.role !== 'CLIENT' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client <span className="text-red-500">*</span>
              </label>
              <select
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName} ({client.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trade Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tradeName"
              value={formData.tradeName}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Legal Form <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="legalForm"
              value={formData.legalForm}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {(user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="DRAFT">Draft</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="input"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Request'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/company-formation')}
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

export default EditCompanyFormationPage;

