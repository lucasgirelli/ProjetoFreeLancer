
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  // Lista de rotas públicas que não devem carregar usuário automaticamente
  const publicRoutes = ['/', '/login', '/register'];

  useEffect(() => {
    // Só carregamos usuário do localStorage se NÃO estivermos em uma rota pública
    const isPublicRoute = publicRoutes.includes(location.pathname);
    
    // Verificamos se há usuário armazenado
    const storedUser = localStorage.getItem('user');
    
    if (storedUser && !isPublicRoute) {
      // Se temos um usuário e NÃO estamos em rota pública, carregamos ele
      setUser(JSON.parse(storedUser));
    } else if (isPublicRoute && storedUser) {
      // Se estamos em rota pública e existe um usuário no localStorage,
      // deixamos o usuário como null, mas não limpamos o localStorage
      setUser(null);
    }
    
    setIsLoading(false);
  }, [location.pathname]);

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
        
        toast.success('Login realizado com sucesso');
      } else {
        toast.error('Email ou senha inválidos');
      }
    } catch (error) {
      toast.error('Falha ao realizar login');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // Certifique-se de que qualquer usuário armazenado seja removido
      localStorage.removeItem('user');
      
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
      
      toast.success('Cadastro realizado com sucesso');
    } catch (error) {
      toast.error('Falha ao realizar cadastro');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Desconectado com sucesso');
  };

  const updateUserProfile = (data: Partial<UserData>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Perfil atualizado com sucesso');
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
