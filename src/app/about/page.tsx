export const metadata = {
  title: "About Us - AI Tools Directory",
  description: "Learn about AI Tools Directory and our mission to help you find the best AI tools.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About AI Tools Directory</h1>

      <div className="space-y-6 text-[#a1a1aa]">
        <p>
          AI Tools Directory is a curated collection of the best AI tools available today.
          We test, review, and compare AI tools to help you make informed decisions.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">Our Mission</h2>
        <p>
          With hundreds of AI tools launching every month, it&apos;s hard to know which ones are worth your time.
          We cut through the noise and provide honest, unbiased reviews based on real testing.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">How We Review</h2>
        <p>
          Every tool in our directory has been tested by our team. We evaluate based on:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Features and capabilities</li>
          <li>Ease of use</li>
          <li>Pricing and value</li>
          <li>Customer support</li>
          <li>Integration options</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8">Contact Us</h2>
        <p>
          Have a question or want to suggest a tool? Reach out at{" "}
          <a href="mailto:contact@example.com" className="text-[#3b82f6] hover:underline">
            contact@example.com
          </a>
        </p>
      </div>
    </div>
  );
}
