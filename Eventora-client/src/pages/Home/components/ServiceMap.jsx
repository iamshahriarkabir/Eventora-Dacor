import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import SectionTitle from "../../../components/shared/SectionTitle";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaBuilding } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Fix for default Leaflet icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const ServiceMap = () => {
  // Branch Locations Data
  const branches = [
    {
      id: 1,
      name: "Dhaka HQ",
      position: [23.7937, 90.4066],
      address: "Level 4, Gulshan Avenue, Dhaka 1212",
      phone: "+880 1700-123456",
      email: "dhaka@eventora.com"
    },
    {
      id: 2,
      name: "Chittagong Hub",
      position: [22.3569, 91.7832],
      address: "GEC Circle, Nasirabad, Chittagong",
      phone: "+880 1800-987654",
      email: "ctg@eventora.com"
    },
    {
      id: 3,
      name: "Sylhet Studio",
      position: [24.8949, 91.8687],
      address: "Zindabazar, Sylhet Sadar",
      phone: "+880 1600-555444",
      email: "sylhet@eventora.com"
    },
    {
      id: 4,
      name: "Khulna Branch",
      position: [22.8456, 89.5403],
      address: "Shib Bari Mor, Khulna",
      phone: "+880 1900-333222",
      email: "khulna@eventora.com"
    },
    {
      id: 5,
      name: "Rajshahi Center",
      position: [24.3636, 88.6241],
      address: "Shaheb Bazar, Rajshahi",
      phone: "+880 1500-111000",
      email: "rajshahi@eventora.com"
    }
  ];

  // State to track active branch details
  const [activeBranch, setActiveBranch] = useState(branches[0]);

  return (
    <section className="pb-0 bg-base-100 relative">
      <div className="container mx-auto px-6 mb-12">
        <SectionTitle
          heading="Nationwide Presence"
          subHeading="Find Us Near You"
          center={true}
        />
      </div>

      <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-full w-full"
        >
          <MapContainer
            center={[23.6850, 90.3563]} // Center of Bangladesh
            zoom={8} // Zoom out to show whole country
            scrollWheelZoom={false}
            className="h-full w-full z-0"
            style={{ background: "#f8f9fa" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="map-tiles-filter"
            />
            
            {/* Render Markers for all branches */}
            {branches.map((branch) => (
              <Marker 
                key={branch.id} 
                position={branch.position}
                eventHandlers={{
                  click: () => setActiveBranch(branch), // Update card on click
                }}
              >
                <Popup className="font-sans">
                  <strong className="text-primary text-base">{branch.name}</strong> <br />
                  Click to view details.
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        {/* Floating Contact Card (Dynamic Content) */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-20 z-[40] max-w-sm w-full hidden md:block"
        >
          <div className="bg-base-100 p-8 rounded-2xl shadow-2xl border border-base-200">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-2xl font-serif font-bold text-base-content">
                 Office Details
               </h3>
               <span className="badge badge-primary badge-outline text-xs font-bold">
                 {activeBranch.name}
               </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeBranch.id} // Re-animate when branch changes
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider opacity-50 mb-1">
                      Location
                    </p>
                    <p className="text-sm font-medium leading-relaxed">
                      {activeBranch.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider opacity-50 mb-1">
                      Phone
                    </p>
                    <p className="text-sm font-medium leading-relaxed">
                      {activeBranch.phone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider opacity-50 mb-1">
                      Email
                    </p>
                    <p className="text-sm font-medium leading-relaxed">
                      {activeBranch.email}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-base-200">
                   <p className="text-xs text-center opacity-50 italic">
                     * Click on map markers to view other branches
                   </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CSS for Grayscale Map */}
        <style>{`
          .map-tiles-filter { 
            filter: grayscale(100%) contrast(1.1) brightness(1.1); 
          }
          [data-theme="luxury-dark"] .map-tiles-filter { 
            filter: grayscale(100%) invert(90%) hue-rotate(180deg) contrast(1.2); 
          }
        `}</style>
      </div>
    </section>
  );
};
export default ServiceMap;