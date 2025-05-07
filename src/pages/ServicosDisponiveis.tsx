
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import ServiceCard, { ServiceData } from '@/components/ServiceCard';

// Dados simulados
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
    skills: ['Encanamento', 'Reparos'],
  },
  {
    id: '2',
    title: 'Tomada Elétrica com Problema',
    description: 'Duas tomadas no quarto não estão funcionando. Preciso de alguém para diagnosticar e consertar.',
    category: 'Elétrica',
    location: 'Rio de Janeiro, RJ',
    date: '12 de Junho, 2023',
    status: 'available',
    customerName: 'Maria Souza',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    skills: ['Elétrica', 'Diagnósticos'],
  },
  {
    id: '3',
    title: 'Instalação de TV na Parede',
    description: 'Preciso instalar uma TV de 55 polegadas na parede de drywall. Todos os materiais fornecidos.',
    category: 'Montagem',
    location: 'Belo Horizonte, MG',
    date: '15 de Junho, 2023',
    status: 'available',
    customerName: 'Carlos Oliveira',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    skills: ['Montagem', 'Instalação'],
  },
  {
    id: '4',
    title: 'Consertar Máquina de Lavar',
    description: 'A máquina de lavar não está drenando corretamente. Preciso de alguém para diagnosticar e reparar.',
    category: 'Reparo de Eletrodomésticos',
    location: 'Fortaleza, CE',
    date: '8 de Junho, 2023',
    status: 'available',
    customerName: 'Ana Santos',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    skills: ['Reparo de Eletrodomésticos', 'Encanamento'],
  },
  {
    id: '5',
    title: 'Pintar Quarto',
    description: 'Preciso pintar um quarto de 12x14. As paredes estão em bom estado, apenas preciso mudar a cor.',
    category: 'Pintura',
    location: 'Salvador, BA',
    date: '20 de Maio, 2023',
    status: 'available',
    customerName: 'Roberto Pereira',
    customerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    skills: ['Pintura', 'Interior'],
  },
];

const categories = [
  'Todas categorias',
  'Encanamento',
  'Elétrica',
  'Pintura',
  'Montagem',
  'Carpintaria',
  'Jardinagem',
  'Limpeza',
  'Reparo de Eletrodomésticos',
];

const ServicosDisponiveis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas categorias');
  const [services, setServices] = useState(mockServices);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'worker') {
    return <Navigate to="/painel-usuario" />;
  }
  
  // Filtrar serviços com base na pesquisa e categoria
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todas categorias' || 
                           service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleAcceptService = (id: string) => {
    // Atualiza o estado para marcar o serviço como aceito (em andamento)
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: 'in-progress' as const } 
        : service
    ));
    console.log('Serviço aceito:', id);
    toast.success('Serviço aceito com sucesso!');
  };
  
  const handleRejectService = (id: string) => {
    // Remove o serviço da lista de serviços disponíveis
    setServices(services.filter(service => service.id !== id));
    console.log('Serviço rejeitado:', id);
    toast.success('Serviço rejeitado.');
  };
  
  const handleViewDetails = (id: string) => {
    // Redireciona para a página de detalhes do serviço
    navigate(`/servico/${id}`);
    console.log('Visualizando detalhes:', id);
  };
  
  return (
    <div className="min-h-screen pt-16 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="page-container mt-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={() => navigate('/painel-trabalhador')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold">Serviços Disponíveis</h1>
            <p className="mt-1 text-muted-foreground">Encontre trabalhos que combinam com suas habilidades</p>
          </div>
        </div>
        
        <Card className="mb-6 animate-fade-in">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="md:col-span-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                userRole="worker"
                onAccept={handleAcceptService}
                onReject={handleRejectService}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">
                Nenhum serviço encontrado com os filtros atuais.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicosDisponiveis;
