import { use } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import SectionTitle from "../../components/shared/SectionTitle";
import { motion } from "framer-motion";
import { FaCheckCircle, FaBriefcase, FaMagic, FaLink, FaUserTie } from "react-icons/fa";

const JoinTeam = () => {
  const { user } = use(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!user) return toast.error("Please login to apply");

    const applicationData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      specialty: data.specialty,
      experience: data.experience,
      portfolio: data.portfolio,
      status: "pending",
      appliedAt: new Date(),
    };

    try {
      const token = await user.getIdToken();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/decorator-requests`,
        applicationData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.message) {
        toast.error(res.data.message);
      } else {
        toast.success("Application Submitted! Check your dashboard.");
        navigate("/dashboard/profile");
      }
    } catch (error) {
      toast.error("Failed to submit application");
    }
  };

  const benefits = [
    "Access to high-budget premium clients.",
    "Showcase your portfolio to thousands.",
    "Guaranteed secure payments.",
    "Manage projects via smart dashboard.",
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        <SectionTitle
          heading="Join Our Experts"
          subHeading="Become a Partner"
          center={true}
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-200 overflow-hidden flex flex-col lg:flex-row"
        >
          
          {/* LEFT SIDE: Visual & Benefits (Darker Theme) */}
          <div className="lg:w-5/12 bg-primary text-primary-content p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-serif font-bold mb-6">
                Why Eventora?
              </h3>
              <p className="opacity-90 mb-8 text-sm leading-relaxed">
                We connect talented decorators with clients looking for exceptional styling. Grow your business with us.
              </p>
              
              <ul className="space-y-5">
                {benefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FaCheckCircle className="mt-1 text-secondary shrink-0" />
                    <span className="font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Trusted By</p>
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-10 h-10 rounded-full border-2 border-primary" alt="" />
                   ))}
                   <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center text-xs font-bold border-2 border-primary">+50</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Application Form */}
          <div className="lg:w-7/12 p-10 lg:p-14 bg-base-100">
            <h3 className="text-2xl font-bold mb-8 text-base-content">Application Form</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Name (Read-only) */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-wide opacity-70 mb-1">
                  Applicant Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={user?.displayName}
                    disabled
                    className="input input-bordered w-full pl-10 rounded-xl bg-base-200/50 text-base-content/60"
                  />
                  <FaUserTie className="absolute left-4 top-3.5 z-10 text-base-content/40" />
                </div>
              </div>

              {/* Specialty & Experience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-wide opacity-70 mb-1">
                    Specialty
                  </label>
                  <div className="relative">
                    <select
                      {...register("specialty", { required: true })}
                      className="select select-bordered w-full pl-10 rounded-xl focus:border-primary focus:outline-none"
                    >
                      <option>Wedding Styling</option>
                      <option>Interior Design</option>
                      <option>Corporate Events</option>
                      <option>Lighting Expert</option>
                      <option>Floral Artist</option>
                    </select>
                    <FaMagic className="absolute left-4 z-10 top-3.5 text-base-content/40" />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-wide opacity-70 mb-1">
                    Experience (Years)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      {...register("experience", { required: true })}
                      placeholder="e.g. 5"
                      className="input input-bordered w-full pl-10 rounded-xl focus:border-primary focus:outline-none"
                    />
                    <FaBriefcase className="absolute left-4 z-10 top-3.5 text-base-content/40" />
                  </div>
                </div>
              </div>

              {/* Portfolio Link */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-wide opacity-70 mb-1">
                  Portfolio Link
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("portfolio", { required: true })}
                    placeholder="https://instagram.com/..."
                    className="input input-bordered w-full pl-10 rounded-xl focus:border-primary focus:outline-none"
                  />
                  <FaLink className="absolute left-4 z-10 top-3.5 text-base-content/40" />
                </div>
                <label className="label text-[10px] opacity-50">
                  * Link to your work samples (Instagram, Behance, Drive, etc.)
                </label>
              </div>

              <div className="pt-4">
                <button className="btn btn-primary w-full rounded-xl text-white shadow-lg hover:shadow-primary/30 transition-all hover:scale-[1.02]">
                  Submit Application
                </button>
              </div>
            </form>
          </div>

        </motion.div>
      </div>
    </div>
  );
};
export default JoinTeam;