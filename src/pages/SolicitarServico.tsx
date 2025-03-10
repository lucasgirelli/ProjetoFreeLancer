import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

const serviceCategories = [
  { id: 'plumbing', name: 'Encanamento' },
  { id: 'electrical', name: 'Elétrica' },
  { id: 'cleaning', name: 'Limpeza' },
  { id: 'painting', name: 'Pintura' },
  { id: 'carpentry', name: 'Carpintaria' },
  { id: 'appliance', name: 'Reparo de Eletrodomésticos' },
  { id: 'landscaping', name: 'Jardinagem' },
  { id: 'mounting', name: 'Montagem e Instalação' },
];

const SolicitarServico: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(user?.location || '');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'customer') {
    return <Navigate to="/painel-trabalhador" />;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Solicitação de serviço enviada com sucesso');
      navigate('/painel-usuario');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen pt-16 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="page-container mt-8">
        <Button 
          variant="ghost" 
          className="mb-6 button-hover"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Solicitar um Serviço</h1>
            <p className="mt-2 text-muted-foreground">
              Diga-nos com o que você precisa de ajuda
            </p>
          </div>
          
          <Card className="border border-border">
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6 space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">Título do Serviço</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ex.: Consertar Torneira com Vazamento"
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={category}
                    onValueChange={setCategory}
                    required
                  >
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorias</SelectLabel>
                        {serviceCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva o serviço que você precisa em detalhes..."
                    required
                    className="w-full min-h-[120px]"
                  />
                </div>
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Seu endereço"
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="date">Data Preferencial</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP', { locale: ptBR }) : <span>Escolha uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={ptBR}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="button-hover"
                  onClick={() => navigate(-1)}
                  disabled={submitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="button-hover"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Enviar Solicitação
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SolicitarServico;
