
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
import { Plus, MessageSquare, Info, History } from 'lucide-react';
import { toast } from 'sonner';

// Mock data
const mockServices: ServiceData[] = [
  {
    id: '1',
    title: 'Fix Leaking Bathroom Faucet',
    description: 'The bathroom sink faucet is leaking and needs repair or replacement.',
    category: 'Plumbing',
    location: 'Brooklyn, NY',
    date: 'June 10, 2023',
    status: 'in-progress',
    workerName: 'Mike Peters',
    workerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    workerId: '2',
  },
  {
    id: '2',
    title: 'Paint Living Room Walls',
    description: 'Need to repaint living room walls. The room is approximately 15x20 feet.',
    category: 'Painting',
    location: 'Manhattan, NY',
    date: 'June 15, 2023',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Replace Kitchen Light Fixture',
    description: 'Need to replace an old light fixture in the kitchen with a new pendant light.',
    category: 'Electrical',
    location: 'Queens, NY',
    date: 'May 28, 2023',
    status: 'completed',
    workerName: 'Sarah Johnson',
    workerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    workerId: '3',
  },
];

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceData[]>(mockServices);

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'customer') {
    return <Navigate to="/worker-dashboard" />;
  }
  
  const pendingServices = services.filter(s => s.status === 'pending');
  const activeServices = services.filter(s => s.status === 'in-progress');
  const completedServices = services.filter(s => s.status === 'completed');
  
  const handleCancelService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast.success('Service request cancelled');
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
            <p className="mt-1 text-muted-foreground">Gerencie suas solicitações de serviço</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link to="/service-request">
              <Button className="button-hover">
                <Plus className="mr-2 h-4 w-4" />
                Solicitar Serviço
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
              <CardTitle className="text-xl">Pendentes</CardTitle>
              <CardDescription>Solicitações de serviço aguardando aceitação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingServices.length}</div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up [animation-delay:100ms]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Ativos</CardTitle>
              <CardDescription>Serviços em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeServices.length}</div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up [animation-delay:200ms]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Concluídos</CardTitle>
              <CardDescription>Serviços já concluídos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedServices.length}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="active" className="animate-fade-in">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {activeServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    userRole="customer"
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhum serviço ativo</h3>
                <p className="mt-2 text-muted-foreground">
                  Você não tem nenhum serviço em andamento no momento.
                </p>
                <Link to="/service-request" className="mt-4 inline-block">
                  <Button className="button-hover">
                    <Plus className="mr-2 h-4 w-4" />
                    Solicitar Novo Serviço
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    userRole="customer"
                    onCancel={handleCancelService}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhum serviço pendente</h3>
                <p className="mt-2 text-muted-foreground">
                  Você não tem nenhuma solicitação de serviço pendente.
                </p>
                <Link to="/service-request" className="mt-4 inline-block">
                  <Button className="button-hover">
                    <Plus className="mr-2 h-4 w-4" />
                    Solicitar Novo Serviço
                  </Button>
                </Link>
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
                    userRole="customer"
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhum serviço concluído</h3>
                <p className="mt-2 text-muted-foreground">
                  Você ainda não tem nenhum serviço concluído.
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

export default UserDashboard;
