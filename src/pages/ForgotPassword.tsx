
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Home, ArrowLeft, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular envio de email
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success('Email de recuperação enviado!', {
        description: `Verifique sua caixa de entrada (${email}) para instruções de redefinição de senha.`
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center relative">
          {/* Botão para voltar à página de login */}
          <Link to="/login" className="absolute left-0 top-0 text-primary hover:text-primary/80 transition-colors">
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
          <h2 className="mt-4 text-2xl font-bold text-center">Esqueceu sua senha?</h2>
          <p className="mt-1 text-muted-foreground">
            {isSuccess 
              ? "Verifique seu email para instruções de redefinição de senha" 
              : "Enviaremos um link para redefinir sua senha"}
          </p>
        </div>
        
        <Card className="border border-border">
          {isSuccess ? (
            <div className="py-10 px-6 text-center">
              <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email enviado com sucesso!</h3>
              <p className="text-muted-foreground mb-6">
                Enviamos instruções para redefinir sua senha para:<br />
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <div className="space-y-3">
                <Link to="/login" className="w-full inline-block">
                  <Button className="w-full button-hover">
                    Voltar para o Login
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setIsSuccess(false)}
                >
                  Tentar com outro email
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6 space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nome@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="w-full pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Digite o email associado à sua conta para receber um link de redefinição de senha.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full button-hover"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar instruções"
                  )}
                </Button>
                
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Lembrou sua senha?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Voltar ao login
                  </Link>
                </p>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
