import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Check, Copy, Download, Trash } from "lucide-react";
import useFetch from "@/Hooks/useFetch";
import { deleteUrls } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const UrlCard = ({ url = {}, fetchurl }) => {
  const [copyLink, setCopyLink] = useState(false);

  const urlimage = url?.qr;
  const downloadName = url?.title;

  const handleDownloadImage = async () => {
    try {
      const response = await fetch(urlimage); // Fetch the image
      const blob = await response.blob(); // Get the blob from the response
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Create a URL for the blob
      link.setAttribute("download", `${downloadName}.png`); // Set the download attribute
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://linklytics.in/${url?.short_url}`);
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, 3000);
  };

  const { loading: deleteLoading, fn: fnDelete } = useFetch(
    deleteUrls,
    url?.id
  );

  const handleDelete = async () => {
    await fnDelete();
    await fetchurl();
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row bg-gray-900 p-4 rounded-lg border items-center justify-between md:justify-start overflow-hidden">
      {/* Image div */}
      <img
        src={url?.qr}
        alt="qr-code"
        className="h-24 w-24 sm:h-32 sm:w-32 object-contain ring ring-blue-500"
      />

      {/* Link div */}
      <div className="flex flex-col text-center md:text-left flex-grow md:w-2/3">
        <Link to={`/link/${url?.id}`}>
          <span className="font-bold hover:underline text-3xl text-center sm:text-left md:text-3xl ">
            {url?.title}
          </span>
        </Link>
        <Link to={`/link/${url?.id}`}>
          <span className="text-blue-500 font-bold text-sm sm:text-xl md:text-2xl hover:underline">
            {`https://linklytics.in/${
              url?.short_url ? url?.short_url : url?.custom_url
            }`}
          </span>
        </Link>
        <span className="text-gray-300 text-xs sm:text-lg mb-2 overflow-hidden">
          {url?.original_url}
        </span>
        <span className="text-gray-400 text-base font-mono">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </div>

      {/* Button div */}
      <div className="flex flex-row sm:flex-col justify-between h-full md:ml-4">
        <Button variant="ghost" onClick={handleCopyLink}>
          {copyLink ? <Check /> : <Copy />}
        </Button>
        <Button variant="ghost" onClick={handleDownloadImage}>
          <Download />
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          {deleteLoading ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default UrlCard;
