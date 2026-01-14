import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiArrowLeft, FiDownload, FiTrash2, FiEdit } from 'react-icons/fi';

const ViewDocumentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/documents/${id}`);
      setDocumentData(response.data?.data || null);
    } catch (error) {
      console.error('Error fetching document:', error);
      alert('Failed to load document');
      navigate('/admin/documents');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      await api.delete(`/documents/${id}`);
      navigate('/admin/documents');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get(`/documents/${id}/download`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const linkElement = document.createElement('a');
      linkElement.href = url;
      linkElement.setAttribute('download', documentData?.originalName || documentData?.name || 'document');
      window.document.body.appendChild(linkElement);
      linkElement.click();
      linkElement.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Failed to download document');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '-';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
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

  if (!documentData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Document not found</p>
        <Link to="/admin/documents" className="btn btn-primary mt-4">
          Back to Documents
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/documents')}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Document Details</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="btn btn-primary flex items-center gap-2"
          >
            <FiDownload />
            Download
          </button>
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
              <h2 className="text-2xl font-bold mb-2">{documentData.originalName || documentData.name}</h2>
              {documentData.description && (
                <p className="text-gray-600 mt-2">{documentData.description}</p>
              )}
            </div>

            {/* Document Preview Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <p className="text-gray-500">Document preview not available</p>
              <p className="text-sm text-gray-400 mt-2">
                Download the file to view its contents
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Document Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <p className="mt-1 text-gray-900">{documentData.type?.replace('_', ' ')}</p>
              </div>

              {documentData.category && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="mt-1 text-gray-900">{documentData.category}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">File Name</label>
                <p className="mt-1 text-gray-900 break-words">{documentData.originalName || documentData.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">File Size</label>
                <p className="mt-1 text-gray-900">{formatFileSize(documentData.size)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">MIME Type</label>
                <p className="mt-1 text-gray-900">{documentData.mimeType}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Version</label>
                <p className="mt-1 text-gray-900">{documentData.version}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Public Access</label>
                <p className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      documentData.isPublic
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {documentData.isPublic ? 'Public' : 'Private'}
                  </span>
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Uploaded By</label>
                <p className="mt-1 text-gray-900">
                  {documentData.uploadedBy?.firstName} {documentData.uploadedBy?.lastName}
                </p>
                {documentData.uploadedBy?.email && (
                  <p className="text-sm text-gray-500">{documentData.uploadedBy.email}</p>
                )}
              </div>

              {documentData.case && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Related Case</label>
                  <p className="mt-1 text-gray-900">{documentData.case.title}</p>
                </div>
              )}

              {documentData.consultation && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Related Consultation</label>
                  <p className="mt-1 text-gray-900">{documentData.consultation.subject}</p>
                </div>
              )}

              {documentData.companyFormation && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Related Company Formation
                  </label>
                  <p className="mt-1 text-gray-900">{documentData.companyFormation.tradeName}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="mt-1 text-gray-900">{formatDate(documentData.createdAt)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Updated At</label>
                <p className="mt-1 text-gray-900">{formatDate(documentData.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentPage;

