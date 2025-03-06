
import Hero from "@/components/Hero";
import FeaturedServices from "@/components/FeaturedServices";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const IndexPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <FeaturedServices />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default IndexPage;
