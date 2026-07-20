import fs from "node:fs";
import path from "node:path";
import process from "node:process";

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

const fields = parseIssueForm(event.issue?.body);
const required = ["prompt_title", "prompt", "description", "industry", "use_case", "platforms", "generated_image_urls", "original_author", "prompt_language"];
const missing = required.filter((key) => !fields[key]);
if (missing.length) throw new Error(`Approved issue is missing required fields: ${missing.join(", ")}`);

const root = process.cwd();
const dataPath = path.join(root, "data", "prompts.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const nextNumber = Math.max(0, ...data.prompts.map((prompt) => Number(prompt.id.replace(/\D/g, "")))) + 1;
const slugBase = fields.prompt_title.toLowerCase().normalize("NFKD").replace(/[^\x00-\x7F]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const slug = slugBase || `community-prompt-${nextNumber}`;
const imageUrls = fields.generated_image_urls.split(/\r?\n/).map((url) => url.trim()).filter((url) => /^https:\/\//.test(url));
if (imageUrls.length < 2) throw new Error("At least two HTTPS preview image URLs are required");

const record = {
  id: `ec-${String(nextNumber).padStart(4, "0")}`,
  slug,
  model: "gpt-image-2",
  title: fields.prompt_title,
  description: fields.description,
  prompt: fields.prompt,
  language: fields.prompt_language,
  industry: fields.industry,
  useCase: fields.use_case,
  platforms: fields.platforms.split(",").map((value) => value.trim()).filter(Boolean),
  aspectRatios: (fields.aspect_ratios || "unspecified").split(",").map((value) => value.trim()).filter(Boolean),
  needReferenceImages: /^true$/i.test(fields.need_reference_images || "false"),
  previews: imageUrls.map((url, index) => ({url, alt: `${fields.prompt_title} preview ${index + 1}`})),
  author: {name: fields.original_author, url: fields.author_profile_link || null},
  source: {type: "community", url: fields.source_link || event.issue.html_url, notes: `Approved from GitHub issue #${event.issue.number}.`},
  license: "CC-BY-4.0",
  status: "approved",
  featured: false,
  publishedAt: new Date().toISOString().slice(0, 10),
  translations: {},
};

if (data.prompts.some((prompt) => prompt.slug === record.slug || prompt.source?.url === record.source.url)) {
  console.log("Matching prompt already exists; no changes made.");
  process.exit(0);
}

data.prompts.push(record);
data.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Added ${record.id}: ${record.title}`);

