/**
 * Google AdSense ad unit.
 * 
 * Usage:
 *   <AdUnit slot="1234567890" format="auto" />
 *   <AdUnit slot="0987654321" format="rectangle" />
 * 
 * Set ADSENSE_PUBLISHER_ID in the site's .env.local:
 *   ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
 */

// Placeholder — replace with your AdSense publisher ID once approved
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-0000000000000000";

const FORMAT_MAP = {
  auto: "auto",
  horizontal: "rectangle",
  vertical: "vertical",
  rectangle: "rectangle",
  leaderboard: "horizontal",
  "in-article": "in-article",
};

export default function AdUnit({
  slot,
  format = "auto",
  className,
}: {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle" | "leaderboard" | "in-article";
  className?: string;
}) {
  if (ADSENSE_PUBLISHER_ID === "ca-pub-0000000000000000") {
    // Placeholder mode — show a styled box so layout is preserved
    return (
      <div
        className={`flex items-center justify-center border border-dashed border-[#27272a] rounded-xl bg-[#0f0f0f] text-sm text-[#52525b] ${className || ""}`}
        style={{ minHeight: format === "rectangle" ? 250 : 90 }}
      >
        Advertisement
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className || ""}`}
      style={{ 
        display: "block",
        minHeight: format === "rectangle" || format === "in-article" ? 250 : format === "leaderboard" ? 90 : 100,
      }}
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={slot}
      data-ad-format={FORMAT_MAP[format]}
      data-full-width-responsive="true"
    />
  );
}
