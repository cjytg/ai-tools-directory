import { getAllTools, getToolBySlug, getAlternatives } from "@/lib/tools";
import { CATEGORIES } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };
  return {
    title: `${tool.name} Review - AI Tools Directory`,
    description: `${tool.name} review: ${tool.description} Compare features, pricing, and alternatives.`,
    openGraph: {
      title: `${tool.name} Review`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const alternatives = getAlternatives(slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#71717a] mb-8">
        <Link href="/tools" className="hover:text-white transition">Tools</Link>
        <span>/</span>
        <Link href={`/categories/${tool.category}`} className="hover:text-white transition">
          {CATEGORIES[tool.category] || tool.category}
        </Link>
        <span>/</span>
        <span>{tool.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="w-16 h-16 bg-[#18181b] border border-[#27272a] rounded-xl flex items-center justify-center text-2xl">
          {tool.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
          <p className="text-[#71717a] mb-4">{tool.description}</p>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-[#18181b] border border-[#27272a] rounded-lg text-sm">
              {tool.price}
            </span>
            <span className="text-[#3b82f6]">★ {tool.rating}/5</span>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg text-sm transition"
            >
              Visit Website →
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Features */}
          <section>
            <h2 className="text-xl font-bold mb-4">Key Features</h2>
            <ul className="space-y-2">
              {tool.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#3b82f6] mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Pros & Cons */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-4 text-green-400">Pros</h2>
              <ul className="space-y-2">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 text-red-400">Cons</h2>
              <ul className="space-y-2">
                {tool.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-xl font-bold mb-4">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {tool.use_cases.map((useCase, i) => (
                <span key={i} className="px-3 py-1 bg-[#18181b] border border-[#27272a] rounded-full text-sm">
                  {useCase}
                </span>
              ))}
            </div>
          </section>

          {/* Target Users */}
          <section>
            <h2 className="text-xl font-bold mb-4">Who Should Use {tool.name}?</h2>
            <div className="flex flex-wrap gap-2">
              {tool.target_users.map((user, i) => (
                <span key={i} className="px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-sm">
                  {user}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
            <h3 className="font-bold mb-4">Quick Info</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-[#71717a]">Category</dt>
                <dd>{CATEGORIES[tool.category] || tool.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#71717a]">Pricing</dt>
                <dd className="capitalize">{tool.pricing}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#71717a]">Price</dt>
                <dd>{tool.price}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#71717a]">Company</dt>
                <dd>{tool.company}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#71717a]">Founded</dt>
                <dd>{tool.founded}</dd>
              </div>
            </dl>
          </div>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
              <h3 className="font-bold mb-4">Alternatives</h3>
              <div className="space-y-3">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.slug}
                    href={`/tools/${alt.slug}`}
                    className="block p-3 bg-[#09090b] rounded-lg hover:border-[#3b82f6] border border-transparent transition"
                  >
                    <div className="font-medium">{alt.name}</div>
                    <div className="text-sm text-[#71717a]">{alt.price}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
