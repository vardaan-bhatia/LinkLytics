import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { Users, Link, Globe, Zap } from "lucide-react";

const CardSection = () => {
  const cardItems = [
    {
      title: "Easy to Use",
      description:
        "No complicated steps. Just start shortening your links with a single click.",
      icon: <Users className="w-6 h-6 text-blue-400" />,
    },
    {
      title: "Fast Link Creation",
      description:
        "Shorten any URL quickly and share it with your friends or team instantly.",
      icon: <Link className="w-6 h-6 text-pink-400" />,
    },
    {
      title: "Global Access",
      description:
        "Your links work anywhere, anytime, ensuring everyone can reach your content.",
      icon: <Globe className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Always Online",
      description:
        "Your links are live 24/7, so they’re always available whenever someone clicks.",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
    },
  ];

  return <HoverEffect items={cardItems} className="cursor-pointer" />;
};

export default CardSection;
