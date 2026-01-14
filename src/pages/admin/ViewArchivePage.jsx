import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiTrash2, FiFolder } from 'react-icons/fi';

const ViewArchivePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [archiveData, setArchiveData] = useState(null);

  useEffect(() => {
    fetchArchive();
  }, [id]);

  const fetchArchive = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/archiving/${id}`);
      setArchiveData(response.data?.data || null);
    } catch (error) {
      console.error('Error fetching archive:', error);
      alert('Failed to load archive');
      navigate('/admin/archiving');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this archive?')) {
      return;
    }

    try {
      await api.delete(`/archiving/${id}`);
      navigate('/admin/archiving');
    } catch (error) {
      console.error('Error deleting archive:', error);
      alert('Failed to delete archive');
    }
  };

  const getAccessLevelBadge = (level) => {
    const colors = {
      PUBLIC: 'bg-green-100 text-green-800',
      INTERNAL: 'bg-blue-100 text-blue-800',
      PRIVATE: 'bg-gray-100 text-gray-800',
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  if (!archiveData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Archive not found</p>
        <Link to="/admin/archiving" className="btn btn-primary">
          Back to Archives
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/archiving')}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Archive Details</h1>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/admin/archiving/${id}/edit`}
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
              <h2 className="text-2xl font-bold mb-2">{archiveData.title}</h2>
              {archiveData.description && (
                <p className="text-gray-600 mt-2 whitespace-pre-wrap">{archiveData.description}</p>
              )}
            </div>

            {archiveData.keywords && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {archiveData.keywords.split(',').map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Archive Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <div className="mt-1 flex items-center gap-2">
                  <FiFolder className="text-gray-400" />
                  <p className="text-gray-900">{archiveData.category?.name || '-'}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Access Level</label>
                <p className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccessLevelBadge(
                      archiveData.accessLevel
                    )}`}
                  >
                    {archiveData.accessLevel}
                  </span>
                </p>
              </div>

              {archiveData.documentId && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Document ID</label>
                  <p className="mt-1 text-gray-900 break-words">{archiveData.documentId}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="mt-1 text-gray-900">{formatDate(archiveData.createdAt)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Updated At</label>
                <p className="mt-1 text-gray-900">{formatDate(archiveData.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewArchivePage;

