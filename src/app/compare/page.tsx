import { getAllTools } from "@/lib/tools";
import { CATEGORIES } from "@/types";
import Link from "next/link";
import ToolLogo from "@/components/ToolLogo";

export const metadata = {
  title: "Compare AI Tools - Toolio",
  description: "Compare AI tools side by side. See features, pricing, and ratings at a glance.",
  alternates: {
    canonical: "https://toolio-ai.com/compare",
  },
};

export default function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  return <CompareContent searchParams={searchParams} />;
}

async function CompareContent({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const tools = getAllTools();
  const { cat } = await searchParams;
  const selectedCat = cat || "";

  // Group comparisons by category
  const categories = [...new Set(tools.map((t) => t.category))].sort();

  const filteredCategories = selectedCat
    ? categories.filter((c) => c === selectedCat)
    : categories;

  const comparisons: {
    category: string;
    count: number;
    pairs: { a: (typeof tools)[0]; b: (typeof tools)[0] }[];
  }[] = [];

  for (const category of filteredCategories) {
    const catTools = tools
      .filter((t) => t.category === category)
      .sort((a, b) => b.rating - a.rating);
    const pairs = [];
    for (let i = 0; i < catTools.length; i++) {
      for (let j = i + 1; j < catTools.length; j++) {
        pairs.push({ a: catTools[i], b: catTools[j] });
      }
    }
    if (pairs.length > 0) {
      comparisons.push({ category, count: pairs.length, pairs });
    }
  }

  const totalComparisons = comparisons.reduce((s, c) => s + c.count, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Compare AI Tools</h1>
      <p className="text-[#71717a] mb-8">
        {totalComparisons} side-by-side comparisons to help you choose the right tool.
      </p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/compare"
          className={`px-3 py-1.5 rounded-lg text-sm border transition ${
            !selectedCat
              ? "bg-[#3b82f6] border-[#3b82f6] text-white"
              : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:border-[#3b82f6]"
          }`}
        >
          All ({totalComparisons})
        </Link>
        {categories.map((category) => {
          const count = comparisons.find((c) => c.category === category)?.count || 0;
          if (count === 0) return null;
          return (
            <Link
              key={category}
              href={`/compare?cat=${category}`}
              className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                selectedCat === category
                  ? "bg-[#3b82f6] border-[#3b82f6] text-white"
                  : "bg-[#18181b] border-[#27272a] text-[#71717a] hover:border-[#3b82f6]"
              }`}
            >
              {CATEGORIES[category] || category} ({count})
            </Link>
          );
        })}
      </div>

      {comparisons.length === 0 && (
        <div className="text-center py-12 text-[#71717a]">
          <p>No comparisons available for this category.</p>
        </div>
      )}

      {comparisons.map(({ category, pairs }) => (
        <section key={category} className="mb-12">
          <h2 className="text-xl font-bold mb-4 capitalize">
            {CATEGORIES[category] || category}{" "}
            <span className="text-sm font-normal text-[#71717a]">
              ({pairs.length} comparisons)
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pairs.map(({ a, b }) => (
              <Link
                key={`${a.slug}-vs-${b.slug}`}
                href={`/compare/${a.slug}-vs-${b.slug}`}
                className="p-4 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ToolLogo
                      name={a.name}
                      slug={a.slug}
                      size="sm"
                      website={a.website}
                    />
                    <span className="font-medium">{a.name}</span>
                  </div>
                  <span className="text-[#71717a] text-sm">vs</span>
                  <div className="flex items-center gap-2">
                    <ToolLogo
                      name={b.name}
                      slug={b.slug}
                      size="sm"
                      website={b.website}
                    />
                    <span className="font-medium">{b.name}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-[#71717a]">
                  <span>★ {a.rating}</span>
                  <span>{a.price}</span>
                  <span className="mx-2">·</span>
                  <span>★ {b.rating}</span>
                  <span>{b.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
