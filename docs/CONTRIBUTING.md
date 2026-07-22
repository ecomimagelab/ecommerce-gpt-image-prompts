# Contributing

Thank you for helping build a useful, visually exceptional, and legally
responsible e-commerce GPT Image 2 prompt library.

## Prompt submission route

Prompt contributions use the **Submit an e-commerce prompt** Issue form. Direct
pull requests that bypass content review are not accepted.

1. Choose `product-edit` for real inventory or `text-to-image` for a fictional,
   unbranded demonstration.
2. Submit one standalone image prompt with controlled taxonomy values.
3. Supply product invariants, negative constraints, input requirements, and at
   least two generated examples.
4. Product-edit submissions must include a lawful Before image.
5. Identify the author, original source, permission basis, license, and research
   links.
6. A maintainer performs the first review and requests changes when necessary.
7. The `approved` label creates a branch and pull request; it does not publish.
8. A maintainer performs a second review and merges only when all checks pass.

The pull request body closes the Issue automatically after publication.

## Acceptance criteria

A submission must:

- be designed for GPT Image 2;
- solve a recognizable e-commerce production task;
- generate one standalone image per prompt;
- be complete enough to reproduce;
- use the controlled taxonomy in `data/taxonomy.json`;
- explicitly protect product identity when references are used;
- include at least two generated outputs;
- accurately disclose whether and how reference images were used;
- contain no unsupported specifications, certifications, ratings, or results;
- be original, permissioned, compatibly licensed, or public-domain;
- contain no unsafe, deceptive, private, or clearly infringing content.

See [PROMPT_AUTHORING_STANDARD.md](PROMPT_AUTHORING_STANDARD.md) for the prompt
formula and image QA checklist.

## Preview and Before/After requirements

- At least two generated After images; three are recommended.
- PNG is required for repository-hosted previews.
- Minimum width: 512 px; 1024–2048 px is recommended.
- Keep each image reasonably compressed, preferably under 5 MB.
- The stored aspect ratio must match the actual file within validator tolerance.
- Every After image must result from the submitted prompt and disclosed inputs.
- Product-edit records must pair each After image with the lawful Before image.
- No unrelated portfolio images, stock images, tracking URLs, or hidden payloads.
- No Pinterest-hosted preview image unless independent compatible permission is
  documented and the asset is hosted from an approved source.

## Attribution and licensing

Every contribution must identify:

- original author;
- original publication URL when available;
- permission basis;
- asset and prompt license;
- reference-image rights;
- visual-research links separately from redistributed assets.

Attribution alone is not a permission basis. Contributors must not grant rights
they do not control.

## First-review checklist for Issues

- [ ] Prompt is complete and produces one standalone image.
- [ ] Product-edit mode includes clear invariants and a lawful Before image.
- [ ] Category, use case, style, background, purpose, platform, and ratio are valid.
- [ ] At least two generated outputs load and match the prompt.
- [ ] Author, source, permission, and license are supportable.
- [ ] No unsupported factual or performance claims appear.
- [ ] Platform guidance is not presented as guaranteed approval.
- [ ] No duplicate prompt or source exists.
- [ ] URLs use HTTPS and do not require login.

## Final-review checklist for pull requests

- [ ] JSON filename matches `<id>-<slug>.json`.
- [ ] `npm run check` succeeds.
- [ ] README images and collapsible single-image prompts render correctly.
- [ ] Before/After pairs are honest and consistently framed.
- [ ] Prompt, preview, rights, and platform metadata remain accurate after conversion.
- [ ] Any requested translations were reviewed by a fluent contributor.

## Code, taxonomy, and documentation changes

Pull requests are welcome for generators, validation, taxonomy, translations,
workflows, and documentation.

Run before submitting:

```bash
npm run generate
npm run validate
npm run check
```

Do not edit `data/prompts.json` or generated `README*.md` files directly. Edit an
individual file in `data/prompts/`, `data/taxonomy.json`, `scripts/i18n.mjs`, or
the generator, then regenerate.

