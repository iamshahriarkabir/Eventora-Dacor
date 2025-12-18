import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { 
  FaSearch, 
  FaEllipsisH, 
  FaUserTie, 
  FaCheck, 
  FaTimes, 
  FaLink 
} from "react-icons/fa";

const ManageUsers = () => {
  const { user } = use(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users"); // 'users' or 'requests'

  // 1. Fetch Users
  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  // 2. Fetch Requests
  const { data: requests = [], refetch: refetchRequests } = useQuery({
    queryKey: ["decorator-requests"],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/decorator-requests`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Only show pending requests
      return res.data.filter((r) => r.status === "pending");
    },
  });

  // Action: Make Role
  const handleMakeRole = async (userId, role, userName) => {
    Swal.fire({
      title: "Update Role?",
      text: `Change ${userName}'s role to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      background: "var(--color-base-100)", // Dark mode fix for Alert
      color: "var(--color-base-content)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = await user.getIdToken();
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/role/${userId}`,
          { role: role },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        refetchUsers();
        toast.success("Role updated");
      }
    });
  };

  // Action: Handle Request
  const handleRequest = async (id, status, email) => {
    try {
      const token = await user.getIdToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/decorator-requests/${id}`,
        { status, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Request ${status}`);
      refetchRequests();
      refetchUsers(); 
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header & Tabs Container */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-4 rounded-xl border border-base-200 shadow-sm gap-4">
        
        {/* Tabs (Dark Mode Compatible) */}
        <div className="flex bg-base-200 p-1 rounded-lg w-full md:w-auto">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-bold transition-all ${
              activeTab === "users"
                ? "bg-primary text-primary-content shadow-sm" // Active State
                : "text-base-content/60 hover:text-base-content hover:bg-base-300" // Inactive State
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "requests"
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/60 hover:text-base-content hover:bg-base-300"
            }`}
          >
            Requests
            {requests.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-error text-white text-[10px] flex items-center justify-center">
                {requests.length}
              </span>
            )}
          </button>
        </div>

        {/* Search (Only show for Users tab) */}
        {activeTab === "users" && (
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-2 z-20 text-base-content/40" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="input input-sm input-bordered w-full pl-9 rounded-lg bg-base-100 focus:border-primary focus:outline-none text-base-content"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* CONTENT: USERS TABLE */}
      {activeTab === "users" && (
        <div className="bg-base-100 border border-base-200 rounded-xl shadow-sm overflow-x-auto min-h-[300px]">
          <table className="table w-full">
            <thead className="bg-base-200/50 text-base-content/70 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, index) => {
                const isLastItems = index > filteredUsers.length - 3 && filteredUsers.length > 3;
                return (
                  <tr key={u._id} className="border-b border-base-200 last:border-none hover:bg-base-200/30 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 rounded-full bg-base-300">
                            <img src={u.photo || "https://i.ibb.co/de/avatar.png"} alt="avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm whitespace-nowrap text-base-content">{u.name}</div>
                          <div className="text-xs opacity-60 hidden sm:block text-base-content">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-sm font-bold whitespace-nowrap rounded-full px-3 py-3
                        ${u.role === 'admin' ? 'bg-success/10 text-success border border-success/20' : 
                          u.role === 'decorator' ? 'bg-purple-100 text-purple-600 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/20' : 'bg-base-200 text-base-content/70'}`}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td><span className="text-xs font-bold text-success">Active</span></td>
                    <td className="text-right">
                      <div className={`dropdown dropdown-end ${isLastItems ? 'dropdown-top' : 'dropdown-bottom'}`}>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-xs text-base-content">
                          <FaEllipsisH />
                        </div>
                        {/* Dropdown Content with Theme Colors */}
                        <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow-xl bg-base-100 text-base-content rounded-lg w-40 border border-base-200 my-1">
                          <li><button onClick={() => handleMakeRole(u._id, 'admin', u.name)}>Make Admin</button></li>
                          <li><button onClick={() => handleMakeRole(u._id, 'decorator', u.name)}>Make Decorator</button></li>
                          <li><button onClick={() => handleMakeRole(u._id, 'user', u.name)}>Make User</button></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredUsers.length === 0 && <div className="text-center py-10 opacity-50 text-base-content">No users found.</div>}
        </div>
      )}

      {/* CONTENT: REQUESTS LIST */}
      {activeTab === "requests" && (
        <div className="grid grid-cols-1 gap-4">
          {requests.length === 0 ? (
            <div className="text-center py-20 opacity-50 bg-base-100 border border-dashed border-base-200 rounded-xl">
              <FaUserTie className="mx-auto text-4xl mb-4 text-base-content/20" />
              <h3 className="font-bold text-lg text-base-content">No pending requests</h3>
              <p className="text-sm text-base-content/60">All applications have been processed.</p>
            </div>
          ) : (
            requests.map((req) => (
              <div
                key={req._id}
                className="bg-base-100 p-6 rounded-xl border border-base-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow"
              >
                {/* Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full ring ring-secondary ring-offset-2 bg-base-300">
                      <img src={req.photo} alt={req.name} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg flex items-center gap-2 text-base-content">
                      {req.name}
                      <span className="badge badge-sm badge-ghost text-xs font-normal">Pending Review</span>
                    </h4>
                    <p className="text-sm opacity-60 text-base-content">{req.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="badge badge-outline text-xs border-primary/50 text-primary font-bold">
                        {req.specialty}
                      </span>
                      <span className="badge badge-ghost text-xs opacity-70">
                        {req.experience} Years Exp
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <a
                    href={req.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-ghost gap-2 text-primary"
                  >
                    <FaLink /> Portfolio
                  </a>
                  <div className="join shadow-sm border border-base-200 rounded-lg">
                    <button
                      onClick={() => handleRequest(req._id, "rejected", req.email)}
                      className="join-item btn btn-sm btn-ghost text-error hover:bg-error/10"
                    >
                      <FaTimes /> Reject
                    </button>
                    <button
                      onClick={() => handleRequest(req._id, "approved", req.email)}
                      className="join-item btn btn-sm btn-ghost text-success hover:bg-success/10 border-l border-base-200"
                    >
                      <FaCheck /> Approve
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default ManageUsers;