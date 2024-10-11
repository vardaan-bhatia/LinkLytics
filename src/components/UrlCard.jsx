import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Check, Copy, Download, Trash } from "lucide-react";
import useFetch from "@/Hooks/useFetch";
import { deleteUrls } from "@/db/apiUrls";

const UrlCard = ({ url = {}, fetchurl }) => {
  const [copyLink, setcopyLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://linklytics.in/${url?.short_url}`);
    setcopyLink(true);
    setTimeout(() => {
      setcopyLink(false);
    }, 3000);
  };

  const {
    data,
    loading: deleteloading,
    error,
    fn: fndelete,
  } = useFetch(deleteUrls, url?.id);

  const handleDelete = async () => {
    await fndelete();
    await fetchurl();
  };

  return (
    <div
      className={`flex flex-col gap-5 md:flex-row bg-gray-900 p-4 rounded-lg border items-center justify-between md:justify-start`}
    >
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
          {" "}
          <span className="text-blue-500 font-bold text-sm sm:text-xl md:text-2xl hover:underline">
            {`https://linklytics.in/${
              url?.short_url ? url?.short_url : url?.custom_url
            }`}
          </span>
        </Link>
        <span className="text-gray-300 text-xs sm:text-lg mb-4 ">
          {url?.original_url}
        </span>
        <span>
          <span className="text-gray-400 text-base font-mono">
            {new Date(url?.created_at).toLocaleString()}
          </span>
        </span>
      </div>

      {/* Button div */}
      <div className="flex flex-row sm:flex-col justify-between h-full  ">
        <Button variant="ghost" onClick={handleCopyLink}>
          {copyLink ? <Check /> : <Copy />}
        </Button>
        <Button variant="ghost">
          <Download />
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default UrlCard;
