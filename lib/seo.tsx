import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateProductMetadata(product: {
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  avg_rating?: number;
  review_count?: number;
}): Metadata {
  return {
    title: `${product.name} | GLASSSKIN`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 200),
      url: `${siteUrl}/product/${product.slug}`,
      siteName: "GLASSSKIN",
      images: [{ url: product.image, width: 1200, height: 630, alt: product.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description.slice(0, 200),
      images: [product.image],
    },
  };
}

export function ProductJsonLd(product: {
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  avg_rating?: number;
  review_count?: number;
  brand?: string;
  category?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    url: `${siteUrl}/product/${product.slug}`,
    brand: { "@type": "Brand", name: product.brand ?? "GLASSSKIN" },
    ...(product.category ? { category: product.category } : {}),
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/product/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price / 100,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "GLASSSKIN" },
    },
    ...(product.avg_rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.avg_rating,
            reviewCount: product.review_count ?? 0,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GLASSSKIN",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-11-4567-8900",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://instagram.com/glassskin",
      "https://tiktok.com/@glassskin",
      "https://pinterest.com/glassskin",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GLASSSKIN",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/shop?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
