# E-commerce Prompt Authoring and QA Standard

The goal is not merely an attractive image. A production prompt must make the
product recognizable, solve a commerce task, respect the intended channel, and
avoid deceptive claims.

## 1. Choose the generation mode

### Product-edit

Use this for real inventory. Supply one or more lawful product references and
state exactly what must remain unchanged.

Recommended opening:

```text
Use the supplied product photographs as the identity reference. Preserve the
product's shape, proportions, construction, verified color, material finish,
packaging layout, and legible brand elements as closely as the model permits.
Change only the explicitly requested background, lighting, camera treatment,
composition, and props. Do not redesign, relabel, recolor, or invent features.
The final result requires human comparison with the source product before use.
```

Do not promise “100% fidelity.” Generative systems can alter products and text;
human quality assurance is mandatory.

### Text-to-image

Use this for fictional, unbranded demonstrations and concept exploration. State
the full product specification so variants remain internally consistent. Do not
present a fictional output as an image of real inventory.

## 2. Cover the nine production layers

1. **Commerce task** — main image, catalog, detail, lifestyle, A+, social ad.
2. **Product identity** — geometry, color, materials, packaging, label, count.
3. **Composition** — viewpoint, crop, subject scale, balance, negative space.
4. **Camera** — lens character, angle, focus behavior, depth of field.
5. **Lighting** — source size, direction, contrast, reflections, color temperature.
6. **Material fidelity** — glass, metal, fabric, food, skin, wood, liquid, and finish.
7. **Platform treatment** — intended channel and asset purpose.
8. **Conversion clarity** — mobile readability, hierarchy, product prominence.
9. **Negative constraints** — prohibited redesigns, artifacts, claims, text, and clutter.

## 3. Write one standalone image per variant

Each variant must explicitly say that it produces one image, not a collage,
contact sheet, split screen, or multi-panel layout. Campaign-set prompts may be
kept for exploration, but README users should receive individually copyable
production prompts.

## 4. Separate main images from branded heroes

| Purpose | Typical treatment | Important qualification |
|---|---|---|
| Marketplace main image | Product-first, simple background, honest silhouette | Requirements differ by platform and category; verify current official rules. |
| Catalog image | Clear product presentation with limited styling | Do not imply official platform compliance. |
| Branded hero | Art direction, props, mood, negative space | Usually unsuitable as a strict marketplace main image. |
| Secondary image | Detail, feature, context, comparison, or A+ content | Claims must be supplied and verified by the merchant. |
| Social creative | Mobile-first, immediate visual hook, native framing | Avoid fake UI, engagement, endorsements, or results. |

## 5. Product invariants

Product-edit records should cover the attributes that affect returns and trust:

- silhouette, dimensions, part count, and orientation;
- color and material finish;
- stitching, seams, ports, buttons, closures, and hardware;
- label placement and supplied text;
- packaging structure and included accessories;
- supported variants and verified feature states.

If exact text matters, require the model to use text supplied by the merchant and
check every character after generation.

## 6. Claims and evidence

Never invent:

- battery life, waterproof ratings, capacity, speed, dimensions, or compatibility;
- medical, cosmetic, nutrition, sustainability, safety, or performance claims;
- awards, certifications, reviews, discounts, stock levels, or endorsements;
- Before/After performance outcomes.

Prompts may reserve space for verified copy, but the copy itself must come from
the merchant or a documented authoritative source.

## 7. Visual quality review

Review every output at full size and around 200 px thumbnail size.

- Product identity matches the prompt and any supplied references.
- The intended object is immediately legible on mobile.
- Materials have believable texture, reflection, refraction, and contact shadows.
- No malformed labels, duplicated parts, impossible geometry, or anatomy errors.
- The image has a clear focal hierarchy and intentional negative space.
- Highlights are controlled and dark areas retain useful detail.
- The output ratio matches the record.
- Every preview actually came from the recorded prompt workflow.
- The result is visually distinct from other categories and platform treatments.

## 8. Before/After evidence

For product-edit records:

- the Before image must be owned, licensed, or public-domain;
- the same source image should be used for each claimed comparison;
- crop or exposure adjustments must be disclosed when material;
- the After image must be generated from the submitted prompt and reference;
- neither image may be copied from Pinterest merely because it is public or popular.

## 9. Pinterest and visual research

Pinterest is useful for identifying recurring composition, lighting, styling, and
merchandising patterns. Record research URLs and translate high-level patterns
into a newly authored prompt. Do not copy a creator's image, distinctive artwork,
or prompt unless the rights holder supplies compatible permission.

High visual quality should come from stronger art direction and better QA, not
from replacing generated examples with unrelated third-party portfolio images.
