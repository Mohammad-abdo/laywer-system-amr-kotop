import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiTrash2 } from 'react-icons/fi';

const ViewTaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data?.data || null);
    } catch (error) {
      console.error('Error fetching task:', error);
      alert('Failed to load task');
      navigate('/admin/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await api.delete(`/tasks/${id}`);
      navigate('/admin/tasks');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadgeColor = (priority) => {
    const colors = {
      LOW: 'bg-gray-100 text-gray-800',
      MEDIUM: 'bg-blue-100 text-blue-800',
      HIGH: 'bg-orange-100 text-orange-800',
      URGENT: 'bg-red-100 text-red-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
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

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Task not found</p>
        <Link to="/admin/tasks" className="btn btn-primary mt-4">
          Back to Tasks
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/tasks')}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Task Details</h1>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/admin/tasks/${id}/edit`}
            className="btn btn-primary flex items-center gap-2"
          >
            <FiEdit />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-secondary flex items-center gap-2 text-red-600 hover:bg-red-50"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
              {task.description && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Task Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                      task.status
                    )}`}
                  >
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Priority</label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadgeColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Assigned To</label>
                <p className="mt-1 text-gray-900">
                  {task.user?.firstName} {task.user?.lastName}
                </p>
                {task.user?.email && (
                  <p className="text-sm text-gray-500">{task.user.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Due Date</label>
                <p className="mt-1 text-gray-900">{formatDate(task.dueDate)}</p>
              </div>

              {task.completedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Completed At</label>
                  <p className="mt-1 text-gray-900">{formatDate(task.completedAt)}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="mt-1 text-gray-900">{formatDate(task.createdAt)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Updated At</label>
                <p className="mt-1 text-gray-900">{formatDate(task.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskPage;

