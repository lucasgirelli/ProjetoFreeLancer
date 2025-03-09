
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, User, MessageSquare } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const Chat: React.FC = () => {
  const { user, getChats, getMessages, sendMessage, markChatAsRead } = useAuth();
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(chatId || null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    if (chatId) {
      setActiveChat(chatId);
      markChatAsRead(chatId);
    }
  }, [chatId, markChatAsRead]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, getMessages]);
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const chats = getChats();
  const activeMessages = activeChat ? getMessages(activeChat) : [];
  
  const activeChatData = chats.find(chat => chat.id === activeChat);
  
  const formatMessageDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      
      if (isToday(date)) {
        return format(date, "'Hoje,' HH:mm", { locale: ptBR });
      } else if (isYesterday(date)) {
        return format(date, "'Ontem,' HH:mm", { locale: ptBR });
      } else {
        return format(date, "dd/MM/yyyy, HH:mm", { locale: ptBR });
      }
    } catch (e) {
      return dateString;
    }
  };
  
  const handleSelectChat = (id: string) => {
    setActiveChat(id);
    markChatAsRead(id);
    
    if (isSmallScreen) {
      navigate(`/chat/${id}`);
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeChat || !message.trim()) return;
    
    const receiverId = activeChatData?.otherParticipant.id || '';
    if (receiverId) {
      sendMessage(receiverId, message);
      setMessage('');
      
      // Scroll to bottom after sending
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };
  
  // Exibição para layout mobile quando um chat está ativo
  if (isSmallScreen && activeChat) {
    return (
      <div className="min-h-screen pt-16 pb-12 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="page-container mt-6 flex flex-col flex-1">
          {/* Cabeçalho do chat */}
          <div className="flex items-center mb-4 animate-slide-down">
            <Button 
              variant="ghost" 
              className="mr-4" 
              size="sm"
              onClick={() => navigate('/chat')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            
            {activeChatData && (
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  {activeChatData.otherParticipant.avatar ? (
                    <AvatarImage 
                      src={activeChatData.otherParticipant.avatar} 
                      alt={activeChatData.otherParticipant.name} 
                    />
                  ) : (
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h2 className="font-bold">{activeChatData.otherParticipant.name}</h2>
                </div>
              </div>
            )}
          </div>
          
          {/* Área de mensagens */}
          <Card className="flex-1 flex flex-col animate-fade-in mb-4">
            <ScrollArea className="flex-1 p-4 h-[calc(100vh-260px)]">
              {activeMessages.length > 0 ? (
                <div className="space-y-4">
                  {activeMessages.map((msg, index) => {
                    const isMe = msg.senderId === user.id;
                    
                    return (
                      <div 
                        key={msg.id} 
                        className={cn(
                          "flex",
                          isMe ? "justify-end" : "justify-start"
                        )}
                      >
                        <div 
                          className={cn(
                            "max-w-[75%] rounded-2xl px-4 py-2",
                            isMe 
                              ? "bg-primary text-primary-foreground rounded-tr-none" 
                              : "bg-muted rounded-tl-none"
                          )}
                        >
                          <p>{msg.content}</p>
                          <p className={cn(
                            "text-xs mt-1",
                            isMe ? "text-primary-foreground/80" : "text-muted-foreground"
                          )}>
                            {formatMessageDate(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Nenhuma mensagem</h3>
                  <p className="text-muted-foreground mt-2">
                    Envie uma mensagem para iniciar a conversa
                  </p>
                </div>
              )}
            </ScrollArea>
            
            {/* Formulário para enviar mensagem */}
            <form 
              onSubmit={handleSendMessage} 
              className="p-4 border-t flex items-center space-x-2"
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1"
              />
              <Button type="submit" disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="page-container mt-6">
        <div className="flex items-center mb-8 animate-slide-down">
          <Button 
            variant="ghost" 
            className="mr-4" 
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Mensagens</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Lista de chats */}
          <div className="md:col-span-1">
            <Card className="h-full animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Conversas</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-280px)]">
                  {chats.length > 0 ? (
                    <div className="space-y-4">
                      {chats.map((chat) => (
                        <div
                          key={chat.id}
                          className={cn(
                            "flex items-center p-3 rounded-lg cursor-pointer transition-colors",
                            activeChat === chat.id 
                              ? "bg-muted" 
                              : "hover:bg-muted/50",
                            chat.unreadCount > 0 ? "font-semibold" : ""
                          )}
                          onClick={() => handleSelectChat(chat.id)}
                        >
                          <Avatar className="h-12 w-12 mr-3">
                            {chat.otherParticipant.avatar ? (
                              <AvatarImage 
                                src={chat.otherParticipant.avatar} 
                                alt={chat.otherParticipant.name} 
                              />
                            ) : (
                              <AvatarFallback>
                                <User className="h-5 w-5" />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">
                              {chat.otherParticipant.name}
                            </h3>
                            {chat.lastMessage && (
                              <p className="text-sm text-muted-foreground truncate">
                                {chat.lastMessage}
                              </p>
                            )}
                          </div>
                          {chat.unreadCount > 0 && (
                            <div className="ml-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
                              {chat.unreadCount}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Nenhuma conversa</h3>
                      <p className="mt-2 text-muted-foreground">
                        Você ainda não iniciou nenhuma conversa
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          {/* Área de chat */}
          <div className="md:col-span-2">
            {activeChat ? (
              <Card className="h-full flex flex-col animate-fade-in">
                <CardHeader className="border-b pb-3">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      {activeChatData?.otherParticipant.avatar ? (
                        <AvatarImage 
                          src={activeChatData.otherParticipant.avatar} 
                          alt={activeChatData.otherParticipant.name} 
                        />
                      ) : (
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {activeChatData?.otherParticipant.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <ScrollArea className="flex-1 p-4">
                  {activeMessages.length > 0 ? (
                    <div className="space-y-4">
                      {activeMessages.map((msg) => {
                        const isMe = msg.senderId === user.id;
                        
                        return (
                          <div 
                            key={msg.id} 
                            className={cn(
                              "flex",
                              isMe ? "justify-end" : "justify-start"
                            )}
                          >
                            <div 
                              className={cn(
                                "max-w-[75%] rounded-2xl px-4 py-2",
                                isMe 
                                  ? "bg-primary text-primary-foreground rounded-tr-none" 
                                  : "bg-muted rounded-tl-none"
                              )}
                            >
                              <p>{msg.content}</p>
                              <p className={cn(
                                "text-xs mt-1",
                                isMe ? "text-primary-foreground/80" : "text-muted-foreground"
                              )}>
                                {formatMessageDate(msg.timestamp)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Nenhuma mensagem</h3>
                      <p className="text-muted-foreground mt-2">
                        Envie uma mensagem para iniciar a conversa
                      </p>
                    </div>
                  )}
                </ScrollArea>
                
                <form 
                  onSubmit={handleSendMessage} 
                  className="p-4 border-t flex items-center space-x-2"
                >
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </Card>
            ) : (
              <Card className="h-full flex flex-col items-center justify-center animate-fade-in">
                <div className="text-center max-w-md p-8">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-2">Selecione uma conversa</h2>
                  <p className="text-muted-foreground mb-6">
                    Escolha uma conversa à esquerda ou inicie uma nova para começar a trocar mensagens
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
