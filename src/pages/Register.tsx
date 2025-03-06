
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Home, Eye, EyeOff, User, Briefcase } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/context/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const { user, register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password, role);
  };

  if (user) {
    return <Navigate to={user.role === 'worker' ? '/worker-dashboard' : '/user-dashboard'} />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Home className="h-5 w-5" />
            </div>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-center">Create your account</h2>
          <p className="mt-1 text-muted-foreground">Join our home services marketplace</p>
        </div>
        
        <Card className="border border-border">
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
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
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full"
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
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
                <Label>I am a</Label>
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
                    <span className="text-sm font-medium">Customer</span>
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
                    <span className="text-sm font-medium">Service Provider</span>
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
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
              
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
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
