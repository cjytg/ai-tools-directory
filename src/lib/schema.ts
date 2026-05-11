interface Organization {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  logo: string;
}

interface Tool {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  offers?: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: number;
    bestRating: number;
    ratingCount: number;
  };
}

interface Article {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  author: {
    "@type": string;
    name: string;
  };
  datePublished: string;
  publisher: {
    "@type": string;
    name: string;
    logo: string;
  };
}

export function organizationSchema(): Organization {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Toolio",
    url: "https://toolio.dev",
    description: "Find the best AI tools for your needs.",
    logo: "https://toolio.dev/logo.png",
  };
}

export function toolSchema(tool: {
  name: string;
  description: string;
  website: string;
  price: string;
  rating: number;
}): Tool {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: tool.website,
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: tool.price.includes("Free") ? "0" : tool.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      bestRating: 5,
      ratingCount: 100,
    },
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  date: string;
}): Article {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: "Toolio",
    },
    datePublished: article.date,
    publisher: {
      "@type": "Organization",
      name: "Toolio",
      logo: "https://toolio.dev/logo.png",
    },
  };
}
