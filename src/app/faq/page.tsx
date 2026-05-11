import Link from "next/link";

export const metadata = {
  title: "Frequently Asked Questions - AI Tools Directory",
  description: "Common questions about AI tools, our reviews, and how to choose the right tool.",
};

const faqs = [
  {
    question: "What is AI Tools Directory?",
    answer: "AI Tools Directory is a curated collection of AI tools with honest reviews, real pricing, and side-by-side comparisons. We test each tool and provide unbiased recommendations."
  },
  {
    question: "How do you review AI tools?",
    answer: "We test each tool for at least a week on real projects. We evaluate ease of use, value for money, reliability, and customer support. Our reviews are based on actual usage, not affiliate commissions."
  },
  {
    question: "Are your reviews sponsored?",
    answer: "No. Our reviews are independent and unbiased. We may include affiliate links, but this never influences our recommendations. We always disclose when a link is an affiliate link."
  },
  {
    question: "How often do you update reviews?",
    answer: "We review and update our content regularly. AI tools change quickly, so we make sure our information stays current. Each review has a 'Last updated' date at the bottom."
  },
  {
    question: "Can I submit an AI tool for review?",
    answer: "Yes! If you have an AI tool you'd like us to review, please contact us at contact@example.com with the tool name, website, and a brief description."
  },
  {
    question: "What's the best AI chatbot?",
    answer: "It depends on your needs. ChatGPT is the most versatile, Claude is best for long documents, and Gemini offers good real-time information. Check our AI chatbot comparison for details."
  },
  {
    question: "What's the best AI image generator?",
    answer: "Midjourney produces the highest quality images, DALL-E 3 is easiest to use, and Stable Diffusion is free and open source. See our image generator comparison for more."
  },
  {
    question: "What's the best AI coding assistant?",
    answer: "GitHub Copilot is the most mature, Cursor offers the deepest AI integration, and Codeium is the best free option. Check our coding tools comparison."
  },
  {
    question: "Are AI tools worth paying for?",
    answer: "It depends on your use case. Many tools offer free tiers that are sufficient for casual use. If you're using an AI tool professionally, the paid features often justify the cost through time savings."
  },
  {
    question: "How do I choose between similar AI tools?",
    answer: "Consider your budget, specific use case, and existing tools. We recommend trying the free tier of 2-3 options before committing. Our comparison pages can help you decide."
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-[#71717a] mb-8">Common questions about AI tools and our reviews.</p>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
            <h2 className="font-bold mb-3">{faq.question}</h2>
            <p className="text-[#a1a1aa]">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
        <h2 className="font-bold mb-2">Still have questions?</h2>
        <p className="text-[#71717a] mb-4">
          Can&apos;t find what you&apos;re looking for? Feel free to reach out.
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-2 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
