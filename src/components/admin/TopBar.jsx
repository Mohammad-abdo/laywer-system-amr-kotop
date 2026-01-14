import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiSearch, FiUser, FiLogOut, FiSettings, FiChevronDown, FiX, FiGlobe, FiExternalLink } from 'react-icons/fi';

const TopBar = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const languageMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
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

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-lg">
        <div className="relative w-full">
          <FiSearch className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} />
          <input
            type="text"
            placeholder="Search..."
            className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 transition-all`}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className={`flex items-center ${isRTL ? 'space-x-4' : 'space-x-reverse space-x-4'}`}>
        {/* Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiExternalLink className="text-lg" />
          <span className="hidden md:inline">Visit Website</span>
        </a>

        {/* Language Toggle */}
        <div className="relative" ref={languageMenuRef}>
          <button
            onClick={() => {
              setShowLanguageMenu(!showLanguageMenu);
              setShowUserMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiGlobe className="text-lg" />
            <span className="hidden md:inline text-sm font-medium">
              {language === 'ar' ? 'العربية' : 'English'}
            </span>
          </button>

          {showLanguageMenu && (
            <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in z-50`}>
              <button
                onClick={() => {
                  toggleLanguage();
                  setShowLanguageMenu(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  language === 'ar'
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>العربية</span>
                {language === 'ar' && (
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => {
                  toggleLanguage();
                  setShowLanguageMenu(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors border-t border-gray-100 ${
                  language === 'en'
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>English</span>
                {language === 'en' && (
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiBell className="text-xl" />
            <span className={`absolute top-1 ${isRTL ? 'right-1' : 'left-1'} w-2 h-2 bg-red-500 rounded-full animate-pulse`}></span>
          </button>

          {showNotifications && (
            <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in`}>
              <div className={`p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-info-50 to-gray-50 ${isRTL ? '' : 'flex-row-reverse'}`}>
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-8 text-center text-gray-500 text-sm">
                  <FiBell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No new notifications</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className={`flex items-center ${isRTL ? 'space-x-3' : 'space-x-reverse space-x-3'} px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow">
              {user?.firstName?.[0] || 'U'}
              {user?.lastName?.[0] || ''}
            </div>
            <div className={`hidden md:block ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <FiChevronDown
              className={`hidden md:block text-gray-400 transition-transform duration-200 ${
                showUserMenu ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showUserMenu && (
            <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in`}>
              {/* User Info Section */}
              <div className="p-4 bg-gradient-to-r from-primary-50 via-info-50 to-gray-50 border-b border-gray-200">
                <div className={`flex items-center ${isRTL ? 'space-x-3' : 'space-x-reverse space-x-3'}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
                    {user?.firstName?.[0] || 'U'}
                    {user?.lastName?.[0] || ''}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getRoleBadgeColor(
                        user?.role
                      )}`}
                    >
                      {user?.role?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    // Navigate to profile/settings if needed
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group ${isRTL ? '' : 'flex-row-reverse'}`}
                >
                  <FiUser className={`${isRTL ? 'mr-3' : 'ml-3'} text-gray-400 group-hover:text-primary-600 transition-colors`} />
                  <span className="group-hover:text-primary-600 transition-colors">Profile</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    // Navigate to settings if needed
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group ${isRTL ? '' : 'flex-row-reverse'}`}
                >
                  <FiSettings className={`${isRTL ? 'mr-3' : 'ml-3'} text-gray-400 group-hover:text-primary-600 transition-colors`} />
                  <span className="group-hover:text-primary-600 transition-colors">Settings</span>
                </button>
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-200 p-2 bg-gray-50">
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center justify-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium group ${isRTL ? '' : 'flex-row-reverse'}`}
                >
                  <FiLogOut className={`${isRTL ? 'mr-3' : 'ml-3'} group-hover:scale-110 transition-transform`} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
