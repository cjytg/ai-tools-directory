import Link from "next/link";
import { getAllTools } from "@/lib/tools";

export default function NotFound() {
  const tools = getAllTools();
  const popularTools = tools.filter((t) => t.rating >= 4.5).slice(0, 4);

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        404
      </div>
      <h1 className="text-2xl font-bold mb-4">Page not found</h1>
      <p className="text-[#71717a] mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
        <Link
          href="/"
          className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Go Home
        </Link>
        <Link
          href="/tools"
          className="px-6 py-3 border border-[#27272a] rounded-lg font-medium hover:border-[#3b82f6] transition"
        >
          Browse Tools
        </Link>
        <Link
          href="/search"
          className="px-6 py-3 border border-[#27272a] rounded-lg font-medium hover:border-[#3b82f6] transition"
        >
          Search
        </Link>
      </div>

      <div className="text-left">
        <h2 className="text-lg font-semibold mb-4">Popular Tools</h2>
        <div className="grid grid-cols-2 gap-3">
          {popularTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="p-3 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition text-sm"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
