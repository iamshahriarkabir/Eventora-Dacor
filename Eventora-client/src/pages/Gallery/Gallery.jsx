import { useEffect, useState, useCallback } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import SectionTitle from "../../components/shared/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  useEffect(() => {
    document.title = "Eventora | Portfolio";
    window.scrollTo(0, 0);
  }, []);

  const [filter, setFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Updated Image List (More Modern)
  const images = [
    { id: 1, src: "https://i.ibb.co.com/rfKCL33d/deco8.webp", category: "Wedding", title: "Minimalist Altar" },
    { id: 2, src: "https://i.ibb.co.com/pjNkwBd7/deco16.jpg", category: "Corporate", title: "Tech Summit" },
    { id: 3, src: "https://i.ibb.co.com/v633Vxdx/deco1.webp", category: "Wedding", title: "Garden Reception" },
    { id: 4, src: "https://i.ibb.co.com/LzzZ4CFR/deco20.webp", category: "Birthday", title: "Boho Chic Party" },
    { id: 5, src: "https://i.ibb.co.com/svxZ9sj7/deco14.webp", category: "Corporate", title: "Product Launch" },
    { id: 6, src: "https://i.ibb.co.com/G49F4b3v/deco12.webp", category: "Home", title: "Nordic Living" },
    { id: 7, src: "https://i.ibb.co.com/sdgsz3pC/deco21.webp", category: "Birthday", title: "Neon Nights" },
    { id: 8, src: "https://i.ibb.co.com/kgtzCz4f/deco4.webp", category: "Wedding", title: "Beachside Vows" },
    { id: 9, src: "https://i.ibb.co.com/V0vc27XF/deco13.webp", category: "Office", title: "Modern Workspace" },
  ];

  const filteredImages = filter === "All" ? images : images.filter((img) => img.category === filter);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <div className="bg-base-100 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <SectionTitle heading="Visual Portfolio" subHeading="Curated Works" center={true} />

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", "Wedding", "Corporate", "Birthday", "Home"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                filter === cat
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-base-100 border-base-300 text-base-content/60 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={img.id}
                className="relative group break-inside-avoid overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Modern Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    <span className="text-white/80 text-xs font-bold uppercase tracking-wider">{img.category}</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                        <FaExpand size={12} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Minimalist Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/85 backdrop-blur-md flex items-center justify-center"
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50">
              <FaTimes />
            </button>

            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hidden md:flex z-50">
              <FaChevronLeft />
            </button>

            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hidden md:flex z-50">
              <FaChevronRight />
            </button>

            <div className="relative max-w-5xl w-full p-4 flex flex-col items-center">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={filteredImages[currentImageIndex].src}
                alt="Fullscreen"
                className="max-h-[80vh] rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                 <h2 className="text-white text-2xl font-serif font-bold">{filteredImages[currentImageIndex].title}</h2>
                 <p className="text-white/60 text-sm mt-1">{filteredImages[currentImageIndex].category}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Gallery;