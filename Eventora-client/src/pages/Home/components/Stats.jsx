import CountUp from "react-countup";
import { motion } from "framer-motion";

const Stats = () => {
  const statsData = [
    { label: "Successful Events", value: 450, suffix: "+" },
    { label: "Corporate Partners", value: 120, suffix: "" },
    { label: "Client Satisfaction", value: 99, suffix: "%" },
    { label: "Design Awards", value: 15, suffix: "" },
  ];

  return (
    // Changed background to bg-primary for a bold look
    <section className="py-20 bg-primary text-primary-content relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 gap-x-2">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex flex-col items-center justify-center text-center ${
                idx !== statsData.length - 1
                  ? "md:border-r border-white/10"
                  : ""
              }`}
            >
              <h3 className="text-4xl lg:text-5xl font-serif font-bold mb-2">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
                <span className="text-secondary ml-1">{stat.suffix}</span>
              </h3>
              <p className="text-xs lg:text-sm font-sans font-bold uppercase tracking-widest opacity-70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Stats;