import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourcePath = path.join(root, "data", "prompts.json");
const outputDirectory = path.join(root, "data", "prompts");
const taxonomy = JSON.parse(fs.readFileSync(path.join(root, "data", "taxonomy.json"), "utf8"));
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

if (source.schemaVersion !== 1) {
  throw new Error(`Expected schemaVersion 1, received ${source.schemaVersion}. Refusing to overwrite v2 records.`);
}

const platformByLabel = new Map(taxonomy.platforms.map((entry) => [entry.label.en.toLowerCase(), entry.id]));
const styleByCategory = {
  beauty: ["luxury-premium", "minimalist-clean", "editorial"],
  fashion: ["editorial", "social-native", "outdoor-performance"],
  "consumer-electronics": ["minimalist-clean", "technical", "cinematic"],
  "food-and-beverage": ["food-editorial", "social-native", "natural-organic"],
  "home-and-furniture": ["architectural", "quiet-living", "editorial"],
  jewelry: ["luxury-premium", "dark-moody", "editorial"],
  footwear: ["outdoor-performance", "social-native", "editorial"],
  "kitchen-appliances": ["minimalist-clean", "quiet-living", "editorial"],
  "pet-supplies": ["natural-organic", "social-native", "minimalist-clean"],
  "outdoor-gear": ["outdoor-performance", "technical", "cinematic"],
  "automotive-accessories": ["technical", "minimalist-clean", "cinematic"],
  "toys-and-kids": ["bright-playful", "handmade-tactile", "quiet-living"],
  watches: ["luxury-premium", "dark-moody", "editorial"],
  "bags-and-accessories": ["luxury-premium", "editorial", "architectural"],
  "bedding-and-textiles": ["quiet-living", "natural-organic", "editorial"],
  "tea-and-grocery": ["natural-organic", "food-editorial", "social-native"],
  "garden-and-planters": ["handmade-tactile", "architectural", "natural-organic"],
  cycling: ["outdoor-performance", "technical", "social-native"],
};

function normalizePlatform(value) {
  const exact = platformByLabel.get(value.toLowerCase());
  if (exact) return exact;
  return value.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function section(prompt, names) {
  const line = prompt.split(/\r?\n/).find((entry) => names.some((name) => entry.toLowerCase().startsWith(`${name.toLowerCase()}:`)));
  return line ? line.slice(line.indexOf(":") + 1).trim() : "Keep the product design, proportions, materials, colors, and identity consistent.";
}

function panelSections(prompt) {
  return prompt.split(/\r?\n/).filter((line) => /^Panel\s+\d+\s+/i.test(line)).map((line, index) => {
    const colon = line.indexOf(":");
    const heading = (colon >= 0 ? line.slice(0, colon) : line)
      .replace(/^Panel\s+\d+\s+[^\p{L}\p{N}]+/iu, "")
      .trim();
    return {
      id: `variant-${index + 1}`,
      title: heading || `Variant ${index + 1}`,
      direction: colon >= 0 ? line.slice(colon + 1).trim() : line,
    };
  });
}

function inferUseCase(text, platforms = []) {
  const value = text.toLowerCase();
  const strictMarketplace = platforms.some((platform) => platform === "amazon" || platform.startsWith("amazon-"));
  if (strictMarketplace && /pure\s+(#ffffff|white)|main image|listing hero/.test(value)) return "main-image";
  if (/feature|airflow|exploded|detail/.test(value)) return "feature-callout";
  if (/macro|material editorial|textile editorial/.test(value)) return "detail-macro";
  if (/worn|lifestyle|interior|action|street style|playroom|bedroom|adventure|consumer scene|train compartment/.test(value)) return "lifestyle-scene";
  if (/tiktok|instagram|xiaohongshu|social|promo/.test(value)) return "social-ad";
  if (/catalog/.test(value)) return "catalog-image";
  return "branded-hero";
}

function inferPurpose(useCase) {
  if (useCase === "main-image") return "main-image";
  if (useCase === "catalog-image") return "catalog-image";
  if (["feature-callout", "detail-macro", "a-plus-content"].includes(useCase)) return "secondary-image";
  if (useCase === "social-ad") return "social-creative";
  return "branded-hero";
}

function inferBackground(text) {
  const value = text.toLowerCase();
  if (/pure\s+(#ffffff|white)/.test(value)) return "pure-white";
  if (/\b(outdoor|road|mountain|desert|rain|gravel|alpine)\b/.test(value)) return "outdoor-location";
  if (/\b(black|dark|obsidian|navy|night)\b/.test(value)) return "dark-studio";
  if (/kitchen|bedroom|living room|playroom|interior/.test(value)) return "home-interior";
  if (/\b(street|train|worn|consumer|table|car)\b/.test(value)) return "lifestyle-location";
  if (/stone|marble|travertine|wood|silk|linen|resin|onyx/.test(value)) return "natural-material";
  if (/color|gradient|acrylic|graphic/.test(value)) return "color-studio";
  return "soft-studio";
}

function platformsForPanel(panel, allPlatforms) {
  const haystack = `${panel.title} ${panel.direction}`.toLowerCase();
  const matches = taxonomy.platforms
    .filter((entry) => haystack.includes(entry.label.en.toLowerCase()) || haystack.includes(entry.id.replaceAll("-", " ")))
    .map((entry) => entry.id)
    .filter((id) => allPlatforms.includes(id));
  return matches.length ? [...new Set(matches)] : [allPlatforms[Math.min(Number(panel.id.slice(-1)) - 1, allPlatforms.length - 1)]];
}

function singleImagePrompt({invariant, direction, style, constraints, ratio}) {
  return standaloneWording([
    `Create one standalone ${ratio} e-commerce image, not a collage, contact sheet, split screen, or multi-panel layout.`,
    `Product specification and invariants: ${invariant}`,
    `Art direction: ${direction}`,
    `Photography and rendering: ${style}`,
    `Quality and safety constraints: ${constraints}`,
  ].join("\n"));
}

function standaloneWording(value) {
  return String(value)
    .replace(/\bin every panel\b/gi, "in this output")
    .replace(/\bin all panels\b/gi, "in this output")
    .replace(/\bacross all three panels\b/gi, "in this output")
    .replace(/\bacross all panels\b/gi, "in this output")
    .replace(/\bfilling most of the panel\b/gi, "filling most of the frame")
    .replace(/\bno panel labels or numbers\b/gi, "no added layout labels or numbers")
    .replace(/\bno panel numbers\b/gi, "no added layout labels or numbers")
    .replace(/\bpanel labels, or numbers\b/gi, "added layout labels, or numbers")
    .replace(/\bpanel 1 must show one phone only\b/gi, "show only the explicitly requested phone view")
    .replace(/\bexcept the intentionally falling chili flakes in panel 3\b/gi, "unless falling chili flakes are explicitly requested in the art direction")
    .replace(/\bthe three panels must look intentionally different while preserving the exact same product\b/gi, "preserve the exact specified product");
}

fs.mkdirSync(outputDirectory, {recursive: true});

for (const legacy of source.prompts) {
  const invariant = section(legacy.prompt, ["subject invariant", "product invariant", "design invariant"]);
  const style = section(legacy.prompt, ["style/medium", "style"]);
  const constraints = section(legacy.prompt, ["constraints"]);
  const allPlatforms = legacy.platforms.map(normalizePlatform);
  const panels = panelSections(legacy.prompt);
  if (panels.length !== legacy.previews.length) {
    throw new Error(`${legacy.id} has ${panels.length} panels but ${legacy.previews.length} previews`);
  }

  const variants = panels.map((panel, index) => {
    const combined = `${panel.title} ${panel.direction}`;
    const panelPlatforms = platformsForPanel(panel, allPlatforms);
    const useCase = inferUseCase(combined, panelPlatforms);
    return {
      id: panel.id,
      title: panel.title,
      useCase,
      assetPurpose: inferPurpose(useCase),
      platforms: panelPlatforms,
      background: inferBackground(combined),
      aspectRatio: legacy.aspectRatios[0],
      prompt: singleImagePrompt({invariant, direction: panel.direction, style, constraints, ratio: legacy.aspectRatios[0]}),
      sample: {
        before: null,
        after: legacy.previews[index].url,
        alt: legacy.previews[index].alt,
        license: legacy.license,
        provenance: "Generated specifically for this repository from the corresponding prompt direction; no third-party preview image is redistributed.",
      },
    };
  });

  const record = {
    $schema: "../schema.json",
    schemaVersion: 2,
    id: legacy.id,
    slug: legacy.slug,
    model: legacy.model,
    title: legacy.title,
    description: legacy.description,
    prompt: legacy.prompt,
    language: legacy.language,
    mode: "text-to-image",
    category: legacy.industry,
    useCases: [...new Set(variants.map((variant) => variant.useCase))],
    styles: styleByCategory[legacy.industry] ?? ["editorial", "minimalist-clean"],
    backgrounds: [...new Set(variants.map((variant) => variant.background))],
    platforms: allPlatforms,
    aspectRatios: legacy.aspectRatios,
    assetPurpose: "campaign-set",
    inputRequirements: {
      referenceImages: 0,
      instructions: "No reference image is required. This record defines a fictional, unbranded product; use product-edit mode for real inventory.",
    },
    productInvariants: [invariant],
    negativePrompt: constraints,
    variants,
    author: legacy.author,
    source: {
      type: legacy.source.type,
      url: legacy.source.url,
      permission: "repository-authored",
      notes: legacy.source.notes,
      references: [{type: "visual-research", url: "docs/VISUAL_RESEARCH.md"}],
    },
    license: legacy.license,
    platformPolicy: {
      status: "design-guidance-only",
      note: "Platform names describe intended art direction only. Verify the current official rules for the product category before publishing.",
      reviewedAt: null,
      sources: [],
    },
    review: {
      status: legacy.status,
      rights: "reviewed",
      promptQuality: "reviewed",
      previewQuality: "reviewed",
      reviewedAt: legacy.publishedAt,
    },
    featured: Boolean(legacy.featured),
    publishedAt: legacy.publishedAt,
    translations: legacy.translations ?? {},
  };

  const fileName = `${record.id}-${record.slug}.json`;
  fs.writeFileSync(path.join(outputDirectory, fileName), `${JSON.stringify(record, null, 2)}\n`, "utf8");
  console.log(`Migrated ${record.id} to data/prompts/${fileName}`);
}
