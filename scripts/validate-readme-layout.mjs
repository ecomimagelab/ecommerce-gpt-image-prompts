import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {locales} from "./i18n.mjs";
import {approvedPrompts} from "./lib/catalog.mjs";

const root = process.cwd();
const pixPixUrl = "https://www.pixpix.com/";
const prompts = approvedPrompts();
const entryCount = prompts.reduce((sum, prompt) => sum + prompt.variants.length, 0);
const featuredCount = Math.min(6, prompts.filter((prompt) => prompt.featured).length);
const requiredSectionIds = [
  "try-in-pixpix",
  "table-of-contents",
  "what-is-library",
  "statistics",
  "featured-prompts",
  "all-prompts",
  "how-to-contribute",
  "license",
  "acknowledgements",
  "star-history",
];

const failures = [];

for (const locale of locales) {
  const filePath = path.join(root, locale.file);
  if (!fs.existsSync(filePath)) {
    failures.push(`${locale.file}: missing generated README`);
    continue;
  }

  const markdown = fs.readFileSync(filePath, "utf8");
  let lastSectionIndex = -1;
  for (const id of requiredSectionIds) {
    const marker = `<a id="${id}"></a>`;
    const sectionIndex = markdown.indexOf(marker);
    if (sectionIndex === -1) failures.push(`${locale.file}: missing section ${id}`);
    if (sectionIndex !== -1 && sectionIndex < lastSectionIndex) failures.push(`${locale.file}: section ${id} is out of order`);
    if (sectionIndex !== -1) lastSectionIndex = sectionIndex;
  }

  const numberedEntries = markdown.match(/^### No\. \d+:/gm)?.length ?? 0;
  if (numberedEntries !== entryCount + featuredCount) {
    failures.push(`${locale.file}: expected ${entryCount + featuredCount} visible prompt entries, found ${numberedEntries}`);
  }

  const pixPixLinks = markdown.split(pixPixUrl).length - 1;
  if (pixPixLinks < entryCount + featuredCount + 4) {
    failures.push(`${locale.file}: expected PixPix links for every prompt entry and page CTA, found ${pixPixLinks}`);
  }

  if (!markdown.includes(`[![ecommerce-gpt-image-prompts cover](assets/cover.png)](${pixPixUrl})`)) {
    failures.push(`${locale.file}: cover is not linked to PixPix`);
  }
  if (!markdown.includes(`[![${locale.name}](`)) failures.push(`${locale.file}: current locale badge is missing`);
  if (markdown.includes("youmind.com/gpt-image-2-prompts")) failures.push(`${locale.file}: contains the old immediate-experience destination`);
  if (markdown.includes("undefined")) failures.push(`${locale.file}: contains an undefined generated value`);
}

for (const prompt of prompts) {
  for (const variant of prompt.variants) {
    for (const imagePath of [variant.sample?.before, variant.sample?.after].filter(Boolean)) {
      const absolutePath = path.join(root, imagePath);
      if (!fs.existsSync(absolutePath)) failures.push(`${prompt.id}/${variant.id}: missing preview ${imagePath}`);
    }
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${locales.length} README editions, ${entryCount} prompt entries, and PixPix experience links.`);
