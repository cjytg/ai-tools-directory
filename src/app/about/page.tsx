import Link from "next/link";
import { getAllTools } from "@/lib/tools";

export const metadata = {
  title: "About Toolio",
  description: "Learn about Toolio and our mission to help you find the best AI tools.",
};

export default function AboutPage() {
  const tools = getAllTools();
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About Toolio</h1>

      <div className="space-y-8 text-[#a1a1aa]">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">What is Toolio?</h2>
          <p className="mb-4">
            Toolio is a curated directory of {tools.length}+ AI tools. We test, review, and compare AI tools 
            so you can make informed decisions without the marketing fluff.
          </p>
          <p>
            Every tool in our directory has been tested by our team. We don&apos;t accept payments for positive reviews, 
            and our recommendations are based purely on merit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Why we built this</h2>
          <p className="mb-4">
            The AI tool landscape is overwhelming. Hundreds of new tools launch every month, 
            each claiming to be the best. We got tired of the hype and decided to create a 
            no-nonsense resource for people who just want honest answers.
          </p>
          <p>
            No affiliate-driven rankings. No &ldquo;top 10&rdquo; lists padded with sponsored placements. 
            Just real reviews from real testing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">How we review</h2>
          <p className="mb-4">Every tool goes through our testing process:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Hands-on testing:</strong> We use each tool for at least a week on real projects</li>
            <li><strong className="text-white">Feature evaluation:</strong> We test core features and compare against alternatives</li>
            <li><strong className="text-white">Pricing analysis:</strong> We verify pricing and evaluate value for money</li>
            <li><strong className="text-white">User experience:</strong> We assess ease of use, onboarding, and support</li>
            <li><strong className="text-white">Regular updates:</strong> We revisit and update reviews as tools evolve</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Our standards</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Independence: We never accept payment for reviews</li>
            <li>Transparency: We clearly disclose affiliate links</li>
            <li>Honesty: We share both pros and cons of every tool</li>
            <li>Accuracy: We verify all pricing and feature claims</li>
            <li>Freshness: We regularly update our content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Contact us</h2>
          <p className="mb-4">
            Have a question, suggestion, or want to work with us?
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
