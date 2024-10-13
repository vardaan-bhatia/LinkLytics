import React from "react";

// Error component to display error messages
const Error = ({ message }) => {
  return (
    <div>
      <span className="text-red-400">{message}</span>
    </div>
  );
};

export default Error;
