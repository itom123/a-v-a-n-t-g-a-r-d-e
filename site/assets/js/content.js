/*
 * Avantgarde Studio — site content (the single source of truth).
 * Edit text, numbers and people here; the page renders from this file.
 * Every string is { zh, en }. Anything marked `sample: true` shows a
 * visible "sample data" badge until you replace it with verified figures.
 * Add `hidden: true` to a section (alliance, programmes, journey, faculty,
 * results, journal, faq) to take it and its menu link off the page, or to a
 * single person in faculty.people to leave that card out.
 * A Chinese section title only breaks at its punctuation or at a \u200b
 * (zero-width break), e.g. "从一次作品集\u200b评估开始", so words stay whole.
 *
 * Cards with a `slug` open a subpage (journal/…, programmes/…, faculty/…). The long text of those
 * pages lives in content-pages.js. After adding or renaming a slug, ask Claude to run
 * `node _工具/build-pages.js site` so the page file exists and its built-in Chinese copy is fresh.
 */
window.SITE = {
  meta: {
    domain: "https://www.a-v-a-n-t-g-a-r-d-e.com",           // set before deploy (used in share links)
    email: "hello@a-v-a-n-t-g-a-r-d-e.com",
    wechatId: "",                                // the real WeChat ID, shown under the QR code
    wechatQr: "assets/img/wechat-qr.png",        // XG's WeCom card, redrawn with the AG mark; while empty, the WeChat block is left out
    formEnabled: true,                            // the form posts to the contact Worker (Turnstile + branded emails, live since 2026-10-29)
    formEndpoint: "https://email-api.a-v-a-n-t-g-a-r-d-e.com/v1/contact/avantgarde", // exact HTTPS Worker URL ending in /v1/contact/avantgarde
    turnstileSiteKey: "0x4AAAAAAFjo59R9YrbBSY01", // public Turnstile site key; required with formEnabled
    dock: true,                                  // phones: a "book a review" bar after the first screen; false turns it off
    sampleBadge: { zh: "示例数据 · 核实后替换", en: "Sample figures · replace once verified" }
  },

  brand: {
    zhName: "先端艺培",
    enName: "Avantgarde Studio",
    partners: [
      { key: "ag",  name: "Avantgarde Studio", local: "先端艺培" },
      { key: "sky", name: "Skyline",           local: "天际线" },
      { key: "dbrf", name: "DBRF",             local: "De Beauvoir Forum" }
    ]
  },

  nav: [
    { id: "alliance",   zh: "三方合作", en: "Alliance" },
    { id: "programmes", zh: "课程",     en: "Programmes" },
    { id: "journey",    zh: "路径",     en: "Journey" },
    { id: "faculty",    zh: "导师",     en: "Faculty" },
    { id: "results",    zh: "成果",     en: "Results" },
    { id: "journal",    zh: "内容",     en: "Journal" },
    { id: "lab",        zh: "测试",     en: "AG Lab", href: "lab/" }   // opens the AG LAB test page
  ],
  cta: { zh: "预约作品集评估", en: "Book a portfolio review" },

  hero: {
    kicker: { zh: "伦敦大师课 × 沪苏本地陪跑", en: "London masterclasses × support in Shanghai and Suzhou" },
    lead: {
      zh: "伦敦一线导师，打磨你的作品集与创作方向。",
      en: "Portfolios and creative direction, shaped with London tutors."
    },
    scroll: { zh: "向下", en: "Scroll" }
  },

  // Facts about how the studio works — true by design, not outcomes.
  facts: [
    { value: 3,  suffix: "",  label: { zh: "合作方，一条完整链路", en: "partners, one continuous path" } },
    { value: 5,  suffix: "",  label: { zh: "每期大师课席位上限", en: "masterclass seats per cohort, at most" } },
    { value: 1,  suffix: ":1", label: { zh: "导师与学生，全程", en: "tutor to student, start to finish" } },
    { value: 3,  suffix: "",  label: { zh: "申请地区：英国、香港、新加坡", en: "regions: UK, Hong Kong, Singapore" } }
  ],

  alliance: {
    title: { zh: "三方，一个工作室", en: "Three partners, one studio" },
    more: { zh: "三方怎样分工", en: "How the three work together" },
    intro: {
      zh: "伦敦给方向，沪苏两地管落地，工作室把两端接在一起。",
      en: "London sets the direction, Shanghai and Suzhou look after delivery, and the studio holds the two together."
    },
    items: [
      {
        key: "ag", tag: "01", slug: "ag",
        name: "Avantgarde Studio", local: "先端艺培",
        role: { zh: "作品集工作室", en: "Portfolio studio" },
        body: {
          zh: "尚岸光景旗下的作品集工作室：进阶创作课、作品集、文书与网申，一位主导师从评估跟到录取。线下课在苏州常熟、太仓的工作室。",
          en: "The portfolio studio of ASHORE TIME: advanced studio courses, portfolio, statements and applications, with one lead tutor from first review to offer. In-person sessions run at our Changshu and Taicang studios in Suzhou."
        }
      },
      {
        key: "sky", tag: "02", slug: "sky",
        name: "Skyline", local: "天际线",
        role: { zh: "上海 · 留学规划", en: "Shanghai · admissions planning" },
        body: {
          zh: "上海长宁的留学规划团队，八年申请经验、500 多个申请案例：咨询、选校与时间线、语言与标化、签证行前和家长沟通。",
          en: "An admissions planning team in Changning, Shanghai, with eight years’ experience and 500+ applications: enquiries, school lists and timelines, language tests, visas and pre-departure, and family communication."
        }
      },
      {
        key: "dbrf", tag: "03", slug: "dbrf",
        name: "De Beauvoir Forum", local: "DBRF",
        role: { zh: "伦敦 · 大师课与导师辅导", en: "London · masterclasses and mentoring" },
        body: {
          zh: "伦敦学者与文化工作者组成的咨询团队：小班大师课、长期一对一辅导和创意行业英语，讲研究、策展与可持续的创作生涯。",
          en: "A London consultancy of academics and cultural workers: small-group masterclasses, long-term one-to-one mentoring and English for the creative industries — on research, curating and a sustainable creative life."
        },
        motto: "Creative Practices ¤ Sustainable Economies"
      }
    ]
  },

  programmes: {
    title: { zh: "三层课程", en: "Three tiers" },
    intro: { zh: "从打基础到站上国际舞台，按需组合。", en: "From groundwork to an international stage. Combine as you need." },
    items: [
      {
        no: "01", key: "master", dark: true, slug: "masterclass",
        name: { zh: "国际大师课", en: "International Masterclass" },
        by: "DBRF · London",
        points: {
          zh: ["每期不超过 5 席", "一对一或小班", "研究方法、策展思维、创作生涯"],
          en: ["Up to 5 seats per cohort", "One-to-one or small group", "Research, curatorial thinking, creative careers"]
        },
        fit: { zh: "适合：冲刺顶尖院校的硕士与跨学科申请者", en: "For: MA and interdisciplinary applicants aiming high" }
      },
      {
        no: "02", key: "studio", slug: "advanced-studio",
        name: { zh: "进阶创作课", en: "Advanced Studio" },
        by: "Avantgarde Studio",
        points: {
          zh: ["4–6 个作品集项目", "调研 · 实验 · 制作 · 拍摄 · 排版", "按目标院校调整"],
          en: ["4–6 portfolio projects", "Research · test · make · shoot · layout", "Tailored to each target school"]
        },
        fit: { zh: "适合：本科与硕士作品集申请者", en: "For: BA and MA portfolio applicants" }
      },
      {
        no: "03", key: "apply", slug: "applications",
        name: { zh: "申请与衔接", en: "Applications" },
        by: "Avantgarde × Skyline",
        points: {
          zh: ["选校与时间线", "个人陈述、简历、面试", "网申、签证与入学前准备"],
          en: ["School list and timeline", "Statement, CV and interview", "Online applications, visa and pre-arrival"]
        },
        fit: { zh: "适合：英国、香港、新加坡申请", en: "For: UK, Hong Kong and Singapore" }
      }
    ],
    extra: {
      slug: "summer-lab",
      tag: { zh: "即将推出", en: "Coming soon" },
      name: { zh: "伦敦夏季工作营", en: "London Summer Lab" },
      body: { zh: "面向高中生的伦敦短期创作营，美术馆、工作室与导师面对面。", en: "A short London residency for secondary-school students — galleries, studios and tutors in person." }
    }
  },

  journey: {
    title: { zh: "六步，一条线", en: "Six steps, one line" },
    steps: [
      { link: "#contact", zh: "评估", en: "Assess",   d: { zh: "看作品，聊方向，给出诚实判断。", en: "We look at your work and talk direction — honestly." } },
      { link: "programmes/applications.html", zh: "定位", en: "Position", d: { zh: "确定专业、院校与时间线。", en: "Choose the course, schools and timeline." } },
      { link: "programmes/advanced-studio.html", zh: "创作", en: "Create",   d: { zh: "进阶课中完成 4–6 个项目。", en: "Build 4–6 projects in the Advanced Studio." } },
      { link: "programmes/masterclass.html", zh: "大师课", en: "Masterclass", d: { zh: "伦敦导师带你把想法推到更远。", en: "London tutors push the ideas further." } },
      { link: "programmes/applications.html", zh: "申请", en: "Apply",    d: { zh: "文书、面试、网申一次到位。", en: "Statements, interviews, submissions." } },
      { link: "programmes/applications.html", zh: "出发", en: "Arrive",   d: { zh: "录取后衔接入学与在英生活。", en: "From offer to your first week abroad." } }
    ]
  },

  faculty: {
    title: { zh: "导师", en: "Faculty" },
    intro: { zh: "在伦敦一线教学、策展与创作的人。", en: "People who teach, curate and make work in London today." },
    people: [
      // Tutors appear by their initials. LD appears as "Dr LD, Independent Curator and Reader" (2026-10-29): no full name, UAL or Chelsea anywhere in writing.
      {
        initials: "LD", slug: "ld",
        name: "Dr LD",
        role: { zh: "独立策展人、Reader · 伦敦大师课", en: "Independent Curator and Reader · London masterclass" },
        lines: {
          zh: ["策展人、学者，二十余年独立策展经验", "Electra 联合创始人（2003–2011）", "第 60 届贝尔格莱德十月沙龙联合策展人（2024）"],
          en: ["Curator and scholar, 20+ years in independent curating", "Co-founder, Electra (2003–2011)", "Co-curator, 60th October Salon, Belgrade (2024)"]
        }
      },
      {
        initials: "HS", slug: "service-design-tutor",
        name: "HS",
        role: { zh: "服务设计导师 · 方向与项目框架", en: "Service design tutor · direction and project framing" },
        lines: {
          zh: ["英国顶尖艺术院校服务设计硕士", "国际设计咨询机构资深设计师", "负责方向判断、研究方法与作品集主线"],
          en: ["MA Service Design from a leading UK art school", "Senior designer at an international design consultancy", "Direction, research methods and the portfolio’s main line"]
        }
      },
      {
        initials: "KL", slug: "curating-writing-tutor",
        name: "KL",
        role: { zh: "策展与文书导师 · 递交前把关", en: "Curating and writing tutor · final review" },
        lines: {
          zh: ["英国美术馆与艺术院校联合培养的博士研究生", "活跃于国际艺术领域的策展人", "负责文书、个人叙事与材料审阅"],
          en: ["Doctoral researcher on a joint museum and art-school programme in the UK", "Curator working internationally", "Statements, personal narrative and application review"]
        }
      },
      {
        initials: "XG", slug: "xg",
        name: "XG",
        role: { zh: "先端艺培 · 学术主理", en: "Academic lead, Avantgarde Studio" },
        lines: {
          zh: ["艺术家、研究者，常驻伦敦；英国皇家艺术学院艺术与人文学部博士候选人", "英国皇家艺术学院摄影硕士、威斯敏斯特大学心理学硕士", "伦敦艺术大学中央圣马丁学院时尚系副讲师"],
          en: ["Artist and researcher in London; PhD candidate, School of Arts & Humanities, Royal College of Art", "MA Photography, Royal College of Art; master’s in psychology, University of Westminster", "Associate Lecturer, Fashion, Central Saint Martins"]
        }
      },
      {
        initials: "+", slug: "guest-tutors",
        name: { zh: "伦敦客座导师", en: "Guest tutors, London" },
        role: { zh: "由 DBRF 邀请", en: "Invited through DBRF" },
        lines: {
          zh: ["英国艺术院校的课程主任与资深讲师", "纯艺、设计、策展方向", "名单按期公布"],
          en: ["Course leaders and senior lecturers from UK art schools", "Fine art, design and curating", "Announced each cohort"]
        }
      }
    ]
  },

  results: {
    title: { zh: "成果", en: "Results" },
    intro: {
      zh: "合作方天际线 2025–26 申请季的录取案例，以综合类专业为主。先端艺培艺术与设计方向的录取，将在首届学员后单独公布。",
      en: "Offers from our partner Skyline’s 2025–26 admissions cycle, mostly outside art and design. Avantgarde Studio’s own art and design results will be published after our first cohort."
    },
    sample: false,         // real figures: Skyline's 2025–26 offer wall (原始材料/03-offer-results). 31 cases, 22 universities, 5 countries/regions
    hidden: false,         // set true to take the whole section offline
    stats: [
      { value: 31, suffix: "", label: { zh: "个录取案例", en: "offers shared" } },
      { value: 22, suffix: "", label: { zh: "所院校", en: "universities" } },
      { value: 5,  suffix: "", label: { zh: "个国家和地区", en: "countries and regions" } }
    ],
    // Offer wall, arts and culture first. Programme names follow each university's own spelling.
    offers: [
      { school: "University College London", course: "MA Museum Studies", year: "2025–26" },
      { school: "The University of Hong Kong", course: "MA Museum Studies", year: "2025–26" },
      { school: "The University of Melbourne", course: "Master of Global Media Communication", year: "2025–26" },
      { school: "University of Oxford", course: "MSc Education", year: "2025–26" },
      { school: "University of Cambridge", course: "Engineering", year: "2025–26" },
      { school: "The Hong Kong Polytechnic University", course: "MA Teaching Chinese as a Foreign Language", year: "2025–26" },
      { school: "The University of Hong Kong", course: "Master of Education", year: "2025–26" },
      { school: "The Education University of Hong Kong", course: "MA Chinese Studies (Language Education)", year: "2025–26" },
      { school: "Lingnan University", course: "MA Chinese (Global Chinese Studies)", year: "2025–26" },
      { school: "University of British Columbia", course: "Bachelor of Arts", year: "2025–26" },
      { school: "Imperial College London", course: "MRes Cancer Biology (Cancer Informatics)", year: "2025–26" },
      { school: "Imperial College London", course: "MSc Transport", year: "2025–26" },
      { school: "Imperial College London", course: "MSc Finance and Accounting", year: "2025–26" },
      { school: "Imperial College London", course: "MSc Drug Discovery and Development", year: "2025–26" },
      { school: "London School of Economics", course: "MSc Data Science", year: "2025–26" },
      { school: "King’s College London", course: "BSc Biomedical Science", year: "2025–26" },
      { school: "King’s College London", course: "BEng Biomedical Engineering", year: "2025–26" },
      { school: "University College London", course: "BSc Cancer Biomedicine", year: "2025–26" },
      { school: "University of Manchester", course: "MSc Operations, Project and Supply Chain Management", year: "2025–26" },
      { school: "University of Manchester", course: "BSc Information Technology Management for Business", year: "2025–26" },
      { school: "University of Leeds", course: "MSc Management of Information Systems and Digital Innovation", year: "2025–26" },
      { school: "University of Bristol", course: "MSc Artificial Intelligence", year: "2025–26" },
      { school: "HKUST", course: "BSc Risk Management and Business Intelligence", year: "2025–26" },
      { school: "City University of Hong Kong", course: "MSc Management and Innovation", year: "2025–26" },
      { school: "Cornell University", course: "MPS Real Estate", year: "2025–26" },
      { school: "UCLA", course: "Master of Real Estate Development", year: "2025–26" },
      { school: "Washington University in St. Louis", course: "Master of Information Systems Management", year: "2025–26" },
      { school: "The University of Melbourne", course: "Bachelor of Science", year: "2025–26" },
      { school: "The University of Sydney", course: "Foundation Program", year: "2025–26" },
      { school: "UNSW College", course: "Foundation Program", year: "2025–26" }
    ],
    quote: null            // no consented student quote yet; add { text: {zh,en}, who: {zh,en} } once one exists
  },

  journal: {
    title: { zh: "内容", en: "Journal" },
    intro: { zh: "小红书同步更新。", en: "Also on Xiaohongshu (RedNote)." },
    all: { zh: "全部文章", en: "All articles" },
    items: [
      { slug: "curator-day", tag: { zh: "策展", en: "Curating" },  t: { zh: "策展人每天\u200b到底在做什么？", en: "What does a curator actually do all day?" }, art: "arch" },
      { slug: "work-to-question", tag: { zh: "作品集", en: "Portfolio" }, t: { zh: "一件作品，\u200b怎样长成\u200b一个展览问题", en: "How one work becomes an exhibition question" }, art: "stack" },
      { slug: "proposal-essentials", tag: { zh: "申请", en: "Applying" },  t: { zh: "一份策展提案，\u200b最少要讲清\u200b哪几件事", en: "The few things every curatorial proposal must say" }, art: "circle" },
      { slug: "group-project", tag: { zh: "协作", en: "Collaboration" }, t: { zh: "集体项目，\u200b怎样写清\u200b自己的贡献", en: "Showing your part in a group project" }, art: "grid" }
    ]
  },

  // Entry band for the AG LAB test page (site/lab/). Set hidden: true to take it off the home page.
  lab: {
    hidden: false,
    href: "lab/",
    kicker: { zh: "AG LAB · 免费测试 · 约 8 分钟", en: "AG LAB · Free · about 8 minutes" },
    title: { zh: "你是哪一种\u200b创作者？", en: "What kind of maker are you?" },
    body: {
      zh: "出生信息、56 道题和你的申请计划，合成一张创作人格卡片，并匹配国家、院校与导师风格。仅供自我探索参考。",
      en: "Your birth details, 56 questions and your plans become a creative persona card, matched with countries, schools and mentor styles. For self-reflection only."
    },
    cta: { zh: "开始测试", en: "Take the test" },
    parts: { zh: ["四柱八字", "16 型创作人格", "院校匹配"], en: ["Four Pillars", "16-type profile", "School match"] }
  },

  // Words used on buttons, cards and subpages
  ui: {
    more: { zh: "了解更多", en: "Learn more" },
    readMore: { zh: "阅读全文", en: "Read" },
    viewProgramme: { zh: "了解课程", en: "View programme" },
    viewProfile: { zh: "查看简介", en: "View profile" },
    home: { zh: "首页", en: "Home" },
    back: { zh: "返回", en: "Back" },
    minRead: { zh: "{n} 分钟读完", en: "{n} min read" },
    prev: { zh: "上一篇", en: "Previous" },
    next: { zh: "下一篇", en: "Next" },
    related: { zh: "相关课程", en: "Related programmes" },
    tutors: { zh: "带课导师", en: "Tutors" },
    questions: { zh: "常见问题", en: "Questions" },
    tryThis: { zh: "试一试", en: "Try this" },
    draft: { zh: "文案待确认 · 公开前请核对", en: "Draft copy · check before publishing" },   // shown only with ?drafts=1
    comingSoon: { zh: "即将推出", en: "Coming soon" },
    wechat: { zh: "微信咨询", en: "WeChat" },
    notFound: { zh: "这一页暂未公开。", en: "This page isn’t public yet." },
    // subpage headings
    about: { zh: "关于这门课", en: "About" },
    outcomes: { zh: "你会带走", en: "You leave with" },
    modules: { zh: "课程内容", en: "What we cover" },
    join: { zh: "怎样加入", en: "How to join" },
    bio: { zh: "简介", en: "Biography" },
    background: { zh: "履历", en: "Background" },
    focus: { zh: "方向", en: "Focus" },
    leads: { zh: "带的课程", en: "Programmes" },
    others: { zh: "其他导师", en: "Other tutors" },
    looksAfter: { zh: "负责", en: "Looks after" },
    howTheyWork: { zh: "工作方式", en: "How they work" },
    chain: { zh: "一条完整的路", en: "One continuous path" },
    by: { zh: "主理", en: "Led by" }
  },

  faq: {
    title: { zh: "常见问题", en: "Questions" },
    items: [
      {
        q: { zh: "你们保证录取吗？", en: "Do you guarantee admission?" },
        a: { zh: "不。录取由院校决定。我们保证的是扎实的过程：清晰的方向、完整的作品集和认真的每一次反馈。", en: "No. Admission decisions belong to the schools. What we promise is the process: a clear direction, a complete portfolio and careful feedback at every step." }
      },
      {
        q: { zh: "这是某所大学的官方课程吗？", en: "Is this an official university programme?" },
        a: { zh: "不是。先端艺培是尚岸光景（ASHORE TIME）旗下的工作室，不隶属任何大学。导师的教职信息仅作个人背景介绍。", en: "No. Avantgarde Studio belongs to ASHORE TIME (尚岸光景) and is not part of any university. Tutors’ academic roles are listed as personal background only." }
      },
      {
        q: { zh: "大师课和进阶课有什么区别？", en: "How is the masterclass different from the studio course?" },
        a: { zh: "进阶课帮你把作品集做完整；大师课由伦敦导师带你把思考推深，名额很少。", en: "The studio course builds a complete portfolio. The masterclass, with very few places, takes your thinking further with London tutors." }
      },
      {
        q: { zh: "线上还是线下？", en: "Online or in person?" },
        a: { zh: "大师课以线上为主，伦敦可线下。进阶课可在苏州常熟、太仓的工作室线下上课；申请咨询可在上海与天际线面谈。", en: "Masterclasses are mostly online, in person in London when possible. Studio sessions can meet at our Changshu and Taicang studios in Suzhou, and application advice in person with Skyline in Shanghai." }
      }
    ]
  },

  contact: {
    title: { zh: "从一次作品集\u200b评估开始", en: "Start with a portfolio review" },
    body: { zh: "留下联系方式，我们会在两个工作日内回复。", en: "Leave your details and we’ll reply within two working days." },
    fields: {
      name: { zh: "姓名", en: "Name" },
      contact: { zh: "微信或邮箱", en: "WeChat or email" },
      stage: { zh: "申请阶段", en: "Applying for" },
      stages: { zh: ["本科", "硕士", "还在考虑"], en: ["BA", "MA", "Not sure yet"] },
      note: { zh: "想聊的方向（选填）", en: "What would you like to talk about? (optional)" },
      send: { zh: "提交", en: "Send" },
      sent: { zh: "已打开邮件，发送即可。", en: "Your email app is open — just press send." },
      wechatHint: { zh: "微信里无法直接发邮件。请长按上方二维码加微信，或发邮件到", en: "WeChat can’t open your email app. Scan the QR code above, or write to" },
      mailHint: { zh: "微信里无法直接发邮件。请复制邮箱地址发邮件到", en: "WeChat can’t open your email app. Please write to" },
      verification: { zh: "请完成验证后再提交。", en: "Please complete verification before sending." },
      failed: { zh: "暂时无法提交，请通过上方邮箱或微信联系我们。", en: "We could not send this now. Please use the email address or WeChat above." },
      ok: { zh: "收到，我们会在两个工作日内联系你。", en: "Thank you — we’ll be in touch within two working days." },
      okAck: { zh: "收到！确认邮件已发到你的邮箱，我们会在两个工作日内联系你。", en: "Thank you — a confirmation is on its way to your inbox. We’ll be in touch within two working days." }
    },
    wechat: { zh: "扫码添加微信", en: "Add us on WeChat" }
  },

  footer: {
    line: { zh: "尚岸光景（ASHORE TIME）旗下的艺术与设计留学工作室。与天际线、De Beauvoir Forum 联合呈现。", en: "An art and design admissions studio of ASHORE TIME (尚岸光景), presented with Skyline and De Beauvoir Forum." },
    disclaimer: {
      zh: "院校名称仅用于说明申请去向，不代表任何合作或背书关系。",
      en: "University names indicate application destinations only and imply no partnership or endorsement."
    }
  }
};
