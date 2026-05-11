export const metadata = {
  title: "Privacy Policy - AI Tools Directory",
  description: "Privacy Policy for AI Tools Directory.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-6 text-[#a1a1aa]">
        <p><em>Last updated: January 2026</em></p>

        <h2 className="text-xl font-bold text-white mt-8">Information We Collect</h2>
        <p>
          We collect information you provide directly, such as when you contact us.
          We also collect usage data automatically, including pages visited and time spent on our site.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">How We Use Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide and maintain our service</li>
          <li>Improve user experience</li>
          <li>Respond to your inquiries</li>
          <li>Analyze usage patterns</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our website.
          You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Third-Party Services</h2>
        <p>
          We may use third-party services such as Google Analytics and Google AdSense.
          These services have their own privacy policies governing how they use your information.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes
          by posting the new Privacy Policy on this page.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:privacy@example.com" className="text-[#3b82f6] hover:underline">
            privacy@example.com
          </a>
        </p>
      </div>
    </div>
  );
}
