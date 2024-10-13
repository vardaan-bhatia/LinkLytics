import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { urlState } from "@/UserContext";
import { BeatLoader } from "react-spinners";
import { Card } from "./ui/card";
import * as Yup from "yup";
import Error from "./Error";
import { useNavigate, useSearchParams } from "react-router-dom";

const CreateUrl = () => {
  // Access user information from urlState context
  const { user } = urlState();
  // Retrieve query parameters from the URL
  const [searchParams] = useSearchParams();
  const longurl = searchParams.get("createNew");
  const navigate = useNavigate();

  // Error handling state
  const [error, seterror] = useState({});
  // Form values state
  const [formValue, setformValue] = useState({
    title: "",
    longUrl: longurl ? longurl : "", // Pre-populate long URL if available
    customUrl: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValue({
      ...formValue, // Spread existing form values
      [name]: value, // Update only the changed field
    });
  };

  // Define validation schema using Yup
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Original URL is required"),
    customUrl: Yup.string(), // Custom URL is optional
  });

  // Handle form submission and validation
  const handleSubmit = async () => {
    seterror({}); // Reset errors before validation
    try {
      await schema.validate(formValue, { abortEarly: false }); // Validate all fields
    } catch (e) {
      const newerrors = {};
      e.inner.forEach((err) => {
        newerrors[err.path] = err.message; // Map Yup errors to form fields
      });
      seterror(newerrors); // Update error state
    }
  };

  return (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button className="bg-blue-500 hover:bg-blue-400 text-white">
          Create Short Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-xl">
            {`Hey 👋, ${
              user?.user_metadata?.name.split(" ")[0]
            } ! Welcome to LinkLytics. Let's create your short link.`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Input field for the title of the short link */}
          <Input
            name="title"
            value={formValue.title}
            placeholder="Title for your short link"
            onChange={handleChange}
          />
          {error.title && <Error message={error.title} />}

          {/* Input field for the long URL */}
          <Input
            name="longUrl"
            value={formValue.longUrl}
            placeholder="Paste your long URL here"
            onChange={handleChange}
          />
          {error.longUrl && <Error message={error.longUrl} />}

          {/* Custom URL section */}
          <div className="flex items-center gap-2">
            <Card className="p-2">linklytics.in</Card> /
            <Input
              name="customUrl"
              value={formValue.customUrl}
              placeholder="Custom short link (optional)"
              onChange={handleChange}
            />
          </div>
          {error.customUrl && <Error message={error.customUrl} />}
        </div>
        <DialogFooter>
          <Button type="button" className="w-full" onClick={handleSubmit}>
            Create Short Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUrl;
