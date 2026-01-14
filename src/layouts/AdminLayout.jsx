import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar.jsx';
import TopBar from '../components/admin/TopBar.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const AdminLayout = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className={isRTL ? 'lg:pr-72' : 'lg:pl-72'}>
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

