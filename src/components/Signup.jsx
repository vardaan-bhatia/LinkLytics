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
import { SyncLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import Error from "./Error"; // Custom error component for validation messages
import * as Yup from "yup"; // Library for schema validation
import useFetch from "@/Hooks/useFetch"; // Custom hook for API fetching
import { googleLogin, signup } from "@/db/apiAuth"; // API functions for authentication
import { useNavigate, useSearchParams } from "react-router-dom";

const Signup = () => {
  // State for form data and error handling
  const [formData, setFormData] = useState({
    name: "", // User's name
    email: "", // User's email
    password: "", // User's password
    profile_pic: null, // Holds the uploaded profile picture
  });
  const [formError, setFormError] = useState({}); // Error state for form fields
  const { data, loading, error, fn } = useFetch(signup, formData); // Fetch hook for signup
  const [searchParams] = useSearchParams(); // Get URL search params
  const createlink = searchParams.get("createNew"); // Check if creating a new link
  const navigate = useNavigate(); // Navigate hook for redirection

  // Effect to handle navigation after signup
  useEffect(() => {
    if (error == null && data) {
      navigate(`/dashboard?${createlink ? `createNew=${createlink}` : ""}`); // Redirect to dashboard on successful signup
    }
  }, [error, data, createlink, navigate]);

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target; // Destructure the target properties
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Update state with file input or text input value
    }));
  };

  // Handle signup functionality
  const handleSignup = async () => {
    setFormError({}); // Reset previous errors
    try {
      // Validation schema using Yup
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"), // Validate name
        email: Yup.string()
          .email("Invalid email format") // Validate email format
          .required("Email is required"), // Email is required
        password: Yup.string()
          .min(6, "Password must be at least 6 characters") // Validate password length
          .matches(/[a-zA-Z]/, "Password must contain at least one letter") // Validate password content
          .required("Password is required"), // Password is required
        profile_pic: Yup.mixed().required("Profile picture is required"), // Validate profile picture
      });

      await schema.validate(formData, { abortEarly: false }); // Validate input
      await fn(); // Proceed with signup using fetch
    } catch (e) {
      const newErrors = {}; // Initialize new errors object
      if (e?.inner) {
        e.inner.forEach((err) => {
          newErrors[err.path] = err.message; // Collect validation errors
        });
        setFormError(newErrors); // Update error state
      } else {
        setFormError({ api: error.message }); // Handle API errors
      }
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await googleLogin(); // Attempt Google login
    } catch (error) {
      console.error("Google login error:", error);
      setFormError({ api: "Failed to login with Google. Please try again." }); // Set API error message
    }
  };

  // Handle Enter key press for Signup
  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSignup(); // Trigger Signup on Enter key press
    }
  };

  return (
    <Card
      className="max-w-md mx-auto mt-4 shadow-lg mb-8"
      data-aos="fade-left"
      data-aos-delay={100}
      data-aos-duration="800"
    >
      <CardHeader>
        <CardTitle className="text-center text-2xl">Signup</CardTitle>
        <CardDescription className="text-center">
          Create your account to start shortening links
        </CardDescription>
        {error && <Error message={error.message} />}{" "}
        {/* Display error message if exists */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Input
            name="name"
            type="text"
            placeholder="Enter your name"
            className="p-2"
            value={formData.name}
            onChange={handleChange} // Handle change in name input
          />
          {formError.name && <Error message={formError.name} />}{" "}
          {/* Display name error */}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            className="p-2"
            onChange={handleChange} // Handle change in email input
          />
          {formError.email && <Error message={formError.email} />}{" "}
          {/* Display email error */}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            className="p-2"
            onChange={handleChange} // Handle change in password input
          />
          {formError.password && <Error message={formError.password} />}{" "}
          {/* Display password error */}
          <Input
            name="profile_pic"
            type="file"
            className="p-2"
            accept="image/*" // Accept image files only
            onChange={handleChange} // Handle file input change
          />
          {formError.profile_pic && <Error message={formError.profile_pic} />}{" "}
          {/* Display profile picture error */}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          className="w-full bg-blue-500 text-white p-4 hover:bg-blue-600"
          onClick={handleSignup} // Trigger signup on button click
          disabled={loading} // Disable button while loading
        >
          {loading ? <SyncLoader color="#fdf8fa" size={7} /> : "Signup"}{" "}
          {/* Show loader or text */}
        </Button>
        <Button
          onClick={handleGoogleLogin} // Trigger Google login on button click
          disabled={loading} // Disable button while loading
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
