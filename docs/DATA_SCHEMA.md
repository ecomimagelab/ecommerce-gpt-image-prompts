# Prompt Data Schema

The canonical prompt database is `data/prompts.json`. README files are generated
views and must not be edited manually.

`data/schema.json` contains the machine-readable JSON Schema. The repository
also runs `scripts/validate-data.mjs` because it verifies local image paths and
cross-record uniqueness.

## Top-level structure

```json
{
  "schemaVersion": 1,
  "updatedAt": "2026-07-20T00:00:00.000Z",
  "prompts": []
}
```

## Prompt record

| Field | Type | Required | Description |
|---|---|---:|---|
| `id` | string | yes | Stable ID such as `ec-0001`. |
| `slug` | string | yes | Unique lowercase kebab-case identifier. |
| `model` | string | yes | Must currently be `gpt-image-2`. |
| `title` | string | yes | Original title, maximum 100 characters. |
| `description` | string | yes | Concise use-oriented description. |
| `prompt` | string | yes | Full reproducible prompt text. |
| `language` | string | yes | BCP 47-style prompt language code. |
| `industry` | string | yes | Primary e-commerce industry slug. |
| `useCase` | string | yes | Primary production workflow slug. |
| `platforms` | string[] | yes | Relevant marketplaces or storefronts. |
| `aspectRatios` | string[] | yes | Recommended output ratios. |
| `needReferenceImages` | boolean | yes | Whether the workflow requires user images. |
| `previews` | object[] | yes | At least two preview images with URL and alt text. |
| `author` | object | yes | Author name and optional profile URL. |
| `source` | object | yes | Source type, URL, and provenance notes. |
| `license` | string | yes | License identifier. |
| `status` | string | yes | `approved`, `draft`, `rejected`, or `removed`. |
| `featured` | boolean | no | Whether it appears in the featured section. |
| `publishedAt` | date | yes | ISO date. |
| `translations` | object | no | Localized title and description by locale. |

## Preview paths

Repository-hosted assets use relative paths:

```text
assets/prompts/<prompt-family>/preview-1.png
```

Community records may initially use public HTTPS URLs. Remote URLs must not
require authentication, execute scripts, or contain tracking parameters.

## Translation behavior

Prompt text remains in its original language to preserve reproducibility.
`translations` localizes titles and descriptions. When a translation is
missing, the generator falls back to the original title and description.

## Status behavior

Only `approved` records are rendered into README files. `draft`, `rejected`, and
`removed` records remain excluded.

