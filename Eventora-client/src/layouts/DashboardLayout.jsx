import { use, useState, useEffect } from "react";
import { Link, Outlet, NavLink, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import useRole from "../hooks/useRole";
import {
  FaWallet,
  FaUsers,
  FaClipboardList,
  FaPlusCircle,
  FaSignOutAlt,
  FaBars,
  FaUserCog,
  FaLeaf,
  FaLayerGroup,
  FaChartPie,
  FaMoon,
  FaSun,
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  const { user, logOut } = use(AuthContext);
  const [role] = useRole();
  const location = useLocation();

  // Theme Logic
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "luxury-light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) =>
      prev === "luxury-light" ? "luxury-dark" : "luxury-light"
    );

  // Drawer Logic
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("dashboard-drawer");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  useEffect(() => {
    closeDrawer();
  }, [location]);

  // Common Class for Nav Links
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 relative overflow-hidden group ${
      isActive
        ? "bg-primary text-white shadow-lg shadow-primary/25"
        : "text-base-content/70 hover:bg-base-200 hover:text-primary"
    }`;

  const SidebarContent = (
    <div className="h-full bg-base-100 flex flex-col w-72 shadow-2xl border-r border-base-200">
      {/* 1. HEADER */}
      <div className="h-24 flex items-center px-8">
        <Link to="/" className="flex items-center gap-1 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/Eventora.png" alt="eventora logo" />
            </div>
          <div>
            <h1 className="font-serif font-bold text-xl leading-none">
              Eventora
            </h1>
            <p className="text-[10px] font-sans font-bold tracking-[0.2em] text-primary uppercase opacity-80">
              Workspace
            </p>
          </div>
        </Link>
      </div>

      {/* 2. USER PROFILE CARD */}
      <div className="px-6 mb-6">
        <div className="p-4 bg-base-200/50 rounded-2xl flex items-center gap-4 border border-base-200 group hover:border-primary/30 transition-colors">
          <div className="avatar online">
            <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img src={user?.photoURL} alt="User" />
            </div>
          </div>
          <div className="overflow-hidden">
            <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">
              {user?.displayName}
            </h4>
            <span className="uppercase font-bold tracking-wider text-[10px]">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION */}
      <div className="flex-1 px-4 overflow-y-auto custom-scrollbar space-y-1">
        
        <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-base-content/40 mt-2 mb-2">
          Main
        </p>

        {/* SHARED */}
        <NavLink to="/dashboard" end className={navLinkClasses}>
          <FaChartPie className="text-lg" />
          <span className="relative z-10">Overview</span>
        </NavLink>

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-base-content/40 mt-6 mb-2">
              Management
            </p>
            <NavLink to="/dashboard/manage-users" className={navLinkClasses}>
              <FaUsers className="text-lg" />
              <span>Users & Roles</span>
            </NavLink>
            <NavLink to="/dashboard/manage-bookings" className={navLinkClasses}>
              <FaClipboardList className="text-lg" />
              <span>Bookings</span>
            </NavLink>
            
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-base-content/40 mt-6 mb-2">
              Catalog
            </p>
            <NavLink to="/dashboard/add-service" className={navLinkClasses}>
              <FaPlusCircle className="text-lg" />
              <span>Add Service</span>
            </NavLink>
            <NavLink to="/dashboard/manage-services" className={navLinkClasses}>
              <FaLayerGroup className="text-lg" />
              <span>All Services</span>
            </NavLink>

            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-base-content/40 mt-6 mb-2">
              Content
            </p>
             {/* 🔥 NEW LINK HERE */}
            <NavLink to="/dashboard/add-blog" className={navLinkClasses}>
              <FaPaperPlane className="text-lg" />
              <span>Publish Blog</span>
            </NavLink>
             
             {/* Existing Catalog Links... */}
             <NavLink to="/dashboard/add-service" className={navLinkClasses}>
              <FaPlusCircle className="text-lg" />
              <span>Add Service</span>
            </NavLink>

          </>
        )}

        {/* DECORATOR */}
        {role === "decorator" && (
          <>
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-base-content/40 mt-6 mb-2">
              Work
            </p>
            <NavLink to="/dashboard/my-projects" className={navLinkClasses}>
              <FaClipboardList className="text-lg" />
              <span>Assigned Tasks</span>
            </NavLink>
          </>
        )}

        {/* USER */}
        {role === "user" && (
          <>
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-base-content/40 mt-6 mb-2">
              My Events
            </p>
            <NavLink to="/dashboard/my-bookings" className={navLinkClasses}>
              <FaCalendarAlt className="text-lg" />
              <span>Bookings</span>
            </NavLink>
            <NavLink to="/dashboard/payment-history" className={navLinkClasses}>
              <FaWallet className="text-lg" />
              <span>Invoices</span>
            </NavLink>
          </>
        )}

        <div className="divider my-4"></div>

        <NavLink to="/dashboard/profile" className={navLinkClasses}>
          <FaUserCog className="text-lg" />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/" className={navLinkClasses}>
          <FaArrowLeft className="text-lg" />
          <span>Back Home</span>
        </NavLink>
      </div>

      {/* 4. FOOTER ACTIONS */}
      <div className="p-4 border-t border-base-200 space-y-3 bg-base-50">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-base-200/50 hover:bg-base-200 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <span>Appearance</span>
          {theme === "luxury-light" ? (
            <span className="flex items-center gap-2">
              <FaSun className="text-yellow-500" /> Light
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FaMoon className="text-primary" /> Dark
            </span>
          )}
        </button>

        <button
          onClick={logOut}
          className="btn btn-outline btn-error btn-sm w-full rounded-lg"
        >
          <FaSignOutAlt /> Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="drawer lg:drawer-open font-sans bg-base-200 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="lg:hidden navbar bg-base-100 border-b border-base-200 sticky top-0 z-40 px-4 shadow-sm">
          <div className="flex-1">
            
              <Link to="/"  className="flex flex-col font-serif font-bold text-xl">
                  <span className="text-xl font-serif font-bold leading-none tracking-tight text-base-content">
                    Eventora
                  </span>
                  <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-primary uppercase">
                    Decor
                  </span>
              </Link>
            
          </div>
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <FaBars className="text-xl" />
            </label>
          </div>
        </div>

        {/* Content Render */}
        <div className="p-4 lg:p-8 w-full max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        {SidebarContent}
      </div>
    </div>
  );
};
export default DashboardLayout;