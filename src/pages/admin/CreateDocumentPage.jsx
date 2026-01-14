import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';

const CreateDocumentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    type: '',
    category: '',
    description: '',
    caseId: '',
    consultationId: '',
    companyFormationId: '',
    isPublic: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setSelectedFile(files[0]);
      setFormData((prev) => ({
        ...prev,
        file: files[0],
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedFile) {
      alert('Please select a file to upload');
      setLoading(false);
      return;
    }

    try {
      const uploadData = new FormData();
      uploadData.append('file', selectedFile);
      uploadData.append('type', formData.type);
      if (formData.category) uploadData.append('category', formData.category);
      if (formData.description) uploadData.append('description', formData.description);
      if (formData.caseId) uploadData.append('caseId', formData.caseId);
      if (formData.consultationId) uploadData.append('consultationId', formData.consultationId);
      if (formData.companyFormationId) uploadData.append('companyFormationId', formData.companyFormationId);
      uploadData.append('isPublic', formData.isPublic);

      await api.post('/documents/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin/documents');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert(error.response?.data?.message || 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/documents')}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Upload Document</h1>
      </div>

      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-primary-500 transition-colors">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file"
                      type="file"
                      className="sr-only"
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                {selectedFile && (
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Type</option>
              <option value="CASE_DOCUMENT">Case Document</option>
              <option value="CONSULTATION_DOCUMENT">Consultation Document</option>
              <option value="CONTRACT">Contract</option>
              <option value="LEGAL_OPINION">Legal Opinion</option>
              <option value="CORRESPONDENCE">Correspondence</option>
              <option value="REPORT">Report</option>
              <option value="COMPANY_FORMATION_DOC">Company Formation Document</option>
              <option value="ARCHIVE_DOCUMENT">Archive Document</option>
              <option value="HR_DOCUMENT">HR Document</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
              placeholder="e.g., Contracts, Reports"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input"
              placeholder="Document description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Case ID</label>
              <input
                type="text"
                name="caseId"
                value={formData.caseId}
                onChange={handleChange}
                className="input"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation ID
              </label>
              <input
                type="text"
                name="consultationId"
                value={formData.consultationId}
                onChange={handleChange}
                className="input"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Formation ID
              </label>
              <input
                type="text"
                name="companyFormationId"
                value={formData.companyFormationId}
                onChange={handleChange}
                className="input"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="isPublic"
              name="isPublic"
              type="checkbox"
              checked={formData.isPublic}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="mr-2 block text-sm text-gray-900">
              Make document public
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Document'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/documents')}
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

export default CreateDocumentPage;

