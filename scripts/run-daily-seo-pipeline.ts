import { execFileSync } from "child_process";
import path from "path";

type PipelineStep = {
  name: string;
  command: string;
  args: string[];
  required: boolean;
};

const tsxBin = path.join(
  process.cwd(),
  "node_modules",
  "tsx",
  "dist",
  "cli.mjs"
);

const nodeCommand = process.execPath;

const steps: PipelineStep[] = [
  {
    name: "Import Search Console data",
    command: nodeCommand,
    args: [tsxBin, "scripts/import-search-console-data.ts"],
    required: true,
  },
  {
    name: "Generate Search feedback actions",
    command: nodeCommand,
    args: [tsxBin, "scripts/generate-search-feedback-actions.ts"],
    required: true,
  },
  {
    name: "Generate refresh priority queue",
    command: nodeCommand,
    args: [tsxBin, "scripts/generate-refresh-priority-queue.ts"],
    required: true,
  },
  {
    name: "Generate internal link opportunities",
    command: nodeCommand,
    args: [tsxBin, "scripts/generate-internal-link-opportunities.ts"],
    required: false,
  },
  {
    name: "Generate topic cluster expansion",
    command: nodeCommand,
    args: [tsxBin, "scripts/generate-topic-cluster-expansion.ts"],
    required: false,
  },
  {
  name: "Archive daily SEO snapshot",
  command: nodeCommand,
  args: [tsxBin, "scripts/archive-daily-seo-snapshot.ts"],
  required: true,
},
{
  name: "Generate SEO delta report",
  command: nodeCommand,
  args: [tsxBin, "scripts/generate-seo-delta-report.ts"],
  required: false,
},
{
  name: "Generate SEO priority scoreboard",
  command: nodeCommand,
  args: [tsxBin, "scripts/generate-seo-priority-scoreboard.ts"],
  required: true,
},
{
  name: "Generate SEO sitemap report",
  command: nodeCommand,
  args: [tsxBin, "scripts/generate-seo-sitemap-report.ts"],
  required: true,
},
];

function runStep(step: PipelineStep) {
  console.log("");
  console.log(`▶ ${step.name}`);

  try {
    execFileSync(step.command, step.args, {
      stdio: "inherit",
    });
  } catch {
    const message = `Step failed: ${step.name}`;

    if (step.required) {
      throw new Error(message);
    }

    console.log(`Optional step skipped after failure: ${step.name}`);
  }
}

function main() {
  console.log("Daily SEO Pipeline");
  console.log("==================");

  const startedAt = new Date();

  for (const step of steps) {
    runStep(step);
  }

  const finishedAt = new Date();
  const durationMs = finishedAt.getTime() - startedAt.getTime();

  console.log("");
  console.log("Daily SEO Pipeline Complete");
  console.log(`Started: ${startedAt.toISOString()}`);
  console.log(`Finished: ${finishedAt.toISOString()}`);
  console.log(`Duration: ${durationMs}ms`);
}

main();