import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useState, useRef, useEffect } from 'react';
import { FiGlobe } from 'react-icons/fi';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/98 border-b border-gray-100">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo - AMR SAIED KOTB */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse group">
            <div className="w-24 h-24 flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <img 
                src="/WhatsApp_Image_2026-01-14_at_5.01.35_PM-removebg-preview.png" 
                alt="AMR SAIED KOTB Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden md:block">
              <div className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                AMR SAIED KOTB
              </div>
              <div className="text-xs text-gray-600 font-medium">STRATEGY | BRANDING | LEGAL ADVISORS</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors px-3 py-2 rounded-lg ${
                isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              الرئيسية
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors px-3 py-2 rounded-lg ${
                isActive('/about') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              نبذة عنا
            </Link>
            <Link
              to="/services"
              className={`font-medium transition-colors px-3 py-2 rounded-lg ${
                isActive('/services') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              خدماتنا
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors px-3 py-2 rounded-lg ${
                isActive('/contact') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              تواصل معنا
            </Link>
          </div>

          {/* Right Side - Language & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                <FiGlobe className="text-lg" />
                <span>{language === 'ar' ? 'العربية' : 'English'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setLangMenuOpen(false);
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
                      setLangMenuOpen(false);
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

            {/* Contact Button */}
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 text-white font-bold rounded-lg hover:from-primary-800 hover:to-primary-900 transition-all shadow-lg shadow-primary-600/40 hover:shadow-xl transform hover:-translate-y-0.5"
            >
              تواصل معنا
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated && (
              <div className="flex items-center space-x-2 border-r border-gray-200 pr-4">
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  لوحة التحكم
                </Link>
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.firstName?.[0] || 'U'}
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium px-4 py-2 rounded-lg ${isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-700'}`}
              >
                الرئيسية
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium px-4 py-2 rounded-lg ${isActive('/about') ? 'text-primary-600 bg-primary-50' : 'text-gray-700'}`}
              >
                نبذة عنا
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium px-4 py-2 rounded-lg ${isActive('/services') ? 'text-primary-600 bg-primary-50' : 'text-gray-700'}`}
              >
                خدماتنا
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium px-4 py-2 rounded-lg ${isActive('/contact') ? 'text-primary-600 bg-primary-50' : 'text-gray-700'}`}
              >
                تواصل معنا
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-medium px-4 py-2 text-gray-700"
                  >
                    لوحة التحكم
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left font-medium px-4 py-2 text-gray-700"
                  >
                    تسجيل الخروج
                  </button>
                </>
              )}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg text-center mx-4"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
