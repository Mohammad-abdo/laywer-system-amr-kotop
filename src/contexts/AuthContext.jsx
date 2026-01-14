import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../config/api.js';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const response = await api.get('/auth/me');
      if (response.data?.data) {
        setUser(response.data.data);
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { 
        email: email.trim(), 
        password: password.trim() 
      });
      
      if (!response.data?.data) {
        return { success: false, message: 'استجابة غير صحيحة من الخادم' };
      }

      const { accessToken, refreshToken, user: userData } = response.data.data;
      
      if (!accessToken || !refreshToken || !userData) {
        return { success: false, message: 'بيانات غير كاملة من الخادم' };
      }
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
    } catch (error) {
      let message = 'فشل تسجيل الدخول';
      
      if (error.code === 'ECONNREFUSED') {
        message = 'لا يمكن الاتصال بالخادم';
      } else if (error.response?.status === 401) {
        message = error.response?.data?.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Continue with logout even if API call fails
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { accessToken, refreshToken, user: newUser } = response.data.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true, user: newUser };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'فشل التسجيل',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        register,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
