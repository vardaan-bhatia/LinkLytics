import React from "react";

const Error = ({ msg }) => {
  return (
    <div>
      <span className="text-red-400">{msg}</span>
    </div>
  );
};

export default Error;
