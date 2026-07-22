# Controlled Taxonomy

`data/taxonomy.json` is the single source of truth for classification. Prompt
records store stable IDs; README generators render localized labels.

## Dimensions

1. **Category** — the merchandise family.
2. **Use case** — the production task, such as a marketplace main image,
   lifestyle scene, feature visual, or social ad.
3. **Style** — one to three art-direction descriptors.
4. **Background** — the environment or set type.
5. **Platform** — the intended storefront or social-commerce channel.
6. **Asset purpose** — the role of the image in a listing or campaign.

These dimensions are independent. For example, `pure-white` is a background,
`main-image` is a use case and asset purpose, and `amazon` is a platform.

## Adding a taxonomy value

Add a value only when an existing value cannot accurately classify the content.

1. Choose a stable lowercase kebab-case ID.
2. Add at least English and Simplified Chinese labels.
3. Explain the distinction in the pull request.
4. Update the submission Issue form if the dimension is presented as a dropdown.
5. Run `npm run generate` and `npm run validate`.

Do not create a new use case merely to describe a visual mood. Put moods in
`styles`; put places and surfaces in `backgrounds`.
