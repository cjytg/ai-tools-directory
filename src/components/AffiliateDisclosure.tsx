export default function AffiliateDisclosure({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-[#52525b] ${className}`}>
      <strong>Disclosure:</strong> Some links on this page are affiliate links. 
      We may earn a commission if you make a purchase, at no additional cost to you.
    </p>
  );
}
