import { useState, useEffect } from "react";
import { Link } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowLeft, FaEnvelope, FaKey } from "react-icons/fa";
import { auth } from "../../firebase/firebase.init";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Eventora | Reset Password";
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast.success("Reset link sent! Please check your email inbox.", { duration: 4000 });
    } catch (error) {
      console.error(error);
      const msg = error.code === 'auth/user-not-found' 
        ? "No account found with this email." 
        : "Failed to send reset link.";
      toast.error(msg);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 relative overflow-hidden p-4">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Floating Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10"
      >
        
        {/* 1. LEFT SIDE: Visual */}
        <div className="md:w-1/2 relative bg-black hidden md:block">
          <img
            src="https://i.ibb.co.com/RkdW87CN/lock.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="Security"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
            <Link to="/login" className="flex items-center gap-2 group w-fit text-white/80 hover:text-white transition-colors">
              <FaArrowLeft /> Back to Login
            </Link>

            <div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <FaKey className="text-3xl" />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">
                Forgot your <br/> Password?
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Don't worry, it happens. We'll help you recover your account in a few simple steps.
              </p>
            </div>
          </div>
        </div>

        {/* 2. RIGHT SIDE: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-base-100">
          
          {/* Mobile Back Button */}
          <Link to="/login" className="md:hidden flex items-center gap-2 text-sm text-base-content/60 mb-8">
            <FaArrowLeft /> Back
          </Link>

          <div className="mb-8">
            <h3 className="text-2xl font-bold font-serif text-base-content mb-2">Reset Password</h3>
            <p className="text-base-content/60 text-sm">Enter your email to receive a recovery link.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wide opacity-70 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full pl-10 rounded-xl bg-base-200/30 focus:bg-base-100 focus:border-primary focus:outline-none transition-all"
                  placeholder="name@example.com"
                />
                <FaEnvelope className="absolute z-10 left-3.5 top-3.5 text-base-content/30" />
              </div>
            </div>

            <button
              disabled={loading}
              className="btn btn-primary w-full rounded-xl text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-base-content/40">
            Remember your password? <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
export default ForgotPassword;