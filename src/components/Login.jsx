import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import supabase from "../db/supabase";
import { SyncLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc"; // Import Google icon

const Login = () => {
  // Handle Google login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Google login error:", error.message);
  };

  return (
    <Card
      className="max-w-md mx-auto mt-4 shadow-lg"
      data-aos="fade-right"
      data-aos-delay={100}
      data-aos-duration="800"
    >
      <CardHeader>
        <CardTitle className="text-center text-2xl">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="p-2"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="p-2"
          />
        </div>
      </CardContent>
      <CardFooter className=" flex flex-col">
        <Button className="w-full bg-blue-500 text-white p-4 hover:bg-blue-600">
          {true ? <SyncLoader color="#fdf8fa" size={7} /> : Login}
        </Button>
        {/* Google Login Button */}
        <Button
          onClick={handleGoogleLogin}
          className="mt-4 w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-md flex items-center justify-center hover:bg-gray-100"
        >
          <FcGoogle className="mr-2" size={24} /> {/* Google icon */}
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
