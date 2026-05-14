import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const agentRegistry = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-agent-registry.json"), "utf8")
);

const agentCoordination = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-agent-coordination.json"), "utf8")
);

const seoMemory = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-memory-system.json"), "utf8")
);

const progressHistory = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-progress-history.json"), "utf8")
);

const sharedMemory = {
  generatedAt: new Date().toISOString(),
  memorySyncStatus: "synced",
  memoryVersion: seoMemory.memoryVersion,
  agentsSynced: agentRegistry.agents.length,
  sharedSystemState: seoMemory.systemState,
  sharedStrategicMemory: seoMemory.strategicMemory,
  sharedLearningMemory: seoMemory.learningMemory,
  latestProgressSnapshot:
    progressHistory[progressHistory.length - 1] ?? null,
  agentMemoryAssignments: agentRegistry.agents.map((agent: any) => ({
    agentId: agent.agentId,
    role: agent.role,
    memoryAccess: [
      "system_state",
      "strategic_memory",
      "learning_memory",
      "progress_history",
      "coordination_plan",
    ],
    coordinationInstruction:
      agentCoordination.coordinationPlan.find(
        (item: any) => item.agentId === agent.agentId
      )?.coordinationInstruction ?? "Use shared SEO memory for future execution decisions.",
    status: "memory_synced",
  })),
  persistentMemoryPolicy: {
    updateAfterEveryExecutionCycle: true,
    compareAgainstProgressHistory: true,
    shareStrategicChangesAcrossAgents: true,
    preserveHistoricalSnapshots: true,
  },
};

const outputFile = path.join(DATA_DIR, "seo-agent-shared-memory.json");

fs.writeFileSync(outputFile, JSON.stringify(sharedMemory, null, 2));

console.log("AI SEO Agent Memory Synchronization Engine");
console.log(`Memory sync status: ${sharedMemory.memorySyncStatus}`);
console.log(`Agents synced: ${sharedMemory.agentsSynced}`);
console.log(`Memory version: ${sharedMemory.memoryVersion}`);
console.log(`Output: ${outputFile}`);