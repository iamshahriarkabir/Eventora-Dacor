import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/shared/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
// import { FaLinkedinIn, FaTwitter, FaInstagram, FaQuoteRight } from "react-icons/fa";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import TopDecorators from "../Home/components/TopDecorators"; 

const Team = () => {
  useEffect(() => {
    document.title = "Eventora | Our Experts";
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("All");

  // 1. Fetch Decorators
  const { data: decorators = [], isLoading } = useQuery({
    queryKey: ["public-decorators"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/public/decorators`
      );
      return res.data;
    },
  });

  // 2. Categories
  const categories = [
    "All",
    "Wedding Styling",
    "Interior Design",
    "Corporate Events",
    "Lighting Expert",
    "Floral Artist",
  ];

  // 3. SAFE FILTER LOGIC 
  const filteredTeam =
    activeTab === "All"
      ? decorators
      : decorators.filter((member) => {
          
          const memberSpecialty = member.specialty || "General";
          
          return memberSpecialty.toLowerCase().includes(activeTab.toLowerCase());
        });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-base-100 min-h-screen pt-20 pb-20">
      
      <div className="mb-12">
         <TopDecorators />
      </div>

      <div className="container mx-auto px-6">
        
        <SectionTitle
          heading="All Professionals"
          subHeading="Browse by Specialty"
          center={true}
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                activeTab === cat
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-base-100 border-base-200 text-base-content/60 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredTeam.map((member) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={member._id}
                className="group relative overflow-hidden rounded-[2rem] h-[400px] cursor-pointer shadow-sm border border-base-200 bg-base-100"
              >
                {/* Image */}
                <img
                  src={member.photo || "https://i.ibb.co/de/avatar.png"}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-center">
                  
                  <div className="mb-2 text-primary translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {/* <FaQuoteRight className="mx-auto text-2xl" /> */}
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {member.name}
                  </h3>

                  {/* Specialty Badge Display */}
                  <div className="mt-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <span className="inline-block px-4 py-1 border border-white/30 rounded-full bg-white/10 backdrop-blur-md text-xs font-sans font-bold uppercase tracking-widest text-white">
                      
                      {member.specialty || "General Expert"}
                    </span>
                  </div>

                  {/* <div className="flex justify-center gap-4 mt-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                    <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-primary flex items-center justify-center text-white transition-colors">
                        <FaLinkedinIn />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-primary flex items-center justify-center text-white transition-colors">
                        <FaInstagram />
                    </button>
                  </div> */}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTeam.length === 0 && (
          <div className="text-center py-20 opacity-50 border border-dashed border-base-300 rounded-3xl mt-8">
            <h3 className="text-xl font-bold">No experts found in this category.</h3>
            <p className="text-sm mt-2">Try selecting 'All' or verify user specialties.</p>
          </div>
        )}

      </div>
    </div>
  );
};
export default Team;