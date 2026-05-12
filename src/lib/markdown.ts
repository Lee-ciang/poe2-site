import fs from "node:fs";
import path from "node:path";

export type GuideType = "builds" | "bosses" | "skills";
export type ContentStatus = "draft" | "needs-review" | "verified" | "outdated";

export type GuideFrontmatter = {
  title: string;
  slug: string;
  type: GuideType;
  seoTitle?: string;
  seoDescription?: string;
  patchVersion?: string;
  lastUpdated?: string;
  relatedBuilds: string[];
  relatedBosses: string[];
  relatedSkills: string[];
  contentStatus?: ContentStatus;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type MarkdownGuide = {
  metadata: GuideFrontmatter;
  body: string;
  path: string;
  faqItems: FaqItem[];
};

const guideTypes = ["builds", "bosses", "skills"] as const;
const guidesDirectory = path.join(process.cwd(), "src", "content", "guides");

function parseArray(value: string | undefined) {
  if (!value) {
    return [];
  }

  const trimmed = value.trim();

  if (!trimmed || trimmed === "[]") {
    return [];
  }

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return [trimmed.replace(/^["']|["']$/g, "")];
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Markdown guide is missing frontmatter.");
  }

  const [, frontmatter, body] = match;
  const fields = new Map<string, string>();

  for (const line of frontmatter.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    fields.set(key, value.replace(/^["']|["']$/g, ""));
  }

  const type = fields.get("type");

  if (!guideTypes.includes(type as GuideType)) {
    throw new Error(`Invalid guide type: ${type ?? "missing"}`);
  }

  const metadata: GuideFrontmatter = {
    title: fields.get("title") ?? "",
    slug: fields.get("slug") ?? "",
    type: type as GuideType,
    seoTitle: fields.get("seoTitle"),
    seoDescription: fields.get("seoDescription"),
    patchVersion: fields.get("patchVersion"),
    lastUpdated: fields.get("lastUpdated"),
    relatedBuilds: parseArray(fields.get("relatedBuilds")),
    relatedBosses: parseArray(fields.get("relatedBosses")),
    relatedSkills: parseArray(fields.get("relatedSkills")),
    contentStatus: fields.get("contentStatus") as ContentStatus | undefined,
  };

  if (!metadata.title || !metadata.slug) {
    throw new Error("Markdown guide frontmatter requires title and slug.");
  }

  return {
    metadata,
    body: body.trim(),
  };
}

function extractFaqItems(body: string): FaqItem[] {
  const faqMatch = body.match(/## FAQ\s*([\s\S]*)$/i);

  if (!faqMatch) {
    return [];
  }

  const faqSection = faqMatch[1];
  const questionBlocks = faqSection.split(/\n### /).filter(Boolean);

  return questionBlocks
    .map((block) => {
      const normalizedBlock = block.replace(/^### /, "").trim();
      const [questionLine, ...answerLines] = normalizedBlock.split(/\r?\n/);
      const question = questionLine?.trim();
      const answer = answerLines.join("\n").trim();

      if (!question || !answer) {
        return null;
      }

      return {
        question,
        answer,
      };
    })
    .filter((item): item is FaqItem => Boolean(item));
}

export function getMarkdownGuide(type: GuideType, slug: string): MarkdownGuide | null {
  const filePath = path.join(guidesDirectory, type, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(source);

return {
  ...parsed,
  path: `/guides/${type}/${slug}`,
  faqItems: extractFaqItems(parsed.body),
};
}

export function getAllMarkdownGuides(): MarkdownGuide[] {
  return guideTypes.flatMap((type) => {
    const directory = path.join(guidesDirectory, type);

    if (!fs.existsSync(directory)) {
      return [];
    }

    return fs
      .readdirSync(directory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => getMarkdownGuide(type, file.replace(/\.md$/, "")))
      .filter((guide): guide is MarkdownGuide => Boolean(guide));
  });
}

export function getMarkdownGuideParams() {
  return getAllMarkdownGuides().map((guide) => ({
    type: guide.metadata.type,
    slug: guide.metadata.slug,
  }));
}
