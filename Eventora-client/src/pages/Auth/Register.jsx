import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft, FaEye, FaEyeSlash, FaCamera, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { getErrorMessage, passwordValidation } from "../../utils/authHelpers";

const Register = () => {
  const { createUser, updateUserProfile } = use(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Eventora | Join Us";
  }, []);

  const onSubmit = (data) => {
    const toastId = toast.loading("Creating account...");

    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: data.photoURL,
          };
          axios
            .post(`${import.meta.env.VITE_API_URL}/auth/user`, userInfo)
            .then((res) => {
              if (res.data.insertedId || res.data.message) {
                toast.success("Welcome to Eventora!", { id: toastId });
                navigate("/");
              }
            });
        });
      })
      .catch((error) => {
        const msg = getErrorMessage(error.code);
        toast.error(msg, { id: toastId });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 relative overflow-hidden p-4">
      
      {/* Background Decor (Abstract Blobs - Matches Login) */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Floating Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-base-100 w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10"
      >
        
        {/* 1. LEFT SIDE: Artistic Banner */}
        <div className="md:w-1/2 relative bg-black hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            alt="Event Planning"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent mix-blend-multiply"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaArrowLeft size={14} />
              </div>
              <span className="text-sm font-bold tracking-wide">Back to Home</span>
            </Link>

            <div>
              <h2 className="text-4xl font-serif font-bold mb-4 leading-tight">
                Join the <br/> Elite Circle.
              </h2>
              <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                Create an account to start your journey with the ultimate event styling platform. Design moments that matter.
              </p>
            </div>

            {/* <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
            </div> */}
          </div>
        </div>

        {/* 2. RIGHT SIDE: Register Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-base-100">
          
          {/* Mobile Back Button */}
          <Link to="/" className="md:hidden flex items-center gap-2 text-sm text-base-content/60 mb-6">
            <FaArrowLeft /> Back
          </Link>

          <div className="mb-6">
            <h3 className="text-3xl font-bold font-serif text-base-content mb-2">Get Started</h3>
            <p className="text-base-content/60 text-sm">Create your free account today.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Full Name */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full pl-10 rounded-xl bg-base-200/30 focus:bg-base-100 focus:border-primary transition-all"
                  placeholder="John Doe"
                />
                <FaUser className="absolute left-3.5 top-3.5 text-base-content/30" />
              </div>
              {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Photo URL</label>
              <div className="relative">
                <input
                  type="text"
                  {...register("photoURL", { required: "Photo URL is required" })}
                  className="input input-bordered w-full pl-10 rounded-xl bg-base-200/30 focus:bg-base-100 focus:border-primary transition-all"
                  placeholder="https://..."
                />
                <FaCamera className="absolute left-3.5 top-3.5 text-base-content/30" />
              </div>
              {errors.photoURL && <span className="text-error text-xs mt-1">{errors.photoURL.message}</span>}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full pl-10 rounded-xl bg-base-200/30 focus:bg-base-100 focus:border-primary transition-all"
                  placeholder="name@example.com"
                />
                <FaEnvelope className="absolute left-3.5 top-3.5 text-base-content/30" />
              </div>
              {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", passwordValidation)}
                  className="input input-bordered w-full pl-10 pr-10 rounded-xl bg-base-200/30 focus:bg-base-100 focus:border-primary transition-all"
                  placeholder="••••••••"
                />
                <FaLock className="absolute left-3.5 top-3.5 text-base-content/30" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-base-content/40 hover:text-primary transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary w-full rounded-xl text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 mt-2">
              Create Account
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-base-content/60">
            Already a member?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};
export default Register;