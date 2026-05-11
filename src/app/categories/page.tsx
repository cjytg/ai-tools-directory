import { getCategories, getToolsByCategory, getAllTools } from "@/lib/tools";
import { CATEGORIES } from "@/types";
import Link from "next/link";

export const metadata = {
  title: "AI Tool Categories - AI Tools Directory",
  description: "Browse AI tools by category: chatbots, image generators, coding assistants, and more.",
};

export default function CategoriesPage() {
  const categories = getCategories();
  const allTools = getAllTools();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">AI Tool Categories</h1>
      <p className="text-[#71717a] mb-8">{categories.length} categories available</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const tools = getToolsByCategory(cat);
          return (
            <Link
              key={cat}
              href={`/categories/${cat}`}
              className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition"
            >
              <div className="text-3xl mb-4">
                {cat === "chatbot" && "💬"}
                {cat === "image" && "🎨"}
                {cat === "coding" && "💻"}
                {cat === "writing" && "✍️"}
                {cat === "video" && "🎬"}
                {cat === "audio" && "🎵"}
                {cat === "design" && "🎨"}
                {cat === "productivity" && "⚡"}
                {cat === "marketing" && "📈"}
                {cat === "search" && "🔍"}
                {cat === "translation" && "🌐"}
              </div>
              <h2 className="text-xl font-bold mb-2">{CATEGORIES[cat] || cat}</h2>
              <p className="text-[#71717a] mb-4">{tools.length} tools</p>
              <div className="flex flex-wrap gap-2">
                {tools.slice(0, 3).map((tool) => (
                  <span key={tool.slug} className="text-xs px-2 py-1 bg-[#27272a] rounded">
                    {tool.name}
                  </span>
                ))}
                {tools.length > 3 && (
                  <span className="text-xs px-2 py-1 text-[#71717a]">
                    +{tools.length - 3} more
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
