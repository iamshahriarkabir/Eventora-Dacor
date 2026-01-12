import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../../components/ServiceCard";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaTag,
  FaDollarSign,
  FaFilter,
  FaUndo,
} from "react-icons/fa";

const Services = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("All");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 100000,
    label: "All",
  });
  const [currentPage, setCurrentPage] = useState(1);
  
  // Requirement Update: Increase items per page to fill 4-column grid (e.g., 8 or 12 items)
  const itemsPerPage = 8; 

  useEffect(() => {
    document.title = "Eventora | The Collection";
    window.scrollTo(0, 0);
  }, [currentPage]);

  // 1. FETCH SERVICES
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["services", search, category, location, priceRange, currentPage],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`, {
        params: {
          search,
          category,
          location,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  // 2. FETCH LOCATIONS (DYNAMIC FROM BACKEND)
  const { data: uniqueLocations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/services/locations/category`
      );
      return ["All", ...res.data];
    },
  });

  const services = Array.isArray(data) ? data : data?.services || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const updateFilter = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const categories = ["All", "Wedding", "Home", "Office", "Birthday", "Corporate"];
  const prices = [
    { label: "Any Price", min: 0, max: 100000 },
    { label: "Budget (< $500)", min: 0, max: 500 },
    { label: "Standard ($500 - $2k)", min: 500, max: 2000 },
    { label: "Premium ($2k+)", min: 2000, max: 100000 },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-20">
      {/* PAGE HEADER */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-base-200 pb-6 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-base-content">
              The Collection
            </h1>
            <p className="text-base-content/60 mt-2 font-sans">
              Curated styling packages for every occasion.
            </p>
          </div>
          <div className="text-sm font-bold opacity-50 uppercase tracking-widest">
            {data?.totalServices || 0} Packages Available
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR FILTERS (DESKTOP) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 space-y-8 bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <FaFilter className="text-primary text-sm" /> Filters
                </h3>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn btn-ghost btn-xs text-error opacity-70 hover:opacity-100"
                >
                  <FaUndo /> Reset
                </button>
              </div>

              {/* Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search keywords..."
                  className="input input-bordered w-full pl-10 h-11 bg-base-200/50 focus:bg-base-100 focus:border-primary focus:outline-none transition-all rounded-lg text-sm"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="absolute left-3 z-10 top-3.5 text-base-content/40" />
              </form>

              <div className="divider my-0"></div>

              {/* DYNAMIC LOCATION GROUP */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide opacity-60 mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt /> Location
                </h4>
                <ul className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {uniqueLocations.map((loc) => (
                    <li key={loc}>
                      <button
                        onClick={() => updateFilter(setLocation, loc)}
                        className={`text-sm py-1.5 px-2 rounded-md transition-all text-left w-full flex justify-between items-center ${
                          location === loc
                            ? "bg-primary text-white font-medium shadow-md"
                            : "text-base-content/70 hover:bg-base-200"
                        }`}
                      >
                        {loc === "All" ? "Everywhere" : loc}
                        {location === loc && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CATEGORY GROUP */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide opacity-60 mb-3 flex items-center gap-2">
                  <FaTag /> Category
                </h4>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group hover:bg-base-200/50 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="radio"
                        name="category"
                        className="radio radio-primary radio-xs"
                        checked={category === (cat === "All" ? "" : cat)}
                        onChange={() =>
                          updateFilter(setCategory, cat === "All" ? "" : cat)
                        }
                      />
                      <span
                        className={`text-sm group-hover:text-primary transition-colors ${
                          category === (cat === "All" ? "" : cat)
                            ? "font-bold text-base-content"
                            : "text-base-content/70"
                        }`}
                      >
                        {cat === "All" ? "All Categories" : cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PRICE GROUP */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide opacity-60 mb-3 flex items-center gap-2">
                  <FaDollarSign /> Budget Range
                </h4>
                <div className="flex flex-col gap-2">
                  {prices.map((p, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 cursor-pointer group hover:bg-base-200/50 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="radio"
                        name="price"
                        className="radio radio-secondary radio-xs"
                        checked={priceRange.label === p.label}
                        onChange={() => updateFilter(setPriceRange, p)}
                      />
                      <span
                        className={`text-sm group-hover:text-primary transition-colors ${
                          priceRange.label === p.label
                            ? "font-bold text-base-content"
                            : "text-base-content/70"
                        }`}
                      >
                        {p.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* TOP BAR (MOBILE FILTER) */}
          <div className="lg:hidden sticky top-[72px] z-30 bg-base-100/90 backdrop-blur-xl py-4 -mx-6 px-6 border-b border-base-200 shadow-sm space-y-3">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-3.5 text-base-content/40" />
              <input
                type="text"
                className="input input-bordered w-full pl-10 h-10 rounded-full bg-base-200 text-sm focus:border-primary"
                placeholder="Search catalog..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <select
                className="select select-bordered select-sm w-full rounded-lg text-xs bg-base-100"
                onChange={(e) => updateFilter(setLocation, e.target.value)}
                value={location}
              >
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "All" ? "Location" : loc}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered select-sm w-full rounded-lg text-xs bg-base-100"
                onChange={(e) => updateFilter(setCategory, e.target.value)}
              >
                <option value="">Category</option>
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>

              <select
                className="select select-bordered select-sm w-full rounded-lg text-xs bg-base-100"
                onChange={(e) => {
                  const p = prices[e.target.selectedIndex];
                  updateFilter(setPriceRange, p);
                }}
              >
                {prices.map((p, i) => (
                  <option key={i} value={i}>
                    {p.label.split(" ")[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CONTENT GRID */}
          <div className="flex-1">
            {isLoading ? (
              // Updated Skeleton to reflect 4-column layout
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="h-[350px] bg-base-200 rounded-2xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <>
                {/* Updated Grid for 4 Columns in XL screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[400px]">
                  {services.length > 0 ? (
                    services.map((service, idx) => (
                      <motion.div
                        key={service._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                      >
                        <ServiceCard service={service} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center text-center py-20 bg-base-200/30 rounded-3xl border border-dashed border-base-300">
                      <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center text-base-content/30 mb-4">
                        <FaSearch size={24} />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-base-content/70">
                        No matches found.
                      </h3>
                      <p className="text-base-content/50 text-sm mt-1">
                        Try adjusting your search or filters.
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="btn btn-sm btn-outline mt-6 rounded-full"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination Controls */}
                {services.length > 0 && (
                  <div className="flex justify-center mt-16">
                    <div className="join shadow-sm border border-base-200 bg-base-100 rounded-lg">
                      <button
                        className="join-item btn btn-sm btn-ghost px-4 hover:bg-base-200"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                      >
                        Prev
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          className={`join-item btn btn-sm border-none font-medium ${
                            currentPage === i + 1
                              ? "bg-primary text-white hover:bg-primary"
                              : "btn-ghost hover:bg-base-200"
                          }`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        className="join-item btn btn-sm btn-ghost px-4 hover:bg-base-200"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;