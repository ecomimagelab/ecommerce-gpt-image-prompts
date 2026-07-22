import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {locales} from "./i18n.mjs";
import {approvedPrompts, buildIndex, loadPrompts, loadTaxonomy, localizedLabel} from "./lib/catalog.mjs";

const root = process.cwd();
const taxonomy = loadTaxonomy();
const prompts = approvedPrompts();
const data = buildIndex(loadPrompts());

const escapeTable = (value) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const platformCount = new Set(prompts.flatMap((prompt) => prompt.platforms)).size;
const variantCount = prompts.reduce((sum, prompt) => sum + prompt.variants.length, 0);
const exampleCount = prompts.reduce((sum, prompt) => sum + prompt.variants.filter((variant) => variant.sample?.after).length, 0);
const categoryGroups = new Map();
for (const prompt of prompts) {
  const list = categoryGroups.get(prompt.category) ?? [];
  list.push(prompt);
  categoryGroups.set(prompt.category, list);
}

const extraStrings = {
  en: {
    totalVariants: "Single-image prompts",
    totalExamples: "Generated examples",
    totalCategories: "Categories",
    browseUseCases: "Browse by use case",
    browsePlatforms: "Browse by platform",
    mode: "Mode",
    category: "Category",
    useCases: "Use cases",
    styles: "Styles",
    backgrounds: "Backgrounds",
    assetPurpose: "Asset purpose",
    singlePrompts: "Ready-to-use single-image prompts",
    campaignPrompt: "Original campaign-set prompt",
    inputRequirements: "Input requirements",
    productInvariants: "Product invariants",
    policy: "Platform-policy status",
    provenance: "Provenance and rights",
    before: "Before",
    after: "After",
    fallback: "This title and description use the English fallback.",
  },
  zh: {
    totalVariants: "单图提示词",
    totalExamples: "生成示例",
    totalCategories: "商品品类",
    browseUseCases: "按用途浏览",
    browsePlatforms: "按平台浏览",
    mode: "生成模式",
    category: "商品品类",
    useCases: "使用场景",
    styles: "视觉风格",
    backgrounds: "背景类型",
    assetPurpose: "素材用途",
    singlePrompts: "可直接使用的单图提示词",
    campaignPrompt: "原始营销套图提示词",
    inputRequirements: "输入要求",
    productInvariants: "商品保真项",
    policy: "平台规则状态",
    provenance: "来源与版权",
    before: "改图前",
    after: "改图后",
    fallback: "本条标题和描述暂时回退为英文。",
  },
  "zh-TW": {
    totalVariants: "單圖提示詞", totalExamples: "生成範例", totalCategories: "商品品類", browseUseCases: "依用途瀏覽", browsePlatforms: "依平台瀏覽",
    mode: "生成模式", category: "商品品類", useCases: "使用情境", styles: "視覺風格", backgrounds: "背景類型", assetPurpose: "素材用途",
    singlePrompts: "可直接使用的單圖提示詞", campaignPrompt: "原始行銷套圖提示詞", inputRequirements: "輸入要求", productInvariants: "商品保真項",
    policy: "平台規則狀態", provenance: "來源與版權", before: "修改前", after: "修改後", fallback: "本條標題與說明暫時使用英文。",
  },
};

function stringsFor(locale) {
  return {...locale.strings, ...(extraStrings[locale.code] ?? extraStrings[locale.code.split("-")[0]] ?? extraStrings.en)};
}

function languageNav(current) {
  return locales.map((locale) => locale.code === current.code
    ? `<strong>${locale.name}</strong>`
    : `<a href="${locale.file}">${locale.name}</a>`).join(" · ");
}

function localizedPrompt(prompt, locale) {
  const translation = prompt.translations?.[locale.code] ?? prompt.translations?.[locale.code.split("-")[0]];
  return {
    title: translation?.title ?? prompt.title,
    description: translation?.description ?? prompt.description,
    translated: locale.code === "en" || Boolean(translation),
  };
}

function label(dimension, id, locale) {
  return localizedLabel(taxonomy, dimension, id, locale.code);
}

function labels(dimension, ids, locale) {
  return ids.map((id) => label(dimension, id, locale)).join(", ");
}

function sourceLink(prompt, s) {
  return prompt.source.url ? `[${prompt.source.type}](${prompt.source.url})` : s.original;
}

function authorLink(prompt) {
  return prompt.author.url ? `[${prompt.author.name}](${prompt.author.url})` : prompt.author.name;
}

function renderSample(variant, s) {
  if (!variant.sample.before) return "";
  return [
    "",
    "<table>",
    `<tr><th width="50%">${escapeHtml(s.before)}</th><th width="50%">${escapeHtml(s.after)}</th></tr>`,
    `<tr><td><img src="${escapeHtml(variant.sample.before)}" width="100%" alt="${escapeHtml(`${variant.sample.alt} before`)}"></td><td><img src="${escapeHtml(variant.sample.after)}" width="100%" alt="${escapeHtml(variant.sample.alt)}"></td></tr>`,
    "</table>",
  ].join("\n");
}

function renderVariant(variant, prompt, locale, index) {
  const s = stringsFor(locale);
  const summary = [
    `${index + 1}. ${variant.title}`,
    label("useCases", variant.useCase, locale),
    labels("platforms", variant.platforms, locale),
    variant.aspectRatio,
  ].join(" · ");
  return [
    "<details>",
    `<summary><strong>${escapeHtml(summary)}</strong></summary>`,
    "",
    `- **${s.assetPurpose}:** ${label("assetPurposes", variant.assetPurpose, locale)}`,
    `- **${s.backgrounds}:** ${label("backgrounds", variant.background, locale)}`,
    "",
    "```text",
    variant.prompt,
    "```",
    renderSample(variant, s),
    "",
    `_${escapeHtml(variant.sample.provenance)} License: ${escapeHtml(variant.sample.license)}._`,
    "",
    "</details>",
    "",
  ].filter((line, lineIndex, all) => line !== "" || all[lineIndex - 1] !== "").join("\n");
}

function renderPrompt(prompt, locale, index) {
  const s = stringsFor(locale);
  const localized = localizedPrompt(prompt, locale);
  const images = prompt.variants
    .filter((variant) => variant.sample?.after)
    .map((variant) => `<img src="${escapeHtml(variant.sample.after)}" width="31%" alt="${escapeHtml(variant.sample.alt)}">`)
    .join("\n");
  const references = prompt.source.references.length
    ? prompt.source.references.map((reference) => `- [${reference.type}](${reference.url})`).join("\n")
    : "";
  const translationNotice = localized.translated ? "" : `> ${s.fallback}`;

  return [
    `<a id="${prompt.id}"></a>`,
    "",
    `### ${index + 1}. ${localized.title}`,
    "",
    prompt.featured ? "⭐ **Featured**" : "",
    translationNotice,
    "",
    localized.description,
    "",
    '<p align="center">',
    images,
    "</p>",
    "",
    `| ${s.mode} | ${s.category} | ${s.useCases} | ${s.platforms} |`,
    "|---|---|---|---|",
    `| \`${prompt.mode}\` | ${escapeTable(label("categories", prompt.category, locale))} | ${escapeTable(labels("useCases", prompt.useCases, locale))} | ${escapeTable(labels("platforms", prompt.platforms, locale))} |`,
    "",
    `- **${s.styles}:** ${labels("styles", prompt.styles, locale)}`,
    `- **${s.backgrounds}:** ${labels("backgrounds", prompt.backgrounds, locale)}`,
    `- **${s.assetPurpose}:** ${label("assetPurposes", prompt.assetPurpose, locale)}`,
    `- **${s.inputRequirements}:** ${prompt.inputRequirements.instructions}`,
    "",
    `#### ${s.singlePrompts}`,
    "",
    ...prompt.variants.map((variant, variantIndex) => renderVariant(variant, prompt, locale, variantIndex)),
    `<details><summary><strong>${escapeHtml(s.campaignPrompt)}</strong></summary>`,
    "",
    "```text",
    prompt.prompt,
    "```",
    "",
    "</details>",
    "",
    `<details><summary><strong>${escapeHtml(s.productInvariants)}</strong></summary>`,
    "",
    ...prompt.productInvariants.map((item) => `- ${item}`),
    `- **Negative constraints:** ${prompt.negativePrompt}`,
    "",
    "</details>",
    "",
    `#### ${s.provenance}`,
    "",
    `| ${s.author} | ${s.source} | ${s.license} | ${s.published} |`,
    "|---|---|---|---|",
    `| ${escapeTable(authorLink(prompt))} | ${escapeTable(sourceLink(prompt, s))} | ${escapeTable(prompt.license)} | ${prompt.publishedAt} |`,
    "",
    prompt.source.notes,
    "",
    references,
    "",
    `> **${s.policy}:** ${prompt.platformPolicy.note}`,
    "",
    "---",
    "",
  ].filter((line, lineIndex, all) => line !== "" || all[lineIndex - 1] !== "").join("\n");
}

function renderFeatured(prompt, locale) {
  const localized = localizedPrompt(prompt, locale);
  const images = prompt.variants.map((variant) => `<img src="${escapeHtml(variant.sample.after)}" width="31%" alt="${escapeHtml(variant.sample.alt)}">`).join("\n");
  return [
    `### [${localized.title}](#${prompt.id})`,
    "",
    localized.description,
    "",
    '<p align="center">',
    images,
    "</p>",
    "",
  ].join("\n");
}

function countBy(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function render(locale) {
  const s = stringsFor(locale);
  const featured = prompts.filter((prompt) => prompt.featured);
  const categories = [...categoryGroups.entries()].sort(([a], [b]) => a.localeCompare(b));
  const categoryRows = categories.map(([category, entries]) => `| [${label("categories", category, locale)}](#category-${category}) | ${entries.length} |`).join("\n");
  const useCaseRows = countBy(prompts.flatMap((prompt) => prompt.useCases))
    .map(([id, count]) => `| ${label("useCases", id, locale)} | ${count} |`).join("\n");
  const platformRows = countBy(prompts.flatMap((prompt) => prompt.platforms))
    .map(([id, count]) => `| ${label("platforms", id, locale)} | ${count} |`).join("\n");
  const featuredBlocks = featured.map((prompt) => renderFeatured(prompt, locale)).join("\n");
  const allBlocks = categories.map(([category, entries]) => [
    `<a id="category-${category}"></a>`,
    "",
    `## ${label("categories", category, locale)}`,
    "",
    ...entries.map((prompt, index) => renderPrompt(prompt, locale, index)),
  ].join("\n")).join("\n");

  return [
    "<!-- AUTO-GENERATED FILE. EDIT data/prompts/*.json, data/taxonomy.json, OR scripts/i18n.mjs INSTEAD. -->",
    "",
    `<h1 align="center">${s.title}</h1>`,
    "",
    `<p align="center">${s.tagline}</p>`,
    "",
    `<p align="center"><img src="assets/cover.png" width="100%" alt="${escapeHtml(s.title)}"></p>`,
    "",
    '<p align="center">',
    '  <img alt="GPT Image 2" src="https://img.shields.io/badge/Model-GPT%20Image%202-2458ff">',
    `  <img alt="Prompt records" src="https://img.shields.io/badge/Prompt%20records-${prompts.length}-c7ff35">`,
    `  <img alt="Single image prompts" src="https://img.shields.io/badge/Single--image%20prompts-${variantCount}-18a999">`,
    '  <img alt="README locales" src="https://img.shields.io/badge/README%20locales-16-f4b942">',
    '  <img alt="License" src="https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey">',
    '  <a href="https://github.com/ecomimagelab/awesome-ecommerce-gpt-image-2/issues/new?template=submit-prompt.yml"><img alt="Submit a prompt" src="https://img.shields.io/badge/Submit-a%20prompt-c9ff3d"></a>',
    "</p>",
    "",
    `<p align="center">${languageNav(locale)}</p>`,
    "",
    `<p align="center"><a href="#browse">${s.categories}</a> · <a href="#featured">${s.featured}</a> · <a href="#all-prompts">${s.allPrompts}</a> · <a href="#contribute">${s.contribute}</a></p>`,
    "",
    "> [!IMPORTANT]",
    `> ${s.notice} Platform names indicate intended art direction, not guaranteed listing approval.`,
    "",
    '<a id="about"></a>',
    "",
    `## ${s.about}`,
    "",
    s.aboutText,
    "",
    "Each record keeps a campaign-set prompt for visual exploration and provides standalone, copy-ready prompts for individual assets. The schema also supports product-edit workflows with required product invariants and licensed Before/After evidence.",
    "",
    '<a id="statistics"></a>',
    "",
    `## ${s.statistics}`,
    "",
    `| ${s.totalPrompts} | ${s.totalVariants} | ${s.totalExamples} | ${s.totalCategories} | ${s.totalPlatforms} | ${s.lastUpdated} |`,
    "|---:|---:|---:|---:|---:|---|",
    `| **${prompts.length}** | **${variantCount}** | **${exampleCount}** | **${categoryGroups.size}** | **${platformCount}** | **${data.updatedAt.slice(0, 10)}** |`,
    "",
    '<a id="browse"></a>',
    "",
    `## ${s.categories}`,
    "",
    `| ${s.category} | ${s.totalPrompts} |`,
    "|---|---:|",
    categoryRows,
    "",
    `<details><summary><strong>${s.browseUseCases}</strong></summary>`,
    "",
    `| ${s.useCases} | ${s.totalPrompts} |`,
    "|---|---:|",
    useCaseRows,
    "",
    "</details>",
    "",
    `<details><summary><strong>${s.browsePlatforms}</strong></summary>`,
    "",
    `| ${s.platforms} | ${s.totalPrompts} |`,
    "|---|---:|",
    platformRows,
    "",
    "</details>",
    "",
    '<a id="featured"></a>',
    "",
    `## ${s.featured}`,
    "",
    featuredBlocks,
    '<a id="all-prompts"></a>',
    "",
    `## ${s.allPrompts}`,
    "",
    allBlocks,
    '<a id="contribute"></a>',
    "",
    `## ${s.contribute}`,
    "",
    s.contributeText,
    "",
    "- [Contribution guide](docs/CONTRIBUTING.md)",
    "- [Prompt authoring and QA standard](docs/PROMPT_AUTHORING_STANDARD.md)",
    "- [Taxonomy](docs/TAXONOMY.md)",
    "- [Automation and review flow](docs/AUTOMATION.md)",
    "- [Copyright and takedown policy](docs/COPYRIGHT.md)",
    "- [Visual research and prompt provenance](docs/VISUAL_RESEARCH.md)",
    "- [Editorial policy](docs/EDITORIAL_POLICY.md)",
    "- [Data schema](docs/DATA_SCHEMA.md)",
    "- [Local development](docs/LOCAL_DEVELOPMENT.md)",
    "",
    "## License",
    "",
    "Repository-authored content is licensed under [CC BY 4.0](LICENSE). Individual records and sample assets retain their recorded source, permission, and license metadata.",
    "",
  ].join("\n");
}

for (const locale of locales) {
  fs.writeFileSync(path.join(root, locale.file), render(locale), "utf8");
  console.log(`Generated ${locale.file}`);
}
