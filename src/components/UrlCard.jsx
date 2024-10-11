import React from "react";

const UrlCard = ({ url = {} }) => {
  return (
    <div className="flex flex-col p-4 shadow-lg border rounded-md">
      {/* Display the URL title or a fallback message */}
      <h1 className="text-lg font-semibold">
        {url?.title || "No Title Available"}
      </h1>

      {/* Display QR code image */}
      {url?.qr ? (
        <img
          src={url.qr}
          alt="QR code"
          className="mt-4 w-32 h-32 object-contain"
        />
      ) : (
        <p className="text-sm text-gray-500">QR Code not available</p>
      )}
    </div>
  );
};

export default UrlCard;
