import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { FaCheck, FaArrowRight, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const MyProjects = () => {
  const { user } = use(AuthContext);

  const {
    data: projects = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["decorator-projects"],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const steps = [
    "assigned",
    "planning",
    "materials",
    "on_way",
    "setup",
    "completed",
  ];

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = await user.getIdToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/bookings/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Project status updated: ${newStatus.replace("_", " ")}`);
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-base-content">
            Assigned Projects
          </h2>
          <p className="text-base-content/60 mt-1">
            Manage your workflow and updates.
          </p>
        </div>
        <div className="bg-base-100 border border-base-200 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
          Active: {projects.filter((p) => p.status !== "completed").length}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.length === 0 ? (
          <div className="text-center py-20 opacity-50 bg-base-100 rounded-3xl border border-dashed border-base-300">
            <h3 className="text-xl font-bold">No active projects</h3>
            <p className="text-sm">New assignments will appear here.</p>
          </div>
        ) : (
          projects.map((project) => {
            const currentStepIndex = steps.indexOf(project.status);
            const nextStep =
              currentStepIndex < steps.length - 1
                ? steps[currentStepIndex + 1]
                : null;
            const progress = ((currentStepIndex + 1) / steps.length) * 100;

            return (
              <div
                key={project._id}
                className="bg-base-100 rounded-2xl border border-base-200 shadow-sm overflow-hidden flex flex-col lg:flex-row group transition-all hover:shadow-md"
              >
                {/* 1. Date Sidebar (Matches Screenshot) */}
                <div className="bg-base-200/50 w-full lg:w-32 flex flex-col items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-base-200 text-center shrink-0">
                  <span className="text-4xl font-serif font-bold text-primary">
                    {new Date(project.date).getDate()}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                    {new Date(project.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </span>
                  <span className="text-[10px] font-bold opacity-40 mt-1">
                    {new Date(project.date).getFullYear()}
                  </span>
                </div>

                {/* 2. Main Content */}
                <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                  
                  {/* Top Row: Title & Status */}
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-base-content mb-2">
                        {project.serviceName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60">
                        <span className="flex items-center gap-1.5">
                          <FaUser className="text-primary" size={12} /> {project.userName}
                        </span>
                        <span className="hidden md:inline text-base-200">|</span>
                        <span className="flex items-center gap-1.5">
                          <FaMapMarkerAlt className="text-primary" size={12} /> {project.address}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Current Status</p>
                      <div className="badge badge-lg border-primary text-primary bg-primary/5 font-bold uppercase tracking-wide px-4 py-3">
                        {project.status.replace("_", " ")}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar (Matches Screenshot) */}
                  <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 w-full bg-base-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button (Right Aligned) */}
                  <div className="flex justify-end">
                    {nextStep ? (
                      <button
                        onClick={() => handleStatusUpdate(project._id, nextStep)}
                        className="btn btn-primary rounded-full px-8 text-white shadow-lg hover:shadow-primary/20 hover:scale-105 transition-transform"
                      >
                        Mark as {nextStep.replace("_", " ")} <FaArrowRight className="ml-2" />
                      </button>
                    ) : (
                      <button className="btn btn-success text-white rounded-full px-8 no-animation cursor-default shadow-lg">
                        <FaCheck className="mr-2" /> All Tasks Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default MyProjects;