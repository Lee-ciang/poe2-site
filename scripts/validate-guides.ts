import { getAllMarkdownGuides } from "../src/lib/markdown";

const MIN_DESCRIPTION_LENGTH = 80;
const MIN_BODY_LENGTH = 500;

const guides = getAllMarkdownGuides();
const errors: string[] = [];
const warnings: string[] = [];

const seenPaths = new Set<string>();
const seenSlugs = new Map<string, string>();

for (const guide of guides) {
  const { metadata, body, path } = guide;

  if (seenPaths.has(path)) {
    errors.push(`Duplicate path: ${path}`);
  }
  seenPaths.add(path);

  const slugKey = `${metadata.type}/${metadata.slug}`;
  if (seenSlugs.has(slugKey)) {
    errors.push(`Duplicate slug: ${slugKey}`);
  }
  seenSlugs.set(slugKey, path);

  if (!metadata.title.trim()) {
    errors.push(`${path}: missing title`);
  }

  if (!metadata.slug.trim()) {
    errors.push(`${path}: missing slug`);
  }

  if (!metadata.seoTitle?.trim()) {
    warnings.push(`${path}: missing seoTitle`);
  }

  if (!metadata.seoDescription?.trim()) {
    errors.push(`${path}: missing seoDescription`);
  } else if (metadata.seoDescription.length < MIN_DESCRIPTION_LENGTH) {
    warnings.push(
      `${path}: seoDescription is short (${metadata.seoDescription.length} chars)`,
    );
  }

  if (!metadata.patchVersion?.trim()) {
    warnings.push(`${path}: missing patchVersion`);
  }

  if (!metadata.lastUpdated?.trim()) {
    warnings.push(`${path}: missing lastUpdated`);
  }

  const relatedCount =
    metadata.relatedBuilds.length +
    metadata.relatedBosses.length +
    metadata.relatedSkills.length;

  if (relatedCount === 0) {
    warnings.push(`${path}: no related links`);
  }

  if (body.length < MIN_BODY_LENGTH) {
    warnings.push(`${path}: body is short (${body.length} chars)`);
  }
}

console.log(`Checked ${guides.length} markdown guides.`);

if (warnings.length) {
  console.warn(`\nWarnings (${warnings.length}):`);
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length) {
  console.error(`\nErrors (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("\nGuide validation passed.");