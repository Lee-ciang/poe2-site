import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const agentRegistry = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-agent-registry.json"), "utf8")
);

const executionProgress = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "execution-progress-report.json"), "utf8")
);

const workflowPlan = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "workflow-coordination-plan.json"), "utf8")
);

const agentCoordination = {
  generatedAt: new Date().toISOString(),
  coordinationStatus: "active",
  agentsCoordinated: agentRegistry.agents.length,
  executionHealth: executionProgress.executionHealth,
  sharedObjective:
    executionProgress.executionHealth === "early_stage"
      ? "Start high-priority SEO execution tasks"
      : "Continue coordinated SEO operations",
  coordinationPlan: agentRegistry.agents.map((agent: any) => ({
    agentId: agent.agentId,
    role: agent.role,
    status: agent.status,
    assignedTasks: agent.assignedTasks,
    currentPriority: agent.currentPriority,
    coordinationInstruction:
      agent.agentId === "refresh-agent"
        ? "Coordinate with SERP Agent to include quick-win keywords in refresh drafts."
        : agent.agentId === "serp-agent"
          ? "Share quick-win keyword targets with Refresh Agent and Authority Agent."
          : agent.agentId === "authority-agent"
            ? "Use pillar recommendations and SERP opportunities to strengthen weak clusters."
            : "Monitor execution progress and trigger future reporting cycles.",
  })),
  workflowAlignment: workflowPlan.workflowOrder.map((workflow: any) => ({
    workflow: workflow.workflow,
    priority: workflow.priority,
    supportingAgents:
      workflow.workflow === "refresh_content"
        ? ["refresh-agent", "serp-agent"]
        : workflow.workflow === "strengthen_authority"
          ? ["authority-agent", "serp-agent"]
          : ["monitoring-agent"],
  })),
  nextCoordinationAction:
    "Begin with Refresh Agent and SERP Agent collaboration on high-priority refresh tasks.",
};

const outputFile = path.join(DATA_DIR, "seo-agent-coordination.json");

fs.writeFileSync(outputFile, JSON.stringify(agentCoordination, null, 2));

console.log("AI SEO Agent Coordination Engine");
console.log(`Coordination status: ${agentCoordination.coordinationStatus}`);
console.log(`Agents coordinated: ${agentCoordination.agentsCoordinated}`);
console.log(`Execution health: ${agentCoordination.executionHealth}`);
console.log(`Output: ${outputFile}`);