# Contributing

Thank you for helping build a useful, reproducible, and legally responsible
e-commerce GPT Image 2 prompt library.

## Submission route

Prompt contributions are accepted through the **Submit an e-commerce prompt**
GitHub Issue form. Direct pull requests that add unreviewed prompt records are
not accepted.

1. Open the prompt submission Issue form.
2. Provide the complete prompt, use case, industry, platforms, author, source,
   license declaration, and at least two public preview images.
3. A maintainer checks quality, attribution, rights, safety, and reproducibility.
4. If changes are needed, the maintainer applies `needs-changes`.
5. If accepted, the maintainer applies `approved`.
6. The approval workflow converts the Issue into structured JSON, regenerates
   all 16 README editions, commits the result, comments on the Issue, and closes it.

Applying `approved` is a publishing action. Maintainers must not apply the label
until every checklist item below has been reviewed.

## Acceptance criteria

A submission must be:

- created for GPT Image 2;
- directly useful to an e-commerce workflow;
- clear enough to reproduce;
- accompanied by at least two generated outputs;
- original, licensed, public-domain, or accurately attributed;
- safe for work and suitable for a public repository;
- free of deceptive claims, hidden instructions, and malicious links;
- explicit about whether reference images are required.

High-quality prompts usually specify the product, scene, composition, lighting,
materials, output ratio, invariants, prohibited changes, and intended storefront.

## Preview image requirements

- At least two images per prompt; three are recommended.
- PNG, JPEG, or WebP.
- Minimum width: 512 px.
- Recommended width: 1024–2048 px.
- Recommended size: under 5 MB per image.
- No unrelated watermark, tracking pixel, or hidden payload.
- Images must actually result from the submitted prompt or a clearly documented
  reference-image variation of that prompt.
- The product, brand, person, packaging, and source imagery must be lawful to share.

Remote images are accepted for community submissions. Maintainers may later
mirror approved assets into `assets/prompts/<slug>/` after verifying rights and
file integrity.

## Attribution and licensing

Every contribution must identify:

- the original author;
- the original publication URL, when one exists;
- the applicable license or permission basis;
- whether the submitter is the author or is submitting another creator’s work.

Contributors agree to license their contribution under CC BY 4.0. This does not
grant rights in third-party trademarks, packaging, likenesses, copyrighted
characters, source photographs, or other protected material.

## Maintainer review checklist

Before adding `approved`, confirm:

- [ ] Prompt title and description are accurate.
- [ ] Prompt is complete and reproducible.
- [ ] Industry, use case, platform, and ratio metadata are valid.
- [ ] At least two preview URLs load and match the prompt.
- [ ] Author and source are present.
- [ ] The rights declaration is complete.
- [ ] No unsafe or clearly infringing content is present.
- [ ] No duplicate prompt or source already exists.
- [ ] URLs use HTTPS and do not require authentication.

## Code and documentation contributions

Pull requests are welcome for generators, validation, translations, workflows,
and documentation.

Run before submitting:

```bash
npm run validate
npm run generate
npm run check
```

Do not edit generated `README*.md` files directly. Edit `data/prompts.json`,
`scripts/i18n.mjs`, or the generator, then regenerate.

