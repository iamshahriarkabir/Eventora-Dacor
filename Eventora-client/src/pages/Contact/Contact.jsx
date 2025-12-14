import { useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
  useEffect(() => {
    document.title = "Eventora | Get in Touch";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch soon.");
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-base-100 pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-base-content/60">
            Have a project in mind? We'd love to hear about it. Let's discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* LEFT: Info Card (High Contrast) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary text-primary-content p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background Blob */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div>
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-60 uppercase mb-1">Call Us</p>
                    <p className="text-lg font-serif">+880 1700-000000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-60 uppercase mb-1">Email Us</p>
                    <p className="text-lg font-serif">hello@eventora.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-60 uppercase mb-1">Visit HQ</p>
                    <p className="text-lg font-serif leading-snug">Level 4, Gulshan Ave,<br/>Dhaka 1212</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <p className="text-sm opacity-60">Operating Hours: 10 AM - 7 PM</p>
            </div>
          </motion.div>

          {/* RIGHT: Minimalist Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-base-100 border border-base-200 p-8 md:p-12 rounded-3xl shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label text-sm font-bold text-base-content/70">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 rounded-xl"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label text-sm font-bold text-base-content/70">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label text-sm font-bold text-base-content/70">Subject</label>
                <input
                  type="text"
                  placeholder="Event Inquiry..."
                  className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 rounded-xl"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label text-sm font-bold text-base-content/70">Message</label>
                <textarea
                  className="textarea textarea-bordered h-40 w-full bg-base-200/30 focus:border-primary focus:bg-base-100 rounded-xl text-base"
                  placeholder="Tell us about your event..."
                  required
                ></textarea>
              </div>

              <button className="btn btn-primary rounded-xl px-10 text-white shadow-lg hover:shadow-primary/30">
                Send Message <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Contact;