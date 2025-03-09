
import React, { useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StarRating from '@/components/StarRating';
import { ArrowLeft, Send, Star, User } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const WorkerRatings: React.FC = () => {
  const { user, getRatingsForWorker, saveRating, getUserRatings } = useAuth();
  const { workerId } = useParams<{ workerId: string }>();
  const navigate = useNavigate();
  
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [serviceId, setServiceId] = useState('');
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!workerId) {
    return <Navigate to="/user-dashboard" />;
  }
  
  // Buscar dados do trabalhador (em uma aplicação real, isso seria uma chamada de API)
  const worker = {
    id: workerId,
    name: 'Jane Smith',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
  };
  
  // Buscar avaliações para este trabalhador
  const workerRatings = getRatingsForWorker(workerId);
  
  // Buscar avaliações feitas pelo usuário atual
  const myRatings = getUserRatings();
  
  // Calcular média das avaliações
  const averageRating = workerRatings.length > 0
    ? workerRatings.reduce((acc, r) => acc + r.stars, 0) / workerRatings.length
    : 0;
  
  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (stars === 0) {
      return;
    }
    
    saveRating({
      workerId,
      customerId: user.id,
      serviceId: serviceId || '1', // Em uma aplicação real, seria um ID válido
      stars,
      comment,
    });
    
    // Limpar o formulário
    setStars(0);
    setComment('');
    setServiceId('');
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div className="min-h-screen pt-16 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
          <h1 className="text-3xl font-bold">Avaliações</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Perfil do trabalhador */}
          <Card className="md:col-span-1 animate-fade-in">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-2">
                <AvatarImage src={worker.profilePicture} alt={worker.name} />
                <AvatarFallback className="text-2xl">
                  {worker.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{worker.name}</CardTitle>
              <div className="flex justify-center items-center mt-2">
                <StarRating value={averageRating} readOnly />
                <span className="ml-2 text-muted-foreground">
                  {averageRating.toFixed(1)} ({workerRatings.length})
                </span>
              </div>
            </CardHeader>
          </Card>
          
          {/* Tabs de avaliações */}
          <div className="md:col-span-2">
            <Tabs defaultValue="avaliar" className="animate-fade-in">
              <TabsList className="mb-6 w-full md:w-auto">
                <TabsTrigger value="avaliar">Avaliar</TabsTrigger>
                <TabsTrigger value="avaliacoes">
                  Todas as Avaliações ({workerRatings.length})
                </TabsTrigger>
                <TabsTrigger value="minhas">
                  Minhas Avaliações ({myRatings.filter(r => r.workerId === workerId).length})
                </TabsTrigger>
              </TabsList>
              
              {/* Tab de enviar avaliação */}
              <TabsContent value="avaliar">
                <Card>
                  <form onSubmit={handleSubmitRating}>
                    <CardHeader>
                      <CardTitle>Avalie o profissional</CardTitle>
                      <CardDescription>
                        Compartilhe sua experiência para ajudar outros clientes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="text-center mb-2">
                          <p className="text-muted-foreground mb-1">Selecione uma avaliação</p>
                          <StarRating 
                            value={stars} 
                            onChange={setStars} 
                            size="lg"
                          />
                          <p className="mt-2 text-sm font-medium text-muted-foreground">
                            {stars === 1 && "Ruim"}
                            {stars === 2 && "Regular"}
                            {stars === 3 && "Bom"}
                            {stars === 4 && "Muito bom"}
                            {stars === 5 && "Excelente"}
                          </p>
                        </div>
                        
                        <div className="w-full">
                          <Textarea
                            placeholder="Descreva sua experiência com este profissional..."
                            className="min-h-32"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button 
                        type="submit" 
                        disabled={stars === 0}
                        className="button-hover"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Avaliação
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              {/* Tab de todas as avaliações */}
              <TabsContent value="avaliacoes">
                {workerRatings.length > 0 ? (
                  <div className="space-y-4">
                    {workerRatings.map((rating) => (
                      <Card key={rating.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                {rating.customerAvatar ? (
                                  <AvatarImage src={rating.customerAvatar} alt={rating.customerName} />
                                ) : (
                                  <AvatarFallback>
                                    <User className="h-5 w-5" />
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">{rating.customerName}</CardTitle>
                                <CardDescription className="text-xs">
                                  {formatDate(rating.date)}
                                </CardDescription>
                              </div>
                            </div>
                            <StarRating value={rating.stars} readOnly size="sm" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{rating.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Nenhuma avaliação</CardTitle>
                      <CardDescription>
                        Este profissional ainda não possui avaliações.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </TabsContent>
              
              {/* Tab de minhas avaliações */}
              <TabsContent value="minhas">
                {myRatings.filter(r => r.workerId === workerId).length > 0 ? (
                  <div className="space-y-4">
                    {myRatings
                      .filter(r => r.workerId === workerId)
                      .map((rating) => (
                        <Card key={rating.id}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div>
                                  <CardTitle className="text-base">Sua avaliação</CardTitle>
                                  <CardDescription className="text-xs">
                                    {formatDate(rating.date)}
                                  </CardDescription>
                                </div>
                              </div>
                              <StarRating value={rating.stars} readOnly size="sm" />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{rating.comment}</p>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Nenhuma avaliação</CardTitle>
                      <CardDescription>
                        Você ainda não avaliou este profissional.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerRatings;
