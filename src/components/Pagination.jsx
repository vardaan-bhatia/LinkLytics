import React from "react";

const Pagination = ({ currentPage, totalUrls, urlsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalUrls / urlsPerPage); // Calculate total pages

  // Render pagination buttons
  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
