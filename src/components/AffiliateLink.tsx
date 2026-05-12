import Link from "next/link";

/**
 * Affiliate/CTA link component with automatic UTM tracking.
 * - If affiliateUrl is provided, uses it and adds rel="sponsored nofollow"
 * - Falls back to regular website URL
 * - Auto-appends UTM parameters for conversion tracking:
 *   ?utm_source=toolio&utm_medium=referral&utm_campaign=affiliate
 * - Tracks outbound clicks (optional: add your analytics event here)
 */
export default function AffiliateLink({
  href,
  affiliateUrl,
  children,
  className,
  utmCampaign,
}: {
  href: string;
  affiliateUrl?: string;
  children: React.ReactNode;
  className?: string;
  utmCampaign?: string;
}) {
  const baseUrl = affiliateUrl || href;
  const isAffiliate = !!affiliateUrl;
  const campaign = utmCampaign || "affiliate";

  // Only append UTM params if the URL doesn't already have them
  const url = baseUrl.includes("utm_")
    ? baseUrl
    : `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}utm_source=toolio&utm_medium=referral&utm_campaign=${campaign}`;

  return (
    <a
      href={url}
      target="_blank"
      rel={`noopener noreferrer${isAffiliate ? " sponsored nofollow" : ""}`}
      className={className || "text-[#3b82f6] hover:underline"}
    >
      {children}
    </a>
  );
}
