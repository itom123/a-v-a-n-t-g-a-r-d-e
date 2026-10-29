/*
 * AG LAB · reading copy: creative paths per type, star signs, and the lines that blend them.
 * For self-reflection and fun; nothing here predicts anything.
 */
(function (root) {
  "use strict";
  var L = root.LAB || (root.LAB = {});

  /* ---------------- creative paths per type ---------------- */
  L.careers = {
    INTJ: {
      paths: [
        { name: { zh: "研究型艺术家", en: "Research-led artist" }, d: { zh: "用多年追一个问题，作品是研究长出来的果实。", en: "You follow one question for years; each work is a fruit of that long, patient enquiry." } },
        { name: { zh: "思辨设计师", en: "Speculative designer" }, d: { zh: "为尚未到来的未来做原型，让人提前看见后果。", en: "You prototype futures that haven’t arrived yet, so people can see the consequences early." } },
        { name: { zh: "展陈设计师", en: "Exhibition architect" }, d: { zh: "规划观众的动线和节奏，把一场展览当系统来设计。", en: "You plan how visitors move and pause, designing a whole exhibition as one system." } }
      ],
      research: { zh: "先搭框架再填证据：读文献、画关系图，把工作室当实验室，一次只验证一个假设。", en: "Framework first, evidence second: you read, map relationships and treat the studio as a lab, testing one hypothesis at a time." },
      allies: [
        { type: "ENFP", why: { zh: "帮你把严密的计划打开，带进意外和温度。", en: "They crack your tight plan open and let in surprise and warmth." } },
        { type: "ISTP", why: { zh: "把你的构想迅速做成能摸到的东西。", en: "They turn your blueprints into something you can actually touch, fast." } }
      ],
      habit: { zh: "这周把一件没完成的作品拍下来，发给一个人听反馈。", en: "This week, photograph one unfinished piece and send it to one person for feedback." }
    },
    INTP: {
      paths: [
        { name: { zh: "创意技术师", en: "Creative technologist" }, d: { zh: "写代码、改硬件，让一个奇怪的想法真的跑起来。", en: "You write code and hack hardware until an odd idea actually runs." } },
        { name: { zh: "观念艺术家", en: "Conceptual artist" }, d: { zh: "作品像一道思想题，材料只是提问的方式。", en: "Your work is a thought puzzle; the materials are simply how you pose the question." } },
        { name: { zh: "设计研究员", en: "Design researcher" }, d: { zh: "拆解设计如何影响行为，再写成清楚的发现。", en: "You take apart how design shapes behaviour, then write it up as clear findings." } }
      ],
      research: { zh: "拆解式研究：把一个概念拆到最小单位，用草图、代码或小模型逐个测试。", en: "Research by dismantling: you break a concept into its smallest parts and test each with sketches, code or small models." },
      allies: [
        { type: "ESTJ", why: { zh: "给你节点和期限，让想法真的落地。", en: "They bring milestones and deadlines, so ideas actually land." } },
        { type: "ENFJ", why: { zh: "帮你把作品讲给更多人听懂。", en: "They help you explain the work so more people can follow it." } }
      ],
      habit: { zh: "给正在想的点子定一个周五截止，到点就做出最小版本。", en: "Give your current idea a Friday deadline and make the smallest possible version by then." }
    },
    ENTJ: {
      paths: [
        { name: { zh: "艺术总监", en: "Art director" }, d: { zh: "定下整体视觉方向，带团队把它做到位。", en: "You set the visual direction and lead a team to deliver it in full." } },
        { name: { zh: "展览制作人", en: "Exhibition producer" }, d: { zh: "统筹预算、场地和艺术家，让大展准时开幕。", en: "You juggle budgets, venues and artists so a big show opens on time." } },
        { name: { zh: "工作室主理人", en: "Studio founder" }, d: { zh: "搭建自己的设计或艺术工作室，同时做作品和做事业。", en: "You build your own design or art studio, making work and a practice at once." } }
      ],
      research: { zh: "目标导向的研究：先定问题和交付物，再去访谈、调研、对标案例。", en: "Goal-led research: you define the question and the deliverable, then interview, survey and benchmark around it." },
      allies: [
        { type: "INFP", why: { zh: "提醒你作品为什么而做，守住它的真心。", en: "They remind you why the work matters and keep its heart intact." } },
        { type: "ISFP", why: { zh: "带来你可能跳过的细腻手感和审美直觉。", en: "They bring the tactile finesse and instinct you might rush past." } }
      ],
      habit: { zh: "每天留二十分钟“无目的画画”，不评估、不交付。", en: "Keep twenty minutes a day for aimless drawing: no review, no deliverable." }
    },
    ENTP: {
      paths: [
        { name: { zh: "评论写作者", en: "Critic and essayist" }, d: { zh: "写敢下判断的展评和文章，引出新的讨论。", en: "You write reviews and essays that take a stance and start new arguments." } },
        { name: { zh: "跨学科艺术家", en: "Interdisciplinary artist" }, d: { zh: "把科学、哲学和流行文化撞在一起做作品。", en: "You crash science, philosophy and pop culture together to make work." } },
        { name: { zh: "游戏设计师", en: "Game designer" }, d: { zh: "用规则和玩法提出问题，让玩家自己发现答案。", en: "You ask questions through rules and play, letting players find the answers." } }
      ],
      research: { zh: "辩论式研究：先抛出一个反直觉的假设，再找人、找资料来反驳它。", en: "Research by argument: you float a counter-intuitive claim, then hunt for people and sources to knock it down." },
      allies: [
        { type: "ISTJ", why: { zh: "帮你核实细节，把灵感变成可靠的成果。", en: "They check the details and turn your sparks into something solid." } },
        { type: "ISFJ", why: { zh: "耐心陪你把一个方向打磨到完成。", en: "They patiently help you polish one direction to the finish." } }
      ],
      habit: { zh: "列出手上所有点子，只留一个，其余放进“以后”文件夹。", en: "List every idea you have, keep one, and file the rest in a folder called “later”." }
    },
    INFJ: {
      paths: [
        { name: { zh: "独立策展人", en: "Independent curator" }, d: { zh: "围绕一个深刻的问题挑选作品，让它们彼此对话。", en: "You gather works around one deep question and let them speak to each other." } },
        { name: { zh: "档案摄影艺术家", en: "Archive-based photographer" }, d: { zh: "翻旧照片与家族档案，拍出时间留下的空白。", en: "You work with old photographs and family archives, picturing the gaps time leaves." } },
        { name: { zh: "口述史艺术家", en: "Oral-history artist" }, d: { zh: "倾听他人的故事，再转成声音、文字或装置。", en: "You listen to people’s stories and turn them into sound, text or installation." } }
      ],
      research: { zh: "档案与访谈结合：从一段个人记忆出发，慢慢连到社会和历史的大问题。", en: "Archive meets interview: you start from one personal memory and slowly connect it to larger social and historical questions." },
      allies: [
        { type: "ESTP", why: { zh: "把你拉出脑海，直接去现场试。", en: "They pull you out of your head and into trying things on site." } },
        { type: "ENTP", why: { zh: "用尖锐的问题帮你把观点说得更清楚。", en: "Their sharp questions help you state your point more clearly." } }
      ],
      habit: { zh: "这周不写构思，先做三个十分钟的小样再说。", en: "This week, skip the concept note and make three ten-minute sketches first." }
    },
    INFP: {
      paths: [
        { name: { zh: "绘本作者", en: "Illustrator-author" }, d: { zh: "自己写、自己画，讲只有你能讲的故事。", en: "You write and draw your own books, telling stories only you could tell." } },
        { name: { zh: "艺术家书创作者", en: "Artist’s book maker" }, d: { zh: "把诗、图像和纸张做成可以翻阅的私密作品。", en: "You fold poems, images and paper into intimate works meant to be held and leafed through." } },
        { name: { zh: "独立动画作者", en: "Independent animator" }, d: { zh: "一帧帧画出内心世界，做温柔而奇异的短片。", en: "You draw an inner world frame by frame, making gentle, strange short films." } }
      ],
      research: { zh: "自传式研究：日记、梦和收集的小物都是素材，从个人感受里找普遍的东西。", en: "Autobiographical research: diaries, dreams and collected objects are all material; you find the universal inside the personal." },
      allies: [
        { type: "ENTJ", why: { zh: "帮你把作品推向展出和出版。", en: "They help push your work towards exhibition and print." } },
        { type: "ESTJ", why: { zh: "给你一个稳定的节奏表，让项目真的完成。", en: "They give you a steady schedule so projects actually finish." } }
      ],
      habit: { zh: "每天给一件作品写三句说明：做了什么、为什么、想让人感到什么。", en: "Each day, write three lines about one piece: what it is, why, and what you hope people feel." }
    },
    ENFJ: {
      paths: [
        { name: { zh: "社区艺术家", en: "Community-engaged artist" }, d: { zh: "和街坊、学生一起创作，作品属于参与的每个人。", en: "You make work with neighbours and students; it belongs to everyone who took part." } },
        { name: { zh: "艺术教育者", en: "Arts educator" }, d: { zh: "设计课程和工作坊，帮别人找到自己的创作语言。", en: "You design courses and workshops that help others find their own creative voice." } },
        { name: { zh: "公共项目策展人", en: "Public programmes curator" }, d: { zh: "策划讲座、放映和活动，让展览走出展厅。", en: "You plan talks, screenings and events that carry an exhibition beyond the gallery." } }
      ],
      research: { zh: "参与式研究：组织工作坊和对话，把参与者的回应当作最重要的资料。", en: "Participatory research: you run workshops and conversations, treating people’s responses as your most important material." },
      allies: [
        { type: "INTP", why: { zh: "帮你把直觉整理成严谨的方法。", en: "They help shape your instincts into a rigorous method." } },
        { type: "ISTP", why: { zh: "动手能力强，帮你把活动落到实物。", en: "Their practical skill grounds your events in real, made things." } }
      ],
      habit: { zh: "这周给自己约一个两小时的“独处工作时段”，不回消息。", en: "This week, book yourself a two-hour solo studio slot with notifications off." }
    },
    ENFP: {
      paths: [
        { name: { zh: "跨媒介叙事者", en: "Multimedia storyteller" }, d: { zh: "同一个故事，用影像、声音和互动讲出几种版本。", en: "You tell one story several ways, across film, sound and interaction." } },
        { name: { zh: "创意策划", en: "Creative strategist" }, d: { zh: "为品牌或机构想出大胆的概念，再带团队落地。", en: "You dream up bold concepts for brands or institutions and help a team land them." } },
        { name: { zh: "体验设计师", en: "Experience designer" }, d: { zh: "设计让人走进去、参与进来的沉浸式体验。", en: "You design immersive experiences that people step into and take part in." } }
      ],
      research: { zh: "漫游式研究：到处收集线索、跟陌生人聊天，再用思维导图找出连接。", en: "Research by roaming: you collect clues everywhere, chat to strangers, then map the connections." },
      allies: [
        { type: "INTJ", why: { zh: "帮你从十个方向里挑出最值得做的那个。", en: "They help you pick the one direction out of ten that’s worth doing." } },
        { type: "ISTJ", why: { zh: "帮你把热情排进可执行的时间表。", en: "They fit your enthusiasm into a schedule you can actually keep." } }
      ],
      habit: { zh: "随身带一本小本子，但这周只能往一个项目里记东西。", en: "Carry a small notebook, but this week only add notes to one project." }
    },
    ISTJ: {
      paths: [
        { name: { zh: "修复师", en: "Conservator" }, d: { zh: "用科学方法检查、修护作品，让它们留得更久。", en: "You examine and repair artworks with scientific care so they last longer." } },
        { name: { zh: "典藏研究员", en: "Collections researcher" }, d: { zh: "整理藏品的来历和档案，补上被遗漏的信息。", en: "You trace where collection objects came from and fill in missing records." } },
        { name: { zh: "字体设计师", en: "Type designer" }, d: { zh: "一笔一画调整比例，做出耐看又好用的字体。", en: "You adjust proportions stroke by stroke to make typefaces that last and work." } }
      ],
      research: { zh: "档案式研究：建立清单和数据库，按时间线核对来源，结论都有出处。", en: "Archival research: you build inventories and databases, check sources against timelines, and every claim has a citation." },
      allies: [
        { type: "ENFP", why: { zh: "给你的严谨加一点即兴和玩心。", en: "They add a dash of improvisation and play to your rigour." } },
        { type: "ENTP", why: { zh: "挑战你的默认做法，打开新的可能。", en: "They challenge your defaults and open up new options." } }
      ],
      habit: { zh: "这周故意用一种从没用过的材料，做一件“可以失败”的小作品。", en: "This week, use a material you’ve never tried and make a small piece that is allowed to fail." }
    },
    ISFJ: {
      paths: [
        { name: { zh: "纺织工艺师", en: "Textile maker" }, d: { zh: "织、绣、染，把记忆和关怀缝进布料里。", en: "You weave, embroider and dye, stitching memory and care into cloth." } },
        { name: { zh: "科学插画师", en: "Scientific illustrator" }, d: { zh: "以耐心观察画出植物、标本，准确又动人。", en: "You draw plants and specimens with patient observation, precise and moving at once." } },
        { name: { zh: "书籍设计师", en: "Book designer" }, d: { zh: "安排版面、纸张和装帧，让每本书拿在手里都舒服。", en: "You arrange layout, paper and binding so every book feels right in the hand." } }
      ],
      research: { zh: "手作与口述并行：向长辈或匠人学习技法，一边做一边记录过程。", en: "Craft alongside conversation: you learn techniques from elders or makers and document the process as you go." },
      allies: [
        { type: "ENTP", why: { zh: "鼓励你更大胆地表达自己的观点。", en: "They nudge you to say what you think more boldly." } },
        { type: "ESTP", why: { zh: "带你更快地试错，少一点犹豫。", en: "They help you test things faster, with less hesitation." } }
      ],
      habit: { zh: "这周在一次 crit 里先开口，说出你对作品的一个判断。", en: "In one crit this week, speak first and share a clear judgement about a piece." }
    },
    ESTJ: {
      paths: [
        { name: { zh: "制作统筹", en: "Production manager" }, d: { zh: "管排期、供应商和预算，让拍摄或展览顺利完成。", en: "You run schedules, suppliers and budgets so shoots and shows go smoothly." } },
        { name: { zh: "产品设计师", en: "Product designer" }, d: { zh: "从用户需求出发，把东西做得好用、好造、好卖。", en: "You start from what people need and make things that work, can be made and can sell." } },
        { name: { zh: "艺术机构管理者", en: "Arts administrator" }, d: { zh: "让美术馆或艺术机构的日常运转得井井有条。", en: "You keep a museum or arts organisation running in good order day to day." } }
      ],
      research: { zh: "实证式研究：用调研、数据和用户测试说话，用结果检验想法。", en: "Evidence-led research: surveys, data and user testing do the talking, and results test the idea." },
      allies: [
        { type: "INFP", why: { zh: "提醒你作品背后的情感和意义。", en: "They remind you of the feeling and meaning behind the work." } },
        { type: "INTP", why: { zh: "给你的流程带来新奇的点子。", en: "They bring unexpected ideas into your well-run process." } }
      ],
      habit: { zh: "这周做一次“没有目标”的实验，只记录观察，不评分。", en: "This week, run one experiment with no target: record what you notice, don’t score it." }
    },
    ESFJ: {
      paths: [
        { name: { zh: "画廊经理", en: "Gallery manager" }, d: { zh: "照顾艺术家、藏家和观众，让画廊有温度又有秩序。", en: "You look after artists, collectors and visitors, keeping a gallery warm and well run." } },
        { name: { zh: "艺术节制作人", en: "Festival producer" }, d: { zh: "把演出、展览和志愿者编排成热闹的几天。", en: "You choreograph performances, shows and volunteers into a lively few days." } },
        { name: { zh: "美育项目专员", en: "Museum learning officer" }, d: { zh: "为家庭和学校设计导览与活动，让人爱上看展。", en: "You design tours and activities for families and schools that make people love museums." } }
      ],
      research: { zh: "以人为中心的研究：观察观众、做访谈，看作品在人群中怎么被感受。", en: "People-centred research: you watch audiences and interview them to see how work is felt in a crowd." },
      allies: [
        { type: "INTJ", why: { zh: "帮你建立更长远的方向与框架。", en: "They help you build a longer-term direction and framework." } },
        { type: "ISFP", why: { zh: "陪你找回自己真正喜欢的审美。", en: "They help you reconnect with the aesthetics you truly love." } }
      ],
      habit: { zh: "这周做一件只为自己而做的作品，不给任何人看。", en: "This week, make one piece purely for yourself and show it to no one." }
    },
    ISTP: {
      paths: [
        { name: { zh: "材料研究者", en: "Material researcher" }, d: { zh: "测试新材料的极限，从菌丝到回收塑料都不放过。", en: "You test new materials to their limits, from mycelium to recycled plastic." } },
        { name: { zh: "雕塑制作师", en: "Sculptor-fabricator" }, d: { zh: "焊接、铸造、数控加工，把大型作品稳稳造出来。", en: "You weld, cast and CNC-mill, building large works that stand up properly." } },
        { name: { zh: "摄影指导", en: "Cinematographer" }, d: { zh: "掌控镜头和光线，用技术为影像定调。", en: "You command lenses and light, setting a film’s mood through technique." } }
      ],
      research: { zh: "工作室即实验室：反复试材料、记参数，答案藏在一次次失败的样品里。", en: "Studio as laboratory: you test materials over and over, logging settings; the answer hides in the failed samples." },
      allies: [
        { type: "ENFJ", why: { zh: "帮你讲清作品的意义，连接观众。", en: "They help you voice what the work means and reach an audience." } },
        { type: "INFJ", why: { zh: "为你的技术找到更深的叙事。", en: "They find a deeper story for your technical skill." } }
      ],
      habit: { zh: "每做完一次材料测试，用一句话写下“这让我想到什么”。", en: "After each material test, write one sentence on “what this makes me think of”." }
    },
    ISFP: {
      paths: [
        { name: { zh: "画家", en: "Painter" }, d: { zh: "用颜色和笔触记录感受，每张画都像一段私语。", en: "You record feeling in colour and brushwork; each canvas is a quiet aside." } },
        { name: { zh: "时装设计师", en: "Fashion designer" }, d: { zh: "从面料手感出发，设计会呼吸的衣服。", en: "You start from how fabric feels and design clothes that breathe." } },
        { name: { zh: "陶艺家", en: "Ceramicist" }, d: { zh: "和泥土、釉色慢慢磨合，做出有体温的器物。", en: "You slowly come to terms with clay and glaze, making vessels that feel warm." } }
      ],
      research: { zh: "感官式研究：收集颜色、质感和气味的样本，用身体去理解一个主题。", en: "Sensory research: you gather samples of colour, texture and scent, understanding a theme through the body." },
      allies: [
        { type: "ENTJ", why: { zh: "帮你规划展出，让更多人看见作品。", en: "They plan the showing so more people get to see your work." } },
        { type: "ESTJ", why: { zh: "帮你把创作变成可持续的节奏。", en: "They help turn making into a rhythm you can sustain." } }
      ],
      habit: { zh: "这周为一件作品写一百字说明，念给朋友听。", en: "This week, write a 100-word statement for one piece and read it aloud to a friend." }
    },
    ESTP: {
      paths: [
        { name: { zh: "行为艺术家", en: "Performance artist" }, d: { zh: "用身体和现场做作品，每次都不可重复。", en: "You make work with your body and the room; no two showings are alike." } },
        { name: { zh: "纪实摄影师", en: "Documentary photographer" }, d: { zh: "冲到事件现场，在最快的一秒按下快门。", en: "You head straight to where things happen and shoot in the decisive second." } },
        { name: { zh: "舞台美术", en: "Set designer" }, d: { zh: "为演出搭场景，在排练里边改边做。", en: "You build sets for performance, adjusting them live through rehearsals." } }
      ],
      research: { zh: "田野调查：先去现场、先动手，回来再整理照片、录音和笔记。", en: "Fieldwork: you go on site and get hands-on first, then sort photos, recordings and notes afterwards." },
      allies: [
        { type: "INFJ", why: { zh: "帮你从经历里提炼出更深的意义。", en: "They help you draw deeper meaning out of what you’ve lived through." } },
        { type: "ISFJ", why: { zh: "帮你记录和整理，让作品留下痕迹。", en: "They record and organise, so the work leaves a trace." } }
      ],
      habit: { zh: "每次做完作品，花十五分钟写复盘：哪一步最好，下次改什么。", en: "After every piece, spend fifteen minutes on a debrief: what worked best, what to change next time." }
    },
    ESFP: {
      paths: [
        { name: { zh: "造型师", en: "Fashion stylist" }, d: { zh: "为拍摄和演出搭配造型，一眼就让人记住。", en: "You style shoots and shows so a look sticks in the mind at first glance." } },
        { name: { zh: "影像导演", en: "Moving-image director" }, d: { zh: "拍短片和音乐影像，把能量和情绪直接传给观众。", en: "You direct shorts and music videos that pass energy and emotion straight to the viewer." } },
        { name: { zh: "橱窗陈列设计师", en: "Window and display designer" }, d: { zh: "用道具和灯光，把街边橱窗变成小剧场。", en: "With props and light, you turn a shop window into a tiny stage." } }
      ],
      research: { zh: "实地体验式研究：看演出、逛市集、拍街头，把当下的感受直接存档。", en: "Research by experience: shows, markets and street photography; you archive the moment as you feel it." },
      allies: [
        { type: "INTJ", why: { zh: "帮你为作品加上概念的骨架。", en: "They give your work a conceptual backbone." } },
        { type: "ISTJ", why: { zh: "帮你沉下心把研究做扎实。", en: "They help you settle in and make the research solid." } }
      ],
      habit: { zh: "这周读一篇和你作品相关的文章，摘三句话贴在工作台。", en: "This week, read one text related to your work and pin three quotes above your desk." }
    }
  };

  /* ---------------- Day Master element flavour ---------------- */
  L.elementFlavour = [
    { zh: "木气让你偏爱过程与生长：无论走哪条路，作品都更像一段会继续发芽的长期项目。", en: "Wood tilts you towards process and growth: whatever path you take, your work behaves like a long project that keeps sprouting." },
    { zh: "火气让你需要被看见：无论走哪条路，你都会想把作品带到现场，点亮一屋子人。", en: "Fire makes you want to be seen: on any path, you may want to bring the work live and light up a room." },
    { zh: "土气让你重视承载与手感：无论走哪条路，你都可能在搭结构、做空间、守手艺。", en: "Earth gives you a feel for holding and handling: on any path, you may be building structure, space or craft." },
    { zh: "金气让你追求精确与完成度：无论走哪条路，形式都要干净、利落、经得起细看。", en: "Metal asks for precision and finish: on any path, the form has to be clean, sharp and hold up to a close look." },
    { zh: "水气让你偏向研究与记忆：无论走哪条路，作品底下都流着一层观念与故事。", en: "Water leans you towards research and memory: on any path, a current of ideas and stories runs beneath the work." }
  ];

  /* ---------------- star sign wording ---------------- */
  L.signElements = {
    fire: { zh: "火象", en: "Fire" },
    earth: { zh: "土象", en: "Earth" },
    air: { zh: "风象", en: "Air" },
    water: { zh: "水象", en: "Water" }
  };
  L.modalities = {
    cardinal: { zh: "基本宫", en: "Cardinal" },
    fixed: { zh: "固定宫", en: "Fixed" },
    mutable: { zh: "变动宫", en: "Mutable" }
  };

  L.zodiac = [
    { key: "aries", name: { zh: "白羊座", en: "Aries" }, glyph: "♈︎", element: "fire", modality: "cardinal",
      sun: { zh: "你的创作冲动来自“先做了再说”，第一笔总是最有力量。", en: "Your creative drive is “do it, then think”; your first mark is often your strongest." },
      moon: { zh: "你需要一点挑战和速度感，太慢的节奏会让你提不起劲。", en: "You need a bit of challenge and pace to feel alive in the studio; slow drift drains you." },
      rising: { zh: "在 crit 和面试里，你给人直接、果敢、敢第一个开口的印象。", en: "In crits and interviews you come across as direct and brave, often the first to speak." } },
    { key: "taurus", name: { zh: "金牛座", en: "Taurus" }, glyph: "♉︎", element: "earth", modality: "fixed",
      sun: { zh: "你被质感和美好的材料驱动，喜欢慢慢把一件东西做到耐看。", en: "Texture and good materials drive you; you like to work something slowly until it rewards a long look." },
      moon: { zh: "安稳的工作台、好用的工具和一杯热饮，就是你的创作安全区。", en: "A steady bench, tools that work and a warm drink: that’s your creative safe place." },
      rising: { zh: "你的作品集给人沉稳、讲究、有手感的第一印象。", en: "Your portfolio first reads as calm, considered and full of touch." } },
    { key: "gemini", name: { zh: "双子座", en: "Gemini" }, glyph: "♊︎", element: "air", modality: "mutable",
      sun: { zh: "你的动力是好奇：同时开几条线，在跳跃之间碰出火花。", en: "Curiosity drives you: you run several threads at once and strike sparks between them." },
      moon: { zh: "你需要聊天和新信息来充电，独自闷太久会卡住。", en: "Conversation and new information recharge you; too long alone and you jam." },
      rising: { zh: "别人第一眼觉得你机灵、会说、点子多到装不下。", en: "People first read you as quick, articulate and overflowing with ideas." } },
    { key: "cancer", name: { zh: "巨蟹座", en: "Cancer" }, glyph: "♋︎", element: "water", modality: "cardinal",
      sun: { zh: "你为记忆、家和亲近的人创作，作品里有被保护的温柔。", en: "You make work for memory, home and the people close to you; it carries a protective tenderness." },
      moon: { zh: "你需要感到被接纳，熟悉的人和空间会让你放开手做。", en: "You need to feel accepted; familiar people and spaces let you make freely." },
      rising: { zh: "你在作品集里显得细腻、亲切，很容易让人产生共鸣。", en: "In a portfolio you come across as sensitive and approachable, easy to connect with." } },
    { key: "leo", name: { zh: "狮子座", en: "Leo" }, glyph: "♌︎", element: "fire", modality: "fixed",
      sun: { zh: "你想做让人记住的作品，舞台感和个人风格是你的燃料。", en: "You want to make work people remember; stage presence and personal style are your fuel." },
      moon: { zh: "被真诚地欣赏会让你发光，冷场会让你暗下来。", en: "Sincere appreciation makes you glow; a cold room dims you." },
      rising: { zh: "你一进 crit 室就有存在感，作品和人都很亮眼。", en: "You walk into a crit room with presence; both you and the work catch the eye." } },
    { key: "virgo", name: { zh: "处女座", en: "Virgo" }, glyph: "♍︎", element: "earth", modality: "mutable",
      sun: { zh: "你在打磨中找到乐趣，把一个细节改到对，比什么都满足。", en: "You find joy in refining; getting one detail right satisfies you more than almost anything." },
      moon: { zh: "整洁的流程和清楚的清单能让你安心开工。", en: "A tidy process and a clear checklist help you settle in and start." },
      rising: { zh: "你的作品集第一眼就显得用心、严谨、排版干净。", en: "Your portfolio first reads as careful, rigorous and cleanly laid out." } },
    { key: "libra", name: { zh: "天秤座", en: "Libra" }, glyph: "♎︎", element: "air", modality: "cardinal",
      sun: { zh: "你追求平衡与和谐，构图、配色和关系都要“刚刚好”。", en: "You seek balance and harmony; composition, colour and relationships all need to feel “just right”." },
      moon: { zh: "美的环境和友善的对话，会让你的灵感自然流出来。", en: "Beautiful surroundings and kind conversation let your ideas flow on their own." },
      rising: { zh: "别人第一眼觉得你优雅、得体、很会沟通。", en: "People first read you as graceful, poised and easy to talk to." } },
    { key: "scorpio", name: { zh: "天蝎座", en: "Scorpio" }, glyph: "♏︎", element: "water", modality: "fixed",
      sun: { zh: "你被深处的东西吸引：秘密、禁忌和不肯说出口的情感。", en: "You’re drawn to what lies deep: secrets, taboos and feelings people won’t say aloud." },
      moon: { zh: "你需要信任和私密空间，才能把最真实的部分放进作品。", en: "You need trust and privacy before you put your truest material into the work." },
      rising: { zh: "你的作品给人强烈、神秘、让人想多看几眼的感觉。", en: "Your work reads as intense and mysterious, the kind people look at twice." } },
    { key: "sagittarius", name: { zh: "射手座", en: "Sagittarius" }, glyph: "♐︎", element: "fire", modality: "mutable",
      sun: { zh: "你为探索而创作：远方、哲学和没去过的地方都是灵感。", en: "You make work to explore: distant places, philosophy and the unknown all feed you." },
      moon: { zh: "你需要自由和新鲜感，被框得太死就想逃。", en: "You need freedom and novelty; box you in too tightly and you’ll want to run." },
      rising: { zh: "别人第一眼觉得你乐观、开阔、讲起想法来眼睛发亮。", en: "People first read you as upbeat and open, eyes lighting up when you talk ideas." } },
    { key: "capricorn", name: { zh: "摩羯座", en: "Capricorn" }, glyph: "♑︎", element: "earth", modality: "cardinal",
      sun: { zh: "你被长期目标驱动，愿意一步一步爬到想去的地方。", en: "Long-term goals drive you; you’re willing to climb step by step to where you want to be." },
      moon: { zh: "清楚的计划和看得见的进度，会让你安心投入。", en: "A clear plan and visible progress let you commit with a calm mind." },
      rising: { zh: "你在面试里显得成熟、可靠、准备充分。", en: "In interviews you come across as mature, reliable and well prepared." } },
    { key: "aquarius", name: { zh: "水瓶座", en: "Aquarius" }, glyph: "♒︎", element: "air", modality: "fixed",
      sun: { zh: "你想做不一样的东西，常常从系统、社会或未来出发。", en: "You want to make something different, often starting from systems, society or the future." },
      moon: { zh: "你需要被允许“怪”一点，独立空间让你最自在。", en: "You need permission to be a bit odd; independence is where you feel most at ease." },
      rising: { zh: "你的作品集第一眼就显得前卫、跳脱、很有自己的逻辑。", en: "Your portfolio first reads as forward-looking and unconventional, with its own logic." } },
    { key: "pisces", name: { zh: "双鱼座", en: "Pisces" }, glyph: "♓︎", element: "water", modality: "mutable",
      sun: { zh: "你从梦、音乐和情绪里取材，作品边界常常是模糊的。", en: "You draw on dreams, music and moods; the edges of your work are often soft." },
      moon: { zh: "你需要安静和独处来沉进去，太吵会让你漂走。", en: "You need quiet and solitude to sink in; too much noise and you drift away." },
      rising: { zh: "别人第一眼觉得你温柔、敏感、带着一点梦游感。", en: "People first read you as gentle and sensitive, with a slightly dreamy air." } }
  ];

  /* ---------------- Sun element × MBTI temperament ---------------- */
  L.signTemperament = {
    fire: {
      NF: { zh: "你把热情烧向意义：一件作品不只要好看，还要能点燃别人心里的东西。", en: "You burn your passion towards meaning: a piece shouldn’t just look good, it should light something in other people." },
      NT: { zh: "你的想法带着火光：敢提出大胆假设，也急着去验证它。", en: "Your ideas come with a flame: you dare to make bold hypotheses and can’t wait to test them." },
      SJ: { zh: "你把热情放进可靠的节奏里，像一盏每天按时点亮的灯。", en: "You channel enthusiasm into a dependable rhythm, like a lamp lit at the same time every day." },
      SP: { zh: "你在现场最耀眼：灯一亮、观众一到，你就知道该怎么做。", en: "You shine brightest live: lights up, audience in, and you know exactly what to do." }
    },
    earth: {
      NF: { zh: "你把理想种在土里，愿意花时间让一个有意义的想法慢慢成形。", en: "You plant ideals in solid ground, giving a meaningful idea the time it needs to take shape." },
      NT: { zh: "你是落地的思考者：再抽象的概念，你也想给它找一个能摸到的结构。", en: "You’re a grounded thinker: however abstract the concept, you want to give it a structure you can touch." },
      SJ: { zh: "你稳到可以托住整个项目，手艺和耐心就是你的签名。", en: "You’re steady enough to hold up a whole project; craft and patience are your signature." },
      SP: { zh: "你用手思考，材料会告诉你下一步，你只需要听。", en: "You think with your hands; the material tells you the next step and you simply listen." }
    },
    air: {
      NF: { zh: "你擅长用语言和关系连接人，作品常常是一场对话的开始。", en: "You connect people through words and relationships; your work often opens a conversation." },
      NT: { zh: "你的脑子像风一样快，能在几个领域之间搭桥，再把概念讲得清清楚楚。", en: "Your mind moves like wind, bridging fields and explaining concepts with real clarity." },
      SJ: { zh: "你能把复杂信息整理成清楚的系统，让别人一看就懂。", en: "You sort complex information into clear systems that others grasp at a glance." },
      SP: { zh: "你轻快、灵活，擅长在现场读空气，随时调整方向。", en: "You’re light on your feet, reading the room and changing course on the spot." }
    },
    water: {
      NF: { zh: "你的感受深而宽，作品像一封写给陌生人的长信。", en: "Your feelings run deep and wide; your work reads like a long letter to a stranger." },
      NT: { zh: "你潜到问题深处，带着直觉和逻辑一起回来。", en: "You dive to the depths of a question and come back with intuition and logic together." },
      SJ: { zh: "你记得别人忘了的东西，适合做那个守护记忆的人。", en: "You remember what others forget; you may be the natural keeper of memory." },
      SP: { zh: "你随情绪和光线流动，最好的作品常在不经意间出现。", en: "You flow with mood and light; your best work often turns up when you least expect it." }
    }
  };

  /* ---------------- modality × J/P: working rhythm ---------------- */
  L.modalityJP = {
    cardinal: {
      J: { zh: "你善于开局也善于收尾：定好方向，就按计划推到终点。", en: "You start strong and finish properly: set a direction, then drive it to the end on plan." },
      P: { zh: "你擅长点火开局，但收尾时最好找个伙伴或截止日期帮一把。", en: "You’re great at lighting the fuse; for the finish, a partner or a deadline may help." }
    },
    fixed: {
      J: { zh: "你一旦认准就很难动摇，长线项目是你的主场，记得偶尔抬头看看。", en: "Once you commit, you hold firm; long projects are home turf, but look up now and then." },
      P: { zh: "你表面随性，内里却很坚持，会绕很多路回到同一个执念。", en: "Easy-going on the surface, stubborn underneath: you wander far but return to the same obsession." }
    },
    mutable: {
      J: { zh: "你能灵活应变又不失秩序，适合节奏多变却要准时交付的项目。", en: "You adapt without losing order, which suits shifting projects that still need to deliver on time." },
      P: { zh: "你像水一样换形状，灵感很多；给自己几个固定节点会更好收成。", en: "You change shape like water and ideas pour in; a few fixed checkpoints help you harvest them." }
    }
  };

  /* ---------------- Day Master element × Sun element ---------------- */
  L.eastWest = [
    {
      fire: { zh: "木生火：你的耐心生长遇上一把急火，点子会长得又快又旺。", en: "Wood feeds Fire: patient growth meets a quick blaze, so ideas shoot up fast and bright." },
      earth: { zh: "扎根：木遇上土象太阳，你的作品有根，经得起时间。", en: "Roots: Wood under an Earth Sun gives your work roots that can weather time." },
      air: { zh: "风吹林：你的想法像种子，被风带到意想不到的地方。", en: "Wind in the trees: your ideas travel like seeds, landing somewhere unexpected." },
      water: { zh: "雨后春笋：水象太阳滋养你的木气，灵感一下冒出一大片。", en: "Bamboo after rain: a Water Sun feeds your Wood, and ideas spring up all at once." }
    },
    {
      fire: { zh: "双倍火：热度满格，记得给自己留点灰烬冷却的时间。", en: "Double Fire: heat at full blast; leave yourself some time to cool to embers." },
      earth: { zh: "窑火：火遇上土象太阳，像烧陶，把热情烧成坚实的作品。", en: "Kiln: Fire with an Earth Sun is like firing clay, turning passion into solid work." },
      air: { zh: "风助火势：你一说话，现场就烧起来了。", en: "Wind fans the flame: when you start talking, the whole room catches." },
      water: { zh: "蒸汽：火与水象相遇，情绪浓到可以推动一台机器。", en: "Steam: Fire meets a Water Sun, and feeling builds enough pressure to drive an engine." }
    },
    {
      fire: { zh: "火山：表面安静，内里有岩浆，作品常在沉默后爆发。", en: "Volcano: calm on the surface, molten underneath; your work often erupts after a silence." },
      earth: { zh: "大地：双重的土，稳得像山，适合做需要十年功夫的事。", en: "Bedrock: double Earth, steady as a mountain, made for work that takes a decade." },
      air: { zh: "沙丘：风把土塑成新形状，你在稳定中保有好奇。", en: "Dunes: wind reshapes the earth, and you keep your curiosity inside the steadiness." },
      water: { zh: "泥土：水与土揉在一起，最适合捏出有温度的东西。", en: "Clay: water kneaded into earth, perfect for shaping things that feel warm." }
    },
    {
      fire: { zh: "锻造：金入火炉，你在压力下反而打磨得更锋利。", en: "Forge: Metal in the furnace; pressure only sharpens your edge." },
      earth: { zh: "矿脉：土象太阳里藏着你的金，耐心挖，越挖越亮。", en: "Ore seam: your Metal lies inside an Earth Sun; dig patiently and it gets brighter." },
      air: { zh: "风铃：金遇风会响，你的精确被灵动带出声音。", en: "Wind chime: Metal sings in the wind, and lightness gives your precision a voice." },
      water: { zh: "金生水：你的清晰让情感流得更顺，冷静里有深情。", en: "Metal feeds Water: your clarity lets feeling flow; there’s depth inside the cool." }
    },
    {
      fire: { zh: "蒸汽：水遇火象太阳，安静的你也会突然沸腾，冲出一股劲。", en: "Steam: Water meets a Fire Sun, and even quiet you can suddenly boil over with drive." },
      earth: { zh: "河岸：土象太阳给你的流动修好堤岸，想法有了方向。", en: "Riverbanks: an Earth Sun builds banks for your flow, giving ideas a course." },
      air: { zh: "云雾：水被风带上天，你的想象轻盈又捉摸不定。", en: "Mist and cloud: wind lifts Water skyward; your imagination turns light and elusive." },
      water: { zh: "深海：双重的水，想得很深，记得偶尔浮上来换口气。", en: "Deep sea: double Water, thinking far down; come up for air now and then." }
    }
  ];

  if (typeof module === "object" && module.exports) module.exports = L;
})(typeof window !== "undefined" ? window : globalThis);
