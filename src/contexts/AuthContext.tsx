import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock successful login
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
      };
      setUser(mockUser);
      toast.success('Login berhasil! Selamat datang.');
      return true;
    }
    
    toast.error('Email atau password salah');
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock successful registration
    if (name && email && password.length >= 6) {
      const mockUser: User = {
        id: '1',
        name,
        email,
      };
      setUser(mockUser);
      toast.success('Registrasi berhasil! Selamat bergabung.');
      return true;
    }
    
    toast.error('Registrasi gagal. Periksa data Anda.');
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    toast.info('Anda telah logout');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
