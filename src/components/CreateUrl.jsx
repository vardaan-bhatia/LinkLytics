import React from "react";
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
import { useState, useEffect, useRef } from "react";
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
  // Access user information from urlState context
  const { user } = urlState();
  // Retrieve query parameters from the URL
  const [searchParams, setsearchParams] = useSearchParams();
  const longurl = searchParams.get("createNew");
  const navigate = useNavigate();
  const ref = useRef();

  // Error handling state
  const [error, seterror] = useState({});
  // Form values state
  const [formValue, setformValue] = useState({
    title: "",
    longUrl: longurl ? longurl : "", // Pre-populate long URL if available
    customUrl: "",
  });

  // Define validation schema using Yup
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Original URL is required"),
    customUrl: Yup.string(), // Custom URL is optional
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValue({
      ...formValue, // Spread existing form values
      [name]: value, // Update only the changed field
    });
  };
  const {
    loading,
    error: UrlError,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValue, user_id: user.id });
  useEffect(() => {
    if (UrlError == null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [UrlError, data]);

  // Handle form submission and validation
  const handleSubmit = async () => {
    seterror([]);
    try {
      // Validate form using Yup
      await schema.validate(formValue, { abortEarly: false });

      // Create QR code blob from canvas
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      // Call the function to create the URL with the blob
      await fnCreateUrl(blob);
    } catch (e) {
      const newerrors = {};
      e.inner.forEach((err) => {
        newerrors[err.path] = err.message;
      });
      seterror(newerrors);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Trigger login on Enter key press
    }
  };
  return (
    <Dialog
      defaultOpen={longurl}
      onOpenChange={(res) => {
        if (!res) setsearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-400 text-white">
          Create Short Link
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        {UrlError && <Error message={UrlError.message} />}
        <DialogHeader>
          <DialogTitle className="mb-2 text-xl text-center">
            {`Hey 👋, ${
              user?.user_metadata?.name.split(" ")[0]
            } ! Welcome to LinkLytics. Let's create your short link.`}
          </DialogTitle>
          <DialogDescription
            id="dialog-description"
            className="mb-2 text-center"
          >
            Fill out the form to create a new shortened URL.
          </DialogDescription>
          {formValue.longUrl && (
            <div className="items-center justify-center flex">
              <QRCode
                value={formValue.longUrl}
                ref={ref}
                logoImage="/public/clipimg.png"
              />
            </div>
          )}
        </DialogHeader>
        <div className="space-y-6" onKeyDown={handleKey}>
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
          <Button disabled={loading} className="w-full" onClick={handleSubmit}>
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
