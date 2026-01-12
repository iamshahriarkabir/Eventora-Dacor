import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const LatestNews = () => {
  // Fetch blogs from server
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      return res.data;
    },
  });

  if (isLoading) return null; // Or a skeleton loader
  if (blogs.length === 0) return null;

  // Show only latest 3 blogs
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="py-20 bg-base-200/30">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              Our Blog
            </span>
            <h2 className="text-4xl font-serif font-bold mt-2">Latest News & Tips</h2>
          </div>
          <Link to="/blogs" className="btn btn-link no-underline text-primary hover:text-primary/80 hidden md:flex">
            View All News <FaArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {latestBlogs.map((blog) => (
            <div
              key={blog._id}
              className="group bg-base-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-base-200"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={blog.image || "https://i.ibb.co.com/4R5MR0Jg/deco6.webp"}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  {blog.date ? format(new Date(blog.date), "MMM dd, yyyy") : "Recent"}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-serif mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-base-content/60 text-sm line-clamp-3 mb-4">
                  {blog.shortDescription}
                </p>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1"
                >
                  Read More <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
         <div className="mt-8 text-center md:hidden">
            <Link to="/blogs" className="btn btn-outline btn-primary w-full">
                View All News
            </Link>
         </div>
      </div>
    </section>
  );
};

export default LatestNews;