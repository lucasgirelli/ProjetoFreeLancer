
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
import { Search, MessagesSquare, Info, History } from 'lucide-react';
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
    status: 'available',
    customerName: 'John Davis',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    skills: ['Plumbing', 'Repairs'],
  },
  {
    id: '2',
    title: 'Electrical Outlet Not Working',
    description: 'Two outlets in the bedroom are not working. Need someone to diagnose and fix the issue.',
    category: 'Electrical',
    location: 'Manhattan, NY',
    date: 'June 12, 2023',
    status: 'available',
    customerName: 'Emily Wright',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    skills: ['Electrical', 'Diagnostics'],
  },
  {
    id: '3',
    title: 'Mounting TV on Wall',
    description: 'Need to mount a 55-inch TV on drywall. All materials provided.',
    category: 'Mounting',
    location: 'Queens, NY',
    date: 'June 15, 2023',
    status: 'available',
    customerName: 'Michael Chen',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    skills: ['Mounting', 'Installation'],
  },
  {
    id: '4',
    title: 'Fix Dishwasher',
    description: 'Dishwasher is not draining properly. Need someone to diagnose and repair.',
    category: 'Appliance Repair',
    location: 'Bronx, NY',
    date: 'June 8, 2023',
    status: 'in-progress',
    customerName: 'Sarah Johnson',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    skills: ['Appliance Repair', 'Plumbing'],
  },
  {
    id: '5',
    title: 'Paint Bedroom',
    description: 'Need to paint a 12x14 bedroom. Walls are in good condition, just need a color change.',
    category: 'Painting',
    location: 'Staten Island, NY',
    date: 'May 20, 2023',
    status: 'completed',
    customerName: 'Robert Taylor',
    customerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    skills: ['Painting', 'Interior'],
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
    toast.success('Service accepted');
  };
  
  const handleRejectService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast.success('Service request passed');
  };
  
  const handleCompleteService = (id: string) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: 'completed' as const } 
        : service
    ));
    toast.success('Service marked as complete');
  };
  
  const handleViewDetails = (id: string) => {
    navigate(`/service/${id}`);
  };
  
  return (
    <div className="min-h-screen pt-16 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="page-container mt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-slide-down">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="mt-1 text-muted-foreground">Manage your service jobs</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link to="/services-available">
              <Button className="button-hover">
                <Search className="mr-2 h-4 w-4" />
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="animate-slide-up">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Available</CardTitle>
              <CardDescription>Service requests you can accept</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{availableServices.length}</div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up [animation-delay:100ms]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Active</CardTitle>
              <CardDescription>Services you're currently working on</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeServices.length}</div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up [animation-delay:200ms]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Completed</CardTitle>
              <CardDescription>Services you've completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedServices.length}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="active" className="animate-fade-in">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
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
                <h3 className="mt-4 text-lg font-medium">No active jobs</h3>
                <p className="mt-2 text-muted-foreground">
                  You don't have any active jobs at the moment.
                </p>
                <Link to="/services-available" className="mt-4 inline-block">
                  <Button className="button-hover">
                    <Search className="mr-2 h-4 w-4" />
                    Find Available Jobs
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
                <h3 className="mt-4 text-lg font-medium">No available jobs</h3>
                <p className="mt-2 text-muted-foreground">
                  There are no jobs matching your skills available right now.
                </p>
                <Button variant="outline" className="mt-4 button-hover" onClick={() => navigate(0)}>
                  Refresh
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
                <h3 className="mt-4 text-lg font-medium">No completed jobs</h3>
                <p className="mt-2 text-muted-foreground">
                  You haven't completed any jobs yet.
                </p>
                <Link to="/service-history" className="mt-4 inline-block">
                  <Button variant="outline" className="button-hover">
                    View Service History
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
