import { getAllTools, getCategories } from "@/lib/tools";
import { CATEGORIES } from "@/types";
import Link from "next/link";

export const metadata = {
  title: "All AI Tools - AI Tools Directory",
  description: "Browse our complete collection of AI tools for writing, coding, design, marketing, and more.",
};

export default function ToolsPage() {
  const tools = getAllTools();
  const categories = getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">All AI Tools</h1>
      <p className="text-[#71717a] mb-8">{tools.length} tools available</p>

      <div className="grid grid-cols-1 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-[#27272a] rounded-lg flex items-center justify-center text-xl flex-shrink-0">
              {tool.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="font-semibold text-lg">{tool.name}</h2>
                <span className="text-sm px-2 py-0.5 bg-[#27272a] rounded">
                  {CATEGORIES[tool.category] || tool.category}
                </span>
                <span className="text-sm text-[#3b82f6]">★ {tool.rating}</span>
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
    </div>
  );
}
