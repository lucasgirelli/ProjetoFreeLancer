
import React from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ProfileForm from '@/components/ProfileForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PerfilTrabalhador: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'worker') {
    return <Navigate to="/painel-usuario" />;
  }
  
  const handleSave = (data: Partial<typeof user>) => {
    updateUserProfile({
      ...data,
      profileComplete: true,
    });
    
    // Redirecionar para o painel do trabalhador após salvar o perfil
    navigate('/painel-trabalhador');
  };
  
  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="page-container mt-12">
        <div className="max-w-3xl mx-auto mb-8 animate-slide-down">
          <div className="flex justify-between items-center mb-6">
            <Link to="/painel-trabalhador" className="text-primary hover:text-primary/80 transition-colors">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao painel
              </Button>
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-center">Complete Seu Perfil</h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-center">
            Deixe os clientes conhecerem suas habilidades e experiência
          </p>
        </div>
        
        <ProfileForm user={user} onSave={handleSave} isWorker={true} />
      </div>
    </div>
  );
};

export default PerfilTrabalhador;
