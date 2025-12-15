import { useEffect } from "react";
import Hero from "./components/Hero";
import ServiceMap from "./components/ServiceMap";
import TopDecorators from "./components/TopDecorators";
import { Link } from "react-router";
import Stats from "./components/Stats";
import FeaturedServices from "./components/FeaturedServices";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Subscription from "./components/Subscription";

const Home = () => {
  useEffect(() => {
    document.title = "Eventora | Modern Event Solutions";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Stats />
      <FeaturedServices />
      <HowItWorks />
      <TopDecorators />
      <Testimonials />
      <Subscription />
      <ServiceMap />
    </div>
  );
};
export default Home;
