
import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import ServiceCard, { ServiceData } from '@/components/ServiceCard';
import { Search, MessageSquare, Info, History } from 'lucide-react';
import { toast } from 'sonner';

const mockServices: ServiceData[] = [
  {
    id: '1',
    title: 'Conserto de Vazamento no Banheiro',
    description: 'A torneira do banheiro está vazando e precisa de reparo ou substituição.',
    category: 'Encanamento',
    location: 'São Paulo, SP',
    date: '10 de Junho, 2023',
    status: 'available',
    customerName: 'João da Silva',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    customerId: '1',
    skills: ['Encanamento', 'Reparos'],
  },
  {
    id: '2',
    title: 'Eletricista Não Funcionando',
    description: 'Duas tomadas no quarto não estão funcionando. Preciso de alguém para diagnosticar e corrigir o problema.',
    category: 'Eletricista',
    location: 'Rio de Janeiro, RJ',
    date: '12 de Junho, 2023',
    status: 'available',
    customerName: 'Maria Souza',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    customerId: '3',
    skills: ['Eletricista', 'Diagnóstico'],
  },
  {
    id: '3',
    title: 'Montagem de TV na Parede',
    description: 'Preciso montar uma TV 55 polegadas na parede. Todos os materiais fornecidos.',
    category: 'Montagem',
    location: 'São Paulo, SP',
    date: '15 de Junho, 2023',
    status: 'available',
    customerName: 'Carlos Oliveira',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    customerId: '4',
    skills: ['Montagem', 'Instalação'],
  },
  {
    id: '4',
    title: 'Conserto de Máquina de Lavar',
    description: 'A máquina de lavar não está descartando adequadamente. Preciso de alguém para diagnosticar e reparar.',
    category: 'Reparo de Máquina',
    location: 'Rio de Janeiro, RJ',
    date: '8 de Junho, 2023',
    status: 'in-progress',
    customerName: 'Ana Santos',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    customerId: '1',
    skills: ['Reparo de Máquina', 'Encanamento'],
  },
  {
    id: '5',
    title: 'Pintura de Quarto',
    description: 'Preciso pintar uma sala de 12x14. As paredes estão em bom estado, apenas preciso de uma mudança de cor.',
    category: 'Pintura',
    location: 'São Paulo, SP',
    date: '20 de Maio, 2023',
    status: 'completed',
    customerName: 'Pedro Costa',
    customerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    customerId: '5',
    skills: ['Pintura', 'Interno'],
  },
];

const WorkerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceData[]>(mockServices);

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'worker') {
    return <Navigate to="/user-dashboard" />;
  }
  
  const availableServices = services.filter(s => s.status === 'available');
  const activeServices = services.filter(s => s.status === 'in-progress');
  const completedServices = services.filter(s => s.status === 'completed');
  
  const handleAcceptService = (id: string) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: 'in-progress' as const } 
        : service
    ));
    toast.success('Serviço aceito');
  };
  
  const handleRejectService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast.success('Pedido de serviço ignorado');
  };
  
  const handleCompleteService = (id: string) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: 'completed' as const } 
        : service
    ));
    toast.success('Serviço marcado como concluído');
  };
  
  const handleViewDetails = (id: string) => {
    navigate(`/service/${id}`);
  };
  
  return (
    <div className="min-h-screen pt-16 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="page-container mt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-slide-down">
          <div>
            <h1 className="text-3xl font-bold">Bem-vindo, {user.name}</h1>
            <p className="mt-1 text-muted-foreground">Gerencie seus trabalhos de serviço</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link to="/services-available">
              <Button className="button-hover">
                <Search className="mr-2 h-4 w-4" />
                Achar Novos Trabalhos
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="outline" className="button-hover">
                <MessageSquare className="mr-2 h-4 w-4" />
                Mensagens
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="animate-slide-up">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Disponíveis</CardTitle>
              <CardDescription>Pedidos de serviço que você pode aceitar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{availableServices.length}</div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up [animation-delay:100ms]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Ativos</CardTitle>
              <CardDescription>Serviços que você está trabalhando atualmente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeServices.length}</div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up [animation-delay:200ms]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Concluídos</CardTitle>
              <CardDescription>Serviços que você concluiu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedServices.length}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="active" className="animate-fade-in">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="available">Disponíveis</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {activeServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    userRole="worker"
                    onComplete={handleCompleteService}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhum trabalho ativo</h3>
                <p className="mt-2 text-muted-foreground">
                  Você não tem nenhum trabalho ativo no momento.
                </p>
                <Link to="/services-available" className="mt-4 inline-block">
                  <Button className="button-hover">
                    <Search className="mr-2 h-4 w-4" />
                    Encontrar Trabalhos Disponíveis
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="available" className="space-y-4">
            {availableServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    userRole="worker"
                    onAccept={handleAcceptService}
                    onReject={handleRejectService}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhum trabalho disponível</h3>
                <p className="mt-2 text-muted-foreground">
                  Não há trabalhos compatíveis com suas habilidades disponíveis no momento.
                </p>
                <Button variant="outline" className="mt-4 button-hover" onClick={() => navigate(0)}>
                  Atualizar
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {completedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    userRole="worker"
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhum trabalho concluído</h3>
                <p className="mt-2 text-muted-foreground">
                  Você ainda não concluiu nenhum trabalho.
                </p>
                <Link to="/service-history" className="mt-4 inline-block">
                  <Button variant="outline" className="button-hover">
                    Ver Histórico de Serviços
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkerDashboard;
