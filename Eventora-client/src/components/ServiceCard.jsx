import { Link } from "react-router";
import { FaArrowRight, FaMapMarkerAlt, FaTag } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const { _id, service_name, image, cost, category, description, location } =
    service;

  return (
    <Link
      to={`/services/${_id}`}
      className="group flex flex-col h-full bg-base-100 border border-base-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
    >
      {/* 1. IMAGE AREA */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={service_name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Category Badge (Top Left) */}
        <div className="absolute top-4 left-4">
          <span className="badge badge-primary text-white font-bold uppercase tracking-wider text-xs px-3 py-3 border-none shadow-md">
            {category}
          </span>
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* 2. CONTENT AREA */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Location Tag */}
        {location && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-base-content/50 uppercase tracking-wide mb-2">
            <FaMapMarkerAlt className="text-secondary" /> {location}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-serif font-bold text-base-content mb-3 leading-tight group-hover:text-primary transition-colors">
          {service_name}
        </h3>

        {/* Description */}
        <p className="text-base-content/70 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
          {description}
        </p>

        {/* 3. FOOTER AREA (Price & Action) */}
        <div className="pt-4 border-t border-base-200 flex items-center justify-between mt-auto">
          <div>
            <p className="text-[10px] uppercase font-bold text-base-content/40 mb-0.5">
              Starting at
            </p>
            <div className="text-xl font-bold text-primary font-serif">
              ${cost.toLocaleString()}
            </div>
          </div>

          <span className="w-10 h-10 rounded-full bg-base-200 text-base-content group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300">
            <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </Link>
  );
};
export default ServiceCard;