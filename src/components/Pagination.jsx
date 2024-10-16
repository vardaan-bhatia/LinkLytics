import React from "react";
import { Button } from "./ui/button";

const Pagination = ({ onPageChange, totalUrl, UrlperPage, activePage }) => {
  /*
   * totalUrl: Total number of URLs that we are paginating.
   * UrlperPage: Number of URLs to display per page.
   * Math.ceil() is used here to calculate the total number of pages needed.
   * Math.ceil() rounds up to the nearest whole number.
   * For example, if we have 10 URLs and we want to show 3 per page:
   * 10 / 3 = 3.33, so Math.ceil(3.33) = 4 pages why used Math.ceil() so that it return the rest of the data(url) in the last page .
   */
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
          // When a button is clicked, call the onPageChange function and pass the page number (index + 1).
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
