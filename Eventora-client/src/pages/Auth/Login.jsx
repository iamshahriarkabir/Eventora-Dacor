import { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { FaGoogle, FaArrowLeft, FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { getErrorMessage } from "../../utils/authHelpers"; 

const Login = () => {
  const { signIn, googleSignIn } = use(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Eventora | Sign In";
  }, []);

  const onSubmit = (data) => {
    const toastId = toast.loading("Signing in...");
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Welcome back!", { id: toastId });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const msg = getErrorMessage(error.code);
        toast.error(msg, { id: toastId });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          email: user?.email,
          name: user?.displayName,
          photo: user?.photoURL,
        };
        axios
          .post(`${import.meta.env.VITE_API_URL}/auth/user`, userInfo)
          .then(() => {
            toast.success("Welcome back!");
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        const msg = getErrorMessage(error.code);
        toast.error(msg);
      });
  };

  return (
    <div className="min-h-screen py-24 flex items-center justify-center bg-base-200 relative overflow-hidden px-4">
      
      {/* Background Decor (Abstract Blobs) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Floating Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-base-100 w-full max-w-5xl h-auto md:h-[600px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10"
      >
        
        {/* 1. LEFT SIDE: Artistic Banner */}
        <div className="md:w-1/2 relative bg-black hidden md:block">
          <img
            src="https://i.ibb.co.com/nq5WTmD2/deco5.webp"
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-x-[-1]"
            alt="Luxury Event"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/90 to-transparent mix-blend-multiply"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaArrowLeft size={14} />
              </div>
              <span className="text-sm font-bold tracking-wide">Back to Home</span>
            </Link>

            <div>
              <h2 className="text-4xl font-serif font-bold mb-4 leading-tight">
                Crafting <br/> Unforgettable <br/> Moments.
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Log in to manage your bookings, connect with top decorators, and bring your vision to life.
              </p>
            </div>

            {/* <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
            </div> */}
          </div>
        </div>

        {/* 2. RIGHT SIDE: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-base-100">
          
          {/* Mobile Back Button */}
          <Link to="/" className="md:hidden flex items-center gap-2 text-sm text-base-content/60 mb-8">
            <FaArrowLeft /> Back
          </Link>

          <div className="mb-8">
            <h3 className="text-3xl font-bold font-serif text-base-content mb-2">Welcome Back!</h3>
            <p className="text-base-content/60 text-sm">Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email Field */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full pl-10 rounded-xl bg-base-200/30 focus:bg-base-100 focus:border-primary focus:outline-none transition-all"
                  placeholder="Enter your email"
                />
                <FaEnvelope className="absolute left-3.5 z-10 top-3.5 text-base-content/30" />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="input input-bordered w-full pl-10 rounded-xl bg-base-200/30 focus:bg-base-100 focus:border-primary focus:outline-none transition-all"
                  placeholder="••••••••"
                />
                <FaLock className="absolute left-3.5 top-3 z-10 text-base-content/30" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 z-10 top-3 text-base-content/40 hover:text-primary transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <label className="label text-right mt-1">
                <Link to="/forgot-password" class="label-text-alt link link-hover text-primary font-bold">
                  Forgot password?
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary w-full rounded-xl text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
              Sign In
            </button>
          </form>

          <div className="divider text-xs uppercase tracking-widest opacity-50 my-6">Or</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full rounded-xl gap-3 border-base-300 hover:bg-base-200 hover:text-base-content hover:border-base-300 font-medium normal-case"
          >
            <FaGoogle className="text-lg" /> Sign in with Google
          </button>

          <p className="text-center mt-8 text-sm text-base-content/60">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};
export default Login;