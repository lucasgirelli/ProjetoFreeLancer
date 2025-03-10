
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

// Dados fictícios
const servicosFicticios: ServiceData[] = [
  {
    id: '1',
    title: 'Consertar Vazamento na Torneira do Banheiro',
    description: 'A torneira do banheiro está vazando e precisa de reparo ou substituição.',
    category: 'Encanamento',
    location: 'São Paulo, SP',
    date: '10 de Junho, 2023',
    status: 'in-progress',
    workerName: 'Miguel Pereira',
    workerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    workerId: '2',
  },
  {
    id: '2',
    title: 'Pintar Paredes da Sala de Estar',
    description: 'Necessito pintar as paredes da sala de estar. O ambiente tem aproximadamente 15x20 metros.',
    category: 'Pintura',
    location: 'Rio de Janeiro, RJ',
    date: '15 de Junho, 2023',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Substituir Luminária da Cozinha',
    description: 'Preciso substituir uma luminária antiga da cozinha por um novo modelo de pendente.',
    category: 'Elétrica',
    location: 'Curitiba, PR',
    date: '28 de Maio, 2023',
    status: 'completed',
    workerName: 'Sandra Johnson',
    workerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    workerId: '3',
  },
];

const PainelUsuario: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [servicos, setServicos] = useState<ServiceData[]>(servicosFicticios);

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'customer') {
    return <Navigate to="/painel-trabalhador" />;
  }
  
  const servicosPendentes = servicos.filter(s => s.status === 'pending');
  const servicosAtivos = servicos.filter(s => s.status === 'in-progress');
  const servicosConcluidos = servicos.filter(s => s.status === 'completed');
  
  const handleCancelarServico = (id: string) => {
    setServicos(servicos.filter(servico => servico.id !== id));
    toast.success('Solicitação de serviço cancelada');
  };
  
  const handleVerDetalhes = (id: string) => {
    navigate(`/servico/${id}`);
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
            <Link to="/solicitar-servico">
              <Button className="button-hover">
                <Plus className="mr-2 h-4 w-4" />
                Solicitar Serviço
              </Button>
            </Link>
            <Link to="/chat-mensagens">
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
              <div className="text-3xl font-bold">{servicosPendentes.length}</div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up [animation-delay:100ms]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Ativos</CardTitle>
              <CardDescription>Serviços em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{servicosAtivos.length}</div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up [animation-delay:200ms]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Concluídos</CardTitle>
              <CardDescription>Serviços já concluídos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{servicosConcluidos.length}</div>
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
            {servicosAtivos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicosAtivos.map((servico) => (
                  <ServiceCard
                    key={servico.id}
                    service={servico}
                    userRole="customer"
                    onViewDetails={handleVerDetalhes}
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
                <Link to="/solicitar-servico" className="mt-4 inline-block">
                  <Button className="button-hover">
                    <Plus className="mr-2 h-4 w-4" />
                    Solicitar Novo Serviço
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {servicosPendentes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicosPendentes.map((servico) => (
                  <ServiceCard
                    key={servico.id}
                    service={servico}
                    userRole="customer"
                    onCancel={handleCancelarServico}
                    onViewDetails={handleVerDetalhes}
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
                <Link to="/solicitar-servico" className="mt-4 inline-block">
                  <Button className="button-hover">
                    <Plus className="mr-2 h-4 w-4" />
                    Solicitar Novo Serviço
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {servicosConcluidos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicosConcluidos.map((servico) => (
                  <ServiceCard
                    key={servico.id}
                    service={servico}
                    userRole="customer"
                    onViewDetails={handleVerDetalhes}
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
                <Link to="/historico-servicos" className="mt-4 inline-block">
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

export default PainelUsuario;
