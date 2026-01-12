import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { use } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const AddBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = use(AuthContext); // Get user to generate token
  
  const onSubmit = async (data) => {
    const toastId = toast.loading("Publishing blog...");
    
    try {
        // 1. Get the Firebase ID Token
        const token = await user.getIdToken(); 
        
        // 2. Send Request with Authorization Header
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.data.insertedId) {
            toast.success("Blog published successfully!", { id: toastId });
            reset();
        }
    } catch (error) {
        toast.error("Failed to publish blog", { id: toastId });
        console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold">Write a New Blog</h1>
        <p className="opacity-60">Share news, tips, and updates with your audience.</p>
      </div>

      <div className="bg-base-100 p-8 rounded-2xl border border-base-200 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Title */}
          <div className="form-control">
            <label className="label font-bold">Blog Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="e.g. Top 10 Wedding Trends for 2026"
              className="input input-bordered w-full focus:border-primary"
            />
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label font-bold">Banner Image URL</label>
            <input
              type="url"
              {...register("image", { required: true })}
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full focus:border-primary"
            />
          </div>

          {/* Short Description */}
          <div className="form-control">
            <label className="label font-bold">Short Description (for Cards)</label>
            <textarea
              {...register("shortDescription", { required: true })}
              className="textarea textarea-bordered h-20 focus:border-primary"
              placeholder="A brief summary..."
            ></textarea>
          </div>

          {/* Full Content */}
          <div className="form-control">
            <label className="label font-bold">Full Content</label>
            <textarea
              {...register("content", { required: true })}
              className="textarea textarea-bordered h-48 focus:border-primary font-sans"
              placeholder="Write your full article here..."
            ></textarea>
          </div>

          <button className="btn btn-primary w-full md:w-auto">
            <FaPaperPlane /> Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;