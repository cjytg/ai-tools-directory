import { getAllTools, getToolBySlug } from "@/lib/tools";
import type { Tool } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateLink from "@/components/AffiliateLink";

function generateVerdict(a: Tool, b: Tool): string {
  const winner = a.rating > b.rating ? a : b.rating > a.rating ? b : null;
  const loser = winner === a ? b : winner === b ? a : null;
  const ratingDiff = Math.abs(a.rating - b.rating).toFixed(1);
  const aFeatureCount = a.features?.length ?? 0;
  const bFeatureCount = b.features?.length ?? 0;

  // Opening
  const paragraphs: string[] = [];
  paragraphs.push(
    `${a.name} and ${b.name} are two of the most popular tools in the ${a.category} category, ` +
    `but they take different approaches to solving the same problems. ` +
    `${a.name}, developed by ${a.company} (founded ${a.founded}), ` +
    `is described as "${a.description.toLowerCase()}". ` +
    `Meanwhile, ${b.name} by ${b.company} (founded ${b.founded}) ` +
    `"${b.description.toLowerCase()}".`
  );

  // Rating & performance comparison
  if (winner && loser) {
    paragraphs.push(
      `In terms of overall user satisfaction, ${winner.name} edges ahead with a rating of ` +
      `${winner.rating}/5.0, compared to ${loser.name}'s ${loser.rating}/5.0 — a difference of ` +
      `${ratingDiff} points. ${winner.name}'s strongest advantages include ${winner.pros?.slice(0, 2).join(", ").toLowerCase() || "its feature set"}, ` +
      `while ${loser.name} is praised for ${loser.pros?.slice(0, 1).join(", ").toLowerCase() || "its unique approach"}.`
    );
  } else {
    paragraphs.push(
      `Both tools share the same rating of ${a.rating}/5.0, making this a genuinely close comparison. ` +
      `Your choice comes down to specific needs rather than overall quality.`
    );
  }

  // Features & value comparison
  const aPrice = a.pricing ?? "unknown";
  const bPrice = b.pricing ?? "unknown";
  if (aFeatureCount !== bFeatureCount) {
    const moreFeatures = aFeatureCount > bFeatureCount ? a : b;
    const fewerFeatures = aFeatureCount > bFeatureCount ? b : a;
    paragraphs.push(
      `When it comes to feature depth, ${moreFeatures.name} offers ${moreFeatures.features?.length} core features ` +
      `including ${moreFeatures.features?.slice(0, 2).join(" and ").toLowerCase()}, ` +
      `compared to ${fewerFeatures.name}'s ${fewerFeatures.features?.length}, ` +
      `giving it a broader toolkit for complex workflows.`
    );
  }
  if (aPrice !== bPrice) {
    const cheaper = (a.pricing === "free" || b.pricing === "free")
      ? (a.pricing === "free" ? a : b)
      : null;
    if (cheaper) {
      paragraphs.push(
        `On the pricing front, ${cheaper.name} offers a ${cheaper.pricing} model at ${cheaper.price}, ` +
        `making it the more budget-friendly option for teams watching their spend.`
      );
    } else {
      paragraphs.push(
        `Both tools are priced around ${a.price}, so cost isn't a differentiator here — ` +
        `the decision comes down to capabilities rather than budget.`
      );
    }
  } else if (aPrice === "free") {
    paragraphs.push(
      `Both tools are free to use, making this a zero-risk comparison — try both and keep the one that fits your workflow.`
    );
  }

  // Weaknesses comparison
  if (a.cons && a.cons.length > 0 && b.cons && b.cons.length > 0) {
    paragraphs.push(
      `Neither tool is perfect: ${a.name}'s main drawbacks include ${a.cons.slice(0, 2).join(", ").toLowerCase()}, ` +
      `while ${b.name} users typically cite ${b.cons.slice(0, 1).join(", ").toLowerCase()} as its biggest limitation.`
    );
  }

  // Use case recommendation
  if (a.use_cases && a.use_cases.length > 0 && b.use_cases && b.use_cases.length > 0) {
    const sharedCases = a.use_cases.filter((u: string) => b.use_cases?.includes(u));
    const aOnly = a.use_cases.filter((u: string) => !b.use_cases?.includes(u));
    if (sharedCases.length > 0) {
      paragraphs.push(
        `Both tools excel at ${sharedCases.slice(0, 2).join(" and ").toLowerCase()}, ` +
        `so either choice will serve you well for these core use cases.`
      );
    }
    if (aOnly.length > 0) {
      paragraphs.push(
        `However, ${a.name} has an edge in ${aOnly.slice(0, 1).join(", ").toLowerCase()}, ` +
        `which might be the tiebreaker if that's important to you.`
      );
    }
  }

  // Target audience
  if (a.target_users && a.target_users.length > 0) {
    paragraphs.push(
      `In terms of target audience, ${a.name} is particularly popular among ${a.target_users.slice(0, 2).join(" and ").toLowerCase()}, ` +
      `while ${b.name} tends to attract ${b.target_users?.slice(0, 2).join(" and ").toLowerCase() || "professionals in the same space"}.`
    );
  }

  // Final verdict
  if (winner && loser && parseFloat(ratingDiff) >= 0.3) {
    paragraphs.push(
      `Our verdict: ${winner.name} is the stronger choice overall, ` +
      `especially if you value ${winner.pros?.[0]?.toLowerCase() || "its top-rated features"}. ` +
      `However, if ${loser.pros?.[0]?.toLowerCase() || "its unique strengths"} matters more to your workflow, ` +
      `${loser.name} remains a solid alternative.`
    );
  } else if (winner && loser) {
    paragraphs.push(
      `Our verdict: ${winner.name} holds a slight edge, but the gap is narrow enough that ` +
      `both tools are worth trying. Start with the free tier of each and see which fits your workflow better.`
    );
  } else {
    paragraphs.push(
      `Our verdict: With identical ratings, you can't go wrong with either. ` +
      `Try both free versions and pick the one that clicks with your workflow.`
    );
  }

  return paragraphs.join(" ");
}

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
    alternates: {
      canonical: `https://toolio-ai.com/compare/${slug}`,
    },
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
        <div className="prose prose-invert max-w-none mb-6">
          <p className="text-[#a1a1aa] leading-relaxed">{generateVerdict(toolA, toolB)}</p>
        </div>
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
