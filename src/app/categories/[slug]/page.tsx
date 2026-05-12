import { getCategories, getToolsByCategory } from "@/lib/tools";
import { CATEGORIES } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolLogo from "@/components/ToolLogo";
import AdUnit from "@/components/AdUnit";

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ slug: cat }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = CATEGORIES[slug] || slug;
  const tools = getToolsByCategory(slug);
  return {
    title: `Best ${categoryName} in 2026`,
    description: `Find the best ${categoryName.toLowerCase()} for your needs. Compare ${tools.length} tools with honest reviews and real pricing.`,
    openGraph: {
      title: `Best ${categoryName} - Toolio`,
      description: `Compare ${tools.length} ${categoryName.toLowerCase()} with honest reviews.`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tools = getToolsByCategory(slug);
  const categoryName = CATEGORIES[slug] || slug;

  if (tools.length === 0) notFound();

  const sortedTools = [...tools].sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#71717a] mb-8">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-white transition">Categories</Link>
        <span>/</span>
        <span className="text-white">{categoryName}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Best {categoryName} in 2026</h1>
        <p className="text-[#71717a]">
          {sortedTools.length} tools reviewed and ranked. Updated January 2026.
        </p>
      </div>

      {/* Top pick banner */}
      {sortedTools.length > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-[#3b82f6] mb-2">
            <span className="px-2 py-0.5 bg-[#3b82f6] text-white rounded text-xs font-bold">#1 Pick</span>
          </div>
          <Link href={`/tools/${sortedTools[0].slug}`} className="group">
            <h2 className="text-xl font-bold group-hover:text-[#3b82f6] transition-colors">
              {sortedTools[0].name}
            </h2>
            <p className="text-[#71717a] mt-1">{sortedTools[0].description}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm">★ {sortedTools[0].rating}</span>
              <span className="text-sm">{sortedTools[0].price}</span>
            </div>
          </Link>
        </div>
      )}

      {/* Tools list */}
      <div className="grid grid-cols-1 gap-4">
        {sortedTools.map((tool, i) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition-all flex items-start gap-4"
          >
            <div className="w-8 h-8 bg-[#27272a] rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
              {i + 1}
            </div>
            <ToolLogo name={tool.name} slug={tool.slug} size="md" website={tool.website} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="font-semibold text-lg">{tool.name}</h2>
                <span className="text-xs px-2 py-0.5 bg-[#3b82f6]/10 text-[#3b82f6] rounded">
                  ★ {tool.rating}
                </span>
                {i === 0 && (
                  <span className="text-xs px-2 py-0.5 bg-yellow-500/10 text-yellow-500 rounded font-medium">
                    Best Overall
                  </span>
                )}
                {i === 1 && (
                  <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-500 rounded font-medium">
                    Runner Up
                  </span>
                )}
              </div>
              <p className="text-[#71717a] mb-2">{tool.description}</p>
              <div className="flex items-center gap-4 text-sm text-[#71717a]">
                <span>{tool.price}</span>
                <span>{tool.company}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Ad: After tools list */}
      <div className="mt-8">
        <AdUnit slot="0000000009" format="leaderboard" className="w-full" />
      </div>

      {/* Related categories */}
      <div className="mt-12 pt-8 border-t border-[#27272a]">
        <h2 className="text-xl font-bold mb-4">Other Categories</h2>
        <div className="flex flex-wrap gap-3">
          {getCategories()
            .filter((c) => c !== slug)
            .slice(0, 6)
            .map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat}`}
                className="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm hover:border-[#3b82f6] transition"
              >
                {CATEGORIES[cat] || cat}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
