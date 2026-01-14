import { useState, useEffect } from 'react';
import api from '../../config/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';

const TranslationsPage = () => {
  const { user } = useAuth();
  const [translations, setTranslations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState(null);
  const [formData, setFormData] = useState({
    key: '',
    language: 'ar',
    value: '',
    category: ''
  });
  const [filters, setFilters] = useState({
    language: '',
    category: '',
    search: ''
  });

  useEffect(() => {
    fetchTranslations();
    fetchCategories();
  }, [filters]);

  const fetchTranslations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.language) params.append('language', filters.language);
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/translations?${params.toString()}`);
      const data = response.data?.data;
      // Ensure translations is always an array
      setTranslations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching translations:', error);
      setTranslations([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/translations/categories');
      const data = response.data?.data;
      // Ensure categories is always an array
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]); // Set empty array on error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTranslation) {
        await api.put(`/translations/key/${formData.key}?language=${formData.language}`, {
          value: formData.value,
          category: formData.category
        });
      } else {
        await api.post('/translations', formData);
      }
      setShowModal(false);
      setEditingTranslation(null);
      setFormData({ key: '', language: 'ar', value: '', category: '' });
      fetchTranslations();
    } catch (error) {
      console.error('Error saving translation:', error);
      alert('Error saving translation');
    }
  };

  const handleEdit = (translation) => {
    setEditingTranslation(translation);
    setFormData({
      key: translation.key,
      language: translation.language,
      value: translation.value,
      category: translation.category || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (key, language) => {
    if (!confirm('Are you sure you want to delete this translation?')) return;

    try {
      await api.delete(`/translations/key/${key}?language=${language}`);
      fetchTranslations();
    } catch (error) {
      console.error('Error deleting translation:', error);
      alert('Error deleting translation');
    }
  };

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Translations</h1>
        {isAdmin && (
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            + New Translation
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className="input"
            >
              <option value="">All Languages</option>
              <option value="ar">Arabic</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="input"
            >
              <option value="">All Categories</option>
              {Array.isArray(categories) && categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
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
              placeholder="Search translations..."
            />
          </div>
        </div>
      </div>

      {/* Translations Table */}
      <div className="card">
        {!Array.isArray(translations) || translations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No translations found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  {isAdmin && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {translations.map((translation) => (
                  <tr key={`${translation.key}-${translation.language}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {translation.key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {translation.language.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{translation.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {translation.category || '-'}
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(translation)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(translation.key, translation.language)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">
              {editingTranslation ? 'Edit Translation' : 'New Translation'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key</label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  required
                  disabled={!!editingTranslation}
                  className="input"
                  placeholder="translation.key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  required
                  disabled={!!editingTranslation}
                  className="input"
                >
                  <option value="ar">Arabic</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                <textarea
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                  rows="3"
                  className="input"
                  placeholder="Translation value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                  placeholder="Category (optional)"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTranslation(null);
                    setFormData({ key: '', language: 'ar', value: '', category: '' });
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTranslation ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationsPage;

