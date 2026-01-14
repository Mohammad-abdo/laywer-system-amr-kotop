import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft } from 'react-icons/fi';

const CreateCasePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    type: 'CIVIL',
    status: 'PENDING',
    description: '',
    court: '',
    courtNumber: '',
    clientId: '',
    lawyerId: '',
    traineeId: '',
    startDate: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const [clientsRes, lawyersRes, traineesRes] = await Promise.all([
        api.get('/users?role=CLIENT'),
        api.get('/users?role=LAWYER'),
        api.get('/users?role=TRAINEE'),
      ]);
      setClients(clientsRes.data?.data?.data || []);
      setLawyers(lawyersRes.data?.data?.data || []);
      setTrainees(traineesRes.data?.data?.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
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
        title: formData.title,
        type: formData.type,
        status: formData.status,
        description: formData.description || undefined,
        court: formData.court || undefined,
        courtNumber: formData.courtNumber || undefined,
        clientId: formData.clientId,
        lawyerId: formData.lawyerId,
        traineeId: formData.traineeId || undefined,
        startDate: formData.startDate || undefined,
      };

      await api.post('/cases', payload);
      navigate('/admin/cases');
    } catch (error) {
      console.error('Error creating case:', error);
      alert(error.response?.data?.message || 'Failed to create case');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/cases')}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Create New Case</h1>
      </div>

      <div className="card max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter case title"
              />
            </div>

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
                <option value="CIVIL">Civil</option>
                <option value="CRIMINAL">Criminal</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="LABOR">Labor</option>
                <option value="FAMILY">Family</option>
                <option value="ADMINISTRATIVE">Administrative</option>
                <option value="CONSTITUTIONAL">Constitutional</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <option value="IN_PROGRESS">In Progress</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="CLOSED">Closed</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client <span className="text-red-500">*</span>
              </label>
              <select
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName} ({client.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lawyer <span className="text-red-500">*</span>
              </label>
              <select
                name="lawyerId"
                value={formData.lawyerId}
                onChange={handleChange}
                required
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trainee (Optional)
            </label>
            <select
              name="traineeId"
              value={formData.traineeId}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select a trainee</option>
              {trainees.map((trainee) => (
                <option key={trainee.id} value={trainee.id}>
                  {trainee.firstName} {trainee.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Court
              </label>
              <input
                type="text"
                name="court"
                value={formData.court}
                onChange={handleChange}
                className="input"
                placeholder="Enter court name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Court Number
              </label>
              <input
                type="text"
                name="courtNumber"
                value={formData.courtNumber}
                onChange={handleChange}
                className="input"
                placeholder="Enter court number"
              />
            </div>
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
              placeholder="Enter case description"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Creating...' : 'Create Case'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/cases')}
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

export default CreateCasePage;

