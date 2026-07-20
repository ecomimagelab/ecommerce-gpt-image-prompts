# Local Development

The repository uses Node.js standard-library scripts and has no runtime
dependencies, database, CMS, or web application.

## Requirements

- Git
- Node.js 20 or newer
- npm, included with Node.js

## Install

No dependency installation is required for the current scripts. Running
`npm install` is optional and only creates a lockfile.

## Validate data

```bash
npm run validate
```

Validation checks required fields, IDs, slugs, preview counts, local asset
paths, source types, status values, and duplicate records.

## Generate all README editions

```bash
npm run generate
```

This writes:

- `README.md`
- `README_zh.md`
- `README_zh-TW.md`
- 13 additional localized README files

Do not edit generated README files directly.

## Full consistency check

```bash
npm run check
```

This validates data, regenerates README files, and fails if generated output
differs from committed output.

## Add a prompt manually

Maintainers may add a reviewed record directly to `data/prompts.json`:

1. copy an existing record;
2. assign the next stable `ec-XXXX` ID;
3. choose a unique slug;
4. add at least two preview images;
5. record author, source, and license;
6. set `status` to `approved` only after review;
7. update top-level `updatedAt`;
8. run validation and generation.

Normal community contributions should use the Issue form and `approved` label
workflow instead.

## Test the approval parser locally

Save a GitHub `issues.labeled` webhook payload to a local JSON file, then run:

```bash
GITHUB_EVENT_PATH=./work/example-event.json node scripts/sync-approved-issue.mjs
```

On PowerShell:

```powershell
$env:GITHUB_EVENT_PATH = ".\work\example-event.json"
node scripts\sync-approved-issue.mjs
```

Use a disposable copy of `data/prompts.json` when testing because the script
adds an approved record.

