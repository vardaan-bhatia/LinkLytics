import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";

const UrlCard = ({ url }) => {
  return (
    <div className="flex flex-col gap-5 md:flex-row bg-gray-900 p-4 rounded-lg border">
      {/* image div */}
      <div>
        {" "}
        <img
          src={url?.qr}
          alt="qr-code"
          className="h-32 w-32 object-contain ring ring-blue-500"
        />
      </div>
      {/* link div */}
      <div className="flex flex-col">
        <Link className="">
          <span className="font-extrabold hover:underline text-3xl">
            {url?.title}
          </span>
        </Link>
        <span className="text-blue-500 font-bold text-2xl hover:underline">
          {`https://linklytics.in/${
            url?.short_url ? url?.short_url : url?.custom_url
          }`}
        </span>
        <span className="text-gray-400 text-xs">{url?.original_url}</span>
        <span>
          <span className=" text-gray-500 text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
        </span>
      </div>

      {/* button div */}

      <div className="flex flex-col justify-between">
        <Button variant="ghost">
          <Copy />
        </Button>
        <Button variant="ghost">
          <Download />
        </Button>
        <Button variant="ghost">
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default UrlCard;
