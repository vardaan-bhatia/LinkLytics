import React from "react";
import { BarLoader } from "react-spinners";

const LoadingBar = () => {
  return (
    <>
      <div
        className="w-full mt-4 flex justify-center"
        style={{
          background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
        }}
      >
        <BarLoader width={"100%"} color="#ffffff" />
      </div>
    </>
  );
};

export default LoadingBar;
