import fs from "fs";
import path from "path";

const snapshotDir = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "snapshots"
);

const trackedFiles = [
  "search-console-intelligence.json",
  "search-feedback-actions.json",
  "refresh-priority-queue.json",
  "internal-link-opportunities.json",
  "topic-cluster-expansion.json",
];

function ensureDirectoryExists(directory: string) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

function loadJson(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function main() {
  ensureDirectoryExists(snapshotDir);

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

  const snapshot = {
    createdAt: new Date().toISOString(),
    files: {} as Record<string, unknown>,
  };

  for (const file of trackedFiles) {
    const fullPath = path.join(
      process.cwd(),
      "data",
      "ai-seo",
      file
    );

    snapshot.files[file] = loadJson(fullPath);
  }

  const snapshotPath = path.join(
    snapshotDir,
    `seo-snapshot-${timestamp}.json`
  );

  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2));

  console.log("Daily SEO Snapshot Archive");
  console.log(`Tracked files: ${trackedFiles.length}`);
  console.log(`Snapshot saved: ${snapshotPath}`);
}

main();