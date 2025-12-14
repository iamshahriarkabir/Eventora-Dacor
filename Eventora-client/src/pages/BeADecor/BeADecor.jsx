import { use } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import SectionTitle from "../../components/shared/SectionTitle";
import { motion } from "framer-motion";
import { 
  FaBriefcase, 
  FaUserTie, 
  FaLink, 
  FaMagic, 
  FaMoneyBillWave, 
  FaChartLine 
} from "react-icons/fa";

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
    {
      icon: <FaMoneyBillWave />,
      title: "High Earnings",
      desc: "Set your own rates and get paid securely for every successful event.",
    },
    {
      icon: <FaBriefcase />,
      title: "Consistent Projects",
      desc: "Access a steady stream of high-end clients looking for your expertise.",
    },
    {
      icon: <FaChartLine />,
      title: "Build Your Brand",
      desc: "Showcase your portfolio to thousands and grow your reputation.",
    },
  ];

  return (
    <div className="bg-base-100 min-h-screen">
      
      {/* 1. HERO BANNER */}
      <div className="relative h-[400px] flex items-center justify-center bg-primary text-primary-content overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop" 
            alt="Creative Team" 
            className="w-full h-full object-cover opacity-20 mix-blend-multiply"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-4"
          >
            Become an Eventora Expert
          </motion.h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join the elite network of decorators transforming spaces and creating memories.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        
        {/* 2. BENEFITS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {benefits.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-base-100 rounded-3xl border border-base-200 shadow-sm hover:shadow-lg transition-all text-center group"
            >
              <div className="w-16 h-16 mx-auto bg-base-200 rounded-2xl flex items-center justify-center text-3xl text-primary mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-base-content/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 3. APPLICATION FORM SECTION */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left: Image & Context */}
          <div className="lg:w-5/12 relative min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop" 
              alt="Designer working" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10 text-white">
              <h3 className="text-3xl font-serif font-bold mb-2">Ready to Start?</h3>
              <p className="opacity-80">Fill out the form to apply. Our team reviews every portfolio personally.</p>
            </div>
          </div>

          {/* Right: The Form */}
          <div className="lg:w-7/12 bg-base-100 p-8 md:p-12 rounded-[2.5rem] border border-base-200 shadow-xl">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-base-content">Application Form</h2>
              <p className="text-base-content/60 mt-2">Tell us about your expertise.</p>
            </div>

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
                    className="input input-bordered w-full pl-10 rounded-xl bg-base-200/50 text-base-content/50 border-base-200"
                  />
                  <FaUserTie className="absolute left-4 top-3.5 text-base-content/30" />
                </div>
              </div>

              {/* Specialty Select */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-wide opacity-70 mb-1">
                  Your Specialty
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
                  <FaMagic className="absolute left-4 top-3.5 text-base-content/30" />
                </div>
              </div>

              {/* Experience */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-wide opacity-70 mb-1">
                  Years of Experience
                </label>
                <div className="relative">
                  <input
                    type="number"
                    {...register("experience", { required: true })}
                    placeholder="e.g. 5"
                    className="input input-bordered w-full pl-10 rounded-xl focus:border-primary focus:outline-none"
                  />
                  <FaBriefcase className="absolute left-4 top-3.5 text-base-content/30" />
                </div>
              </div>

              {/* Portfolio Link */}
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-wide opacity-70 mb-1">
                  Portfolio URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("portfolio", { required: true })}
                    placeholder="https://instagram.com/yourwork"
                    className="input input-bordered w-full pl-10 rounded-xl focus:border-primary focus:outline-none"
                  />
                  <FaLink className="absolute left-4 top-3.5 text-base-content/30" />
                </div>
                <label className="label text-[10px] opacity-50">
                  * Link to your Instagram, Behance, or Website.
                </label>
              </div>

              <div className="pt-4">
                <button className="btn btn-primary w-full rounded-xl text-white text-lg shadow-lg hover:shadow-primary/20 hover:scale-[1.01] transition-transform">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JoinTeam;