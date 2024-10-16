import React from "react";
import { Button } from "./ui/button";

const Pagination = ({ onPageChange, totalUrl, UrlperPage, activePage }) => {
  const totalPages = [...Array(Math.ceil(totalUrl / UrlperPage))];

  return (
    <div className="flex justify-center items-center gap-2">
      {totalPages.map((_, index) => (
        <Button
          key={index}
          className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200 ${
            activePage === index + 1
              ? "bg-blue-500 hover:bg-blue-400 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
