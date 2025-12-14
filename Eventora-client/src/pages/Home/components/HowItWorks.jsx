import { FaSearch, FaCalendarCheck, FaMagic } from "react-icons/fa";
import SectionTitle from "../../../components/shared/SectionTitle";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      icon: <FaSearch />,
      title: "Explore Concepts",
      desc: "Browse our curated portfolio of premium themes, from corporate galas to intimate weddings.",
    },
    {
      id: "02",
      icon: <FaCalendarCheck />,
      title: "Secure Date",
      desc: "Check real-time availability, customize your package with add-ons, and book instantly.",
    },
    {
      id: "03",
      icon: <FaMagic />,
      title: "We Execute",
      desc: "Our expert team handles the logistics and styling while you enjoy your perfectly crafted event.",
    },
  ];

  return (
    <section className="py-24 bg-base-100 relative">
      <div className="container mx-auto px-6">
        <SectionTitle
          heading="How It Works"
          subHeading="Simple 3-Step Process"
          center={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-base-300 z-0"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="relative w-20 h-20 rounded-2xl bg-base-100 border border-base-200 shadow-lg flex items-center justify-center text-3xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:-translate-y-2 mb-8">
                {step.icon}
                
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-xs shadow-md">
                  {step.id}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-serif font-bold mb-3 text-base-content">
                {step.title}
              </h3>
              <p className="text-base-content/60 text-sm leading-relaxed px-4 max-w-xs">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;