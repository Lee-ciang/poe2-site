import fs from "node:fs";
import path from "node:path";

type UpgradeTask = {
  slug: string;
  title: string;
  category: string;
  priority: number;
  status: string;
  actions: string[];
  metrics: {
    seoScore: number;
    wordCount: number;
    faqCount: number;
    internalLinkCount: number;
    isOutdatedPatch: boolean;
  };
  createdAt: string;
};

const TASKS_FILE = path.join(process.cwd(), "data", "ai-seo", "upgrade-tasks.json");
const DRAFTS_DIR = path.join(process.cwd(), "data", "ai-seo", "drafts");

const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, "utf8")) as UpgradeTask[];

fs.mkdirSync(DRAFTS_DIR, { recursive: true });

const selectedTasks = tasks.slice(0, 5);

for (const task of selectedTasks) {
  const safeFileName = task.slug.replace(/^\/+/, "").replace(/\//g, "__");

  const draft = {
    slug: task.slug,
    title: task.title,
    category: task.category,
    priority: task.priority,
    status: "drafted",
    sourceActions: task.actions,
    generatedDraft: {
      faqSuggestions: task.actions.includes("add_faq")
        ? [
            {
              question: `Is ${task.title.replace(" Guide", "")} good for beginners in Path of Exile 2?`,
              answer: `${task.title.replace(" Guide", "")} can be beginner-friendly when paired with simple support gems, reliable defenses, and a clear leveling path. Players should focus on consistency before optimizing damage.`
            },
            {
              question: `What should I upgrade first for ${task.title.replace(" Guide", "")}?`,
              answer: `Start with upgrades that improve survivability, resource sustain, and core damage scaling. After that, improve gear affixes, support gem setup, and passive tree efficiency.`
            }
          ]
        : [],
      contentExpansionSuggestion: task.actions.includes("expand_content_depth")
        ? `Add a deeper gameplay section explaining leveling priorities, recommended support gem logic, defensive layers, common mistakes, and when the setup starts to feel powerful.`
        : "",
      patchUpdateNote: task.actions.includes("update_patch_info")
        ? `Review this guide against the latest Path of Exile 2 patch notes before publishing. Avoid claiming exact balance changes unless verified manually.`
        : "",
      internalLinkSuggestion: task.actions.includes("add_internal_links")
        ? `Add contextual links to related skill guides, build guides, boss guides, and beginner progression pages.`
        : ""
    },
    generatedAt: new Date().toISOString()
  };

  const outputFile = path.join(DRAFTS_DIR, `${safeFileName}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(draft, null, 2));
}

console.log("AI SEO Draft Writer");
console.log(`Tasks loaded: ${tasks.length}`);
console.log(`Drafts generated: ${selectedTasks.length}`);
console.log(`Output directory: ${DRAFTS_DIR}`);