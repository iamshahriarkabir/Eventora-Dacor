import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { useEffect } from "react";

const BlogDetails = () => {
  const { id } = useParams();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 container mx-auto px-6">
        <div className="skeleton h-96 w-full rounded-3xl mb-8"></div>
        <div className="skeleton h-8 w-3/4 mb-4"></div>
        <div className="skeleton h-4 w-1/2 mb-8"></div>
        <div className="space-y-4">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Back Button */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all mb-8"
        >
          <FaArrowLeft /> Back to Journal
        </Link>

        {/* Header Content */}
        <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-base-content leading-tight mb-6">
            {blog.title}
            </h1>
            
            <div className="flex items-center gap-6 text-sm opacity-70 border-b border-base-200 pb-8">
                <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    {blog.date ? format(new Date(blog.date), "MMMM dd, yyyy") : "Unknown Date"}
                </span>
                <span className="flex items-center gap-2">
                    <FaUser className="text-primary" />
                    By Admin
                </span>
            </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-12">
            <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-auto object-cover max-h-[500px]"
            />
        </div>

        {/* Main Content */}
        <article className="prose prose-lg prose-headings:font-serif max-w-none text-base-content/80 leading-loose">
           {/* Rendering newlines correctly */}
           {blog.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-justify">
                    {paragraph}
                </p>
           ))}
        </article>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-base-200 text-center">
             <p className="font-serif italic text-lg mb-4">Enjoyed this article?</p>
             <Link to="/contact" className="btn btn-primary rounded-full px-8">
                Contact Us for Your Event
             </Link>
        </div>

      </div>
    </div>
  );
};

export default BlogDetails;