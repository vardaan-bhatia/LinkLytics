import React from "react";
import { BarChart2, Clock, Globe, Shield } from "lucide-react";

// Define features with corresponding icons, titles, and descriptions
const features = [
  {
    Icon: BarChart2,
    title: "Detailed Analytics",
    description: "Get in-depth insights on your link performance",
  },
  {
    Icon: Clock,
    title: "Instant Shortening",
    description: "Create short links in seconds",
  },
  {
    Icon: Globe,
    title: "Global Reach",
    description: "Track clicks from around the world",
  },
  {
    Icon: Shield,
    title: "Secure & Reliable",
    description: "Your links are safe and always accessible",
  },
];

// Component to display individual feature items
const FeatureItem = ({ Icon, title, description }) => (
  <div className="flex flex-col items-center text-center px-8">
    <Icon className="w-12 h-12 mb-2 text-blue-500" /> {/* Render icon */}
    <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>{" "}
    {/* Feature title */}
    <p className="text-sm text-gray-400">{description}</p>{" "}
    {/* Feature description */}
  </div>
);

const InfiniteSlider = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-24 overflow-hidden">
      <div className="flex animate-slider">
        {/* Duplicate features array to create an infinite scrolling effect */}
        {[...features, ...features].map((feature, index) => (
          <div key={index} className="flex-shrink-0">
            <FeatureItem {...feature} /> {/* Render each feature item */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteSlider;
