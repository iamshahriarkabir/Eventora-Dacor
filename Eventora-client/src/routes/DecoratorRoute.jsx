import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const DecoratorRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (user && role === "decorator") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default DecoratorRoute;
