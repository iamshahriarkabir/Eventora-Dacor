import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../../../components/ServiceCard";
import SectionTitle from "../../../components/shared/SectionTitle";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const FeaturedServices = () => {
  const { data: services = [] } = useQuery({
    queryKey: ["featured-services"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/services?limit=4`
      );
      return Array.isArray(res.data) ? res.data : res.data.services || [];
    },
  });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-base-100 relative">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-base-200/30 -skew-y-2 z-0 origin-top-left transform scale-110"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <SectionTitle
              heading="Trending Collections"
              subHeading="Curated Packages"
              center={false}
            />
          </div>
          
          <Link
            to="/services"
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl border border-base-300 hover:border-primary hover:text-primary transition-all font-semibold text-sm group"
          >
            View All Packages
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid Area */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service._id}
              variants={cardVariants}
              className="h-full"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            to="/services"
            className="btn btn-outline w-full rounded-xl border-base-300"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
};
export default FeaturedServices;