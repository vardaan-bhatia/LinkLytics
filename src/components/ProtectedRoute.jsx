import { urlState } from "@/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingBar from "./LoadingBar";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = urlState(); // Access auth state from context
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    // Effect to handle redirection based on authentication state
    if (!isAuthenticated && !loading) {
      navigate("/auth"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, loading, navigate]); // Dependency array to rerun effect when state changes

  if (loading) return <LoadingBar />; // Show loading spinner while checking auth state

  return isAuthenticated ? children : null; // Render children if authenticated, otherwise null
};

export default ProtectedRoute;
