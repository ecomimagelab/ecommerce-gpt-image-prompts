import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {buildIndex, indexPath, loadPrompts, loadTaxonomy, root, taxonomyLookup} from "./lib/catalog.mjs";
import {locales} from "./i18n.mjs";

const errors = [];
const entries = loadPrompts();
const taxonomy = loadTaxonomy();
const ids = new Set();
const slugs = new Set();
const sourceUrls = new Set();
const allowedLocales = new Set(locales.map((locale) => locale.code));
const allowedSourceTypes = new Set(["original", "community", "licensed", "public-domain"]);
const allowedPermissions = new Set(["repository-authored", "creator-granted", "compatible-license", "public-domain"]);
const allowedReviewStatuses = new Set(["approved", "draft", "rejected", "removed"]);
const allowedReferenceTypes = new Set(["visual-research", "official-policy", "original-publication", "license-evidence"]);
const recordKeys = new Set(["$schema", "schemaVersion", "id", "slug", "model", "title", "description", "prompt", "language", "mode", "category", "useCases", "styles", "backgrounds", "platforms", "aspectRatios", "assetPurpose", "inputRequirements", "productInvariants", "negativePrompt", "variants", "author", "source", "license", "platformPolicy", "review", "featured", "publishedAt", "translations"]);
const variantKeys = new Set(["id", "title", "useCase", "assetPurpose", "platforms", "background", "aspectRatio", "prompt", "sample"]);
const sampleKeys = new Set(["before", "after", "alt", "license", "provenance"]);

function taxonomyIds(dimension) {
  return new Set((taxonomy[dimension] ?? []).map((entry) => entry.id));
}

const categoryIds = taxonomyIds("categories");
const useCaseIds = taxonomyIds("useCases");
const styleIds = taxonomyIds("styles");
const backgroundIds = taxonomyIds("backgrounds");
const platformIds = taxonomyIds("platforms");
const purposeIds = taxonomyIds("assetPurposes");

function requiredString(value, location) {
  if (typeof value !== "string" || value.trim() === "") errors.push(`${location} must be a non-empty string`);
}

function requiredArray(value, location, minimum = 1) {
  if (!Array.isArray(value) || value.length < minimum) {
    errors.push(`${location} must contain at least ${minimum} item(s)`);
    return [];
  }
  if (new Set(value).size !== value.length) errors.push(`${location} must not contain duplicates`);
  return value;
}

function controlled(values, allowed, location) {
  for (const value of values) {
    if (!allowed.has(value)) errors.push(`${location} contains unknown taxonomy id: ${value}`);
  }
}

function noUnknownKeys(value, allowed, location) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    errors.push(`${location} must be an object`);
    return;
  }
  for (const key of Object.keys(value)) if (!allowed.has(key)) errors.push(`${location} contains unknown field: ${key}`);
}

function readPngSize(filePath) {
  const header = fs.readFileSync(filePath).subarray(0, 24);
  if (header.length < 24 || header.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") return null;
  return {width: header.readUInt32BE(16), height: header.readUInt32BE(20)};
}

function ratioValue(value) {
  const match = /^(\d+):(\d+)$/.exec(value ?? "");
  if (!match || Number(match[1]) === 0 || Number(match[2]) === 0) return null;
  return Number(match[1]) / Number(match[2]);
}

function validIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return false;
  return new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
}

function isPinterestAsset(value) {
  if (!/^https?:\/\//i.test(value ?? "")) return false;
  try {
    const host = new URL(value).hostname.toLowerCase();
    return host === "pinterest.com" || host.endsWith(".pinterest.com") || host === "pinimg.com" || host.endsWith(".pinimg.com");
  } catch {
    return false;
  }
}

function verifyAsset(value, ratio, location) {
  requiredString(value, location);
  if (!value) return;
  if (/^https:\/\//i.test(value)) {
    if (isPinterestAsset(value)) errors.push(`${location} cannot redistribute a Pinterest-hosted asset; add it as a research reference instead`);
    return;
  }
  if (/^http:\/\//i.test(value)) {
    errors.push(`${location} must use HTTPS`);
    return;
  }

  const absolute = path.resolve(root, value);
  const relative = path.relative(root, absolute);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    errors.push(`${location} escapes the repository root`);
    return;
  }
  if (!fs.existsSync(absolute)) {
    errors.push(`missing image at ${location}: ${value}`);
    return;
  }
  const size = readPngSize(absolute);
  if (!size) {
    errors.push(`${location} must be a PNG image when committed locally`);
    return;
  }
  if (size.width < 512) errors.push(`${location} must be at least 512 px wide`);
  if (fs.statSync(absolute).size > 5 * 1024 * 1024) errors.push(`${location} should be no larger than 5 MB`);
  const expected = ratioValue(ratio);
  if (expected && Math.abs(size.width / size.height - expected) / expected > 0.04) {
    errors.push(`${location} is ${size.width}:${size.height}, which does not match ${ratio}`);
  }
}

for (const dimension of ["categories", "useCases", "styles", "backgrounds", "platforms", "assetPurposes"]) {
  const lookup = taxonomyLookup(taxonomy, dimension);
  if (lookup.size !== (taxonomy[dimension] ?? []).length) errors.push(`data/taxonomy.json has duplicate ${dimension} ids`);
  for (const entry of taxonomy[dimension] ?? []) {
    requiredString(entry.id, `taxonomy.${dimension}.${entry.id}.id`);
    requiredString(entry.label?.en, `taxonomy.${dimension}.${entry.id}.label.en`);
    requiredString(entry.label?.zh, `taxonomy.${dimension}.${entry.id}.label.zh`);
  }
}

for (const {filePath, record: prompt} of entries) {
  const location = path.relative(root, filePath).replaceAll("\\", "/");
  noUnknownKeys(prompt, recordKeys, location);
  const expectedName = `${prompt.id}-${prompt.slug}.json`;
  if (path.basename(filePath) !== expectedName) errors.push(`${location} must be named ${expectedName}`);
  if (prompt.$schema !== "../schema.json") errors.push(`${location}.$schema must be ../schema.json`);
  if (prompt.schemaVersion !== 2) errors.push(`${location}.schemaVersion must be 2`);

  for (const key of ["id", "slug", "model", "title", "description", "prompt", "language", "mode", "category", "assetPurpose", "negativePrompt", "license", "publishedAt"]) {
    requiredString(prompt[key], `${location}.${key}`);
  }
  if (!/^ec-\d{4,}$/.test(prompt.id ?? "")) errors.push(`${location}.id must match ec-0001`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(prompt.slug ?? "")) errors.push(`${location}.slug must be lowercase kebab-case`);
  if (prompt.model !== "gpt-image-2") errors.push(`${location}.model must be gpt-image-2`);
  if ((prompt.title?.length ?? 0) > 120) errors.push(`${location}.title is longer than 120 characters`);
  if ((prompt.description?.length ?? 0) > 600) errors.push(`${location}.description is longer than 600 characters`);
  if (!['text-to-image', 'product-edit'].includes(prompt.mode)) errors.push(`${location}.mode is invalid`);
  if (!validIsoDate(prompt.publishedAt)) errors.push(`${location}.publishedAt must be a valid YYYY-MM-DD date`);
  if (typeof prompt.featured !== "boolean") errors.push(`${location}.featured must be a boolean`);
  if (ids.has(prompt.id)) errors.push(`duplicate id: ${prompt.id}`);
  if (slugs.has(prompt.slug)) errors.push(`duplicate slug: ${prompt.slug}`);
  ids.add(prompt.id);
  slugs.add(prompt.slug);

  if (!categoryIds.has(prompt.category)) errors.push(`${location}.category contains unknown taxonomy id: ${prompt.category}`);
  controlled(requiredArray(prompt.useCases, `${location}.useCases`), useCaseIds, `${location}.useCases`);
  controlled(requiredArray(prompt.styles, `${location}.styles`), styleIds, `${location}.styles`);
  if ((prompt.styles?.length ?? 0) > 3) errors.push(`${location}.styles may contain at most 3 items`);
  controlled(requiredArray(prompt.backgrounds, `${location}.backgrounds`), backgroundIds, `${location}.backgrounds`);
  controlled(requiredArray(prompt.platforms, `${location}.platforms`), platformIds, `${location}.platforms`);
  if (!purposeIds.has(prompt.assetPurpose)) errors.push(`${location}.assetPurpose contains unknown taxonomy id: ${prompt.assetPurpose}`);

  const ratios = requiredArray(prompt.aspectRatios, `${location}.aspectRatios`);
  for (const ratio of ratios) if (!ratioValue(ratio)) errors.push(`${location}.aspectRatios contains invalid W:H ratio: ${ratio}`);
  if (!Number.isInteger(prompt.inputRequirements?.referenceImages) || prompt.inputRequirements.referenceImages < 0) {
    errors.push(`${location}.inputRequirements.referenceImages must be a non-negative integer`);
  }
  noUnknownKeys(prompt.inputRequirements, new Set(["referenceImages", "instructions"]), `${location}.inputRequirements`);
  requiredString(prompt.inputRequirements?.instructions, `${location}.inputRequirements.instructions`);
  const invariants = requiredArray(prompt.productInvariants, `${location}.productInvariants`);
  invariants.forEach((value, index) => requiredString(value, `${location}.productInvariants[${index}]`));
  if (/100%\s+fidelity/i.test(`${prompt.prompt}\n${prompt.inputRequirements?.instructions}`)) {
    errors.push(`${location} uses an absolute 100% fidelity claim; require careful preservation and human QA instead`);
  }

  const variants = requiredArray(prompt.variants, `${location}.variants`);
  const variantIds = new Set();
  for (const [index, variant] of variants.entries()) {
    const variantLocation = `${location}.variants[${index}]`;
    noUnknownKeys(variant, variantKeys, variantLocation);
    for (const key of ["id", "title", "useCase", "assetPurpose", "background", "aspectRatio", "prompt"]) {
      requiredString(variant[key], `${variantLocation}.${key}`);
    }
    if (variantIds.has(variant.id)) errors.push(`${location} has duplicate variant id: ${variant.id}`);
    variantIds.add(variant.id);
    if (!useCaseIds.has(variant.useCase)) errors.push(`${variantLocation}.useCase contains unknown taxonomy id: ${variant.useCase}`);
    if (!purposeIds.has(variant.assetPurpose)) errors.push(`${variantLocation}.assetPurpose contains unknown taxonomy id: ${variant.assetPurpose}`);
    if (!backgroundIds.has(variant.background)) errors.push(`${variantLocation}.background contains unknown taxonomy id: ${variant.background}`);
    controlled(requiredArray(variant.platforms, `${variantLocation}.platforms`), platformIds, `${variantLocation}.platforms`);
    if (!ratioValue(variant.aspectRatio)) errors.push(`${variantLocation}.aspectRatio must use positive W:H values`);
    if ((variant.prompt?.length ?? 0) < 50) errors.push(`${variantLocation}.prompt is too short`);
    const standaloneBody = variant.prompt?.split("\n").slice(1).join("\n") ?? "";
    if (/\b(in every panel|in all panels|across all panels|across all three panels|panel labels|panel numbers|panel\s+\d+\s+must)\b/i.test(standaloneBody)) {
      errors.push(`${variantLocation}.prompt contains campaign-panel wording that is inaccurate for a standalone image`);
    }
    verifyAsset(variant.sample?.after, variant.aspectRatio, `${variantLocation}.sample.after`);
    noUnknownKeys(variant.sample, sampleKeys, `${variantLocation}.sample`);
    if (variant.sample?.before !== null && variant.sample?.before !== undefined) {
      verifyAsset(variant.sample.before, variant.aspectRatio, `${variantLocation}.sample.before`);
    }
    requiredString(variant.sample?.alt, `${variantLocation}.sample.alt`);
    requiredString(variant.sample?.license, `${variantLocation}.sample.license`);
    requiredString(variant.sample?.provenance, `${variantLocation}.sample.provenance`);
    if (prompt.mode === "product-edit" && !variant.sample?.before) errors.push(`${variantLocation}.sample.before is required in product-edit mode`);
  }
  if (prompt.mode === "product-edit" && prompt.inputRequirements?.referenceImages < 1) {
    errors.push(`${location}.inputRequirements.referenceImages must be at least 1 in product-edit mode`);
  }

  noUnknownKeys(prompt.author, new Set(["name", "url"]), `${location}.author`);
  if (!prompt.author?.name) errors.push(`${location}.author.name is required`);
  if (prompt.author?.url && !/^https:\/\//i.test(prompt.author.url)) errors.push(`${location}.author.url must use HTTPS`);
  noUnknownKeys(prompt.source, new Set(["type", "url", "permission", "notes", "references"]), `${location}.source`);
  if (!allowedSourceTypes.has(prompt.source?.type)) errors.push(`${location}.source.type is invalid`);
  if (!allowedPermissions.has(prompt.source?.permission)) errors.push(`${location}.source.permission is invalid`);
  requiredString(prompt.source?.notes, `${location}.source.notes`);
  if (prompt.source?.type !== "original" && !prompt.source?.url) errors.push(`${location}.source.url is required for non-original content`);
  if (prompt.source?.url && !/^https:\/\//i.test(prompt.source.url)) errors.push(`${location}.source.url must use HTTPS`);
  if (prompt.source?.type === "original" && !["repository-authored", "creator-granted"].includes(prompt.source?.permission)) {
    errors.push(`${location}.source.permission must be repository-authored or creator-granted for original content`);
  }
  if (prompt.source?.type !== "original" && prompt.source?.permission === "repository-authored") {
    errors.push(`${location}.source.permission cannot be repository-authored for third-party content`);
  }
  if (prompt.source?.url) {
    if (sourceUrls.has(prompt.source.url)) errors.push(`duplicate source URL: ${prompt.source.url}`);
    sourceUrls.add(prompt.source.url);
  }
  for (const [index, reference] of (prompt.source?.references ?? []).entries()) {
    noUnknownKeys(reference, new Set(["type", "url"]), `${location}.source.references[${index}]`);
    requiredString(reference.type, `${location}.source.references[${index}].type`);
    if (!allowedReferenceTypes.has(reference.type)) errors.push(`${location}.source.references[${index}].type is invalid`);
    requiredString(reference.url, `${location}.source.references[${index}].url`);
    if (reference.type !== "visual-research" && !/^https:\/\//i.test(reference.url)) {
      errors.push(`${location}.source.references[${index}].url must use HTTPS for ${reference.type}`);
    }
  }

  noUnknownKeys(prompt.platformPolicy, new Set(["status", "note", "reviewedAt", "sources"]), `${location}.platformPolicy`);
  if (!['design-guidance-only', 'officially-reviewed'].includes(prompt.platformPolicy?.status)) errors.push(`${location}.platformPolicy.status is invalid`);
  requiredString(prompt.platformPolicy?.note, `${location}.platformPolicy.note`);
  if (prompt.platformPolicy?.status === "officially-reviewed") {
    if (!validIsoDate(prompt.platformPolicy.reviewedAt)) errors.push(`${location}.platformPolicy.reviewedAt requires a valid date for officially-reviewed records`);
    if (!(prompt.platformPolicy.sources?.length > 0)) errors.push(`${location}.platformPolicy.sources requires an official source`);
  }
  for (const [index, source] of (prompt.platformPolicy?.sources ?? []).entries()) {
    if (!/^https:\/\//i.test(source)) errors.push(`${location}.platformPolicy.sources[${index}] must use HTTPS`);
  }
  noUnknownKeys(prompt.review, new Set(["status", "rights", "promptQuality", "previewQuality", "reviewedAt"]), `${location}.review`);
  if (!allowedReviewStatuses.has(prompt.review?.status)) errors.push(`${location}.review.status is invalid`);
  if (!['reviewed', 'pending', 'disputed'].includes(prompt.review?.rights)) errors.push(`${location}.review.rights is invalid`);
  if (!['reviewed', 'pending'].includes(prompt.review?.promptQuality)) errors.push(`${location}.review.promptQuality is invalid`);
  if (!['reviewed', 'pending'].includes(prompt.review?.previewQuality)) errors.push(`${location}.review.previewQuality is invalid`);
  if (!validIsoDate(prompt.review?.reviewedAt)) errors.push(`${location}.review.reviewedAt must be a valid YYYY-MM-DD date`);

  for (const locale of Object.keys(prompt.translations ?? {})) {
    if (!allowedLocales.has(locale)) errors.push(`${location}.translations has unsupported locale: ${locale}`);
    noUnknownKeys(prompt.translations[locale], new Set(["title", "description"]), `${location}.translations.${locale}`);
    requiredString(prompt.translations[locale]?.title, `${location}.translations.${locale}.title`);
    requiredString(prompt.translations[locale]?.description, `${location}.translations.${locale}.description`);
  }
}

if (entries.length === 0) errors.push("data/prompts must contain at least one record");
if (!entries.some(({record}) => record.review.status === "approved")) errors.push("at least one approved prompt is required");

if (!fs.existsSync(indexPath)) {
  errors.push("data/prompts.json is missing; run npm run build:data");
} else {
  const expected = JSON.stringify(buildIndex(entries));
  const actual = JSON.stringify(JSON.parse(fs.readFileSync(indexPath, "utf8")));
  if (actual !== expected) errors.push("data/prompts.json is stale; run npm run build:data");
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const approved = entries.filter(({record}) => record.review.status === "approved");
const variants = approved.reduce((sum, {record}) => sum + record.variants.length, 0);
console.log(`Validated ${entries.length} prompt files (${approved.length} approved, ${variants} single-image variants).`);
