import React from "react";
import { Link } from "react-router-dom";
import { Copy, Download, Trash } from "lucide-react";
import { Button } from "./ui/button";

const UrlCard = ({ url }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row justify-between items-center border border-gray-700 gap-6">
      {/* Left - QR Code */}
      <div className="flex-shrink-0">
        <img
          src={url?.qr}
          alt="qr-code"
          className="h-32 w-32 object-cover rounded-lg ring-2 ring-blue-500"
        />
      </div>

      {/* Middle - URL Information */}
      <div className="flex-grow flex flex-col justify-center w-full sm:w-auto">
        {/* URL Title */}
        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
          {url?.title}
        </div>

        {/* Shortened/Custom URL */}
        <Link
          to={`/url/${url?.id}`}
          className="text-blue-400 text-sm sm:text-base md:text-lg font-semibold  hover:underline break-all"
        >
          {`https://linklytics.in/${
            url?.short_url ? url?.short_url : url?.custom_url
          }`}
        </Link>

        {/* Original URL */}
        <div className="text-gray-400 text-xs sm:text-sm md:text-base truncate  ">
          {url?.original_url}
        </div>

        {/* Creation Date */}
        <div className="text-gray-500 text-xs sm:text-sm mt-4">
          {new Date(url?.created_at).toLocaleString()}
        </div>
      </div>

      {/* Right - Vertical Buttons */}
      <div className="flex flex-col gap-1 justify-between h-full">
        <Button variant="ghost">
          <Copy className="w-5 h-5" />
        </Button>
        <Button variant="ghost">
          <Download className="w-5 h-5" />
        </Button>
        <Button variant="ghost">
          <Trash className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default UrlCard;
