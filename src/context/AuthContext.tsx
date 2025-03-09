
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

// User types
export type UserRole = 'customer' | 'worker';

export interface Rating {
  id: string;
  workerId: string;
  customerId: string;
  serviceId: string;
  stars: number;
  comment: string;
  date: string;
  customerName: string;
  customerAvatar?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participantIds: string[];
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadCount: number;
  otherParticipant: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileComplete: boolean;
  profilePicture?: string;
  location?: string;
  skills?: string[];
  ratings?: Rating[];
  averageRating?: number;
}

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<UserData>) => void;
  getRatingsForWorker: (workerId: string) => Rating[];
  saveRating: (rating: Omit<Rating, 'id' | 'date' | 'customerName' | 'customerAvatar'>) => void;
  getUserRatings: () => Rating[];
  getChats: () => Chat[];
  getMessages: (chatId: string) => Message[];
  sendMessage: (receiverId: string, content: string) => void;
  markChatAsRead: (chatId: string) => void;
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
    ratings: [
      {
        id: '1',
        workerId: '2',
        customerId: '1',
        serviceId: '3',
        stars: 5,
        comment: 'Excelente trabalho, muito profissional e pontual!',
        date: '2023-05-30T14:30:00',
        customerName: 'John Doe',
      },
      {
        id: '2',
        workerId: '2',
        customerId: '3',
        serviceId: '5',
        stars: 4,
        comment: 'Ótimo serviço, recomendo!',
        date: '2023-06-15T10:15:00',
        customerName: 'Maria Silva',
        customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      }
    ],
    averageRating: 4.5,
  },
];

// Mock messages data
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Olá, tenho interesse no seu serviço de encanamento. Está disponível na próxima semana?',
    timestamp: '2023-06-10T09:30:00',
    read: true,
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: 'Olá! Sim, estou disponível na terça e quinta-feira. Qual seria o problema?',
    timestamp: '2023-06-10T10:15:00',
    read: true,
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '2',
    content: 'Tenho um vazamento embaixo da pia da cozinha. Terça-feira às 14h seria bom para você?',
    timestamp: '2023-06-10T10:45:00',
    read: true,
  },
  {
    id: '4',
    senderId: '2',
    receiverId: '1',
    content: 'Perfeito! Confirmo para terça às 14h. Poderia me enviar o endereço completo?',
    timestamp: '2023-06-10T11:00:00',
    read: false,
  },
];

// Mock chats data
const MOCK_CHATS: { id: string, participantIds: string[] }[] = [
  {
    id: 'chat1',
    participantIds: ['1', '2'],
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [chats, setChats] = useState(MOCK_CHATS);
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
    
    // Carregamos ratings do localStorage, se existirem
    const storedRatings = localStorage.getItem('ratings');
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    } else {
      // Se não existirem ratings no localStorage, usamos os ratings mock dos trabalhadores
      const mockRatings = MOCK_USERS.reduce((acc, user) => {
        if (user.ratings) {
          return [...acc, ...user.ratings];
        }
        return acc;
      }, [] as Rating[]);
      setRatings(mockRatings);
      localStorage.setItem('ratings', JSON.stringify(mockRatings));
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

  // Funções para gerenciar as avaliações
  const getRatingsForWorker = (workerId: string) => {
    return ratings.filter(rating => rating.workerId === workerId);
  };

  const saveRating = (ratingData: Omit<Rating, 'id' | 'date' | 'customerName' | 'customerAvatar'>) => {
    if (!user) return;

    const newRating: Rating = {
      id: Math.random().toString(36).substr(2, 9),
      ...ratingData,
      date: new Date().toISOString(),
      customerName: user.name,
      customerAvatar: user.profilePicture,
    };

    const updatedRatings = [...ratings, newRating];
    setRatings(updatedRatings);
    localStorage.setItem('ratings', JSON.stringify(updatedRatings));
    toast.success('Avaliação enviada com sucesso');
  };

  const getUserRatings = () => {
    if (!user) return [];
    return ratings.filter(rating => rating.customerId === user.id);
  };

  // Funções para gerenciar o chat
  const getChats = () => {
    if (!user) return [];

    return chats
      .filter(chat => chat.participantIds.includes(user.id))
      .map(chat => {
        const otherParticipantId = chat.participantIds.find(id => id !== user.id) || '';
        const otherUser = MOCK_USERS.find(u => u.id === otherParticipantId);
        
        // Encontrar a última mensagem deste chat
        const chatMessages = messages
          .filter(msg => 
            (msg.senderId === user.id && msg.receiverId === otherParticipantId) || 
            (msg.senderId === otherParticipantId && msg.receiverId === user.id)
          )
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        const lastMessage = chatMessages.length > 0 ? chatMessages[0].content : undefined;
        const lastMessageTimestamp = chatMessages.length > 0 ? chatMessages[0].timestamp : undefined;
        
        // Contar mensagens não lidas
        const unreadCount = chatMessages.filter(msg => 
          msg.receiverId === user.id && !msg.read
        ).length;
        
        return {
          id: chat.id,
          participantIds: chat.participantIds,
          lastMessage,
          lastMessageTimestamp,
          unreadCount,
          otherParticipant: {
            id: otherParticipantId,
            name: otherUser?.name || 'Usuário',
            avatar: otherUser?.profilePicture
          }
        };
      });
  };

  const getMessages = (chatId: string) => {
    if (!user) return [];

    const chat = chats.find(c => c.id === chatId);
    if (!chat) return [];

    const otherParticipantId = chat.participantIds.find(id => id !== user.id);
    if (!otherParticipantId) return [];

    return messages
      .filter(msg => 
        (msg.senderId === user.id && msg.receiverId === otherParticipantId) || 
        (msg.senderId === otherParticipantId && msg.receiverId === user.id)
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const sendMessage = (receiverId: string, content: string) => {
    if (!user || !content.trim()) return;

    // Criar nova mensagem
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };

    // Adicionar mensagem à lista
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Verificar se já existe um chat entre esses usuários
    const existingChat = chats.find(chat => 
      chat.participantIds.includes(user.id) && 
      chat.participantIds.includes(receiverId)
    );

    if (!existingChat) {
      // Criar novo chat se não existir
      const newChat = {
        id: `chat-${Math.random().toString(36).substr(2, 9)}`,
        participantIds: [user.id, receiverId]
      };
      
      setChats([...chats, newChat]);
    }
  };

  const markChatAsRead = (chatId: string) => {
    if (!user) return;

    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    const otherParticipantId = chat.participantIds.find(id => id !== user.id);
    if (!otherParticipantId) return;

    // Marcar todas as mensagens recebidas como lidas
    const updatedMessages = messages.map(msg => 
      msg.receiverId === user.id && msg.senderId === otherParticipantId
        ? { ...msg, read: true }
        : msg
    );

    setMessages(updatedMessages);
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
        getRatingsForWorker,
        saveRating,
        getUserRatings,
        getChats,
        getMessages,
        sendMessage,
        markChatAsRead,
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
