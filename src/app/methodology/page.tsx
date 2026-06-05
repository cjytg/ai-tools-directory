import Link from "next/link";

export const metadata = {
  title: "How We Review AI Tools - Toolio's Methodology",
  description: "Learn how Toolio evaluates and rates AI tools. Our testing process, scoring criteria, and editorial standards.",
  alternates: {
    canonical: "https://toolio-ai.com/methodology",
  },
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">How We Review AI Tools</h1>

      <div className="space-y-8 text-[#a1a1aa]">
        <section>
          <p className="text-lg leading-relaxed">
            Every tool in the Toolio directory goes through a structured evaluation process. 
            We don't just read the marketing page and assign a rating — we actually use each tool 
            on real projects before we review it. Here's how that works.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Our Testing Process</h2>
          <div className="space-y-4">
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg flex items-center justify-center font-bold text-sm">1</span>
                <h3 className="font-semibold text-white">Hands-On Testing</h3>
              </div>
              <p className="text-sm leading-relaxed">
                We use each tool for at least one week on real projects — not demo accounts or trial runs. 
                This means writing actual content, processing real data, and testing edge cases that 
                typical users will encounter.
              </p>
            </div>
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg flex items-center justify-center font-bold text-sm">2</span>
                <h3 className="font-semibold text-white">Feature Evaluation</h3>
              </div>
              <p className="text-sm leading-relaxed">
                We test every advertised feature and verify it works as described. If a tool claims 
                "AI-powered transcription," we test it with various audio sources — clear speech, 
                background noise, accents, and technical terminology.
              </p>
            </div>
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg flex items-center justify-center font-bold text-sm">3</span>
                <h3 className="font-semibold text-white">Competitive Comparison</h3>
              </div>
              <p className="text-sm leading-relaxed">
                We test each tool against its direct competitors using the same tasks and inputs. 
                This ensures our ratings are relative to the market, not absolute scores in isolation.
              </p>
            </div>
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg flex items-center justify-center font-bold text-sm">4</span>
                <h3 className="font-semibold text-white">Pricing Verification</h3>
              </div>
              <p className="text-sm leading-relaxed">
                We verify all pricing information against official sources and evaluate value for money 
                relative to competitors. We note when pricing has changed and whether the tool has 
                become more or less competitive over time.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">How We Score</h2>
          <p className="mb-4">Each tool receives a rating from 1.0 to 5.0 based on five weighted criteria:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#27272a]">
                  <th className="text-left py-3 px-4 text-[#71717a]">Criteria</th>
                  <th className="text-left py-3 px-4 text-[#71717a]">Weight</th>
                  <th className="text-left py-3 px-4 text-[#71717a]">What We Look At</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#27272a]">
                  <td className="py-3 px-4 font-medium text-white">Core Capability</td>
                  <td className="py-3 px-4">30%</td>
                  <td className="py-3 px-4">Does it do the main job well?</td>
                </tr>
                <tr className="border-b border-[#27272a]">
                  <td className="py-3 px-4 font-medium text-white">Ease of Use</td>
                  <td className="py-3 px-4">20%</td>
                  <td className="py-3 px-4">Onboarding, UI quality, learning curve</td>
                </tr>
                <tr className="border-b border-[#27272a]">
                  <td className="py-3 px-4 font-medium text-white">Value for Money</td>
                  <td className="py-3 px-4">20%</td>
                  <td className="py-3 px-4">Pricing relative to quality and competitors</td>
                </tr>
                <tr className="border-b border-[#27272a]">
                  <td className="py-3 px-4 font-medium text-white">Reliability</td>
                  <td className="py-3 px-4">15%</td>
                  <td className="py-3 px-4">Uptime, output consistency, error handling</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Innovation</td>
                  <td className="py-3 px-4">15%</td>
                  <td className="py-3 px-4">Unique features, competitive differentiation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Editorial Independence</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We never accept payment for reviews or ratings</li>
            <li>Tool companies cannot preview or approve reviews before publication</li>
            <li>Affiliate links are clearly marked and do not influence our scores</li>
            <li>We disclose when a review is based on a trial provided by the company</li>
            <li>Rating changes are documented with reasoning when updated</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Review Updates</h2>
          <p className="mb-4">
            AI tools evolve rapidly. We revisit every review at least quarterly to verify:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pricing changes and new plan tiers</li>
            <li>New features and capability improvements</li>
            <li>Competitive landscape shifts (new entrants, competitor updates)</li>
            <li>Performance changes and known issues</li>
          </ul>
          <p className="mt-4">
            Each tool page shows a "Last updated" date so you know how current our assessment is.
          </p>
        </section>

        <section className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
          <h2 className="text-lg font-bold text-white mb-3">Questions About Our Process?</h2>
          <p className="text-sm mb-4">
            If you have questions about how we evaluate tools, or if you'd like to submit a tool 
            for review, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-[#2563eb] transition"
            >
              Contact Us
            </Link>
            <Link
              href="/submit"
              className="px-4 py-2 border border-[#27272a] rounded-lg text-sm hover:border-[#3b82f6] transition"
            >
              Submit a Tool
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
