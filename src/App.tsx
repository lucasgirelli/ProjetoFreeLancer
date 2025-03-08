
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import HomeButton from "@/components/HomeButton";
import NotFound from "./pages/NotFound";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerProfile from "./pages/WorkerProfile";
import ServiceRequest from "./pages/ServiceRequest";
import ServicesAvailable from "./pages/ServicesAvailable";
import WorkerRatings from "./pages/WorkerRatings";
import Chat from "./pages/Chat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <HomeButton />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/worker-dashboard" element={<WorkerDashboard />} />
            <Route path="/worker-profile" element={<WorkerProfile />} />
            <Route path="/service-request" element={<ServiceRequest />} />
            <Route path="/services-available" element={<ServicesAvailable />} />
            <Route path="/worker-ratings/:workerId" element={<WorkerRatings />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            {/* Rota de fallback para redirecionamento */}
            <Route path="/index" element={<Navigate to="/" replace />} />
            <Route path="/service/:id" element={<ServiceRequest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
