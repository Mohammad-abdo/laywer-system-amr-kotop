import { useState, useEffect } from 'react';
import api from '../../config/api.js';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { FiArchive, FiFolder, FiFileText, FiPlus, FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

const ArchivingPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('archives'); // 'archives' or 'categories'
  const [archives, setArchives] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categoryId: '',
    search: '',
  });

  useEffect(() => {
    if (activeTab === 'archives') {
      fetchArchives();
    } else {
      fetchCategories();
    }
  }, [activeTab, filters]);

  const fetchArchives = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.categoryId) params.append('categoryId', filters.categoryId);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/archiving?${params.toString()}`);
      const data = response.data?.data?.data || response.data?.data || [];
      setArchives(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching archives:', error);
      setArchives([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/archiving/categories');
      const data = response.data?.data || [];
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }

    try {
      if (type === 'archive') {
        await api.delete(`/archiving/${id}`);
        fetchArchives();
      } else {
        await api.delete(`/archiving/categories/${id}`);
        fetchCategories();
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type}`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';

  if (loading && (activeTab === 'archives' ? archives.length === 0 : categories.length === 0)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Electronic Archiving</h1>
        {isAdmin && activeTab === 'categories' && (
          <Link to="/admin/archiving/categories/new" className="btn btn-primary flex items-center gap-2">
            <FiPlus />
            <span>New Category</span>
          </Link>
        )}
        {activeTab === 'archives' && (
          <Link to="/admin/archiving/new" className="btn btn-primary flex items-center gap-2">
            <FiPlus />
            <span>New Archive</span>
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('archives')}
            className={`${
              activeTab === 'archives'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <FiFileText />
            Archives
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveTab('categories')}
              className={`${
                activeTab === 'categories'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
            >
              <FiFolder />
              Categories
            </button>
          )}
        </nav>
      </div>

      {/* Archives Tab */}
      {activeTab === 'archives' && (
        <>
          {/* Filters */}
          <div className="card mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.categoryId}
                  onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
                  className="input"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="input"
                  placeholder="Search by title or keywords..."
                />
              </div>
            </div>
          </div>

          <div className="card">
            {archives.length === 0 ? (
              <div className="text-center py-12">
                <FiArchive className="mx-auto text-4xl text-gray-300 mb-3" />
                <p className="text-gray-500">No archives found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Access Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {archives.map((archive) => (
                      <tr key={archive.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{archive.title}</div>
                          {archive.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">{archive.description}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {archive.category?.name || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              archive.accessLevel === 'PUBLIC'
                                ? 'bg-green-100 text-green-800'
                                : archive.accessLevel === 'INTERNAL'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {archive.accessLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(archive.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-3">
                            <Link
                              to={`/admin/archiving/${archive.id}`}
                              className="text-info-600 hover:text-info-900 flex items-center gap-1"
                              title="View"
                            >
                              <FiEye />
                            </Link>
                            <Link
                              to={`/admin/archiving/${archive.id}/edit`}
                              className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                              title="Edit"
                            >
                              <FiEdit />
                            </Link>
                            <button
                              onClick={() => handleDelete(archive.id, 'archive')}
                              className="text-red-600 hover:text-red-900 flex items-center gap-1"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && isAdmin && (
        <div className="card">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <FiFolder className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500">No categories found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
                      {category.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      to={`/admin/archiving/categories/${category.id}`}
                      className="flex-1 text-center btn btn-primary text-sm flex items-center justify-center gap-1"
                    >
                      <FiEye />
                      View
                    </Link>
                    <Link
                      to={`/admin/archiving/categories/${category.id}/edit`}
                      className="flex-1 text-center btn btn-secondary text-sm flex items-center justify-center gap-1"
                    >
                      <FiEdit />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id, 'category')}
                      className="px-3 py-2 text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArchivingPage;
