import { getClicksForSingleUrl } from "@/db/apiClicks";
import { getSingleUrl } from "@/db/apiUrls";
import useFetch from "@/Hooks/useFetch";
import { urlState } from "@/UserContext";
import React from "react";
import { useParams } from "react-router-dom";

const Link = () => {
  // const { user } = urlState();
  // const { id } = useParams();
  // const {
  //   loading: clickloading,
  //   data: click,
  //   fn: fnclick,
  // } = useFetch(getClicksForSingleUrl, url?.id);
  // const {
  //   loading: urlloading,
  //   data: url,
  //   fn: fnurl,
  //   error,
  // } = useFetch(getSingleUrl, {
  //   id: id,
  //   user_id: user?.id,
  // });
  // const urlimage = url?.qr; // QR code image URL
  // const downloadName = url?.title; // Title for the downloaded image

  // // Function to download the QR code image
  // const handleDownloadImage = async () => {
  //   try {
  //     const response = await fetch(urlimage); // Fetch the image
  //     const blob = await response.blob(); // Get the blob from the response
  //     const link = document.createElement("a"); // Create a link element
  //     link.href = URL.createObjectURL(blob); // Create a URL for the blob
  //     link.setAttribute("download", `${downloadName}.png`); // Set the download attribute
  //     document.body.appendChild(link); // Append link to the body
  //     link.click(); // Trigger the download
  //     document.body.removeChild(link); // Clean up by removing the link
  //   } catch (error) {
  //     console.error("Error downloading the image:", error); // Log any errors during download
  //   }
  // };

  // // Function to copy the short URL to clipboard
  // const handleCopyLink = () => {
  //   navigator.clipboard.writeText(`https://linklytics.in/${url?.short_url}`); // Copy URL to clipboard
  //   setCopyLink(true); // Set copy status to true
  //   setTimeout(() => {
  //     setCopyLink(false); // Reset copy status after 3 seconds
  //   }, 3000);
  // };

  // const { loading: deleteLoading, fn: fnDelete } = useFetch(
  //   deleteUrls,
  //   url?.id // Get the function to delete URL
  // );

  return (
    <div className="grid grid-cols-2">
      <div>
        <span>rrrrr</span>
      </div>
      <div>
        <span>bgrhrbrhh</span>
      </div>
    </div>
  );
};

export default Link;
