import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import { use } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const DashboardEntry = () => {
  const { user } = use(AuthContext);
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  // Admin -> Admin Home
  if (user && role === "admin") {
    return <Navigate to="/dashboard/admin-home" replace />;
  }

  // Decorator -> Decorator Home
  if (user && role === "decorator") {
    return <Navigate to="/dashboard/decorator-home" replace />;
  }

  // User -> My Bookings 
  if (user && role === "user") {
    return <Navigate to="/dashboard/my-bookings" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default DashboardEntry;