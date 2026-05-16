import fs from "fs";
import path from "path";

type Snapshot = {
  createdAt: string;
  files: Record<string, any>;
};

const snapshotDir = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "snapshots"
);

const outputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "seo-delta-report.json"
);

function getSnapshotFiles(): string[] {
  if (!fs.existsSync(snapshotDir)) {
    return [];
  }

  return fs
    .readdirSync(snapshotDir)
    .filter((file) => file.endsWith(".json"))
    .sort();
}

function loadSnapshot(fileName: string): Snapshot | null {
  const fullPath = path.join(snapshotDir, fileName);

  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch {
    return null;
  }
}

function summarizeSearchConsole(snapshot: Snapshot | null) {
  const data =
    snapshot?.files?.["search-console-intelligence.json"];

  if (!data) {
    return {
      rowsImported: 0,
      opportunitiesFound: 0,
    };
  }

  return {
    rowsImported: data.rowsImported || 0,
    opportunitiesFound: data.opportunitiesFound || 0,
  };
}

function summarizeRefreshQueue(snapshot: Snapshot | null) {
  const data =
    snapshot?.files?.["refresh-priority-queue.json"];

  if (!data) {
    return {
      refreshCandidates: 0,
    };
  }

  return {
    refreshCandidates: data.refreshCandidates || 0,
  };
}

function main() {
  const snapshotFiles = getSnapshotFiles();

  if (snapshotFiles.length < 2) {
    console.log("SEO Delta Report Generator");
    console.log("At least two snapshots are required.");
    return;
  }

  const previousFile =
    snapshotFiles[snapshotFiles.length - 2];

  const latestFile =
    snapshotFiles[snapshotFiles.length - 1];

  const previousSnapshot = loadSnapshot(previousFile);
  const latestSnapshot = loadSnapshot(latestFile);

  const previousSearch =
    summarizeSearchConsole(previousSnapshot);

  const latestSearch =
    summarizeSearchConsole(latestSnapshot);

  const previousRefresh =
    summarizeRefreshQueue(previousSnapshot);

  const latestRefresh =
    summarizeRefreshQueue(latestSnapshot);

  const report = {
    generatedAt: new Date().toISOString(),

    comparedSnapshots: {
      previous: previousFile,
      latest: latestFile,
    },

    deltas: {
      searchConsole: {
        rowsImportedDelta:
          latestSearch.rowsImported -
          previousSearch.rowsImported,

        opportunitiesDelta:
          latestSearch.opportunitiesFound -
          previousSearch.opportunitiesFound,
      },

      refreshQueue: {
        refreshCandidatesDelta:
          latestRefresh.refreshCandidates -
          previousRefresh.refreshCandidates,
      },
    },
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  console.log("SEO Delta Report Generator");
  console.log(`Previous snapshot: ${previousFile}`);
  console.log(`Latest snapshot: ${latestFile}`);
  console.log(`Output: ${outputPath}`);
}

main();