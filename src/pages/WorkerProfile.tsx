
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ProfileForm from '@/components/ProfileForm';

const WorkerProfile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'worker') {
    return <Navigate to="/user-dashboard" />;
  }
  
  const handleSave = (data: Partial<typeof user>) => {
    updateUserProfile({
      ...data,
      profileComplete: true,
    });
    
    // Redirect to the worker dashboard after profile is saved
    navigate('/worker-dashboard');
  };
  
  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="page-container mt-12">
        <div className="max-w-3xl mx-auto text-center mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold">Complete Your Profile</h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Let customers know about your skills and expertise
          </p>
        </div>
        
        <ProfileForm user={user} onSave={handleSave} isWorker={true} />
      </div>
    </div>
  );
};

export default WorkerProfile;
