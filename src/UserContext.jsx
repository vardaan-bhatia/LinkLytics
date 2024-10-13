import { createContext, useContext, useEffect } from "react";
import useFetch from "./Hooks/useFetch";
import { getCurrentUser } from "./db/apiAuth";

// Create a context to share user data across components
export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  // Check if the user is authenticated
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser(); // Fetch the current user on component mount
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

// Custom hook to consume the UrlContext
export const urlState = () => {
  return useContext(UrlContext);
};
