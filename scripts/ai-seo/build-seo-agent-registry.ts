import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const executionTasks = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "execution-tasks.json"), "utf8")
);

const operationalDecision = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-operational-decision.json"), "utf8")
);

const agentRegistry = {
  generatedAt: new Date().toISOString(),
  registryVersion: 1,
  systemStatus: "active",
  agents: [
    {
      agentId: "refresh-agent",
      role: "content_refresh_specialist",
      responsibility:
        "Refresh outdated guides and maintain content freshness.",
      assignedTasks:
        executionTasks.tasks.filter(
          (task: any) => task.type === "content_refresh"
        ).length,
      status: "ready",
      currentPriority:
        operationalDecision.selectedAction ===
        "start_high_priority_execution"
          ? "highest"
          : "normal",
    },
    {
      agentId: "serp-agent",
      role: "serp_opportunity_specialist",
      responsibility:
        "Capture quick-win keyword opportunities and improve SERP coverage.",
      assignedTasks:
        executionTasks.tasks.filter(
          (task: any) => task.type === "quick_win_keyword"
        ).length,
      status: "ready",
      currentPriority: "high",
    },
    {
      agentId: "authority-agent",
      role: "authority_cluster_specialist",
      responsibility:
        "Strengthen authority clusters and build pillar pages.",
      assignedTasks:
        executionTasks.tasks.filter(
          (task: any) => task.type === "pillar_page"
        ).length,
      status: "ready",
      currentPriority: "high",
    },
    {
      agentId: "monitoring-agent",
      role: "system_monitoring_specialist",
      responsibility:
        "Monitor SEO evolution, workflow health, and execution progress.",
      assignedTasks: 0,
      status: "monitoring",
      currentPriority: "ongoing",
    },
  ],
  coordinationStatus: {
    operationalDecision:
      operationalDecision.selectedAction,
    executionPriority:
      operationalDecision.operationalPriority,
    totalAgents: 4,
  },
};

const outputFile = path.join(DATA_DIR, "seo-agent-registry.json");

fs.writeFileSync(outputFile, JSON.stringify(agentRegistry, null, 2));

console.log("AI SEO Agent Registry");
console.log(`Registry version: ${agentRegistry.registryVersion}`);
console.log(`System status: ${agentRegistry.systemStatus}`);
console.log(`Registered agents: ${agentRegistry.coordinationStatus.totalAgents}`);
console.log(`Operational decision: ${agentRegistry.coordinationStatus.operationalDecision}`);
console.log(`Output: ${outputFile}`);