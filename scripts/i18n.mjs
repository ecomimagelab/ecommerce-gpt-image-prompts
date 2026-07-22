const PROJECT_NAME = "ecommerce-gpt-image-prompts";

const base = {
  title: PROJECT_NAME,
  tagline: "A curated, multilingual library of production-ready GPT Image 2 prompts for global e-commerce.",
  about: "About",
  aboutText: "This repository collects reproducible e-commerce image prompts with structured metadata, clear attribution, licensing records, and multiple preview outputs.",
  statistics: "Statistics",
  totalPrompts: "Approved prompts",
  totalIndustries: "Industries",
  totalPlatforms: "Platforms",
  lastUpdated: "Last updated",
  categories: "Browse by industry",
  featured: "Featured prompts",
  allPrompts: "All prompts",
  description: "Description",
  prompt: "Prompt",
  previews: "Generated previews",
  details: "Details",
  author: "Author",
  source: "Source",
  platforms: "Platforms",
  industry: "Industry",
  useCase: "Use case",
  language: "Prompt language",
  license: "License",
  published: "Published",
  original: "Original creation for this repository",
  contribute: "Contribute",
  contributeText: "Submit a prompt through the GitHub Issue form. Maintainers review attribution, rights, quality, reproducibility, and safety before applying the `approved` label.",
  notice: "Prompts remain in their original language for reproducibility. Titles and descriptions use localized translations when available.",
};

const definitions = [
  ["en", "English", "README.md", {}],
  ["zh", "简体中文", "README_zh.md", {
    title: "电商 GPT Image 2 提示词大全", tagline: "面向全球电商的高质量、多语言 GPT Image 2 提示词库。",
    about: "关于本项目", aboutText: "本仓库收录可复现的电商图像提示词，并提供结构化数据、清晰署名、授权记录和多张生成预览图。",
    statistics: "统计数据", totalPrompts: "已审核提示词", totalIndustries: "行业", totalPlatforms: "电商平台", lastUpdated: "最后更新",
    categories: "按行业浏览", featured: "精选提示词", allPrompts: "全部提示词", description: "描述", prompt: "提示词",
    previews: "生成预览图", details: "详细信息", author: "作者", source: "来源", platforms: "适用平台", industry: "行业",
    useCase: "使用场景", language: "提示词语言", license: "许可证", published: "发布日期", original: "本仓库原创内容",
    contribute: "参与贡献", contributeText: "请通过 GitHub Issue 表单投稿。维护者会审核署名、版权、质量、可复现性和安全性，通过后添加 `approved` 标签。",
    notice: "为保证可复现性，提示词保留原始语言；标题和描述在有翻译时使用本地化版本。"
  }],
  ["zh-TW", "繁體中文", "README_zh-TW.md", {
    title: "電商 GPT Image 2 提示詞大全", tagline: "面向全球電商的高品質、多語言 GPT Image 2 提示詞庫。",
    about: "關於本專案", statistics: "統計資料", categories: "依產業瀏覽", featured: "精選提示詞", allPrompts: "全部提示詞",
    description: "說明", prompt: "提示詞", previews: "生成預覽圖", details: "詳細資料", author: "作者", source: "來源",
    platforms: "適用平台", industry: "產業", useCase: "使用場景", language: "提示詞語言", license: "授權", published: "發布日期",
    original: "本倉庫原創內容", contribute: "參與貢獻"
  }],
  ["ja-JP", "日本語", "README_ja-JP.md", {
    title: "EC向け GPT Image 2 プロンプト集", tagline: "世界のEC向けに厳選した多言語のGPT Image 2プロンプトライブラリ。",
    about: "このプロジェクトについて", statistics: "統計", categories: "業界別に探す", featured: "注目プロンプト", allPrompts: "すべてのプロンプト",
    description: "説明", prompt: "プロンプト", previews: "生成プレビュー", details: "詳細", author: "作者", source: "出典",
    platforms: "プラットフォーム", industry: "業界", useCase: "用途", language: "プロンプト言語", license: "ライセンス",
    published: "公開日", original: "このリポジトリのオリジナル作品", contribute: "コントリビュート"
  }],
  ["ko-KR", "한국어", "README_ko-KR.md", {
    title: "이커머스 GPT Image 2 프롬프트 모음", tagline: "글로벌 이커머스를 위한 엄선된 다국어 GPT Image 2 프롬프트 라이브러리.",
    about: "프로젝트 소개", statistics: "통계", categories: "산업별 탐색", featured: "추천 프롬프트", allPrompts: "모든 프롬프트",
    description: "설명", prompt: "프롬프트", previews: "생성 미리보기", details: "세부 정보", author: "작성자", source: "출처",
    platforms: "플랫폼", industry: "산업", useCase: "사용 사례", language: "프롬프트 언어", license: "라이선스",
    published: "게시일", original: "이 저장소의 오리지널 콘텐츠", contribute: "기여하기"
  }],
  ["th-TH", "ไทย", "README_th-TH.md", {
    title: "คลังพรอมต์ GPT Image 2 สำหรับอีคอมเมิร์ซ", tagline: "คลังพรอมต์ GPT Image 2 หลายภาษาที่คัดสรรสำหรับอีคอมเมิร์ซทั่วโลก",
    about: "เกี่ยวกับโครงการ", statistics: "สถิติ", categories: "เรียกดูตามอุตสาหกรรม", featured: "พรอมต์แนะนำ", allPrompts: "พรอมต์ทั้งหมด",
    description: "คำอธิบาย", prompt: "พรอมต์", previews: "ภาพตัวอย่าง", details: "รายละเอียด", author: "ผู้เขียน", source: "แหล่งที่มา",
    platforms: "แพลตฟอร์ม", industry: "อุตสาหกรรม", useCase: "กรณีใช้งาน", language: "ภาษาพรอมต์", license: "สัญญาอนุญาต",
    published: "วันที่เผยแพร่", original: "ผลงานต้นฉบับสำหรับคลังนี้", contribute: "ร่วมสนับสนุน"
  }],
  ["vi-VN", "Tiếng Việt", "README_vi-VN.md", {
    title: "Thư viện prompt GPT Image 2 cho thương mại điện tử", tagline: "Thư viện prompt GPT Image 2 đa ngôn ngữ được tuyển chọn cho thương mại điện tử toàn cầu.",
    about: "Giới thiệu", statistics: "Thống kê", categories: "Duyệt theo ngành", featured: "Prompt nổi bật", allPrompts: "Tất cả prompt",
    description: "Mô tả", prompt: "Prompt", previews: "Ảnh xem trước", details: "Chi tiết", author: "Tác giả", source: "Nguồn",
    platforms: "Nền tảng", industry: "Ngành", useCase: "Trường hợp sử dụng", language: "Ngôn ngữ prompt", license: "Giấy phép",
    published: "Ngày xuất bản", original: "Nội dung gốc của kho này", contribute: "Đóng góp"
  }],
  ["hi-IN", "हिन्दी", "README_hi-IN.md", {
    title: "ई-कॉमर्स GPT Image 2 प्रॉम्प्ट संग्रह", tagline: "वैश्विक ई-कॉमर्स के लिए चुनी हुई बहुभाषी GPT Image 2 प्रॉम्प्ट लाइब्रेरी।",
    about: "परियोजना के बारे में", statistics: "आँकड़े", categories: "उद्योग के अनुसार देखें", featured: "विशेष प्रॉम्प्ट", allPrompts: "सभी प्रॉम्प्ट",
    description: "विवरण", prompt: "प्रॉम्प्ट", previews: "जनरेट किए गए पूर्वावलोकन", details: "विवरण", author: "लेखक", source: "स्रोत",
    platforms: "प्लेटफ़ॉर्म", industry: "उद्योग", useCase: "उपयोग", language: "प्रॉम्प्ट भाषा", license: "लाइसेंस",
    published: "प्रकाशित", original: "इस रिपॉज़िटरी के लिए मूल रचना", contribute: "योगदान करें"
  }],
  ["es-ES", "Español", "README_es-ES.md", {
    title: "Prompts de GPT Image 2 para comercio electrónico", tagline: "Biblioteca multilingüe y seleccionada de prompts para el comercio electrónico global.",
    about: "Acerca del proyecto", statistics: "Estadísticas", categories: "Explorar por sector", featured: "Prompts destacados", allPrompts: "Todos los prompts",
    description: "Descripción", prompt: "Prompt", previews: "Vistas previas generadas", details: "Detalles", author: "Autor", source: "Fuente",
    platforms: "Plataformas", industry: "Sector", useCase: "Caso de uso", language: "Idioma del prompt", license: "Licencia",
    published: "Publicado", original: "Creación original para este repositorio", contribute: "Contribuir"
  }],
  ["es-419", "Español LATAM", "README_es-419.md", {
    title: "Prompts de GPT Image 2 para e-commerce", tagline: "Biblioteca multilingüe de prompts seleccionados para el e-commerce global.",
    about: "Acerca del proyecto", statistics: "Estadísticas", categories: "Explorar por industria", featured: "Prompts destacados", allPrompts: "Todos los prompts",
    description: "Descripción", prompt: "Prompt", previews: "Vistas previas generadas", details: "Detalles", author: "Autor", source: "Fuente",
    platforms: "Plataformas", industry: "Industria", useCase: "Caso de uso", language: "Idioma del prompt", license: "Licencia",
    published: "Publicado", original: "Creación original para este repositorio", contribute: "Contribuir"
  }],
  ["de-DE", "Deutsch", "README_de-DE.md", {
    title: "E-Commerce GPT Image 2 Prompts", tagline: "Eine kuratierte, mehrsprachige Prompt-Bibliothek für den globalen E-Commerce.",
    about: "Über das Projekt", statistics: "Statistik", categories: "Nach Branche durchsuchen", featured: "Empfohlene Prompts", allPrompts: "Alle Prompts",
    description: "Beschreibung", prompt: "Prompt", previews: "Generierte Vorschauen", details: "Details", author: "Autor", source: "Quelle",
    platforms: "Plattformen", industry: "Branche", useCase: "Anwendungsfall", language: "Prompt-Sprache", license: "Lizenz",
    published: "Veröffentlicht", original: "Originalinhalt dieses Repositorys", contribute: "Mitwirken"
  }],
  ["fr-FR", "Français", "README_fr-FR.md", {
    title: "Prompts GPT Image 2 pour l’e-commerce", tagline: "Une bibliothèque multilingue et sélectionnée de prompts pour l’e-commerce mondial.",
    about: "À propos", statistics: "Statistiques", categories: "Parcourir par secteur", featured: "Prompts en vedette", allPrompts: "Tous les prompts",
    description: "Description", prompt: "Prompt", previews: "Aperçus générés", details: "Détails", author: "Auteur", source: "Source",
    platforms: "Plateformes", industry: "Secteur", useCase: "Cas d’usage", language: "Langue du prompt", license: "Licence",
    published: "Publié", original: "Création originale pour ce dépôt", contribute: "Contribuer"
  }],
  ["it-IT", "Italiano", "README_it-IT.md", {
    title: "Prompt GPT Image 2 per e-commerce", tagline: "Una raccolta multilingue di prompt selezionati per l’e-commerce globale.",
    about: "Informazioni sul progetto", statistics: "Statistiche", categories: "Esplora per settore", featured: "Prompt in evidenza", allPrompts: "Tutti i prompt",
    description: "Descrizione", prompt: "Prompt", previews: "Anteprime generate", details: "Dettagli", author: "Autore", source: "Fonte",
    platforms: "Piattaforme", industry: "Settore", useCase: "Caso d’uso", language: "Lingua del prompt", license: "Licenza",
    published: "Pubblicato", original: "Creazione originale per questo repository", contribute: "Contribuisci"
  }],
  ["pt-BR", "Português do Brasil", "README_pt-BR.md", {
    title: "Prompts de GPT Image 2 para e-commerce", tagline: "Uma biblioteca multilíngue e selecionada de prompts para o comércio eletrônico global.",
    about: "Sobre o projeto", statistics: "Estatísticas", categories: "Explorar por setor", featured: "Prompts em destaque", allPrompts: "Todos os prompts",
    description: "Descrição", prompt: "Prompt", previews: "Pré-visualizações geradas", details: "Detalhes", author: "Autor", source: "Fonte",
    platforms: "Plataformas", industry: "Setor", useCase: "Caso de uso", language: "Idioma do prompt", license: "Licença",
    published: "Publicado", original: "Criação original para este repositório", contribute: "Contribuir"
  }],
  ["pt-PT", "Português", "README_pt-PT.md", {
    title: "Prompts GPT Image 2 para comércio eletrónico", tagline: "Uma biblioteca multilingue de prompts selecionados para o comércio eletrónico global.",
    about: "Sobre o projeto", statistics: "Estatísticas", categories: "Explorar por setor", featured: "Prompts em destaque", allPrompts: "Todos os prompts",
    description: "Descrição", prompt: "Prompt", previews: "Pré-visualizações geradas", details: "Detalhes", author: "Autor", source: "Fonte",
    platforms: "Plataformas", industry: "Setor", useCase: "Caso de utilização", language: "Idioma do prompt", license: "Licença",
    published: "Publicado", original: "Criação original para este repositório", contribute: "Contribuir"
  }],
  ["tr-TR", "Türkçe", "README_tr-TR.md", {
    title: "E-ticaret için GPT Image 2 İstemleri", tagline: "Küresel e-ticaret için seçilmiş çok dilli GPT Image 2 istem kütüphanesi.",
    about: "Proje hakkında", statistics: "İstatistikler", categories: "Sektöre göre göz at", featured: "Öne çıkan istemler", allPrompts: "Tüm istemler",
    description: "Açıklama", prompt: "İstem", previews: "Oluşturulan önizlemeler", details: "Ayrıntılar", author: "Yazar", source: "Kaynak",
    platforms: "Platformlar", industry: "Sektör", useCase: "Kullanım alanı", language: "İstem dili", license: "Lisans",
    published: "Yayın tarihi", original: "Bu depo için özgün içerik", contribute: "Katkıda bulun"
  }]
];

export const locales = definitions.map(([code, name, file, overrides]) => ({
  code,
  name,
  file,
  strings: {...base, ...overrides},
}));
