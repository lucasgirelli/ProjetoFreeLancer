
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Home, Eye, EyeOff, User, Briefcase, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/context/AuthContext';
import { toast } from 'sonner';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const { user, register, isLoading, logout } = useAuth();

  // Certificar-se de que qualquer sessão existente seja limpa ao carregar a página
  useEffect(() => {
    // Limpar qualquer estado de usuário (mas sem remover do localStorage)
    const clearSession = async () => {
      // Verificamos se há usuário no localStorage, mas não na sessão atual
      const storedUser = localStorage.getItem('user');
      if (storedUser && !user) {
        toast.info('Crie uma nova conta', {
          description: 'Complete o formulário para se cadastrar.'
        });
      }
    };
    
    clearSession();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Forçar logout antes de registrar para garantir que não haja sessão ativa
    logout();
    // Registrar novo usuário
    await register(name, email, password, role);
  };

  if (user) {
    return <Navigate to={user.role === 'worker' ? '/worker-dashboard' : '/user-dashboard'} />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center relative">
          {/* Botão para voltar à página inicial */}
          <Link to="/" className="absolute left-0 top-0 text-primary hover:text-primary/80 transition-colors">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
          
          <Link to="/" className="inline-flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Home className="h-5 w-5" />
            </div>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-center">Crie sua conta</h2>
          <p className="mt-1 text-muted-foreground">Entre para nosso marketplace de serviços domésticos</p>
        </div>
        
        <Card className="border border-border">
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="w-full"
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full"
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label>Eu sou um</Label>
                <RadioGroup 
                  value={role} 
                  onValueChange={(value) => setRole(value as UserRole)}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <Label
                    htmlFor="customer"
                    className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-muted transition-colors cursor-pointer ${
                      role === 'customer' ? 'border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem
                      value="customer"
                      id="customer"
                      className="sr-only"
                    />
                    <User className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Cliente</span>
                  </Label>
                  
                  <Label
                    htmlFor="worker"
                    className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-muted transition-colors cursor-pointer ${
                      role === 'worker' ? 'border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem
                      value="worker"
                      id="worker"
                      className="sr-only"
                    />
                    <Briefcase className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Prestador de Serviços</span>
                  </Label>
                </RadioGroup>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full button-hover"
                disabled={isLoading}
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
              
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Entrar
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
