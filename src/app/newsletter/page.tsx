"use client";

import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      {!submitted ? (
        <>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
            ✉️
          </div>
          <h1 className="text-3xl font-bold mb-4">Stay in the loop</h1>
          <p className="text-[#71717a] mb-8 text-lg">
            Get weekly AI tool reviews, comparisons, and recommendations. 
            No spam, unsubscribe anytime.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder-[#71717a] focus:outline-none focus:border-[#3b82f6]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>

          <div className="text-left max-w-md mx-auto">
            <h2 className="font-semibold mb-4">What you&apos;ll get:</h2>
            <ul className="space-y-3 text-[#a1a1aa]">
              <li className="flex items-start gap-2">
                <span className="text-[#3b82f6]">✓</span>
                <span>Weekly roundups of the best new AI tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3b82f6]">✓</span>
                <span>In-depth reviews and comparisons</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3b82f6]">✓</span>
                <span>Exclusive deals and early access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3b82f6]">✓</span>
                <span>Tips and tutorials for getting the most out of AI tools</span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="py-12">
          <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
            ✓
          </div>
          <h1 className="text-3xl font-bold mb-4">You&apos;re in!</h1>
          <p className="text-[#71717a] text-lg">
            Thanks for subscribing. Check your inbox for a confirmation email.
          </p>
        </div>
      )}
    </div>
  );
}
