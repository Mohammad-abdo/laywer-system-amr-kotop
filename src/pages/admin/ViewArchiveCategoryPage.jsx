import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiEdit, FiTrash2, FiFolder } from 'react-icons/fi';

const ViewArchiveCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/archiving/categories/${id}`);
      setCategoryData(response.data?.data || null);
    } catch (error) {
      console.error('Error fetching category:', error);
      alert('Failed to load category');
      navigate('/admin/archiving');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await api.delete(`/archiving/categories/${id}`);
      navigate('/admin/archiving');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert(error.response?.data?.message || 'Failed to delete category');
    }
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

  if (!categoryData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Category not found</p>
        <Link to="/admin/archiving" className="btn btn-primary">
          Back to Categories
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
          <h1 className="text-3xl font-bold">Category Details</h1>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/admin/archiving/categories/${id}/edit`}
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
              <div className="flex items-center gap-3 mb-2">
                <FiFolder className="text-primary-600 text-2xl" />
                <h2 className="text-2xl font-bold">{categoryData.name}</h2>
              </div>
              {categoryData.description && (
                <p className="text-gray-600 mt-2 whitespace-pre-wrap">{categoryData.description}</p>
              )}
            </div>

            {categoryData.parent && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Parent Category</h3>
                <Link
                  to={`/admin/archiving/categories/${categoryData.parent.id}`}
                  className="text-info-600 hover:text-info-900 flex items-center gap-2"
                >
                  <FiFolder />
                  {categoryData.parent.name}
                </Link>
              </div>
            )}

            {categoryData.children && categoryData.children.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Subcategories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryData.children.map((child) => (
                    <Link
                      key={child.id}
                      to={`/admin/archiving/categories/${child.id}`}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FiFolder className="text-primary-600" />
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {categoryData.archives && categoryData.archives.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Archives ({categoryData.archives.length})
                </h3>
                <div className="text-sm text-gray-600">
                  This category contains {categoryData.archives.length} archive(s)
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Category Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="mt-1 text-gray-900">{categoryData.name}</p>
              </div>

              {categoryData.parent && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Parent Category</label>
                  <p className="mt-1 text-gray-900">{categoryData.parent.name}</p>
                </div>
              )}

              {categoryData.children && categoryData.children.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Subcategories</label>
                  <p className="mt-1 text-gray-900">{categoryData.children.length}</p>
                </div>
              )}

              {categoryData.archives && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Archives Count</label>
                  <p className="mt-1 text-gray-900">{categoryData.archives.length}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="mt-1 text-gray-900">{formatDate(categoryData.createdAt)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Updated At</label>
                <p className="mt-1 text-gray-900">{formatDate(categoryData.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewArchiveCategoryPage;

