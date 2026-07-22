# Visual Research and Prompt Provenance

This repository does not copy, redistribute, or train on third-party Pinterest images. Pinterest and platform documentation are used only as visual-research inputs: recurring composition, lighting, material, camera, and merchandising patterns are translated into newly authored prompts. All preview images committed to this repository were generated specifically for the repository from those prompts.

Pinterest does not expose a dependable public like count for every Pin. We therefore do not describe any individual reference as the "most liked." Research favors Pinterest topic pages and boards that show broad interest or substantial collections, plus official platform guidance where available.

## Open-source prompt research policy

GitHub is used as a traceable research pool, not as an assumption that every
visible asset is free to redistribute. A public repository without a license
retains default copyright, and a repository-level license may not cover images
or prompts credited to outside social posts. Before any direct reuse, reviewers
must check the repository license, the entry-level author/source, redistribution
rights, required attribution, and whether the license covers both prompt and
image. See [GitHub's licensing guidance](https://docs.github.com/en/enterprise-cloud@latest/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).

The current research shortlist is:

| Repository | License signal | Approved use here |
|---|---|---|
| [wuyoscar/GPT-Image2-Skill](https://github.com/wuyoscar/GPT-Image2-Skill) | MIT repository; individual outside-source entries retain source metadata | Study the structure of entries marked Curated/Original and general prompt anatomy; independently author our prompts and generate our own previews |
| [poloclub/diffusiondb](https://github.com/poloclub/diffusiondb) | Dataset documented as CC0; code under MIT | Mine broad composition and lighting vocabulary after e-commerce filtering; do not present its images as GPT Image 2 proof |
| [YouMind-OpenLab/awesome-gpt-image-2](https://github.com/YouMind-OpenLab/awesome-gpt-image-2) | Repository attribution license with many community/X sources | Benchmark README presentation, taxonomy, and source discovery; do not blindly redistribute third-party images |
| [jau123/nanobanana-trending-prompts](https://github.com/jau123/nanobanana-trending-prompts) | CC BY repository with engagement-ranked outside sources | Use popularity as a research signal only until each source right is verified |
| [krea-ai/open-prompts](https://github.com/krea-ai/open-prompts) | No active reusable license found during review | Research only; exclude from direct reuse |

For records `ec-0020` through `ec-0025`, the open-source repositories above
were used only to study useful prompt scaffolding: explicit asset purpose,
physical materials, camera/composition, lighting, invariants, and negative
constraints. The final prompts were independently written for this repository,
and all 18 previews were generated specifically from their corresponding
standalone prompt directions.

For records `ec-0026` and `ec-0027`, research also reviewed the MIT-licensed
[gpt-image2-ecommerce](https://github.com/buluslan/gpt-image2-ecommerce) scene-template system and
[motiful/product-shots](https://github.com/motiful/product-shots) product-consistency workflow. We adopted only general workflow ideas—platform-native asset purposes, explicit physical invariants, and cross-image QA. The six prompts and six previews in this repository are newly authored outputs, not copied repository assets.

## Product-edit proof of workflow

Record `ec-0019` uses the repository-generated image
`assets/prompts/beauty-serum/preview-1.png` as its lawful Before reference. Its
two After images were created by editing that exact local source with the two
recorded standalone prompts. No Pinterest or third-party image was substituted
for the generated output. Reviewers compared bottle shape, cap, label placement,
glass, liquid color, and proportions and retained a human-QA warning because a
generative edit cannot guarantee exact product identity.

## Research directions used for the first six prompts

| Category | Research references | Extracted visual direction | Platform treatment in the prompt |
|---|---|---|---|
| Beauty serum | [Serum photography](https://www.pinterest.com/ideas/serum-photography/918228427263/), [serum product photography](https://www.pinterest.com/ideas/serum-product-photography/939258359765/) | Optical glass, water caustics, condensation, botanical shadow, controlled luxury lighting | Shopify/DTC water hero, product-detail botanical macro, dark launch social creative |
| Technical jacket | [Streetwear photography](https://www.pinterest.com/ideas/streetwear-photography/951699556052/), [streetwear editorial photography](https://www.pinterest.com/ideas/streetwear-editorial-photography/898993435001/) | Fisheye perspective, direct flash, movement, brutalist concrete, tactile garment detail | TikTok street energy, Instagram Shop detail carousel, Shopify ghost-mannequin hero |
| Smartphone | [Smartphone product photography for listings](https://www.pinterest.com/ideas/smartphone-product-photography-for-listings/930746890761/), [Amazon image guidance](https://sellercentral.amazon.com/seller-forums/discussions/t/13af96ea-6b07-4bf9-8dbe-a13292c2e3b1) | Clean silhouette, high frame fill, engineering detail, precise metal and glass, controlled feature lighting | Pure-white Amazon main image, Amazon A+ camera detail, JD/Tmall cinematic feature hero |
| Pasta delivery | [Pasta photography collection](https://www.pinterest.com/noni_mogiba/pasta-photography/), [pasta food photography collection](https://es.pinterest.com/cursosanafotogr/pasta-food-photography-pasta/) | Fork-lift action, visible sauce viscosity, natural table imperfection, graphic color fields | Delivery-app thumbnail close-up, Deliveroo-style editorial table, Meituan social promo |
| Modular sofa | [Furniture photography inspiration](https://www.pinterest.com/vcreativehouse/furniture-photography-inspiration/), [editorial furniture photography](https://www.pinterest.com/ideas/editorial-furniture-photography/898182511327/) | Real scale, architectural context, raking daylight, believable texture, intimate material crops | Wayfair conversion room, Pinterest architectural editorial, Shopify material story |
| Emerald ring | [Ring product photography](https://www.pinterest.com/ideas/ring-product-photography/918267566314/), [macro jewelry photography](https://www.pinterest.com/ideas/macro-jewelry-photography/938969975553/) | Macro facet precision, black-lacquer ceremony, silk craftsmanship, water caustics | Tmall Luxury launch, Shopify atelier detail, editorial social-commerce image |

## Platform principles

- Amazon main imagery is treated as conversion infrastructure: pure white, high product fill, no promotional text, and minimal ambiguity. The repository examples are illustrative AI outputs and must still be checked against the applicable category policy before upload.
- TikTok Shop imagery is treated as social-native creative: vertical framing, real-person energy, motion, direct flash, and multiple visual beats. TikTok's official guidance emphasizes full-screen vertical creative, motion, and creative diversity.
- Shopify imagery has more room for brand world and craftsmanship. Product identity stays clear while art direction, material story, and negative space establish a distinct DTC voice.
- Pinterest-oriented furniture imagery is designed to be saved as inspiration: architectural context and an editorial point of view take priority over plain catalog repetition.
- Food-delivery images prioritize instant mobile recognition, appetite cues, and believable texture over ornamental still-life styling.
- Luxury-commerce images use restraint, optical precision, and material authenticity instead of generic neon gradients or crowded props.

## Research directions used for prompts 7–12

| Category | Research references | Extracted visual direction | Platform treatment in the prompt |
|---|---|---|---|
| Trail shoe | [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Clean lateral silhouette, low-angle motion, wet terrain, hard material light, restrained outdoor palette | Amazon Fashion catalog hero, TikTok Shop action frame, Pinterest material editorial |
| Espresso machine | [Espresso machine photography](https://www.pinterest.com/ideas/espresso-machine-photography/916159057514/), [coffee product photography](https://www.pinterest.com/peoplecangrow2/coffee-product-photography/) | Brushed-steel highlight control, warm domestic context, espresso ritual, hard window-shadow geometry | Amazon white-background listing, Shopify morning lifestyle, Xiaohongshu creator ritual |
| Cat carrier | [Pet product photography](https://www.pinterest.com/buyboxexperts/pet-product-photography/), [stylish pet carriers](https://www.pinterest.com/leslierosen/stylish-discreet-pet-carriers/) | Soft color fields, honest canvas and leather texture, gentle pet interaction, close functional detail | Chewy catalog, Instagram Shop travel story, Amazon feature detail |
| Trekking tent | [Camping photography](https://www.pinterest.com/lovethecampfire/camping-photography/), [tent photography](https://ph.pinterest.com/ritzyryan/tent-photography/) | Readable pitch geometry, water beading, warm shelter light, blue-hour landscape and restrained astrophotography | Outdoor-retail technical catalog, Amazon weather feature, Pinterest adventure editorial |
| Cordless car vacuum | [Pinterest 2026 Marketing Moments Guide](https://business.pinterest.com/pdf/2026-marketing-moments-guide/) | Functional close-up, clean industrial materials, limited accent color, airflow visualization without dense labels | Amazon catalog, eBay practical-use frame, Tmall technology hero |
| Wooden stacking toy | [Wooden toys photography](https://www.pinterest.com/ideas/wooden-toys-photography/931856382498/), [toy product photography](https://www.pinterest.com/ideas/toys-product-photography/937525949689/) | Visible wood grain, muted child-safe paint, handmade table story, separated-parts clarity, calm playroom light | Etsy provenance story, Amazon catalog layout, Pinterest playroom editorial |

## Research directions used for prompts 13–18

| Category | Research references | Extracted visual direction | Platform treatment in the prompt |
|---|---|---|---|
| Mechanical watch | [Watch product photography](https://www.pinterest.com/jorellferraren/watch-product-photography/), [watch photography collection](https://www.pinterest.com/alex147j/watch-product-photography/) | Clean face readability, controlled crystal reflections, 10:10 hand position, rich dark launch sets, tactile wrist context | Chrono24 catalog, Tmall Luxury launch, Instagram wrist editorial |
| Shoulder bag | [Handbag product photography](https://za.pinterest.com/aadilae/handbag-product-photography/), [handbag shoot ideas](https://www.pinterest.com/allilaki/%D8%A7%D9%81%D9%83%D8%A7%D8%B1-%D8%AA%D8%B5%D9%88%D9%8A%D8%B1-%D8%B4%D9%86%D8%B7/) | Full silhouette and strap clarity, social-native walking motion, architectural stone, hard shadow and restrained luxury color | Farfetch catalog, TikTok Shop street style, Pinterest architectural still life |
| Linen bedding | [Linen photography](https://www.pinterest.com/ideas/linen-photography/937877678244/), [bed-sheet product photography](https://www.pinterest.com/ideas/bed-sheets-product-photography/912134302791/) | Honest wrinkles, visible weave, folded-set clarity, quiet bedrooms, broad natural-light shapes | Amazon Home catalog, Shopify bedroom lifestyle, Pinterest textile editorial |
| Matcha packaging | [Matcha product photography](https://de.pinterest.com/diedrichdominik/matcha-product-photography/) | Celadon and deep green, fine powder texture, restrained tea tools, condensation, clear summer caustics | Amazon Grocery catalog, Shopify tea ritual, Xiaohongshu iced-latte creative |
| Ceramic planter | [Planter photography](https://www.pinterest.com/ideas/planter-photography/953379673600/), [plant-pot photography](https://www.pinterest.com/ideas/plant-pot-photography/942851904318/) | Hand-finished clay texture, simple white-background merchandising, strong single brush gesture, Mediterranean leaf shadows | Etsy maker story, Wayfair catalog, Pinterest interior editorial |
| Road helmet | [Stylish cycling helmets](https://www.pinterest.com/discerningcyclist/stylish-cycling-helmets/) | Clean aerodynamic side profile, readable ventilation, restrained airflow graphics, close sunrise action framing | Amazon Sports catalog, Decathlon-style feature visualization, Instagram action campaign |

## Research directions used for prompts 20–25

| Category | Research basis | Extracted visual direction | Platform treatment in the prompt |
|---|---|---|---|
| Color cosmetics | Open-source product-prompt anatomy plus broad luxury beauty research | Satin wax microtexture, brushed metal, vitreous oxblood lacquer, flash-lit natural skin | Sephora-style clean catalog, Tmall Luxury sculptural launch, Instagram Shop adult-model editorial |
| Premium audio | Open-source photography scaffolding and electronics merchandising patterns | Woven fabric, anodized aluminum, restrained acoustic visualization, creator authenticity | Amazon main image, Best Buy feature visual, TikTok Shop studio session |
| Cast-iron cookware | Open-source product/food prompt structure plus editorial still-life patterns | Heavy enamel, brushed brass, old-world plaster, believable steam and food texture | Amazon Home main image, Pinterest Mediterranean still life, Xiaohongshu cooking ritual |
| Sports nutrition | Open-source commercial composition patterns with claim-safe packaging rules | Claim-free packaging, cobalt/acid-lime system, direct-flash training energy, bright recipe flat lay | Amazon main image, TikTok Shop training creative, Xiaohongshu breakfast content |
| Travel luggage | Open-source product-photo structure plus architectural travel art direction | Shell geometry, wheel and handle fidelity, sunrise stone architecture, complete packing organization | Amazon main image, Shopify airport hero, Pinterest packing guide |
| Premium stationery | Open-source macro-photo structure plus tactile maker-story research | Translucent faceted resin, machined brass, crisp nib detail, rainy writing atmosphere | Tmall catalog, Etsy provenance still life, Xiaohongshu writing ritual |

## Research directions used for prompts 26–27

| Category | Research references | Extracted visual direction | Platform treatment in the prompt |
|---|---|---|---|
| Premium eyewear | [Sunglasses product photography](https://www.pinterest.com/ideas/sunglasses-product-photography/), [gpt-image2-ecommerce](https://github.com/buluslan/gpt-image2-ecommerce), [product-shots](https://github.com/motiful/product-shots) | Translucent acetate, controlled optical reflections, hard coral-wall fashion light, aqua pool caustics, unmistakable frame geometry | Amazon Fashion pure-white catalog, Xiaohongshu adult-model editorial, Pinterest poolside still life |
| Portable lighting | [Table lamp product photography](https://www.pinterest.com/ideas/table-lamp-product-photography/), [gpt-image2-ecommerce](https://github.com/buluslan/gpt-image2-ecommerce), [product-shots](https://github.com/motiful/product-shots) | Matte oxblood metal, warm opal diffusion, brass edge control, blue-hour architecture, walnut and slatted-sun interiors | Amazon Home pure-white catalog, Shopify architectural dusk hero, Pinterest mid-century interior |

## Rights and quality policy

1. Do not download or commit Pinterest images unless the contributor owns them or supplies a compatible license.
2. Do not copy a creator's prompt verbatim without explicit permission and attribution.
3. Record references as research links, not as preview assets or claims of endorsement.
4. Generate or photograph previews specifically for the submitted prompt.
5. Review every result for trademarks, accidental text, product inconsistency, anatomy errors, and platform compliance before approval.
