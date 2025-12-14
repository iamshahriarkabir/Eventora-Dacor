import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaWallet,
} from "react-icons/fa";
import CountUp from "react-countup";

const DecoratorHome = () => {
  const { user } = use(AuthContext);

  const { data: projects = [] } = useQuery({
    queryKey: ["decorator-stats"],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const total = projects.length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const active = total - completed;
  const totalEarnings = projects
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="space-y-8">
      
      {/* 1. Welcome Banner (Screenshot Style) */}
      <div className="bg-gradient-to-r from-primary to-secondary/80 text-primary-content p-10 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-serif font-bold mb-3">
            Welcome back, {user?.displayName.split(" ")[0]}
          </h2>
          <p className="opacity-90 text-lg">
            You have <span className="font-bold underline decoration-2 underline-offset-4">{active} active projects</span> requiring your attention today.
          </p>
        </div>
        {/* Abstract Circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
      </div>

      {/* 2. Stats Grid (Black Cards Style in Dark Mode) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Earnings */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <FaWallet size={60} />
          </div>
          <div className="flex items-center gap-3 text-base-content/60 font-bold uppercase tracking-widest text-xs">
            <div className="p-2 bg-base-200 rounded-lg"><FaWallet /></div>
            Total Earnings
          </div>
          <div className="text-4xl font-serif font-bold text-base-content">
            $<CountUp end={totalEarnings} duration={2} separator="," />
          </div>
        </div>

        {/* Active */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <FaClock size={60} />
          </div>
          <div className="flex items-center gap-3 text-base-content/60 font-bold uppercase tracking-widest text-xs">
            <div className="p-2 bg-base-200 rounded-lg"><FaClock /></div>
            In Progress
          </div>
          <div className="text-4xl font-serif font-bold text-base-content">
            <CountUp end={active} duration={2} />
          </div>
        </div>

        {/* Completed */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <FaCheckCircle size={60} />
          </div>
          <div className="flex items-center gap-3 text-base-content/60 font-bold uppercase tracking-widest text-xs">
            <div className="p-2 bg-base-200 rounded-lg"><FaCheckCircle /></div>
            Completed
          </div>
          <div className="text-4xl font-serif font-bold text-base-content">
            <CountUp end={completed} duration={2} />
          </div>
        </div>

        {/* Total Assigned */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <FaClipboardList size={60} />
          </div>
          <div className="flex items-center gap-3 text-base-content/60 font-bold uppercase tracking-widest text-xs">
            <div className="p-2 bg-base-200 rounded-lg"><FaClipboardList /></div>
            Total Assigned
          </div>
          <div className="text-4xl font-serif font-bold text-base-content">
            <CountUp end={total} duration={2} />
          </div>
        </div>
      </div>

      {/* 3. Workflow Guide (Matches Screenshot Logic) */}
      <div className="bg-base-100 p-8 rounded-2xl border border-base-200 shadow-sm">
        <h3 className="text-xl font-bold font-serif mb-8 text-base-content">Standard Operating Procedure</h3>
        
        <div className="w-full overflow-x-auto pb-4">
          <ul className="steps steps-vertical lg:steps-horizontal w-full min-w-[600px]">
            <li className="step step-primary font-bold text-sm">Assigned</li>
            <li className="step step-primary font-bold text-sm">Planning Phase</li>
            <li className="step step-primary font-bold text-sm">Material Check</li>
            <li className="step font-bold text-sm opacity-50">On Route</li>
            <li className="step font-bold text-sm opacity-50">Setup & Styling</li>
            <li className="step font-bold text-sm opacity-50">Completion</li>
          </ul>
        </div>

        <div className="mt-6 bg-base-200/50 p-4 rounded-xl text-xs font-medium opacity-70 border border-base-200">
          <strong>Note:</strong> Please ensure high-quality photos are taken after setup completion for the gallery updates.
        </div>
      </div>
    </div>
  );
};
export default DecoratorHome;