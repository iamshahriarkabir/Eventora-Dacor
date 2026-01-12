import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/Services/ServiceDetails";
import BookingForm from "../pages/Booking/BookingForm";
import PaymentSuccess from "../pages/Booking/PaymentSuccess";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminRoute from "./AdminRoute";
import DecoratorRoute from "./DecoratorRoute";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Gallery from "../pages/Gallery/Gallery";
import Team from "../pages/Team/Team";
import DashboardEntry from "../pages/Dashboard/DashboardEntry";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import BeADecor from "../pages/BeADecor/BeADecor";
import Cart from "../pages/Cart/Cart";
import Blogs from "../pages/Blogs/Blogs";
import BlogDetails from "../pages/Blogs/BlogDetails";

// --- Admin Pages ---
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import AddService from "../pages/Dashboard/Admin/AddService";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings";
import ManageServices from "../pages/Dashboard/Admin/ManageServices";
import AddBlog from "../pages/Dashboard/Admin/AddBlog";


// --- Decorator Pages ---
import DecoratorHome from "../pages/Dashboard/Decorator/DecoratorHome";
import MyProjects from "../pages/Dashboard/Decorator/MyProjects";

// --- User Pages (UPDATED PATHS) ---
import MyBookings from "../pages/Dashboard/User/MyBookings";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import UserProfile from "../pages/Dashboard/User/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "gallery", element: <Gallery /> },
      { path: "team", element: <Team /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "services",
        element: <Services />,
      },
      { path: "cart", element: <Cart /> },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      { path: "services/:id", element: <ServiceDetails /> },

      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetails />,
      },

      {
        path: "book/:id",
        element: (
          <PrivateRoute>
            <BookingForm />
          </PrivateRoute>
        ),
      },
      {
        path: "be-a-decor",
        element: (
          <PrivateRoute>
            <BeADecor />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // 1. ENTRY POINT (Redirects based on role)
      {
        index: true,
        element: <DashboardEntry />,
      },

      // 2. USER ROUTES
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      { 
        path: "profile", 
        element: <UserProfile /> 
      },

      // 3. ADMIN ROUTES
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "add-blog",
        element: (
          <AdminRoute>
            <AddBlog />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "add-service",
        element: (
          <AdminRoute>
            <AddService />
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
      {
        path: "manage-services",
        element: (
          <AdminRoute>
            <ManageServices />
          </AdminRoute>
        ),
      },

      // 4. DECORATOR ROUTES
      {
        path: "decorator-home",
        element: (
          <DecoratorRoute>
            <DecoratorHome />
          </DecoratorRoute>
        ),
      },
      {
        path: "my-projects",
        element: (
          <DecoratorRoute>
            <MyProjects />
          </DecoratorRoute>
        ),
      },
    ],
  },
]);