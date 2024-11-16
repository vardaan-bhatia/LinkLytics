import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Check, Copy, Download, Edit, Trash } from "lucide-react";
import useFetch from "@/Hooks/useFetch"; // Custom hook for API fetching
import { deleteUrls } from "@/db/apiUrls"; // Add updateUrls import
import { BeatLoader } from "react-spinners"; // Loader component for async actions
import EditUrl from "./EditUrl"; // Import the Edit URL component

const UrlCard = ({ url = {}, fetchurl }) => {
  const [copyLink, setCopyLink] = useState(false); // State to manage link copying status
  const [isEditOpen, setIsEditOpen] = useState(false); // State to manage edit dialog visibility
  const [currentUrlData, setCurrentUrlData] = useState(url); // State for current URL data

  const urlimage = url?.qr; // QR code image URL
  const downloadName = url?.title; // Title for the downloaded image

  // Function to download the QR code image
  const handleDownloadImage = async () => {
    try {
      const response = await fetch(urlimage); // Fetch the image
      const blob = await response.blob(); // Get the blob from the response
      const link = document.createElement("a"); // Create a link element
      link.href = URL.createObjectURL(blob); // Create a URL for the blob
      link.setAttribute("download", `${downloadName}.png`); // Set the download attribute
      document.body.appendChild(link); // Append link to the body
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up by removing the link
    } catch (error) {
      console.error("Error downloading the image:", error); // Log any errors during download
    }
  };

  // Function to copy the short or custom URL to clipboard
  const handleCopyLink = () => {
    const urlToCopy = url?.custom_url
      ? `https://linklytics.online/${url?.custom_url}`
      : `https://linklytics.online/${url?.short_url}`;
    navigator.clipboard.writeText(urlToCopy); // Copy the URL to clipboard
    setCopyLink(true); // Set copy status to true
    setTimeout(() => {
      setCopyLink(false); // Reset copy status after 3 seconds
    }, 3000);
  };

  const { loading: deleteLoading, fn: fnDelete } = useFetch(
    deleteUrls,
    { id: url?.id, short_url: url?.short_url } // Pass the id and short_url as options
  );

  // Function to handle deletion of URL
  const handleDelete = async () => {
    await fnDelete(); // Execute delete function
    await fetchurl(); // Fetch updated URL list after deletion
  };

  // Function to handle edit button click
  const handleEdit = () => {
    setCurrentUrlData(url); // Set the current URL data for editing
    setIsEditOpen(true); // Open the edit dialog
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row bg-gray-900 p-4 rounded-lg border items-center justify-between md:justify-start overflow-hidden">
      {/* Image div displaying the QR code */}
      <img
        src={url?.qr}
        alt="qr-code"
        className="h-24 w-24 sm:h-32 sm:w-32 object-contain ring ring-blue-500"
      />

      {/* Link div displaying URL information */}
      <div className="flex flex-col text-center md:text-left flex-grow md:w-2/3">
        <Link to={`/link/${url?.id}`}>
          <span className="font-bold hover:underline text-3xl text-center sm:text-left md:text-3xl ">
            {url?.title}
          </span>
        </Link>
        <a
          href={`/${url?.custom_url ? url?.custom_url : url?.short_url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 font-bold text-sm sm:text-xl md:text-2xl hover:underline"
        >
          {`https://linklytics.online/${
            url?.custom_url ? url.custom_url : url.short_url
          }`}
        </a>
        <span className="text-gray-400 text-md break-words max-w-2xl w-full mb-5">
          {url?.original_url} {/* Display original URL */}
        </span>
        <span className="text-gray-400 text-base font-mono">
          {new Date(url?.created_at).toLocaleString()}{" "}
          {/* Display creation date */}
        </span>
      </div>

      {/* Button div for actions */}
      <div className="flex flex-row md:flex-col justify-between h-full md:ml-4">
        <Button variant="ghost" onClick={handleCopyLink}>
          {copyLink ? <Check /> : <Copy />}{" "}
          {/* Display check icon if link copied */}
        </Button>{" "}
        <Button variant="ghost" onClick={handleEdit}>
          <Edit />
        </Button>
        <Button variant="ghost" onClick={handleDownloadImage}>
          <Download /> {/* Download button */}
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          {deleteLoading ? <BeatLoader size={5} color="white" /> : <Trash />}{" "}
          {/* Show loader or trash icon */}
        </Button>
      </div>

      {/* Edit URL Dialog */}
      {isEditOpen && (
        <EditUrl
          url={currentUrlData} // Pass current URL data
          onClose={() => setIsEditOpen(false)} // Close dialog
          fetchurl={fetchurl} // Function to refresh URLs
        />
      )}
    </div>
  );
};

export default UrlCard;
