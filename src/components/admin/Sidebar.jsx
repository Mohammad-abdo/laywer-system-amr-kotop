import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import {
  FiLayout,
  FiFolder,
  FiMessageSquare,
  FiCalendar,
  FiCheckSquare,
  FiFileText,
  FiBriefcase,
  FiArchive,
  FiMail,
  FiBookOpen,
  FiUsers,
  FiDollarSign,
  FiUser,
  FiGlobe,
  FiSettings,
} from 'react-icons/fi';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: FiLayout },
  {
    path: '/admin/cases',
    label: 'Cases',
    icon: FiFolder,
    roles: ['SUPER_ADMIN', 'ADMIN', 'LAWYER'],
  },
  { path: '/admin/consultations', label: 'Consultations', icon: FiMessageSquare },
  { path: '/admin/appointments', label: 'Appointments', icon: FiCalendar },
  { path: '/admin/tasks', label: 'Tasks', icon: FiCheckSquare },
  { path: '/admin/documents', label: 'Documents', icon: FiFileText },
  { path: '/admin/company-formation', label: 'Company Formation', icon: FiBriefcase },
  { path: '/admin/archiving', label: 'Archiving', icon: FiArchive },
  { path: '/admin/messaging', label: 'Messaging', icon: FiMail },
  {
    path: '/admin/training',
    label: 'Training',
    icon: FiBookOpen,
    roles: ['SUPER_ADMIN', 'ADMIN', 'LAWYER'],
  },
  { path: '/admin/hr', label: 'HR', icon: FiUsers, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { path: '/admin/accounting', label: 'Accounting', icon: FiDollarSign, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { path: '/admin/users', label: 'Users', icon: FiUser, roles: ['SUPER_ADMIN', 'ADMIN'] },
  {
    path: '/admin/translations',
    label: 'Translations',
    icon: FiGlobe,
    roles: ['SUPER_ADMIN', 'ADMIN'],
  },
  { path: '/admin/profile', label: 'Profile', icon: FiUser },
  { path: '/admin/settings', label: 'Settings', icon: FiSettings },
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role);
  });

  return (
    <aside className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-center h-24 bg-gradient-to-r from-primary-700 to-primary-800 shadow-lg px-4">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 flex items-center justify-center">
              <img 
                src="/WhatsApp_Image_2026-01-14_at_5.01.35_PM-removebg-preview.png" 
                alt="AMR SAIED KOTB Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-sm font-bold text-white">AMR SAIED KOTB</h1>
              <p className="text-xs text-white/80">Admin System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/50'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <div className={`absolute ${isRTL ? 'right-0 rounded-l-full' : 'left-0 rounded-r-full'} top-0 bottom-0 w-1 bg-white`}></div>
                    )}
                    <Icon
                      className={`${isRTL ? 'ml-3' : 'mr-3'} text-lg transition-transform duration-200 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className={`${isRTL ? 'mr-auto' : 'ml-auto'} w-2 h-2 bg-white rounded-full animate-pulse`}></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
