import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  // React 19 'use' hook
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
