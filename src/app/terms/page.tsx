
export const metadata = {
  title: "Terms of Service - Toolio",
  description: "Toolio's terms of service. Please read these terms before using our site.",
  alternates: {
    canonical: "https://toolio-ai.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-[#71717a] mb-8">Last updated: January 2026</p>

      <div className="space-y-8 text-[#a1a1aa]">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using Toolio (the &quot;Service&quot;), you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Use of Service</h2>
          <p className="mb-4">You agree to use the Service only for lawful purposes. You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use automated systems to scrape or collect data from the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Content</h2>
          <p className="mb-4">
            The content on Toolio is for informational purposes only. While we strive for accuracy, 
            we make no warranties about the completeness, reliability, or accuracy of our content.
          </p>
          <p>
            AI tools and their features, pricing, and availability change frequently. 
            We recommend verifying information directly with the tool provider before making decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Affiliate Disclosure</h2>
          <p>
            Some links on our Service are affiliate links. We may earn a commission if you make a purchase 
            through these links, at no additional cost to you. Affiliate relationships do not influence 
            our reviews or recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by Toolio 
            and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Limitation of Liability</h2>
          <p>
            In no event shall Toolio be liable for any indirect, incidental, special, consequential, 
            or punitive damages arising out of or related to your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes 
            by posting the new Terms of Service on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
          <p>
            If you have questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@toolio.dev" className="text-[#3b82f6] hover:underline">
              legal@toolio.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
