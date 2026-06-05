
export const metadata = {
  title: "Contact Us - Toolio",
  description: "Get in touch with the Toolio team.",
  alternates: {
    canonical: "https://toolio-ai.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-[#71717a] mb-8">Have a question or want to work with us? We&apos;d love to hear from you.</p>

      {/* Who we are */}
      <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl mb-8">
        <h2 className="font-bold text-white mb-3">Who Runs Toolio?</h2>
        <p className="text-sm text-[#a1a1aa] leading-relaxed">
          Toolio is an independently operated AI tool directory. We test and review AI tools 
          hands-on — no sponsored placements, no paid rankings. Our team includes developers, 
          content creators, and productivity enthusiasts who evaluate tools on real projects 
          before writing about them.
        </p>
        <p className="text-sm text-[#a1a1aa] leading-relaxed mt-3">
          Read our <a href="/methodology" className="text-[#3b82f6] hover:underline">full review methodology</a> to learn 
          how we test, score, and update our tool assessments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="mailto:hello@toolio.dev"
          className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition"
        >
          <h2 className="font-bold mb-2">General Inquiries</h2>
          <p className="text-sm text-[#71717a] mb-3">Questions, feedback, or just want to say hi</p>
          <span className="text-sm text-[#3b82f6]">hello@toolio.dev</span>
        </a>

        <a
          href="mailto:submit@toolio.dev"
          className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition"
        >
          <h2 className="font-bold mb-2">Submit a Tool</h2>
          <p className="text-sm text-[#71717a] mb-3">Know a great AI tool? Let us know</p>
          <span className="text-sm text-[#3b82f6]">submit@toolio.dev</span>
        </a>

        <a
          href="mailto:advertise@toolio.dev"
          className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition"
        >
          <h2 className="font-bold mb-2">Advertising</h2>
          <p className="text-sm text-[#71717a] mb-3">Reach AI enthusiasts and professionals</p>
          <span className="text-sm text-[#3b82f6]">advertise@toolio.dev</span>
        </a>

        <a
          href="mailto:press@toolio.dev"
          className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl hover:border-[#3b82f6] transition"
        >
          <h2 className="font-bold mb-2">Press & Media</h2>
          <p className="text-sm text-[#71717a] mb-3">Media inquiries and partnerships</p>
          <span className="text-sm text-[#3b82f6]">press@toolio.dev</span>
        </a>
      </div>

      <div className="mt-8 p-6 bg-[#18181b] border border-[#27272a] rounded-xl">
        <h2 className="font-bold mb-2">Response time</h2>
        <p className="text-[#71717a]">
          We typically respond within 24-48 hours during business days. 
          For urgent matters, please indicate so in your subject line.
        </p>
      </div>
    </div>
  );
}
