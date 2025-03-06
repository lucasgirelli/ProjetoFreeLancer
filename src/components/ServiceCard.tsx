
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'available';
  price?: string;
  customerName?: string;
  customerAvatar?: string;
  workerName?: string;
  workerAvatar?: string;
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

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  userRole,
  onAccept,
  onReject,
  onCancel,
  onComplete,
  onViewDetails,
}) => {
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'available': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <Card className="overflow-hidden card-hover transition-all duration-300 border border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
            <CardDescription className="mt-1">{service.category}</CardDescription>
          </div>
          <Badge className={`${statusColors[service.status]} animate-fade-in`}>
            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 space-y-4">
        <p className="text-sm text-card-foreground">{service.description}</p>
        
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPinIcon className="h-4 w-4 mr-2" />
            <span>{service.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{service.date}</span>
          </div>
          
          {service.price && (
            <div className="flex items-center text-sm font-medium">
              <span className="text-primary">{service.price}</span>
            </div>
          )}
        </div>
        
        {service.skills && service.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {service.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Show customer or worker info depending on the role */}
        {userRole === 'worker' && service.customerName && (
          <div className="flex items-center space-x-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={service.customerAvatar} alt={service.customerName} />
              <AvatarFallback>{service.customerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Posted by <span className="font-medium text-card-foreground">{service.customerName}</span>
            </span>
          </div>
        )}
        
        {userRole === 'customer' && service.workerName && (
          <div className="flex items-center space-x-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={service.workerAvatar} alt={service.workerName} />
              <AvatarFallback>{service.workerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Assigned to <span className="font-medium text-card-foreground">{service.workerName}</span>
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onViewDetails && onViewDetails(service.id)}
          className="button-hover text-muted-foreground hover:text-foreground"
        >
          View details
        </Button>
        
        <div className="flex space-x-2">
          {userRole === 'worker' && service.status === 'available' && (
            <>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => onAccept && onAccept(service.id)}
                className="button-hover"
              >
                Accept
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onReject && onReject(service.id)}
                className="button-hover"
              >
                Pass
              </Button>
            </>
          )}
          
          {userRole === 'customer' && service.status === 'pending' && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onCancel && onCancel(service.id)}
              className="button-hover text-destructive hover:text-destructive-foreground"
            >
              Cancel
            </Button>
          )}
          
          {userRole === 'worker' && service.status === 'in-progress' && (
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onComplete && onComplete(service.id)}
              className="button-hover"
            >
              Mark Complete
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
