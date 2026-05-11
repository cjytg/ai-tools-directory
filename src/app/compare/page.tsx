import { getAllTools } from "@/lib/tools";
import Link from "next/link";

export const metadata = {
  title: "Compare AI Tools - AI Tools Directory",
  description: "Compare AI tools side by side. See features, pricing, and ratings at a glance.",
};

export default function ComparePage() {
  const tools = getAllTools();
  
  // Group comparisons by category
  const categories = [...new Set(tools.map(t => t.category))];
  const comparisons: { category: string; pairs: { a: typeof tools[0]; b: typeof tools[0] }[] }[] = [];
  
  for (const cat of categories) {
    const catTools = tools.filter(t => t.category === cat);
    const pairs = [];
    for (let i = 0; i < catTools.length; i++) {
      for (let j = i + 1; j < catTools.length; j++) {
        pairs.push({ a: catTools[i], b: catTools[j] });
      }
    }
    if (pairs.length > 0) {
      comparisons.push({ category: cat, pairs });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Compare AI Tools</h1>
      <p className="text-[#71717a] mb-8">Side-by-side comparisons to help you choose the right tool.</p>

      {comparisons.map(({ category, pairs }) => (
        <section key={category} className="mb-12">
          <h2 className="text-xl font-bold mb-4 capitalize">{category} Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pairs.slice(0, 6).map(({ a, b }) => (
              <Link
                key={`${a.slug}-vs-${b.slug}`}
                href={`/compare/${a.slug}-vs-${b.slug}`}
                className="p-4 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#27272a] rounded flex items-center justify-center text-sm font-bold">
                      {a.name.charAt(0)}
                    </span>
                    <span className="font-medium">{a.name}</span>
                  </div>
                  <span className="text-[#71717a]">vs</span>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#27272a] rounded flex items-center justify-center text-sm font-bold">
                      {b.name.charAt(0)}
                    </span>
                    <span className="font-medium">{b.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
