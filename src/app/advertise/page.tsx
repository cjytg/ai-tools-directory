export const metadata = {
  title: "Advertise on Toolio",
  description: "Reach AI enthusiasts and professionals. Advertising opportunities on Toolio.",
};

export default function AdvertisePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Advertise on Toolio</h1>
      <p className="text-[#71717a] mb-8">Reach thousands of AI enthusiasts and professionals every month.</p>

      <div className="space-y-8">
        <section className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
          <h2 className="text-xl font-bold mb-4">Why advertise with us?</h2>
          <ul className="space-y-3 text-[#a1a1aa]">
            <li className="flex items-start gap-2">
              <span className="text-[#3b82f6]">✓</span>
              <span><strong className="text-white">Targeted audience:</strong> Our visitors are actively looking for AI tools</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3b82f6]">✓</span>
              <span><strong className="text-white">High intent:</strong> Users are in research/decision mode</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3b82f6]">✓</span>
              <span><strong className="text-white">Quality content:</strong> Your brand appears alongside trusted reviews</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3b82f6]">✓</span>
              <span><strong className="text-white">Flexible options:</strong> Banner ads, sponsored listings, newsletter mentions</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Ad placements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl">
              <h3 className="font-semibold mb-2">Banner Ads</h3>
              <p className="text-sm text-[#71717a] mb-3">728x90, 300x250, 300x600 available</p>
              <p className="text-sm text-[#3b82f6]">From $500/month</p>
            </div>
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl">
              <h3 className="font-semibold mb-2">Sponsored Listings</h3>
              <p className="text-sm text-[#71717a] mb-3">Featured placement in tool categories</p>
              <p className="text-sm text-[#3b82f6]">From $300/month</p>
            </div>
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl">
              <h3 className="font-semibold mb-2">Newsletter Mentions</h3>
              <p className="text-sm text-[#71717a] mb-3">Featured in our weekly newsletter</p>
              <p className="text-sm text-[#3b82f6]">From $200/email</p>
            </div>
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl">
              <h3 className="font-semibold mb-2">Sponsored Reviews</h3>
              <p className="text-sm text-[#71717a] mb-3">In-depth review clearly marked as sponsored</p>
              <p className="text-sm text-[#3b82f6]">From $1,000</p>
            </div>
          </div>
        </section>

        <section className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
          <h2 className="text-xl font-bold mb-4">Get in touch</h2>
          <p className="text-[#a1a1aa] mb-4">
            Interested in advertising? Send us an email with your goals and budget, 
            and we&apos;ll put together a custom package.
          </p>
          <a
            href="mailto:advertise@toolio.dev"
            className="inline-block px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg transition"
          >
            Contact Advertising Team
          </a>
        </section>
      </div>
    </div>
  );
}
