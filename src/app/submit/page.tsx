
export const metadata = {
  title: "Submit a Tool - Toolio",
  description: "Submit an AI tool for review and inclusion in our directory.",
  alternates: {
    canonical: "https://toolio-ai.com/submit",
  },
};

export default function SubmitPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Submit a Tool</h1>
      <p className="text-[#71717a] mb-8">Know a great AI tool? Let us know and we&apos;ll review it.</p>

      <div className="space-y-8">
        <section className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
          <h2 className="text-xl font-bold mb-4">Submission guidelines</h2>
          <ul className="space-y-3 text-[#a1a1aa]">
            <li className="flex items-start gap-2">
              <span className="text-[#3b82f6]">1.</span>
              <span>The tool must use AI or machine learning in a meaningful way</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3b82f6]">2.</span>
              <span>The tool must be publicly available (not in private beta)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3b82f6]">3.</span>
              <span>The tool must have a working website with clear pricing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3b82f6]">4.</span>
              <span>We do not guarantee inclusion or positive reviews</span>
            </li>
          </ul>
        </section>

        <section className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
          <h2 className="text-xl font-bold mb-4">What to include</h2>
          <ul className="space-y-2 text-[#a1a1aa]">
            <li>• Tool name and website URL</li>
            <li>• Brief description (1-2 sentences)</li>
            <li>• Key features (3-5 bullet points)</li>
            <li>• Pricing information</li>
            <li>• What makes it different from alternatives</li>
          </ul>
        </section>

        <section className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
          <h2 className="text-xl font-bold mb-4">Submit via email</h2>
          <p className="text-[#a1a1aa] mb-4">
            Send your submission to the email below. We typically respond within 5 business days.
          </p>
          <a
            href="mailto:submit@toolio.dev?subject=Tool Submission: [Tool Name]"
            className="inline-block px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg transition"
          >
            Submit Your Tool
          </a>
        </section>

        <section className="p-4 bg-[#18181b] border border-dashed border-[#27272a] rounded-xl">
          <p className="text-sm text-[#71717a] text-center">
            <strong>Note:</strong> We do not accept payment for reviews or guaranteed placements. 
            All submissions are evaluated on merit.
          </p>
        </section>
      </div>
    </div>
  );
}
