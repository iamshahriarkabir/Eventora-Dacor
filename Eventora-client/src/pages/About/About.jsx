import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import SectionTitle from "../../components/shared/SectionTitle";
import { FaAward, FaUsers, FaSmile } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    document.title = "Eventora | Who We Are";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-base-100 min-h-screen pt-24 overflow-hidden">
      
      {/* 1. HERO SECTION (Minimalist) */}
      <div className="container mx-auto px-6 mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-6 bg-primary/10 inline-block px-4 py-2 rounded-full">
            Since 2024
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-base-content leading-tight mb-8">
            Designing Moments <br />

            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                  Creating Memories.
                </span>
            
          </h1>
          <p className="text-xl text-base-content/70 leading-relaxed font-light">
            Eventora is not just a decoration company. We are architects of atmosphere, 
            blending modern aesthetics with emotional intelligence.
          </p>
        </motion.div>
      </div>

      {/* 2. OUR STORY (Split Layout) */}
      <div className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://i.ibb.co.com/gM9tBcP3/deco7.webp"
              alt="Team Work"
              className="rounded-2xl w-full h-64 object-cover mt-12 shadow-lg"
            />
            <img
              src="https://i.ibb.co.com/nq5WTmD2/deco5.webp"
              alt="Event Setup"
              className="rounded-2xl w-full h-64 object-cover shadow-lg"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-serif font-bold text-base-content">
              Redefining The Standard
            </h3>
            <div className="w-20 h-1 bg-primary rounded-full"></div>
            <p className="text-base-content/70 leading-loose">
              Founded in Dhaka, <span className="font-bold text-primary">Eventora</span> was born from a desire to strip away the clutter of traditional event styling. We believe in the power of negative space, clean lines, and purposeful lighting.
            </p>
            <p className="text-base-content/70 leading-loose">
              Our team consists of 50+ creative professionals who don't just follow trends—they set them. From corporate galas to intimate weddings, we bring a fresh, modern perspective to every project.
            </p>
            
            <Link to="/team" className="btn btn-outline border-base-300 hover:border-primary hover:bg-primary hover:text-white rounded-full px-8 mt-4">
              Meet the Team
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 3. CORE VALUES (Cards) */}
      <div className="bg-base-200/50 py-24">
        <div className="container mx-auto px-6">
          <SectionTitle
            heading="Why Choose Us"
            subHeading="Our Core Philosophy"
            center={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <FaAward />,
                title: "Excellence",
                desc: "We don't settle for 'good enough'. Every detail is scrutinized for perfection.",
              },
              {
                icon: <FaUsers />,
                title: "Collaboration",
                desc: "Your vision is our blueprint. We work with you, not just for you.",
              },
              {
                icon: <FaSmile />,
                title: "Hospitality",
                desc: "We ensure the process is as enjoyable as the event itself.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="p-8 bg-base-100 rounded-2xl shadow-sm border border-base-200 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mb-6">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-base-content/60 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. CTA */}
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-serif font-bold mb-6">
          Let's create something extraordinary.
        </h2>
        <Link
          to="/services"
          className="btn btn-primary btn-lg rounded-full px-12 shadow-xl shadow-primary/20 text-white"
        >
          Explore Packages
        </Link>
      </div>
    </div>
  );
};
export default About;