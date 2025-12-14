import { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import {
  FaMapMarkerAlt,
  FaCheck,
  FaCartPlus,
  FaStar,
  FaCalendarAlt,
  FaArrowLeft,
  FaShareAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import useCart from "../../hooks/useCart";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const { user } = use(AuthContext);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`).then((res) => {
      setService(res.data);
      document.title = `Eventora | ${res.data.service_name}`;
    });
  }, [id]);

  // AI Query (Similar Recommendations)
  const { data: recommendedDecorators = [] } = useQuery({
    queryKey: ["ai-recommendation", service?.category],
    enabled: !!service,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/public/decorators`
      );
      // Mocking AI Matching Logic
      return res.data.sort(() => 0.5 - Math.random()).slice(0, 3);
    },
  });

  if (!service) return <LoadingSpinner />;

  return (
    <div className="bg-base-100 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Breadcrumb / Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/services" className="flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-primary transition-colors">
            <FaArrowLeft /> Back to Collection
          </Link>
          <div className="flex gap-4">
             <button className="btn btn-circle btn-sm btn-ghost hover:bg-base-200">
                <FaShareAlt className="text-base-content/60" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* 1. LEFT COLUMN: VISUALS */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-[2rem] shadow-sm border border-base-200 aspect-[4/3] group">
              <img
                src={service.image}
                alt={service.service_name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6">
                <span className="badge badge-primary text-white font-bold uppercase tracking-wider px-4 py-3 shadow-md border-none">
                  {service.category}
                </span>
              </div>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-base-200/50 rounded-2xl border border-base-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                    <FaStar />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase opacity-50">Rating</p>
                    <p className="font-bold">4.9 (120 Reviews)</p>
                  </div>
               </div>
               <div className="p-4 bg-base-200/50 rounded-2xl border border-base-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase opacity-50">Location</p>
                    <p className="font-bold">{service.location || "Available Nationwide"}</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* 2. RIGHT COLUMN: DETAILS & BOOKING (Sticky) */}
          <div className="relative">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="lg:sticky lg:top-28 space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-base-content mb-4 leading-tight">
                  {service.service_name}
                </h1>
                <p className="text-lg text-base-content/70 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              {/* Price Block */}
              <div className="flex items-end gap-2 border-b border-base-200 pb-8">
                <span className="text-5xl font-serif font-bold text-primary">
                  ${service.cost.toLocaleString()}
                </span>
                <span className="text-lg text-base-content/50 mb-2 font-medium">
                  / {service.unit}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => addToCart(service)}
                  className="btn btn-outline border-base-300 hover:border-primary hover:bg-primary hover:text-white rounded-xl h-14 text-base font-bold flex items-center gap-2"
                >
                  <FaCartPlus /> Add to Shortlist
                </button>
                <Link
                  to={`/book/${service._id}`}
                  className="btn btn-primary text-white rounded-xl h-14 text-base font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform flex items-center gap-2"
                >
                  <FaCalendarAlt /> Reserve Now
                </Link>
              </div>

              {/* Includes List */}
              <div className="bg-base-200/50 p-6 rounded-2xl border border-base-200">
                <h3 className="font-serif font-bold text-lg mb-4">Package Includes</h3>
                <ul className="grid grid-cols-1 gap-3">
                  {[
                    "Professional Styling & Setup",
                    "Premium Material Sourcing",
                    "On-site Coordination Team",
                    "Post-Event Breakdown",
                    "Lighting Ambiance Setup"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm opacity-80">
                      <FaCheck className="text-success mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: AI MATCHES */}
        <div className="mt-24 border-t border-base-200 pt-16">
          <div className="flex items-center justify-between mb-8">
             <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">AI Powered Match</span>
                <h3 className="text-3xl font-serif font-bold">Recommended Experts</h3>
             </div>
             <Link to="/team" className="btn btn-link no-underline text-base-content/50 hover:text-primary">View All Experts</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedDecorators.map((dec) => (
              <div
                key={dec._id}
                className="group flex items-center gap-4 p-4 bg-base-100 border border-base-200 rounded-xl hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full ring ring-base-200 ring-offset-2">
                    <img src={dec.photo || "https://i.ibb.co/de/avatar.png"} alt={dec.name} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{dec.name}</h4>
                  <p className="text-xs uppercase tracking-wide opacity-60">{service.category} Specialist</p>
                  <div className="flex text-yellow-400 text-xs mt-1 gap-0.5">
                     <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
            ))}
            
            {recommendedDecorators.length === 0 && (
               <div className="col-span-3 text-center py-10 opacity-50 border border-dashed border-base-300 rounded-xl">
                  No specific expert matches found for this category.
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
export default ServiceDetails;