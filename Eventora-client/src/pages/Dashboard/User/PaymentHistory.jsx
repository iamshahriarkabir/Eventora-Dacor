import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaWallet, FaReceipt, FaArrowDown, FaCalendarCheck } from "react-icons/fa";
import CountUp from "react-countup";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const PaymentHistory = () => {
  const { user } = use(AuthContext);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filter only paid items
      return res.data.filter((item) => item.transactionId);
    },
  });

  const totalSpent = payments.reduce((acc, curr) => acc + curr.price, 0);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      
      {/* Header Area (Responsive) */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-base-content">
            Billing History
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            View all your invoices and transaction details.
          </p>
        </div>
      </div>

      {/* Summary Card (Theme Aware) */}
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-2xl shadow-lg text-primary-content flex flex-col md:flex-row items-center justify-between relative overflow-hidden gap-6">
        <div className="relative z-10 text-center md:text-left">
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80 mb-2 flex items-center justify-center md:justify-start gap-2">
            <FaWallet /> Total Expenditure
          </p>
          <h3 className="text-4xl md:text-5xl font-serif font-bold">
            $<CountUp end={totalSpent} duration={2} separator="," />
          </h3>
        </div>
        
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl text-white backdrop-blur-md relative z-10 shadow-inner">
          <FaArrowDown />
        </div>
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      </div>

      {/* Transactions Table Container */}
      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Header */}
            <thead className="bg-base-200/50 text-base-content/60 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="pl-6 py-4">Date</th>
                <th>Description</th>
                <th>Transaction ID</th>
                <th className="text-right pr-6">Amount</th>
              </tr>
            </thead>
            
            {/* Body */}
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-base-200 last:border-none hover:bg-base-200/30 transition-colors"
                >
                  <td className="pl-6 py-4 text-sm font-medium text-base-content/70 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FaCalendarCheck className="text-primary/50" />
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="font-bold text-base-content whitespace-nowrap md:whitespace-normal">
                      {payment.serviceName}
                    </div>
                    <div className="text-xs opacity-50 mt-0.5">
                      Type: {payment.category || "Event"}
                    </div>
                  </td>
                  <td>
                    <span className="bg-base-200 text-base-content/70 px-3 py-1 rounded-md text-xs font-mono border border-base-300 flex w-fit items-center gap-2 whitespace-nowrap">
                      <FaReceipt className="opacity-50" /> {payment.transactionId.slice(0, 14)}...
                    </span>
                  </td>
                  <td className="text-right pr-6">
                    <span className="font-bold text-primary text-base">
                      ${payment.price.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {payments.length === 0 && (
          <div className="p-12 text-center text-base-content/40">
            <FaWallet className="mx-auto text-4xl mb-3 opacity-20" />
            <p>No transactions recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default PaymentHistory;