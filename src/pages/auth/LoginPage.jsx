import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      const redirectPath = ['SUPER_ADMIN', 'ADMIN', 'LAWYER'].includes(user.role) 
        ? '/admin/dashboard' 
        : '/';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    
    if (!formData.email || !formData.password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email.trim(), formData.password.trim());

      if (result?.success && result?.user) {
        const isAdmin = ['SUPER_ADMIN', 'ADMIN', 'LAWYER'].includes(result.user.role);
        const redirectPath = isAdmin ? '/admin/dashboard' : '/';
        window.location.href = redirectPath;
      } else {
        setError(result?.message || 'فشل تسجيل الدخول');
        setLoading(false);
      }
    } catch {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 2.18l7 3.89v8.93c0 1.75-1.29 3.32-2.67 4.04-1.38.72-3 .72-4.38 0C10.29 20.32 9 18.75 9 17V8.07l3-1.66V12h2V6.18z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">تسجيل الدخول</h2>
          <p className="text-gray-600">سجل دخولك إلى حسابك</p>
        </div>

        <form className="mt-8 space-y-6 bg-white rounded-2xl shadow-xl p-8" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-r-4 border-red-500 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                placeholder="example@email.com"
                dir="ltr"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-700">
                تذكرني
              </label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-amber-600 hover:text-amber-700">
                نسيت كلمة المرور؟
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 hover:from-amber-800 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري تسجيل الدخول...
                </span>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="font-medium text-amber-600 hover:text-amber-700">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-bold text-amber-800 mb-2">بيانات تجريبية:</p>
            <div className="text-xs text-amber-700 space-y-1">
              <p><strong>Admin:</strong> admin@lawfirm.com / <code className="bg-amber-100 px-1 rounded">Admin123!</code></p>
              <p><strong>Lawyer:</strong> lawyer1@lawfirm.com / <code className="bg-amber-100 px-1 rounded">Lawyer123!</code></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
