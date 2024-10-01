import React from "react";
import { HoverEffect } from "./ui/card-hover-effect"; // Import HoverEffect

const CardSection = () => {
  const cardItems = [
    {
      title: "Powerful Analytics",
      description:
        "Track every click, location, and device used to access your links.",
      link: "#",
    },
    {
      title: "Custom Short URLs",
      description: "Personalize your links with custom slugs and branding.",
      link: "#",
    },
    {
      title: "Seamless Integration",
      description: "Integrate with your favorite tools for smoother workflows.",
      link: "#",
    },
  ];

  return <HoverEffect items={cardItems} />;
};

export default CardSection;
