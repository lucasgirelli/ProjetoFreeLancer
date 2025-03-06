
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { Home, User, Settings, LogOut, MessageCircle, Bell } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Don't show navbar on login/register pages
  if (['/login', '/register'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="w-full border-b border-border bg-background backdrop-blur-sm fixed top-0 z-50 animate-slide-down">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Home className="h-4 w-4" />
              </div>
              <span className="text-lg font-medium">HomeService</span>
            </Link>
          </div>

          {/* Main navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link 
                  to={user.role === 'customer' ? '/user-dashboard' : '/worker-dashboard'} 
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link to="/services" className="text-sm font-medium transition-colors hover:text-primary">
                  Services
                </Link>
                <Link to="/service-history" className="text-sm font-medium transition-colors hover:text-primary">
                  History
                </Link>
              </>
            )}
          </div>

          {/* Right side: auth or user menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="relative rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
                </button>
                
                <button className="relative rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                        <AvatarImage src={user.profilePicture} alt={user.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 animate-fade-in">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="button-hover">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="button-hover">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
