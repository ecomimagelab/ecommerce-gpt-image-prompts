"use client";

import { useEffect, useMemo, useState } from "react";

type PromptItem = {
  id: number;
  title: string;
  category: string;
  platform: string;
  ratio: string;
  author: string;
  locale: string;
  visual: string;
  prompt: string;
  description: string;
  copies: number;
  featured?: boolean;
};

const languages = [
  ["en", "English"],
  ["zh", "简体中文"],
  ["zh-TW", "繁體中文"],
  ["ja", "日本語"],
  ["ko", "한국어"],
  ["th", "ไทย"],
  ["vi", "Tiếng Việt"],
  ["hi", "हिन्दी"],
  ["es", "Español"],
  ["es-419", "Español LATAM"],
  ["de", "Deutsch"],
  ["fr", "Français"],
  ["it", "Italiano"],
  ["pt-BR", "Português BR"],
  ["pt-PT", "Português PT"],
  ["tr", "Türkçe"],
];

const localeCopy: Record<string, { eyebrow: string; headline: string; subhead: string; search: string }> = {
  en: {
    eyebrow: "The creative operating system for commerce",
    headline: "Building the world’s largest e-commerce prompt library",
    subhead: "Production-ready GPT Image 2 prompts for every product, platform and campaign—tested, translated and refreshed every day.",
    search: "Search serum hero shots, Amazon A+ modules, TikTok Shop ads…",
  },
  zh: {
    eyebrow: "为全球电商而生的创意操作系统",
    headline: "打造全球最大的电商 GPT Image 2 提示词库",
    subhead: "覆盖每一种商品、平台与营销活动；经过测试、翻译并每日更新。",
    search: "搜索美妆主图、Amazon A+、TikTok Shop 广告…",
  },
  "zh-TW": {
    eyebrow: "為全球電商而生的創意作業系統",
    headline: "打造全球最大的電商 GPT Image 2 提示詞庫",
    subhead: "涵蓋每種商品、平台與行銷活動；經過測試、翻譯並每日更新。",
    search: "搜尋美妝主圖、Amazon A+、TikTok Shop 廣告…",
  },
  ja: {
    eyebrow: "コマースのためのクリエイティブOS",
    headline: "世界最大級のEC向けプロンプトライブラリへ",
    subhead: "あらゆる商品、プラットフォーム、キャンペーンに対応。検証・翻訳し、毎日更新します。",
    search: "美容商品、Amazon A+、TikTok Shop広告を検索…",
  },
};

const prompts: PromptItem[] = [
  {
    id: 1,
    title: "Soft-focus serum campaign hero",
    category: "Beauty",
    platform: "Shopify",
    ratio: "4:5",
    author: "Atlas Studio",
    locale: "EN · ZH",
    visual: "beauty",
    copies: 2841,
    featured: true,
    description: "A premium PDP hero that preserves the supplied bottle, label geometry and cap material.",
    prompt: "Create a premium studio product portrait of the supplied serum bottle. Preserve the exact bottle silhouette, cap, label geometry, typography and colors. Place it on warm travertine with translucent botanical shadows, soft directional daylight, a subtle peach-to-ivory backdrop and controlled specular highlights. Editorial luxury skincare photography, 85mm lens, shallow depth of field, crisp product edges, clean negative space. Do not invent text, change the logo, add props that obscure the product, or distort packaging.",
  },
  {
    id: 2,
    title: "Streetwear drop product reveal",
    category: "Fashion",
    platform: "TikTok Shop",
    ratio: "9:16",
    author: "Nia K.",
    locale: "EN · JA",
    visual: "fashion",
    copies: 2119,
    description: "Turns a flat garment reference into a high-energy vertical launch visual.",
    prompt: "Transform the supplied flat-lay garment into a cinematic streetwear launch still. Preserve the exact fabric, seams, print placement and garment proportions. Suspend the piece in a cobalt studio with sharp diagonal light, subtle motion haze and one lime accent plane. Vertical 9:16 framing, premium campaign photography, tactile textile detail, no model, no invented logos, no altered graphics.",
  },
  {
    id: 3,
    title: "Precision smartphone feature visual",
    category: "Electronics",
    platform: "Amazon",
    ratio: "1:1",
    author: "Max Chen",
    locale: "EN · ZH",
    visual: "electronics",
    copies: 1987,
    featured: true,
    description: "A polished Amazon feature tile with exact ports, buttons and camera geometry.",
    prompt: "Render the supplied smartphone at a photorealistic three-quarter angle on a graphite surface. Preserve exact dimensions, camera array, buttons, ports, finish and branding. Use a narrow electric-lime rim light, cobalt reflections and subtle volumetric haze. Square Amazon feature composition with clear negative space for approved copy. No extra cameras, no warped edges, no invented UI, no fake specifications.",
  },
  {
    id: 4,
    title: "Craveable overhead menu shot",
    category: "Food",
    platform: "DoorDash",
    ratio: "4:5",
    author: "Sabor Lab",
    locale: "EN · ES",
    visual: "food",
    copies: 1752,
    description: "Editorial food photography optimized for delivery listings and menu campaigns.",
    prompt: "Style the supplied meal as a warm editorial overhead photograph. Preserve all ingredients and portion size. Use a handmade ceramic plate, amber side light, restrained garnish, natural crumbs and appetizing steam. 4:5 crop, rich but realistic color, crisp hero ingredients, no duplicate food, no plastic texture, no text or watermark.",
  },
  {
    id: 5,
    title: "Scandinavian sofa lifestyle scene",
    category: "Home",
    platform: "Wayfair",
    ratio: "16:9",
    author: "RoomSet AI",
    locale: "EN · DE",
    visual: "furniture",
    copies: 1643,
    featured: true,
    description: "Places an exact furniture cutout into a believable premium interior.",
    prompt: "Place the supplied sofa, unchanged, in a sunlit Scandinavian apartment with pale oak, soft limestone and one sculptural plant. Match perspective and contact shadows precisely. Keep upholstery color, proportions, legs, seams and cushions identical. Wide 16:9 lifestyle composition with editorial restraint and natural morning light. No duplicate furniture, no altered silhouette, no clutter.",
  },
  {
    id: 6,
    title: "Midnight gemstone macro",
    category: "Jewelry",
    platform: "Etsy",
    ratio: "1:1",
    author: "Lustre Co.",
    locale: "EN · FR",
    visual: "jewelry",
    copies: 1588,
    description: "A luxury macro listing image that keeps the exact stone cut and setting.",
    prompt: "Create an ultra-detailed macro portrait of the supplied ring. Preserve exact stone cut, prongs, band profile, engraving and metal color. Place it on deep emerald velvet under a focused warm key light with delicate spectral highlights. Square crop, premium jewelry campaign, realistic reflections, no added stones, no changed setting, no text.",
  },
  {
    id: 7,
    title: "Coffee pouch marketplace hero",
    category: "Food",
    platform: "Shopee",
    ratio: "1:1",
    author: "Origin Works",
    locale: "EN · TH",
    visual: "coffee",
    copies: 1324,
    description: "A conversion-focused packaged coffee hero with readable, protected artwork.",
    prompt: "Create a marketplace hero image using the supplied coffee pouch. Preserve the packaging artwork and every readable word exactly. Place the pouch upright with roasted beans, soft tropical leaf shadows and a clean ivory background. Square framing, high-key commercial lighting, sharp label, realistic foil texture. No extra copy, no changed logo, no floating beans over the label.",
  },
  {
    id: 8,
    title: "Sneaker exploded feature diagram",
    category: "Fashion",
    platform: "Amazon",
    ratio: "16:9",
    author: "Motion Goods",
    locale: "EN · KO",
    visual: "sneaker",
    copies: 1217,
    featured: true,
    description: "Separates approved product layers for an engineering-led A+ module.",
    prompt: "Create a clean exploded-view feature diagram of the supplied sneaker. Preserve the exact upper, outsole, lacing and colors. Separate only into approved layers: upper, insole, cushioning foam and outsole. Align parts vertically with fine leader lines and empty callout zones. Cobalt-to-charcoal studio background, precise 3D product rendering, no invented components, no text.",
  },
  {
    id: 9,
    title: "Pet supplement benefit carousel",
    category: "Pet",
    platform: "Instagram",
    ratio: "4:5",
    author: "Pawform",
    locale: "EN · PT",
    visual: "pet",
    copies: 1103,
    description: "Friendly social commerce visual with protected packaging and flexible copy zones.",
    prompt: "Create a bright 4:5 social commerce visual featuring the supplied pet supplement jar and a joyful healthy dog. Preserve packaging, dosage text and brand colors exactly. Soft daylight, cobalt floor, lime toy accent and three clean negative-space benefit zones. Natural fur, authentic expression, no human hands, no medical claims, no invented copy.",
  },
  {
    id: 10,
    title: "Minimal ceramic set catalog image",
    category: "Home",
    platform: "Taobao",
    ratio: "3:4",
    author: "白昼商店",
    locale: "ZH · EN",
    visual: "ceramic",
    copies: 986,
    description: "A quiet catalog composition for handmade tableware collections.",
    prompt: "将参考图中的陶瓷餐具完整保留，不能改变器型、釉色、纹理和数量。摆放在浅灰微水泥台面上，使用柔和侧光、克制的亚麻布和细小自然阴影。3:4 竖版商品目录构图，真实陶瓷质感，留出标题区域。不要增加食物、花纹、文字或品牌标识。",
  },
  {
    id: 11,
    title: "Summer travel bottle campaign",
    category: "Outdoor",
    platform: "Lazada",
    ratio: "4:5",
    author: "Trail Lab",
    locale: "EN · VI",
    visual: "outdoor",
    copies: 847,
    description: "A bright lifestyle ad that keeps product construction consistent.",
    prompt: "Feature the supplied insulated bottle in a sunlit coastal travel scene. Preserve exact shape, lid, handle, finish and logo. Place it on a warm stone ledge with a cobalt sea and lime towel accent, realistic condensation, clean 4:5 ad framing and crisp product focus. No altered cap, no extra logos, no text, no people.",
  },
  {
    id: 12,
    title: "Premium watch shadow study",
    category: "Jewelry",
    platform: "Shopify",
    ratio: "4:5",
    author: "Minute House",
    locale: "EN · IT",
    visual: "watch",
    copies: 793,
    description: "A restrained luxury product portrait with exact dial and case preservation.",
    prompt: "Create a premium studio shadow study of the supplied wristwatch. Preserve the dial layout, hands, markers, case, crown, strap and brand mark exactly. Use a pearl backdrop, long architectural shadows and a narrow cobalt reflection. 4:5 framing, highly realistic metal and sapphire glass. No changed time, no added complications, no invented text.",
  },
];

const categories = ["All", "Beauty", "Fashion", "Electronics", "Food", "Home", "Jewelry", "Pet", "Outdoor"];
const platforms = ["All platforms", "Amazon", "Shopify", "TikTok Shop", "Shopee", "Lazada", "Etsy", "Taobao"];

const generatedImages: Record<string, string> = {
  beauty: "/previews/beauty-serum-triptych.png",
  fashion: "/previews/fashion-jacket-triptych.png",
  electronics: "/previews/electronics-phone-triptych.png",
  food: "/previews/food-pasta-triptych.png",
  furniture: "/previews/furniture-sofa-triptych.png",
  jewelry: "/previews/jewelry-ring-triptych.png",
};

const livePrompts = prompts.slice(0, 6);

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [platform, setPlatform] = useState("All platforms");
  const [language, setLanguage] = useState("en");
  const [selected, setSelected] = useState<PromptItem | null>(null);
  const [saved, setSaved] = useState<number[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("atlas-saved");
    if (stored) setSaved(JSON.parse(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("atlas-saved", JSON.stringify(saved));
  }, [saved]);

  const copy = localeCopy[language] ?? localeCopy.en;
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return livePrompts.filter((item) => {
      const matchesQuery = !needle || `${item.title} ${item.description} ${item.category} ${item.platform}`.toLowerCase().includes(needle);
      const matchesCategory = category === "All" || item.category === category;
      const matchesPlatform = platform === "All platforms" || item.platform === platform;
      return matchesQuery && matchesCategory && matchesPlatform;
    });
  }, [query, category, platform]);

  const toggleSaved = (id: number) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const copyPrompt = async (item: PromptItem) => {
    await navigator.clipboard.writeText(item.prompt);
    setCopied(item.id);
    window.setTimeout(() => setCopied(null), 1400);
  };

  const surprise = () => {
    const item = livePrompts[Math.floor(Math.random() * livePrompts.length)];
    setSelected(item);
  };

  return (
    <main>
      <div className="ticker" aria-label="Library update status">
        <div className="ticker-track">
          <span><b>Fresh today</b> 6 verified prompt sets · 18 real outputs</span>
          <span>Built for GPT Image 2</span>
          <span><b>16 languages</b> ready</span>
          <span>Daily publishing pipeline</span>
          <span><b>Open submissions</b> with attribution</span>
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="CommercePrompt Atlas home">
          <span className="brand-mark" aria-hidden="true" />
          <span>CommercePrompt <strong>Atlas</strong></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#explore">Explore</a>
          <a href="#coverage">Industries</a>
          <a href="#coverage">Platforms</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-actions">
          <label className="language-picker">
            <span className="sr-only">Language</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value)}>
              {languages.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
            </select>
          </label>
          <a className="submit-button" href="mailto:submit@commercepromptatlas.com?subject=Prompt submission">Submit a prompt</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.headline}</h1>
          <p className="hero-description">{copy.subhead}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#explore">Explore prompts</a>
            <button className="secondary-button" type="button" onClick={surprise}>Surprise me</button>
          </div>
        </div>
        <div className="hero-proof">
          <img src="/og.png" alt="Six example e-commerce prompt outputs across beauty, fashion, electronics, food, furniture and jewelry" />
          <div className="stats">
            <div><strong>15K+</strong><span>growth target</span></div>
            <div><strong>16</strong><span>locales ready</span></div>
            <div><strong>Daily</strong><span>update cycle</span></div>
          </div>
        </div>
      </section>

      <section className="search-shell" id="explore" aria-label="Search and filter prompts">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} />
          <kbd>{filtered.length} results</kbd>
        </label>
        <div className="filter-row" aria-label="Industry filters">
          {categories.map((item) => (
            <button key={item} type="button" className={category === item ? "chip active" : "chip"} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="platform-row">
          <label>
            <span>Platform</span>
            <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
              {platforms.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <p>Original, licensed or clearly attributed · Previewed across multiple outputs</p>
        </div>
      </section>

      <section className="library" aria-labelledby="library-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Launch collection · July 2026</p>
            <h2 id="library-heading">Production-ready prompt templates</h2>
          </div>
          <p>Sorted by most copied</p>
        </div>

        {filtered.length > 0 ? (
          <div className="prompt-grid">
            {filtered.map((item) => (
              <article className="prompt-card" key={item.id}>
                  <button className="generated-visual" type="button" onClick={() => setSelected(item)} aria-label={`Open ${item.title}`}>
                    <img src={generatedImages[item.visual]} alt={`GPT Image 2 example output for ${item.title}`} />
                    <span className="visual-top"><span>{item.category} · {item.ratio}</span><span>{item.featured ? "Featured" : "3 previews"}</span></span>
                    <span className="visual-count">01 / 03</span>
                  </button>
                <div className="card-body">
                  <div className="card-meta"><span>{item.platform}</span><span>{item.locale}</span></div>
                  <h3><button type="button" onClick={() => setSelected(item)}>{item.title}</button></h3>
                  <p>{item.description}</p>
                  <div className="card-footer">
                    <span className="author"><i aria-hidden="true" />{item.author}</span>
                    <span className="card-buttons">
                      <button type="button" onClick={() => toggleSaved(item.id)} aria-label={saved.includes(item.id) ? "Remove from saved" : "Save prompt"}>{saved.includes(item.id) ? "♥" : "♡"}</button>
                      <button type="button" onClick={() => copyPrompt(item)}>{copied === item.id ? "Copied" : "Copy"}</button>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <strong>No prompt matches yet.</strong>
            <p>Try another product, platform or industry.</p>
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); setPlatform("All platforms"); }}>Clear filters</button>
          </div>
        )}
      </section>

      <section className="coverage" id="coverage">
        <div>
          <p className="section-kicker">Global by design</p>
          <h2>Every market. Every storefront. One structured library.</h2>
        </div>
        <div className="coverage-grid">
          <div><strong>30+</strong><span>industries mapped</span></div>
          <div><strong>20+</strong><span>commerce platforms</span></div>
          <div><strong>3×</strong><span>preview outputs per prompt</span></div>
          <div><strong>100%</strong><span>source & rights tracking</span></div>
        </div>
      </section>

      <footer id="about">
        <div className="brand footer-brand"><span className="brand-mark" aria-hidden="true" /><span>CommercePrompt Atlas</span></div>
        <p>The open, multilingual operating system for better e-commerce imagery.</p>
        <div><a href="#explore">Browse</a><a href="mailto:submit@commercepromptatlas.com">Contribute</a><span>CC BY 4.0 framework</span></div>
      </footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <section className="prompt-modal" role="dialog" aria-modal="true" aria-labelledby="prompt-title">
            <button className="modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close prompt">×</button>
            <div className="modal-previews">
              {[0, 1, 2].map((variant) => (
                <div key={variant} className={`generated-crop crop-${variant + 1}`}>
                  <img src={generatedImages[selected.visual]} alt={`Generated preview ${variant + 1} for ${selected.title}`} />
                  <span className="visual-top"><span>{selected.category} · {selected.ratio}</span><span>0{variant + 1}</span></span>
                </div>
              ))}
            </div>
            <div className="modal-content">
              <p className="section-kicker">{selected.platform} · {selected.locale} · 3 real outputs · Generated July 20, 2026</p>
              <h2 id="prompt-title">{selected.title}</h2>
              <p>{selected.description}</p>
              <div className="prompt-text"><code>{selected.prompt}</code></div>
              <div className="modal-actions">
                <button className="primary-button" type="button" onClick={() => copyPrompt(selected)}>{copied === selected.id ? "Copied to clipboard" : "Copy full prompt"}</button>
                <button className="secondary-button" type="button" onClick={() => toggleSaved(selected.id)}>{saved.includes(selected.id) ? "Saved ♥" : "Save prompt ♡"}</button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
