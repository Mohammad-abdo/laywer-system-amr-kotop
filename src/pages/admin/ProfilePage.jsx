import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import api from '../../config/api.js';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit } from 'react-icons/fi';

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/me');
      const data = response.data?.data || null;
      setUserData(data);
      setFormData({
        firstName: data?.firstName || '',
        lastName: data?.lastName || '',
        phone: data?.phone || '',
        email: data?.email || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
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
    try {
      await api.put(`/users/${userData.id}`, formData);
      await fetchProfile();
      setEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      SUPER_ADMIN: 'bg-purple-100 text-purple-800',
      ADMIN: 'bg-blue-100 text-blue-800',
      LAWYER: 'bg-green-100 text-green-800',
      TRAINEE: 'bg-yellow-100 text-yellow-800',
      CLIENT: 'bg-gray-100 text-gray-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <FiEdit />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiUser className="w-12 h-12 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {userData?.firstName} {userData?.lastName}
                  </h2>
                  <p className="text-gray-600">{userData?.email}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                      userData?.role
                    )}`}
                  >
                    {userData?.role?.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiUser className="inline mr-2" />
                    First Name
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userData?.firstName || '-'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiUser className="inline mr-2" />
                    Last Name
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userData?.lastName || '-'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiMail className="inline mr-2" />
                    Email
                  </label>
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userData?.email || '-'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiPhone className="inline mr-2" />
                    Phone
                  </label>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userData?.phone || '-'}</p>
                  )}
                </div>
              </div>

              {editing && (
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        firstName: userData?.firstName || '',
                        lastName: userData?.lastName || '',
                        phone: userData?.phone || '',
                        email: userData?.email || '',
                      });
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Info Card */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Role</label>
                <p className="mt-1">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                      userData?.role
                    )}`}
                  >
                    {userData?.role?.replace('_', ' ')}
                  </span>
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p className="mt-1">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      userData?.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {userData?.status}
                  </span>
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  <FiCalendar className="inline mr-2" />
                  Member Since
                </label>
                <p className="mt-1 text-gray-900">{formatDate(userData?.createdAt)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Last Login</label>
                <p className="mt-1 text-gray-900">{formatDate(userData?.lastLoginAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

