import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {loadPrompts, loadTaxonomy, promptDirectory} from "./lib/catalog.mjs";

const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) throw new Error("GITHUB_EVENT_PATH is required");

const event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
const labels = (event.issue?.labels ?? []).map((label) => typeof label === "string" ? label : label.name);
if (!labels.includes("approved")) {
  console.log("Issue is not approved; no changes made.");
  process.exit(0);
}

function parseIssueForm(body = "") {
  const fields = {};
  let key = null;
  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith("### ")) {
      key = line.slice(4).trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
      fields[key] = "";
    } else if (key) {
      fields[key] += `${line}\n`;
    }
  }
  for (const field of Object.keys(fields)) {
    fields[field] = fields[field].trim();
    if (fields[field] === "_No response_") fields[field] = "";
  }
  return fields;
}

function lines(value = "") {
  return value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
}

function unwrapRenderedBlock(value = "") {
  const match = /^```[^\n]*\n([\s\S]*?)\n```$/.exec(value.trim());
  return match ? match[1].trim() : value.trim();
}

function httpsUrls(value = "") {
  return value.split(/\r?\n/).map((url) => url.trim()).filter((url) => /^https:\/\//i.test(url));
}

const fields = parseIssueForm(event.issue?.body);
fields.prompt = unwrapRenderedBlock(fields.prompt);
const required = [
  "prompt_title", "generation_mode", "prompt", "description", "category", "use_case", "asset_purpose",
  "styles", "background", "platforms", "aspect_ratio", "reference_image_count", "input_requirements",
  "product_invariants", "negative_prompt", "generated_image_urls", "original_author", "source_type",
  "permission_basis", "license", "prompt_language",
];
const missing = required.filter((key) => !fields[key]);
if (missing.length) throw new Error(`Approved issue is missing required fields: ${missing.join(", ")}`);

const entries = loadPrompts();
const taxonomy = loadTaxonomy();
const nextNumber = Math.max(0, ...entries.map(({record}) => Number(record.id.replace(/\D/g, "")))) + 1;
const id = `ec-${String(nextNumber).padStart(4, "0")}`;
const slugBase = fields.prompt_title.toLowerCase().normalize("NFKD").replace(/[^\x00-\x7F]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const slug = slugBase || `community-prompt-${nextNumber}`;
const imageUrls = httpsUrls(fields.generated_image_urls);
if (imageUrls.length < 2) throw new Error("At least two HTTPS generated-image URLs are required");

const taxonomyMaps = Object.fromEntries(["categories", "useCases", "styles", "backgrounds", "platforms", "assetPurposes"].map((dimension) => [
  dimension,
  new Map(taxonomy[dimension].flatMap((entry) => [
    [entry.id.toLowerCase(), entry.id],
    [entry.label.en.toLowerCase(), entry.id],
    ...(entry.label.zh ? [[entry.label.zh.toLowerCase(), entry.id]] : []),
  ])),
]));

function normalize(dimension, value) {
  const normalized = taxonomyMaps[dimension].get(value.trim().toLowerCase());
  if (!normalized) throw new Error(`Unknown ${dimension} value: ${value}`);
  return normalized;
}

const mode = fields.generation_mode;
const referenceImages = Number.parseInt(fields.reference_image_count, 10);
if (!Number.isInteger(referenceImages) || referenceImages < 0) throw new Error("Reference Image Count must be a non-negative integer");
if (mode === "product-edit" && referenceImages < 1) throw new Error("Product-edit submissions require at least one reference image");
const beforeUrl = fields.before_image_url || null;
if (mode === "product-edit" && !/^https:\/\//i.test(beforeUrl ?? "")) throw new Error("Product-edit submissions require an HTTPS Before Image URL");

const category = normalize("categories", fields.category);
const useCase = normalize("useCases", fields.use_case);
const assetPurpose = normalize("assetPurposes", fields.asset_purpose);
const styles = lines(fields.styles).map((value) => normalize("styles", value));
const background = normalize("backgrounds", fields.background);
const platforms = lines(fields.platforms).map((value) => normalize("platforms", value));
const permission = fields.permission_basis;
const sourceType = fields.source_type;
const officialSources = httpsUrls(fields.official_platform_policy_sources);
const sourceReferences = [];
if (fields.source_link) sourceReferences.push({type: "original-publication", url: fields.source_link});
for (const url of httpsUrls(fields.visual_research_links)) sourceReferences.push({type: "visual-research", url});
for (const url of officialSources) sourceReferences.push({type: "official-policy", url});

const record = {
  $schema: "../schema.json",
  schemaVersion: 2,
  id,
  slug,
  model: "gpt-image-2",
  title: fields.prompt_title,
  description: fields.description,
  prompt: fields.prompt,
  language: fields.prompt_language,
  mode,
  category,
  useCases: [useCase],
  styles: [...new Set(styles)],
  backgrounds: [background],
  platforms: [...new Set(platforms)],
  aspectRatios: [fields.aspect_ratio],
  assetPurpose,
  inputRequirements: {
    referenceImages,
    instructions: fields.input_requirements,
  },
  productInvariants: lines(fields.product_invariants),
  negativePrompt: fields.negative_prompt,
  variants: imageUrls.map((url, index) => ({
    id: `output-${index + 1}`,
    title: `${fields.prompt_title} – output ${index + 1}`,
    useCase,
    assetPurpose,
    platforms: [...new Set(platforms)],
    background,
    aspectRatio: fields.aspect_ratio,
    prompt: fields.prompt,
    sample: {
      before: beforeUrl,
      after: url,
      alt: `${fields.prompt_title} generated example ${index + 1}`,
      license: fields.license,
      provenance: `Submitted by ${fields.original_author} through GitHub issue #${event.issue.number} and approved for review in a pull request.`,
    },
  })),
  author: {name: fields.original_author, url: fields.author_profile_link || null},
  source: {
    type: sourceType,
    url: fields.source_link || event.issue.html_url,
    permission,
    notes: `Submitted through GitHub issue #${event.issue.number}. Publication remains subject to pull-request review.`,
    references: sourceReferences,
  },
  license: fields.license,
  platformPolicy: {
    status: officialSources.length ? "officially-reviewed" : "design-guidance-only",
    note: officialSources.length
      ? "The submitter supplied official policy sources; maintainers must still verify current category-specific requirements before merging."
      : "Platform names describe intended art direction only. Verify current official rules before publishing.",
    reviewedAt: officialSources.length ? new Date().toISOString().slice(0, 10) : null,
    sources: officialSources,
  },
  review: {
    status: "approved",
    rights: "reviewed",
    promptQuality: "reviewed",
    previewQuality: "reviewed",
    reviewedAt: new Date().toISOString().slice(0, 10),
  },
  featured: false,
  publishedAt: new Date().toISOString().slice(0, 10),
  translations: {},
};

if (entries.some(({record: existing}) => existing.slug === record.slug || existing.source?.url === record.source.url)) {
  console.log("Matching prompt already exists; no changes made.");
  process.exit(0);
}

if (process.env.SYNC_DRY_RUN === "1") {
  console.log(JSON.stringify(record, null, 2));
  process.exit(0);
}

fs.mkdirSync(promptDirectory, {recursive: true});
const target = path.join(promptDirectory, `${record.id}-${record.slug}.json`);
fs.writeFileSync(target, `${JSON.stringify(record, null, 2)}\n`, "utf8");
console.log(`Added ${record.id}: ${record.title} to ${path.relative(process.cwd(), target)}`);
