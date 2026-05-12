import { getAllTools, getToolBySlug, getAlternatives } from "@/lib/tools";
import { toolSchema } from "@/lib/schema";
import { CATEGORIES } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolLogo from "@/components/ToolLogo";
import AdUnit from "@/components/AdUnit";
import AffiliateLink from "@/components/AffiliateLink";

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };
  
  const altNames = tool.alternatives
    .map((alt) => {
      const t = getAllTools().find((t) => t.slug === alt);
      return t?.name;
    })
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  return {
    title: `${tool.name} Review 2026 - Features, Pricing & Alternatives`,
    description: `${tool.name} review: ${tool.description} Rating: ${tool.rating}/5. Price: ${tool.price}. Alternatives: ${altNames}.`,
    openGraph: {
      title: `${tool.name} Review - Toolio`,
      description: tool.description,
      type: "article",
    },
    twitter: {
      card: "summary",
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
  const schema = toolSchema(tool);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#71717a] mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-white transition">Tools</Link>
          <span>/</span>
          <Link href={`/categories/${tool.category}`} className="hover:text-white transition">
            {CATEGORIES[tool.category] || tool.category}
          </Link>
          <span>/</span>
          <span className="text-white">{tool.name}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <ToolLogo name={tool.name} slug={tool.slug} size="lg" website={tool.website} />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
            <p className="text-[#71717a] mb-4">{tool.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-[#18181b] border border-[#27272a] rounded-lg text-sm">
                {tool.price}
              </span>
              <span className="px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg text-sm font-medium">
                ★ {tool.rating}/5
              </span>
              <span className="px-3 py-1 bg-[#27272a] rounded-lg text-sm capitalize">
                {tool.pricing}
              </span>
              <AffiliateLink
                href={tool.website}
                affiliateUrl={tool.affiliate_url}
                className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-[#2563eb] transition"
              >
                Visit {tool.name} →
              </AffiliateLink>
            </div>
          </div>
        </div>

        {/* Ad: below hero section */}
        <AdUnit slot="0000000001" format="leaderboard" className="mb-8 w-full" />

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <section>
              <h2 className="text-xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-[#18181b] rounded-lg">
                    <span className="text-[#3b82f6] mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Pros & Cons */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
                <h2 className="text-lg font-bold mb-4 text-green-400">Pros</h2>
                <ul className="space-y-2">
                  {tool.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-400">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
                <h2 className="text-lg font-bold mb-4 text-red-400">Cons</h2>
                <ul className="space-y-2">
                  {tool.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-red-400">✗</span>
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
                  <Link
                    key={i}
                    href={`/blog/best-${tool.category}-tools`}
                    className="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-full text-sm hover:border-[#3b82f6] transition"
                  >
                    {useCase}
                  </Link>
                ))}
              </div>
            </section>

            {/* Target Users */}
            <section>
              <h2 className="text-xl font-bold mb-4">Who Should Use {tool.name}?</h2>
              <div className="flex flex-wrap gap-2">
                {tool.target_users.map((user, i) => (
                  <span key={i} className="px-4 py-2 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-sm">
                    {user}
                  </span>
                ))}
              </div>
            </section>

            {/* Review link */}
            <section className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
              <h2 className="text-lg font-bold mb-2">Full Review</h2>
              <p className="text-sm text-[#71717a] mb-4">
                Want a detailed review? Read our in-depth analysis of {tool.name}.
              </p>
              <Link
                href={`/blog/${tool.slug}-review`}
                className="text-[#3b82f6] hover:underline text-sm font-medium"
              >
                Read {tool.name} Review →
              </Link>
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
                  <dd>
                    <Link href={`/categories/${tool.category}`} className="hover:text-[#3b82f6]">
                      {CATEGORIES[tool.category] || tool.category}
                    </Link>
                  </dd>
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
                <div className="flex justify-between">
                  <dt className="text-[#71717a]">Rating</dt>
                  <dd className="text-[#3b82f6] font-medium">★ {tool.rating}/5</dd>
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
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{alt.name}</div>
                        <div className="text-sm text-[#3b82f6]">★ {alt.rating}</div>
                      </div>
                      <div className="text-sm text-[#71717a]">{alt.price}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Ad: sidebar */}
            <AdUnit slot="0000000002" format="rectangle" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
