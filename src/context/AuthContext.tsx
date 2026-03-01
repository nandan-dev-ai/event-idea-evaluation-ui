import React from 'react';
import { saveToken, getToken, clearToken } from '../utils/storage';
import api from '../utils/api';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(() => getToken());

  const login = async (email: string, password: string) => {
    const resp = await api.post('/auth/login', { email, password });
    const data = resp.data;
    const tok = data.token || data.accessToken || data;
    setToken(tok);
    saveToken(tok);
  };

  const logout = () => {
    setToken(null);
    clearToken();
  };

  const value: AuthContextType = {
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
