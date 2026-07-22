import fs from "node:fs";
import path from "node:path";
import process from "node:process";

export const root = process.cwd();
export const promptDirectory = path.join(root, "data", "prompts");
export const indexPath = path.join(root, "data", "prompts.json");
export const taxonomyPath = path.join(root, "data", "taxonomy.json");

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function promptFiles() {
  if (!fs.existsSync(promptDirectory)) return [];
  return fs.readdirSync(promptDirectory)
    .filter((name) => name.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, "en"))
    .map((name) => path.join(promptDirectory, name));
}

export function loadPrompts() {
  return promptFiles()
    .map((filePath) => ({filePath, record: readJson(filePath)}))
    .sort((a, b) => a.record.id.localeCompare(b.record.id));
}

export function loadTaxonomy() {
  return readJson(taxonomyPath);
}

export function approvedPrompts(entries = loadPrompts()) {
  return entries
    .map(({record}) => record)
    .filter((prompt) => prompt.review.status === "approved")
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      || b.publishedAt.localeCompare(a.publishedAt)
      || a.id.localeCompare(b.id));
}

export function buildIndex(entries = loadPrompts()) {
  const prompts = entries.map(({record}) => record);
  const dates = prompts.flatMap((prompt) => [prompt.publishedAt, prompt.review?.reviewedAt]).filter(Boolean).sort();
  const latestDate = dates.at(-1) ?? "1970-01-01";
  return {
    schemaVersion: 2,
    updatedAt: `${latestDate}T00:00:00.000Z`,
    promptCount: prompts.length,
    variantCount: prompts.reduce((sum, prompt) => sum + (prompt.variants?.length ?? 0), 0),
    prompts,
  };
}

export function writeIndex(entries = loadPrompts()) {
  const data = buildIndex(entries);
  fs.writeFileSync(indexPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return data;
}

export function taxonomyLookup(taxonomy, dimension) {
  return new Map((taxonomy[dimension] ?? []).map((entry) => [entry.id, entry]));
}

export function localizedLabel(taxonomy, dimension, id, localeCode = "en") {
  const entry = taxonomyLookup(taxonomy, dimension).get(id);
  if (!entry) return id;
  return entry.label?.[localeCode]
    ?? entry.label?.[localeCode.split("-")[0]]
    ?? entry.label?.en
    ?? id;
}
