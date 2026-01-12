import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowRight, FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import { useEffect } from "react";

const Blogs = () => {
  useEffect(() => {
    document.title = "Eventora | Our Stories";
    window.scrollTo(0, 0);
  }, []);

  // Fetch all blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-20">
      
      {/* Header */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
            Latest Updates
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-base-content mb-4">
          Our Journal
        </h1>
        <p className="text-base-content/60 max-w-2xl mx-auto">
          Insights, trends, and inspiration from the world of event planning and decoration.
        </p>
      </div>

      <div className="container mx-auto px-6">
        {isLoading ? (
          // Skeleton Loader
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="skeleton h-64 w-full rounded-2xl"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
             {blogs.length === 0 ? (
                <div className="text-center py-20 opacity-50">
                    <h3 className="text-xl">No blogs found currently.</h3>
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => (
                    <motion.div
                        key={blog._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group flex flex-col h-full bg-base-100 border border-base-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                            <FaCalendarAlt className="text-primary" />
                            {blog.date ? format(new Date(blog.date), "MMM dd, yyyy") : "Recent"}
                        </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-2xl font-serif font-bold mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                        </h3>
                        <p className="text-base-content/60 mb-6 line-clamp-3 text-sm flex-grow">
                            {blog.shortDescription}
                        </p>
                        
                        <div className="pt-4 border-t border-base-200">
                            <Link
                            to={`/blogs/${blog._id}`}
                            className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-wide hover:gap-3 transition-all"
                            >
                            Read Full Story <FaArrowRight />
                            </Link>
                        </div>
                        </div>
                    </motion.div>
                    ))}
                </div>
             )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;