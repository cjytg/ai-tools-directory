export const metadata = {
  title: "AI Tools Blog - Guides, Reviews & Tutorials",
  description: "Learn about AI tools with our in-depth guides, reviews, and tutorials.",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-[#71717a] mb-8">Guides, reviews, and insights about AI tools.</p>

      <div className="space-y-6">
        {/* Placeholder for blog posts */}
        <div className="p-8 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
          <p className="text-[#71717a]">
            Blog content will be generated soon. Check back later for AI tool guides and reviews.
          </p>
        </div>
      </div>
    </div>
  );
}
