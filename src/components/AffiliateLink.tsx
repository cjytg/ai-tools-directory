import Link from "next/link";

/**
 * Affiliate/CTA link component.
 * - If affiliateUrl is provided, uses it and adds rel="sponsored nofollow"
 * - Falls back to regular website URL
 * - Tracks outbound clicks (optional: add your analytics event here)
 */
export default function AffiliateLink({
  href,
  affiliateUrl,
  children,
  className,
}: {
  href: string;
  affiliateUrl?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const url = affiliateUrl || href;
  const isAffiliate = !!affiliateUrl;

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
