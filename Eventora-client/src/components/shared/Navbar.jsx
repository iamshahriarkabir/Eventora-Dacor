import { use, useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaThLarge,
  FaShoppingBag,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  // React 19 'use' hook
  const { user, logOut } = use(AuthContext);
  const { cart, toggleCart } = useCart();

  // Theme State
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "luxury-light"
  );
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Theme Logic
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) =>
      prev === "luxury-light" ? "luxury-dark" : "luxury-light"
    );

  // 2. Scroll Logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Close mobile menu on route change
  const handleMenu = () => setMobileMenuOpen(false);

  // --- NAVIGATION LINKS LOGIC ---
  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/Blogs" },
  ];

  // Conditionally add "Join Team" if user is logged in
  const navLinks = user
    ? [...baseLinks, { name: "Join Team", path: "/be-a-decor" }]
    : baseLinks;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-base-100/80 backdrop-blur-lg border-base-200 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* 1. BRAND LOGO (Left Aligned for Modern Look) */}
          <Link to="/" className="flex items-center gap-1 group z-50">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/Eventora.png" alt="eventora logo" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold leading-none tracking-tight text-base-content">
                Eventora
              </span>
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-primary uppercase">
                Decor
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP MENU (Right Aligned) */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `
                      px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative
                      ${
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-base-content/70 hover:text-primary hover:bg-base-200/50"
                      }
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* SEPARATOR */}
            <div className="h-6 w-px bg-base-300"></div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="btn btn-circle btn-sm btn-ghost relative hover:bg-base-200"
              >
                <FaShoppingCart size={18} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-secondary rounded-full border border-base-100"></span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-circle btn-sm btn-ghost hover:bg-base-200 text-base-content/70"
              >
                {theme === "luxury-light" ? (
                  <FaMoon size={16} />
                ) : (
                  <FaSun size={16} className="text-yellow-400" />
                )}
              </button>

              {/* User Profile / Login */}
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar ring ring-base-200 ring-offset-2"
                  >
                    <div className="w-9 rounded-full">
                      <img
                        src={user?.photoURL || "https://i.ibb.co/de/avatar.png"}
                        alt="User"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-xl w-56 border border-base-200"
                  >
                    <li className="menu-title px-4 py-2 opacity-50">
                      Hi, {user.displayName?.split(" ")[0]}
                    </li>
                    <li>
                      <Link to="/dashboard">
                        <FaThLarge /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/profile">
                        <FaUserCircle /> Profile
                      </Link>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <button
                        onClick={logOut}
                        className="text-error hover:bg-error/10"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary btn-sm rounded-lg px-6 font-bold shadow-md shadow-primary/20"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* 3. MOBILE TOGGLE BUTTON */}
          <div className="flex gap-3 items-center lg:hidden">
            <button
              onClick={toggleCart}
              className="btn btn-circle btn-sm btn-ghost relative"
            >
              <FaShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
              )}
            </button>
            <button
              className="btn btn-square btn-sm btn-ghost text-base-content"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-base-100 border-b border-base-200 shadow-2xl lg:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {/* User Info Mobile */}
              {user ? (
                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-xl">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.photoURL} alt="user" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{user.displayName}</h4>
                    <p className="text-xs opacity-60">Logged In</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="btn btn-circle btn-xs btn-ghost"
                  >
                    {theme === "luxury-light" ? (
                  <FaMoon size={16} />
                ) : (
                  <FaSun size={16} className="text-yellow-400" />
                )}
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={handleMenu}
                    className="btn btn-primary flex-1"
                  >
                    Login
                  </Link>
                  <button
                    onClick={toggleTheme}
                    className="btn btn-square btn-outline border-base-200"
                  >
                    {theme === "luxury-light" ? <FaMoon /> : <FaSun />}
                  </button>
                </div>
              )}

              <div className="divider my-0"></div>

              {/* Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={handleMenu}
                    className={({ isActive }) => `
                        p-3 rounded-lg font-medium transition-all flex justify-between items-center
                        ${
                          isActive
                            ? "bg-primary text-primary-content shadow-md"
                            : "hover:bg-base-200"
                        }
                    `}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              {/* Dashboard Link Mobile */}
              {user && (
                <>
                  <div className="divider my-0"></div>
                  <Link
                    to="/dashboard"
                    onClick={handleMenu}
                    className="p-3 rounded-lg font-medium hover:bg-base-200 flex items-center gap-3"
                  >
                    <FaThLarge className="text-primary" /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logOut();
                      handleMenu();
                    }}
                    className="p-3 rounded-lg font-medium text-error hover:bg-error/10 flex items-center gap-3 w-full text-left"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;