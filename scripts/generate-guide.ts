import fs from "node:fs";
import path from "node:path";
import {
  estimateTokenCount,
  generateOpenAIText,
  getOpenAIGenerationSettings,
} from "../lib/openai.ts";
import { createBossPrompt } from "../lib/prompts/boss-prompt.ts";
import { createBuildPrompt } from "../lib/prompts/build-prompt.ts";
import { createSkillPrompt } from "../lib/prompts/skill-prompt.ts";
import {
  type GuideInputType,
  createMarkdownGuideDraft,
  guideTypeConfig,
} from "../src/content/templates/markdown-guide-template.ts";
import { getSkillBySlug } from "../src/data/skills.ts";

const validTypes = Object.keys(guideTypeConfig) as GuideInputType[];

function printUsage() {
  console.log(
    'Usage: npm run generate-guide <build|boss|skill> <slug> "Guide Title" [--ai]',
  );
}

function isValidType(type: string): type is GuideInputType {
  return validTypes.includes(type as GuideInputType);
}

function isValidSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function createPrompt(type: GuideInputType, slug: string, title: string) {
  if (type === "build") {
    return createBuildPrompt({ title, slug });
  }

  if (type === "boss") {
    return createBossPrompt({ title, slug });
  }

  const skill = getSkillBySlug(slug);

  if (skill) {
    console.log(`Using structured skill data for: ${skill.name}`);
    return createSkillPrompt({ title, slug, skill });
  }

  console.warn("No structured skill data found for slug. Generating cautious draft.");
  return createSkillPrompt({ title, slug });
}

function sanitizeMarkdown(markdown: string) {
  return markdown
    .replace(/^```(?:markdown|md)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .replace(/^---[\s\S]*?---\s*/m, "")
    .trim();
}

const rawArgs = process.argv.slice(2);
const useAi = rawArgs.includes("--ai");
const [typeArg, slugArg, ...titleParts] = rawArgs.filter((arg) => arg !== "--ai");
const title = titleParts.join(" ").trim();

if (!typeArg || !slugArg || !title) {
  printUsage();
  process.exit(1);
}

if (!isValidType(typeArg)) {
  console.error(
    `Invalid guide type "${typeArg}". Expected one of: ${validTypes.join(", ")}.`,
  );
  process.exit(1);
}

if (!isValidSlug(slugArg)) {
  console.error(
    `Invalid slug "${slugArg}". Use lowercase letters, numbers, and hyphens only.`,
  );
  process.exit(1);
}

const folder = guideTypeConfig[typeArg].folder;
const targetDirectory = path.join(
  process.cwd(),
  "src",
  "content",
  "guides",
  folder,
);
const targetPath = path.join(targetDirectory, `${slugArg}.md`);

if (fs.existsSync(targetPath)) {
  console.error(`Guide already exists: ${targetPath}`);
  process.exit(1);
}

fs.mkdirSync(targetDirectory, { recursive: true });

let generatedBody: string | undefined;

if (useAi) {
  try {
    const prompt = createPrompt(typeArg, slugArg, title);
    const {
      model,
      maxPromptCharacters,
      estimatedOutputTokenLimit,
    } = getOpenAIGenerationSettings();

    if (prompt.length > maxPromptCharacters) {
      throw new Error(
        `Generated prompt is ${prompt.length} characters, which exceeds the safety limit of ${maxPromptCharacters}.`,
      );
    }

    console.log("Generating AI draft with OpenAI...");
    console.log(`Model: ${model}`);
    console.log(`Max output tokens: ~${estimatedOutputTokenLimit}`);
    console.log(`Estimated prompt tokens: ~${estimateTokenCount(prompt)}`);

    generatedBody = sanitizeMarkdown(
      await generateOpenAIText({
        prompt,
      }),
    );
  } catch (error) {
    console.error(
      error instanceof Error
        ? `OpenAI generation failed: ${error.message}`
        : "OpenAI generation failed.",
    );
    process.exit(1);
  }
}

const markdown = createMarkdownGuideDraft({
  type: typeArg,
  slug: slugArg,
  title,
  date: todayIsoDate(),
  body: generatedBody,
});

fs.writeFileSync(targetPath, markdown, "utf8");
console.log(`Created ${path.relative(process.cwd(), targetPath)}`);
