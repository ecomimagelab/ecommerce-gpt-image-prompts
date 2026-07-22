# Local Development

This phase is GitHub-first. No website, database, login system, hosting account,
or image-generation API is required.

## Requirements

- Git;
- Node.js 20 or newer;
- npm bundled with Node.js.

## Install and verify

```bash
npm ci
npm run generate
npm run validate
npm run check
```

`npm run generate` performs two deterministic operations:

1. combines `data/prompts/*.json` into `data/prompts.json`;
2. generates all 16 `README*.md` editions.

`npm run validate` checks:

- prompt IDs, slugs, filenames, and duplicates;
- controlled taxonomy references;
- product-edit reference and Before-image requirements;
- source types, permissions, licenses, and research references;
- platform-policy review metadata;
- local image existence, PNG signatures, dimensions, and aspect ratios;
- translation locale IDs;
- freshness of the generated aggregate index.

## Add a prompt manually for development

1. Copy a v2 record in `data/prompts/`.
2. Assign the next stable `ec-####` ID and a unique slug.
3. Rename the file to `<id>-<slug>.json`.
4. Use IDs from `data/taxonomy.json`.
5. Add lawful preview assets to `assets/prompts/<family>/`.
6. Run `npm run generate` and `npm run validate`.

Community content should still use the Issue workflow so its review history is
preserved.

## Generated-file rule

Never edit these files by hand:

- `data/prompts.json`;
- `README.md`;
- `README_*.md`.

CI regenerates them and fails when committed views are stale.

## Windows PowerShell

If PowerShell blocks `npm.ps1`, use the executable shim:

```powershell
npm.cmd run generate
npm.cmd run validate
npm.cmd run check
```

