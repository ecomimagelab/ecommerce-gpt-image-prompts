import {writeIndex} from "./lib/catalog.mjs";

const data = writeIndex();
console.log(`Built data/prompts.json from ${data.promptCount} records and ${data.variantCount} variants.`);
