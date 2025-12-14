import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  FaEye,
  FaTrashAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCreditCard,
  FaSortAmountDown,
  FaHashtag,
} from "react-icons/fa";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  // Sorting Logic
  const sortedBookings = [...bookings].sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
    if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortOrder === "priceHigh") return b.price - a.price;
    return 0;
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Event?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Cancel",
      background: "var(--color-base-100)",
      color: "var(--color-base-content)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await user.getIdToken();
          await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          refetch();
          toast.success("Booking cancelled.");
        } catch (error) {
          toast.error("Failed to cancel.");
        }
      }
    });
  };

  const openTrackingModal = (booking) => {
    setSelectedBooking(booking);
    document.getElementById("tracking_modal").showModal();
  };

  const steps = [
    "pending",
    "paid",
    "assigned",
    "planning",
    "materials",
    "on_way",
    "setup",
    "completed",
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      
      {/* HEADER & SORTING */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-base-200 pb-6">
        <div>
          <h2 className="text-3xl font-serif font-bold text-base-content">
            My Bookings
          </h2>
          <p className="text-base-content/60 mt-1">
            Manage your upcoming and past events.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm btn-outline border-base-300 hover:border-primary hover:bg-base-100 hover:text-base-content rounded-full px-4 font-normal">
            <FaSortAmountDown /> 
            {sortOrder === 'newest' ? 'Newest First' : sortOrder === 'oldest' ? 'Oldest First' : 'Price High-Low'}
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-xl w-40 border border-base-200 mt-2">
            <li><a onClick={() => setSortOrder("newest")}>Newest First</a></li>
            <li><a onClick={() => setSortOrder("oldest")}>Oldest First</a></li>
            <li><a onClick={() => setSortOrder("priceHigh")}>Price: High</a></li>
          </ul>
        </div>
      </div>

      {/* BOOKING CARDS LIST */}
      <div className="grid gap-5">
        {sortedBookings.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-300">
            <div className="text-6xl mb-4 opacity-20 grayscale">📅</div>
            <h3 className="text-xl font-bold opacity-60">No bookings found.</h3>
            <Link to="/services" className="btn btn-primary btn-sm rounded-full text-white px-6 mt-4">
              Book an Event
            </Link>
          </div>
        ) : (
          sortedBookings.map((booking) => (
            <div
              key={booking._id}
              className="group relative bg-base-100 rounded-2xl p-4 border border-base-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 overflow-hidden"
            >
              {/* Left: Image */}
              <div className="w-full md:w-64 h-48 md:h-40 shrink-0 overflow-hidden rounded-xl relative">
                <img
                  src={booking.image || "https://via.placeholder.com/150"}
                  alt="Service"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>

              {/* Middle: Info */}
              <div className="flex-1 flex flex-col justify-center space-y-2">
                <h3 className="text-2xl font-serif font-bold text-base-content group-hover:text-primary transition-colors">
                  {booking.serviceName}
                </h3>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-base-content/60">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" /> 
                    {new Date(booking.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" /> 
                    {booking.address}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-base-content/40 mt-1 uppercase tracking-wider">
                  <FaHashtag /> ID: {booking._id.slice(-6)}
                </div>
              </div>

              {/* Right: Actions & Price */}
              <div className="flex flex-col justify-between items-end md:w-48 pl-4 md:border-l border-base-200">
                <div className="text-right">
                  <span className="text-3xl font-serif font-bold text-base-content">
                    ${booking.price}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-3 w-full">
                  {/* Status Badge */}
                  <span
                    className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border
                      ${booking.status === 'completed' ? 'bg-success text-success-content border-success' : 
                        booking.status === 'pending' ? 'bg-warning text-warning-content border-warning' :
                        booking.status === 'paid' ? 'bg-info text-info-content border-info' :
                        'bg-primary text-primary-content border-primary'
                      }`}
                  >
                    {booking.status.replace("_", " ")}
                  </span>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 mt-auto">
                    {booking.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="btn btn-circle btn-sm btn-ghost text-error hover:bg-error/10 tooltip tooltip-left"
                          data-tip="Cancel"
                        >
                          <FaTrashAlt />
                        </button>
                        <Link
                          to={`/book/${booking.serviceId}`}
                          className="btn btn-sm bg-gradient-to-r from-yellow-400 to-orange-500 border-none text-white hover:brightness-110 px-6 rounded-full shadow-md"
                        >
                          Pay Now
                        </Link>
                      </>
                    ) : (
                      <button
                        onClick={() => openTrackingModal(booking)}
                        className="btn btn-sm btn-outline rounded-full px-6 hover:bg-base-content hover:text-base-100 transition-colors flex items-center gap-2"
                      >
                        <FaEye /> Track
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* TRACKING MODAL */}
      <dialog id="tracking_modal" className="modal backdrop-blur-md">
        <div className="modal-box w-11/12 max-w-4xl bg-base-100 rounded-3xl p-8 border border-base-200 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-serif font-bold text-2xl">Project Timeline</h3>
              <p className="text-sm opacity-60">Real-time updates from your decorator</p>
            </div>
            <form method="dialog">
              <button className="btn btn-circle btn-sm btn-ghost hover:bg-base-200">✕</button>
            </form>
          </div>

          {selectedBooking && (
            <div className="w-full overflow-x-auto pb-4">
              <ul className="steps steps-vertical lg:steps-horizontal w-full min-w-[600px]">
                {steps.map((step, idx) => {
                  const currentStatusIndex = steps.indexOf(selectedBooking.status);
                  const isStepCompleted = idx <= currentStatusIndex;
                  return (
                    <li
                      key={step}
                      className={`step ${isStepCompleted ? "step-primary" : ""} capitalize font-bold text-xs`}
                      data-content={isStepCompleted ? "✓" : "●"}
                    >
                      {step.replace("_", " ")}
                    </li>
                  );
                })}
              </ul>
              
              <div className="mt-8 p-4 bg-base-200/50 rounded-xl text-center border border-base-200">
                <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">Current Phase</p>
                <p className="text-2xl font-bold text-primary animate-pulse">
                  {selectedBooking.status.replace("_", " ").toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
export default MyBookings;