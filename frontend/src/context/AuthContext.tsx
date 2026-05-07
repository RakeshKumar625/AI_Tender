import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  role: string;
  company_name?: string;
}

interface AuthContextType {
  user: User | null;
  role: string | null;
  token: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Only show the loading spinner if we have an existing token to validate on mount.
  // Fresh logins also set loading while /me is fetched.
  const [isLoading, setIsLoading] = useState<boolean>(!!localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setRole(null);
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
      setIsLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.get(`${apiBaseUrl}/api/auth/me`);
      setUser(response.data);
      setRole(response.data.role ?? localStorage.getItem('role'));
    } catch (error) {
      console.error('Failed to fetch user', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newToken: string, role: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', role);
    setRole(role);
    setIsLoading(true);
    // Set axios header immediately so the /me call in the triggered useEffect
    // has the correct Authorization header right away.
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    setUser(null);
    setIsLoading(false);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        login,
        logout,
        // KEY FIX: isAuthenticated is based on `token` (set synchronously inside login()),
        // NOT on `user` (populated asynchronously via /me). This means ProtectedRoute
        // sees isAuthenticated=true immediately after login() is called, so the first
        // navigate() to the dashboard succeeds without needing a second login attempt.
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
