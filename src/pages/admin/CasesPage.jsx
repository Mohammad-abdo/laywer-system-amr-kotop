import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../config/api.js';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext.jsx';

const CasesPage = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchCases();
  }, [filters.status, filters.type, filters.page]);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.type) params.append('type', filters.type);
      params.append('page', filters.page);
      params.append('limit', filters.limit);

      const response = await api.get(`/cases?${params.toString()}`);
      const data = response.data?.data?.data || [];
      const pag = response.data?.data?.pagination || pagination;

      setCases(Array.isArray(data) ? data : []);
      setPagination(pag);
    } catch (error) {
      console.error('Error fetching cases:', error);
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      ON_HOLD: 'bg-gray-100 text-gray-800',
      CLOSED: 'bg-green-100 text-green-800',
      ARCHIVED: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      CIVIL: 'bg-blue-50 text-blue-700',
      CRIMINAL: 'bg-red-50 text-red-700',
      COMMERCIAL: 'bg-green-50 text-green-700',
      LABOR: 'bg-yellow-50 text-yellow-700',
      FAMILY: 'bg-pink-50 text-pink-700',
      ADMINISTRATIVE: 'bg-purple-50 text-purple-700',
      CONSTITUTIONAL: 'bg-indigo-50 text-indigo-700',
      OTHER: 'bg-gray-50 text-gray-700',
    };
    return colors[type] || 'bg-gray-50 text-gray-700';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = async (caseId) => {
    if (!window.confirm('Are you sure you want to delete this case?')) {
      return;
    }

    try {
      await api.delete(`/cases/${caseId}`);
      fetchCases();
    } catch (error) {
      console.error('Error deleting case:', error);
      alert('Failed to delete case');
    }
  };

  const canEdit = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN' || user?.role === 'LAWYER';
  const canDelete = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';

  if (loading && cases.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cases</h1>
        <Link to="/admin/cases/new" className="btn btn-primary">
          + New Case
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="input"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CLOSED">Closed</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="input"
            >
              <option value="">All Types</option>
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
      </div>

      {/* Cases Table */}
      <div className="card">
        {cases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No cases found</p>
            <Link to="/admin/cases/new" className="btn btn-primary">
              Create Your First Case
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Case Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lawyer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cases.map((caseItem) => (
                    <tr key={caseItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {caseItem.caseNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{caseItem.title}</div>
                        {caseItem.description && (
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {caseItem.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeColor(
                            caseItem.type
                          )}`}
                        >
                          {caseItem.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                            caseItem.status
                          )}`}
                        >
                          {caseItem.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {caseItem.client?.firstName} {caseItem.client?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{caseItem.client?.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {caseItem.lawyer?.firstName} {caseItem.lawyer?.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(caseItem.startDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/cases/${caseItem.id}`}
                            className="text-info-600 hover:text-info-900 flex items-center gap-1"
                            title="View"
                          >
                            <FiEye />
                          </Link>
                          {canEdit && (
                            <Link
                              to={`/admin/cases/${caseItem.id}/edit`}
                              className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                              title="Edit"
                            >
                              <FiEdit />
                            </Link>
                          )}
                          {canDelete && (
                            <button
                              onClick={() => handleDelete(caseItem.id)}
                              className="text-red-600 hover:text-red-900 flex items-center gap-1"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="btn btn-secondary disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="btn btn-secondary disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{pagination.page}</span> of{' '}
                      <span className="font-medium">{pagination.totalPages}</span> pages
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                        (pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pagination.page === pageNum
                                ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      )}
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CasesPage;
