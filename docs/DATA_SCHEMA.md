# Prompt Data Schema v2

The canonical database is the set of individual JSON files in
`data/prompts/`. `data/prompts.json` is a generated compatibility index and
must not be edited by hand.

The v2 model is designed for both visual exploration and seller production:

- one file per prompt record, which reduces pull-request conflicts;
- one campaign-set prompt plus one or more standalone image variants;
- controlled category, use-case, style, background, purpose, and platform IDs;
- explicit `text-to-image` or `product-edit` mode;
- product invariants and input requirements;
- optional Before/After evidence attached to each variant;
- asset-level provenance and license metadata;
- a separate platform-policy status that never implies guaranteed approval.

## Files

```text
data/
  schema.json                         # machine-readable record schema
  taxonomy.json                       # controlled IDs and localized labels
  prompts/
    ec-0001-example-slug.json         # canonical record
  prompts.json                        # generated aggregate index
```

The canonical filename is `<id>-<slug>.json`. The validator rejects a filename
that does not match the record.

## Core record

| Field | Type | Purpose |
|---|---|---|
| `$schema` | string | Must be `../schema.json`. |
| `schemaVersion` | number | Must be `2`. |
| `id` | string | Stable ID such as `ec-0001`. |
| `slug` | string | Unique lowercase kebab-case identifier. |
| `model` | string | Currently `gpt-image-2`. |
| `title`, `description` | string | Base-language editorial metadata. |
| `prompt` | string | Original campaign-set or primary prompt. |
| `language` | string | Language of the reproducible prompt text. |
| `mode` | enum | `text-to-image` or `product-edit`. |
| `category` | string | One controlled category ID. |
| `useCases` | string[] | One or more controlled use-case IDs. |
| `styles` | string[] | One to three controlled style IDs. |
| `backgrounds` | string[] | Controlled background IDs represented by the variants. |
| `platforms` | string[] | Intended platform art directions. |
| `aspectRatios` | string[] | Recommended output ratios. |
| `assetPurpose` | string | Primary purpose of the complete record. |
| `inputRequirements` | object | Reference-image count and preparation instructions. |
| `productInvariants` | string[] | Product attributes that must not be changed. |
| `negativePrompt` | string | Prohibited changes and known failure modes. |
| `variants` | object[] | Standalone prompts with corresponding examples. |
| `author`, `source`, `license` | object/string | Authorship, permission, provenance, and license. |
| `platformPolicy` | object | Policy-review state and official source URLs. |
| `review` | object | Rights, prompt, preview, and publication review state. |
| `translations` | object | Localized title and description when available. |

## Standalone variant

Each `variants[]` entry contains:

```json
{
  "id": "variant-1",
  "title": "AMAZON CATALOG",
  "useCase": "main-image",
  "assetPurpose": "main-image",
  "platforms": ["amazon"],
  "background": "pure-white",
  "aspectRatio": "4:5",
  "prompt": "Create one standalone ...",
  "sample": {
    "before": null,
    "after": "assets/prompts/example/preview-1.png",
    "alt": "Accessible image description",
    "license": "CC-BY-4.0",
    "provenance": "Generated specifically for this repository ..."
  }
}
```

For `product-edit`, every variant requires a lawful `before` asset and the
record must request at least one reference image. For `text-to-image`, `before`
may be `null`.

## Platform policy status

`design-guidance-only` means platform names describe an intended creative
treatment. It is not a compliance claim.

`officially-reviewed` requires:

- a review date;
- at least one current official policy source;
- category-specific human verification before publication.

AI output, metadata, or this repository cannot guarantee marketplace approval.

## Source and permission

`source.type` records the origin. `source.permission` records why the project
may redistribute it. Attribution is metadata, not permission.

Accepted permission values:

- `repository-authored`;
- `creator-granted`;
- `compatible-license`;
- `public-domain`.

Pinterest and other discovery links belong in `source.references` with type
`visual-research`. Pinterest-hosted images are rejected as preview assets.

## Generated files

Run:

```bash
npm run generate
npm run validate
```

The first command builds `data/prompts.json` and all 16 README editions. The
second validates taxonomy references, IDs, filenames, image paths, PNG ratios,
rights metadata, product-edit evidence, platform-policy claims, and generated
index freshness.

