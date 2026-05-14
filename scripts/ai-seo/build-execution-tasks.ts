import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const roadmap = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "autonomous-seo-roadmap.json"), "utf8")
);

const serpOpportunities = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "serp-opportunity-model.json"), "utf8")
);

const pillarRecommendations = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "pillar-page-recommendations.json"), "utf8")
);

const refreshQueue = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "refresh-queue.json"), "utf8")
);

const executionTasks = [
  ...refreshQueue.slice(0, 5).map((item: any, index: number) => ({
    taskId: `refresh-${index + 1}`,
    type: "content_refresh",
    title: `Refresh ${item.title}`,
    target: item.slug,
    priority: item.refreshPriority <= 3 ? "high" : "medium",
    source: "refresh-queue",
    status: "todo",
    recommendedAction: item.recommendedAction,
    createdAt: new Date().toISOString(),
  })),

  ...serpOpportunities
    .filter((item: any) => item.opportunityTier === "quick_win")
    .slice(0, 5)
    .map((item: any, index: number) => ({
      taskId: `serp-quick-win-${index + 1}`,
      type: "quick_win_keyword",
      title: `Target quick-win keyword: ${item.keyword}`,
      target: item.sourceSlug,
      priority: "high",
      source: "serp-opportunity-model",
      status: "todo",
      recommendedAction: item.recommendedAction,
      createdAt: new Date().toISOString(),
    })),

  ...pillarRecommendations
    .filter((item: any) => item.priority === "high")
    .map((item: any, index: number) => ({
      taskId: `pillar-${index + 1}`,
      type: "pillar_page",
      title: `Create pillar page: ${item.recommendedPageTitle}`,
      target: item.recommendedSlug,
      priority: "high",
      source: "pillar-page-recommendations",
      status: "todo",
      recommendedAction: "Create pillar page and connect supporting guides.",
      createdAt: new Date().toISOString(),
    })),
];

const output = {
  generatedAt: new Date().toISOString(),
  sourceRoadmap: "data/ai-seo/autonomous-seo-roadmap.json",
  roadmapStatus: roadmap.status,
  taskCount: executionTasks.length,
  tasks: executionTasks,
};

const outputFile = path.join(DATA_DIR, "execution-tasks.json");

fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));

console.log("AI SEO Autonomous Execution Task Engine");
console.log(`Roadmap status: ${output.roadmapStatus}`);
console.log(`Execution tasks created: ${output.taskCount}`);
console.log(`Output: ${outputFile}`);