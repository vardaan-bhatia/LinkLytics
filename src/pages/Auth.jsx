import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import Supabase client
const Auth = () => {
  const [searchParams] = useSearchParams(); // Call useSearchParams hook
  const createLink = searchParams.get("createlink"); // Get 'createlink' param
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);
  return (
    <div className=" flex flex-col items-center">
      <div className="text-center text-3xl font-bold">
        {createLink ? (
          <h1>Hold on! First, login or sign up to create your short link.</h1>
        ) : (
          <h1>Welcome! Login in or create an account to get started.</h1>
        )}
      </div>
      <div className="mt-8 w-full flex justify-center">
        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
