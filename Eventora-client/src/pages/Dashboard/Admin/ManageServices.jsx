import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt, FaTag, FaTimes, FaSave } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// --- Edit Modal Component (Redesigned) ---
const EditModal = ({ service, onClose, refetch, user }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: service,
  });

  const onSubmit = async (data) => {
    try {
      const token = await user.getIdToken();
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/services/${service._id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        onClose();
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Service details have been saved.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-base-100 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-base-200 flex justify-between items-center bg-base-100 z-10">
            <div>
              <h3 className="text-xl font-serif font-bold text-base-content">Edit Service</h3>
              <p className="text-xs text-base-content/50 mt-1">Update package details</p>
            </div>
            <button 
              onClick={onClose} 
              className="btn btn-circle btn-sm btn-ghost hover:bg-base-200 text-base-content/60"
            >
              <FaTimes />
            </button>
          </div>

          {/* Form Content (Scrollable) */}
          <div className="p-8 overflow-y-auto custom-scrollbar">
            <form id="edit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-wide opacity-60 mb-1">Service Title</label>
                <input
                  {...register("service_name", { required: true })}
                  className="input input-bordered w-full rounded-xl focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-xs font-bold uppercase tracking-wide opacity-60 mb-1">Price ($)</label>
                  <input
                    type="number"
                    {...register("cost", { required: true })}
                    className="input input-bordered w-full rounded-xl focus:border-primary focus:outline-none transition-all"
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-bold uppercase tracking-wide opacity-60 mb-1">Category</label>
                  <select
                    {...register("category")}
                    className="select select-bordered w-full rounded-xl focus:border-primary focus:outline-none transition-all"
                  >
                    <option>Wedding</option>
                    <option>Home</option>
                    <option>Office</option>
                    <option>Birthday</option>
                    <option>Corporate</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-wide opacity-60 mb-1">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered h-32 rounded-xl focus:border-primary focus:outline-none transition-all text-base leading-relaxed"
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-wide opacity-60 mb-1">Image URL</label>
                <input
                  type="text"
                  {...register("image", { required: true })}
                  className="input input-bordered w-full rounded-xl focus:border-primary focus:outline-none transition-all text-sm"
                />
              </div>

            </form>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-base-200 bg-base-50 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost flex-1 rounded-xl text-base-content/70 hover:bg-base-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="edit-form"
              className="btn btn-primary flex-1 rounded-xl text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <FaSave /> Save Changes
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- Main Component ---
const ManageServices = () => {
  const { user } = use(AuthContext);
  const [editingService, setEditingService] = useState(null);

  const { data: services = [], refetch } = useQuery({
    queryKey: ["manage-services"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/services?limit=100`
      );
      return Array.isArray(res.data) ? res.data : res.data.services || [];
    },
  });

  const handleDelete = (item) => {
    Swal.fire({
      title: "Delete Service?",
      text: "This will remove it from the public catalog.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
      customClass: {
        popup: 'rounded-2xl'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = await user.getIdToken();
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/services/${item._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Service removed.", "success");
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold font-serif text-base-content">
            Service Catalog
          </h2>
          <p className="text-xs text-base-content/60 mt-1">
            Manage your offerings and pricing.
          </p>
        </div>
        <div className="badge badge-lg bg-base-200 text-base-content/70 font-bold border-none px-4 py-3">
          Total: {services.length}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Elegant Header */}
            <thead className="bg-base-200/50 text-base-content/60 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="pl-6 py-4">Service Details</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-base-200 last:border-none hover:bg-base-50 transition-colors group"
                >
                  <td className="pl-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-16 h-12 rounded-lg bg-base-300 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                          <img
                            src={item.image}
                            alt="Service"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-base-content line-clamp-1 group-hover:text-primary transition-colors">
                          {item.service_name}
                        </div>
                        <div className="text-xs text-base-content/40 mt-0.5 font-mono">
                          ID: {item._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <FaTag className="text-xs opacity-30" />
                      <span className="badge badge-sm badge-ghost font-medium text-xs">
                        {item.category}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-bold font-mono text-base-content">
                      ${item.cost}
                    </div>
                  </td>
                  <td className="text-right pr-6">
                    <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingService(item)}
                        className="btn btn-sm btn-square btn-ghost text-warning hover:bg-warning/10 rounded-lg tooltip tooltip-left"
                        data-tip="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="btn btn-sm btn-square btn-ghost text-error hover:bg-error/10 rounded-lg tooltip tooltip-left"
                        data-tip="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Modal */}
      {editingService && (
        <EditModal
          service={editingService}
          onClose={() => setEditingService(null)}
          refetch={refetch}
          user={user}
        />
      )}
    </div>
  );
};
export default ManageServices;