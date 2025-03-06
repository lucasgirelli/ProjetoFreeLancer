
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mariana Silva",
      role: "Cliente",
      content: "Encontrei um eletricista excelente que resolveu um problema que eu tinha há meses. Serviço rápido e profissional!",
      rating: 5,
      avatar: "MS",
    },
    {
      name: "Carlos Santos",
      role: "Cliente",
      content: "A plataforma é muito fácil de usar. Em menos de um dia já tinha um encanador em casa resolvendo meu problema.",
      rating: 5,
      avatar: "CS",
    },
    {
      name: "Rafael Oliveira",
      role: "Prestador de Serviços",
      content: "Desde que me cadastrei como prestador, minha agenda está sempre cheia. A plataforma conecta exatamente o tipo de cliente que precisa dos meus serviços.",
      rating: 4,
      avatar: "RO",
    },
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">O que nossos usuários dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
