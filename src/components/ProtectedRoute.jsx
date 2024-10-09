import { urlState } from "@/UserContext";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = urlState(); // Access auth state
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/auth"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />; // Show loading spinner

  return isAuthenticated ? children : null; // Render children if authenticated, otherwise null
};

export default ProtectedRoute;
