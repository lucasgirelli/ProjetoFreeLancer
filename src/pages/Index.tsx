
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight, Home, Wrench, Paintbrush, Shield, Zap, Users, Star } from 'lucide-react';

const services = [
  { name: 'Plumbing', icon: Wrench, description: 'Fix leaks, toilets, and water heaters' },
  { name: 'Electrical', icon: Zap, description: 'Wiring, lighting, and electrical repairs' },
  { name: 'Painting', icon: Paintbrush, description: 'Interior and exterior painting services' },
  { name: 'Cleaning', icon: Home, description: 'Deep cleaning and regular maintenance' },
];

const features = [
  {
    title: 'Skilled Professionals',
    description: 'Connect with verified experts in your area who have the right skills for your job.',
    icon: Shield,
  },
  {
    title: 'Fast Response',
    description: 'Get quick responses from available professionals ready to take on your project.',
    icon: Zap,
  },
  {
    title: 'Transparent Pricing',
    description: 'See clear pricing upfront with no hidden fees or surprises.',
    icon: Users,
  },
  {
    title: 'Quality Guarantee',
    description: 'All work is backed by our satisfaction guarantee for your peace of mind.',
    icon: Star,
  },
];

const testimonials = [
  {
    quote: "I found a great plumber within minutes. The app is intuitive and the service was outstanding.",
    author: "Sarah Johnson",
    role: "Homeowner",
  },
  {
    quote: "As an electrician, this platform has connected me with consistent work in my area. Highly recommended!",
    author: "Michael Rodriguez",
    role: "Professional Electrician",
  },
  {
    quote: "The quality of professionals on this platform is impressive. My kitchen renovation was completed ahead of schedule.",
    author: "David Chen",
    role: "Apartment Owner",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950" />
        
        <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                Home services, <span className="text-primary">simplified</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
                Connect with skilled local professionals for all your home service needs. From plumbing to painting, we've got you covered.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="button-hover text-base px-8 py-6">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="button-hover text-base px-8 py-6">
                    Browse Services
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in">
              <div className="relative mx-auto max-w-md md:max-w-none">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Home service professional"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Popular Services</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find help with these common home services and more
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.name}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:bg-card/80 transition-all card-hover",
                  index === 0 && "animate-slide-up [animation-delay:100ms]",
                  index === 1 && "animate-slide-up [animation-delay:200ms]",
                  index === 2 && "animate-slide-up [animation-delay:300ms]",
                  index === 3 && "animate-slide-up [animation-delay:400ms]"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">{service.name}</h3>
                <p className="mt-2 text-center text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose HomeService</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We connect homeowners with qualified professionals for outstanding service every time
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={cn(
                  "p-6 rounded-xl border border-border bg-card hover:bg-card/80 transition-all card-hover",
                  index === 0 && "animate-slide-up [animation-delay:200ms]",
                  index === 1 && "animate-slide-up [animation-delay:300ms]",
                  index === 2 && "animate-slide-up [animation-delay:400ms]",
                  index === 3 && "animate-slide-up [animation-delay:500ms]"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from homeowners and professionals who use our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className={cn(
                  "p-6 rounded-xl border border-border bg-card hover:bg-card/80 transition-all card-hover",
                  index === 0 && "animate-slide-up [animation-delay:200ms]",
                  index === 1 && "animate-slide-up [animation-delay:300ms]",
                  index === 2 && "animate-slide-up [animation-delay:400ms]"
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70" />
            
            <div className="relative py-12 md:py-16 px-8 md:px-12 text-white max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
              <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                Join thousands of homeowners and professionals on our platform today.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="button-hover text-base px-8 py-6 bg-white text-primary hover:bg-white/90"
                  >
                    Sign Up Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="button-hover text-base px-8 py-6 border-white text-white hover:bg-white/10"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-12 mt-auto">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Home className="h-4 w-4" />
              </div>
              <span className="ml-2 text-lg font-medium">HomeService</span>
            </div>
            
            <div className="mt-6 md:mt-0">
              <ul className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
                <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/services" className="text-sm hover:text-primary transition-colors">Services</Link></li>
                <li><Link to="/about" className="text-sm hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} HomeService. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
