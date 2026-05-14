import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const executionTasksFile = path.join(DATA_DIR, "execution-tasks.json");

const executionTasks = JSON.parse(
  fs.readFileSync(executionTasksFile, "utf8")
);

const tasks = executionTasks.tasks ?? [];

const totalTasks = tasks.length;
const completedTasks = tasks.filter((task: any) => task.status === "done").length;
const inProgressTasks = tasks.filter((task: any) => task.status === "in_progress").length;
const blockedTasks = tasks.filter((task: any) => task.status === "blocked").length;
const todoTasks = tasks.filter((task: any) => task.status === "todo").length;

const completionRate =
  totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

const progressReport = {
  generatedAt: new Date().toISOString(),
  sourceTasksFile: "data/ai-seo/execution-tasks.json",
  summary: {
    totalTasks,
    completedTasks,
    inProgressTasks,
    blockedTasks,
    todoTasks,
    completionRate,
  },
  priorityBreakdown: {
    high: tasks.filter((task: any) => task.priority === "high").length,
    medium: tasks.filter((task: any) => task.priority === "medium").length,
    low: tasks.filter((task: any) => task.priority === "low").length,
  },
  statusBreakdown: {
    todo: todoTasks,
    inProgress: inProgressTasks,
    blocked: blockedTasks,
    done: completedTasks,
  },
  executionHealth:
    blockedTasks > 0
      ? "blocked"
      : completionRate >= 80
        ? "strong_progress"
        : completionRate >= 40
          ? "in_progress"
          : "early_stage",
  recommendedNextAction:
    blockedTasks > 0
      ? "Resolve blocked execution tasks first."
      : todoTasks > 0
        ? "Start with the highest priority todo tasks."
        : "All tracked execution tasks are completed.",
};

const outputFile = path.join(DATA_DIR, "execution-progress-report.json");

fs.writeFileSync(outputFile, JSON.stringify(progressReport, null, 2));

console.log("AI SEO Execution Progress Tracking Engine");
console.log(`Total tasks: ${totalTasks}`);
console.log(`Completed tasks: ${completedTasks}`);
console.log(`Todo tasks: ${todoTasks}`);
console.log(`Blocked tasks: ${blockedTasks}`);
console.log(`Completion rate: ${completionRate}%`);
console.log(`Execution health: ${progressReport.executionHealth}`);
console.log(`Output: ${outputFile}`);