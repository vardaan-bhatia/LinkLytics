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
import { SyncLoader } from "react-spinners";
import LocationChart from "@/components/LocationChart";
import DeviceChart from "@/components/DeviceChart";

const Link = () => {
  const { id } = useParams();
  const { user } = urlState();
  const navigate = useNavigate();
  const [copyLink, setCopyLink] = useState(false);

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
  } = useFetch(getClicksForUrl, id);

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
    await fnDelete();
    navigate("/dashboard");
  };

  const handleCopyLink = () => {
    const urlToCopy = singleUrl?.custom_url
      ? `https://linklytics.online/${singleUrl?.custom_url}`
      : `https://linklytics.online/${singleUrl?.short_url}`;

    navigator.clipboard.writeText(urlToCopy); // Copy the URL to clipboard
    setCopyLink(true); // Set copy status to true
    setTimeout(() => {
      setCopyLink(false); // Reset copy status after 3 seconds
    }, 3000);
  };

  const qr = singleUrl?.qr;
  const downloadName = singleUrl?.title;

  const handleDownloadImage = async () => {
    try {
      const response = await fetch(qr);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `${downloadName}.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };
  let link = "";
  if (singleUrl) {
    link = singleUrl.custom_url ? singleUrl.custom_url : singleUrl.short_url;
  }

  return (
    <>
      {(clickLoading || urlLoading) && <LoadingBar />}
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section: QR Code and URL Details */}
          <div className="flex-1 flex flex-col space-y-4">
            {singleUrl?.qr ? (
              <div className="flex justify-center items-center mb-8">
                <img
                  src={singleUrl?.qr}
                  alt="QR Code"
                  className="h-72 object-cover rounded-lg shadow-lg ring-4 ring-blue-500 transition-transform transform hover:scale-105 hover:shadow-xl"
                />
              </div>
            ) : (
              <SyncLoader color="#fdf8fa" size={7} />
            )}

            <Card>
              <CardHeader>
                <CardTitle>{singleUrl?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`/${link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold text-lg sm:text-2xl hover:underline"
                >
                  {`https://linklytics.online/${
                    singleUrl?.custom_url
                      ? singleUrl?.custom_url
                      : singleUrl?.short_url
                  }`}
                </a>
                <p className="text-gray-400 text-md break-words max-w-xl w-full mb-5">
                  {singleUrl?.original_url}
                </p>
                <p className="text-gray-400 text-base font-mono">
                  {new Date(singleUrl?.created_at).toLocaleString()}
                </p>
                <div className="flex flex-row mt-4">
                  <Button variant="ghost" onClick={handleCopyLink}>
                    {copyLink ? <Check /> : <Copy />}{" "}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleDownloadImage}
                    className="ml-2"
                  >
                    <Download />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleDelete}
                    className="ml-2"
                  >
                    {deleteLoading ? (
                      <SyncLoader size={7} color="white" />
                    ) : (
                      <Trash />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section: Analytics */}
          <div className="flex-1 flex flex-col justify-between space-y-4">
            {" "}
            <Card className="flex-grow">
              {" "}
              <CardHeader>
                <CardTitle>Total Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                {clickLoading ? (
                  <SyncLoader color="#fdf8fa" size={7} />
                ) : clickData?.length > 0 ? (
                  <div className="flex flex-col">
                    <p className="text-6xl font-bold text-blue-600">
                      {clickData.length}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">
                    No statistics available
                  </p>
                )}
              </CardContent>
            </Card>
            <Card className="flex-grow">
              {" "}
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                {clickLoading ? (
                  <SyncLoader color="#fdf8fa" size={7} />
                ) : clickData && clickData.length > 0 ? (
                  <LocationChart stats={clickData} />
                ) : (
                  <p className="text-gray-500 text-center">
                    No location data available
                  </p>
                )}
              </CardContent>
            </Card>
            <Card className="flex-grow">
              {" "}
              {/* Keep cards of equal height */}
              <CardHeader>
                <CardTitle>Device</CardTitle>
              </CardHeader>
              <CardContent>
                {clickLoading ? (
                  <SyncLoader color="#fdf8fa" size={7} />
                ) : clickData && clickData.length > 0 ? (
                  <DeviceChart stats={clickData} />
                ) : (
                  <p className="text-gray-500 text-center">
                    No device data available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Link;
