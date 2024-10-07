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
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .required("Password is required"),
  display_pic: Yup.mixed().required("Profile picture is required"),
});

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    display_pic: null,
  });
  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    setFormError({}); // Reset previous errors
    try {
      await schema.validate(formData, { abortEarly: false });
      // api call
    } catch (error) {
      const newError = {};
      error.inner.forEach((e) => (newError[e.path] = e.message));
      setFormError(newError);
    }
  };

  const handleKey = (e) => {
    if (e.key == "Enter") {
      handleSignup();
    }
  };

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
        <div className="flex flex-col mt-2 space-y-2" onKeyPress={handleKey}>
          <Input
            name="name"
            type="name"
            placeholder="Enter your name"
            className="p-2"
            onChange={handleChange}
          />
          <Error error="jery" />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className="p-2"
            onChange={handleChange}
          />
          <Error error="jery" />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="p-2"
            onChange={handleChange}
          />
          <Error error="jery" />
          <Input
            name="profile_pic"
            type="file"
            className="p-2"
            accept="image/*"
            onChange={handleChange}
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
