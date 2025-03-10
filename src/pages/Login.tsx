
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Home, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { user, login, isLoading, logout } = useAuth();

  // Certificar-se de que qualquer sessão existente seja limpa ao carregar a página
  useEffect(() => {
    // Limpar qualquer estado de usuário (mas sem remover do localStorage)
    const clearSession = async () => {
      // Verificamos se há usuário no localStorage, mas não na sessão atual
      const storedUser = localStorage.getItem('user');
      if (storedUser && !user) {
        toast.info('Faça login para continuar', {
          description: 'Por favor insira suas credenciais novamente.'
        });
      }
    };
    
    clearSession();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  // Se o usuário já estiver autenticado, redireciona para o dashboard
  if (user) {
    return <Navigate to={user.role === 'worker' ? '/painel-trabalhador' : '/painel-usuario'} />;
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
          <h2 className="mt-4 text-2xl font-bold text-center">Bem-vindo de volta</h2>
          <p className="mt-1 text-muted-foreground">Acesse sua conta</p>
        </div>
        
        <Card className="border border-border">
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
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
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full button-hover"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
              
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
