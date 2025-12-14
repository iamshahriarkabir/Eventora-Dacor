import { use, useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import {
  FaCheckCircle,
  FaReceipt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("bookingId");

  // React 19 use() hook
  const { user } = use(AuthContext);

  const [status, setStatus] = useState("verifying");

  // Fix: Use a ref to track if we have already attempted verification
  // This prevents double-firing in Strict Mode and fixes the linter error
  const isVerified = useRef(false);

  useEffect(() => {
    // Guard clause: If missing data or already verified, stop.
    if (!sessionId || !bookingId || !user || isVerified.current) return;

    const verifyPayment = async () => {
      // Mark as running immediately to prevent race conditions
      isVerified.current = true;

      try {
        const token = await user.getIdToken();
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/payments/verify`,
          { sessionId, bookingId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatus(res.data.success ? "success" : "error");
      } catch (error) {
        console.error("Payment Verification Failed:", error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [sessionId, bookingId, user]); // Clean dependency array

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-base-100 shadow-2xl rounded-3xl border border-base-content/5 overflow-hidden"
      >
        {/* Header Gradient */}
        <div
          className={`h-32 flex items-center justify-center ${
            status === "error"
              ? "bg-error/10"
              : "bg-gradient-to-r from-primary to-secondary"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg ${
              status === "error"
                ? "bg-white text-error"
                : "bg-white text-secondary"
            }`}
          >
            {status === "verifying" && (
              <span className="loading loading-spinner"></span>
            )}
            {status === "success" && <FaCheckCircle />}
            {status === "error" && <FaExclamationTriangle />}
          </div>
        </div>

        <div className="p-8 text-center">
          {/* Verifying State */}
          {status === "verifying" && (
            <h2 className="text-2xl font-serif font-bold animate-pulse">
              Finalizing Booking...
            </h2>
          )}

          {/* Success State */}
          {status === "success" && (
            <>
              <h2 className="text-3xl font-serif font-bold mb-2">
                Payment Confirmed
              </h2>
              <p className="text-base-content/60 mb-8">
                Your booking has been secured. Our concierge will be in touch
                shortly.
              </p>

              <div className="bg-base-200/50 p-4 rounded-xl border border-base-content/5 mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="opacity-60">Ref ID</span>
                  <span className="font-mono font-bold">
                    {sessionId?.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Status</span>
                  <span className="text-success font-bold">Paid</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/dashboard/my-bookings"
                  className="btn btn-primary w-full rounded-full shadow-lg text-white"
                >
                  View Ticket <FaReceipt />
                </Link>
                <Link to="/" className="btn btn-ghost w-full rounded-full">
                  Back to Home
                </Link>
              </div>
            </>
          )}

          {/* Error State */}
          {status === "error" && (
            <>
              <h2 className="text-2xl font-bold text-error mb-2">
                Verification Failed
              </h2>
              <p className="text-base-content/60 mb-6">
                We couldn't verify the transaction automatically. If you were
                charged, please contact support.
              </p>
              <Link
                to="/contact"
                className="btn btn-outline w-full rounded-full"
              >
                Contact Support
              </Link>
              <Link to="/" className="btn btn-ghost w-full rounded-full mt-2">
                Back to Home
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
export default PaymentSuccess;
