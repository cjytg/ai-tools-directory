"use client";

interface AdBannerProps {
  position: "top" | "sidebar" | "inline" | "bottom";
  className?: string;
}

export default function AdBanner({ position, className = "" }: AdBannerProps) {
  const sizes = {
    top: "h-24",
    sidebar: "h-64",
    inline: "h-20",
    bottom: "h-24",
  };

  return (
    <div className={`${sizes[position]} bg-[#18181b] border border-dashed border-[#27272a] rounded-xl flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="text-xs text-[#52525b] uppercase tracking-wider mb-1">Advertisement</div>
        <div className="text-sm text-[#71717a]">
          {position === "top" && "728 x 90 Leaderboard"}
          {position === "sidebar" && "300 x 250 Medium Rectangle"}
          {position === "inline" && "728 x 90 Leaderboard"}
          {position === "bottom" && "728 x 90 Leaderboard"}
        </div>
      </div>
    </div>
  );
}
