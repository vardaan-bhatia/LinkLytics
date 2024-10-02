import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

const Auth = () => {
  const [searchParams] = useSearchParams(); // Call useSearchParams hook
  const createLink = searchParams.get("createlink"); // Get 'createlink' param

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="text-center text-3xl font-bold">
        {createLink ? (
          <h1>Hold on! Log in or sign up to create your custom short link</h1>
        ) : (
          <h1>Join us! Log in or sign up to continue</h1>
        )}
      </div>
      <div className="mt-8 w-full flex justify-center">
        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
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
