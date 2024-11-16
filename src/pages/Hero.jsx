import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InfiniteSlider from "@/components/FeatureSetion";
import CardSection from "@/components/CardSections";
import Accordion from "@/components/Accordion";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Main Hero component for the landing page
const Hero = () => {
  const [longURL, setlongURL] = useState(""); // State to hold the input URL
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init(); // Initialize AOS for scroll animations
  }, []);

  // Handle submission of the long URL, navigating to auth page if a URL is provided
  const handlelinkAuth = (e) => {
    e.preventDefault();
    if (longURL) {
      navigate(`/auth?createNew=${longURL}`);
    }
  };

  return (
    <div className="flex flex-col items-center mt-14 px-4">
      {/* Hero title with gradient text */}
      <h1
        className="font-extrabold text-4xl sm:text-5xl bg-clip-text text-transparent text-center"
        style={{
          background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Shorten Links, Amplify Insights with LinkLytics{" "}
      </h1>

      {/* Hero description */}
      <p className="text-gray-400 mt-4 text-center max-w-screen-lg">
        LinkLytics doesn't just shrink URLs—it supercharges them. Create concise
        links in seconds, then harness powerful analytics to understand your
        audience and optimize your reach. Turn every shortened link into a data
        goldmine.
      </p>

      {/* URL input form */}
      <form
        className="flex flex-col sm:flex-row items-center justify-center mt-10 sm:mt-20 w-full max-w-2xl"
        onSubmit={handlelinkAuth}
      >
        <div className="w-full flex flex-col sm:flex-row gap-2">
          <Input
            className="flex-grow h-14 bg-gray-800 text-white placeholder-gray-400
                       rounded-t-md sm:rounded-l-md sm:rounded-r-none sm:rounded-t-none focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent"
            placeholder="Enter your URL"
            required
            onChange={(e) => setlongURL(e.target.value)} // Update longURL state on input change
          />
          <Button
            type="submit"
            className="h-14 w-full sm:w-auto px-8 text-lg font-semibold bg-blue-500 hover:bg-blue-400 text-white transition-colors duration-200 rounded-b-md sm:rounded-none sm:rounded-r-md"
          >
            Try Now!
          </Button>
        </div>
      </form>

      <InfiniteSlider />

      {/* Centering CardSection and Accordion components */}
      <div className="flex flex-col items-center w-full mt-20 mb-20 px-4">
        <CardSection />
        <h1 className="text-lg text-center md:text-xl lg:text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h1>
        <Accordion />
      </div>
    </div>
  );
};

export default Hero;
