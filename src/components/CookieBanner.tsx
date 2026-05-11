"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#18181b] border-t border-[#27272a]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#a1a1aa] text-center sm:text-left">
          We use cookies to improve your experience and serve relevant ads. 
          By continuing to use our site, you agree to our{" "}
          <a href="/privacy" className="text-[#3b82f6] hover:underline">Privacy Policy</a>.
        </p>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm border border-[#27272a] rounded-lg hover:border-[#3b82f6] transition"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
