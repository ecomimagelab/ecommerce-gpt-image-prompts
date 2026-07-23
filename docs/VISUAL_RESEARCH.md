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

## Research directions used for prompts 28–37

The following references were used as visual-pattern research only. No Pinterest
image or third-party repository preview is committed here. Every preview for
records `ec-0028` through `ec-0037` was generated specifically from its recorded
standalone prompt and then reviewed for product consistency, anatomy, accidental
text, and platform fit.

| Category | Research references | Extracted visual direction | Platform treatment in the prompt |
|---|---|---|---|
| Fine fragrance | [Perfume product photography](https://www.pinterest.com/ideas/perfume-product-photography/948458490893/) | Optical glass, controlled liquid color, wet basalt, obsidian launch sets, restrained chromatic still life | Sephora catalog, Tmall Luxury launch, Shopify material hero, Instagram adult-model editorial, Pinterest still life |
| Penny loafer | [White and lifestyle shoe photography](https://www.pinterest.com/ideas/product-photography-white-and-lifestyle-shoes/916995449208/) | Burnished leather, readable construction, limestone tailoring, night movement, atelier macro, library color | Amazon Fashion catalog, Farfetch editorial, TikTok Shop street frame, Shopify craftsmanship, Pinterest wardrobe story |
| Boucle lounge chair | [Chair product photography](https://www.pinterest.com/ideas/chair-product-photography/935347293508/) | Real furniture scale, loop-pile texture, curved architecture, color-block rooms, dark gallery restraint, human context | Wayfair catalog, Shopify architecture, Pinterest interior save, Tmall design launch, Instagram lifestyle |
| Specialty coffee | [Coffee packaging photography](https://www.pinterest.com/ideas/coffee-packaging-photography/925595463911/) | Consistent claim-free pouch identity, pour-over ritual, graphic breakfast color, roastery authenticity, terracotta still life | Amazon Grocery catalog, Shopify brewing hero, Xiaohongshu flat lay, TikTok Shop maker frame, Pinterest pantry story |
| Celadon dinnerware | [Ceramic plate photography](https://www.pinterest.com/dreamcolors/ceramic-plate-photography/) | Exact four-piece count, reactive glaze, honest maker surface, bright brunch, dark dining, playful breakfast color | Amazon Home catalog, Etsy maker story, Pinterest brunch, Shopify dining hero, Xiaohongshu breakfast |
| Fitness smartwatch | [Smartwatch product photography](https://www.pinterest.com/ideas/smart-watch-product-photography/905125093022/) | Stable case/strap/crown identity, abstract claim-free activity arcs, technical angles, wet-track drama, believable wrist use | Amazon Electronics, Best Buy feature set, Tmall Sports launch, TikTok running creative, Instagram studio editorial |
| Dog harness | [Dog harness ideas](https://www.pinterest.com/dogharnessguide/dog-harness-ideas/) | Readable Y-front construction, ripstop and mesh, reflective strip, black hardware, natural dog fit | Chewy catalog, Amazon detail, Etsy maker story, TikTok city walk, Pinterest coastal hike |
| Chef knife | [Knife photography](https://ph.pinterest.com/carmela_doria/knife-photography/) | Hammered steel, smoked-oak grain, brass hardware, controlled dark stone, workshop provenance, safe food preparation | Amazon Home catalog, Shopify dark hero, Etsy workshop, Pinterest prep flat lay, TikTok cooking frame |
| Three-wick candle | [Luxury candle product photography](https://www.pinterest.com/ideas/luxury-candle-product-photography/954716881274/) | Plum glass, exact wick count, brass lid, high-key catalog, maker bench, low-light flame, flash-lit lifestyle, geometric color | Amazon Home catalog, Etsy maker story, Shopify mood hero, Instagram lifestyle, Pinterest color still life |
| Yoga mat | [Yoga-mat photo-shoot ideas](https://www.pinterest.com/torimorrison14/yoga-mat-photo-shoot/) | Grip microtexture, spruce/cork material contrast, architectural calm, safe adult movement, home ritual, desert retreat | Amazon Sports catalog, Shopify wellness hero, TikTok power flow, Xiaohongshu sunrise practice, Pinterest travel wellness |

Across this batch, the general prompt structure also benefited from the
MIT-licensed [gpt-image2-ecommerce](https://github.com/buluslan/gpt-image2-ecommerce)
and [product-shots](https://github.com/motiful/product-shots) workflows: state a
single asset purpose, lock physical product invariants, and review the output
against those invariants. Pinterest's official [2026 marketing
playbook](https://business.pinterest.com/en-gb/pdf/pinterest-predicts/2026-marketing-playbook)
and [Path to Performance](https://business.pinterest.com/es/pdf/pinterest-presents/path-to-performance/)
were used to keep Pinterest treatments save-worthy and performance-aware rather
than treating the platform as a generic image style.

## Research directions used for prompts 38–57

Pinterest references in this batch were used only to identify recurring visual
patterns such as strong mobile-first contrast, authentic adult faces, material
close-ups, architectural context, and category-specific color systems. The
repository does not redistribute any referenced Pin. Every preview for records
`ec-0038` through `ec-0057` was generated specifically from its corresponding
standalone prompt, reviewed one image at a time, and replaced when counts,
anatomy, product geometry, or real-world use were incorrect.

| Category | Research references | Extracted visual direction | Platform treatment in the prompt |
|---|---|---|---|
| Baroque pearl hoops | [Pearl-hoop editorial reference](https://uk.pinterest.com/pin/42221315251205643/), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Irregular pearl luster, exact-count merchandising, adult-ear scale, oxblood and cobalt ceremony | Amazon jewelry catalog, Farfetch styling, Etsy maker macro, Instagram adult portrait, Pinterest color still life |
| Sapphire silk scarf | [Scarf editorial](https://www.pinterest.com/pin/131026670403501530/), [Scarf motion](https://www.pinterest.com/pin/autumns-art--214976582206409271/) | Wind-led silk movement, hand-rolled hem, jewel-blue field, orange medallions, stone architecture | Amazon Fashion catalog, Instagram wind portrait, Shopify atelier detail, Farfetch dark still life, Pinterest gallery color |
| Cypress suede ankle boot | [Blue-suede boot reference](https://in.pinterest.com/pin/brian-atwood-adrienne-electric-blue-suede-ankle-boot--241364861258757953/), [Footwear search](https://www.pinterest.com/search/pins/?q=luxury%20suede%20ankle%20boot%20editorial) | Dense suede nap, matching-pair construction, wet-night styling, concrete steps, color-block sets | Amazon Fashion catalog, Shopify architecture, Instagram night model, Etsy care detail, Pinterest editorial |
| Alpine backpack | [Technical-backpack search](https://www.pinterest.com/search/pins/?q=technical%20backpack%20product%20photography), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Orange ripstop, roll-top silhouette, rain beading, alpine scale, real adult use | Amazon Sports catalog, Shopify storm hero, Pinterest alpine save, Instagram hiker, REI-style packing flat lay |
| Clay linen blazer | [Linen-tailoring search](https://www.pinterest.com/search/pins/?q=linen%20blazer%20fashion%20editorial), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Honest linen weave, relaxed tailoring, sunlit courtyard model, dark launch contrast, cobalt furniture | Amazon Fashion catalog, Farfetch adult-model editorial, Shopify flat lay, Tmall launch, Pinterest interior styling |
| Garnet hair dryer | [Hair-dryer campaign search](https://www.pinterest.com/search/pins/?q=hair%20dryer%20product%20photography%20campaign), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Garnet metal, compact believable air path, evening creator use, salon demonstration, water-caustic color | Amazon Beauty catalog, Shopify sculptural hero, Xiaohongshu evening style, salon education, Pinterest color still life |
| Jade refill face cream | [Skincare-packaging search](https://www.pinterest.com/search/pins/?q=refillable%20skincare%20packaging%20photography), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Translucent jade glass, visible refill cup, wet-stone calm, natural adult skin, fern-shadow warmth | Sephora catalog, Shopify water hero, Tmall stone launch, Instagram two-hand routine, Pinterest botanical light |
| Graphite mechanical keyboard | [Mechanical-keyboard search](https://www.pinterest.com/search/pins/?q=mechanical%20keyboard%20product%20photography), [gpt-image2-ecommerce](https://github.com/buluslan/gpt-image2-ecommerce) | Exact three-key coral accent, graphite frame, brass dial, black-and-gold desk, coral-cobalt set | Amazon Electronics catalog, Shopify desktop hero, Tmall dark launch, TikTok adult typing, Pinterest color-block workspace |
| Smoke-transparent earbuds | [Transparent-earbud search](https://www.pinterest.com/search/pins/?q=transparent%20earbuds%20product%20photography), [product-shots](https://github.com/motiful/product-shots) | Visible but disciplined internals, exact two-bud count, coral discs, transit authenticity, acrylic light | Amazon catalog, Shopify macro, Tmall launch, Instagram commuter, Pinterest water-caustic still life |
| Sandstone portable projector | [Portable-projector search](https://www.pinterest.com/search/pins/?q=portable%20projector%20product%20photography), [product-shots](https://github.com/motiful/product-shots) | Warm aluminum, camel loop, physical lens-to-screen alignment, quiet home cinema, desert architecture | Amazon catalog, Shopify dark-room hero, Pinterest coastal interior, Instagram adult movie night, Pinterest outdoor cinema |
| Cobalt carbon gravel bike | [Gravel-cycling search](https://www.pinterest.com/search/pins/?q=gravel%20bike%20editorial%20photography), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Mechanically plausible drivetrain, cobalt carbon, orange tape, wet-road atmosphere, golden-dust adult action | Bike-retail catalog, Tmall launch, Instagram gravel sprint, Shopify rainy trail, Pinterest desert architecture |
| Plum carbon padel racket | [Padel editorial search](https://www.pinterest.com/search/pins/?q=padel%20racket%20editorial%20photography), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Perforated carbon face, acid-lime edge, complete wrist cord, clay-court action, plum-lime geometry | Amazon Sports catalog, Shopify material macro, Instagram adult athlete, Farfetch-style tunnel model, Pinterest still life |
| Buttercream stand mixer | [Stand-mixer search](https://www.pinterest.com/search/pins/?q=stand%20mixer%20product%20photography), [product-shots](https://github.com/motiful/product-shots) | Rounded buttercream body, safe raised-head use, steel bowl, strawberry palette, blue-yellow launch set | Amazon Home catalog, Shopify kitchen hero, Instagram adult baking, Xiaohongshu recipe color, Pinterest design still life |
| Forest ceramic olive oil | [Olive-oil packaging](https://in.pinterest.com/pin/805933295859439403/), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Forest ceramic, cobalt-topped cork, single ivory brush mark, olive-grove provenance, sunlit table ritual | Amazon Grocery catalog, Shopify grove story, Pinterest table save, Instagram adult chef, Etsy pantry still life |
| Midnight bonbon box | [Chocolate-box search](https://www.pinterest.com/search/pins/?q=luxury%20chocolate%20box%20photography), [product-shots](https://github.com/motiful/product-shots) | Exact 3-by-4 tray, midnight paper, copper botanical linework, controlled glossy chocolate, direct-flash gifting | Amazon Grocery catalog, Shopify dark hero, Instagram adult gift portrait, Etsy maker process, Pinterest graphic flat lay |
| Citrus botanical sparkling water | [Beverage-campaign search](https://www.pinterest.com/search/pins/?q=sparkling%20water%20product%20photography), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Exact three-can color system, blank label fields, condensation, water splash, cooler and picnic authenticity | Amazon Grocery catalog, Shopify splash hero, Instagram adult beach cooler, Pinterest picnic flat lay, Tmall color launch |
| Amber-cobalt glass vase | [Sculptural glass](https://au.pinterest.com/pin/888335095289798687/), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Amber globe, cobalt curved neck, clear ring handle, optical caustics, sunset architecture, florist context | Wayfair catalog, Shopify architectural sunset, Pinterest color interior, Instagram adult florist, Etsy glass-studio mood |
| Oat modular stroller | [Stroller-editorial search](https://www.pinterest.com/search/pins/?q=stroller%20product%20photography%20editorial), [product-shots](https://github.com/motiful/product-shots) | Four-wheel chassis, oat textile, bronze accents, empty safety-focused seat, adult caregiver, colonnade scale | Amazon Baby catalog, Shopify architecture, Instagram adult caregiver, product-feature demonstration, Pinterest park editorial |
| Marine-coral outdoor cooler | [Outdoor-cooler search](https://www.pinterest.com/search/pins/?q=outdoor%20cooler%20product%20photography), [Pinterest Path to Performance](https://business.pinterest.com/pdf/pinterest-presents/path-to-performance/) | Exact two coral latches, marine body, ivory lid, right drain, wet-rock coast, adult campsite authenticity | Amazon Outdoors catalog, Shopify open-coast hero, Pinterest dusk coast, Instagram adult camp portrait, marketplace beach still life |
| Blackened-steel pruning shears | [Garden-tool search](https://www.pinterest.com/search/pins/?q=garden%20tool%20product%20photography), [product-shots](https://github.com/motiful/product-shots) | Blackened steel, sharpened bypass blades, exact handle rivets, workshop patina, safe gloved adult pruning | Amazon Garden catalog, Etsy workshop, Pinterest garden flat lay, Instagram adult use, Shopify rosemary still life |

## Rights and quality policy

1. Do not download or commit Pinterest images unless the contributor owns them or supplies a compatible license.
2. Do not copy a creator's prompt verbatim without explicit permission and attribution.
3. Record references as research links, not as preview assets or claims of endorsement.
4. Generate or photograph previews specifically for the submitted prompt.
5. Review every result for trademarks, accidental text, product inconsistency, anatomy errors, and platform compliance before approval.
