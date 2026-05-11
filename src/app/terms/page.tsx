export const metadata = {
  title: "Terms of Service - AI Tools Directory",
  description: "Terms of Service for AI Tools Directory.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="space-y-6 text-[#a1a1aa]">
        <p><em>Last updated: January 2026</em></p>

        <h2 className="text-xl font-bold text-white mt-8">Acceptance of Terms</h2>
        <p>
          By accessing and using AI Tools Directory, you accept and agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Use of Service</h2>
        <p>
          You may use our service for lawful purposes only. You agree not to use the service:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>In any way that violates applicable laws</li>
          <li>To transmit harmful or malicious content</li>
          <li>To attempt unauthorized access to our systems</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">Content</h2>
        <p>
          The content on AI Tools Directory is for informational purposes only.
          We strive for accuracy but make no warranties about the completeness or reliability of our content.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Affiliate Links</h2>
        <p>
          Some links on our site may be affiliate links. We may earn a commission if you make a purchase
          through these links, at no additional cost to you.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Limitation of Liability</h2>
        <p>
          AI Tools Directory shall not be liable for any indirect, incidental, special, consequential,
          or punitive damages resulting from your use of the service.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at{" "}
          <a href="mailto:legal@example.com" className="text-[#3b82f6] hover:underline">
            legal@example.com
          </a>
        </p>
      </div>
    </div>
  );
}
