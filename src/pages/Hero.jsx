import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FeaturesSection from "@/components/FeatureSetion";
import CardSection from "@/components/CardSections";
import Accordion from "@/components/Accordion";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mt-14 px-4">
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
      <p className="text-gray-400 mt-4 text-center max-w-screen-lg">
        LinkLytics doesn't just shrink URLs—it supercharges them. Create concise
        links in seconds, then harness powerful analytics to understand your
        audience and optimize your reach. Turn every shortened link into a data
        goldmine.
      </p>

      <form
        className="flex flex-col sm:flex-row items-center justify-center mt-20 w-full max-w-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-full flex flex-col sm:flex-row gap-2">
          <Input
            className="flex-grow h-14 bg-gray-800 text-white placeholder-gray-400
                       rounded-t-md sm:rounded-l-md sm:rounded-r-none sm:rounded-t-none focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent"
            placeholder="Enter your URL"
            required
          />
          <Button
            type="submit"
            className="h-14 w-full sm:w-auto px-8 text-lg font-semibold bg-white text-black hover:bg-gray-200 transition-colors duration-200 rounded-b-md sm:rounded-none sm:rounded-r-md"
          >
            Try Now!
          </Button>
        </div>
      </form>

      <FeaturesSection />

      {/* Centering CardSection and Accordion */}
      <div className="flex flex-col items-center w-full mt-20 mb-20">
        <CardSection />
        <Accordion />
      </div>
    </div>
  );
};

export default Hero;
