import React, { useEffect, useState } from "react";
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
import { FcGoogle } from "react-icons/fc";
import Error from "./Error";
import * as Yup from "yup";
import useFetch from "@/Hooks/useFetch";
import { login } from "@/db/apiAuth";
import { urlState } from "@/UserContext";

// validation schema
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .required("Password is required"),
});

const Login = () => {
  // State for form data and error handling
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({});
  const { data, loading, error, fn } = useFetch(login, formData);
  const { fetchUser } = urlState();

  // Effect to handle user fetching
  useEffect(() => {
    if (data) {
      fetchUser(); // Fetch user details after successful login
    }
  }, [data, fetchUser]);

  // Handle Google login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Google login error:", error.message);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle login functionality
  const handleLogin = async () => {
    setFormError({}); // Reset previous errors
    try {
      await schema.validate(formData, { abortEarly: false }); // Validate input
      await fn(); // Proceed with login using fetch
    } catch (e) {
      const newErrors = {}; // Initialize a new errors object
      e.inner.forEach((err) => {
        newErrors[err.path] = err.message; // Collect validation errors
      });
      setFormError(newErrors); // Update state with new errors
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // Trigger login on Enter key press
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
        {error && <Error message={error.message} />}{" "}
        {/* General error message */}
        {formError.general && <Error message={formError.general} />}{" "}
        {/* General form error */}
        <div className="flex flex-col space-y-6" onKeyPress={handleKey}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="p-2"
            value={formData.email}
            onChange={handleChange}
          />
          {formError.email && <Error message={formError.email} />}{" "}
          {/* Email-specific error */}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="p-2"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && <Error message={formError.password} />}{" "}
          {/* Password-specific error */}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          className="w-full bg-blue-500 text-white p-4 hover:bg-blue-600"
          onClick={handleLogin} // Trigger login on button click
          disabled={loading} // Disable button while loading
        >
          {loading ? <SyncLoader color="#fdf8fa" size={7} /> : "Login"}{" "}
          {/* Show loader or text */}
        </Button>
        {/* Google Login Button */}
        <Button
          onClick={handleGoogleLogin} // Trigger Google login on button click
          disabled={loading} // Disable button while loading
          className="mt-4 w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-md flex items-center justify-center hover:bg-gray-100"
        >
          <FcGoogle className="mr-2" size={24} />
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
