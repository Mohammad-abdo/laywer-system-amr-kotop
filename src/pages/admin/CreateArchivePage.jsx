import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft } from 'react-icons/fi';

const CreateArchivePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    documentId: '',
    keywords: '',
    accessLevel: 'PRIVATE',
  });

  useEffect(() => {
    fetchCategories();
    fetchDocuments();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/archiving/categories');
      setCategories(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/documents?limit=1000');
      const data = response.data?.data?.data || response.data?.data || [];
      setDocuments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching documents:', error);
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
      await api.post('/archiving', formData);
      navigate('/admin/archiving');
    } catch (error) {
      console.error('Error creating archive:', error);
      alert(error.response?.data?.message || 'Failed to create archive');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/archiving')}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Create New Archive</h1>
      </div>

      <div className="card max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document <span className="text-red-500">*</span>
              </label>
              <select
                name="documentId"
                value={formData.documentId}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Document</option>
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.originalName || doc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                className="input"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Level <span className="text-red-500">*</span>
              </label>
              <select
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="PRIVATE">Private</option>
                <option value="INTERNAL">Internal</option>
                <option value="PUBLIC">Public</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/archiving')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Archive'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArchivePage;

