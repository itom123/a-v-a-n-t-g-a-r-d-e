/*
 * AG LAB · 创作人格实验室 — all copy, questions and data.
 * Every visible string is { zh, en }. Edit here; the page renders from it.
 * School tags are editorial judgements to be checked by the team before launch.
 */
window.LAB = {
  meta: {
    // POST endpoint for leads (see server/lead-function). Empty → falls back to email.
    leadEndpoint: "",
    // Public URL of this test, printed as a QR code on the share card.
    // Empty → uses SITE.meta.domain + "/lab/".
    shareUrl: "",
    campaign: "ag-lab-2026",
    version: "1.0.0"
  },

  ui: {
    brand: { zh: "先端艺培 · AG LAB", en: "Avantgarde Studio · AG LAB" },
    labName: { zh: "创作人格实验室", en: "Creative Persona Lab" },
    back: { zh: "返回官网", en: "Back to site" },
    introKicker: { zh: "免费测试 · 约 8 分钟", en: "Free · about 8 minutes" },
    introTitle: { zh: "你是哪一种\u200b创作者？", en: "What kind of maker are you?" }, // \u200b: where the title may break
    introLead: {
      zh: "用四柱八字读出你的五行气质，用 16 型人格看见你的创作方式，再为你匹配国家、院校与导师风格。",
      en: "Your Four Pillars reveal your elemental temperament, a 16-type profile shows how you create — then we match you with countries, schools and mentor styles."
    },
    introParts: [
      { n: "01", zh: "出生信息", en: "Birth details", d: { zh: "排出你的四柱八字", en: "Your Four Pillars chart" } },
      { n: "02", zh: "56 道题", en: "56 questions", d: { zh: "16 型创作人格与韧性", en: "Your 16-type profile and resilience" } },
      { n: "03", zh: "申请画像", en: "Your plans", d: { zh: "匹配国家、院校与导师", en: "Countries, schools and mentors" } }
    ],
    privacyPromise: {
      zh: "出生信息只在你的浏览器里计算，不会上传。",
      en: "Your birth details are calculated in your browser and never uploaded."
    },
    start: { zh: "开始测试", en: "Start" },
    resume: { zh: "继续上次的测试", en: "Continue where you left off" },
    restart: { zh: "重新开始", en: "Start over" },
    next: { zh: "下一步", en: "Next" },
    prev: { zh: "上一步", en: "Back" },
    stepOf: { zh: "第 {n} 步 / 共 3 步", en: "Step {n} of 3" },

    birthTitle: { zh: "出生信息", en: "Birth details" },
    birthLead: { zh: "越准确，排盘越准。出生时间请填写出生地当时的钟表时间。", en: "The more precise, the better. Enter the clock time where you were born." },
    calendar: { zh: "历法", en: "Calendar" },
    solar: { zh: "公历", en: "Gregorian" },
    lunar: { zh: "农历", en: "Chinese lunar" },
    date: { zh: "出生日期", en: "Date of birth" },
    year: { zh: "年", en: "Year" },
    month: { zh: "月", en: "Month" },
    day: { zh: "日", en: "Day" },
    leap: { zh: "闰", en: "Leap " },
    time: { zh: "出生时间", en: "Time of birth" },
    hour: { zh: "时", en: "Hour" },
    minute: { zh: "分", en: "Minute" },
    unknownTime: { zh: "不知道出生时间（只排三柱）", en: "I don't know my birth time (three pillars only)" },
    place: { zh: "出生地", en: "Place of birth" },
    byCity: { zh: "选择城市", en: "Choose a city" },
    byCoords: { zh: "输入经纬度", en: "Enter coordinates" },
    cityPh: { zh: "输入城市，如 深圳、Shenzhen、London", en: "Type a city, e.g. Shenzhen, London, 深圳" },
    cityLoading: { zh: "正在载入城市库…", en: "Loading cities…" },
    cityNone: { zh: "没有找到，可以改用经纬度", en: "No match — try coordinates instead" },
    lat: { zh: "纬度", en: "Latitude" },
    lon: { zh: "经度", en: "Longitude" },
    coordsHint: {
      zh: "北纬、东经为正，南纬、西经为负。也可以直接粘贴「22.54, 114.06」或「22°32′N 114°03′E」。",
      en: "North and east are positive, south and west negative. You can also paste “22.54, 114.06” or “22°32′N 114°03′E”."
    },
    coordsPaste: { zh: "粘贴坐标", en: "Paste coordinates" },
    nearCity: { zh: "附近：{city}", en: "Near {city}" },
    tzLabel: { zh: "时区", en: "Time zone" },
    tzAuto: { zh: "已按经纬度自动识别", en: "Detected from coordinates" },
    tzOffsetOn: { zh: "该日期 UTC{off}", en: "UTC{off} on that date" },
    tzDst: { zh: "（含夏令时）", en: " (daylight saving)" },
    tzChange: { zh: "更改", en: "Change" },
    tzManual: { zh: "手动选择时区", en: "Choose a time zone" },
    xinjiang: {
      zh: "出生时间是按新疆时间（UTC+6）记录的",
      en: "My birth time was recorded in Xinjiang time (UTC+6)"
    },
    xinjiangNote: {
      zh: "新疆的出生记录通常使用北京时间，默认按北京时间换算。",
      en: "Birth records in Xinjiang normally use Beijing time, so that is the default."
    },
    advanced: { zh: "专业设置", en: "Advanced settings" },
    solarTime: { zh: "时间校正", en: "Time correction" },
    stTrue: { zh: "真太阳时（经度 + 均时差，推荐）", en: "True solar time (longitude + equation of time, recommended)" },
    stMean: { zh: "平太阳时（仅经度）", en: "Mean solar time (longitude only)" },
    stClock: { zh: "不校正（钟表时间）", en: "No correction (clock time)" },
    ziRule: { zh: "子时换日", en: "Day change at 子 hour" },
    zi23: { zh: "23:00 换日（子初换日，传统）", en: "At 23:00 (classical)" },
    zi00: { zh: "00:00 换日（早晚子时）", en: "At 00:00 (early/late 子 hour)" },
    preview: { zh: "排盘预览", en: "Chart preview" },
    previewTrue: { zh: "真太阳时", en: "True solar time" },
    previewNeed: { zh: "填好日期、时间与出生地后，这里会显示你的四柱。", en: "Fill in date, time and place to see your pillars here." },

    quizTitle: { zh: "16 型创作人格", en: "Your 16-type profile" },
    quizLead: { zh: "凭第一反应选择，没有对错。越靠近哪一边，代表越像那一句。", en: "Go with your first instinct — there are no right answers. The closer you pick to a side, the more that statement sounds like you." },
    moreLeft: { zh: "更像左边", en: "More like left" },
    moreRight: { zh: "更像右边", en: "More like right" },
    neutral: { zh: "差不多", en: "About equal" },
    likert: [
      { zh: "非常不同意", en: "Strongly disagree" },
      { zh: "不同意", en: "Disagree" },
      { zh: "说不准", en: "Not sure" },
      { zh: "同意", en: "Agree" },
      { zh: "非常同意", en: "Strongly agree" }
    ],
    qOf: { zh: "{n} / {total}", en: "{n} / {total}" },
    sectionType: { zh: "性格倾向", en: "Preferences" },
    sectionRes: { zh: "创作韧性", en: "Creative resilience" },

    profileTitle: { zh: "申请画像", en: "Your plans" },
    profileLead: { zh: "这些信息决定院校匹配的主要结果。", en: "These answers drive most of the school matching." },
    seeResult: { zh: "生成我的创作人格", en: "Reveal my creative persona" },
    required: { zh: "必填", en: "Required" },
    pickUpTo: { zh: "最多选 {n} 项", en: "Pick up to {n}" },

    loading: [
      { zh: "换算出生地时区与夏令时", en: "Converting time zone and daylight saving" },
      { zh: "计算真太阳时", en: "Calculating true solar time" },
      { zh: "按节气排定四柱", en: "Setting the Four Pillars by solar terms" },
      { zh: "分析五行、旺衰与格局", en: "Weighing elements, strength and pattern" },
      { zh: "计算 16 型创作人格", en: "Scoring your 16-type profile" },
      { zh: "匹配国家、院校与导师", en: "Matching countries, schools and mentors" }
    ],

    yourPersona: { zh: "你的创作人格", en: "Your creative persona" },
    saveCard: { zh: "保存分享卡片", en: "Save share card" },
    copyLink: { zh: "复制测试链接", en: "Copy test link" },
    copied: { zh: "已复制", en: "Copied" },
    retake: { zh: "重新测试", en: "Take it again" },
    tabs: [
      { id: "wuxing", zh: "五行气质", en: "Elements" },
      { id: "chart", zh: "专业排盘", en: "Full chart" },
      { id: "type", zh: "16型人格", en: "16-type" },
      { id: "match", zh: "匹配结果", en: "Matches" }
    ],
    dayMaster: { zh: "日主", en: "Day Master" },
    elementBalance: { zh: "五行力量", en: "Element balance" },
    elementCount: { zh: "五行个数（天干地支本气）", en: "Element count (stems and main branch qi)" },
    missing: { zh: "表面缺{el}", en: "No visible {el}" },
    missingHidden: { zh: "，但藏干中有{el}", en: ", though {el} is present in hidden stems" },
    none: { zh: "五行俱全", en: "All five elements present" },
    seasonLabel: { zh: "月令", en: "Season" },
    tuWang: { zh: "土旺用事", en: "Earth-ruled days" },
    creativeModes: { zh: "创作方式（十神）", en: "How you create (ten gods)" },
    learning: { zh: "学习风格", en: "Learning style" },
    learningKeys: {
      research: { zh: "研究", en: "Research" },
      making: { zh: "动手", en: "Making" },
      industry: { zh: "项目与行业", en: "Projects & industry" }
    },

    chartTitle: { zh: "四柱八字", en: "Four Pillars" },
    rows: {
      shishen: { zh: "十神", en: "Ten god" },
      gan: { zh: "天干", en: "Stem" },
      zhi: { zh: "地支", en: "Branch" },
      hide: { zh: "藏干", en: "Hidden stems" },
      nayin: { zh: "纳音", en: "Nayin" },
      dishi: { zh: "星运", en: "Life stage" },
      zizuo: { zh: "自坐", en: "Self-seat" },
      kong: { zh: "空亡", en: "Void" }
    },
    pos: { year: { zh: "年柱", en: "Year" }, month: { zh: "月柱", en: "Month" }, day: { zh: "日柱", en: "Day" }, hour: { zh: "时柱", en: "Hour" } },
    timeTitle: { zh: "时间换算", en: "Time conversion" },
    tRecorded: { zh: "出生地钟表时间", en: "Local clock time" },
    tZone: { zh: "时区", en: "Time zone" },
    tUtc: { zh: "世界协调时 UTC", en: "UTC" },
    tLon: { zh: "经度修正", en: "Longitude correction" },
    tEot: { zh: "均时差", en: "Equation of time" },
    tSolar: { zh: "用于日柱、时柱的时间", en: "Time used for day and hour pillars" },
    tJie: { zh: "所在节令", en: "Solar term" },
    tJieFmt: { zh: "{a} 之后 · 下一节 {b}", en: "after {a} · next {b}" },
    strengthTitle: { zh: "日主旺衰", en: "Day Master strength" },
    support: { zh: "生扶", en: "Support" },
    oppose: { zh: "克泄耗", en: "Drain" },
    deLing: { zh: "得令", en: "In season" },
    deDi: { zh: "得地", en: "Rooted" },
    deShi: { zh: "得势", en: "Supported" },
    geju: { zh: "格局", en: "Pattern" },
    yong: { zh: "用神", en: "Useful element" },
    xi: { zh: "喜神", en: "Favourable" },
    ji: { zh: "忌神", en: "Unfavourable" },
    tiaohou: { zh: "调候", en: "Climate balance" },
    relations: { zh: "刑冲合会", en: "Combinations & clashes" },
    noRelations: { zh: "四柱之间没有明显的刑冲合会。", en: "No notable combinations or clashes between the pillars." },
    taiyuan: { zh: "胎元", en: "Conception pillar" },
    notes: { zh: "排盘提示", en: "Notes" },

    typeTitle: { zh: "16 型创作人格", en: "16-type creative profile" },
    clarity: { zh: "清晰度", en: "Clarity" },
    bands: { slight: { zh: "轻微", en: "slight" }, moderate: { zh: "中等", en: "moderate" }, clear: { zh: "清晰", en: "clear" }, "very-clear": { zh: "非常清晰", en: "very clear" } },
    functions: { zh: "心理功能顺序", en: "Function order" },
    fnRoles: [{ zh: "主导", en: "Dominant" }, { zh: "辅助", en: "Auxiliary" }, { zh: "第三", en: "Tertiary" }, { zh: "劣势", en: "Inferior" }],
    against: { zh: "在「{facet}」上，你反而偏向 {letter}", en: "On “{facet}”, you actually lean {letter}" },
    strengths: { zh: "创作优势", en: "Strengths in the studio" },
    edge: { zh: "可以留意", en: "Worth working on" },
    env: { zh: "适合的学习环境", en: "Where you learn best" },
    resilience: { zh: "创作韧性", en: "Creative resilience" },
    resBands: {
      steady: { zh: "沉稳：面对 crit 与不确定性都比较从容", en: "Steady: calm under critique and uncertainty" },
      balanced: { zh: "平衡：会受影响，但能调整回来", en: "Balanced: affected, but you recover" },
      sensitive: { zh: "细腻：感受深，适合节奏更温和、反馈更具体的导师", en: "Sensitive: you feel things deeply; a kinder pace and specific feedback suit you" }
    },
    quality: { zh: "作答质量", en: "Answer quality" },
    qualityLevels: { high: { zh: "高", en: "High" }, medium: { zh: "中", en: "Medium" }, low: { zh: "偏低", en: "Low" } },
    qualityFlags: {
      straight: { zh: "大部分题选了同一个选项", en: "Most answers were the same option" },
      neutral: { zh: "中间选项过多，区分度较低", en: "Many neutral answers, so the result is less clear" },
      position: { zh: "几乎总选同一侧，可能受位置影响", en: "Almost always the same side — position may have influenced answers" },
      fast: { zh: "作答非常快", en: "Answered very quickly" },
      missing: { zh: "有题目未作答", en: "Some questions were skipped" }
    },

    matchTitle: { zh: "为你匹配", en: "Your matches" },
    countriesTitle: { zh: "国家与地区", en: "Countries" },
    fangTag: { zh: "五行趣味加分", en: "Five-element bonus (for fun)" },
    mentorTitle: { zh: "适合你的导师风格", en: "Mentor style for you" },
    tutorsLabel: { zh: "以这种方式带学生的导师", en: "Tutors who teach this way" },
    schoolsTitle: { zh: "院校匹配", en: "School matches" },
    matchScore: { zh: "匹配度", en: "Match" },
    ranks: [{ zh: "最契合", en: "Best fit" }, { zh: "同样契合", en: "Also a great fit" }, { zh: "同样契合", en: "Also a great fit" }, { zh: "值得探索", en: "Worth exploring" }, { zh: "值得探索", en: "Worth exploring" }],
    noSchools: { zh: "按你的条件暂时没有合适的院校，可以放宽专业或层级再试试。", en: "Nothing fits these filters yet — try widening your subject or level." },
    locked: { zh: "留下联系方式，解锁完整院校清单与 1 对 1 解读", en: "Leave your details to unlock the full list and a 1:1 reading" },
    reasons: {
      discStrong: { zh: "{d}是这里的强项", en: "{d} is a strength here" },
      discOffered: { zh: "开设{d}方向", en: "Offers {d}" },
      style: { zh: "教学偏{s}，和你的学习方式合拍", en: "Teaching leans to {s}, which suits how you learn" },
      budgetOk: { zh: "费用在你的预算区间内", en: "Within your budget" },
      budgetStretch: { zh: "略超预算，可以关注奖学金", en: "A little over budget — look at scholarships" },
      city: { zh: "符合你想要的城市环境", en: "The kind of city you want" },
      fang: { zh: "趣味加分：你的喜用五行与这个方位相合", en: "For fun: your favourable element matches this direction" }
    },

    leadTitle: { zh: "解锁完整院校清单 + 1 对 1 解读", en: "Unlock the full school list + a 1:1 reading" },
    leadLead: { zh: "导师会结合你的排盘、人格与作品集阶段，给出更具体的选校与准备建议。", en: "A tutor will combine your chart, profile and portfolio stage into specific advice on schools and preparation." },
    fName: { zh: "称呼", en: "Name" },
    fContact: { zh: "微信号或手机号", en: "WeChat ID or phone" },
    fEmail: { zh: "邮箱（选填）", en: "Email (optional)" },
    fWho: { zh: "我是", en: "I am" },
    whoOpts: [{ v: "student", zh: "学生本人", en: "The student" }, { v: "parent", zh: "家长", en: "A parent" }],
    fAge: { zh: "学生年龄", en: "Student's age" },
    ageOpts: [{ v: "u14", zh: "未满 14 岁", en: "Under 14" }, { v: "14-17", zh: "14–17 岁", en: "14–17" }, { v: "18+", zh: "18 岁及以上", en: "18 or over" }],
    cPrivacy: { zh: "我已阅读并同意《隐私说明》，同意先端艺培为联系我、提供解读而处理以上信息。", en: "I have read the Privacy Notice and agree that Avantgarde Studio may use these details to contact me and prepare my reading." },
    cCross: { zh: "我知悉：信息存放在中国境内，先端艺培在伦敦的导师可能会查看这些信息以提供解读。", en: "I understand my details are stored in mainland China and may be viewed by Avantgarde Studio tutors in London to prepare my reading." },
    cGuardian: { zh: "我是该学生的监护人，同意提交其信息。", en: "I am the student's parent or guardian and agree to submit these details." },
    cMinorNote: { zh: "未满 14 岁的学生，请由家长填写并勾选监护人同意。", en: "For students under 14, a parent must fill this in and give consent." },
    cChart: { zh: "（选填）附上我的出生日期、时间与排盘，便于导师深度解读。", en: "(Optional) Include my birth date, time and chart so the tutor can go deeper." },
    privacyLink: { zh: "隐私说明", en: "Privacy Notice" },
    submit: { zh: "提交并解锁", en: "Submit and unlock" },
    sending: { zh: "提交中…", en: "Sending…" },
    unlockedMsg: { zh: "已解锁！导师会在 2 个工作日内联系你。", en: "Unlocked! A tutor will contact you within 2 working days." },
    mailFallback: { zh: "已打开邮件，发送后即完成登记。", en: "Your email app is open — send it to finish." },
    errRequired: { zh: "请填写称呼与联系方式，并勾选必需的同意项。", en: "Please add your name and contact, and tick the required boxes." },
    errSend: { zh: "提交没有成功，请稍后再试，或直接添加我们的微信。", en: "That didn't go through. Please try again, or add us on WeChat." },

    methodTitle: { zh: "方法与说明", en: "Method and notes" },
    disclaimer: {
      zh: "本测试用于自我探索与创作方向参考，不构成任何预测，也不能预测录取结果。院校匹配基于你填写的申请信息与编辑判断，申请前请以院校官方信息为准。",
      en: "This test is for self-reflection and creative direction only. It makes no predictions and cannot predict admission. School matches are based on your answers and our editorial judgement; always check official school information."
    },
    errors: {
      BAD_DATE: { zh: "这个日期不存在，请检查。", en: "That date doesn't exist." },
      YEAR_RANGE: { zh: "目前支持 1901–2099 年出生。", en: "Birth years 1901–2099 are supported." },
      NO_LEAP_MONTH: { zh: "该农历年没有这个闰月。", en: "That lunar year has no such leap month." },
      BAD_LUNAR_DAY: { zh: "该农历月没有这一天。", en: "That lunar month doesn't have this day." },
      BAD_LUNAR_MONTH: { zh: "农历月份无效。", en: "Invalid lunar month." },
      BAD_COORDS: { zh: "请检查经纬度（纬度 −90~90，经度 −180~180）。", en: "Check the coordinates (latitude −90 to 90, longitude −180 to 180)." },
      BAD_ZONE: { zh: "无法识别时区，请手动选择。", en: "Time zone not recognised — please choose one." },
      LIB_MISSING: { zh: "排盘组件没有加载成功，请刷新页面。", en: "The chart library failed to load. Please refresh." },
      NO_PLACE: { zh: "请选择出生城市或输入经纬度。", en: "Choose a city or enter coordinates." },
      TERM_RANGE: { zh: "节气数据超出范围。", en: "Solar-term data out of range." }
    },
    flags: {
      NEAR_JIE: { zh: "出生时刻距离「{term}」交接约 {m} 分钟，月柱（逢立春时连同年柱）对时间非常敏感，请尽量确认准确时间。", en: "Born about {m} minutes from the {term} solar term: the month pillar (and the year, at 立春) depends on the exact time." },
      NEAR_SHICHEN: { zh: "真太阳时距离时辰交界约 {m} 分钟，时柱可能落在相邻时辰。", en: "Solar time is about {m} minutes from an hour boundary, so the hour pillar could be the neighbouring one." },
      LATE_ZI: { zh: "出生于 23:00–24:00（夜子时），当前按「{rule}」处理，可在专业设置中切换。", en: "Born 23:00–24:00 (late 子 hour); currently treated as “{rule}”. You can switch this in Advanced settings." },
      JIE_DAY_UNKNOWN_HOUR: { zh: "出生当天正逢「{term}」交接，未知时辰时月柱可能有两种情况。", en: "The {term} solar term fell on your birthday, so without a time the month pillar could be either." },
      NO_HOUR: { zh: "未提供出生时间：只排年、月、日三柱，力量与格局判断的误差会更大。", en: "No birth time: three pillars only, so strength and pattern are less certain." },
      DST_GAP: { zh: "该时刻恰逢夏令时拨快，当地钟表上并不存在，已按拨快前的时间换算。", en: "This time was skipped by a daylight-saving change; converted using the offset before the change." },
      DST_OVERLAP: { zh: "该时刻恰逢夏令时拨回、钟表上出现了两次，已按第一次（夏令时）换算。", en: "This time happened twice when clocks went back; converted as the first (daylight-saving) occurrence." }
    },
    ruleNames: { "23": { zh: "23:00 换日", en: "day changes at 23:00" }, "00": { zh: "00:00 换日", en: "day changes at 00:00" } }
  },

  /* ---------------- 八字 wording ---------------- */
  wx: [
    { zh: "木", en: "Wood", key: { zh: "生长 · 叙事 · 生态", en: "growth · narrative · ecology" }, d: { zh: "像植物一样重视过程与生长，作品里常有时间和生命的痕迹。", en: "Like a plant, you value process and growth; time and life show in your work." } },
    { zh: "火", en: "Fire", key: { zh: "表达 · 光 · 现场", en: "expression · light · the live moment" }, d: { zh: "外放、有感染力，作品需要被看见，也擅长点燃别人。", en: "Outgoing and infectious; your work wants to be seen, and you light others up." } },
    { zh: "土", en: "Earth", key: { zh: "结构 · 空间 · 手艺", en: "structure · space · craft" }, d: { zh: "稳重、包容，擅长承载与建构，重视手感与空间。", en: "Steady and containing; you build and hold, with a feel for touch and space." } },
    { zh: "金", en: "Metal", key: { zh: "精确 · 形式 · 设计", en: "precision · form · design" }, d: { zh: "敏锐、讲究，追求清晰的形式与完成度。", en: "Sharp and exacting; you pursue clear form and finish." } },
    { zh: "水", en: "Water", key: { zh: "流动 · 研究 · 记忆", en: "flow · research · memory" }, d: { zh: "深而灵活，擅长观念、研究与记忆的打捞。", en: "Deep and fluid; drawn to ideas, research and recovering memory." } }
  ],
  // Day-master images (the ten heavenly stems)
  dayMasters: [
    { img: { zh: "参天之木", en: "A tall tree" }, d: { zh: "向上生长、有主见、有担当", en: "grows upward, holds its ground" } },
    { img: { zh: "藤萝花草", en: "Vines and grasses" }, d: { zh: "柔韧、灵活、善于借势", en: "supple, adaptable, finds a way round" } },
    { img: { zh: "太阳", en: "The sun" }, d: { zh: "明亮、外放、有感染力", en: "bright, outward, infectious" } },
    { img: { zh: "灯烛", en: "Candlelight" }, d: { zh: "专注、温暖、照亮细处", en: "focused, warm, lights up details" } },
    { img: { zh: "高山", en: "The mountain" }, d: { zh: "稳重、包容、可以依靠", en: "steady, containing, dependable" } },
    { img: { zh: "田园", en: "Fields and gardens" }, d: { zh: "滋养、细致、善于经营", en: "nurturing, attentive, cultivating" } },
    { img: { zh: "矿石与刀剑", en: "Ore and blade" }, d: { zh: "果断、锋利、讲原则", en: "decisive, sharp, principled" } },
    { img: { zh: "珠玉", en: "Jewels" }, d: { zh: "精致、敏锐、重质感", en: "refined, perceptive, texture-minded" } },
    { img: { zh: "江河", en: "The river" }, d: { zh: "开阔、奔放、善于流动", en: "expansive, restless, far-reaching" } },
    { img: { zh: "雨露", en: "Rain and dew" }, d: { zh: "细腻、渗透、想象丰富", en: "subtle, seeping, imaginative" } }
  ],
  seasonStatus: { "旺": { zh: "旺", en: "prosperous" }, "相": { zh: "相", en: "rising" }, "休": { zh: "休", en: "resting" }, "囚": { zh: "囚", en: "confined" }, "死": { zh: "死", en: "dormant" } },
  strengthLevels: {
    "extreme-strong": { zh: "极强（专旺之势）", en: "Very strong (dominant)" },
    "strong": { zh: "身强", en: "Strong" },
    "slightly-strong": { zh: "偏强", en: "Slightly strong" },
    "slightly-weak": { zh: "偏弱", en: "Slightly weak" },
    "weak": { zh: "身弱", en: "Weak" },
    "extreme-weak": { zh: "极弱（从势之象）", en: "Very weak (following)" }
  },
  yongWhy: {
    "strong-yin": { zh: "日主偏强，力量多来自印星：取财星制印，喜食伤泄秀。", en: "A strong Day Master fed mainly by Resource: Wealth restrains it, Output lets it flow." },
    "strong-bijie-guan": { zh: "日主偏强，比劫较多：取官杀制比劫，喜财星生官。", en: "A strong Day Master with many Peers: Authority restrains them, Wealth feeds Authority." },
    "strong-bijie-xie": { zh: "日主偏强，比劫多而官杀不显：取食伤泄秀，喜财星。", en: "A strong Day Master with many Peers and little Authority: Output releases the energy, Wealth follows." },
    "weak-cai": { zh: "日主偏弱，财星偏重：取比劫帮身，喜印星。", en: "A weak Day Master under heavy Wealth: Peers support it, Resource helps." },
    "weak-guan": { zh: "日主偏弱，官杀偏重：取印星化杀生身，喜比劫。", en: "A weak Day Master under heavy Authority: Resource transforms the pressure, Peers help." },
    "weak-shishang": { zh: "日主偏弱，食伤偏重：取印星制食伤、生身，喜比劫。", en: "A weak Day Master drained by Output: Resource restrains Output and supports you." },
    "zhuanwang": { zh: "日主极旺且得令，呈专旺之势：顺其气势，取比劫与印星。此为特殊格局，建议导师人工复核。", en: "An overwhelming, in-season Day Master: follow its momentum with Peers and Resource. A special pattern — worth a tutor's review." },
    "cong": { zh: "日主极弱、无根无助，呈从势：顺从最旺之神。此为特殊格局，建议导师人工复核。", en: "A rootless, unsupported Day Master that follows the strongest force. A special pattern — worth a tutor's review." }
  },
  tiaoHou: {
    4: { zh: "生于夏季、水气不足，调候宜水。", en: "Born in summer with little Water: Water cools the chart." },
    1: { zh: "生于冬季、火气不足，调候宜火。", en: "Born in winter with little Fire: Fire warms the chart." }
  },
  tiaoHouConflict: { zh: "调候与扶抑取向不同，需兼顾权衡。", en: "Climate balance and strength point different ways, so both need weighing." },
  modes: {
    expression: { zh: "表达", en: "Expression", god: "食伤", d: { zh: "把感受转成作品，重视产出与个人风格", en: "turning feeling into work; output and personal style" } },
    research: { zh: "研究", en: "Research", god: "印", d: { zh: "读、想、查，作品背后有理论与方法", en: "reading and thinking; method behind the work" } },
    structure: { zh: "结构", en: "Structure", god: "官杀", d: { zh: "规则、系统与高标准，喜欢有难度的挑战", en: "rules, systems and high standards; hard challenges" } },
    applied: { zh: "应用", en: "Application", god: "财", d: { zh: "关注观众、市场与作品怎样被使用", en: "audience, market and how work is used" } },
    collaboration: { zh: "协作", en: "Collaboration", god: "比劫", d: { zh: "在同伴与集体中获得能量", en: "energy from peers and collectives" } }
  },
  fang: {
    UK: { zh: "英国在西，西方属金；北纬 51°、多雨，也合水。", en: "The UK lies west (Metal); northern and rainy (Water)." },
    HK: { zh: "香港在东南沿海、离家近：东方属木，中央属土。", en: "Hong Kong is south-east and close to home: East (Wood), Centre (Earth)." },
    SG: { zh: "新加坡近赤道，南方属火。", en: "Singapore sits near the equator: the South (Fire)." }
  },

  /* ---------------- 16-type items ----------------
   * a = the E / S / T / J statement, b = the I / N / F / P statement.
   * swap:true shows b on the left. Every facet has two of each. */
  facets: {
    energy: { zh: "能量来源", en: "Energy" },
    expression: { zh: "表达方式", en: "Expression" },
    connection: { zh: "社交方式", en: "Connection" },
    perception: { zh: "信息偏好", en: "Perception" },
    orientation: { zh: "关注方向", en: "Orientation" },
    learning: { zh: "学习方式", en: "Learning" },
    deciding: { zh: "决策依据", en: "Deciding" },
    feedback: { zh: "反馈方式", en: "Feedback" },
    evaluating: { zh: "评判标准", en: "Evaluating" },
    planning: { zh: "计划性", en: "Planning" },
    pace: { zh: "工作节奏", en: "Pace" },
    closure: { zh: "收束方式", en: "Closure" }
  },
  items: [
    { id: "ei1", d: "EI", f: "energy", swap: false, a: { zh: "忙了一周，和朋友出去聚聚最能回血", en: "After a long week, going out with friends recharges me" }, b: { zh: "忙了一周，一个人待着最能回血", en: "After a long week, time alone recharges me" } },
    { id: "ei2", d: "EI", f: "energy", swap: true, a: { zh: "工作室里有人一起做，我更有状态", en: "I work best in a studio buzzing with people" }, b: { zh: "工作室里安静独处，我更有状态", en: "I work best when the studio is quiet and I'm alone" } },
    { id: "ei3", d: "EI", f: "energy", swap: false, a: { zh: "开幕酒会让我兴奋，想多认识些人", en: "Opening nights energise me — I want to meet people" }, b: { zh: "开幕酒会让我有点累，看完作品就想走", en: "Opening nights tire me — I see the work and slip away" } },
    { id: "ei4", d: "EI", f: "energy", swap: true, a: { zh: "空闲的周末，我想约人出去", en: "On a free weekend I'd rather make plans with people" }, b: { zh: "空闲的周末，我想留给自己", en: "On a free weekend I'd rather keep it for myself" } },

    { id: "ei5", d: "EI", f: "expression", swap: true, a: { zh: "想法常常是边说边成形的", en: "My ideas take shape as I talk them through" }, b: { zh: "想法要先在脑子里想清楚再说", en: "I think an idea through before I say it" } },
    { id: "ei6", d: "EI", f: "expression", swap: false, a: { zh: "小组讨论时，我通常很快开口", en: "In group discussions I usually speak up early" }, b: { zh: "小组讨论时，我通常先听，想好再说", en: "In group discussions I listen first, then speak" } },
    { id: "ei7", d: "EI", f: "expression", swap: true, a: { zh: "卡住的时候，我喜欢找人聊一聊", en: "When I'm stuck, I like to talk it out" }, b: { zh: "卡住的时候，我喜欢自己先琢磨", en: "When I'm stuck, I work it out on my own first" } },
    { id: "ei8", d: "EI", f: "expression", swap: false, a: { zh: "别人通常很容易看出我在想什么", en: "People can usually tell what I'm thinking" }, b: { zh: "我的很多想法，别人不太容易看出来", en: "A lot of what I think stays on the inside" } },

    { id: "ei9", d: "EI", f: "connection", swap: false, a: { zh: "我喜欢认识很多不同圈子的人", en: "I like knowing people across many circles" }, b: { zh: "我更珍惜少数几个很懂我的人", en: "I treasure a few people who really get me" } },
    { id: "ei10", d: "EI", f: "connection", swap: true, a: { zh: "到了新环境，我会先主动打招呼", en: "In a new place, I'm the one who says hello first" }, b: { zh: "到了新环境，我熟悉了才慢慢打开", en: "In a new place, I open up once I've settled in" } },
    { id: "ei11", d: "EI", f: "connection", swap: false, a: { zh: "一大群人一起创作让我很兴奋", en: "Making work with a big group excites me" }, b: { zh: "我更享受一个人把作品做完", en: "I'd rather see a piece through on my own" } },
    { id: "ei12", d: "EI", f: "connection", swap: true, a: { zh: "我乐意在很多人面前讲自己的作品", en: "I'm happy presenting my work to a full room" }, b: { zh: "我更喜欢一对一地聊自己的作品", en: "I'd rather talk about my work one-to-one" } },

    { id: "sn1", d: "SN", f: "perception", swap: false, a: { zh: "看一幅画，我先注意材料、笔触和细节", en: "Looking at a painting, I first notice materials, marks and details" }, b: { zh: "看一幅画，我先想它在表达什么", en: "Looking at a painting, I first wonder what it's saying" } },
    { id: "sn2", d: "SN", f: "perception", swap: true, a: { zh: "讲一件事，我会讲清具体经过", en: "When I tell a story, I give the concrete sequence" }, b: { zh: "讲一件事，我更爱讲它给我的感觉和意义", en: "When I tell a story, I talk about its feeling and meaning" } },
    { id: "sn3", d: "SN", f: "perception", swap: false, a: { zh: "我相信亲眼看到、亲手摸到的东西", en: "I trust what I can see and touch" }, b: { zh: "我相信直觉和预感，哪怕说不清原因", en: "I trust hunches, even when I can't explain them" } },
    { id: "sn4", d: "SN", f: "perception", swap: true, a: { zh: "我记住的多是事实和具体细节", en: "I tend to remember facts and specifics" }, b: { zh: "我记住的多是整体印象和联想", en: "I tend to remember the overall impression and associations" } },

    { id: "sn5", d: "SN", f: "orientation", swap: true, a: { zh: "我更关心一个想法现在能不能做出来", en: "I care whether an idea can be made now" }, b: { zh: "我更关心一个想法将来可能变成什么", en: "I care what an idea could become" } },
    { id: "sn6", d: "SN", f: "orientation", swap: false, a: { zh: "我喜欢把一种做法练到极致", en: "I like to perfect one method" }, b: { zh: "我总想试试没人用过的做法", en: "I keep wanting to try methods no one has used" } },
    { id: "sn7", d: "SN", f: "orientation", swap: true, a: { zh: "“实际可行”最能说服我", en: "“It works in practice” convinces me" }, b: { zh: "“从没见过”最能吸引我", en: "“I've never seen that before” pulls me in" } },
    { id: "sn8", d: "SN", f: "orientation", swap: false, a: { zh: "我喜欢脚踏实地，一步一步往前", en: "I like to move forward step by step, feet on the ground" }, b: { zh: "我常常一下子跳到很远的想象里", en: "I often leap far ahead in my imagination" } },

    { id: "sn9", d: "SN", f: "learning", swap: false, a: { zh: "学新软件，我喜欢跟着教程一步步来", en: "Learning new software, I follow a tutorial step by step" }, b: { zh: "学新软件，我喜欢先到处点点、自己摸索", en: "Learning new software, I click around and figure it out" } },
    { id: "sn10", d: "SN", f: "learning", swap: true, a: { zh: "我更喜欢有清晰示例的讲解", en: "I prefer explanations with clear examples" }, b: { zh: "我更喜欢先讲原理，再自己举一反三", en: "I prefer the principle first, then I work out the rest" } },
    { id: "sn11", d: "SN", f: "learning", swap: false, a: { zh: "读理论时，我会想它和实际有什么关系", en: "Reading theory, I ask how it applies in practice" }, b: { zh: "读理论时，我会被概念本身迷住", en: "Reading theory, I get hooked on the ideas themselves" } },
    { id: "sn12", d: "SN", f: "learning", swap: true, a: { zh: "我更愿意用验证过的方法做事", en: "I'd rather use a proven method" }, b: { zh: "我更愿意找一种新的方法做事", en: "I'd rather find a new way to do it" } },

    { id: "tf1", d: "TF", f: "deciding", swap: false, a: { zh: "做决定时，我先看是否合理、合逻辑", en: "When deciding, I first check whether it's logical" }, b: { zh: "做决定时，我先看它对人有什么影响", en: "When deciding, I first consider how it affects people" } },
    { id: "tf2", d: "TF", f: "deciding", swap: true, a: { zh: "选题时，我更看重论证是否站得住", en: "Choosing a project, I weigh whether the argument holds up" }, b: { zh: "选题时，我更看重它是否打动我", en: "Choosing a project, I weigh whether it moves me" } },
    { id: "tf3", d: "TF", f: "deciding", swap: false, a: { zh: "朋友诉苦时，我倾向帮他分析怎么解决", en: "When a friend is upset, I help them work out a solution" }, b: { zh: "朋友诉苦时，我倾向先陪伴、先理解", en: "When a friend is upset, I listen and stay with them first" } },
    { id: "tf4", d: "TF", f: "deciding", swap: true, a: { zh: "别人常说我很理性", en: "People often call me rational" }, b: { zh: "别人常说我很有同理心", en: "People often call me empathetic" } },

    { id: "tf5", d: "TF", f: "feedback", swap: true, a: { zh: "给同学的作品提意见，我会直接指出问题", en: "Giving feedback on a peer's work, I name the problems directly" }, b: { zh: "给同学的作品提意见，我会先肯定再委婉建议", en: "Giving feedback, I start with what works and suggest gently" } },
    { id: "tf6", d: "TF", f: "feedback", swap: false, a: { zh: "在 crit 上被尖锐批评，我更在意说得对不对", en: "In a tough crit, I care whether the critique is right" }, b: { zh: "在 crit 上被尖锐批评，我更在意对方的态度", en: "In a tough crit, I notice how it was said" } },
    { id: "tf7", d: "TF", f: "feedback", swap: true, a: { zh: "我觉得说实话比照顾情绪更重要", en: "Being honest matters more than sparing feelings" }, b: { zh: "我觉得怎么说和说什么一样重要", en: "How something is said matters as much as what is said" } },
    { id: "tf8", d: "TF", f: "feedback", swap: false, a: { zh: "讨论时，我不介意为观点争一争", en: "In discussion, I don't mind a good argument" }, b: { zh: "讨论时，我更希望大家和气地达成共识", en: "In discussion, I'd rather we agree kindly" } },

    { id: "tf9", d: "TF", f: "evaluating", swap: false, a: { zh: "评价作品，我看它是否达成了自己的目标", en: "I judge a work by whether it achieves its aims" }, b: { zh: "评价作品，我看它是否真诚、有温度", en: "I judge a work by whether it's sincere and warm" } },
    { id: "tf10", d: "TF", f: "evaluating", swap: true, a: { zh: "规则应该对每个人一视同仁", en: "Rules should apply equally to everyone" }, b: { zh: "规则应该考虑每个人的具体处境", en: "Rules should consider each person's situation" } },
    { id: "tf11", d: "TF", f: "evaluating", swap: false, a: { zh: "严密的分析更容易说服我", en: "A rigorous analysis persuades me" }, b: { zh: "真实的故事更容易说服我", en: "A true story persuades me" } },
    { id: "tf12", d: "TF", f: "evaluating", swap: true, a: { zh: "在团队里，我最在意事情做得好不好", en: "In a team, I care most whether the work is good" }, b: { zh: "在团队里，我最在意大家相处得好不好", en: "In a team, I care most about how everyone is getting on" } },

    { id: "jp1", d: "JP", f: "planning", swap: false, a: { zh: "出门旅行前，我喜欢把行程排好", en: "Before a trip, I like the itinerary sorted" }, b: { zh: "出门旅行，我喜欢到了再说", en: "On a trip, I like to decide as I go" } },
    { id: "jp2", d: "JP", f: "planning", swap: true, a: { zh: "我的桌面和文件夹通常井井有条", en: "My desk and folders are usually organised" }, b: { zh: "我的桌面和文件夹通常是“乱中有序”", en: "My desk and folders are “organised chaos”" } },
    { id: "jp3", d: "JP", f: "planning", swap: false, a: { zh: "有明确的计划，我会更安心", en: "A clear plan puts me at ease" }, b: { zh: "计划排得太满，我会觉得被困住", en: "Too much planning makes me feel boxed in" } },
    { id: "jp4", d: "JP", f: "planning", swap: true, a: { zh: "我喜欢提前把一周安排好", en: "I like to plan my week in advance" }, b: { zh: "我喜欢让一周保持弹性", en: "I like to keep my week flexible" } },

    { id: "jp5", d: "JP", f: "pace", swap: true, a: { zh: "接到作业，我通常马上开始", en: "When I get an assignment, I start right away" }, b: { zh: "接到作业，我常在截止前集中爆发", en: "When I get an assignment, I often do my best work near the deadline" } },
    { id: "jp6", d: "JP", f: "pace", swap: false, a: { zh: "事情没做完，我会一直惦记", en: "Unfinished tasks nag at me" }, b: { zh: "事情没做完，我也能先放一放", en: "I can leave unfinished tasks for a while" } },
    { id: "jp7", d: "JP", f: "pace", swap: true, a: { zh: "我习惯把大任务拆成小步，按时推进", en: "I break big tasks into steps and keep to a schedule" }, b: { zh: "我习惯灵感来了，一口气做完", en: "I work in bursts when inspiration hits" } },
    { id: "jp8", d: "JP", f: "pace", swap: false, a: { zh: "截止日期让我紧张，我喜欢留足余量", en: "Deadlines stress me — I like a buffer" }, b: { zh: "截止日期让我兴奋，压力下更有灵感", en: "Deadlines excite me — pressure sparks ideas" } },

    { id: "jp9", d: "JP", f: "closure", swap: false, a: { zh: "方案定下来后，我不喜欢再大改", en: "Once a plan is set, I don't like big changes" }, b: { zh: "方案定了，有更好的想法我也愿意推翻", en: "Even after a plan is set, I'll tear it up for a better idea" } },
    { id: "jp10", d: "JP", f: "closure", swap: true, a: { zh: "我喜欢尽快做决定，把事情定下来", en: "I like to decide quickly and settle things" }, b: { zh: "我喜欢多留些选择，晚一点再定", en: "I like to keep options open and decide later" } },
    { id: "jp11", d: "JP", f: "closure", swap: false, a: { zh: "作品完成时，我喜欢有“收尾”的感觉", en: "I like the feeling of finishing a piece" }, b: { zh: "我的作品对我来说总是“进行中”", en: "My work always feels in progress" } },
    { id: "jp12", d: "JP", f: "closure", swap: true, a: { zh: "面对选择，我不喜欢悬而未决", en: "I dislike leaving choices hanging" }, b: { zh: "面对选择，我享受还有可能性的状态", en: "I enjoy the state where things are still possible" } }
  ],
  resilience: [
    { id: "r1", key: 1, t: { zh: "被批评之后，我通常能很快调整状态", en: "After criticism, I usually bounce back quickly" } },
    { id: "r2", key: -1, t: { zh: "一次失败会让我怀疑自己是否适合做艺术", en: "One failure can make me doubt whether I'm cut out for art" } },
    { id: "r3", key: 1, t: { zh: "面对不确定的结果，我能保持平静", en: "I stay calm when outcomes are uncertain" } },
    { id: "r4", key: -1, t: { zh: "我常担心作品不够好，迟迟不敢拿出来", en: "I often worry my work isn't good enough to show" } },
    { id: "r5", key: 1, t: { zh: "压力大的时候，我仍能按自己的节奏做事", en: "Under pressure, I can still work at my own pace" } },
    { id: "r6", key: -1, t: { zh: "别人的否定会让我难过很久", en: "Rejection stays with me for a long time" } },
    { id: "r7", key: 1, t: { zh: "我相信能力可以通过练习不断提高", en: "I believe skill grows with practice" } },
    { id: "r8", key: -1, t: { zh: "看到同龄人更出色，我会很焦虑", en: "Seeing peers do better makes me anxious" } }
  ],

  /* ---------------- 16 types ---------------- */
  types: {
    INTJ: { name: { zh: "系统构想者", en: "The Systems Visionary" }, line: { zh: "先看见整体，再一步步把复杂的想法搭起来。", en: "You see the whole first, then build complex ideas piece by piece." }, strengths: { zh: "概念清晰、结构严谨，适合长线的研究型项目。", en: "Clear concepts and rigorous structure — made for long, research-led projects." }, edge: { zh: "试着更早把半成品拿出来给人看。", en: "Show work in progress earlier than feels comfortable." }, env: { zh: "给你独立时间、反馈标准又高的地方。", en: "Independence plus high-standard feedback." } },
    INTP: { name: { zh: "概念实验者", en: "The Concept Tinkerer" }, line: { zh: "对“为什么”永远好奇，喜欢把想法拆开再重装。", en: "Endlessly curious about why; you take ideas apart and rebuild them." }, strengths: { zh: "原创性强，擅长提出别人没想到的问题。", en: "Original; you ask the questions others miss." }, edge: { zh: "给自己设截止点，让想法落成作品。", en: "Set yourself endpoints so ideas become finished work." }, env: { zh: "允许自由探索、重视思辨的研讨课。", en: "Open-ended seminars that reward thinking." } },
    ENTJ: { name: { zh: "项目统筹者", en: "The Project Director" }, line: { zh: "目标清楚，能把人和资源推向结果。", en: "Clear goals; you move people and resources toward a result." }, strengths: { zh: "规划与执行力强，适合大型展览和团队项目。", en: "Strong planning and delivery — big shows and team projects." }, edge: { zh: "给不确定、需要慢慢酝酿的部分留点空间。", en: "Leave room for the slow, uncertain parts of making." }, env: { zh: "有真实项目、真实截止日期的课程。", en: "Courses with real briefs and real deadlines." } },
    ENTP: { name: { zh: "观念挑衅者", en: "The Provocateur" }, line: { zh: "喜欢挑战惯例，一场讨论能迸出十个新方向。", en: "You love to challenge conventions; one debate sparks ten new directions." }, strengths: { zh: "反应快、敢提问，擅长跨学科的点子。", en: "Quick and fearless; great at cross-disciplinary ideas." }, edge: { zh: "选定一个方向做深，而不是同时开十个头。", en: "Pick one direction and go deep instead of starting ten." }, env: { zh: "鼓励辩论与实验的开放环境。", en: "Open environments that reward debate and experiment." } },
    INFJ: { name: { zh: "意义编织者", en: "The Meaning Weaver" }, line: { zh: "关心作品背后的意义，把个人经验连到更大的问题。", en: "You care about meaning, linking personal experience to bigger questions." }, strengths: { zh: "洞察深、叙事有层次，适合研究型与叙事型创作。", en: "Deep insight and layered storytelling." }, edge: { zh: "不必等“想清楚”才动手，边做边想也可以。", en: "Don't wait to have it all figured out — think by making." }, env: { zh: "小班、重对话、有耐心的导师。", en: "Small groups, real dialogue, patient mentors." } },
    INFP: { name: { zh: "内心叙事者", en: "The Inner Storyteller" }, line: { zh: "忠于自己的感受，作品里常有很私人的温度。", en: "True to your inner world; your work carries a personal warmth." }, strengths: { zh: "真诚、感受力强，擅长个人叙事与情感表达。", en: "Sincere and sensitive — personal narrative and emotion." }, edge: { zh: "把 crit 当成对作品的讨论，而不是对你的评价。", en: "Treat critique as a conversation about the work, not about you." }, env: { zh: "尊重个人方向、氛围温和的工作室。", en: "Studios that respect your direction and feel kind." } },
    ENFJ: { name: { zh: "社群策展人", en: "The Community Curator" }, line: { zh: "擅长把人聚在一起，让作品和观众真正相遇。", en: "You bring people together and let work meet its audience." }, strengths: { zh: "沟通力、组织力强，适合策展、社区艺术与教育。", en: "Communication and organising — curating, community art, education." }, edge: { zh: "也给自己的创作留时间，不只照顾别人。", en: "Save time for your own work, not only for others." }, env: { zh: "有合作项目和公开展示机会的课程。", en: "Collaborative projects and public-facing work." } },
    ENFP: { name: { zh: "灵感播种者", en: "The Idea Seeder" }, line: { zh: "点子多、热情高，总能看到新的可能性。", en: "Full of ideas and enthusiasm; you see possibilities everywhere." }, strengths: { zh: "想象力丰富，擅长跨媒介与概念发散。", en: "Imaginative across media; great at opening concepts up." }, edge: { zh: "用小截止点帮自己把灵感收成作品。", en: "Use small deadlines to turn sparks into finished pieces." }, env: { zh: "自由度高、同时有导师帮你收束的地方。", en: "Freedom, with a mentor who helps you land ideas." } },
    ISTJ: { name: { zh: "档案匠人", en: "The Archive Keeper" }, line: { zh: "严谨可靠，喜欢把事情一件件做扎实。", en: "Rigorous and reliable; you do things properly, one by one." }, strengths: { zh: "细节准确、方法扎实，适合档案、修复与系统化项目。", en: "Precise and methodical — archives, conservation, systems." }, edge: { zh: "偶尔打破自己的规则，给实验留点空间。", en: "Break your own rules sometimes and let experiment in." }, env: { zh: "结构清晰、评估标准明确的课程。", en: "Clear structure and clear criteria." } },
    ISFJ: { name: { zh: "细节守护者", en: "The Detail Guardian" }, line: { zh: "温和细心，记得每个细节，也记得每个人。", en: "Gentle and attentive; you remember every detail and every person." }, strengths: { zh: "耐心、手上功夫好，适合工艺、插画与需要打磨的作品。", en: "Patient, skilled hands — craft, illustration, careful work." }, edge: { zh: "相信自己的判断，更大胆地表达观点。", en: "Trust your judgement and state your view more boldly." }, env: { zh: "有稳定指导、循序渐进的工作室。", en: "Steady guidance and step-by-step progress." } },
    ESTJ: { name: { zh: "制作监制", en: "The Production Lead" }, line: { zh: "务实高效，让计划准时变成现实。", en: "Practical and efficient; you turn plans into reality on time." }, strengths: { zh: "执行和管理能力强，适合制作、产品与行业项目。", en: "Delivery and management — production, product, industry briefs." }, edge: { zh: "对没有标准答案的开放问题多一点耐心。", en: "Give open questions with no right answer some patience." }, env: { zh: "与行业连接紧、以成果为导向的课程。", en: "Industry-linked, outcome-driven courses." } },
    ESFJ: { name: { zh: "展览主持人", en: "The Host" }, line: { zh: "热情周到，让每个参与的人都感到被照顾。", en: "Warm and considerate; everyone around you feels looked after." }, strengths: { zh: "协调与沟通出色，适合展览运营、艺术管理与教育。", en: "Coordination and people skills — exhibitions, arts management, education." }, edge: { zh: "听听自己真正想做什么，而不只是满足期待。", en: "Listen to what you want to make, not only to expectations." }, env: { zh: "团队合作多、氛围友好的课程。", en: "Friendly, team-based courses." } },
    ISTP: { name: { zh: "材料工程师", en: "The Material Engineer" }, line: { zh: "动手解决问题，懂材料和工具怎么运作。", en: "You solve problems with your hands and know how materials behave." }, strengths: { zh: "技术与制作能力强，适合雕塑、产品与影像技术。", en: "Technical and making skills — sculpture, product, image-making." }, edge: { zh: "练习用语言讲清作品背后的想法。", en: "Practise putting the idea behind the work into words." }, env: { zh: "设备好、工坊时间多的学校。", en: "Great workshops and lots of making time." } },
    ISFP: { name: { zh: "感官诗人", en: "The Sensory Poet" }, line: { zh: "对颜色、质感和氛围极其敏感，用作品说话。", en: "Acutely sensitive to colour, texture and mood; your work speaks for you." }, strengths: { zh: "审美直觉强，适合绘画、时装、摄影与材料实验。", en: "Strong aesthetic instinct — painting, fashion, photography, material." }, edge: { zh: "给作品配一段清楚的文字，让别人读懂你。", en: "Pair your work with clear writing so others can follow you." }, env: { zh: "安静、自由、重视个人风格的工作室。", en: "Quiet, free studios that value personal style." } },
    ESTP: { name: { zh: "现场行动派", en: "The Live Maker" }, line: { zh: "边做边想，擅长即兴和现场反应。", en: "You think by doing and thrive on improvisation." }, strengths: { zh: "行动快、胆子大，适合影像、表演与现场装置。", en: "Fast and bold — film, performance, live installation." }, edge: { zh: "做完之后回头复盘，把经验变成方法。", en: "Look back after each piece and turn experience into method." }, env: { zh: "项目多、节奏快、能马上上手的课程。", en: "Fast-paced, hands-on project courses." } },
    ESFP: { name: { zh: "舞台表演者", en: "The Performer" }, line: { zh: "有感染力，天生知道怎样抓住观众。", en: "Magnetic; you instinctively know how to hold an audience." }, strengths: { zh: "表现力强，适合时装、表演、影像与活动策划。", en: "Expressive — fashion, performance, film, events." }, edge: { zh: "给作品加上研究的厚度，让表达更有分量。", en: "Add research depth so the expression carries more weight." }, env: { zh: "展示机会多、氛围活跃的学校。", en: "Lively schools with lots of chances to show work." } }
  },
  fn: {
    Se: { zh: "外倾实感", en: "Extraverted Sensing", d: { zh: "当下的感官与行动", en: "present-moment senses and action" } },
    Si: { zh: "内倾实感", en: "Introverted Sensing", d: { zh: "经验、细节与记忆", en: "experience, detail and memory" } },
    Ne: { zh: "外倾直觉", en: "Extraverted Intuition", d: { zh: "发散联想与可能性", en: "possibilities and connections" } },
    Ni: { zh: "内倾直觉", en: "Introverted Intuition", d: { zh: "洞察、模式与远景", en: "insight, patterns and the long view" } },
    Te: { zh: "外倾思考", en: "Extraverted Thinking", d: { zh: "组织与效率", en: "organising for results" } },
    Ti: { zh: "内倾思考", en: "Introverted Thinking", d: { zh: "内在逻辑与原理", en: "inner logic and principles" } },
    Fe: { zh: "外倾情感", en: "Extraverted Feeling", d: { zh: "关系、氛围与共识", en: "harmony and shared values" } },
    Fi: { zh: "内倾情感", en: "Introverted Feeling", d: { zh: "个人价值与真诚", en: "personal values and authenticity" } }
  },
  letters: {
    E: { zh: "外倾", en: "Extraversion" }, I: { zh: "内倾", en: "Introversion" },
    S: { zh: "实感", en: "Sensing" }, N: { zh: "直觉", en: "Intuition" },
    T: { zh: "思考", en: "Thinking" }, F: { zh: "情感", en: "Feeling" },
    J: { zh: "判断", en: "Judging" }, P: { zh: "感知", en: "Perceiving" }
  },

  /* ---------------- archetypes: element × temperament ---------------- */
  archetypes: {
    "0NF": { zh: "生长叙事者", en: "The Story Grower", d: { zh: "让作品像植物一样，慢慢长出意义。", en: "You let meaning grow in the work, slowly, like a plant." } },
    "0NT": { zh: "系统园丁", en: "The System Gardener", d: { zh: "为想法搭好枝干，再让它们自己生长。", en: "You build a trellis for ideas, then let them grow." } },
    "0SJ": { zh: "耐心织造者", en: "The Patient Weaver", d: { zh: "一针一线，把时间织进作品。", en: "Stitch by stitch, you weave time into the work." } },
    "0SP": { zh: "野生采集者", en: "The Wild Forager", d: { zh: "在城市与自然里捡拾材料和灵感。", en: "You gather materials and ideas from city and wild." } },
    "1NF": { zh: "点灯人", en: "The Lamplighter", d: { zh: "用作品照亮别人没注意到的角落。", en: "Your work lights up corners others overlook." } },
    "1NT": { zh: "火花实验者", en: "The Spark Experimenter", d: { zh: "把大胆的假设点燃成作品。", en: "You ignite bold hypotheses into work." } },
    "1SJ": { zh: "舞台营造者", en: "The Stage Builder", d: { zh: "为光与观众搭好一座舞台。", en: "You build the stage where light meets the audience." } },
    "1SP": { zh: "现场燃烧者", en: "The Live Flame", d: { zh: "在现场与当下最耀眼。", en: "You burn brightest live, in the moment." } },
    "2NF": { zh: "容器诗人", en: "The Vessel Poet", d: { zh: "为记忆与情感做一个可以栖身的容器。", en: "You make vessels where memory and feeling can rest." } },
    "2NT": { zh: "空间建筑师", en: "The Space Architect", d: { zh: "用结构和空间组织思想。", en: "You organise thought through structure and space." } },
    "2SJ": { zh: "工艺守护者", en: "The Craft Keeper", d: { zh: "守住手艺，也让它延续下去。", en: "You keep a craft alive and carry it forward." } },
    "2SP": { zh: "材料雕塑者", en: "The Material Sculptor", d: { zh: "和泥土、木头与金属直接对话。", en: "You talk directly with clay, wood and metal." } },
    "3NF": { zh: "珠玉雕琢者", en: "The Gem Cutter", d: { zh: "把感受打磨成精确而闪光的形式。", en: "You cut feeling into precise, luminous form." } },
    "3NT": { zh: "形式工程师", en: "The Form Engineer", d: { zh: "用逻辑与比例设计清晰的形式。", en: "You design clear form with logic and proportion." } },
    "3SJ": { zh: "精准排版师", en: "The Precision Typesetter", d: { zh: "相信秩序本身就是一种美。", en: "You believe order is its own kind of beauty." } },
    "3SP": { zh: "锋利造型师", en: "The Sharp Stylist", d: { zh: "下手果断，风格锋利。", en: "A decisive hand and a sharp style." } },
    "4NF": { zh: "夜航档案家", en: "The Night Archivist", d: { zh: "在记忆与档案里航行，打捞被遗忘的故事。", en: "You sail through memory and archives, recovering lost stories." } },
    "4NT": { zh: "深海研究者", en: "The Deep Researcher", d: { zh: "潜到问题最深处，再带回清晰的答案。", en: "You dive to the bottom of a question and come back with clarity." } },
    "4SJ": { zh: "河流记录者", en: "The River Recorder", d: { zh: "耐心记录流动的日常与时间。", en: "You patiently record the flow of daily life and time." } },
    "4SP": { zh: "漂流影像者", en: "The Drifting Lens", d: { zh: "带着镜头漂流，捕捉稍纵即逝的瞬间。", en: "You drift with a lens, catching fleeting moments." } }
  },

  /* ---------------- mentors ---------------- */
  mentors: {
    critical: { zh: "思辨型导师", en: "The Critical Mentor", d: { zh: "用问题推你往深处走，适合研究型与观念型创作。", en: "Pushes you deeper with questions — ideal for research-led and conceptual work." } },
    studio: { zh: "手作型导师", en: "The Studio Mentor", d: { zh: "陪你在材料与工坊里找答案，重视动手与试错。", en: "Finds answers with you in materials and workshops — making and testing." } },
    project: { zh: "项目型导师", en: "The Project Mentor", d: { zh: "像行业一样推进作品，节点清楚、目标明确。", en: "Runs your work like a real brief — clear milestones and goals." } },
    dialogue: { zh: "对话型导师", en: "The Dialogue Mentor", d: { zh: "先理解你，再推动你；节奏更温和，反馈更具体。", en: "Understands you first, then pushes — a kinder pace and specific feedback." } }
  },
  // Named tutors appear only when enabled. avoidSchools removes a tutor whenever
  // a programme they teach on is among the recommendations (conflict of interest).
  tutors: [
    { id: "tom", enabled: true, name: { zh: "XG", en: "XG" }, styles: ["critical", "dialogue"], note: { zh: "摄影、影像与档案实践；研究型创作", en: "Photography, moving image and archival practice" }, avoidSchools: ["csm", "rca"] },
  ],

  /* ---------------- application profile ---------------- */
  disciplines: {
    fine: { zh: "纯艺术", en: "Fine art" },
    curating: { zh: "策展与艺术史", en: "Curating & art history" },
    photo: { zh: "摄影与影像", en: "Photography & moving image" },
    graphic: { zh: "视觉传达与插画", en: "Graphic design & illustration" },
    fashion: { zh: "时装与纺织", en: "Fashion & textiles" },
    interaction: { zh: "交互与新媒体", en: "Interaction & digital media" },
    spatial: { zh: "建筑与空间", en: "Architecture & spatial design" },
    product: { zh: "产品设计", en: "Product design" },
    craft: { zh: "珠宝与工艺", en: "Jewellery & crafts" },
    film: { zh: "电影与动画", en: "Film & animation" }
  },
  profile: [
    { key: "level", required: true, q: { zh: "申请层级", en: "Level" }, opts: [
      { v: "BA", zh: "本科", en: "Undergraduate (BA)" }, { v: "FD", zh: "预科", en: "Foundation" },
      { v: "MA", zh: "硕士", en: "Postgraduate (MA)" }, { v: "any", zh: "还不确定", en: "Not sure yet" }] },
    { key: "disciplines", required: true, multi: 2, q: { zh: "想学的方向", en: "What you want to study" }, fromDisciplines: true },
    { key: "stage", required: true, q: { zh: "作品集进度", en: "Portfolio stage" }, opts: [
      { v: 0, zh: "还没开始", en: "Not started" }, { v: 1, zh: "有一些作品", en: "Some pieces" },
      { v: 2, zh: "有完整项目", en: "A few full projects" }, { v: 3, zh: "基本成型", en: "Nearly ready" }] },
    { key: "timeline", required: true, q: { zh: "计划什么时候申请", en: "When you plan to apply" }, opts: [
      { v: 0, zh: "今年", en: "This year" }, { v: 1, zh: "明年", en: "Next year" }, { v: 2, zh: "两年或更久以后", en: "In two years or more" }] },
    { key: "budget", required: true, q: { zh: "每年总预算（学费 + 生活）", en: "Yearly budget (fees + living)" }, opts: [
      { v: 1, zh: "25 万以内", en: "Under ¥250k" }, { v: 2, zh: "25–40 万", en: "¥250–400k" },
      { v: 3, zh: "40–55 万", en: "¥400–550k" }, { v: 4, zh: "55 万以上", en: "Over ¥550k" }, { v: 0, zh: "还不确定", en: "Not sure" }] },
    { key: "city", required: true, q: { zh: "想要的城市", en: "The city you want" }, opts: [
      { v: "metro", zh: "国际大都会", en: "A global city" }, { v: "mid", zh: "有文化气息的中型城市", en: "A smaller culture city" },
      { v: "near", zh: "离家近一点", en: "Closer to home" }, { v: "any", zh: "都可以", en: "Anywhere" }] },
    { key: "ielts", required: false, q: { zh: "雅思（选填）", en: "IELTS (optional)" }, opts: [
      { v: "none", zh: "还没考", en: "Not taken" }, { v: "<6", zh: "6.0 以下", en: "Below 6.0" },
      { v: "6-6.5", zh: "6.0–6.5", en: "6.0–6.5" }, { v: "7+", zh: "7.0 及以上", en: "7.0+" }] }
  ],

  /* ---------------- countries ---------------- */
  countries: {
    UK: { zh: "英国", en: "United Kingdom", d: { zh: "硕士多为一年制，本科三年（中国高中毕业生通常先读一年预科）；研究与 crit 文化浓厚。", en: "One-year MAs and three-year BAs (usually after a foundation year); a strong research and crit culture." } },
    HK: { zh: "香港", en: "Hong Kong", d: { zh: "离家近、中英双语环境，媒体与设计产业活跃。", en: "Close to home and bilingual, with lively media and design industries." } },
    SG: { zh: "新加坡", en: "Singapore", d: { zh: "多元文化、生活安全，设计与数字媒体发展迅速。", en: "Multicultural and safe, with fast-growing design and digital media." } }
  },

  /* ---------------- schools ----------------
   * disc: 2 = a strength, 1 = offered. style: research / making / industry (0–1).
   * cost: 1 (lowest) – 4 (central London). selectivity: 1–3. Editorial; verify. */
  schools: [
    { id: "rca", country: "UK", cityType: "metro", levels: ["MA"], cost: 4, selectivity: 3, name: { zh: "皇家艺术学院", en: "Royal College of Art" }, city: { zh: "伦敦", en: "London" }, disc: { fine: 2, curating: 1, photo: 2, graphic: 2, fashion: 2, interaction: 2, spatial: 2, product: 2, craft: 2, film: 1 }, style: { research: 0.8, making: 0.75, industry: 0.5 }, note: { zh: "只招研究生的艺术设计学院，研究与跨学科实践并重。", en: "A postgraduate-only art and design school; research and cross-disciplinary practice." } },
    { id: "csm", country: "UK", cityType: "metro", levels: ["FD", "BA", "MA"], cost: 4, selectivity: 3, name: { zh: "中央圣马丁", en: "Central Saint Martins" }, city: { zh: "伦敦", en: "London" }, disc: { fine: 2, curating: 1, graphic: 2, fashion: 2, product: 2, craft: 2, spatial: 1, interaction: 1, photo: 1 }, style: { research: 0.6, making: 0.85, industry: 0.6 }, note: { zh: "实验精神鲜明，时装与设计享誉国际。", en: "Famously experimental; renowned for fashion and design." } },
    { id: "chelsea", country: "UK", cityType: "metro", levels: ["FD", "BA", "MA"], cost: 4, selectivity: 2, name: { zh: "切尔西艺术学院", en: "Chelsea College of Arts" }, city: { zh: "伦敦", en: "London" }, disc: { fine: 2, curating: 2, spatial: 2, graphic: 1, fashion: 1, product: 1 }, style: { research: 0.7, making: 0.75, industry: 0.4 }, note: { zh: "纯艺与空间设计见长。", en: "Strong in fine art and spatial design." } },
    { id: "camberwell", country: "UK", cityType: "metro", levels: ["FD", "BA", "MA"], cost: 4, selectivity: 2, name: { zh: "坎伯韦尔艺术学院", en: "Camberwell College of Arts" }, city: { zh: "伦敦", en: "London" }, disc: { fine: 2, photo: 2, graphic: 2, spatial: 1, craft: 1 }, style: { research: 0.5, making: 0.85, industry: 0.4 }, note: { zh: "社区感强，插画、摄影与动手实践突出。", en: "Close-knit; illustration, photography and hands-on making." } },
    { id: "lcc", country: "UK", cityType: "metro", levels: ["FD", "BA", "MA"], cost: 4, selectivity: 2, name: { zh: "伦敦传媒学院", en: "London College of Communication" }, city: { zh: "伦敦", en: "London" }, disc: { graphic: 2, photo: 2, film: 2, interaction: 2 }, style: { research: 0.5, making: 0.7, industry: 0.85 }, note: { zh: "平面、摄影、影视与交互设计，行业连接紧密。", en: "Graphic design, photography, screen and interaction, close to industry." } },
    { id: "lcf", country: "UK", cityType: "metro", levels: ["FD", "BA", "MA"], cost: 4, selectivity: 2, name: { zh: "伦敦时装学院", en: "London College of Fashion" }, city: { zh: "伦敦", en: "London" }, disc: { fashion: 2, craft: 1, photo: 1 }, style: { research: 0.4, making: 0.7, industry: 0.9 }, note: { zh: "覆盖时装设计、商业、媒体与造型。", en: "Fashion design, business, media and styling." } },
    { id: "wimbledon", country: "UK", cityType: "metro", levels: ["FD", "BA", "MA"], cost: 4, selectivity: 2, name: { zh: "温布尔登艺术学院", en: "Wimbledon College of Arts" }, city: { zh: "伦敦", en: "London" }, disc: { fine: 2, film: 1, spatial: 1, fashion: 1 }, style: { research: 0.5, making: 0.85, industry: 0.6 }, note: { zh: "纯艺与舞台、服装设计。", en: "Fine art plus theatre and costume design." } },
    { id: "goldsmiths", country: "UK", cityType: "metro", levels: ["BA", "MA"], cost: 4, selectivity: 3, name: { zh: "伦敦大学金史密斯学院", en: "Goldsmiths, University of London" }, city: { zh: "伦敦", en: "London" }, disc: { fine: 2, curating: 2, interaction: 2, photo: 1, graphic: 1, film: 1 }, style: { research: 0.9, making: 0.6, industry: 0.4 }, note: { zh: "观念艺术与批判理论传统深厚。", en: "A deep tradition of conceptual art and critical theory." } },
    { id: "slade", country: "UK", cityType: "metro", levels: ["BA", "MA"], cost: 4, selectivity: 3, name: { zh: "斯莱德美术学院（UCL）", en: "Slade School of Fine Art, UCL" }, city: { zh: "伦敦", en: "London" }, disc: { fine: 2 }, style: { research: 0.8, making: 0.8, industry: 0.2 }, note: { zh: "纯艺名校，班级小、竞争激烈。", en: "A renowned fine art school; small cohorts, highly competitive." } },
    { id: "courtauld", country: "UK", cityType: "metro", levels: ["BA", "MA"], cost: 4, selectivity: 3, name: { zh: "考陶尔德艺术学院", en: "The Courtauld Institute of Art" }, city: { zh: "伦敦", en: "London" }, disc: { curating: 2 }, style: { research: 1, making: 0.1, industry: 0.4 }, note: { zh: "艺术史与策展研究重镇。", en: "A centre for art history and curatorial research." } },
    { id: "bartlett", country: "UK", cityType: "metro", levels: ["BA", "MA"], cost: 4, selectivity: 3, name: { zh: "巴特莱特建筑学院（UCL）", en: "The Bartlett School of Architecture, UCL" }, city: { zh: "伦敦", en: "London" }, disc: { spatial: 2 }, style: { research: 0.9, making: 0.7, industry: 0.5 }, note: { zh: "建筑与空间研究的顶尖学院。", en: "A leading school for architecture and spatial research." } },
    { id: "kingston", country: "UK", cityType: "metro", levels: ["FD", "BA", "MA"], cost: 3, selectivity: 2, name: { zh: "金斯顿艺术学院", en: "Kingston School of Art" }, city: { zh: "伦敦近郊", en: "Kingston, London" }, disc: { graphic: 2, fashion: 2, product: 2, spatial: 2, film: 2, fine: 1, curating: 1, photo: 1 }, style: { research: 0.5, making: 0.9, industry: 0.7 }, note: { zh: "伦敦近郊，设计与动手实践见长。", en: "Outer London; strong in design and making." } },
    { id: "ravensbourne", country: "UK", cityType: "metro", levels: ["BA", "MA"], cost: 3, selectivity: 1, name: { zh: "拉文斯本大学", en: "Ravensbourne University London" }, city: { zh: "伦敦", en: "London" }, disc: { interaction: 2, film: 2, graphic: 2, fashion: 1, spatial: 1, product: 1 }, style: { research: 0.3, making: 0.8, industry: 0.9 }, note: { zh: "数字媒体与行业项目导向。", en: "Digital media and industry-led projects." } },
    { id: "gsa", country: "UK", cityType: "mid", levels: ["BA", "MA"], cost: 2, selectivity: 2, name: { zh: "格拉斯哥艺术学院", en: "The Glasgow School of Art" }, city: { zh: "格拉斯哥", en: "Glasgow" }, disc: { fine: 2, graphic: 2, spatial: 2, product: 2, fashion: 1, interaction: 1, craft: 1, curating: 1, photo: 1 }, style: { research: 0.7, making: 0.9, industry: 0.5 }, note: { zh: "工作室文化浓厚的苏格兰艺术学院。", en: "A Scottish art school with a strong studio culture." } },
    { id: "eca", country: "UK", cityType: "mid", levels: ["BA", "MA"], cost: 2, selectivity: 2, name: { zh: "爱丁堡艺术学院", en: "Edinburgh College of Art" }, city: { zh: "爱丁堡", en: "Edinburgh" }, disc: { fine: 2, graphic: 2, spatial: 2, curating: 1, fashion: 1, interaction: 1, product: 1, craft: 1, film: 1, photo: 1 }, style: { research: 0.8, making: 0.7, industry: 0.4 }, note: { zh: "综合性研究大学中的艺术学院。", en: "An art college inside a research university." } },
    { id: "mmu", country: "UK", cityType: "mid", levels: ["FD", "BA", "MA"], cost: 2, selectivity: 1, name: { zh: "曼彻斯特艺术学院", en: "Manchester School of Art" }, city: { zh: "曼彻斯特", en: "Manchester" }, disc: { fine: 2, graphic: 2, fashion: 2, photo: 2, spatial: 1, product: 1, craft: 1, film: 1, interaction: 1 }, style: { research: 0.5, making: 0.8, industry: 0.7 }, note: { zh: "专业齐全，生活成本相对较低。", en: "A broad range of courses and lower living costs." } },
    { id: "leeds", country: "UK", cityType: "mid", levels: ["FD", "BA", "MA"], cost: 1, selectivity: 1, name: { zh: "利兹艺术大学", en: "Leeds Arts University" }, city: { zh: "利兹", en: "Leeds" }, disc: { fine: 2, graphic: 2, fashion: 1, photo: 1, film: 1, craft: 1 }, style: { research: 0.4, making: 0.85, industry: 0.6 }, note: { zh: "专注艺术设计的小而精的大学。", en: "A small, specialist arts university." } },
    { id: "uca", country: "UK", cityType: "small", levels: ["FD", "BA", "MA"], cost: 2, selectivity: 1, name: { zh: "创意艺术大学", en: "University for the Creative Arts" }, city: { zh: "法纳姆 · 坎特伯雷 · 埃普索姆", en: "Farnham · Canterbury · Epsom" }, disc: { fashion: 2, photo: 2, film: 2, craft: 1, fine: 1, graphic: 1, product: 1, spatial: 1 }, style: { research: 0.4, making: 0.9, industry: 0.7 }, note: { zh: "小镇校区，专注动手实践。", en: "Small-town campuses focused on making." } },
    { id: "aub", country: "UK", cityType: "small", levels: ["FD", "BA", "MA"], cost: 2, selectivity: 1, name: { zh: "伯恩茅斯艺术大学", en: "Arts University Bournemouth" }, city: { zh: "伯恩茅斯", en: "Bournemouth" }, disc: { film: 2, fashion: 2, photo: 2, graphic: 1, fine: 1, spatial: 1, craft: 1 }, style: { research: 0.3, making: 0.9, industry: 0.8 }, note: { zh: "海边小城，影视、动画与造型实践强。", en: "A seaside town; strong in film, animation and costume." } },
    { id: "falmouth", country: "UK", cityType: "small", levels: ["FD", "BA", "MA"], cost: 1, selectivity: 1, name: { zh: "法尔茅斯大学", en: "Falmouth University" }, city: { zh: "法尔茅斯", en: "Falmouth" }, disc: { photo: 2, film: 2, graphic: 2, interaction: 2, fine: 1, fashion: 1 }, style: { research: 0.3, making: 0.9, industry: 0.8 }, note: { zh: "康沃尔海边，插画、游戏与摄影出名。", en: "On the Cornish coast; known for illustration, games and photography." } },

    { id: "hku", country: "HK", cityType: "metro", levels: ["BA", "MA"], cost: 3, selectivity: 3, name: { zh: "香港大学", en: "The University of Hong Kong" }, city: { zh: "香港", en: "Hong Kong" }, disc: { spatial: 2, curating: 1 }, style: { research: 0.9, making: 0.4, industry: 0.5 }, note: { zh: "研究型综合大学，建筑与艺术史见长。", en: "A research university strong in architecture and art history." } },
    { id: "cuhk", country: "HK", cityType: "metro", levels: ["BA", "MA"], cost: 2, selectivity: 2, name: { zh: "香港中文大学艺术系", en: "CUHK Department of Fine Arts" }, city: { zh: "香港", en: "Hong Kong" }, disc: { fine: 2, curating: 1 }, style: { research: 0.7, making: 0.65, industry: 0.3 }, note: { zh: "中西艺术并重，兼顾创作与艺术史。", en: "Chinese and Western art, studio and history together." } },
    { id: "cityu", country: "HK", cityType: "metro", levels: ["BA", "MA"], cost: 2, selectivity: 2, name: { zh: "香港城市大学创意媒体学院", en: "School of Creative Media, CityU" }, city: { zh: "香港", en: "Hong Kong" }, disc: { interaction: 2, film: 2, photo: 1, graphic: 1 }, style: { research: 0.6, making: 0.8, industry: 0.6 }, note: { zh: "媒体艺术、动画与创意科技。", en: "Media art, animation and creative technology." } },
    { id: "polyu", country: "HK", cityType: "metro", levels: ["BA", "MA"], cost: 2, selectivity: 2, name: { zh: "香港理工大学设计学院", en: "PolyU School of Design" }, city: { zh: "香港", en: "Hong Kong" }, disc: { graphic: 2, interaction: 2, spatial: 2, product: 2, fashion: 1 }, style: { research: 0.5, making: 0.7, industry: 0.9 }, note: { zh: "设计与产业结合紧密。", en: "Design closely tied to industry." } },
    { id: "hkbu", country: "HK", cityType: "metro", levels: ["BA", "MA"], cost: 2, selectivity: 1, name: { zh: "香港浸会大学视觉艺术院", en: "HKBU Academy of Visual Arts" }, city: { zh: "香港", en: "Hong Kong" }, disc: { fine: 2, craft: 1, photo: 1, graphic: 1, curating: 1 }, style: { research: 0.6, making: 0.8, industry: 0.4 }, note: { zh: "重视工作室实践的视觉艺术学院。", en: "A studio-based visual arts academy." } },
    { id: "hkapa", country: "HK", cityType: "metro", levels: ["BA", "MA"], cost: 2, selectivity: 2, name: { zh: "香港演艺学院", en: "The Hong Kong Academy for Performing Arts" }, city: { zh: "香港", en: "Hong Kong" }, disc: { film: 2, spatial: 1, fashion: 1 }, style: { research: 0.3, making: 0.9, industry: 0.8 }, note: { zh: "电影电视与舞台制作。", en: "Film, television and stage production." } },

    { id: "ntu", country: "SG", cityType: "metro", levels: ["BA", "MA"], cost: 3, selectivity: 3, name: { zh: "南洋理工大学艺术设计与媒体学院", en: "NTU School of Art, Design and Media" }, city: { zh: "新加坡", en: "Singapore" }, disc: { graphic: 2, interaction: 2, film: 2, photo: 1, product: 1, curating: 1 }, style: { research: 0.6, making: 0.7, industry: 0.7 }, note: { zh: "研究型大学中的艺术与媒体学院。", en: "Art and media inside a research university." } },
    { id: "lasalle", country: "SG", cityType: "metro", levels: ["BA", "MA"], cost: 3, selectivity: 2, name: { zh: "拉萨尔艺术学院", en: "LASALLE College of the Arts" }, city: { zh: "新加坡", en: "Singapore" }, disc: { fine: 2, fashion: 2, graphic: 2, film: 2, spatial: 1, interaction: 1, product: 1, curating: 1 }, style: { research: 0.5, making: 0.8, industry: 0.7 }, note: { zh: "新加坡艺术大学成员，实践与行业并重。", en: "Part of the University of the Arts Singapore; practice and industry." } },
    { id: "nafa", country: "SG", cityType: "metro", levels: ["BA"], cost: 2, selectivity: 1, name: { zh: "南洋艺术学院", en: "Nanyang Academy of Fine Arts" }, city: { zh: "新加坡", en: "Singapore" }, disc: { fine: 2, graphic: 1, fashion: 1, spatial: 1 }, style: { research: 0.4, making: 0.9, industry: 0.5 }, note: { zh: "新加坡艺术大学成员，东西方艺术交融。", en: "Part of the University of the Arts Singapore; East meets West." } }
  ],

  method: {
    bazi: [
      { zh: "时间：按出生地的历史时区规则（含中国 1986–1991 年夏令时、英国夏令时等）换算成世界协调时，再按出生地经度与均时差得到真太阳时。", en: "Time: the local clock time is converted to UTC using the birthplace's historic time-zone rules (including China's 1986–1991 and UK daylight saving), then to true solar time using longitude and the equation of time." },
      { zh: "年柱以立春交节时刻为界，月柱以十二节的精确交节时刻为界；节气时刻来自寿星天文历算法（lunar-javascript）。", en: "The year pillar changes at the exact moment of 立春 and the month pillar at each of the twelve 节; solar-term instants come from the Shouxing astronomical algorithm (lunar-javascript)." },
      { zh: "日柱、时柱按真太阳时排定；子时换日默认 23:00（子初换日），可切换为 00:00（早晚子时）。", en: "Day and hour pillars use true solar time; the day changes at 23:00 by default (classical), or at 00:00 if you choose." },
      { zh: "五行力量：天干各计 1；地支按藏干本气、中气、余气分配（0.6/0.3/0.1，两干者 0.7/0.3），月支权重 3、日支 1.5、年支与时支 1；再按月令旺相休囚死（1.2/1.1/1.0/0.9/0.8）调整，四立前十八日按土旺用事。", en: "Element strength: each stem scores 1; each branch splits its weight across hidden stems (0.6/0.3/0.1, or 0.7/0.3), with the month branch weighted 3, the day branch 1.5 and year and hour 1; scores are then adjusted by season (1.2/1.1/1.0/0.9/0.8), with Earth ruling the 18 days before each season begins." },
      { zh: "旺衰：比较生扶（比劫、印）与克泄耗（食伤、财、官杀）的力量，并参考得令、得地、得势。", en: "Strength compares support (Peers, Resource) with drain (Output, Wealth, Authority), alongside season, roots and stem support." },
      { zh: "格局：月令藏干透出天干者为格（本气优先），禄、刃另论。喜用以扶抑为主、调候为辅；特殊格局会提示人工复核。", en: "Pattern: the month branch's hidden stem that appears on a stem sets the pattern (main qi first), with 禄 and 刃 treated separately. Favourable elements follow strength first and climate second; special patterns are flagged for review." },
      { zh: "本页不涉及大运、流年或任何预测。", en: "No luck cycles, yearly forecasts or predictions of any kind." }
    ],
    type: [
      { zh: "48 道原创双极题，覆盖 E/I、S/N、T/F、J/P 四个维度，每个维度 3 个层面、各 4 题；左右两侧的倾向交替出现，以抵消总选同一边的偏差。", en: "48 original bipolar items across the four preference pairs, three facets each with four items; the pole sides alternate to cancel position bias." },
      { zh: "结果以百分比与清晰度（轻微、中等、清晰、非常清晰）呈现；得分相同时按惯例归入 I、N、F、P。另含 8 题创作韧性量表（部分反向计分），并检查作答质量。", en: "Results show a percentage and a clarity band; exact ties go to I, N, F and P by convention. An 8-item resilience scale (partly reverse-scored) and an answer-quality check are included." },
      { zh: "本测评为先端艺培原创，基于荣格心理类型理论设计，与 MBTI® 官方测评无关。MBTI 是 The Myers-Briggs Company 的注册商标。", en: "This is an original Avantgarde Studio instrument based on Jungian type theory, not the official MBTI® assessment. MBTI is a registered trademark of The Myers-Briggs Company." }
    ],
    match: [
      { zh: "院校匹配：专业方向 34%、学习风格 22%、预算 16%、城市 14%、准备度 8%、五行方位 6%（趣味）。层级与专业不符的院校不会出现。", en: "School matching: subject 34%, learning style 22%, budget 16%, city 14%, readiness 8%, five-element direction 6% (for fun). Schools that don't offer your level or subject are left out." },
      { zh: "院校标签为编辑判断，只代表教学风格与强项的大致倾向；申请前请以院校官方信息为准。", en: "School tags are editorial and describe broad tendencies; always check official information." }
    ]
  },

  credits: { zh: "城市数据：GeoNames（CC BY 4.0）· 历法：lunar\u2011javascript\u2060（6tail）", en: "City data: GeoNames (CC BY 4.0)\u00a0· Calendar: lunar\u2011javascript (6tail)" } // \u2011 hyphen and \u2060 joiner: the library name never breaks
};
