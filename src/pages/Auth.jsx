import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import AOS from "aos";
import "aos/dist/aos.css";
import { urlState } from "@/UserContext"; // Importing user state for authentication

// Authentication component for handling login/signup
const Auth = () => {
  // Retrieve URL parameters for potential redirection
  const [searchParams] = useSearchParams(); // Call useSearchParams hook to work with query params
  const createLink = searchParams.get("createNew"); // Get the 'createNew' param if present
  const navigate = useNavigate();
  const { isAuthenticated, loading } = urlState(); // Extract authentication state from context

  useEffect(() => {
    // Redirect to dashboard if user is authenticated and not loading
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${createLink ? `createNew=${createLink}` : ""}`); // Redirect with query params if applicable
    }
  }, [isAuthenticated, loading]); // Run effect when auth state changes

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
  }, []); // Initialize only once on component mount

  return (
    <div className="flex flex-col items-center mt-10 sm:mt-0">
      <div className="text-center text-3xl font-bold">
        {/* Conditionally render heading based on URL params */}
        {createLink ? (
          <h1>Hold on! First, login or sign up to create your short link.</h1>
        ) : (
          <h1>Welcome! Log in or create an account to get started.</h1>
        )}
      </div>
      <div className="mt-8 w-full flex justify-center">
        {/* Tabs component for switching between login and signup */}
        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login /> {/* Render the login form */}
          </TabsContent>
          <TabsContent value="signup">
            <Signup /> {/* Render the signup form */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
