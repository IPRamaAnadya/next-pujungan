import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface Admin {
  uuid: string;
  nama: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: Admin | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo admin data
const DEMO_ADMIN: Admin = {
  uuid: 'adm-001',
  nama: 'I Made Wijaya',
  email: 'admin@desapujungan.bali',
  role: 'admin'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('desa_pujungan_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('desa_pujungan_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication
    if (email === 'admin@desapujungan.bali' && password === 'admin123') {
      setUser(DEMO_ADMIN);
      setIsAuthenticated(true);
      localStorage.setItem('desa_pujungan_user', JSON.stringify(DEMO_ADMIN));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('desa_pujungan_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
