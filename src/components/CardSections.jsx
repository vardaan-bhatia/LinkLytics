import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { Users, Link, Globe, Zap } from "lucide-react";

const CardSection = () => {
  const cardItems = [
    {
      title: "1.5M+ Daily Users",
      description:
        "Join over 1.5 million users who trust LinkLytics every day for their link shortening and analytics needs.",
      icon: <Users className="w-6 h-6 text-blue-400" />,
    },
    {
      title: "5B+ Links Shortened",
      description:
        "We've shortened over 5 billion links, helping businesses and individuals optimize their online presence.",
      icon: <Link className="w-6 h-6 text-pink-400" />,
    },
    {
      title: "200+ Countries Reached",
      description:
        "Our global network ensures your shortened links are accessible and fast-loading worldwide.",
      icon: <Globe className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "99.99% Uptime",
      description:
        "Rely on our robust infrastructure for uninterrupted service and lightning-fast redirects.",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
    },
  ];

  return <HoverEffect items={cardItems} className="cursor-pointer" />;
};

export default CardSection;
