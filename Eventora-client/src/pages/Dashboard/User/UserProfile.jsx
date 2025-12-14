import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { 
  FaUser, 
  FaCamera, 
  FaEnvelope, 
  FaSave, 
  FaShieldAlt, 
  FaGlobe,
  FaCalendarAlt 
} from "react-icons/fa";
import { motion } from "framer-motion";
import useRole from "../../../hooks/useRole"; // Assuming you have this hook from previous steps

const UserProfile = () => {
  const { user, updateUserProfile } = use(AuthContext);
  const [role] = useRole(); // Fetch role for the badge
  
  const { register, handleSubmit } = useForm({
    defaultValues: { 
      name: user?.displayName, 
      photoURL: user?.photoURL 
    }
  });
  
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateUserProfile(data.name, data.photoURL);
      toast.success("Profile updated successfully!");
      // Optional: Force reload to refresh navbar image immediately
      // window.location.reload(); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-base-content">
            Account Settings
          </h2>
          <p className="text-base-content/60 mt-1">
            Manage your personal profile and preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-base-100 lg:col-span-2 xl:col-span-1 rounded-3xl shadow-sm border border-base-200 overflow-hidden h-fit"
        >
          {/* Cover Gradient */}
          <div className="h-32 bg-gradient-to-r from-primary to-secondary opacity-90 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="px-8 pb-8 text-center -mt-16 relative">
            {/* Avatar */}
            <div className="avatar mb-4">
              <div className="w-32 rounded-full ring ring-base-100 ring-offset-2 ring-offset-base-100 shadow-xl bg-base-100">
                <img src={user?.photoURL || "https://i.ibb.co/de/avatar.png"} alt="Profile" />
              </div>
            </div>

            {/* Info */}
            <h3 className="text-2xl font-bold font-serif text-base-content">
              {user?.displayName}
            </h3>
            <p className="text-sm opacity-60 mb-4">{user?.email}</p>

            {/* Role Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              <FaShieldAlt /> {role || "User Account"}
            </div>

            <div className="divider my-6"></div>

            {/* Meta Details */}
            <div className="space-y-3 text-sm text-left">
              <div className="flex items-center gap-3 text-base-content/70">
                <FaCalendarAlt className="text-primary opacity-60" />
                <span>Joined {new Date(user?.metadata?.creationTime).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-base-content/70">
                <FaGlobe className="text-primary opacity-60" />
                <span>Status: <span className="text-success font-bold">Active</span></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Edit Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 bg-base-100 p-8 rounded-3xl border border-base-200 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-base-200">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
              <FaUser />
            </div>
            <div>
              <h3 className="font-bold text-lg">Edit Details</h3>
              <p className="text-xs opacity-60">Update your public information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Name Input */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("name")}
                  className="input input-bordered w-full pl-10 rounded-xl focus:border-primary focus:outline-none transition-all"
                  placeholder="Your Name"
                />
                <FaUser className="absolute left-4 top-3.5 text-base-content/30" />
              </div>
            </div>

            {/* Photo URL Input */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">
                Avatar URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("photoURL")}
                  className="input input-bordered w-full pl-10 rounded-xl focus:border-primary focus:outline-none transition-all"
                  placeholder="https://..."
                />
                <FaCamera className="absolute left-4 top-3.5 text-base-content/30" />
              </div>
              <label className="label text-[10px] opacity-50">
                * Use a direct image link (ImgBB, Unsplash, etc.)
              </label>
            </div>

            {/* Email Input (Disabled) */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={user?.email}
                  disabled
                  className="input input-bordered w-full pl-10 rounded-xl bg-base-200/50 text-base-content/50 border-base-200 cursor-not-allowed"
                />
                <FaEnvelope className="absolute left-4 top-3.5 text-base-content/30" />
              </div>
              <label className="label text-[10px] text-warning font-medium">
                Email cannot be changed for security reasons.
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                disabled={loading}
                className="btn btn-primary w-full sm:w-auto rounded-xl px-8 text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
};
export default UserProfile;