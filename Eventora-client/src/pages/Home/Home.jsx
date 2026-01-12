import { useEffect } from "react";
import { Link } from "react-router";
import Hero from "./components/Hero";
import ServiceMap from "./components/ServiceMap";
import TopDecorators from "./components/TopDecorators";
import Stats from "./components/Stats";
import FeaturedServices from "./components/FeaturedServices";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Subscription from "./components/Subscription";
// New Imports
import FAQ from "./components/FAQ";
import LatestNews from "./components/LatestNews";

const Home = () => {
  useEffect(() => {
    document.title = "Eventora | Modern Event Solutions";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Stats Section */}
      <Stats />

      {/* 3. Featured Services */}
      <FeaturedServices />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Top Decorators */}
      <TopDecorators />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Latest News (NEW) */}
      <LatestNews />

      {/* 8. Subscription / CTA */}
      <Subscription />

      {/* 9. FAQ (NEW) */}
      <FAQ />

      {/* 10. LatestNews (NEW) */}
      <LatestNews />

      {/* 11. Service Map */}
      <ServiceMap />
    </div>
  );
};

export default Home;
