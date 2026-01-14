// Utility functions for authentication

/**
 * Store tokens in localStorage
 */
export const storeTokens = (accessToken, refreshToken) => {
  try {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log('💾 Tokens stored successfully');
    return true;
  } catch (error) {
    console.error('❌ Error storing tokens:', error);
    return false;
  }
};

/**
 * Get tokens from localStorage
 */
export const getTokens = () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('❌ Error getting tokens:', error);
    return { accessToken: null, refreshToken: null };
  }
};

/**
 * Remove tokens from localStorage
 */
export const removeTokens = () => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('🗑️ Tokens removed');
    return true;
  } catch (error) {
    console.error('❌ Error removing tokens:', error);
    return false;
  }
};

/**
 * Check if user is authenticated (has valid token)
 */
export const isAuthenticated = () => {
  const { accessToken } = getTokens();
  return !!accessToken;
};

/**
 * Get user role from token (basic check)
 */
export const getUserRole = () => {
  try {
    const { accessToken } = getTokens();
    if (!accessToken) return null;
    
    // Decode JWT (basic decode without verification)
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    return payload.role;
  } catch (error) {
    console.error('❌ Error getting user role:', error);
    return null;
  }
};


