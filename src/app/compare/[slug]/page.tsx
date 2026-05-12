import { getAllTools, getToolBySlug } from "@/lib/tools";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateLink from "@/components/AffiliateLink";

export async function generateStaticParams() {
  const tools = getAllTools();
  const params = [];
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      if (tools[i].category === tools[j].category) {
        params.push({ slug: `${tools[i].slug}-vs-${tools[j].slug}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  if (parts.length < 2) return { title: "Comparison Not Found" };
  const toolA = getToolBySlug(parts[0]);
  const toolB = getToolBySlug(parts[1]);
  if (!toolA || !toolB) return { title: "Comparison Not Found" };
  return {
    title: `${toolA.name} vs ${toolB.name} - Which is Better?`,
    description: `Compare ${toolA.name} and ${toolB.name}: features, pricing, pros and cons. Find out which AI tool is right for you.`,
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  if (parts.length < 2) notFound();
  
  const toolA = getToolBySlug(parts[0]);
  const toolB = getToolBySlug(parts[1]);

  if (!toolA || !toolB) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#71717a] mb-8">
        <Link href="/tools" className="hover:text-white transition">Tools</Link>
        <span>/</span>
        <span>{toolA.name} vs {toolB.name}</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">{toolA.name} vs {toolB.name}</h1>
      <p className="text-[#71717a] mb-8">Which one should you choose? Here&apos;s how they compare.</p>

      {/* Comparison Table */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#27272a]">
              <th className="text-left py-4 px-4 text-[#71717a]">Feature</th>
              <th className="text-center py-4 px-4">{toolA.name}</th>
              <th className="text-center py-4 px-4">{toolB.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#27272a]">
              <td className="py-4 px-4 text-[#71717a]">Rating</td>
              <td className="text-center py-4 px-4">★ {toolA.rating}</td>
              <td className="text-center py-4 px-4">★ {toolB.rating}</td>
            </tr>
            <tr className="border-b border-[#27272a]">
              <td className="py-4 px-4 text-[#71717a]">Pricing</td>
              <td className="text-center py-4 px-4">{toolA.price}</td>
              <td className="text-center py-4 px-4">{toolB.price}</td>
            </tr>
            <tr className="border-b border-[#27272a]">
              <td className="py-4 px-4 text-[#71717a]">Type</td>
              <td className="text-center py-4 px-4 capitalize">{toolA.pricing}</td>
              <td className="text-center py-4 px-4 capitalize">{toolB.pricing}</td>
            </tr>
            <tr className="border-b border-[#27272a]">
              <td className="py-4 px-4 text-[#71717a]">Company</td>
              <td className="text-center py-4 px-4">{toolA.company}</td>
              <td className="text-center py-4 px-4">{toolB.company}</td>
            </tr>
            <tr className="border-b border-[#27272a]">
              <td className="py-4 px-4 text-[#71717a]">Founded</td>
              <td className="text-center py-4 px-4">{toolA.founded}</td>
              <td className="text-center py-4 px-4">{toolB.founded}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Features Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-bold mb-4">{toolA.name} Features</h2>
          <ul className="space-y-2">
            {toolA.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#3b82f6]">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">{toolB.name} Features</h2>
          <ul className="space-y-2">
            {toolB.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#3b82f6]">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
          <h3 className="font-bold mb-4 text-green-400">{toolA.name} Pros</h3>
          <ul className="space-y-2 mb-4">
            {toolA.pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-green-400">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <h3 className="font-bold mb-4 text-red-400">{toolA.name} Cons</h3>
          <ul className="space-y-2">
            {toolA.cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-red-400">✗</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
          <h3 className="font-bold mb-4 text-green-400">{toolB.name} Pros</h3>
          <ul className="space-y-2 mb-4">
            {toolB.pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-green-400">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <h3 className="font-bold mb-4 text-red-400">{toolB.name} Cons</h3>
          <ul className="space-y-2">
            {toolB.cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-red-400">✗</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verdict */}
      <div className="p-8 bg-[#18181b] border border-[#27272a] rounded-xl">
        <h2 className="text-xl font-bold mb-4">The Verdict</h2>
        <p className="text-[#71717a] mb-4">
          Both {toolA.name} and {toolB.name} are solid choices in the {toolA.category} space.
          Here&apos;s a quick summary:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#09090b] rounded-lg">
            <div className="font-medium mb-2">Choose {toolA.name} if:</div>
            <ul className="text-sm text-[#71717a] space-y-1">
              {toolA.pros.slice(0, 2).map((p, i) => (
                <li key={i}>• You need {p.toLowerCase()}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-[#09090b] rounded-lg">
            <div className="font-medium mb-2">Choose {toolB.name} if:</div>
            <ul className="text-sm text-[#71717a] space-y-1">
              {toolB.pros.slice(0, 2).map((p, i) => (
                <li key={i}>• You need {p.toLowerCase()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center gap-4 mt-8">
        <AffiliateLink
          href={toolA.website}
          affiliateUrl={toolA.affiliate_url}
          className="px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg transition text-white"
        >
          Try {toolA.name} →
        </AffiliateLink>
        <AffiliateLink
          href={toolB.website}
          affiliateUrl={toolB.affiliate_url}
          className="px-6 py-3 border border-[#27272a] hover:border-[#3b82f6] rounded-lg transition text-white"
        >
          Try {toolB.name} →
        </AffiliateLink>
      </div>
    </div>
  );
}
