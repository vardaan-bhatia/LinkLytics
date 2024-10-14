import React, { useState } from "react";
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
import { updateUrls } from "@/db/apiUrls"; // Import the update function

const EditUrl = ({ url, onClose, fetchurl }) => {
  const [formValue, setFormValue] = useState({
    title: url.title,
    longUrl: url.original_url,
    customUrl: url.custom_url || "",
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
    await fnUpdateUrl(); // Call the update function
    fetchurl(); // Refresh the URL list
    onClose(); // Close the dialog
  };

  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit URL</DialogTitle>
        </DialogHeader>
        <Input
          name="title"
          value={formValue.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <Input
          name="longUrl"
          value={formValue.longUrl}
          onChange={handleChange}
          placeholder="Original URL"
        />
        <Input
          name="customUrl"
          value={formValue.customUrl}
          onChange={handleChange}
          placeholder="Custom short link (optional)"
        />
        <DialogFooter>
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? "Updating..." : "Update"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUrl;
