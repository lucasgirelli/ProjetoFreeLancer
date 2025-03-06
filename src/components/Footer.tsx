
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sidebar border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Home Service Link</h3>
            <p className="text-muted-foreground">
              Conectando você aos melhores profissionais para seus serviços domésticos.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Encanamento</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Elétrica</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Pintura</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Reparos Gerais</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Sobre nós</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Como funciona</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Política de privacidade</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Termos de uso</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">contato@homeservicelink.com</li>
              <li className="text-muted-foreground">(00) 1234-5678</li>
              <li className="flex items-center space-x-4 mt-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Home Service Link. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
