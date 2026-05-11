import Link from "next/link";

interface RelatedLinksProps {
  category: string;
  currentSlug: string;
  tools: { slug: string; name: string }[];
}

export default function RelatedLinks({ category, currentSlug, tools }: RelatedLinksProps) {
  return (
    <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
      <h3 className="font-bold mb-4">Related</h3>
      <div className="space-y-3">
        <Link
          href={`/categories/${category}`}
          className="block text-sm text-[#3b82f6] hover:underline"
        >
          Browse all {category} tools →
        </Link>
        <Link
          href={`/blog/best-${category}-tools`}
          className="block text-sm text-[#3b82f6] hover:underline"
        >
          Best {category} tools guide →
        </Link>
        {tools.filter(t => t.slug !== currentSlug).slice(0, 3).map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block text-sm text-[#71717a] hover:text-white transition"
          >
            {tool.name} review →
          </Link>
        ))}
      </div>
    </div>
  );
}
