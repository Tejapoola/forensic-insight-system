
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

export type UserRole = 'admin' | 'analyst' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
}

// Mock user data for development
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@forensics.com',
    password: 'admin123',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    name: 'Analyst User',
    email: 'analyst@forensics.com',
    password: 'analyst123',
    role: 'analyst' as UserRole,
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('forensic_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('forensic_user', JSON.stringify(userWithoutPassword));
          toast.success('Login successful');
          resolve(true);
        } else {
          toast.error('Invalid email or password');
          resolve(false);
        }
        setLoading(false);
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if email already exists
        const existingUser = MOCK_USERS.find((u) => u.email === email);
        
        if (existingUser) {
          toast.error('User with this email already exists');
          resolve(false);
        } else {
          // In a real app, you would make an API call to register the user
          // For demo purposes, we'll just create a new user locally
          const newUser = {
            id: `${MOCK_USERS.length + 1}`,
            name,
            email,
            role,
          };
          
          setUser(newUser);
          localStorage.setItem('forensic_user', JSON.stringify(newUser));
          toast.success('Registration successful');
          resolve(true);
        }
        setLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('forensic_user');
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
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
