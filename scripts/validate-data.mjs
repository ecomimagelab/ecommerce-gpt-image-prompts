import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const dataPath = path.join(root, "data", "prompts.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const errors = [];
const ids = new Set();
const slugs = new Set();
const approved = data.prompts.filter((prompt) => prompt.status === "approved");

function readPngSize(filePath) {
  const header = fs.readFileSync(filePath).subarray(0, 24);
  const pngSignature = "89504e470d0a1a0a";
  if (header.length < 24 || header.subarray(0, 8).toString("hex") !== pngSignature) return null;
  return {width: header.readUInt32BE(16), height: header.readUInt32BE(20)};
}

function ratioValue(value) {
  const match = /^(\d+):(\d+)$/.exec(value ?? "");
  if (!match || Number(match[2]) === 0) return null;
  return Number(match[1]) / Number(match[2]);
}

for (const [index, prompt] of data.prompts.entries()) {
  const location = `prompts[${index}]`;
  const requiredStrings = ["id", "slug", "model", "title", "description", "prompt", "language", "industry", "useCase", "license", "status", "publishedAt"];
  for (const key of requiredStrings) {
    if (typeof prompt[key] !== "string" || prompt[key].trim() === "") errors.push(`${location}.${key} must be a non-empty string`);
  }
  if (!/^ec-\d{4,}$/.test(prompt.id ?? "")) errors.push(`${location}.id must match ec-0001`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(prompt.slug ?? "")) errors.push(`${location}.slug must be lowercase kebab-case`);
  if (prompt.model !== "gpt-image-2") errors.push(`${location}.model must be gpt-image-2`);
  if (ids.has(prompt.id)) errors.push(`duplicate id: ${prompt.id}`);
  if (slugs.has(prompt.slug)) errors.push(`duplicate slug: ${prompt.slug}`);
  ids.add(prompt.id);
  slugs.add(prompt.slug);
  if (!Array.isArray(prompt.platforms) || prompt.platforms.length === 0) errors.push(`${location}.platforms must contain at least one platform`);
  if (!Array.isArray(prompt.aspectRatios) || prompt.aspectRatios.length === 0) errors.push(`${location}.aspectRatios must contain at least one ratio`);
  const declaredRatios = (prompt.aspectRatios ?? []).map(ratioValue).filter((ratio) => ratio !== null);
  if (declaredRatios.length !== (prompt.aspectRatios ?? []).length) errors.push(`${location}.aspectRatios must use positive W:H values`);
  if (!Array.isArray(prompt.previews) || prompt.previews.length < 2) errors.push(`${location}.previews must contain at least two images`);
  for (const [previewIndex, preview] of (prompt.previews ?? []).entries()) {
    if (!preview.url || !preview.alt) errors.push(`${location}.previews[${previewIndex}] requires url and alt`);
    if (preview.url && !/^https?:\/\//.test(preview.url)) {
      const imagePath = path.resolve(root, preview.url);
      if (!imagePath.startsWith(root)) errors.push(`${location}.previews[${previewIndex}] escapes repository root`);
      else if (!fs.existsSync(imagePath)) errors.push(`missing preview image: ${preview.url}`);
      else {
        const size = readPngSize(imagePath);
        if (!size) errors.push(`${location}.previews[${previewIndex}] must be a PNG image`);
        else if (declaredRatios.length && !declaredRatios.some((ratio) => Math.abs(size.width / size.height - ratio) / ratio <= 0.04)) {
          errors.push(`${location}.previews[${previewIndex}] is ${size.width}:${size.height}, which does not match declared aspect ratios ${prompt.aspectRatios.join(", ")}`);
        }
      }
    }
  }
  if (!prompt.author?.name) errors.push(`${location}.author.name is required`);
  if (!prompt.source?.type) errors.push(`${location}.source.type is required`);
  if (!["original", "community", "licensed", "public-domain"].includes(prompt.source?.type)) errors.push(`${location}.source.type is invalid`);
  if (!["approved", "draft", "rejected", "removed"].includes(prompt.status)) errors.push(`${location}.status is invalid`);
  if (prompt.prompt?.length < 50) errors.push(`${location}.prompt is too short`);
}

if (approved.length === 0) errors.push("at least one approved prompt is required");

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${data.prompts.length} prompt records (${approved.length} approved).`);
