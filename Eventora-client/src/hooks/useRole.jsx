import { use } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
  const { user, loading } = use(AuthContext);

  const { data: role = "user", isLoading: isRoleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !loading && !!user?.email, // Only run if user exists
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/role/${user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data.role;
    },
  });

  return [role, isRoleLoading];
};
export default useRole;
