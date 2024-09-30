import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mt-16 px-4">
      <h1
        className="font-extrabold text-5xl bg-clip-text text-transparent text-center"
        style={{
          background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Shorten Links, Amplify Insights with LinkLytics
      </h1>
      <p className="text-gray-300 mt-4 text-center max-w-screen-lg">
        LinkLytics doesn't just shrink URLs—it supercharges them. Create concise
        links in seconds, then harness powerful analytics to understand your
        audience and optimize your reach. Turn every shortened link into a data
        goldmine.
      </p>

      <div className="flex items-center justify-center mt-20 w-full max-w-2xl">
        <div className="relative w-full">
          <Input
            className="w-full pr-32 h-14 rounded-r-none border-r-0 focus:ring-0 "
            placeholder="Enter your URL"
          />
          <Button className="absolute right-0 top-0 h-14 px-8 rounded-l-none text-lg font-semibold">
            Try Now!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
