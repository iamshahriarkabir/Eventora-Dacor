import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import SectionTitle from "../../../components/shared/SectionTitle";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const decorators = [
  {
    id: 1,
    name: "Arianne Thorne",
    role: "Lead Event Planner",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 2,
    name: "Julian Vance",
    role: "Creative Director",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 3,
    name: "Elena Rossi",
    role: "Floral Designer",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 4,
    name: "Marcus Chen",
    role: "Lighting Specialist",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 5,
    name: "Sophia Miller",
    role: "Logistics Manager",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=500",
  },
];

const TopDecorators = () => {
  return (
    <section className="py-24 bg-base-200/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionTitle
          heading="Meet The Experts"
          subHeading="The Creative Minds"
          center={true}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ 
              clickable: true,
              dynamicBullets: true, 
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            modules={[Pagination, Autoplay]}
            className="!pb-16 !px-4"
          >
            {decorators.map((dec) => (
              <SwiperSlide key={dec.id}>
                <div className="group bg-base-100 rounded-2xl overflow-hidden border border-base-200 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  
                  {/* Image Container */}
                  <div className="relative h-[350px] overflow-hidden">
                    <img
                      src={dec.img}
                      alt={dec.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Social Icons Overlay (Slide Up Effect) */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-4">
                      <button className="btn btn-circle btn-sm btn-primary text-white border-none hover:scale-110">
                        <FaLinkedinIn />
                      </button>
                      <button className="btn btn-circle btn-sm btn-secondary text-white border-none hover:scale-110">
                        <FaTwitter />
                      </button>
                      <button className="btn btn-circle btn-sm btn-accent text-white border-none hover:scale-110">
                        <FaInstagram />
                      </button>
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-serif font-bold text-base-content">
                      {dec.name}
                    </h3>
                    <p className="text-sm font-sans font-medium text-primary uppercase tracking-wide mt-1 opacity-80">
                      {dec.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};
export default TopDecorators;