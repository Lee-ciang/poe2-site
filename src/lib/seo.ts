import type { Metadata } from "next";

export const siteConfig = {
  name: "POE2 Forge",
  url: "https://poe2forge.example.com",
  description:
    "Path of Exile 2 builds, boss guides, skill explanations, leveling guides, and endgame tools for POE2 players.",
  twitterHandle: "@poe2forge",
  ogImage: "/og-image.png",
};

export const defaultKeywords = [
  "Path of Exile 2",
  "POE2",
  "POE2 builds",
  "POE2 boss guides",
  "POE2 skills",
  "Path of Exile 2 guides",
  "POE2 tools",
  "Path of Exile 2 endgame",
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

type SeoMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function createSeoMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: SeoMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} Path of Exile 2 guides`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      images: [siteConfig.ogImage],
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

type GuideJsonLdOptions = {
  title: string;
  description: string;
  path: string;
  section: string;
  keywords?: string[];
};

export function createGuideJsonLd({
  title,
  description,
  path,
  section,
  keywords = [],
}: GuideJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    articleSection: section,
    keywords: keywords.join(", "),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
  };
}

export function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
