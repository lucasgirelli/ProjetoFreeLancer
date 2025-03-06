
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// User types
export type UserRole = 'customer' | 'worker';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileComplete: boolean;
  profilePicture?: string;
  location?: string;
  skills?: string[];
}

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<UserData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data - In a real app, this would come from a backend
const MOCK_USERS: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    role: 'customer',
    profileComplete: true,
    location: 'New York, NY',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'worker@example.com',
    role: 'worker',
    profileComplete: true,
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    location: 'Brooklyn, NY',
    skills: ['Plumbing', 'Electrical', 'Painting'],
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock API call
      const foundUser = MOCK_USERS.find(u => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        
        // Redirect based on role and profile completion
        if (foundUser.role === 'worker' && !foundUser.profileComplete) {
          navigate('/worker-profile');
        } else if (foundUser.role === 'worker') {
          navigate('/worker-dashboard');
        } else {
          navigate('/user-dashboard');
        }
        
        toast.success('Login successful');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      // Mock registration
      const newUser: UserData = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        profileComplete: role === 'customer', // Workers need to complete profile
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Redirect based on role
      if (role === 'worker') {
        navigate('/worker-profile');
      } else {
        navigate('/user-dashboard');
      }
      
      toast.success('Registration successful');
    } catch (error) {
      toast.error('Registration failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const updateUserProfile = (data: Partial<UserData>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUserProfile,
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
