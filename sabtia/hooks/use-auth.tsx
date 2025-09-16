'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  vendorId: string | null;
  login: (token: string, vendorId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [vendorId, setVendorId] = useState<string | null>(null);

  useEffect(() => {
    // Function to parse cookies
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const storedToken = getCookie('token');
    const storedVendorId = localStorage.getItem('vendorId'); // vendorId can still be in localStorage

    if (storedToken) {
      setToken(storedToken);
      setVendorId(storedVendorId);
    }
  }, []);

  const login = (newToken: string, newVendorId: string) => {
    setToken(newToken);
    setVendorId(newVendorId);
    // Token is now set as an HttpOnly cookie by the backend
    localStorage.setItem('vendorId', newVendorId); // Still store vendorId for frontend use
  };

  const logout = () => {
    setToken(null);
    setVendorId(null);
    // Clear the token cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('vendorId');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, vendorId, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}