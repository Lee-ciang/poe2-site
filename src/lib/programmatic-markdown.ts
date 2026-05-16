import { getProgrammaticPages } from "./programmatic-content";

export type ProgrammaticGuide = {
  path: string;
  slug: string;
  type: string;
  metadata: {
    title: string;
    seoTitle: string;
    seoDescription: string;
    type: string;
    patchVersion?: string;
    lastUpdated?: string;
    relatedBuilds: string[];
    relatedBosses: string[];
    relatedSkills: string[];
  };
  body: string;
  faqItems: {
    question: string;
    answer: string;
  }[];
  suggestedGuidePaths: string[];
  metrics: {
    readingTimeMinutes: number;
    qualityScore: number;
    isStale: boolean;
    isOutdatedPatch: boolean;
  };
};

export function getAllProgrammaticGuides(): ProgrammaticGuide[] {
  return getProgrammaticPages().map((page) => ({
    path: `/${page.slug}`,
    slug: page.slug.replace(/^guides\/skills\//, ""),
    type: "skills",
    metadata: {
      title: page.title,
      seoTitle: page.title,
      seoDescription: page.description,
      type: "skills",
      relatedBuilds: [],
      relatedBosses: [],
      relatedSkills: [page.sourceSkill],
    },
    body: page.content,
    faqItems: [
      {
        question: `Is ${page.title} viable in Path of Exile 2?`,
        answer:
          "This page is part of the programmatic SEO content system and should be reviewed with updated gameplay information.",
      },
    ],
    suggestedGuidePaths: [`/guides/skills/${page.sourceSkill}`],
    metrics: {
      readingTimeMinutes: 4,
      qualityScore: Math.max(60, page.priorityScore),
      isStale: false,
      isOutdatedPatch: false,
    },
  }));
}

export function getProgrammaticGuideBySlug(
  type: string,
  slug: string
): ProgrammaticGuide | undefined {
  return getAllProgrammaticGuides().find(
    (guide) =>
      guide.type === type &&
      guide.slug === slug
  );
}