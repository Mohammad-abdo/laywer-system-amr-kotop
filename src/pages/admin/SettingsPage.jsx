import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import api from '../../config/api.js';
import { FiLock, FiGlobe, FiBell } from 'react-icons/fi';

const SettingsPage = () => {
  const { user } = useAuth();
  const { language, changeLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [settings, setSettings] = useState({
    language: language,
    emailNotifications: true,
    pushNotifications: true,
  });

  useEffect(() => {
    // Load user settings if available
    setSettings((prev) => ({ ...prev, language }));
  }, [language]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    try {
      setLoading(true);
      // First verify current password by attempting login
      try {
        await api.post('/auth/login', {
          email: user?.email,
          password: passwordForm.currentPassword,
        });
      } catch (loginError) {
        alert('Current password is incorrect');
        setLoading(false);
        return;
      }
      
      // If current password is correct, update password
      await api.put(`/users/${user?.id}`, {
        password: passwordForm.newPassword,
      });
      
      alert('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    changeLanguage(newLanguage);
    setSettings((prev) => ({ ...prev, language: newLanguage }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Password Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <FiLock className="text-primary-600 text-xl" />
            <h2 className="text-xl font-semibold">Change Password</h2>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="input"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="input"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="input"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>

        {/* Language Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <FiGlobe className="text-primary-600 text-xl" />
            <h2 className="text-xl font-semibold">Language & Region</h2>
          </div>
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                name="language"
                value={settings.language}
                onChange={handleLanguageChange}
                className="input"
              >
                <option value="ar">العربية (Arabic)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <FiBell className="text-primary-600 text-xl" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive email notifications for important updates
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleSettingsChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Push Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive push notifications in your browser
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={settings.pushNotifications}
                  onChange={handleSettingsChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

