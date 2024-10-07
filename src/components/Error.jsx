import React from "react";

const Error = ({ message }) => {
  return (
    <div>
      <span className="text-red-400">{message}</span>
    </div>
  );
};

export default Error;
