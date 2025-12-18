import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaLock,
} from "react-icons/fa";

const ManageBookings = () => {
  const { user } = use(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Bookings
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  // Fetch Decorators List
  const { data: decorators = [] } = useQuery({
    queryKey: ["decorators-list"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/public/decorators`
      );
      return res.data;
    },
  });

  const handleAssignDecorator = async (bookingId, decoratorEmail) => {
    try {
      const token = await user.getIdToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`,
        { decoratorEmail, status: "assigned" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Expert Assigned Successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to assign");
    }
  };

  // Filter Logic
  const filteredBookings = bookings.filter(
    (b) =>
      b.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header Area (Responsive) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-base-100 p-4 rounded-xl border border-base-200 shadow-sm">
        <div className="w-full md:w-auto text-center md:text-left">
          <h2 className="text-xl font-bold font-serif text-base-content">
            Booking Orders
          </h2>
          <p className="text-xs text-base-content/60 mt-1">
            Track orders and assign team members.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-3.5 z-20 text-base-content/40" />
          <input
            type="text"
            placeholder="Search by ID, Service or Email..."
            className="input input-bordered w-full pl-10 h-11 bg-base-100 focus:bg-base-200 focus:border-primary focus:outline-none rounded-xl shadow-sm transition-colors text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Elegant Header */}
            <thead className="bg-base-200/50 text-base-content/70 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="pl-6 py-4">Service Info</th>
                <th>Client Details</th>
                <th>Date & Price</th>
                <th>Status</th>
                <th className="pr-6 text-right">Action / Assignment</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-base-200 last:border-none hover:bg-base-200/30 transition-colors"
                >
                  {/* 1. Service Info */}
                  <td className="pl-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-14 h-14 rounded-lg bg-base-300 shadow-sm">
                          <img
                            src={booking.image || "https://via.placeholder.com/150"}
                            alt="Service"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-base-content line-clamp-1">
                          {booking.serviceName}
                        </div>
                        <div className="text-xs font-mono opacity-50 mt-1 text-base-content">
                          #{booking._id.slice(-6).toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Client Info */}
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-base-content">{booking.userName}</span>
                      <span className="text-xs opacity-60 font-medium text-base-content">{booking.userEmail}</span>
                      <div className="flex items-center gap-1 text-[10px] opacity-50 mt-1 text-base-content">
                        <FaMapMarkerAlt /> {booking.address}
                      </div>
                    </div>
                  </td>

                  {/* 3. Date & Price */}
                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-base-content/70">
                        <FaCalendarAlt className="text-primary" /> 
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-success">
                        <FaMoneyBillWave /> 
                        ${booking.price}
                      </div>
                    </div>
                  </td>

                  {/* 4. Status Badge */}
                  <td>
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${
                          booking.status === "completed"
                            ? "bg-success/10 text-success border border-success/20"
                            : booking.status === "assigned"
                            ? "bg-purple-100 text-purple-600 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                            : booking.status === "paid"
                            ? "bg-info/10 text-info border border-info/20"
                            : "bg-warning/10 text-warning border border-warning/20"
                        }`}
                    >
                      {booking.status === "completed" && <FaCheckCircle />}
                      {booking.status}
                    </div>
                  </td>

                  {/* 5. Assignment Logic */}
                  <td className="pr-6 text-right">
                    {booking.status === "completed" ? (
                      <span className="text-xs font-bold text-success flex items-center justify-end gap-1">
                        <FaCheckCircle /> Archive
                      </span>
                    ) : booking.status === "pending" ? (
                      <div className="flex items-center justify-center gap-2 text-xs text-base-content/40 font-bold bg-base-200 px-3 py-2 rounded-lg border border-base-300 w-fit ml-auto">
                        <FaLock /> Await Payment
                      </div>
                    ) : (
                      <div className="form-control w-full max-w-[200px] ml-auto">
                        <select
                          className={`select select-sm select-bordered w-full text-xs rounded-lg focus:ring-0 focus:border-primary bg-base-100 text-base-content
                            ${booking.decoratorEmail ? "border-primary/50 text-primary font-bold " : "border-base-300 "}
                          `}
                          onChange={(e) =>
                            handleAssignDecorator(booking._id, e.target.value)
                          }
                          defaultValue={booking.decoratorEmail || ""}
                        >
                          <option disabled value="">
                            {booking.decoratorEmail ? "Re-assign Expert" : "Select Expert"}
                          </option>
                          {decorators.map((dec) => (
                            <option key={dec._id} value={dec.email}>
                              {dec.name} ({dec.specialty || 'General'})
                            </option>
                          ))}
                        </select>
                        {booking.decoratorEmail && (
                           <span className="text-[10px] text-primary/70 mt-1 pl-1 block text-left">
                              Assigned: {booking.decoratorEmail.split('@')[0]}
                           </span>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="p-10 text-center text-base-content/40 text-sm">
            No bookings found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};
export default ManageBookings;