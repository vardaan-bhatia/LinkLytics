import { urlState } from "@/UserContext";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./../Hooks/useFetch";
import { deleteUrls, getSingleUrl } from "@/db/apiUrls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClicksForUrl } from "@/db/apiClicks";
import LoadingBar from "@/components/LoadingBar";
import { Button } from "@/components/ui/button";
import { Check, Copy, Download, Trash } from "lucide-react";
import { BeatLoader } from "react-spinners";
import LocationChart from "@/components/LocationChart";
import DeviceChart from "@/components/DeviceChart";

const Link = () => {
  const { id } = useParams();
  const { user } = urlState();
  const navigate = useNavigate();
  const [copyLink, setCopyLink] = useState(false); // State to manage link copying status

  const {
    data: singleUrl,
    error: urlError,
    loading: urlLoading,
    fn: fnsingleurl,
  } = useFetch(getSingleUrl, { id: id, user_id: user?.id });

  const {
    data: clickData,
    loading: clickLoading,
    fn: fetchClicks,
  } = useFetch(getClicksForUrl, id); // Pass URL IDs for fetching click data

  useEffect(() => {
    fnsingleurl();
  }, []);

  useEffect(() => {
    if (!urlError && urlLoading === false) fetchClicks();
  }, [urlLoading, urlError]);

  if (urlError) {
    navigate("/dashboard");
  }
  const { loading: deleteLoading, fn: fnDelete } = useFetch(deleteUrls, {
    id: singleUrl?.id,
    short_url: singleUrl?.short_url,
  });

  const handleDelete = async () => {
    await fnDelete(); // Execute delete function
    navigate("/dashboard");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://linklytics.in/${singleUrl?.short_url}`
    ); // Copy URL to clipboard
    setCopyLink(true); // Set copy status to true
    setTimeout(() => {
      setCopyLink(false); // Reset copy status after 3 seconds
    }, 3000);
  };

  // For download funtionality

  const qr = singleUrl?.qr;
  const downloadName = singleUrl?.title;
  const handleDownloadImage = async () => {
    try {
      const response = await fetch(qr);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `${downloadName}.png`); // Set the download attribute
      document.body.appendChild(link); // Append link to the body
      link.click(); // Trigger the download
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the image:", error); // Log any errors during download
    }
  };
  const clickcity = clickData?.map((e) => e.city) || [];

  const cityClicks = clickcity.reduce((acc, city) => {
    const cityName = city || "Unknown"; // Handle unknown city case
    acc[cityName] = (acc[cityName] || 0) + 1; // Increment the count for the city
    return acc;
  }, {});
  return (
    <>
      {(clickLoading || urlLoading) && <LoadingBar />}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section: URL Details and QR */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {singleUrl?.title}
            </h2>
            <a
              href={`/${
                singleUrl?.custom_url
                  ? singleUrl?.custom_url
                  : singleUrl?.short_url
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold text-lg hover:underline"
            >
              {`${import.meta.env.VITE_REDIRECT_URL}${
                singleUrl?.custom_url
                  ? singleUrl?.custom_url
                  : singleUrl?.short_url
              }`}
            </a>
            <p className="text-gray-600 text-md break-words">
              {singleUrl?.original_url}
            </p>
            <img
              src={singleUrl?.qr}
              alt="QR Code"
              className="w-40 h-40 object-cover"
            />
            <div className="flex flex-row justify-between h-full md:ml-4">
              <Button variant="ghost" onClick={handleCopyLink}>
                {copyLink ? <Check /> : <Copy />}{" "}
                {/* Display check icon if link copied */}
              </Button>{" "}
              <Button variant="ghost" onClick={handleDownloadImage}>
                <Download /> {/* Download button */}
              </Button>
              <Button variant="ghost" onClick={handleDelete}>
                {deleteLoading ? (
                  <BeatLoader size={5} color="white" />
                ) : (
                  <Trash />
                )}{" "}
                {/* Show loader or trash icon */}
              </Button>
            </div>
          </div>

          {/* Right Section: Analytics */}
          <div className="flex flex-col justify-center space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Clicks</CardTitle>
              </CardHeader>
              {clickData?.length > 0 && (
                <CardContent>
                  <p className="text-2xl font-bold">{clickData?.length ?? 0}</p>
                </CardContent>
              )}{" "}
              <CardHeader>
                <CardTitle>location</CardTitle>
              </CardHeader>
              <CardContent>
                <LocationChart cityData={cityClicks} />
              </CardContent>
              <CardHeader>
                <CardTitle>Device</CardTitle>
              </CardHeader>
              <CardContent>
                <DeviceChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Link;
