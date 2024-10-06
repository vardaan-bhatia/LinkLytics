import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import supabase from "../db/supabase";
import { FcGoogle } from "react-icons/fc";
import { SyncLoader } from "react-spinners";
import Error from "./Error";

const Signup = () => {
  // Handle Google login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Google login error:", error.message);
  };
  return (
    <Card
      className="max-w-md mx-auto shadow-lg mt-4 mb-8"
      data-aos="fade-left"
      data-aos-delay={100}
      data-aos-duration="800"
    >
      <CardHeader>
        <CardTitle className="text-center text-2xl">Signup</CardTitle>
        <CardDescription className="text-center">
          Create your account to start shortening links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col mt-2 space-y-2">
          <Input
            name="name"
            type="name"
            placeholder="Enter your name"
            required
            className="p-2"
          />
          <Error error="jery" />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="p-2"
          />
          <Error error="jery" />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="p-2"
          />
          <Error error="jery" />
          <Input
            name="profile_pic"
            type="file"
            className="p-2"
            accept="image/*"
          />
          <Error error="jery" />
        </div>
      </CardContent>
      <CardFooter className=" flex flex-col">
        <Button className="w-full bg-blue-500 text-white p-2 hover:bg-blue-600">
          {true ? <SyncLoader color="#fdf8fa" size={7} /> : SignUp}
        </Button>

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

export default Signup;
