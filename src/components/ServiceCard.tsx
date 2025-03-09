
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  MessageSquare,
  Banknote,
  MapPin,
  Calendar,
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye,
  User,
} from 'lucide-react';

// Definição dos tipos
export interface ServiceData {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'available';
  // Dados do trabalhador (se o serviço tiver sido aceito)
  workerName?: string;
  workerAvatar?: string;
  workerId?: string;
  // Dados do cliente (para trabalhadores verem)
  customerName?: string;
  customerAvatar?: string;
  customerId?: string;
  // Skills requeridas (para corresponder com as habilidades do trabalhador)
  skills?: string[];
}

interface ServiceCardProps {
  service: ServiceData;
  userRole: 'customer' | 'worker';
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onCancel?: (id: string) => void;
  onComplete?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

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

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  userRole,
  onAccept,
  onReject,
  onCancel,
  onComplete,
  onViewDetails,
}) => {
  // Determinando se é para exibir o trabalhador ou o cliente
  const showPerson = userRole === 'customer' ? service.workerName : service.customerName;
  const personAvatar = userRole === 'customer' ? service.workerAvatar : service.customerAvatar;
  const personId = userRole === 'customer' ? service.workerId : service.customerId;
  
  return (
    <Card className="transition-all hover:shadow-md border border-border animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{service.title}</CardTitle>
          <Badge className={statusColors[service.status]}>
            {statusLabels[service.status]}
          </Badge>
        </div>
        
        <CardDescription className="line-clamp-2">{service.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-3">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {service.location}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {service.date}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Banknote className="h-4 w-4 mr-1" />
            A combinar
          </div>
        </div>
        
        {/* Pessoa associada */}
        {showPerson && service.status !== 'pending' && service.status !== 'available' && (
          <div className="border-t pt-3">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                {personAvatar ? (
                  <AvatarImage src={personAvatar} alt={showPerson} />
                ) : (
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <span className="text-sm font-medium block">
                  {userRole === 'customer' ? 'Prestador:' : 'Cliente:'}
                </span>
                <span className="text-xs text-muted-foreground">{showPerson}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Skills (para serviços disponíveis) */}
        {service.skills && service.skills.length > 0 && service.status === 'available' && (
          <div className="border-t pt-3">
            <span className="text-sm font-medium block mb-2">Habilidades necessárias:</span>
            <div className="flex flex-wrap gap-1">
              {service.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 pt-0">
        {/* Botões para cliente */}
        {userRole === 'customer' && (
          <>
            {service.status === 'pending' && onCancel && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-destructive text-destructive hover:bg-destructive/10 button-hover"
                onClick={() => onCancel(service.id)}
              >
                Cancelar
              </Button>
            )}
            
            {service.status === 'in-progress' && service.workerId && (
              <Link to={`/chat/${service.workerId}`}>
                <Button variant="outline" size="sm" className="button-hover">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Mensagem
                </Button>
              </Link>
            )}
            
            {service.status === 'completed' && service.workerId && (
              <Link to={`/worker-ratings/${service.workerId}`}>
                <Button variant="outline" size="sm" className="button-hover">
                  <Star className="h-4 w-4 mr-1" />
                  Avaliar
                </Button>
              </Link>
            )}
            
            {onViewDetails && (
              <Button 
                variant="default" 
                size="sm"
                className="ml-auto button-hover"
                onClick={() => onViewDetails(service.id)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver Detalhes
              </Button>
            )}
          </>
        )}
        
        {/* Botões para trabalhador */}
        {userRole === 'worker' && (
          <>
            {service.status === 'available' && (
              <>
                {onAccept && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-green-500 text-green-500 hover:bg-green-500/10 button-hover"
                    onClick={() => onAccept(service.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Aceitar
                  </Button>
                )}
                
                {onReject && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-destructive text-destructive hover:bg-destructive/10 button-hover"
                    onClick={() => onReject(service.id)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Recusar
                  </Button>
                )}
              </>
            )}
            
            {service.status === 'in-progress' && (
              <>
                {service.customerId && (
                  <Link to={`/chat/${service.customerId}`}>
                    <Button variant="outline" size="sm" className="button-hover">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Mensagem
                    </Button>
                  </Link>
                )}
                
                {onComplete && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-green-500 text-green-500 hover:bg-green-500/10 button-hover"
                    onClick={() => onComplete(service.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Marcar Concluído
                  </Button>
                )}
              </>
            )}
            
            {onViewDetails && (
              <Button 
                variant="default" 
                size="sm"
                className="ml-auto button-hover"
                onClick={() => onViewDetails(service.id)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver Detalhes
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
