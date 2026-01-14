import { useState, useEffect } from 'react';
import api from '../../config/api.js';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { FiBookOpen, FiUsers, FiAward, FiEdit, FiEye } from 'react-icons/fi';

const TrainingPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('programs'); // 'programs', 'assignments', 'evaluations'
  const [programs, setPrograms] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'programs') {
      fetchPrograms();
    } else if (activeTab === 'assignments') {
      fetchAssignments();
    } else {
      fetchEvaluations();
    }
  }, [activeTab]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await api.get('/training/programs');
      const data = response.data?.data?.data || response.data?.data || [];
      setPrograms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/training/assignments');
      const data = response.data?.data?.data || response.data?.data || [];
      setAssignments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvaluations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/training/evaluations');
      const data = response.data?.data?.data || response.data?.data || [];
      setEvaluations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching evaluations:', error);
      setEvaluations([]);
    } finally {
      setLoading(false);
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
  const isLawyer = user?.role === 'LAWYER';

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
        <h1 className="text-3xl font-bold">Training Management</h1>
        {isAdmin && activeTab === 'programs' && (
          <Link to="/admin/training/programs/new" className="btn btn-primary flex items-center gap-2">
            <FiBookOpen />
            <span>New Program</span>
          </Link>
        )}
        {(isAdmin || isLawyer) && activeTab === 'assignments' && (
          <Link to="/admin/training/assignments/new" className="btn btn-primary flex items-center gap-2">
            <FiUsers />
            <span>New Assignment</span>
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('programs')}
            className={`${
              activeTab === 'programs'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <FiBookOpen />
            Programs
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`${
              activeTab === 'assignments'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <FiUsers />
            Assignments
          </button>
          <button
            onClick={() => setActiveTab('evaluations')}
            className={`${
              activeTab === 'evaluations'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <FiAward />
            Evaluations
          </button>
        </nav>
      </div>

      {/* Programs Tab */}
      {activeTab === 'programs' && (
        <div className="card">
          {programs.length === 0 ? (
            <div className="text-center py-12">
              <FiBookOpen className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500">No training programs found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                  {program.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{program.description}</p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Start: {formatDate(program.startDate)}</span>
                    {program.isActive ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Inactive</span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      to={`/admin/training/programs/${program.id}`}
                      className="flex-1 text-center btn btn-primary text-sm flex items-center justify-center gap-1"
                    >
                      <FiEye />
                      View
                    </Link>
                    {isAdmin && (
                      <Link
                        to={`/admin/training/programs/${program.id}/edit`}
                        className="flex-1 text-center btn btn-secondary text-sm flex items-center justify-center gap-1"
                      >
                        <FiEdit />
                        Edit
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div className="card">
          {assignments.length === 0 ? (
            <div className="text-center py-12">
              <FiUsers className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500">No assignments found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trainee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supervisor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {assignment.program?.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assignment.trainee?.firstName} {assignment.trainee?.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assignment.lawyer?.firstName} {assignment.lawyer?.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {assignment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/training/assignments/${assignment.id}`}
                            className="text-info-600 hover:text-info-900 flex items-center gap-1"
                            title="View"
                          >
                            <FiEye />
                          </Link>
                          {(isAdmin || isLawyer) && (
                            <Link
                              to={`/admin/training/assignments/${assignment.id}/edit`}
                              className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                              title="Edit"
                            >
                              <FiEdit />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Evaluations Tab */}
      {activeTab === 'evaluations' && (
        <div className="card">
          {evaluations.length === 0 ? (
            <div className="text-center py-12">
              <FiAward className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500">No evaluations found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trainee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Evaluator
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {evaluations.map((evaluation) => (
                    <tr key={evaluation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {evaluation.trainee?.firstName} {evaluation.trainee?.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {evaluation.evaluator?.firstName} {evaluation.evaluator?.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                          {evaluation.score}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(evaluation.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/training/evaluations/${evaluation.id}`}
                            className="text-info-600 hover:text-info-900 flex items-center gap-1"
                            title="View"
                          >
                            <FiEye />
                          </Link>
                          {(isAdmin || isLawyer) && (
                            <Link
                              to={`/admin/training/evaluations/${evaluation.id}/edit`}
                              className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                              title="Edit"
                            >
                              <FiEdit />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrainingPage;
