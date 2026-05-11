export const metadata = {
  title: "Contact Us - AI Tools Directory",
  description: "Get in touch with AI Tools Directory team.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="space-y-6 text-[#a1a1aa]">
        <p>
          Have a question, suggestion, or want to work with us? We&apos;d love to hear from you.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Email</h2>
        <p>
          General inquiries:{" "}
          <a href="mailto:contact@example.com" className="text-[#3b82f6] hover:underline">
            contact@example.com
          </a>
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Submit a Tool</h2>
        <p>
          Want to suggest an AI tool for our directory? Send us an email with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Tool name and website</li>
          <li>Brief description</li>
          <li>Key features</li>
          <li>Pricing information</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">Partnerships</h2>
        <p>
          Interested in partnering with us? We offer sponsored listings, reviews, and advertising opportunities.
          Contact us for rates and availability.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Response Time</h2>
        <p>
          We typically respond within 24-48 hours during business days.
        </p>
      </div>
    </div>
  );
}
