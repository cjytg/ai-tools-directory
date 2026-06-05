"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number; // seconds per cycle
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = "",
  speed = 3,
}) => {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, #fafafa 0%, #fafafa 35%, #3b82f6 50%, #fafafa 65%, #fafafa 100%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `shiny-text ${speed}s linear infinite`,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
