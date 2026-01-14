import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft } from 'react-icons/fi';

const EditAssignmentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [formData, setFormData] = useState({
    programId: '',
    traineeId: '',
    lawyerId: '',
    status: 'ASSIGNED',
    notes: '',
  });

  useEffect(() => {
    fetchAssignment();
    fetchOptions();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/training/assignments/${id}`);
      const assignment = response.data?.data;

      if (assignment) {
        setFormData({
          programId: assignment.programId || '',
          traineeId: assignment.traineeId || '',
          lawyerId: assignment.lawyerId || '',
          status: assignment.status || 'ASSIGNED',
          notes: assignment.notes || '',
        });
      }
    } catch (error) {
      console.error('Error fetching assignment:', error);
      alert('Failed to load training assignment');
      navigate('/admin/training');
    } finally {
      setFetching(false);
    }
  };

  const fetchOptions = async () => {
    try {
      const [programsRes, traineesRes, lawyersRes] = await Promise.all([
        api.get('/training/programs'),
        api.get('/users?role=TRAINEE'),
        api.get('/users?role=LAWYER'),
      ]);
      setPrograms(programsRes.data?.data?.data || programsRes.data?.data || []);
      setTrainees(traineesRes.data?.data?.data || []);
      setLawyers(lawyersRes.data?.data?.data || []);
    } catch (error) {
      console.error('Error fetching options:', error);
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
        programId: formData.programId,
        traineeId: formData.traineeId,
        lawyerId: formData.lawyerId,
        status: formData.status,
        notes: formData.notes || undefined,
      };

      await api.put(`/training/assignments/${id}`, payload);
      navigate('/admin/training');
    } catch (error) {
      console.error('Error updating assignment:', error);
      alert(error.response?.data?.message || 'Failed to update training assignment');
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
        <h1 className="text-3xl font-bold">Edit Training Assignment</h1>
      </div>

      <div className="card max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Program <span className="text-red-500">*</span>
              </label>
              <select
                name="programId"
                value={formData.programId}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select a program</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.title}
                  </option>
                ))}
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
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Supervisor (Lawyer) <span className="text-red-500">*</span>
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
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="input resize-none"
              placeholder="Enter assignment notes"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Updating...' : 'Update Assignment'}
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

export default EditAssignmentPage;



