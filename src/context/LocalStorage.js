
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token');
  }
  return null;
};


export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
    window.location.href = '/login';
  }
};