
import { Search, Calendar, Star, MessageSquare } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Encontre o serviço",
      description: "Busque pelo tipo de serviço que você precisa e encontre profissionais qualificados.",
    },
    {
      icon: MessageSquare,
      title: "Entre em contato",
      description: "Converse diretamente com o profissional para discutir detalhes e preços.",
    },
    {
      icon: Calendar,
      title: "Agende o serviço",
      description: "Escolha uma data e horário convenientes para a realização do serviço.",
    },
    {
      icon: Star,
      title: "Avalie o trabalho",
      description: "Após a conclusão, avalie a qualidade do serviço para ajudar outros usuários.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">Como Funciona</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Nossa plataforma conecta você a profissionais confiáveis em apenas alguns passos simples
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="h-0.5 w-8 bg-border"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
