import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaDollarSign, FaUsers, FaBoxOpen, FaClipboardList, FaArrowUp } from "react-icons/fa";

const AdminHome = () => {
  const { user } = use(AuthContext);

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const chartData = [
    { name: "Services", count: stats.totalServices || 0 },
    { name: "Users", count: stats.totalUsers || 0 },
    { name: "Bookings", count: stats.totalBookings || 0 },
    { name: "Revenue", count: (stats.revenue || 0) / 100 }, // Scaled for visual balance
  ];

  // --- ORIGINAL CHART SHAPE (TriangleBar) ---
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Header with Date */}
      <div className="flex flex-col md:flex-row justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold text-base-content">
            Dashboard Overview
          </h2>
          <p className="text-base-content/60 mt-1">
            Real-time insights for <span className="font-bold text-primary">{user?.displayName}</span>
          </p>
        </div>
        <div className="text-sm font-bold opacity-50 bg-base-100 px-4 py-2 rounded-lg shadow-sm border border-base-200">
          {new Date().toDateString()}
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Revenue */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <FaDollarSign size={20} />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-md">
              <FaArrowUp /> 12%
            </div>
          </div>
          <h3 className="text-3xl font-bold font-serif mb-1">
            $<CountUp end={stats.revenue || 0} duration={2} separator="," />
          </h3>
          <p className="text-xs font-bold uppercase tracking-wider opacity-50">Total Revenue</p>
        </div>

        {/* Users */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
              <FaUsers size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-bold font-serif mb-1">
            <CountUp end={stats.totalUsers || 0} duration={2} />
          </h3>
          <p className="text-xs font-bold uppercase tracking-wider opacity-50">Total Users</p>
        </div>

        {/* Bookings */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <FaClipboardList size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-bold font-serif mb-1">
            <CountUp end={stats.totalBookings || 0} duration={2} />
          </h3>
          <p className="text-xs font-bold uppercase tracking-wider opacity-50">Total Bookings</p>
        </div>

        {/* Services */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-info"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-info/10 rounded-xl text-info">
              <FaBoxOpen size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-bold font-serif mb-1">
            <CountUp end={stats.totalServices || 0} duration={2} />
          </h3>
          <p className="text-xs font-bold uppercase tracking-wider opacity-50">Active Services</p>
        </div>
      </div>

      {/* 3. CHARTS & ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Original Triangle Bar Chart */}
        <div className="lg:col-span-3 xl:col-span-2 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
          <h3 className="font-bold text-lg mb-6">Performance Metrics</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-base-200)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'gray'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'gray'}} />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ 
                        backgroundColor: 'var(--color-base-100)', 
                        borderColor: 'var(--color-base-200)',
                        borderRadius: '12px' 
                    }} 
                />
                <Bar
                  dataKey="count"
                  fill="var(--color-primary)"
                  shape={<TriangleBar />}
                  label={{ position: "top", fill: "gray" }}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={index % 2 === 0 ? "var(--color-primary)" : "var(--color-secondary)"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Panel */}
        <div className="bg-base-100 lg:col-span-3 xl:col-span-1 p-6 rounded-2xl shadow-sm border border-base-200 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-6">System Health</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase opacity-60 mb-2">
                  <span>Server Load</span>
                  <span className="text-success">Optimal</span>
                </div>
                <progress className="progress progress-success w-full h-2" value="25" max="100"></progress>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase opacity-60 mb-2">
                  <span>Storage</span>
                  <span className="text-warning">60%</span>
                </div>
                <progress className="progress progress-warning w-full h-2" value="60" max="100"></progress>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase opacity-60 mb-2">
                  <span>API Uptime</span>
                  <span className="text-primary">99.9%</span>
                </div>
                <progress className="progress progress-primary w-full h-2" value="99" max="100"></progress>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-base-200 rounded-xl border border-base-300">
            <p className="text-xs font-bold text-primary mb-1">PRO TIP</p>
            <p className="text-xs opacity-70">Check "Manage Bookings" for pending payments before assigning decorators.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminHome;