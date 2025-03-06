
import { Wrench, Paintbrush, Zap, Droplet, Hammer, ThermometerSnowflake } from "lucide-react";
import CategoryCard from "./CategoryCard";

const FeaturedServices = () => {
  const categories = [
    {
      title: "Encanamento",
      description: "Consertos, instalações e manutenção de sistemas hidráulicos.",
      icon: Droplet,
    },
    {
      title: "Elétrica",
      description: "Instalações elétricas, reparos e manutenção.",
      icon: Zap,
    },
    {
      title: "Pintura",
      description: "Pintura de interiores e exteriores com qualidade profissional.",
      icon: Paintbrush,
    },
    {
      title: "Reparos Gerais",
      description: "Diversos tipos de reparos e manutenções domésticas.",
      icon: Wrench,
    },
    {
      title: "Carpintaria",
      description: "Montagem e reparo de móveis e estruturas de madeira.",
      icon: Hammer,
    },
    {
      title: "Refrigeração",
      description: "Instalação e manutenção de ar-condicionado e refrigeração.",
      icon: ThermometerSnowflake,
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Serviços Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
