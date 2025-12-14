import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import SectionTitle from "../../components/shared/SectionTitle";
import { FaAward, FaUsers, FaLightbulb, FaHistory, FaGlobeAsia, FaHandshake } from "react-icons/fa";
import CountUp from "react-countup";

const About = () => {
  useEffect(() => {
    document.title = "Eventora | Our Story";
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { label: "Years of Excellence", value: 5 },
    { label: "Events Curated", value: 450 },
    { label: "Expert Decorators", value: 50 },
    { label: "Industry Awards", value: 12 },
  ];

  return (
    <div className="bg-base-100 min-h-screen overflow-hidden">
      
      {/* 1. HERO SECTION WITH IMAGE */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax feel */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600&auto=format&fit=crop" 
            alt="Eventora Studio" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6 max-w-4xl"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
            Since 2020
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mt-6 mb-6 leading-tight">
            We Curate <br/> <span className="text-primary italic">Unforgettable</span> Memories.
          </h1>
          <p className="text-lg md:text-xl opacity-90 font-light max-w-2xl mx-auto leading-relaxed">
            Eventora is more than a styling agency. We are storytellers who use space, light, and texture to bring your vision to life.
          </p>
        </motion.div>
      </div>

      {/* 2. STATS STRIP (Floating) */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-200 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className={`flex flex-col items-center ${idx !== 3 ? 'md:border-r border-base-200' : ''}`}>
              <h3 className="text-4xl font-serif font-bold text-primary mb-1">
                <CountUp end={stat.value} duration={2.5} enableScrollSpy />+
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. OUR MISSION (Typography Focused) */}
      <div className="py-24 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <FaQuoteRight className="text-4xl text-primary/20 mx-auto" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-snug text-base-content">
              "We believe that every celebration deserves a setting as unique as the people celebrating it. Our mission is to democratize luxury design."
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Founder" />
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">Elena Rossi</p>
                <p className="text-xs opacity-60 uppercase tracking-wide">Founder & Lead Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. OUR JOURNEY (Timeline) */}
      <div className="py-24 bg-base-200/50">
        <div className="container mx-auto px-6">
          <SectionTitle heading="Our Journey" subHeading="Milestones" center={true} />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Image Collage */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop" 
                className="w-3/4 rounded-2xl shadow-2xl z-10 relative"
                alt="Event 2020" 
              />
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop" 
                className="absolute bottom-[-20px] right-0 w-1/2 rounded-2xl shadow-xl border-4 border-base-100 z-20"
                alt="Event 2024" 
              />
            </div>

            {/* Right: Timeline Steps */}
            <div className="space-y-8 pl-0 md:pl-10">
              {[
                { year: "2020", title: "The Beginning", desc: "Started as a small floral boutique in Dhaka." },
                { year: "2022", title: "Expansion", desc: "Launched full-scale event styling services nationwide." },
                { year: "2024", title: "Digital Era", desc: "Introduced Eventora Platform to connect clients with experts." },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex gap-4 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                      {item.year}
                    </div>
                    {idx !== 2 && <div className="h-full w-0.5 bg-base-300 my-2"></div>}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-serif mb-1">{item.title}</h4>
                    <p className="text-base-content/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. CORE VALUES (Grid) */}
      <div className="py-24 bg-base-100">
        <div className="container mx-auto px-6">
          <SectionTitle heading="Our Values" subHeading="What Drives Us" center={true} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: <FaLightbulb />, title: "Innovation", text: "We constantly push boundaries to create designs that have never been seen before." },
              { icon: <FaGlobeAsia />, title: "Sustainability", text: "We prioritize eco-friendly materials and sustainable practices in every event." },
              { icon: <FaHandshake />, title: "Integrity", text: "Transparent pricing and honest communication are the pillars of our client relationships." },
            ].map((card, i) => (
              <div key={i} className="p-8 rounded-3xl bg-base-100 border border-base-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-base-content/60 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. CTA SECTION */}
      <div className="bg-primary text-primary-content py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Design Your Dream?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
            Join thousands of happy clients who trusted Eventora with their most precious moments.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/services" className="btn btn-secondary text-base-content rounded-full px-8 shadow-lg border-none hover:scale-105 transition-transform">
              View Packages
            </Link>
            <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary rounded-full px-8">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

// Helper Icon Import
import { FaQuoteRight } from "react-icons/fa";
export default About;