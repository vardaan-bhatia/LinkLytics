import React from "react";
import { useState, useEffect } from "react";
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
import Error from "./Error";
import * as Yup from "yup";

const Login = () => {
  const [formData, setformData] = useState({ email: "", password: "" });
  const [formError, setformError] = useState({});

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .required("Password is required"),
  });

  const validate = async (data) => {};

  // Handle Google login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Google login error:", error.message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    setformError([]);
    try {
      await schema.validate(formData, { abortEarly: false });
      return {};
    } catch (e) {
      const errors = {};
      e?.inner?.forEach((err) => {
        errors[err.path] = err.message;
      });
      setformError(errors);
    }
  };

  return (
    <Card
      className="max-w-md mx-auto mt-4 shadow-lg mb-8"
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
            value={formData.email}
            onChange={handleChange}
          />
          {formError.email && <Error msg={formError.email} />}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="p-2"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && <Error msg={formError.password} />}
        </div>
      </CardContent>
      <CardFooter className=" flex flex-col">
        <Button
          className="w-full bg-blue-500 text-white p-4 hover:bg-blue-600"
          onClick={handleLogin}
        >
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
