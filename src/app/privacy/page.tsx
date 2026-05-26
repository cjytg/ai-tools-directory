
export const metadata = {
  title: "Privacy Policy - Toolio",
  description: "Toolio's privacy policy. How we collect, use, and protect your data.",
  alternates: {
    canonical: "https://toolio-ai.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-[#71717a] mb-8">Last updated: January 2026</p>

      <div className="space-y-8 text-[#a1a1aa]">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Introduction</h2>
          <p>
            Toolio (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and share information when you use our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Information We Collect</h2>
          <h3 className="text-lg font-semibold text-white mb-2">Information you provide</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Email address (when you subscribe to our newsletter)</li>
            <li>Contact information (when you reach out to us)</li>
            <li>Tool submissions (when you submit a tool for review)</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-white mb-2">Information collected automatically</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pages visited and time spent on our site</li>
            <li>Browser type and device information</li>
            <li>IP address and approximate location</li>
            <li>Referring website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">How We Use Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our service</li>
            <li>To improve user experience</li>
            <li>To send newsletters (with your consent)</li>
            <li>To respond to your inquiries</li>
            <li>To analyze usage patterns and improve our content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Cookies and Tracking</h2>
          <p className="mb-4">
            We use cookies and similar technologies to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Remember your preferences</li>
            <li>Analyze site traffic (Google Analytics)</li>
            <li>Serve relevant advertisements (Google AdSense)</li>
          </ul>
          <p className="mt-4">
            You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Third-Party Services</h2>
          <p className="mb-4">We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Google Analytics:</strong> Website analytics</li>
            <li><strong className="text-white">Google AdSense:</strong> Advertising</li>
            <li><strong className="text-white">Vercel:</strong> Website hosting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Affiliate Links</h2>
          <p>
            Some links on our site are affiliate links. If you click on an affiliate link and make a purchase, 
            we may receive a commission at no additional cost to you. This does not influence our reviews or recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. 
            However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Your Rights</h2>
          <p className="mb-4">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@toolio.dev" className="text-[#3b82f6] hover:underline">
              privacy@toolio.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
