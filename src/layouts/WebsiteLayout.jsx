import { Outlet } from 'react-router-dom';
import Navbar from '../components/website/Navbar.jsx';
import Footer from '../components/website/Footer.jsx';

const WebsiteLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;

