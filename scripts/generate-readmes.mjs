import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {locales} from "./i18n.mjs";
import {approvedPrompts, buildIndex, loadPrompts, loadTaxonomy, localizedLabel} from "./lib/catalog.mjs";

const root = process.cwd();
const taxonomy = loadTaxonomy();
const prompts = approvedPrompts();
const data = buildIndex(loadPrompts());

const REPO_URL = "https://github.com/ecomimagelab/ecommerce-gpt-image-prompts";
const PIXPIX_URL = "https://www.pixpix.com/";
const SUBMIT_URL = `${REPO_URL}/issues/new?template=submit-prompt.yml`;
const FEATURED_LIMIT = 6;

const escapeTable = (value) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");
const entryKey = (entry) => `${entry.prompt.id}-${entry.variant.id}`;

const platformCount = new Set(prompts.flatMap((prompt) => prompt.platforms)).size;
const variantCount = prompts.reduce((sum, prompt) => sum + prompt.variants.length, 0);
const exampleCount = prompts.reduce((sum, prompt) => sum + prompt.variants.filter((variant) => variant.sample?.after).length, 0);
const categoryGroups = new Map();
for (const prompt of prompts) {
  const list = categoryGroups.get(prompt.category) ?? [];
  list.push(prompt);
  categoryGroups.set(prompt.category, list);
}

const entries = prompts
  .flatMap((prompt) => prompt.variants.map((variant, variantIndex) => ({prompt, variant, variantIndex})))
  .sort((a, b) => b.prompt.publishedAt.localeCompare(a.prompt.publishedAt)
    || b.prompt.id.localeCompare(a.prompt.id)
    || a.variantIndex - b.variantIndex);
const featuredEntries = entries
  .filter((entry) => entry.prompt.featured
    && entry.variant.id === (entry.prompt.featuredVariantId ?? entry.prompt.variants[0].id))
  .slice(0, FEATURED_LIMIT);
const featuredKeys = new Set(featuredEntries.map(entryKey));

const extraStrings = {
  en: {
    totalVariants: "Total prompts",
    totalExamples: "Generated preview images",
    totalCategories: "Industries",
    productCollections: "Product collections",
    browseUseCases: "Use Cases",
    browsePlatforms: "Platforms",
    mode: "Mode",
    category: "Industry",
    useCases: "Use cases",
    styles: "Styles",
    backgrounds: "Backgrounds",
    assetPurpose: "Asset purpose",
    inputRequirements: "Input requirements",
    productInvariants: "Product invariants",
    policy: "Platform-policy status",
    provenance: "Provenance and rights",
    before: "Before",
    after: "After",
    fallback: "This title and description use the English fallback.",
    metric: "Metric",
    count: "Count",
    languageLabel: "Languages",
    aspectRatio: "Aspect ratio",
    promptCollection: "Product collection",
    negativeConstraints: "Negative constraints",
  },
  zh: {
    totalVariants: "提示词总数",
    totalExamples: "生成预览图",
    totalCategories: "商品行业",
    productCollections: "商品系列",
    browseUseCases: "使用场景",
    browsePlatforms: "电商平台",
    mode: "生成模式",
    category: "商品行业",
    useCases: "使用场景",
    styles: "视觉风格",
    backgrounds: "背景类型",
    assetPurpose: "素材用途",
    inputRequirements: "输入要求",
    productInvariants: "商品保真项",
    policy: "平台规则状态",
    provenance: "来源与版权",
    before: "修改前",
    after: "修改后",
    fallback: "本条标题和描述暂时使用英文版本。",
    metric: "指标",
    count: "数量",
    languageLabel: "语言",
    aspectRatio: "宽高比",
    promptCollection: "商品系列",
    negativeConstraints: "负面约束",
  },
  "zh-TW": {
    totalVariants: "提示詞總數",
    totalExamples: "生成預覽圖",
    totalCategories: "商品產業",
    productCollections: "商品系列",
    browseUseCases: "使用情境",
    browsePlatforms: "電商平台",
    mode: "生成模式",
    category: "商品產業",
    useCases: "使用情境",
    styles: "視覺風格",
    backgrounds: "背景類型",
    assetPurpose: "素材用途",
    inputRequirements: "輸入要求",
    productInvariants: "商品保真項",
    policy: "平台規則狀態",
    provenance: "來源與版權",
    before: "修改前",
    after: "修改後",
    fallback: "本條標題和說明暫時使用英文版本。",
    metric: "指標",
    count: "數量",
    languageLabel: "語言",
    aspectRatio: "寬高比",
    promptCollection: "商品系列",
    negativeConstraints: "負面約束",
  },
};

function stringsFor(locale) {
  return {...locale.strings, ...(extraStrings[locale.code] ?? extraStrings[locale.code.split("-")[0]] ?? extraStrings.en)};
}

function shieldPart(value) {
  return encodeURIComponent(String(value).replaceAll("-", "--").replaceAll(" ", "_"));
}

function badge(labelText, message, color) {
  const alt = `${labelText}-${message}`;
  return `![${alt}](https://img.shields.io/badge/${shieldPart(labelText)}-${shieldPart(message)}-${color})`;
}

function languageNav(current, s) {
  return locales.map((locale) => {
    const isCurrent = locale.code === current.code;
    const labelText = isCurrent ? s.current : s.view;
    const color = isCurrent ? "brightgreen" : "lightgrey";
    return `[![${locale.name}](https://img.shields.io/badge/${shieldPart(locale.name)}-${shieldPart(labelText)}-${color})](${locale.file})`;
  }).join(" ");
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

function renderGeneratedImages(entry, locale) {
  const {variant} = entry;
  const s = stringsFor(locale);
  const blocks = [];

  if (variant.sample?.before) {
    blocks.push(
      `##### ${s.before}`,
      "",
      `![${escapeHtml(`${variant.sample.alt} before`)}](${variant.sample.before})`,
      "",
    );
  }

  if (variant.sample?.after) {
    blocks.push(
      `##### ${s.image} 1`,
      "",
      `![${escapeHtml(variant.sample.alt)}](${variant.sample.after})`,
      "",
    );
  }

  return blocks.join("\n");
}

function renderProductionDetails(entry, locale) {
  const {prompt, variant} = entry;
  const s = stringsFor(locale);
  const references = prompt.source.references ?? [];
  const collectionFile = `data/prompts/${prompt.id}-${prompt.slug}.json`;

  return [
    "<details>",
    `<summary><strong>${escapeHtml(s.productionDetails)}</strong></summary>`,
    "",
    `| ${s.mode} | ${s.category} | ${s.useCases} | ${s.aspectRatio} |`,
    "|---|---|---|---|",
    `| \`${prompt.mode}\` | ${escapeTable(label("categories", prompt.category, locale))} | ${escapeTable(label("useCases", variant.useCase, locale))} | ${escapeTable(variant.aspectRatio)} |`,
    "",
    `- **${s.styles}:** ${labels("styles", prompt.styles, locale)}`,
    `- **${s.backgrounds}:** ${label("backgrounds", variant.background, locale)}`,
    `- **${s.assetPurpose}:** ${label("assetPurposes", variant.assetPurpose, locale)}`,
    `- **${s.inputRequirements}:** ${prompt.inputRequirements.instructions}`,
    `- **${s.productInvariants}:**`,
    ...prompt.productInvariants.map((item) => `  - ${item}`),
    `- **${s.negativeConstraints}:** ${prompt.negativePrompt}`,
    "",
    `**${s.provenance}**`,
    "",
    variant.sample?.provenance ? `- ${variant.sample.provenance}` : "",
    prompt.source.notes ? `- ${prompt.source.notes}` : "",
    ...references.map((reference) => `- [${reference.type}](${reference.url})`),
    `- **${s.policy}:** ${prompt.platformPolicy.note}`,
    `- **${s.promptCollection}:** [${prompt.id}](${collectionFile})`,
    "",
    "</details>",
    "",
  ].filter((line, index, all) => line !== "" || all[index - 1] !== "").join("\n");
}

function renderEntry(entry, locale, number, section) {
  const {prompt, variant} = entry;
  const s = stringsFor(locale);
  const localized = localizedPrompt(prompt, locale);
  const isFeatured = featuredKeys.has(entryKey(entry));
  const translationNotice = localized.translated ? "" : `> ${s.fallback}`;
  const platformMessage = variant.platforms.length === 1
    ? label("platforms", variant.platforms[0], locale)
    : `${label("platforms", variant.platforms[0], locale)} +${variant.platforms.length - 1}`;
  const badges = [
    badge("Language", prompt.language.toUpperCase(), "blue"),
    isFeatured ? badge("⭐", s.featuredBadge, "gold") : "",
    badge("Platform", platformMessage, "6857ff"),
  ].filter(Boolean).join(" ");
  const title = `${label("categories", prompt.category, locale)} — ${localized.title}: ${variant.title}`;

  return [
    `<a id="${section}-${prompt.id}-${variant.id}"></a>`,
    "",
    `### ${s.number} ${number}: ${title}`,
    "",
    badges,
    "",
    `#### ${s.description}`,
    "",
    localized.description,
    "",
    translationNotice,
    translationNotice ? "" : "",
    `**${label("useCases", variant.useCase, locale)} · ${labels("platforms", variant.platforms, locale)} · ${variant.aspectRatio}**`,
    "",
    `#### ${s.prompt}`,
    "",
    "```text",
    variant.prompt,
    "```",
    "",
    `#### ${s.previews}`,
    "",
    renderGeneratedImages(entry, locale),
    `#### ${s.details}`,
    "",
    `- **${s.author}:** ${authorLink(prompt)}`,
    `- **${s.source}:** ${sourceLink(prompt, s)}`,
    `- **${s.published}:** ${prompt.publishedAt}`,
    `- **${s.languageLabel}:** ${prompt.language}`,
    `- **${s.platforms}:** ${labels("platforms", variant.platforms, locale)}`,
    `- **${s.license}:** ${variant.sample?.license ?? prompt.license}`,
    "",
    renderProductionDetails(entry, locale),
    `**[🚀 ${s.tryItNow} →](${PIXPIX_URL})**`,
    "",
    "---",
    "",
  ].filter((line, index, all) => line !== "" || all[index - 1] !== "").join("\n");
}

function countBy(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function browseLinkLine(title, dimension, items, locale) {
  const links = items.map(([id]) => `[${label(dimension, id, locale)}](#${dimension.toLowerCase()}-${id})`);
  return [`- **${title}**`, `  - ${links.join(" · ")}`].join("\n");
}

function renderEntryList(list, locale, section, includeBrowseAnchors = false) {
  const seenCategories = new Set();
  const seenUseCases = new Set();
  const seenPlatforms = new Set();
  const blocks = [];

  list.forEach((entry, index) => {
    if (includeBrowseAnchors) {
      if (!seenCategories.has(entry.prompt.category)) {
        blocks.push(`<a id="categories-${entry.prompt.category}"></a>`, "");
        seenCategories.add(entry.prompt.category);
      }
      if (!seenUseCases.has(entry.variant.useCase)) {
        blocks.push(`<a id="usecases-${entry.variant.useCase}"></a>`, "");
        seenUseCases.add(entry.variant.useCase);
      }
      for (const platform of entry.prompt.platforms) {
        if (!seenPlatforms.has(platform)) {
          blocks.push(`<a id="platforms-${platform}"></a>`, "");
          seenPlatforms.add(platform);
        }
      }
    }
    blocks.push(renderEntry(entry, locale, index + 1, section));
  });

  return blocks.join("\n");
}

function render(locale) {
  const s = stringsFor(locale);
  const categories = [...categoryGroups.entries()].sort(([a], [b]) => a.localeCompare(b));
  const useCases = countBy(entries.map((entry) => entry.variant.useCase));
  const platforms = countBy(prompts.flatMap((prompt) => prompt.platforms));
  const pixPixTable = [
    `| ${s.feature} | GitHub README | PixPix |`,
    "|---|---|---|",
    `| ${s.promptLibrary} | ${s.curatedPromptDetails} | ${s.copyPromptToCreate} |`,
    `| ${s.aiGeneration} | — | ${s.imageAndVideoTools} |`,
    `| ${s.ecommerceWorkflow} | ${s.platformMetadata} | ${s.productSetsAndAPlus} |`,
    `| ${s.productEditing} | ${s.beforeAfterEvidence} | ${s.editingWorkflows} |`,
  ].join("\n");

  return [
    "<!-- AUTO-GENERATED FILE. EDIT data/prompts/*.json, data/taxonomy.json, scripts/i18n.mjs, OR scripts/generate-readmes.mjs INSTEAD. -->",
    "",
    "# ecommerce-gpt-image-prompts",
    "",
    `[![Awesome](https://awesome.re/badge.svg)](https://github.com/sindresorhus/awesome) [![GitHub stars](https://img.shields.io/github/stars/ecomimagelab/ecommerce-gpt-image-prompts?style=social)](${REPO_URL}) [![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](LICENSE) [![Daily update](${REPO_URL}/actions/workflows/update-readmes.yml/badge.svg)](${REPO_URL}/actions/workflows/update-readmes.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/CONTRIBUTING.md)`,
    "",
    `> ${s.tagline}`,
    "",
    `> ⚠️ **${s.copyrightTitle}:** ${s.copyrightNotice} [${s.reportContent}](${REPO_URL}/issues/new?template=copyright-report.yml).`,
    "",
    "---",
    "",
    languageNav(locale, s),
    "",
    "---",
    "",
    '<a id="try-in-pixpix"></a>',
    "",
    `## ✨ ${s.tryInPixPix}`,
    "",
    `[![ecommerce-gpt-image-prompts cover](assets/cover.png)](${PIXPIX_URL})`,
    "",
    `**[🚀 ${s.openPixPix}](${PIXPIX_URL})**`,
    "",
    s.pixPixIntro,
    "",
    `### ${s.whyPixPix}`,
    "",
    pixPixTable,
    "",
    `### 🗂️ ${s.browseByCategory}`,
    "",
    browseLinkLine(s.totalCategories, "categories", categories, locale),
    browseLinkLine(s.browseUseCases, "useCases", useCases, locale),
    browseLinkLine(s.browsePlatforms, "platforms", platforms, locale),
    "",
    "---",
    "",
    '<a id="table-of-contents"></a>',
    "",
    `## ${s.tableOfContents}`,
    "",
    `- [✨ ${s.tryInPixPix}](#try-in-pixpix)`,
    `- [${s.whatIsLibrary}](#what-is-library)`,
    `- [${s.statistics}](#statistics)`,
    `- [${s.featured}](#featured-prompts)`,
    `- [${s.allPrompts}](#all-prompts)`,
    `- [${s.howToContribute}](#how-to-contribute)`,
    `- [${s.license}](#license)`,
    `- [${s.acknowledgements}](#acknowledgements)`,
    `- [⭐ ${s.starHistory}](#star-history)`,
    "",
    "---",
    "",
    '<a id="what-is-library"></a>',
    "",
    `## ${s.whatIsLibrary}`,
    "",
    s.aboutText,
    "",
    s.libraryWorkflowText,
    "",
    `- **${s.reproduciblePrompts}** — ${s.reproduciblePromptsText}`,
    `- **${s.platformNativeDirection}** — ${s.platformNativeDirectionText}`,
    `- **${s.productConsistency}** — ${s.productConsistencyText}`,
    `- **${s.previewEvidence}** — ${s.previewEvidenceText}`,
    `- **${s.rightsMetadata}** — ${s.rightsMetadataText}`,
    "",
    "---",
    "",
    '<a id="statistics"></a>',
    "",
    `## ${s.statistics}`,
    "",
    `| ${s.metric} | ${s.count} |`,
    "|---|---:|",
    `| ${s.totalVariants} | **${variantCount}** |`,
    `| ${s.productCollections} | **${prompts.length}** |`,
    `| ⭐ ${s.featured} | **${featuredEntries.length}** |`,
    `| ${s.totalExamples} | **${exampleCount}** |`,
    `| ${s.totalCategories} | **${categoryGroups.size}** |`,
    `| ${s.totalPlatforms} | **${platformCount}** |`,
    `| ${s.lastUpdated} | **${data.updatedAt.slice(0, 10)}** |`,
    "",
    "---",
    "",
    '<a id="featured-prompts"></a>',
    "",
    `## ${s.featured}`,
    "",
    `> ⭐ ${s.handPicked}`,
    "",
    renderEntryList(featuredEntries, locale, "featured"),
    '<a id="all-prompts"></a>',
    "",
    `## ${s.allPrompts}`,
    "",
    `> ${s.sortedNewest}`,
    "",
    renderEntryList(entries, locale, "prompt", true),
    '<a id="how-to-contribute"></a>',
    "",
    `## ${s.howToContribute}`,
    "",
    s.contributeText,
    "",
    `1. [**${s.submitNewPrompt}**](${SUBMIT_URL}).`,
    `2. ${s.completeIssueForm}`,
    `3. ${s.waitForReview}`,
    `4. ${s.approvedSync}`,
    "",
    `**${s.contributionNote}:** ${s.issueOnlyNote}`,
    "",
    "- [Contribution guide](docs/CONTRIBUTING.md)",
    "- [Prompt authoring and QA standard](docs/PROMPT_AUTHORING_STANDARD.md)",
    "- [Copyright and takedown policy](docs/COPYRIGHT.md)",
    "- [Automation and review flow](docs/AUTOMATION.md)",
    "- [Local development](docs/LOCAL_DEVELOPMENT.md)",
    "",
    "---",
    "",
    '<a id="license"></a>',
    "",
    `## ${s.license}`,
    "",
    s.licenseText,
    "",
    "---",
    "",
    '<a id="acknowledgements"></a>',
    "",
    `## ${s.acknowledgements}`,
    "",
    `- [PixPix](${PIXPIX_URL}) — ${s.pixPixAcknowledgement}`,
    `- [YouMind-OpenLab/awesome-gpt-image-2](https://github.com/YouMind-OpenLab/awesome-gpt-image-2) — ${s.referenceAcknowledgement}`,
    "- [Open-source visual research](docs/VISUAL_RESEARCH.md)",
    "",
    "---",
    "",
    '<a id="star-history"></a>',
    "",
    `## ⭐ ${s.starHistory}`,
    "",
    `[![Star History Chart](https://api.star-history.com/svg?repos=ecomimagelab/ecommerce-gpt-image-prompts&type=Date)](https://star-history.com/#ecomimagelab/ecommerce-gpt-image-prompts&Date)`,
    "",
    "---",
    "",
    `**[🚀 ${s.tryInPixPix}](${PIXPIX_URL})** • **[${s.submitNewPrompt}](${SUBMIT_URL})** • **[⭐ ${s.starThisRepo}](${REPO_URL})**`,
    "",
    `${s.autoGenerated} ${data.updatedAt}`,
    "",
  ].join("\n");
}

for (const locale of locales) {
  fs.writeFileSync(path.join(root, locale.file), render(locale), "utf8");
  console.log(`Generated ${locale.file}`);
}
