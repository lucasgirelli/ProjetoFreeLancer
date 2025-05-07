
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, ArrowLeft, MessageSquare, Star } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { ServiceData } from '@/components/ServiceCard';
import { toast } from 'sonner';

// Dados fictícios para simulação
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

const statusLabels = {
  pending: 'Pendente',
  'in-progress': 'Em Andamento',
  completed: 'Concluído',
  available: 'Disponível',
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  available: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
};

const DetalhesServico: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [servico, setServico] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Em uma aplicação real, isso seria uma chamada de API
      const servicoEncontrado = servicosFicticios.find(s => s.id === id);
      setServico(servicoEncontrado || null);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando detalhes do serviço...</p>
      </div>
    );
  }

  if (!servico) {
    return (
      <div className="min-h-screen pt-16 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="page-container mt-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6 pb-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Serviço não encontrado</h2>
                <p className="text-muted-foreground">O serviço que você está procurando não existe ou foi removido.</p>
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/painel-usuario')}
                >
                  Voltar ao Painel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="page-container mt-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <Badge className={statusColors[servico.status]}>
                  {statusLabels[servico.status]}
                </Badge>
                <CardTitle className="text-2xl mt-2">{servico.title}</CardTitle>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2 mt-2">
              <p className="text-muted-foreground">{servico.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{servico.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{servico.date}</span>
                </div>
                
                <div className="flex items-center">
                  <Badge variant="outline" className="text-xs">
                    {servico.category}
                  </Badge>
                </div>
              </div>
            </div>
            
            {servico.workerName && (
              <Card className="border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Prestador de Serviço</CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center">
                    <Avatar className="h-16 w-16 mr-4">
                      {servico.workerAvatar ? (
                        <AvatarImage src={servico.workerAvatar} alt={servico.workerName} />
                      ) : (
                        <AvatarFallback>
                          <User className="h-8 w-8" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div>
                      <h3 className="text-xl font-semibold">{servico.workerName}</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 mr-1" />
                        <span className="ml-1">4.0</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    {servico.workerId && user?.role === 'customer' && (
                      <Link to={`/avaliacoes-trabalhador/${servico.workerId}`}>
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-1" />
                          Ver Avaliações
                        </Button>
                      </Link>
                    )}
                    
                    {servico.workerId && user?.role === 'customer' && (
                      <Link to={`/chat-mensagens/${servico.workerId}`}>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Enviar Mensagem
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="ghost"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              
              {servico.status === 'pending' && user?.role === 'customer' && (
                <Button 
                  variant="destructive"
                  onClick={() => {
                    toast.success('Solicitação de serviço cancelada');
                    navigate('/painel-usuario');
                  }}
                >
                  Cancelar Solicitação
                </Button>
              )}
              
              {servico.status === 'completed' && servico.workerId && user?.role === 'customer' && (
                <Link to={`/avaliacoes-trabalhador/${servico.workerId}`}>
                  <Button>
                    <Star className="mr-2 h-4 w-4" />
                    Avaliar Serviço
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetalhesServico;
