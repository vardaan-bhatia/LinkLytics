import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { urlState } from "@/UserContext";
import { SyncLoader } from "react-spinners";
import { Card } from "./ui/card";
import * as Yup from "yup";
import Error from "./Error";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import { createUrl } from "@/db/apiUrls";
import useFetch from "@/Hooks/useFetch";

const CreateUrl = () => {
  // Retrieve user information from the urlState context
  const { user } = urlState();

  // Manage query parameters from the URL for pre-filling the form
  const [searchParams, setsearchParams] = useSearchParams();
  const longurl = searchParams.get("createNew");
  const navigate = useNavigate();
  const ref = useRef(); // Reference for QR code canvas

  // State for handling form errors
  const [error, seterror] = useState({});

  // State for form values
  const [formValue, setformValue] = useState({
    title: "",
    longUrl: longurl || "", // Pre-populate long URL if available
    customUrl: "",
  });

  // Define validation schema for the form using Yup
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Original URL is required"),
    customUrl: Yup.string(), // Custom URL is optional
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValue((prev) => ({
      ...prev, // Retain previous form values
      [name]: value, // Update the specific field being changed
    }));
  };

  // Fetch function for creating the URL
  const {
    loading,
    error: UrlError,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValue, user_id: user.id });

  // Navigate to the created link after a successful URL creation
  useEffect(() => {
    if (!UrlError && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [UrlError, data]);

  // Handle form submission with validation
  const handleSubmit = async () => {
    seterror([]); // Clear previous errors
    try {
      // Validate form data against the defined schema
      await schema.validate(formValue, { abortEarly: false });
      // Generate a QR code blob from the canvas
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      // Call the function to create the URL with the blob
      await fnCreateUrl(blob);
    } catch (e) {
      // Capture and set any validation errors
      const newErrors = {};
      e.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      seterror(newErrors);
    }
  };

  // Trigger form submission on Enter key press
  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog
      defaultOpen={!!longurl}
      onOpenChange={(isOpen) => {
        if (!isOpen) setsearchParams({}); // Clear search params on dialog close
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-400 text-white">
          Create Short Link
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        {UrlError && <Error message={UrlError.message} />}
        <DialogHeader>
          <DialogTitle className="mb-2 text-xl text-center">
            {`Hey 👋, ${
              user?.user_metadata?.name.split(" ")[0]
            }! Welcome to LinkLytics. Let's create your short link.`}
          </DialogTitle>
          <DialogDescription
            id="dialog-description"
            className="mb-2 text-center"
          >
            Fill out the details to create a new shortened URL.
          </DialogDescription>
          {formValue.longUrl && (
            <div className="items-center justify-center flex">
              <QRCode
                value={formValue.longUrl}
                ref={ref}
                logoImage="/vite.svg"
                qrStyle="dots"
              />
            </div>
          )}
        </DialogHeader>
        <div className="space-y-4" onKeyDown={handleKey}>
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
          <Button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-400 text-white w-full"
            onClick={handleSubmit}
          >
            {loading ? (
              <SyncLoader size={10} color="white" />
            ) : (
              "Create Short Link"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUrl;
