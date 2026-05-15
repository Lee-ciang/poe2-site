type InternalLinkItem = {
  title: string;
  href: string;
  keywords: string[];
};

const internalLinks: InternalLinkItem[] = [
  {
    title: "Lightning Arrow Build Guide",
    href: "/guides/builds/lightning-ranger",
    keywords: ["lightning arrow", "lightning ranger", "bow build"],
  },
  {
    title: "Lightning Skills",
    href: "/skills/category/lightning",
    keywords: ["lightning skill", "lightning damage", "lightning build"],
  },
  {
    title: "Boss Guides",
    href: "/bosses",
    keywords: ["boss", "boss guide", "boss mechanic"],
  },
  {
    title: "Build Guides",
    href: "/builds",
    keywords: ["build", "best build", "starter build"],
  },
];

export function getRelevantInternalLinks(content: string) {
  const normalizedContent = content.toLowerCase();

  return internalLinks.filter((link) =>
    link.keywords.some((keyword) =>
      normalizedContent.includes(keyword.toLowerCase())
    )
  );
}