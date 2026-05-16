import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ProgrammaticPage = {
  slug: string;
  title: string;
  description: string;
  sourceSkill: string;
  opportunityType: string;
  searchIntent: string;
  priorityScore: number;
  status: string;
  content: string;
};

const programmaticDir = path.join(
  process.cwd(),
  "content",
  "programmatic",
  "skills"
);

function normalizeSlug(slug: string) {
  return slug.replace(/^\/+/, "");
}

export function getProgrammaticPages(): ProgrammaticPage[] {
  if (!fs.existsSync(programmaticDir)) {
    return [];
  }

  return fs
    .readdirSync(programmaticDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(programmaticDir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);

      return {
        slug: normalizeSlug(String(parsed.data.slug || "")),
        title: String(parsed.data.title || ""),
        description: String(parsed.data.description || ""),
        sourceSkill: String(parsed.data.sourceSkill || ""),
        opportunityType: String(parsed.data.opportunityType || ""),
        searchIntent: String(parsed.data.searchIntent || ""),
        priorityScore: Number(parsed.data.priorityScore || 0),
        status: String(parsed.data.status || "draft"),
        content: parsed.content,
      };
    })
    .filter((page) => page.slug && page.status !== "rejected");
}

export function getProgrammaticPageBySlug(
  slug: string
): ProgrammaticPage | undefined {
  const normalized = normalizeSlug(slug);

  return getProgrammaticPages().find(
    (page) => page.slug === normalized
  );
}