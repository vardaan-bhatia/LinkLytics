import React from "react";
import { BarChart2, Clock, Globe, Shield } from "lucide-react";

const FeatureItem = ({ Icon, title, description }) => (
  <div className="flex flex-col items-center text-center px-4">
    <Icon className="w-12 h-12 mb-2 text-blue-400" />
    <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

const FeaturesSection = () => (
  <div className="w-full max-w-4xl mx-auto mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <FeatureItem
      Icon={BarChart2}
      title="Detailed Analytics"
      description="Get in-depth insights on your link performance"
    />
    <FeatureItem
      Icon={Clock}
      title="Instant Shortening"
      description="Create short links in seconds"
    />
    <FeatureItem
      Icon={Globe}
      title="Global Reach"
      description="Track clicks from around the world"
    />
    <FeatureItem
      Icon={Shield}
      title="Secure & Reliable"
      description="Your links are safe and always accessible"
    />
  </div>
);

export default FeaturesSection;
