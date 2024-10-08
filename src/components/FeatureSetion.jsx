import React from "react";
import { BarChart2, Clock, Globe, Shield } from "lucide-react";

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

const FeatureItem = ({ Icon, title, description }) => (
  <div className="flex flex-col items-center text-center px-8">
    <Icon className="w-12 h-12 mb-2 text-blue-400" />
    <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

const InfiniteSlider = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-24 overflow-hidden">
      <div className="flex animate-slider">
        {[...features, ...features].map((feature, index) => (
          <div key={index} className="flex-shrink-0">
            <FeatureItem {...feature} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteSlider;
