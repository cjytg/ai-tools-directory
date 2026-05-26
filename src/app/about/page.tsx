import Link from "next/link";
import { getAllTools, getCategories } from "@/lib/tools";

export const metadata = {
  title: "About Toolio — Honest AI Tool Reviews",
  description: "Toolio is an independent AI tool directory. We test, review, and compare 170+ AI tools so you can make informed decisions without the marketing fluff.",
  alternates: {
    canonical: "https://toolio-ai.com/about",
  },
};

export default function AboutPage() {
  const tools = getAllTools();
  const categories = getCategories();
  const totalReviews = tools.length;
  const totalComparisons = categories.reduce((sum, cat) => {
    const catTools = tools.filter((t) => t.category === cat);
    return sum + (catTools.length * (catTools.length - 1)) / 2;
  }, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About Toolio</h1>

      <div className="space-y-8 text-[#a1a1aa]">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">What is Toolio?</h2>
          <p className="mb-4">
            Toolio is an independent directory of {tools.length}+ AI tools across {categories.length} categories. We test, review, and compare AI tools so you can make informed decisions without the marketing fluff.
          </p>
          <p>
            Every tool in our directory has been evaluated through hands-on testing. We don&apos;t accept payments for positive reviews, and our recommendations are based purely on merit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
              <div className="text-2xl font-bold text-white">{totalReviews}+</div>
              <div className="text-sm text-[#71717a]">Tools Reviewed</div>
            </div>
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
              <div className="text-2xl font-bold text-white">{categories.length}</div>
              <div className="text-sm text-[#71717a]">Categories</div>
            </div>
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
              <div className="text-2xl font-bold text-white">{totalComparisons}+</div>
              <div className="text-sm text-[#71717a]">Comparisons</div>
            </div>
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
              <div className="text-2xl font-bold text-white">Daily</div>
              <div className="text-sm text-[#71717a]">Updates</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Why We Built This</h2>
          <p className="mb-4">
            The AI tool landscape is overwhelming. Hundreds of new tools launch every month, each claiming to be the best. We got tired of the hype and decided to create a no-nonsense resource for people who just want honest answers.
          </p>
          <p>
            No affiliate-driven rankings. No &ldquo;top 10&rdquo; lists padded with sponsored placements. Just real reviews from real testing, updated as the market evolves.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">How We Review</h2>
          <p className="mb-4">Every tool goes through our evaluation process:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Hands-on testing:</strong> We use each tool on real projects to evaluate core capabilities</li>
            <li><strong className="text-white">Feature evaluation:</strong> We test key features and compare against direct alternatives in the same category</li>
            <li><strong className="text-white">Pricing analysis:</strong> We verify pricing tiers and evaluate value for money relative to competitors</li>
            <li><strong className="text-white">User experience:</strong> We assess onboarding, interface quality, and customer support responsiveness</li>
            <li><strong className="text-white">Regular updates:</strong> We revisit reviews as tools evolve — pricing changes, new features, and performance shifts all get reflected</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Our Standards</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Independence:</strong> We never accept payment for reviews or rankings</li>
            <li><strong className="text-white">Transparency:</strong> Affiliate links are clearly marked and don&apos;t influence our ratings</li>
            <li><strong className="text-white">Honesty:</strong> We share both strengths and limitations of every tool</li>
            <li><strong className="text-white">Accuracy:</strong> All pricing and feature claims are verified against official sources</li>
            <li><strong className="text-white">Freshness:</strong> Content is updated regularly to reflect market changes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="mb-4">
            Have a question, suggestion, or want to collaborate?
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
            >
              Contact Page
            </Link>
            <Link
              href="/submit"
              className="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
            >
              Submit a Tool
            </Link>
            <Link
              href="/advertise"
              className="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
            >
              Advertise with Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
