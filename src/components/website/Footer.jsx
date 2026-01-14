import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info & Map */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <img 
                  src="/WhatsApp_Image_2026-01-14_at_5.01.35_PM-removebg-preview.png" 
                  alt="AMR SAIED KOTB Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-bold">AMR SAIED KOTB</div>
                <div className="text-xs text-gray-400">STRATEGY | BRANDING | LEGAL ADVISORS</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed mb-8">
              AMR SAIED KOTB<br />
              STRATEGY | BRANDING | LEGAL ADVISORS
            </p>
            
            {/* Google Map Placeholder */}
            <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center border border-gray-700">
              <div className="text-center">
                <div className="text-4xl mb-3">🗺️</div>
                <p className="text-gray-400 text-sm">خريطة Google</p>
                <p className="text-gray-500 text-xs mt-2">المملكة العربية السعودية، مكة المكرمة</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">خدماتنا</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-info-400 transition-colors cursor-pointer">الضرائب</li>
              <li className="hover:text-info-400 transition-colors cursor-pointer">الاستثمار الأجنبي</li>
              <li className="hover:text-info-400 transition-colors cursor-pointer">التمثيل والمرافعة القانونية</li>
              <li className="hover:text-info-400 transition-colors cursor-pointer">القانون التجاري والشركات</li>
              <li className="hover:text-info-400 transition-colors cursor-pointer">التحكيم وتسوية النزاعات</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">اتصل بنا</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <span className="text-xl ml-3 mt-1">📧</span>
                <span>info@meezan-law.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-xl ml-3 mt-1">📞</span>
                <span>+201000000000</span>
              </li>
              <li className="flex items-start">
                <span className="text-xl ml-3 mt-1">📱</span>
                <span>+201000000000</span>
              </li>
              <li className="flex items-start">
                <span className="text-xl ml-3 mt-1">📍</span>
                <span className="text-sm">3 مكرم عبيد , مدينة نصر , القاهرة , مصر</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <div className="flex space-x-3 space-x-reverse">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-info-600 rounded-lg flex items-center justify-center transition-colors border border-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-info-600 rounded-lg flex items-center justify-center transition-colors border border-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-info-600 rounded-lg flex items-center justify-center transition-colors border border-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-info-600 rounded-lg flex items-center justify-center transition-colors border border-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.246 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.413-.569-.217-.96-.478-1.379-.896-.421-.419-.69-.82-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.18.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.69 1.379-.9.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              جميع الحقوق محفوظة © {currentYear} AMR SAIED KOTB
            </p>
            <Link
              to="/contact"
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all text-sm"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

