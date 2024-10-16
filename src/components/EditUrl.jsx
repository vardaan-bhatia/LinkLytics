import React, { useState } from "react";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useFetch from "@/Hooks/useFetch";
import { QRCode } from "react-qrcode-logo";
import { updateUrls } from "@/db/apiUrls";
import Error from "./Error";

const EditUrl = ({ url, onClose, fetchurl }) => {
  const [formValue, setFormValue] = useState({
    title: url.title,
    longUrl: url.original_url,
    customUrl: url.custom_url || "",
  });

  const [errors, setErrors] = useState({});

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Original URL is required"),
    customUrl: Yup.string(),
  });

  const { loading, fn: fnUpdateUrl } = useFetch(updateUrls, {
    ...formValue,
    id: url.id,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate the form before submitting
      await validationSchema.validate(formValue, { abortEarly: false });

      // Clear any previous errors
      setErrors({});

      // Proceed with updating URL
      await fnUpdateUrl();
      fetchurl(); // Refresh the URL list
      onClose(); // Close the dialog
    } catch (validationErrors) {
      const formErrors = {};
      validationErrors.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors); // Set errors for the form
    }
  };

  // Trigger form submission on Enter key press
  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="items-center">
          <DialogTitle>Update Details</DialogTitle>
        </DialogHeader>
        {formValue.longUrl && (
          <div className="items-center justify-center flex">
            <QRCode
              value={formValue.longUrl}
              logoImage="/vite.svg"
              qrStyle="dots"
            />
          </div>
        )}
        <div onKeyDown={handleKey} className="space-y-3">
          <Input
            name="title"
            value={formValue.title}
            onChange={handleChange}
            placeholder="Title"
          />
          {errors.title && <Error message={errors.title} />}{" "}
          {/* Show error for title */}
          <Input
            name="longUrl"
            value={formValue.longUrl}
            onChange={handleChange}
            placeholder="Original URL"
          />
          {errors.longUrl && <Error message={errors.longUrl} />}{" "}
          {/* Show error for long URL */}
          <Input
            name="customUrl"
            value={formValue.customUrl}
            onChange={handleChange}
            placeholder="Custom short link (optional)"
          />
          {errors.customUrl && <Error message={errors.customUrl} />}{" "}
          {/* Show error for custom URL */}
        </div>
        <DialogFooter className="gap-3">
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-400 text-white"
          >
            {loading ? "Updating..." : "Update"}
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-400 text-white"
            onClick={onClose}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUrl;
