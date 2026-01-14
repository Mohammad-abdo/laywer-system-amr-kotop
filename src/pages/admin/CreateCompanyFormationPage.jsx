import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';

const CreateCompanyFormationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: user?.role === 'CLIENT' ? user?.id : '',
    tradeName: '',
    legalForm: '',
    notes: '',
  });

  useEffect(() => {
    if (user?.role !== 'CLIENT') {
      fetchClients();
    }
  }, [user]);

  const fetchClients = async () => {
    try {
      const response = await api.get('/users?role=CLIENT&limit=100');
      const data = response.data?.data?.data || [];
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching clients:', error);
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
        clientId: formData.clientId,
        tradeName: formData.tradeName,
        legalForm: formData.legalForm,
        notes: formData.notes || undefined,
      };

      await api.post('/company-formation', payload);
      navigate('/admin/company-formation');
    } catch (error) {
      console.error('Error creating company formation:', error);
      alert(error.response?.data?.message || 'Failed to create company formation request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/company-formation')}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Create New Company Formation Request</h1>
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
              placeholder="e.g., شركة ذات مسؤولية محدودة"
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="input"
              placeholder="Additional notes or requirements..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Request'}
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

export default CreateCompanyFormationPage;

