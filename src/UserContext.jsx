import { createContext, useContext, useEffect } from "react";
import useFetch from "./Hooks/useFetch";
import { getCurrentUser } from "./db/apiAuth";

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const urlState = () => {
  return useContext(UrlContext);
};
