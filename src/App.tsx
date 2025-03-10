
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import HomeButton from "@/components/HomeButton";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";
import PaginaInicial from "./pages/PaginaInicial";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PainelUsuario from "./pages/PainelUsuario";
import PainelTrabalhador from "./pages/PainelTrabalhador";
import PerfilTrabalhador from "./pages/PerfilTrabalhador";
import SolicitarServico from "./pages/SolicitarServico";
import ServicosDisponiveis from "./pages/ServicosDisponiveis";
import AvaliacoesTrabalhador from "./pages/AvaliacoesTrabalhador";
import ChatMensagens from "./pages/ChatMensagens";
import ForgotPassword from "./pages/ForgotPassword";

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
            <Route path="/" element={<PaginaInicial />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/painel-usuario" element={<PainelUsuario />} />
            <Route path="/painel-trabalhador" element={<PainelTrabalhador />} />
            <Route path="/perfil-trabalhador" element={<PerfilTrabalhador />} />
            <Route path="/solicitar-servico" element={<SolicitarServico />} />
            <Route path="/servicos-disponiveis" element={<ServicosDisponiveis />} />
            <Route path="/avaliacoes-trabalhador/:workerId" element={<AvaliacoesTrabalhador />} />
            <Route path="/chat-mensagens" element={<ChatMensagens />} />
            <Route path="/chat-mensagens/:chatId" element={<ChatMensagens />} />
            {/* Rota de fallback para redirecionamento */}
            <Route path="/index" element={<Navigate to="/" replace />} />
            <Route path="/servico/:id" element={<SolicitarServico />} />
            
            {/* Rotas legadas para compatibilidade */}
            <Route path="/user-dashboard" element={<Navigate to="/painel-usuario" replace />} />
            <Route path="/worker-dashboard" element={<Navigate to="/painel-trabalhador" replace />} />
            <Route path="/worker-profile" element={<Navigate to="/perfil-trabalhador" replace />} />
            <Route path="/service-request" element={<Navigate to="/solicitar-servico" replace />} />
            <Route path="/services-available" element={<Navigate to="/servicos-disponiveis" replace />} />
            <Route path="/worker-ratings/:workerId" element={<Navigate to={`/avaliacoes-trabalhador/:workerId`} replace />} />
            <Route path="/chat" element={<Navigate to="/chat-mensagens" replace />} />
            <Route path="/chat/:chatId" element={<Navigate to="/chat-mensagens/:chatId" replace />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<PaginaNaoEncontrada />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
