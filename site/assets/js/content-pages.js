/*
 * Avantgarde Studio — subpage content (journal articles, programme pages, tutor profiles, the alliance page).
 * Short text that also appears on the home page (titles, tags, names, points) stays in content.js;
 * this file holds the longer copy those pages add. Every string is { zh, en }.
 *
 * `draft: true` shows a dashed "draft copy" note on that page. The copy here was written for the launch
 * and still needs the people concerned to read it (see 上线前清单.md). Set it to false once approved.
 * After editing, ask Claude to run `node _工具/build-pages.js site` to refresh the built-in Chinese copy.
 */
window.PAGES = {

  /* ---------------- journal ---------------- */
  journal: {
    lead: {
      zh: "写给正在准备艺术与设计申请的人：策展、作品集、提案和协作里，那些没人明说的做法。",
      en: "For anyone preparing an art or design application: the unwritten habits of curating, portfolios, proposals and collaboration."
    },
    author: { zh: "先端艺培编辑部", en: "Avantgarde Studio Editorial" }
  },

  articles: {
    "curator-day": {
      draft: true,
      lead: {
        zh: "「策展」常被想象成挑作品、挂作品。真正的日常更像四件事轮流进行：研究、对话、写作、落地。弄清这四件事，你会更清楚自己适不适合读策展。",
        en: "Curating is often pictured as choosing works and hanging them. The daily reality is closer to four jobs in rotation: research, conversation, writing and delivery. Knowing them helps you decide whether a curating degree suits you."
      },
      sections: [
        {
          h: { zh: "研究：从一个问题开始", en: "Research: starting from a question" },
          p: {
            zh: ["大多数展览不是从「我喜欢这些作品」开始，而是从一个问题开始：某种材料为什么在今天又被艺术家拿起来？一座城市的某段历史，怎样在当代作品里留下痕迹？", "策展人的很多时间花在读书、看档案、跑工作室和看别人的展览上，把模糊的兴趣磨成一个能被展览回答的问题。"],
            en: ["Most exhibitions begin with a question rather than a list of favourite works. Why are artists returning to a particular material now? How does a city’s history surface in contemporary work?", "Much of a curator’s time goes on reading, archives, studio visits and other people’s exhibitions, sharpening a vague interest into a question an exhibition can answer."]
          }
        },
        {
          h: { zh: "对话：和艺术家一起想", en: "Conversation: thinking with artists" },
          p: {
            zh: ["策展不是替艺术家说话。好的策展人会花大量时间和艺术家交谈：作品怎样被看见、放在哪里、和谁放在一起，都要双方一起决定。", "在机构里，还要和馆长、教育部门、技术团队、出借方沟通。很多决定是在电话、邮件和工作室的桌边做出的。"],
            en: ["Curating is not speaking for artists. Good curators spend long hours in conversation with them: how a work is seen, where it sits and what it sits beside are decided together.", "In an institution there are also directors, learning teams, technicians and lenders to talk to. Many decisions are made on calls, in emails and around studio tables."]
          }
        },
        {
          h: { zh: "写作：把想法交给别人", en: "Writing: handing the idea to others" },
          p: {
            zh: ["展览的想法要靠文字传出去：给机构的提案、给基金会的申请、墙上的说明、画册文章、新闻稿、社交媒体上的一段话。同一个想法，要写成长短不同、读者不同的好几个版本。", "能不能把复杂的东西写清楚，是策展人最常被考察的能力之一。"],
            en: ["An exhibition travels through writing: proposals to venues, funding applications, wall texts, catalogue essays, press releases, a caption online. The same idea has to be written at different lengths for different readers.", "Writing clearly about complex things is one of the skills curators are judged on most often."]
          }
        },
        {
          h: { zh: "落地：预算、时间表和墙", en: "Delivery: budgets, schedules and walls" },
          p: {
            zh: ["真正让展览发生的，是大量看不见的工作：预算、运输、保险、借展协议、布展图、灯光、无障碍设施、开幕活动。独立策展人往往一个人兼顾这些，机构里的策展人则和团队分工。", "这部分工作不浪漫，却决定了观众最后看到的是什么。"],
            en: ["What makes an exhibition happen is a great deal of unseen work: budgets, shipping, insurance, loan agreements, floor plans, lighting, access and opening events. Independent curators often carry all of it; in an institution it is shared with a team.", "It isn’t romantic, but it decides what visitors finally see."]
          }
        }
      ],
      pull: { zh: "展览，是一个被公开检验的问题。", en: "An exhibition is a question tested in public." },
      tryThis: {
        zh: "在学校、工作室或线上，做一个只有三件作品的小展览。写一段 150 字的说明，画一张平面图，记下你和作者之间的每一次沟通。这份记录本身，就是申请策展专业时很有说服力的材料。",
        en: "Stage a three-work exhibition at school, in a studio or online. Write a 150-word text, draw a floor plan and keep a record of every exchange with the artists. That record is itself persuasive material for a curating application."
      },
      related: ["masterclass"]
    },

    "work-to-question": {
      draft: true,
      lead: {
        zh: "很多申请者手里有一件自己很在意的作品，却不知道怎样把它变成作品集里的一个项目，或者提案里的一个问题。下面是一个可以反复用的四步方法。",
        en: "Many applicants have one work they care about but don’t know how to grow it into a portfolio project or a curatorial question. Here is a four-step method you can reuse."
      },
      sections: [
        {
          h: { zh: "先描述，不评价", en: "Describe before you judge" },
          p: {
            zh: ["用三句话写下这件作品做了什么：它用什么材料、多大、怎样被观看？它让观众注意到什么？它回避了什么？", "先把「我想表达」放一边，只写看得见的东西。"],
            en: ["Write three sentences on what the work does. What is it made of, how big is it, how is it seen? What does it make a viewer notice? What does it avoid?", "Put “what I wanted to express” aside and write only what can be seen."]
          }
        },
        {
          h: { zh: "找到张力", en: "Find the tension" },
          p: {
            zh: ["回头读这三句话，找出其中互相拉扯的两件事。比如一张家里厨房的照片：它很私人，却又是许多家庭共有的场景；它记录的是现在，却让人想起上一代人。", "张力，就是问题的种子。"],
            en: ["Reread the sentences and find two things pulling against each other. Take a photograph of a family kitchen: it is private, yet the scene is shared by many households; it records the present, yet recalls a previous generation.", "The tension is the seed of a question."]
          }
        },
        {
          h: { zh: "放进更大的语境", en: "Place it in a wider context" },
          p: {
            zh: ["找三到五件别人的作品、一本书或一段历史，和你的作品放在一起看。它们是在回答同一个问题，还是在反驳它？", "这一步把「我的作品」变成「一场对话」，也是导师最想看到的研究能力。"],
            en: ["Set your work beside three to five works by others, a book or a piece of history. Are they answering the same question, or arguing with it?", "This turns “my work” into a conversation, and it is the research ability tutors most want to see."]
          }
        },
        {
          h: { zh: "写成一个可以被检验的问题", en: "Write a question that can be tested" },
          p: {
            zh: ["把张力和语境合在一起，写成一个问题：不是「家庭是什么」，而是「一间厨房里的日常劳动，怎样在照片里变得可见？」", "好的问题足够具体，能决定你下一件作品怎么做，也能决定一个展览里放什么、不放什么。"],
            en: ["Combine tension and context into a question: not “what is family?” but “how does everyday labour in a kitchen become visible in a photograph?”", "A good question is specific enough to decide your next work, and what an exhibition would include or leave out."]
          }
        }
      ],
      pull: { zh: "好的问题，会告诉你下一步做什么。", en: "A good question tells you what to make next." },
      tryThis: {
        zh: "挑一件最近的作品，按上面四步各写一段，每段不超过 80 字。最后一段里的问题，就是你作品集下一个项目的标题草稿。",
        en: "Take a recent work and write one paragraph for each step, under 60 words each. The question in the last paragraph is a working title for your next portfolio project."
      },
      related: ["advanced-studio"]
    },

    "proposal-essentials": {
      draft: true,
      lead: {
        zh: "不少策展和艺术管理方向的申请，会要求附一份展览提案或研究计划（以各项目的要求为准）。篇幅通常不长，读的人却很快能看出你想得清不清楚。下面六件事，缺一件都会让提案显得单薄。",
        en: "Many curating and arts management applications ask for an exhibition proposal or a research plan (check each programme’s requirements). It is usually short, and readers can tell quickly whether your thinking is clear. Leave out any of these six and a proposal feels thin."
      },
      sections: [
        {
          h: { zh: "一个问题，而不是一个主题", en: "A question, not a theme" },
          p: { zh: ["「记忆」是主题，「家庭相册在数字时代怎样被重新整理」是问题。提案第一段就要让人知道，这个展览想弄清什么。"], en: ["“Memory” is a theme; “how family albums are being reorganised in the digital age” is a question. The first paragraph should say what the exhibition wants to find out."] }
        },
        {
          h: { zh: "为什么是现在，为什么在这里", en: "Why now, why here" },
          p: { zh: ["说明这个问题为什么在今天重要，为什么适合这座城市、这个空间或这群观众。它让提案从个人兴趣变成公共议题。"], en: ["Explain why the question matters today and why it suits this city, this space or this audience. It turns a private interest into a public conversation."] }
        },
        {
          h: { zh: "作品与艺术家", en: "Works and artists" },
          p: { zh: ["列一份暂定名单，写清每件作品在问题里扮演什么角色。数量不必多，关系要清楚：哪件作品提出问题，哪件作品让问题复杂起来。"], en: ["Give a provisional list and say what role each work plays in the question. The number matters less than the relationships: which work poses the question, which one complicates it."] }
        },
        {
          h: { zh: "空间与观众", en: "Space and audience" },
          p: { zh: ["观众从哪里进来，先看到什么，最后带走什么？一张简单的平面图或一条参观路线，往往比长篇解释更有说服力。"], en: ["Where do visitors come in, what do they see first, what do they leave with? A simple floor plan or route often persuades more than long explanation."] }
        },
        {
          h: { zh: "形式与公共活动", en: "Format and public programme" },
          p: { zh: ["展览之外，还可以有讲座、工作坊、出版或线上内容。说明它们怎样延伸展览的问题，而不只是附加的活动。"], en: ["Beyond the exhibition there may be talks, workshops, a publication or online content. Show how each extends the question rather than sitting beside it."] }
        },
        {
          h: { zh: "可行性与你的角色", en: "Feasibility and your role" },
          p: { zh: ["给出粗略的时间表和预算范围，说明你在项目里具体负责什么。能落地的提案，比宏大却做不成的提案更让人信任。"], en: ["Give a rough timeline and budget range, and say exactly what you would do. A proposal that can be delivered earns more trust than a grand one that can’t."] }
        }
      ],
      pull: { zh: "能落地的提案，比宏大的提案更让人信任。", en: "A proposal that can be delivered earns more trust than a grand one." },
      tryThis: {
        zh: "把你的提案压缩成六句话，每句回答上面一件事。哪一句写不出来，那里就是提案接下来要补的地方。",
        en: "Compress your proposal into six sentences, one for each point above. Whichever sentence won’t come is where the proposal needs work."
      },
      related: ["masterclass", "applications"]
    },

    "group-project": {
      draft: true,
      lead: {
        zh: "合作项目在艺术与设计教育里越来越常见。放进作品集时，读的人最想知道的是：这里面哪一部分是你做的？写不清楚，好项目也会被打折扣。",
        en: "Collaborative projects are increasingly common in art and design education. In a portfolio, the reader’s first question is: which part was yours? If that’s unclear, even a strong project loses value."
      },
      sections: [
        {
          h: { zh: "先交代项目和团队", en: "Set out the project and the team" },
          p: { zh: ["用一两句话说明项目是什么、为谁做、团队有几个人、各自是什么专业背景。不需要长，但要让读者知道这是一个集体作品。"], en: ["In a sentence or two, say what the project was, who it was for, how many people were involved and their backgrounds. Keep it brief, but make clear it was collective."] }
        },
        {
          h: { zh: "用动词写你的角色", en: "Write your role in verbs" },
          p: { zh: ["「参与了项目」没有信息量。写「调研了三家社区档案馆」「设计了展览平面和导览手册」「负责和两位艺术家沟通布展」，读的人马上能看到你做了什么。"], en: ["“Took part in the project” tells the reader nothing. “Researched three community archives”, “designed the floor plan and visitor guide”, “coordinated the installation with two artists” show exactly what you did."] }
        },
        {
          h: { zh: "展示过程证据", en: "Show evidence of process" },
          p: { zh: ["草图、会议记录、方案的前后版本、你拍的布展照片，都能证明你的贡献。标注清楚哪些是你的，哪些是团队的。"], en: ["Sketches, meeting notes, earlier and later versions of a plan, installation photographs you took: all of these evidence your contribution. Label clearly what is yours and what is the team’s."] }
        },
        {
          h: { zh: "大方地写上别人的名字", en: "Credit others generously" },
          p: { zh: ["写清合作者的名字和分工，不会削弱你，反而说明你懂得合作的规矩。导师和面试官很看重这一点。"], en: ["Naming collaborators and their roles doesn’t diminish you; it shows you understand how collaboration works. Tutors and interviewers value this."] }
        },
        {
          h: { zh: "说出你学到了什么", en: "Say what you learned" },
          p: { zh: ["最后用两三句话写你从合作中得到的判断：一次分歧怎样被解决，一个决定为什么这样做。这部分常常是面试时最好聊的话题。"], en: ["Finish with two or three sentences on what the collaboration taught you: how a disagreement was resolved, why a decision was made. This often becomes the best conversation in an interview."] }
        }
      ],
      pull: { zh: "写清别人的贡献，也是在证明你自己的判断。", en: "Crediting others is also evidence of your own judgement." },
      tryThis: {
        zh: "用这个句式写一句话：「在〔项目〕中，我负责〔动词 + 对象〕，这让团队能够〔结果〕。」写三句，分别对应项目的开始、中间和结尾。",
        en: "Complete this sentence: “In [project], I [verb + object], which let the team [result].” Write three, for the beginning, middle and end of the project."
      },
      related: ["advanced-studio", "applications"]
    }
  },

  /* ---------------- programmes ---------------- */
  programmes: {
    "masterclass": {
      draft: true,
      tagline: {
        zh: "伦敦策展人与艺术家带领的小班大师课，把你的想法推得更远。",
        en: "Small-group masterclasses with London curators and artists that take your thinking further."
      },
      facts: [
        { k: { zh: "形式", en: "Format" }, v: { zh: "线上为主，伦敦可线下", en: "Mostly online; in person in London when possible" } },
        { k: { zh: "人数", en: "Group size" }, v: { zh: "每期不超过 5 席", en: "Up to 5 seats per cohort" } },
        { k: { zh: "导师", en: "Tutors" }, v: { zh: "LD 与 DBRF 邀请的客座导师", en: "LD and guest tutors invited by DBRF" } },
        { k: { zh: "适合", en: "For" }, v: { zh: "硕士与跨学科申请者", en: "MA and interdisciplinary applicants" } }
      ],
      intro: {
        zh: ["进阶课帮你把作品集做完整；大师课做的是另一件事：由伦敦一线的策展人和艺术家，带你把一个想法推深、推远。", "每期人数很少，讨论围绕你自己的项目展开，也会谈到在英国艺术界工作的真实方式。"],
        en: ["The studio course completes your portfolio. The masterclass does something else: working curators and artists in London help you take one idea deeper and further.", "Groups are very small, discussion centres on your own project, and it covers how the UK art world actually works."]
      },
      modules: [
        { t: { zh: "研究方法", en: "Research methods" }, d: { zh: "从兴趣出发找到问题：读什么，怎样做笔记，怎样用资料推进作品。", en: "Finding a question in an interest: what to read, how to take notes, how sources move a work forward." } },
        { t: { zh: "策展思维", en: "Curatorial thinking" }, d: { zh: "作品怎样被组织、被观看、被写出来；从一件作品到一个展览问题。", en: "How work is arranged, seen and written about; from one work to an exhibition question." } },
        { t: { zh: "创作生涯", en: "Creative careers" }, d: { zh: "怎样可持续地工作：资助、合作、自我组织、基本的财务素养，以及毕业以后的路。", en: "Working sustainably: funding and money, collaboration, self-organisation and life after study." } },
        { t: { zh: "创意行业英语", en: "English for the creative industries" }, d: { zh: "用英文讲作品、写提案、参加 crit 和面试，适应英国院校的学习方式。", en: "Talking about work, writing proposals, crits and interviews in English, ready for study in the UK." } }
      ],
      outcomes: {
        zh: ["一个被反复推敲过的研究问题", "一份项目或展览提案的初稿", "伦敦导师对你作品和思路的反馈", "结课总结与下一步建议", "对英国艺术界工作方式的第一手了解"],
        en: ["A research question that has been properly tested", "A first draft of a project or exhibition proposal", "Feedback on your work and thinking from London tutors", "A closing summary with suggested next steps", "A first-hand sense of how the UK art world works"]
      },
      join: [
        { t: { zh: "预约作品集评估", en: "Book a portfolio review" }, d: { zh: "先聊一次，看作品，谈方向。", en: "A first conversation about your work and direction." } },
        { t: { zh: "导师判断", en: "Tutor recommendation" }, d: { zh: "大师课名额少，导师会先判断是否适合你现在的阶段。", en: "Places are few, so tutors first check it suits where you are now." } },
        { t: { zh: "课前问卷", en: "Pre-course questionnaire" }, d: { zh: "DBRF 了解你的背景、现状与目标，定制方案和每周投入。", en: "DBRF asks about your background, situation and goals, then shapes the plan and weekly time." } },
        { t: { zh: "开课与结课", en: "Sessions and review" }, d: { zh: "每次课后有行动要点；结课时给出总结和下一步建议。", en: "Action points after every session; a closing summary with next steps." } }
      ],
      faq: [2, 3, 0],
      tutors: ["ld", "guest-tutors"]
    },

    "advanced-studio": {
      draft: true,
      tagline: {
        zh: "在进阶课里完成 4–6 个作品集项目，从调研到排版，一步步做扎实。",
        en: "Build 4–6 portfolio projects in the Advanced Studio, from research to layout, one careful step at a time."
      },
      facts: [
        { k: { zh: "项目", en: "Projects" }, v: { zh: "4–6 个作品集项目", en: "4–6 portfolio projects" } },
        { k: { zh: "地点", en: "Where" }, v: { zh: "苏州常熟、太仓工作室或线上", en: "Changshu or Taicang studio (Suzhou), or online" } },
        { k: { zh: "导师", en: "Tutor" }, v: { zh: "一位主导师从评估跟到录取", en: "One lead tutor from first review to offer" } },
        { k: { zh: "适合", en: "For" }, v: { zh: "本科与硕士作品集申请者", en: "BA and MA portfolio applicants" } }
      ],
      intro: {
        zh: ["好的作品集不是作品的合集，而是几条清楚的思路。进阶课按你的目标院校和专业，一起规划 4–6 个项目，每个项目都走完调研、实验、制作、拍摄和排版。", "过程页和成品一样重要：院校想看到你怎样想、怎样试、怎样做决定。"],
        en: ["A strong portfolio isn’t a collection of works but a few clear lines of thought. Together we plan 4–6 projects around your target schools and courses, and each goes through research, testing, making, photography and layout.", "Process pages matter as much as finished pieces: schools want to see how you think, test and decide."]
      },
      modules: [
        { t: { zh: "调研", en: "Research" }, d: { zh: "从一个问题出发，收集资料、参考和现场观察。", en: "Start from a question; gather sources, references and first-hand observation." } },
        { t: { zh: "实验", en: "Test" }, d: { zh: "用小样、草图和材料试错，把想法变得可以看见。", en: "Try things with samples, sketches and materials until the idea becomes visible." } },
        { t: { zh: "制作", en: "Make" }, d: { zh: "选定方向，把作品做完整。", en: "Commit to a direction and resolve the work." } },
        { t: { zh: "拍摄", en: "Shoot" }, d: { zh: "作品拍得好，才能在屏幕上被认真看。", en: "Work photographed well is work that gets looked at properly on screen." } },
        { t: { zh: "排版", en: "Layout" }, d: { zh: "按院校要求整理成 PDF 或网申格式，讲清每个项目的来龙去脉。", en: "Lay it out to each school’s format, PDF or online, with each project’s story clear." } }
      ],
      outcomes: {
        zh: ["4–6 个完整的作品集项目", "每个项目的调研、草图与实验过程页", "按目标院校要求排好的作品集文件", "一位主导师全程的反馈与把关"],
        en: ["4–6 complete portfolio projects", "Research, sketch and test pages for each project", "Portfolio files laid out for each target school", "Feedback and oversight from one lead tutor throughout"]
      },
      join: [
        { t: { zh: "预约作品集评估", en: "Book a portfolio review" }, d: { zh: "看你现有的作品，判断起点。", en: "We look at your current work to find your starting point." } },
        { t: { zh: "定位与规划", en: "Position and plan" }, d: { zh: "确定专业、院校与时间线，规划项目。", en: "Choose courses, schools and timeline, then plan the projects." } },
        { t: { zh: "开始创作", en: "Start making" }, d: { zh: "按节奏推进每一个项目。", en: "Work through each project at a steady pace." } }
      ],
      faq: [2, 3, 0],
      tutors: ["service-design-tutor", "xg"]
    },

    "applications": {
      draft: true,
      tagline: {
        zh: "选校、文书、面试、网申与出发前准备，和上海的天际线团队一起完成。",
        en: "School lists, statements, interviews, submissions and pre-arrival, delivered with the Skyline team in Shanghai."
      },
      facts: [
        { k: { zh: "地区", en: "Regions" }, v: { zh: "英国、香港、新加坡", en: "UK, Hong Kong, Singapore" } },
        { k: { zh: "内容", en: "Covers" }, v: { zh: "选校、文书、面试、网申", en: "Schools, statements, interviews, submissions" } },
        { k: { zh: "上海团队", en: "In Shanghai" }, v: { zh: "天际线：家长沟通与日常服务", en: "Skyline: family communication and day-to-day care" } },
        { k: { zh: "衔接", en: "Afterwards" }, v: { zh: "签证与入学前准备", en: "Visa and pre-arrival" } }
      ],
      intro: {
        zh: ["作品集之外，申请还有许多要一次做对的事：选哪些学校、什么时候交、文书怎样写、面试怎样讲作品。", "学术部分由先端艺培的导师负责，上海本地的沟通、家长答疑和日常服务由天际线负责。"],
        en: ["Beyond the portfolio, an application has many things to get right first time: which schools, when to submit, how to write the statement, how to talk about your work in interview.", "Avantgarde Studio tutors lead the academic side; Skyline in Shanghai looks after local communication, family questions and day-to-day care."]
      },
      modules: [
        { t: { zh: "选校与时间线", en: "School list and timeline" }, d: { zh: "按专业、作品和预算排出院校清单与截止日期。", en: "A school list and deadlines built around your course, work and budget." } },
        { t: { zh: "个人陈述与简历", en: "Statement and CV" }, d: { zh: "从你的作品和经历里找到主线，多轮修改。", en: "Find the thread in your work and experience, then revise in several rounds." } },
        { t: { zh: "面试", en: "Interview" }, d: { zh: "模拟面试，练习讲清每一个项目。", en: "Mock interviews and practice talking through each project." } },
        { t: { zh: "网申与签证", en: "Submission and visa" }, d: { zh: "表格、材料、签证与入学前的清单。", en: "Forms, documents, visa and a pre-arrival checklist." } }
      ],
      outcomes: {
        zh: ["一份按优先级排好的院校清单和时间线", "多轮修改的个人陈述与简历", "模拟面试与作品讲解练习", "网申、签证与入学前的完整清单"],
        en: ["A prioritised school list and timeline", "A statement and CV revised over several rounds", "Mock interviews and practice presenting your work", "A complete checklist for submission, visa and arrival"]
      },
      join: [
        { t: { zh: "预约作品集评估", en: "Book a portfolio review" }, d: { zh: "先了解你的作品和计划。", en: "We start by understanding your work and plans." } },
        { t: { zh: "制定时间线", en: "Set the timeline" }, d: { zh: "倒排每一所学校的截止日期。", en: "Work back from each school’s deadline." } },
        { t: { zh: "逐项完成", en: "Work through it" }, d: { zh: "文书、面试、网申，一项一项做完。", en: "Statement, interview and submission, one at a time." } }
      ],
      faq: [0, 1, 3],
      tutors: ["curating-writing-tutor", "xg"]
    },

    "summer-lab": {
      draft: true,
      tagline: {
        zh: "面向高中生的伦敦短期创作营：美术馆、工作室与导师面对面。",
        en: "A short London residency for secondary-school students: galleries, studios and tutors in person."
      },
      facts: [
        { k: { zh: "状态", en: "Status" }, v: { zh: "即将推出", en: "Coming soon" } },
        { k: { zh: "对象", en: "For" }, v: { zh: "高中生", en: "Secondary-school students" } },
        { k: { zh: "地点", en: "Where" }, v: { zh: "伦敦", en: "London" } },
        { k: { zh: "形式", en: "Format" }, v: { zh: "美术馆、工作室与导师工作坊", en: "Galleries, studios and tutor workshops" } }
      ],
      intro: {
        zh: ["在伦敦待上一段时间，走进美术馆和艺术家工作室，和导师一起做东西，提前感受在英国学艺术是什么样子。", "具体日期、时长和费用确认后公布。想第一时间收到通知，可以先预约评估或加微信。"],
        en: ["Spend time in London, visit galleries and artists’ studios, make work with tutors, and get an early sense of what studying art in the UK is like.", "Dates, length and fees will be announced once confirmed. To hear first, book a review or add us on WeChat."]
      },
      modules: [],
      outcomes: { zh: [], en: [] },
      join: [],
      faq: [3],
      tutors: []
    }
  },

  /* ---------------- faculty ---------------- */
  people: {
    "ld": {
      draft: true,
      bio: {
        zh: ["Dr LD 是独立策展人和学者（Reader），有二十余年的独立策展经验。她曾联合创办艺术机构 Electra（2003–2011），并于 2024 年联合策划第 60 届贝尔格莱德十月沙龙。", "在与 DBRF 合作的伦敦大师课中，她带领研究方法、策展思维与可持续创作生涯的讨论，帮助学员把一个想法推成可以被展览、被写出来的问题。"],
        en: ["Dr LD is an independent curator and Reader with more than twenty years in independent curating. She co-founded the arts organisation Electra (2003–2011) and co-curated the 60th October Salon in Belgrade in 2024.", "In the London masterclass run with DBRF, she leads discussion of research methods, curatorial thinking and sustainable creative careers, helping students turn one idea into a question that can be exhibited and written about."]
      },
      focus: { zh: ["策展与研究", "展览与公共项目", "可持续的创作生涯"], en: ["Curating and research", "Exhibitions and public programmes", "Sustainable creative careers"] },
      quote: { zh: "Creative Practices ¤ Sustainable Economies", en: "Creative Practices ¤ Sustainable Economies" },
      leads: ["masterclass"]
    },

    "xg": {
      draft: false,
      bio: {
        zh: ["XG 是常驻伦敦的艺术家与研究者，现为英国皇家艺术学院艺术与人文学部博士候选人。他的实践以摄影为基础，结合精神分析理论，研究家庭档案、代际记忆，以及历史与个人叙事之间的交织。相关研究曾在比利时鲁汶大学、亨利·摩尔研究所和萨格勒布大学等机构发表和展示。", "他拥有英国皇家艺术学院摄影硕士和威斯敏斯特大学心理学硕士学位，并在伦敦艺术大学中央圣马丁学院时尚系担任副讲师，参与时尚史与理论、文化研究单元的教学。", "在先端艺培，他担任学术主理：统筹课程进度、选校与申请节点，参与研究方法、理论框架、个人叙事与作品语境的讨论，并把各位导师的反馈落实到作品和申请材料里。"],
        en: ["XG is an artist and researcher based in London and a PhD candidate in the School of Arts & Humanities at the Royal College of Art. His practice is grounded in photography and draws on psychoanalytic theory to explore family archives, intergenerational memory, and the ways history and personal narrative intertwine. His research has been presented at KU Leuven, the Henry Moore Institute and the University of Zagreb, among others.", "He holds an MA in Photography from the Royal College of Art and a master’s in psychology from the University of Westminster, and is an Associate Lecturer in Fashion at Central Saint Martins, teaching on fashion history and theory and cultural studies units.", "At Avantgarde Studio he is academic lead: he keeps courses, school lists and application deadlines on track, joins discussions of research method, theory, personal narrative and context, and makes sure every tutor’s feedback reaches the work and the application."]
      },
      focus: { zh: ["摄影", "精神分析与理论", "家庭档案与代际记忆"], en: ["Photography", "Psychoanalysis and theory", "Family archives and memory"] },
      quote: null,
      leads: ["advanced-studio", "applications"]
    },

    "service-design-tutor": {
      draft: false,
      bio: {
        zh: ["HS 毕业于英国顶尖艺术院校的服务设计硕士专业，现为一家国际设计咨询机构的资深设计师。", "作为主线导师，负责学生的核心方向判断、研究方法、项目框架、系统思维和作品集主线推进，把服务设计的方法和真实行业项目的经验带进教学。从学生自己的经历和创作潜力出发，帮助建立有研究深度、有实践价值、也有个人辨识度的申请项目。"],
        en: ["HS holds an MA in Service Design from a leading UK art school and works as a senior designer at an international design consultancy.", "As lead tutor, they guide each student’s direction, research methods, project framing, systems thinking and the main line of the portfolio, bringing service-design methods and real industry projects into the studio. Starting from the student’s own experience and potential, they help build application projects with research depth, practical value and a clear personal voice."]
      },
      focus: { zh: ["服务设计", "研究方法", "系统思维"], en: ["Service design", "Research methods", "Systems thinking"] },
      quote: null,
      leads: ["advanced-studio"]
    },

    "curating-writing-tutor": {
      draft: false,
      bio: {
        zh: ["KL 是英国一家美术馆与一所艺术院校联合培养的博士研究生，也是活跃于国际艺术领域的策展人，兼具策展实践、学术研究和国际艺术机构的项目经验。", "负责申请文书、个人叙事和材料审阅：帮助学生把真实经历、创作方法和未来方向，写成准确、有说服力的申请表达，并在正式递交前做整体质量把关。"],
        en: ["KL is a doctoral researcher on a joint programme between a UK museum and an art school, and a curator working internationally, combining curatorial practice, academic research and project experience with international art institutions.", "They look after statements, personal narrative and application review: helping students turn real experience, working methods and future plans into precise, persuasive writing, and checking the whole application before it is submitted."]
      },
      focus: { zh: ["策展实践", "学术写作", "个人叙事"], en: ["Curatorial practice", "Academic writing", "Personal narrative"] },
      quote: null,
      leads: ["applications"]
    },

    "guest-tutors": {
      draft: true,
      bio: {
        zh: ["大师课的客座导师由 DBRF 按每期学员的方向邀请，来自英国艺术院校，多为课程主任和资深讲师，覆盖纯艺、设计与策展。", "他们参与专题讨论和作品点评，让你在申请之前，就听到英国院校里真正在用的标准和语言。名单按期公布。"],
        en: ["Guest tutors for the masterclass are invited by DBRF to suit each cohort. They come from UK art schools, mostly course leaders and senior lecturers, across fine art, design and curating.", "They join seminars and reviews, so you hear the standards and language UK schools actually use before you apply. The list is announced each cohort."]
      },
      focus: { zh: ["纯艺", "设计", "策展"], en: ["Fine art", "Design", "Curating"] },
      quote: null,
      leads: ["masterclass"]
    }
  },

  /* ---------------- alliance page ---------------- */
  alliance: {
    lead: {
      zh: "三方各管一段，学生只需要面对一条完整的路：伦敦给方向，沪苏管落地，工作室把两端接在一起。",
      en: "Each partner looks after one part, so the student sees one continuous path: London sets the direction, Shanghai and Suzhou look after delivery, and the studio holds the two together."
    },
    chain: {
      zh: ["伦敦 · 方向", "苏州工作室 · 创作与申请", "上海 · 规划与陪伴"],
      en: ["London · direction", "Suzhou studio · work and applications", "Shanghai · planning and care"]
    },
    draft: true,
    partners: {
      ag: {
        does: { zh: ["进阶创作课与作品集", "个人陈述、简历与网申", "一位主导师从评估跟到录取"], en: ["Advanced Studio and portfolio", "Statements, CVs and submissions", "One lead tutor from first review to offer"] },
        place: { zh: "尚岸光景（ASHORE TIME）旗下 · 苏州常熟、太仓线下工作室", en: "Part of ASHORE TIME (尚岸光景) · studios in Changshu and Taicang, Suzhou" },
        // Venue photos: web copies of 原始材料/05-venue-photos (EXIF and location data removed)
        photos: [
          { src: "assets/img/venues/taicang-02.jpg", alt: { zh: "太仓工作室 · 中庭", en: "Taicang studio · atrium" } },
          { src: "assets/img/venues/taicang-03.jpg", alt: { zh: "太仓工作室 · 大教室", en: "Taicang studio · seminar room" } },
          { src: "assets/img/venues/changshu-02.jpg", alt: { zh: "常熟工作室 · 会客区", en: "Changshu studio · lounge" } },
          { src: "assets/img/venues/changshu-05.jpg", alt: { zh: "常熟工作室 · 小班教室", en: "Changshu studio · small-group room" } },
          { src: "assets/img/venues/taicang-05.jpg", alt: { zh: "太仓工作室 · 茶室", en: "Taicang studio · tea room" } },
          { src: "assets/img/venues/taicang-01.jpg", alt: { zh: "太仓工作室 · 外观", en: "Taicang studio · building" } }
        ],
        programmes: ["advanced-studio", "applications"]
      },
      sky: {
        does: { zh: ["综合评估：学术背景、英文能力、性格与职业测评", "留学方案：院校选择、专业分析、时间安排", "语言与标化考试规划", "签证、行前与入境后的衔接", "家长沟通与日常学生服务"], en: ["Assessment: academic background, English, personality and career profiling", "Study plan: school choice, course analysis, timeline", "Language and test planning", "Visa, pre-departure and arrival support", "Family communication and day-to-day student care"] },
        place: { zh: "上海市长宁区古北路 678 号同诠大厦 1201C", en: "Room 1201C, Tongquan Building, 678 Gubei Road, Changning, Shanghai" },
        programmes: ["applications"]
      },
      // From dbrforum.com (checked 2026-10-29): services for individuals, the four-stage process, both mottos.
      dbrf: {
        about: {
          zh: "De Beauvoir Forum（DBRF）是伦敦的一家咨询机构，由一群学者与文化工作者创办，帮助文化与创意领域的个人和机构建立真诚、可持续、在经济上负责任的实践。他们把创作上的成长和实际的财务素养放在一起，让创作者懂得怎样理解、衡量并维持自己的劳动。",
          en: "De Beauvoir Forum (DBRF) is a London consultancy founded by a group of academics and cultural workers. It helps people and organisations in the cultural and creative sectors build authentic, sustainable and financially responsible practices, pairing creative growth with practical financial literacy so that makers can understand, value and sustain their labour."
        },
        place: { zh: "伦敦 · dbrforum.com", en: "London · dbrforum.com" },
        site: "https://dbrforum.com/",
        does: {
          zh: ["伦敦小班大师课，邀请英国院校客座导师", "长期一对一导师辅导：创作发展与财务稳定", "创意与文化行业英语，帮助国际学生适应英文学习", "作品集叙事、选择、排序与呈现", "选课、个人陈述、面试与作品集审阅", "面向跨国机构的跨文化能力培训"],
          en: ["Small-group masterclasses in London, with guest tutors from UK art schools", "Long-term one-to-one mentoring: creative development and financial stability", "English for the creative and cultural industries, for international students", "Portfolio narrative, selection, sequencing and presentation", "Course choices, personal statements, interviews and portfolio review", "Intercultural competence training for organisations working across borders"]
        },
        how: {
          zh: ["期望：课前问卷了解背景、现状与目标，据此定制方案和时间投入", "持续：每次课后给出行动要点和自主练习目标", "进度：学员写每日日志，双方共同设定里程碑，每次课简短回顾节奏", "评估：结课时给出进度总结和下一步建议，可按需提供推荐信"],
          en: ["Expectations: a questionnaire on background, situation and goals shapes a tailored plan and time commitment", "Consistency: action points and self-directed goals after every session", "Progress: a daily journal, milestones agreed together and a short check-in each session", "Evaluation: a closing summary with next steps, and reference letters on request"]
        },
        mottos: ["Cultural Proficiency ¤ Global Impact", "Creative Practices ¤ Sustainable Economies"],
        programmes: ["masterclass"]
      }
    }
  }
};
