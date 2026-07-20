import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {locales} from "./i18n.mjs";

const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, "data", "prompts.json"), "utf8"));
const prompts = data.prompts
  .filter((prompt) => prompt.status === "approved")
  .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id));

const escapeTable = (value) => String(value).replaceAll("|", "\\|");
const headingSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const platformCount = new Set(prompts.flatMap((prompt) => prompt.platforms)).size;
const industryGroups = new Map();
for (const prompt of prompts) {
  const list = industryGroups.get(prompt.industry) ?? [];
  list.push(prompt);
  industryGroups.set(prompt.industry, list);
}

function languageNav(current) {
  return locales.map((locale) => {
    const label = locale.code === current.code ? `**${locale.name}**` : `[${locale.name}](${locale.file})`;
    return label;
  }).join(" · ");
}

function localizedPrompt(prompt, locale) {
  const translation = prompt.translations?.[locale.code] ?? prompt.translations?.[locale.code.split("-")[0]];
  return {
    title: translation?.title ?? prompt.title,
    description: translation?.description ?? prompt.description,
  };
}

function renderPrompt(prompt, locale, index) {
  const s = locale.strings;
  const localized = localizedPrompt(prompt, locale);
  const source = prompt.source.url ? `[${prompt.source.type}](${prompt.source.url})` : s.original;
  const author = prompt.author.url ? `[${prompt.author.name}](${prompt.author.url})` : prompt.author.name;
  const images = prompt.previews
    .map((preview) => `<img src="${preview.url}" width="31%" alt="${escapeTable(preview.alt)}">`)
    .join("\n");
  return [
    `### ${index + 1}. ${localized.title}`,
    "",
    prompt.featured ? "⭐ **Featured**" : "",
    "",
    `#### ${s.description}`,
    "",
    localized.description,
    "",
    `#### ${s.prompt}`,
    "",
    "```text",
    prompt.prompt,
    "```",
    "",
    `#### ${s.previews}`,
    "",
    '<p align="center">',
    images,
    "</p>",
    "",
    `#### ${s.details}`,
    "",
    `| ${s.author} | ${s.source} | ${s.industry} | ${s.useCase} |`,
    "|---|---|---|---|",
    `| ${escapeTable(author)} | ${escapeTable(source)} | \`${prompt.industry}\` | \`${prompt.useCase}\` |`,
    "",
    `- **${s.platforms}:** ${prompt.platforms.join(", ")}`,
    `- **${s.language}:** \`${prompt.language}\``,
    `- **${s.license}:** ${prompt.license}`,
    `- **${s.published}:** ${prompt.publishedAt}`,
    "",
    "---",
    "",
  ].filter((line, lineIndex, all) => line !== "" || all[lineIndex - 1] !== "").join("\n");
}

function render(locale) {
  const s = locale.strings;
  const featured = prompts.filter((prompt) => prompt.featured);
  const categories = [...industryGroups.entries()].sort(([a], [b]) => a.localeCompare(b));
  const categoryRows = categories.map(([industry, entries]) =>
    `| [${industry}](#${headingSlug(industry)}) | ${entries.length} |`
  ).join("\n");
  const featuredBlocks = featured.map((prompt, index) => renderPrompt(prompt, locale, index)).join("\n");
  const allBlocks = categories.map(([industry, entries]) => [
    `## ${industry}`,
    "",
    ...entries.map((prompt, index) => renderPrompt(prompt, locale, index)),
  ].join("\n")).join("\n");

  return [
    "<!-- AUTO-GENERATED FILE. EDIT data/prompts.json OR scripts/i18n.mjs INSTEAD. -->",
    "",
    `<h1 align="center">${s.title}</h1>`,
    "",
    `<p align="center">${s.tagline}</p>`,
    "",
    '<p align="center">',
    "  <img alt=\"GPT Image 2\" src=\"https://img.shields.io/badge/Model-GPT%20Image%202-2458ff\">",
    "  <img alt=\"Languages\" src=\"https://img.shields.io/badge/Languages-16-c7ff35\">",
    "  <img alt=\"License\" src=\"https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey\">",
    "  <img alt=\"PRs welcome\" src=\"https://img.shields.io/badge/PRs-welcome-brightgreen\">",
    "</p>",
    "",
    `<p align="center">${languageNav(locale)}</p>`,
    "",
    "> [!IMPORTANT]",
    `> ${s.notice}`,
    "",
    `## ${s.about}`,
    "",
    s.aboutText,
    "",
    `## ${s.statistics}`,
    "",
    `| ${s.totalPrompts} | ${s.totalIndustries} | ${s.totalPlatforms} | ${s.lastUpdated} |`,
    "|---:|---:|---:|---|",
    `| **${prompts.length}** | **${industryGroups.size}** | **${platformCount}** | **${data.updatedAt.slice(0, 10)}** |`,
    "",
    `## ${s.categories}`,
    "",
    `| ${s.industry} | ${s.totalPrompts} |`,
    "|---|---:|",
    categoryRows,
    "",
    `## ${s.featured}`,
    "",
    featuredBlocks,
    `## ${s.allPrompts}`,
    "",
    allBlocks,
    `## ${s.contribute}`,
    "",
    s.contributeText,
    "",
    "- [Contribution guide](docs/CONTRIBUTING.md)",
    "- [Copyright and takedown policy](docs/COPYRIGHT.md)",
    "- [Visual research and prompt provenance](docs/VISUAL_RESEARCH.md)",
    "- [Editorial policy](docs/EDITORIAL_POLICY.md)",
    "- [Data schema](docs/DATA_SCHEMA.md)",
    "- [Local development](docs/LOCAL_DEVELOPMENT.md)",
    "",
    "## License",
    "",
    "Repository-authored content is licensed under [CC BY 4.0](LICENSE). Individual records may carry additional source metadata and third-party rights notices.",
    "",
  ].join("\n");
}

for (const locale of locales) {
  fs.writeFileSync(path.join(root, locale.file), render(locale), "utf8");
  console.log(`Generated ${locale.file}`);
}
