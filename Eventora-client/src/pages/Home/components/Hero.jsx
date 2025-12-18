import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight, FaPlay, FaStar } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative py-24 min-h-screen flex items-center bg-base-100 overflow-hidden">
      {/* Background Blobs (Abstract shapes for modern feel) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* 1. LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-300 mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-base-content/70">
              #1 Event Styling Agency
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl xl:text-7xl font-serif font-bold leading-[1.1] text-base-content">
            Crafting <br />
            <span className="text-gradient">Experiences</span>, <br />
            Not Just Events.
          </h1>

          <p className="text-lg text-base-content/70 max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans">
            Eventora Decor transforms ordinary spaces into immersive environments. 
            From corporate summits to intimate weddings, we bring a fresh 
            perspective to every occasion.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/services"
              className="btn btn-primary btn-lg rounded-xl shadow-xl shadow-primary/20 text-white border-none hover:-translate-y-1 transition-transform"
            >
              Start Planning <FaArrowRight className="text-sm" />
            </Link>
            <Link
              to="/gallery"
              className="btn btn-outline btn-lg rounded-xl hover:bg-base-200 hover:text-base-content border-base-300"
            >
              <FaPlay className="text-xs" /> View Portfolio
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 opacity-80">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-base-100 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-base-100 bg-base-200 flex items-center justify-center text-xs font-bold">
                +2k
              </div>
            </div>
            <div className="text-sm font-bold">
              <div className="flex text-yellow-500 text-xs mb-0.5">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              Trusted by 2,000+ Clients
            </div>
          </div>
        </motion.div>

        {/* 2. RIGHT VISUAL (Modern Collage) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] w-full hidden lg:block"
        >
          {/* Main Large Image */}
          <div className="absolute top-0 right-0 w-[85%] h-[90%] rounded-4xl overflow-hidden shadow-2xl">
            <img 
              src="https://i.ibb.co.com/v633Vxdx/deco1.webp" 
              alt="Modern Hall" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Floating Small Image */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-0 w-[45%] h-[40%] rounded-2xl overflow-hidden shadow-2xl border-4 border-base-100"
          >
             <img 
              src="https://i.ibb.co.com/ZRfG36zv/deco2.jpg" 
              alt="Detail Shot" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute top-20 left-10 glass-panel p-4 rounded-xl shadow-lg flex items-center gap-3 pr-6"
          >
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center text-success">
              <FaStar />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-60">Success Rate</p>
              <p className="text-xl font-bold font-serif">99.8%</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;