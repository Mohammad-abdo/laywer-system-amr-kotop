import { useState, useEffect } from 'react';
import api from '../../config/api.js';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
// AccountType enum (matching backend)
const AccountType = {
  ASSET: 'ASSET',
  LIABILITY: 'LIABILITY',
  EQUITY: 'EQUITY',
  REVENUE: 'REVENUE',
  EXPENSE: 'EXPENSE',
};
import { FiDollarSign, FiBarChart2, FiFileText, FiTrendingUp, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const AccountingPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('accounts'); // 'accounts', 'journal', 'reports', 'budgets'
  const [accounts, setAccounts] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'accounts') {
      fetchAccounts();
    } else if (activeTab === 'journal') {
      fetchJournalEntries();
    } else if (activeTab === 'budgets') {
      fetchBudgets();
    }
  }, [activeTab]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/accounting/accounts');
      const data = response.data?.data || [];
      setAccounts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchJournalEntries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/accounting/journal-entries');
      const data = response.data?.data?.data || response.data?.data || [];
      setJournalEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      setJournalEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await api.get('/accounting/budgets');
      const data = response.data?.data?.data || response.data?.data || [];
      setBudgets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching budgets:', error);
      setBudgets([]);
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

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleDeleteJournal = async (journalId) => {
    if (!window.confirm('Are you sure you want to delete this journal entry?')) {
      return;
    }

    try {
      await api.delete(`/accounting/journal-entries/${journalId}`);
      fetchJournalEntries();
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      alert('Failed to delete journal entry');
    }
  };

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';
  const canEditAccounts = isAdmin;
  const canEditJournal = isAdmin;
  const canDeleteJournal = isAdmin;
  const canEditBudgets = isAdmin;

  if (loading && (activeTab === 'accounts' ? accounts.length === 0 : activeTab === 'journal' ? journalEntries.length === 0 : budgets.length === 0)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Accounting</h1>
        {isAdmin && (
          <>
            {activeTab === 'accounts' && (
              <Link to="/admin/accounting/accounts/new" className="btn btn-primary flex items-center gap-2">
                <FiDollarSign />
                <span>New Account</span>
              </Link>
            )}
            {activeTab === 'journal' && (
              <Link to="/admin/accounting/journal/new" className="btn btn-primary flex items-center gap-2">
                <FiFileText />
                <span>New Journal Entry</span>
              </Link>
            )}
            {activeTab === 'budgets' && (
              <Link to="/admin/accounting/budgets/new" className="btn btn-primary flex items-center gap-2">
                <FiTrendingUp />
                <span>New Budget</span>
              </Link>
            )}
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`${
              activeTab === 'accounts'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <FiDollarSign />
            Chart of Accounts
          </button>
          {isAdmin && (
            <>
              <button
                onClick={() => setActiveTab('journal')}
                className={`${
                  activeTab === 'journal'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <FiFileText />
                Journal Entries
              </button>
              <button
                onClick={() => setActiveTab('budgets')}
                className={`${
                  activeTab === 'budgets'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <FiTrendingUp />
                Budgets
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`${
                  activeTab === 'reports'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <FiBarChart2 />
                Reports
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Accounts Tab */}
      {activeTab === 'accounts' && (
        <div className="card">
          {accounts.length === 0 ? (
            <div className="text-center py-12">
              <FiDollarSign className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500">No accounts found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance
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
                  {accounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {account.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {account.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(account.balance || 0)} EGP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {account.isActive ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/accounting/accounts/${account.id}`}
                            className="text-info-600 hover:text-info-900 flex items-center gap-1"
                            title="View"
                          >
                            <FiEye />
                          </Link>
                          {canEditAccounts && (
                            <Link
                              to={`/admin/accounting/accounts/${account.id}/edit`}
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

      {/* Journal Entries Tab */}
      {activeTab === 'journal' && isAdmin && (
        <div className="card">
          {journalEntries.length === 0 ? (
            <div className="text-center py-12">
              <FiFileText className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500">No journal entries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entry Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Currency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {journalEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entry.entryNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(entry.date)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {entry.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.currency}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/admin/accounting/journal/${entry.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Budgets Tab */}
      {activeTab === 'budgets' && isAdmin && (
        <div className="card">
          {budgets.length === 0 ? (
            <div className="text-center py-12">
              <FiTrendingUp className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500">No budgets found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {budgets.map((budget) => (
                    <tr key={budget.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {budget.account?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{budget.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(budget.amount)} EGP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/accounting/budgets/${budget.id}`}
                            className="text-info-600 hover:text-info-900 flex items-center gap-1"
                            title="View"
                          >
                            <FiEye />
                          </Link>
                          {canEditBudgets && (
                            <Link
                              to={`/admin/accounting/budgets/${budget.id}/edit`}
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

      {/* Reports Tab */}
      {activeTab === 'reports' && isAdmin && (
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/admin/accounting/reports/trial-balance"
              className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <FiBarChart2 className="mx-auto text-4xl text-amber-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trial Balance</h3>
              <p className="text-sm text-gray-500">View trial balance report</p>
            </Link>
            <Link
              to="/admin/accounting/reports/income-statement"
              className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <FiTrendingUp className="mx-auto text-4xl text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Income Statement</h3>
              <p className="text-sm text-gray-500">View income statement</p>
            </Link>
            <Link
              to="/admin/accounting/reports/balance-sheet"
              className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <FiFileText className="mx-auto text-4xl text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Balance Sheet</h3>
              <p className="text-sm text-gray-500">View balance sheet</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountingPage;
