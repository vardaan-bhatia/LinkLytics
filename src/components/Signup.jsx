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
import Error from "./Error";
import * as Yup from "yup";
import useFetch from "@/Hooks/useFetch";
import { googleLogin, signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

const Signup = () => {
  // State for form data and error handling
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const [formError, setFormError] = useState({});
  const { data, loading, error, fn } = useFetch(signup, formData);
  const [searchParams] = useSearchParams();
  const createlink = searchParams.get("createNew");
  const navigate = useNavigate();

  // Effect to handle user fetching
  useEffect(() => {
    if (error == null && data) {
      navigate(`/dashboard?${createlink ? `createNew=${createlink}` : ""}`);
    }
  }, [error, loading]);

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error("Google login error:", error);
      setFormError({ api: "Failed to login with Google. Please try again." });
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle signup functionality
  const handleSignup = async () => {
    setFormError([]); // Reset previous errors
    try {
      // validation schema
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .matches(/[a-zA-Z]/, "Password must contain at least one letter")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false }); // Validate input
      await fn(); // Proceed with signup using fetch
    } catch (e) {
      const newErrors = {};
      if (e?.inner) {
        e.inner.forEach((err) => {
          newErrors[err.path] = err.message; // Collect validation errors
        });
        setFormError(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSignup(); // Trigger signup on Enter key press
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
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4" onKeyPress={handleKey}>
          <Input
            name="name"
            type="text"
            placeholder="Enter your name"
            className="p-2"
            value={formData.name}
            onChange={handleChange}
          />
          {formError.name && <Error message={formError.name} />}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            className="p-2"
            onChange={handleChange}
          />
          {formError.email && <Error message={formError.email} />}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            className="p-2"
            onChange={handleChange}
          />
          {formError.password && <Error message={formError.password} />}
          <Input
            name="profile_pic"
            type="file"
            className="p-2"
            accept="image/*"
            onChange={handleChange}
          />
          {formError.profile_pic && <Error message={formError.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          className="w-full bg-blue-500 text-white p-4 hover:bg-blue-600"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? <SyncLoader color="#fdf8fa" size={7} /> : "Signup"}
        </Button>
        <Button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-4 w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-md flex items-center justify-center hover:bg-gray-100"
        >
          <FcGoogle className="mr-2" size={24} />
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
