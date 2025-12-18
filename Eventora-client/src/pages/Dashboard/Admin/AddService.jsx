import { use } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { 
  FaHeading, 
  FaAlignLeft, 
  FaImage, 
  FaLayerGroup, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaCube, 
  FaCloudUploadAlt,
  FaCheck
} from "react-icons/fa";

const AddService = () => {
  const { user } = use(AuthContext);
  // 'watch' is used to get real-time value of image input for preview
  const { register, handleSubmit, reset, watch } = useForm();
  
  const imageUrl = watch("image");

  const onSubmit = async (data) => {
    const serviceData = {
      ...data,
      cost: parseInt(data.cost),
      createdByEmail: user.email,
      createdAt: new Date(),
    };

    try {
      const token = await user.getIdToken();
      await axios.post(`${import.meta.env.VITE_API_URL}/services`, serviceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Service created successfully");
      reset();
    } catch (error) {
      toast.error("Failed to create service");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 border-b border-base-200 pb-6">
        <div>
          <h2 className="text-3xl font-serif font-bold text-base-content">
            Add New Service
          </h2>
          <p className="text-base-content/60 mt-1">
            Create a new package for your catalog.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Admin Workspace
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Basic Details Card */}
          <div className="bg-base-100 p-8 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center text-primary text-sm"><FaHeading /></span>
              Service Details
            </h3>
            
            <div className="space-y-6">
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Service Title</label>
                <div className="relative">
                  <input 
                    {...register("service_name", { required: true })} 
                    className="input input-bordered w-full pl-10 h-12 focus:border-primary focus:outline-none transition-all rounded-xl" 
                    placeholder="e.g. Royal Wedding Setup" 
                  />
                  <FaHeading className="absolute left-4 top-4 z-10 text-base-content/30" />
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Description</label>
                <div className="relative">
                  <textarea 
                    {...register("description", { required: true })} 
                    className="textarea textarea-bordered w-full pl-10 pt-4 h-40  focus:border-primary focus:outline-none transition-all rounded-xl text-base leading-relaxed" 
                    placeholder="Write a detailed description about what this service includes..."
                  ></textarea>
                  <FaAlignLeft className="absolute left-4 top-4 text-base-content/30" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Media Card with Preview */}
          <div className="bg-base-100 p-8 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center text-secondary text-sm"><FaImage /></span>
              Visuals
            </h3>

            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Cover Image URL</label>
              <div className="relative">
                <input 
                  type="text" 
                  {...register("image", { required: true })} 
                  className="input input-bordered w-full pl-10 h-12 bg-base-100 focus:border-primary focus:outline-none transition-all rounded-xl" 
                  placeholder="Paste direct image link (https://...)" 
                />
                <FaCloudUploadAlt className="absolute left-4 top-4 text-base-content/30 z-10" />
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="mt-6 w-full h-64 bg-base-200/50 rounded-xl border-2 border-dashed border-base-300 flex items-center justify-center overflow-hidden relative group">
              {imageUrl ? (
                <>
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold text-sm px-4 py-2 rounded-full">Image Preview</span>
                  </div>
                </>
              ) : (
                <div className="text-center opacity-40">
                  <FaImage className="text-4xl mx-auto mb-2" />
                  <p className="text-sm font-bold">Image preview will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Settings (Sticky) */}
        <div className="space-y-6 lg:sticky lg:top-6 h-fit">
          <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold mb-6 pb-2 border-b border-base-200 text-base-content">
              Configuration
            </h3>
            
            <div className="space-y-5">
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-wide opacity-70">Category</label>
                <div className="relative">
                  <select {...register("category")} className="select select-bordered w-full pl-10 bg-base-100 rounded-xl">
                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Birthday</option>
                    <option>Home</option>
                    <option>Office</option>
                    <option>Seminar</option>
                    <option>Meeting</option>
                  </select>
                  <FaLayerGroup className="absolute left-4 top-3.5 z-10 text-base-content/30" />
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-wide opacity-70">Location</label>
                <div className="relative">
                  <select {...register("location")} className="select select-bordered w-full pl-10 bg-base-100 rounded-xl">
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Rajshahi</option>
                    <option>Khulna</option>
                    <option>Barisal</option>
                    <option>Rangpur</option>
                    <option>Cumilla</option>
                    <option>Bogura</option>
                    <option>Sylhet</option>
                    <option>Mymensingh</option>
                    <option>All Bangladesh</option>
                  </select>
                  <FaMapMarkerAlt className="absolute left-4 z-10 top-3.5 text-base-content/30" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-xs font-bold uppercase tracking-wide opacity-70">Price</label>
                  <div className="relative">
                    <input type="number" {...register("cost", { required: true })} className="input input-bordered focus:border-primary focus:outline-none w-full pl-8 bg-base-100 rounded-xl" placeholder="0.00" />
                    <FaDollarSign className="absolute left-3 z-10 top-3.5 text-base-content/30" />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label text-xs font-bold uppercase tracking-wide opacity-70">Unit</label>
                  <div className="relative">
                    <input type="text" {...register("unit")} className="input input-bordered focus:border-primary focus:outline-none w-full pl-8 bg-base-100 rounded-xl" placeholder="Event" />
                    <FaCube className="absolute left-3 top-3.5 z-10 text-base-content/30" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-base-200">
              <button className="btn btn-primary w-full rounded-xl text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                <FaCheck /> Publish Service
              </button>
            </div>
          </div>
          
          {/* Quick Tip Card */}
          <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
            <p className="text-xs font-bold text-primary mb-1">PRO TIP</p>
            <p className="text-xs opacity-70 leading-relaxed">
              Use high-quality images (1200x800px) for better visual appeal on the homepage gallery.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
};
export default AddService;