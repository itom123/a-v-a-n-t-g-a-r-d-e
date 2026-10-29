/*
 * AG LAB · email report copy: a 12-month plan, adjustments, and why the matches fit.
 */
(function (root) {
  "use strict";
  var L = root.LAB || (root.LAB = {});

  /* plan12[temperament][timeline] = four quarters (Months 1–3, 4–6, 7–9, 10–12).
   * timeline: 0 this year, 1 next year, 2 in two years or more. */
  L.plan12 = {
    NF: [
      [
        { title: { zh: "找到主线", en: "Find the thread" }, d: {
          zh: "回看自己做过的所有东西，挑出两三件至今仍让你有感觉的作品，写一页纸说说它们之间的联系：一段记忆、一个地方，或一个你总会回到的问题。把这条主线变成一个有明确成果的项目计划。每天坚持画速写本，哪怕只有十分钟。检查点：第三个月结束时，一个项目已经稳步推进，你能用三句话讲清它的想法。",
          en: "Look back at everything you have made and pick the two or three pieces that still feel alive. Write one page on what connects them: a memory, a place, a question you keep returning to. Turn that thread into a project plan with a clear outcome. Keep a sketchbook every day, even for ten minutes. Checkpoint: by the end of Month 3, one project is well under way and you can explain its idea in three sentences." } },
        { title: { zh: "成型与写作", en: "Build and write" }, d: {
          zh: "完成主项目，再开一个从不同角度或媒介回应它的第二个项目。尽早动笔写个人陈述，从“这些作品为什么对你重要”写起，而不是罗列成绩。找一位亲友圈以外的人，认真看一次你的作品集。检查点：一份顺序清楚的作品集初稿、一篇你能大声读出来而不尴尬的陈述草稿，以及一份价值观与你契合的课程短名单。",
          en: "Finish the main project and start a second that answers it from a different angle or medium. Draft your personal statement early, starting from why the work matters to you rather than from a list of achievements. Book one honest review of your portfolio with someone outside your circle of friends and family. Checkpoint: a full draft portfolio in order, a statement draft you can read aloud without wincing, and a shortlist of courses whose values fit yours." } },
        { title: { zh: "提交与演练", en: "Submit and rehearse" }, d: {
          zh: "大胆删减：少而精的页面比塞满的作品集更有力量。确保速写本展示出探索的过程，而不只是打磨好的结果。在截止日期前几个月就提交，而不是拖到最后一周。和朋友或导师练习讲解作品，先从感受讲起，再讲理由。检查点：申请已经递交，准备好一段简短的口头介绍，每周留出两个晚上好好休息。",
          en: "Edit hard: fewer, stronger pages beat a crowded portfolio. Make sure your sketchbooks show the journey, not only the polished ends. Submit in the months before your deadline rather than in the final week. Rehearse talking about your work with a friend or tutor, letting yourself speak from feeling first and then from reasons. Checkpoint: applications sent, a short spoken introduction ready, and two evenings a week kept free for rest." } },
        { title: { zh: "面试与延续", en: "Interview and keep making" }, d: {
          zh: "作品集面试和审阅可能集中在这几个月。准备时选一件你最爱讲的作品，再选一件你现在会换种做法的作品，并说清原因。不管收到什么回复，都保留一个小项目在手上，别让自我价值系于你无法控制的决定。检查点：面试结束并记下收获，无论结果如何都有接下来几个月的计划，同时给自己真正放个假。",
          en: "Portfolio reviews and interviews may fall in these months. Prepare by choosing one piece you love talking about and one you would now do differently, and say why. Whatever the replies say, keep a small project going so your sense of worth does not rest on decisions you cannot control. Checkpoint: interviews done with notes on what you learnt, a plan for the months ahead whichever way things go, and some real time off." } }
      ],
      [
        { title: { zh: "打开速写本", en: "Open the sketchbook" }, d: {
          zh: "这几个月用来没有压力地探索。每天画速写本，再准备一本笔记，记下打动你的东西：听到的一句话、物件、照片、地方。尝试三种从没用过的媒介。去看展览，写几句话说说为什么某件作品让你念念不忘。检查点：一本画满的速写本、三个小实验，以及一页列出笔记中反复出现的主题的清单。",
          en: "Use these months to explore without pressure. Keep a daily sketchbook and a notebook of things that move you: overheard lines, objects, photographs, places. Try three media you have never used. Visit exhibitions and write a few sentences about why one work stayed with you. Checkpoint: a full sketchbook, three small experiments, and a page listing the themes that keep appearing in your notes." } },
        { title: { zh: "第一个项目", en: "Shape a first project" }, d: {
          zh: "选出最像你自己的主题，围绕它做第一个完整项目，从调研、草图一直到成品。可以很私人，但要给它一个别人也能走进来的形式。每个月把进行中的作品给一位信任的人看看。检查点：完成一个完整项目，拍好清晰的记录照片，再写一段简短的反思，说说过程中让你意外的地方。",
          en: "Choose the theme that feels most yours and build a first full project around it, from research and sketches to a finished outcome. Let it be personal, but give it a form someone else can enter. Share work in progress with one trusted person each month. Checkpoint: one complete project, documented with clear photographs, plus a short reflective text on what surprised you along the way." } },
        { title: { zh: "拓宽视野", en: "Widen the lens" }, d: {
          zh: "开始第二个向外看的项目：别人的故事、某个社群，或你在意的社会问题。去采访一个人，或者从档案材料出发。这能展示你的广度，也让作品集不只关于你自己。开始浏览课程介绍，记下哪些课程谈到了和你相同的价值观。检查点：第二个项目完成一半，列出六到八个值得细看的课程初选名单。",
          en: "Start a second project that looks outward: other people’s stories, a community, a social question you care about. Interview someone or work from an archive. This shows range and stops the portfolio becoming only about you. Begin reading course pages and noting which ones talk about values you share. Checkpoint: a second project halfway done, and a first list of six to eight courses worth a closer look." } },
        { title: { zh: "整理与回望", en: "Gather and reflect" }, d: {
          zh: "完成第二个项目，把所有作品铺在地上或贴满一面墙，问问自己哪些作品彼此呼应、还缺什么。为个人陈述写下第一批笔记，从一个让你想学艺术的瞬间写起。条件允许的话，参加开放日或线上讲座。检查点：一份粗略的作品集顺序、一张明年要补的缺口清单，并以休息充分的状态进入申请年。",
          en: "Finish the second project and lay everything out on the floor or a wall. Ask which pieces speak to each other and what is missing. Draft the first notes for a personal statement, starting from a moment that made you want to study art. Attend open days or online talks where you can. Checkpoint: a rough portfolio sequence, a list of gaps to fill next year, and a rested start to the application year." } }
      ],
      [
        { title: { zh: "养成习惯", en: "Make it a habit" }, d: {
          zh: "时间充裕，现在的目标是养成习惯，而不是做作品集。每周写生几次，用图片和文字记日记，留意自己被什么吸引，不急着评判。每个月读一位艺术家的传记或访谈。检查点：创作已经成为你每周生活的一部分，你也有了一个装满灵感素材的小盒子或文件夹。",
          en: "With time on your side, the goal is a habit, not a portfolio. Draw from life a few times a week, keep a journal of images and words, and notice what you are drawn to without judging it. Read one artist’s biography or interview each month. Checkpoint: making has become a natural part of your week, and you have a small box or folder of things that inspire you." } },
        { title: { zh: "打好基础", en: "Learn the basics well" }, d: {
          zh: "报一个短期课程，或跟一套系统的素描、色彩或摄影练习。基本功能给你的感受一种语言。每做一个技法练习，就配一件个人回应的小作品，让技术和意义一起成长。加入一个班级或线上小组，不必独自摸索。检查点：某项核心技能有了看得见的进步，并用它做出三件表达自己想法的小作品。",
          en: "Take a short course or follow a structured programme in drawing, colour or photography. Fundamentals give your feelings a language. Pair each technical exercise with a personal response, so skill and meaning grow together. Join a class or online group so you are not working alone. Checkpoint: visible progress in one core skill, and three small pieces that use it to say something of your own." } },
        { title: { zh: "追一个问题", en: "Follow a question" }, d: {
          zh: "选一个你真正在意的问题，比如家庭、记忆、归属或自然，用三个月去追：阅读、交谈、动手做。不必担心结果，让过程带路。记下你对“作为创作者的自己”有了哪些新认识。检查点：围绕一个问题积累一小批探索性作品，并大致知道哪些媒介最适合你。",
          en: "Pick a question you genuinely care about, perhaps about family, memory, belonging or nature, and follow it for three months through reading, conversations and making. Do not worry about the result; let the process lead. Keep notes on what you learn about yourself as a maker. Checkpoint: a small body of exploratory work around one question, and a sense of which media suit you best." } },
        { title: { zh: "轻轻看远一点", en: "Look ahead gently" }, d: {
          zh: "回顾这一年，挑出你想保留的东西。开始了解预科、本科和硕士几条路径分别看重什么，暂时不必做决定。和导师或比你早几年走这条路的人聊聊，真实的学习生活是什么样子。检查点：一个放着你最好十件作品的文件夹，对申请层级有更清楚的想法，并安排一段真正的休息。",
          en: "Look back on the year and choose what you want to keep. Begin to learn about foundation, BA and MA routes and what each asks for, without committing yet. Talk with a tutor or someone a few years ahead of you about what study is really like. Checkpoint: a folder with your best ten pieces, a clearer idea of the level you will apply for, and a break that includes proper rest." } }
      ]
    ],
    NT: [
      [
        { title: { zh: "定下研究问题", en: "Define the question" }, d: {
          zh: "写下你最强的作品真正在追问的问题，然后检验它：是否具体到能动手做，又开放到能给你惊喜？把项目拆成一个分阶段的系统，但给第一件实物成果定一个硬性日期，让思考变成证据。检查点：第三个月时，用一句话写清研究问题，列出五个参考来源，并至少完成一件验证它的作品。",
          en: "Write down the question your strongest work is really asking, then test it: is it specific enough to make with, and open enough to surprise you? Map the project as a system of stages, but set a hard date for the first physical outcome so thinking turns into evidence. Checkpoint: by Month 3, a research question in one sentence, a reading list of five sources, and at least one finished piece that tests it." } },
        { title: { zh: "搭建论证", en: "Build the argument" }, d: {
          zh: "做两个从不同方向切入同一问题的项目，让作品集读起来像一场探究，而不是一堆完成品。把方法展示出来：测试、图解、失败的版本。把个人陈述写成一个清晰的论点：你想研究什么，为什么是这门课。检查点：一份逻辑清楚的作品集初稿、一篇陈述草稿，以及一份按课程与研究问题契合度排序的短名单。",
          en: "Develop two projects that approach your question from different directions, so the portfolio reads as an inquiry rather than a set of finished objects. Show your method: tests, diagrams, failed versions. Draft your statement as a clear argument about what you want to investigate and why this course. Checkpoint: a draft portfolio with a visible logic, a statement draft, and a shortlist ranked by how well each course fits your question." } },
        { title: { zh: "精简与提交", en: "Edit and submit" }, d: {
          zh: "请一位挑剔的读者指出哪里逻辑难懂，然后删掉所有不服务于论点的内容。检查观念性作品在视觉上是否依然有力，想法需要形式。在截止日期前几个月提交，忍住不再反复打开已经定稿的文件。检查点：申请已递交，为面试准备一页纸的创作实践摘要，并且每晚按时收工，别让研究挤掉睡眠。",
          en: "Ask a critical reader where your logic is hard to follow, then cut anything that does not serve the argument. Check that conceptual work is still visually strong; ideas need form. Submit in the months before your deadline and resist reopening finished files. Checkpoint: applications sent, a one-page summary of your practice for interviews, and a clear stop each evening so research does not swallow your sleep." } },
        { title: { zh: "答辩与延伸", en: "Defend and extend" }, d: {
          zh: "面试和作品集审阅常常考察你的思考方式，所以练习讲清你做过的一个决定，以及你放弃的另一个方案。预料到会有尖锐的问题，把它们当作有趣的难题。保留一个纯粹为了好玩的小实验。检查点：面试完成，记下哪些问题让你受到挑战，无论结果如何都有后续计划，并留出时间做些与艺术无关的事。",
          en: "Interviews and portfolio reviews often turn on how you think, so practise explaining a decision you made and an alternative you rejected. Expect hard questions and treat them as interesting problems. Keep one small experiment running purely for fun. Checkpoint: interviews done, notes on which questions stretched you, a plan for the months ahead whatever the outcome, and time set aside for something unrelated to art." } }
      ],
      [
        { title: { zh: "摸清领域", en: "Survey the field" }, d: {
          zh: "这几个月用来绘制你的兴趣地图。广泛阅读、看展览，建一份研究日志，把想法、艺术家和技法连起来。快速做原型，而不是等待完美的概念。同一时间最多只开三条探索线。检查点：一份至少二十条记录的研究日志、几个粗糙的测试，以及一个你想认真追下去的问题。",
          en: "Spend these months mapping what interests you. Read widely, visit exhibitions and keep a research log that links ideas, artists and techniques. Make quick prototypes rather than waiting for the perfect concept. Limit yourself to three open lines of inquiry at any one time. Checkpoint: a research log with at least twenty entries, a handful of rough tests, and one question you want to pursue properly." } },
        { title: { zh: "第一个完整项目", en: "Run the first project" }, d: {
          zh: "把这个问题变成一个有开头、过程和结尾的完整项目。规划好各个阶段，但安排一次中期检查，到时必须拿出实物。像记录成果一样认真记录过程。把作品给一位会和你争论的人看看。检查点：完成一个完整项目，写一段说明方法的短文，并列出如果重来你会改变什么。",
          en: "Turn that question into a full project with a beginning, middle and end. Plan the stages, but schedule a mid-point review where you must show something physical. Document the process as carefully as the outcome. Share it with someone who will argue with you. Checkpoint: one complete project, a short text explaining your method, and a list of what you would change if you began again." } },
        { title: { zh: "拓展方法", en: "Stretch the method" }, d: {
          zh: "开始第二个项目，刻意使用你不太擅长的方法或材料，比如观察写生、手工制作或与人合作。好的作品集能展示一个头脑如何适应变化。开始从研究氛围、工坊条件和评估方式几个维度比较课程。检查点：第二个项目已经启动，并做好一张六到八门课程的对比表。",
          en: "Start a second project that deliberately uses a method or material you are less comfortable with, perhaps drawing from observation, working with your hands, or collaborating. Good portfolios show how a mind adapts. Begin comparing courses by their research culture, workshops and how they assess work. Checkpoint: a second project under way and a comparison table of six to eight courses." } },
        { title: { zh: "搭好框架", en: "Draft the structure" }, d: {
          zh: "完成第二个项目，草拟作品集框架：什么放在最前面，每部分证明什么，缺口在哪里。围绕驱动你的问题，勾勒个人陈述的提纲。请人从外部对整体做一次评议。检查点：一份作品集提纲、一张明年要补的缺口清单、一份陈述提纲，并在申请年开始前好好休息一段时间。",
          en: "Finish the second project and draft a portfolio structure: what comes first, what each section proves, where the gaps are. Sketch the outline of a personal statement around the question that drives you. Get one outside critique of the whole. Checkpoint: a portfolio outline, a gap list for next year, a statement outline, and a proper break before the application year begins." } }
      ],
      [
        { title: { zh: "喂饱好奇心", en: "Feed your curiosity" }, d: {
          zh: "距离申请还有两年多，你的优势是有时间思考。顺着好奇心在艺术、科学、设计和哲学之间游走，用一本摘抄本收集想法与图像。每写几页笔记，就配一件哪怕很小的作品，让思考始终与动手相连。检查点：一本写满联想的笔记本，以及由此而来的至少六件小物件、素描或测试。",
          en: "Two years out, your advantage is time to think. Follow your curiosity across art, science, design and philosophy, and keep a commonplace book of ideas and images. Pair every few pages of notes with something made, however small, so thinking stays connected to making. Checkpoint: a notebook full of connections and at least six small objects, drawings or tests that came from them." } },
        { title: { zh: "学透一种工具", en: "Learn a tool deeply" }, d: {
          zh: "选一项能帮你实现想法的技术，比如素描、编程、模型制作或摄影，通过课程或自己编的学习计划认真学透。设定可衡量的里程碑并坚持完成。检查点：能把第一次尝试和最新成果并排展示、进步清楚可见，并用新技能做一个探索某个想法的小项目。",
          en: "Choose one technical skill that would unlock your ideas, such as drawing, coding, model-making or photography, and study it properly through a course or a self-made syllabus. Set measurable milestones and keep them. Checkpoint: clear progress you can show side by side, from first attempt to latest, and one small project that uses the new skill to explore an idea." } },
        { title: { zh: "公开检验", en: "Test an idea in public" }, d: {
          zh: "做一个小项目，把它放到人群面前：一本小志、一次快闪展示、一篇网上发布或一次校内展览。观察别人如何解读，可能和你的本意不同。把收获写下来。检查点：一个公开展示过的项目、一份观众反馈记录，并更清楚地知道你的想法离开脑海后是怎样被接收的。",
          en: "Make a small project and put it in front of people: a zine, a pop-up display, an online post or a school exhibition. Watch how others read it, which may differ from what you intended. Write up what you learnt. Checkpoint: one project shown publicly, notes on audience responses, and a better sense of how your ideas land outside your own head." } },
        { title: { zh: "规划路线", en: "Map the routes" }, d: {
          zh: "研究摆在你面前的路线：预科、本科，或先走另一条路；不同国家和课程的教学风格有何不同。做一张简单的决策表，但给直觉留些空间。和在读学生聊聊课业强度。检查点：一个暂定的路线和层级、一份明年要培养的技能清单、把最好的十件作品集中放在一处，并好好休息一次。",
          en: "Research the routes in front of you: foundation, BA or a different path first, and how countries and courses differ in teaching style. Build a simple decision table but leave room for instinct. Talk to current students about workload. Checkpoint: a provisional route and level, a list of skills to build next year, your ten best pieces gathered in one place, and a genuine rest." } }
      ]
    ],
    SJ: [
      [
        { title: { zh: "排好进度", en: "Set the schedule" }, d: {
          zh: "你在清晰的计划里状态最好，那就先做计划：列出短名单上每门课程的全部要求，再从截止前几个月往回倒推出每周目标。在这个框架里，给一个项目留出实验的空间，让作品集既显出认真，也显出敢冒险。检查点：一份书面进度表、一个充分展开的项目，以及一本展示扎实真实过程的速写本。",
          en: "You work best with a clear plan, so build one: list every requirement for each course on your shortlist, then work backwards from the months before your deadline to weekly targets. Within that structure, give one project room to be experimental, so the portfolio shows risk as well as care. Checkpoint: a written schedule, one project well developed, and a sketchbook showing steady, honest process." } },
        { title: { zh: "跳出安全区", en: "Push past the safe version" }, d: {
          zh: "完成主项目后，再做一个打破你自己某条规则的版本：换一个尺度、一种意想不到的材料、更放松的笔触。招生导师看重技术，也看重好奇心。按清楚的层次起草个人陈述：你做什么、怎么做、想学什么。检查点：一份完整的作品集初稿、一篇条理清晰的陈述草稿，以及一位校外人士的反馈。",
          en: "Finish your main project, then make a second version that breaks one of your own rules: a new scale, an unexpected material, a looser hand. Admissions tutors tend to look for curiosity as well as skill. Draft your statement in clear stages: what you make, how you work, what you want to learn. Checkpoint: a full draft portfolio, a tidy statement draft, and feedback from one person outside school." } },
        { title: { zh: "打磨与提交", en: "Polish and submit" }, d: {
          zh: "这是你最拿手的阶段：检查、排序和呈现。确保每页都有标注、照片清晰、顺序能讲出一个故事。在截止前几个月尽早提交，所有材料都留好备份。检查点：申请已递交、清单逐项打勾，准备好一段练熟的作品简介，每周的节奏里依然有睡眠、运动和朋友。",
          en: "This is your strongest quarter: checking, sequencing and presenting. Make sure every page is labelled, photographs are sharp and the order tells a story. Submit early in the months before your deadline and keep copies of everything. Checkpoint: applications sent with a checklist ticked off, a short practised introduction to your work, and a weekly rhythm that still includes sleep, exercise and friends." } },
        { title: { zh: "准备与应变", en: "Prepare and adapt" }, d: {
          zh: "准备面试时可以预演答案，但也要练习应对意料之外的问题，因为真实的对话很少照稿进行。带上一本能展示思考过程的速写本，而不只是完成页。等待期间，用没有压力的方式继续创作。检查点：面试完成并做好记录，有一份无论回复如何都可行的后续计划，以及一段你真正排进日程的休息。",
          en: "Prepare for interviews by rehearsing answers, but also practise the unexpected question, as real conversations rarely follow a script. Bring a sketchbook that shows thinking, not only finished pages. Keep making in a low-pressure way while you wait. Checkpoint: interviews done with notes, a plan for the months ahead that works whatever the replies say, and a break you have actually scheduled." } }
      ],
      [
        { title: { zh: "建立日常", en: "Build a routine" }, d: {
          zh: "定一个能长期坚持的每周日程：固定的素描时间、每天一页速写本、每月看一次展。稳定是你的长处，用它来积累作品量和信心。在日程里每周留一次没有规则的自由创作。检查点：三个月扎实的速写本练习，以及一本记下你最喜欢的题材和技法的笔记。",
          en: "Set a weekly routine you can keep: fixed hours for drawing, a sketchbook page a day, one exhibition a month. Reliability is your strength, so use it to build volume and confidence. Within the routine, include one free session each week with no rules at all. Checkpoint: three months of steady sketchbook work and a notebook of the subjects and techniques you enjoy most." } },
        { title: { zh: "完成完整项目", en: "Complete a full project" }, d: {
          zh: "规划一个分阶段的完整项目：从调研、观察写生，到深化发展，再到成熟的成品。把每一步都清楚记录下来，整洁的过程页是实打实的加分项。在中期请导师给一轮反馈并据此调整。检查点：一个带完整记录的已完成项目，以及一份关于收到的反馈和你做了哪些修改的笔记。",
          en: "Plan a full project with stages, from research and observational studies to development and a resolved outcome. Keep a clear record of each step; tidy process pages are a real asset. Ask a tutor for one round of feedback at the mid-point and act on it. Checkpoint: one finished project with documentation, and a note on the feedback you received and what you changed." } },
        { title: { zh: "加入实验", en: "Add an experiment" }, d: {
          zh: "开始第二个更开放的项目：从一种材料或一次散步出发，而不是从计划出发，看看它会走向哪里。这能平衡你已有的那些严谨作品。同时，做一张表格，整理各门课程的要求、费用和教学风格。检查点：一个实验性项目已在进行，以及一份整理清楚的六到八门课程名单。",
          en: "Start a second project that is more open-ended: begin with a material or a walk rather than a plan, and see where it goes. This balances the careful work you already have. Meanwhile, compile a spreadsheet of courses with their requirements, costs and teaching style. Checkpoint: an experimental project under way and a well-organised list of six to eight courses." } },
        { title: { zh: "复盘与规划", en: "Review and plan" }, d: {
          zh: "把所有作品摆出来分类：成熟的、有潜力的、练习性的。对照短名单课程的要求找出缺口，再把缺口变成申请年的逐月计划。开始记录可以写进个人陈述的经历。检查点：一份分好类的作品档案、一份补缺计划、一个陈述素材文档，并在下一阶段之前好好休息。",
          en: "Lay out all your work and sort it: strong, promising, practice. Identify the gaps against what your shortlisted courses ask for. Turn those gaps into a month-by-month plan for the application year. Begin a list of experiences that could feed your personal statement. Checkpoint: a sorted archive, a gap plan, a statement notes file, and a real rest before the next stage." } }
      ],
      [
        { title: { zh: "夯实基础", en: "Strengthen the foundations" }, d: {
          zh: "时间还长，把精力投在你喜欢的基础功上：观察写生、色彩、构图和细致的手艺。设定适度的每周目标，用一份简单的记录追踪进度。现在的稳定练习，会让你以后更有底气去做实验。检查点：一份显示持续练习的记录，以及一组从第一周到最后一周进步清晰可见的习作。",
          en: "With plenty of time ahead, invest in the fundamentals you enjoy: observational drawing, colour, composition and careful craft. Set modest weekly goals and track them in a simple log. Steady practice now builds the confidence that makes experimenting easier later. Checkpoint: a log showing consistent practice and a set of studies that show clear improvement from the first week to the last." } },
        { title: { zh: "尝试陌生", en: "Try something unfamiliar" }, d: {
          zh: "选一种你平时会回避的媒介或方法，比如抽象绘画、行为表演或拼贴，认认真真给它一个月。你不一定要喜欢它，重点是了解自己如何面对不确定。记下哪些地方让你不舒服、哪些让你感到自由。检查点：一小组用陌生媒介完成的作品，以及一页诚实写下收获的文字。",
          en: "Pick one medium or approach you would usually avoid, such as abstract painting, performance or collage, and give it a fair month. You do not have to like it; you are learning how you respond to uncertainty. Note what feels uncomfortable and what feels freeing. Checkpoint: a small set of work in an unfamiliar medium and an honest page on what it taught you." } },
        { title: { zh: "做一件留得住的", en: "Make something to keep" }, d: {
          zh: "把手艺和你在意的题材结合起来，认真做一个项目：一本书、一组版画、一件物品或一组照片。规划好阶段并按计划推进，但如果作品需要，允许自己调整一次方向。在自然光下把它好好拍下来。检查点：一个完成度高、呈现得体、你愿意拿给任何人看的项目。",
          en: "Combine your craft with a subject you care about in one carefully made project: a book, a series of prints, an object or a set of photographs. Plan the stages and keep to them, but allow one change of direction if the work asks for it. Photograph it properly in daylight. Checkpoint: one resolved, well-presented project that you would be proud to show anyone." } },
        { title: { zh: "了解全局", en: "Learn the landscape" }, d: {
          zh: "从容地研究前面的路线：预科、本科、硕士，以及不同国家在教学上的差别。记下各项要求，但要记得它们会变，临近申请时再去官方页面核实。把最好的作品整理进一个文件夹。检查点：对可选路线有清楚的全局了解、暂定申请层级、一份整齐的十件代表作档案，以及一段提前排好的休息。",
          en: "Research the routes ahead calmly: foundation, BA, MA, and how teaching differs between countries. Note requirements, but remember these change, so check official pages closer to the time. Gather your best work in one organised folder. Checkpoint: a clear overview of possible routes, a provisional choice of level, a tidy archive of ten strong pieces, and a restful break you have planned in." } }
      ]
    ],
    SP: [
      [
        { title: { zh: "先做再记录", en: "Make, then catch it" }, d: {
          zh: "你用双手思考效果最好，那就先大量、快速地做：材料测试、快拍、粗模型。然后完成你可能会跳过的那一步：每件都拍照，再写两行字说明你尝试了什么。这份记录会把你的能量转化成作品集。保持短而频繁的创作节奏。检查点：第三个月时，一个有力的项目初具雏形，所有测试都有记录存档。",
          en: "You think best with your hands, so start by making a lot, fast: material tests, quick shoots, rough models. Then do the part you might skip: photograph everything and write two lines on each piece about what you tried. That record turns energy into a portfolio. Keep sessions short and frequent. Checkpoint: by Month 3, one strong project taking shape and a documented archive of every test." } },
        { title: { zh: "把能量变成项目", en: "Turn energy into projects" }, d: {
          zh: "从测试中挑出最强的两个方向，各自发展成成熟的项目。给自己设定终点清楚的短冲刺，因为势头是你的朋友。先用说的方式起草个人陈述：把自己讲作品的话录下来，再根据录音整理成文。检查点：两个接近完成的项目、一篇有你自己语气的陈述草稿，以及一份工坊条件好的课程短名单。",
          en: "Pick the two strongest directions from your tests and develop each into a resolved project. Give yourself short sprints with a clear finish line, because momentum is your friend. Draft your statement by talking first: record yourself describing your work, then write from the transcript. Checkpoint: two projects close to finished, a statement draft in your own voice, and a shortlist of courses with good workshops." } },
        { title: { zh: "删减与提交", en: "Edit and send" }, d: {
          zh: "选出最能体现你的手感和眼光的作品，其余的删掉。用制作过程的照片把过程呈现出来，而不只是成品。请一位做事有条理的人帮你核对实际细节，然后在截止前几个月提交。检查点：申请已递交、文件已备份、找到在屏幕上展示实物作品的清晰方式，每周安排几次户外的活力休息。",
          en: "Choose the work that best shows your hand and your eye, and cut the rest. Make process visible with photos of making, not only finished pieces. Ask someone organised to check the practical details with you, then submit in the months before your deadline. Checkpoint: applications sent, files backed up, a clear way to show physical work on screen, and a few active breaks outdoors each week." } },
        { title: { zh: "现场展示", en: "Show it live" }, d: {
          zh: "面试和审阅可能很适合你，因为一谈到真实的东西你就会神采奕奕。带上能拿在手上展示的物件或速写本，练习一段从容的两分钟讲解，避免讲得太急。等待期间继续动手，闲下来反而可能比工作更累。检查点：面试完成并有记录，不管结果如何都安排好下一个项目，并留出运动和休息的时间。",
          en: "Interviews and reviews can suit you, because you come alive talking about real things. Bring objects or a sketchbook you can handle, and practise a calm two-minute walk-through so you do not rush. Keep making while you wait; idle time can feel heavier than work. Checkpoint: interviews done with notes, a next project lined up whatever happens, and time for movement and rest." } }
      ],
      [
        { title: { zh: "玩材料", en: "Play with materials" }, d: {
          zh: "这几个月用来“玩”：陶土、纺织、版画、影像、现成物，手边能拿到的都试试。条件允许就去工坊和创客空间。每个实验都拍照，按日期归档。先别急着找意义，留意做什么时你会忘了时间。检查点：一大批有记录的测试，以及一份最让你兴奋的材料短清单。",
          en: "Use these months to play: try clay, textiles, print, film, found objects, whatever you can get your hands on. Visit workshops and makerspaces if you can. Photograph every experiment and file it by date. Do not worry about meaning yet; notice what you lose track of time doing. Checkpoint: a large, documented set of tests and a short list of the materials that excite you most." } },
        { title: { zh: "在动手中找想法", en: "Find the idea by making" }, d: {
          zh: "拿起你最喜欢的材料做一个系列，然后再问这个系列在讲什么。想法往往已经藏在作品里了。每次创作后写一小段话，让反思成为习惯而不是负担。定一个完成日期，并把系列拿给别人看。检查点：一个有清楚标题的完整系列，以及一页记录它所探索内容的笔记。",
          en: "Take your favourite material and make a series, then ask what the series is about. Often the idea is already in the work. Write a short paragraph after each session so reflection becomes a habit, not a chore. Set a finish date and show the series to someone. Checkpoint: one completed series with a clear title and a page of notes on what it explores." } },
        { title: { zh: "走出去回应", en: "Get out and respond" }, d: {
          zh: "开始第二个项目，回应一个真实的地点、事件或人群：一个集市、一条街、一场节庆、一家本地作坊。在现场工作正好发挥你的长处。同时浏览课程介绍，记下哪些课程工坊设施好、有真实项目。检查点：第二个项目已经启动，积累了丰富的现场素材，并列出六到八门课程。",
          en: "Start a second project that responds to a real place, event or group of people: a market, a street, a festival, a local workshop. Working on site plays to your strengths. Meanwhile, look at course pages and note which have strong workshops and live projects. Checkpoint: a second project under way, rich with on-site material, and a list of six to eight courses." } },
        { title: { zh: "收拢整理", en: "Pull it together" }, d: {
          zh: "完成第二个项目，花几天集中整理：分类照片、给作品贴标签、草拟作品集顺序。整理时间别太长，做完给自己一点奖励。为个人陈述记下每件作品背后的故事。检查点：一份分类好的档案、最佳作品的粗略顺序、一张明年要补的缺口清单，以及一次有运动安排的好好休息。",
          en: "Finish the second project and spend a few focused days organising: sort photos, label pieces, sketch a rough portfolio order. Keep these sessions short and reward yourself afterwards. Note the stories behind each piece for your statement. Checkpoint: a sorted archive, a rough sequence of your best work, a gap list for next year, and a proper break with something active." } }
      ],
      [
        { title: { zh: "多动手", en: "Say yes to making" }, d: {
          zh: "时间还长，最好的准备就是大量的动手经验。报个工作坊、去后台帮忙、到版画工作室做志愿者、给朋友拍片子。多样的经历能培养直觉。用一个手机相册或盒子收集你做的所有东西。每周都做点什么，哪怕又小又乱。检查点：至少尝试四种不同的创作方式，并大致知道哪些环境最能给你能量。",
          en: "With time ahead, the best preparation is lots of hands-on experience. Join a workshop, help backstage, volunteer at a print studio, film your friends. Variety builds instinct. Keep a phone album or a box of everything you make. Try to make something every week, even if it is small and messy. Checkpoint: at least four different kinds of making tried, and a sense of which settings give you the most energy." } },
        { title: { zh: "磨一项手艺", en: "Sharpen one skill" }, d: {
          zh: "选出你最享受的那种创作，通过课程、导师或规律练习把它真正练好。技术能让你的直觉施展得更开。设定小而看得见的目标，比如每两周完成一件作品。检查点：把早期和近期作品并排放在一起能看出明显进步，并养成作品完成当天就拍照记录的习惯。",
          en: "Choose the making you enjoyed most and get properly good at it through a course, a mentor or regular practice. Skill gives your instinct more range. Set small, visible goals, like one finished piece every two weeks. Checkpoint: clear progress you can see by putting early and recent work side by side, and a habit of documenting every finished piece on the same day you finish it." } },
        { title: { zh: "为观众而做", en: "Make it for an audience" }, d: {
          zh: "为一个真实的场合做项目：一次小展览、一个摊位、一场表演或一次社区活动。牵涉到他人的截止日期很适合你的能量。结束后写下哪些有效、哪些想改、别人说了什么。之后要好好休息，现场活动消耗的精力往往比你察觉的更多。检查点：一个为真实观众制作并展示的项目，附照片和一页反思。",
          en: "Create a project for a real occasion: a small show, a stall, a performance, a community event. Deadlines that involve other people suit your energy. Afterwards, write down what worked, what you would change and what people said. Rest properly too; live events take more out of you than you notice. Checkpoint: one project made and shown for a real audience, with photographs and a page of reflection." } },
        { title: { zh: "选个方向", en: "Choose a direction" }, d: {
          zh: "回顾这一年，留意哪些项目最像你自己。研究前面的路线（预科、本科或硕士），以及重视动手与工坊的国家和课程。和在那里读书的学生聊聊。检查点：一条暂定路线、一个放着十件最佳作品的文件夹、一份明年的技能清单，以及一段既放松又有活动的休息。",
          en: "Look back over the year and notice which projects felt most like you. Research the routes ahead (foundation, BA or MA) and the countries and courses that value making and workshops. Talk to students who study there now. Checkpoint: a provisional route, a folder of your ten best pieces, a list of skills to build next year, and an active, restful break." } }
      ]
    ]
  };

  L.planTweaks = {
    resilience: {
      steady: {
        zh: "面对批评你通常比较从容，这是很宝贵的优势。利用它更早、更频繁地主动寻求更严格的反馈，比如每两三周一次。需要留意的是，别太快把有用的批评一笑而过，先把每条意见记下来，再决定怎么处理。稳定的人也需要休息，提前安排好，而不是等到累了才停。",
        en: "You tend to stay calm under critique, which is a real asset. Use it to invite tougher feedback earlier and more often, perhaps every two or three weeks. The risk is brushing off useful criticism too quickly, so write down each point before deciding what to do with it. Steadiness still needs rest; schedule it rather than waiting until you are tired." },
      balanced: {
        zh: "反馈会影响你，但你能自己调整回来。给自己留一点缓冲：听完意见，睡一觉，第二天再决定采纳哪些。每月和一位信任的人做一次正式复盘，平时再穿插一些轻松的交流，效果会很好。遇到挫折心里难受时，先回到一件小而愉快的任务上找回节奏，再去处理大的修改。",
        en: "Feedback affects you, but you find your way back. Give yourself a short buffer: hear the critique, sleep on it, then decide what to act on the next day. A monthly review with one trusted person works well, alongside lighter check-ins. When a setback stings, return to a small, enjoyable task to rebuild momentum before tackling the big fix." },
      sensitive: {
        zh: "你对反馈感受很深，这往往也意味着你的作品里有真正的细腻。好好保护这份感受力：主动选择接收批评的时机和方式，请少数你信任的人给出具体意见，需要的话用书面形式。把作品和你自己分开看。经历一次艰难的评议后，先休息再修改，记下过去的进步，在难熬的日子拿出来读一读。",
        en: "You feel feedback deeply, which often comes with real sensitivity in your work. Protect it by choosing when and how you receive critique: ask for specific comments, in writing if that helps, from a few reviewers you trust. Separate the work from yourself. After a hard session, rest before revising, and keep a note of past progress to read on difficult days." }
    },
    jp: {
      J: {
        zh: "你喜欢有计划，所以这份计划应该会很顺手。好好利用它，但要留出余地：每个月空出一周不排任务，用来补进度、休息或追一个意外的灵感。如果某个季度进度落后，就调整下一个季度，而不是熬夜硬赶。能弯曲的计划依然是计划，它会把你的精力留到最关键的时候。",
        en: "You like a plan, so this one should feel natural. Use it, but build in slack: leave one week in every month unscheduled for catching up, resting or following a surprise. If a quarter slips, adjust the next rather than working through the night. A plan that bends is still a plan, and it protects your energy for when it counts." },
      P: {
        zh: "死板的日程可能不适合你，所以把这份计划当作地图，而不是时间表。守住每个检查点，中间怎么走可以灵活安排。终点清楚的短冲刺，往往比长长的任务清单更有效。把下一个检查点告诉一个人，轻度的监督能帮你把想法落地，又不会夺走你需要的自由。",
        en: "Rigid schedules may not suit you, so treat this plan as a map rather than a timetable. Keep the checkpoints and let the route between them stay flexible. Short sprints with a clear finish line often work better than long lists. Tell someone your next checkpoint; light accountability helps ideas land without taking away the freedom you need." }
    },
    stage: [
      {
        zh: "你正从零开始，这完全没问题。先把精力放在习惯和数量上：每天画速写本、做小实验、多看多观察。现在还不必急着做“作品集作品”。积累三个月的素材后，最有力的方向会更容易看清。如果离申请已经不远，可以请导师帮你排出优先顺序。",
        en: "You are starting from the beginning, which is fine. Put your first effort into habit and volume: a daily sketchbook, small experiments and lots of looking. Do not try to make portfolio pieces yet. Once you have three months of material, the strongest directions will be easier to see. If your application is close, ask a tutor to help you prioritise." },
      {
        zh: "你已经有一些作品，先给它们分分类：哪些最像你自己？它们之间有什么联系？把精力放在把一件有潜力的作品发展成完整项目上，包括调研、深化和成熟的成品。项目能展示你如何思考，这比一堆零散的图片更重要。其余作品可以当作有用的练习留着。",
        en: "You already have some pieces, so start by sorting them: which feel most like you, and what connects them? Put your effort into turning one promising piece into a full project with research, development and a resolved outcome. Projects show how you think, which matters more than a collection of separate images. Keep the rest as useful practice." },
      {
        zh: "已经有几个完整项目，现在的重点是整体结构，而不是数量。看看这些项目是否既有广度，又有一条清楚的主线，然后用一件新作品补上最关键的缺口。改进作品记录和过程页，这往往比新作品更能提升作品集。同步开始起草个人陈述，让文字和图像一起成长。",
        en: "With a few full projects, your priority is shape rather than quantity. Check whether the projects show range and a clear thread, then fill the most important gap with one new piece of work. Improve documentation and process pages, which often lift a portfolio more than new work. Begin drafting your statement alongside, so words and images develop together." },
      {
        zh: "你的作品集已基本成型，现在的精力应该放在精简和呈现上。请一两位有经验的人看看哪里节奏变弱，宁可删减也不要堆加。针对每门课程调整作品顺序和个人陈述。然后保护好你的时间：提交前别再开启大的新项目，把这段空间留给休息和面试准备。",
        en: "Your portfolio is nearly ready, so the effort now goes into editing and presentation. Ask one or two experienced readers where it loses energy, and cut rather than add. Tailor the order and statement to each course. Then protect your time: avoid starting big new projects just before submission, and use the space to rest and prepare for interviews." }
    ]
  };

  L.matchDeep = {
    country: {
      UK: {
        zh: "英国适合愿意被要求讲清自己作品的人。教学通常围绕工作室实践、独立项目和集体评议展开，所以你需要很早就确定自己的方向。课程可能短而密集，效率高，但留给适应的时间不多。需要权衡的是生活成本、离家的距离，以及你是否适应开放、自主性很强的学习方式。",
        en: "The UK suits people who want to be challenged to explain their work. Teaching is often built around studio practice, independent projects and group critique, so you are expected to set your own direction early. Courses can be short and intense, which is efficient but leaves little time to settle in. Weigh the cost of living, the distance from home and how comfortable you are with open-ended, self-directed study." },
      HK: {
        zh: "香港适合想要国际化环境、又不想离家太远的人。这是一座紧凑、节奏很快的城市，设计、媒体和视觉文化就在日常生活里交汇，中英双语的学习环境也能让你更快适应。需要权衡的是城市生活的节奏与密度、住房的成本和面积，以及课程在工作室实践与学术学习之间的比重是否适合你。",
        en: "Hong Kong can suit people who want an international environment without being too far from home. It is a compact, fast-moving city where design, media and visual culture meet daily life, and bilingual study can make settling in easier. Weigh the pace and density of city life, the cost and size of housing, and whether the course balances studio time with academic study in a way that fits you." },
      SG: {
        zh: "新加坡适合重视安全、有序与多元文化学习环境的人，这里的设计和数字媒体发展很快。课程常常与产业和科技相连，如果你喜欢看到作品如何被使用，这会很有帮助。需要权衡的是炎热的气候、生活成本、比一些国际都市更小的艺术圈，以及教学是否给实验性创作留出足够空间。",
        en: "Singapore can suit people who value a safe, orderly and multicultural place to study, with design and digital media growing quickly. Courses often connect with industry and technology, which helps if you like seeing how work is used. Weigh the hot climate, the cost of living, an art scene smaller than in some global cities, and whether the teaching leaves enough room for experimental work." }
    },
    mentor: {
      critical: {
        zh: "思辨型导师通过提问来推进：为什么是这个？为什么是现在？如果反过来做会怎样？这样的交流可能让人觉得吃力，但能帮你更深入地理解自己的作品。想收获最多，就带着具体的问题和几个备选方案来，认真记笔记，事后再决定采纳哪些。你可以不同意，好的思辨型导师想听的是你的理由，而不是服从。",
        en: "A critical mentor works through questions: why this, why now, what if you did the opposite? Sessions can feel demanding, but they help you understand your own work more deeply. To get the most from it, come with a specific question and a few options, take notes, and decide afterwards what to act on. It is fine to disagree; a good critical mentor wants your reasons, not obedience." },
      studio: {
        zh: "手作型导师在材料和工坊里陪你一起工作。交流往往从桌上的东西开始：一次测试、一个模型、一张版画。反馈实际又即时，你在尝试、失败、再尝试中学习。想收获最多，就带实物来，哪怕很粗糙，并准备好当场动手修改。除了问想法，也多问技法。",
        en: "A studio mentor works beside you in materials and workshops. Sessions often start with what is on the table: a test, a model, a print. Feedback is practical and immediate, and you learn through trying, failing and trying again. To get the most from it, bring physical work, even if it is rough, and be ready to make changes on the spot. Ask about techniques, not only ideas." },
      project: {
        zh: "项目型导师像对待真实委托一样对待你的作品集：有里程碑、有交付物、有明确目标。你总是清楚下一步要交什么、为什么，这让势头保持高涨，大任务也显得可控。想收获最多，就和导师一起商定检查点，进度落后时如实沟通，并多问每件作品如何服务于整体。在日程之外，也给开放的实验留些时间。",
        en: "A project mentor treats your portfolio like a real brief, with milestones, deliverables and clear goals. You always know what is due and why, which keeps momentum high and makes large tasks feel manageable. To get the most from it, agree the checkpoints together, say honestly when you are behind, and ask how each piece serves the whole. Keep some time outside the schedule for open experiment." },
      dialogue: {
        zh: "对话型导师先从理解你开始：你的兴趣、背景，以及你喜欢的工作方式。节奏更温和，反馈更具体，随着时间推移能建立信任和信心。挑战依然会来，但会以你能接受的方式到来。想收获最多，就坦诚说出你想要什么、担心什么，并在每次交流结束时请导师给出一个清楚的下一步。",
        en: "A dialogue mentor begins by understanding you: your interests, background and how you like to work. The pace is gentler and the feedback specific, which builds trust and confidence over time. Challenge still comes, but in a way you can take in. To get the most from it, be open about what you want and what worries you, and ask for one clear next step at the end of each session." }
    },
    mode: {
      expression: {
        zh: "当“表达”占主导时，你的作品集靠产出和个人声音驱动：有力的画面、辨识度高的风格、带着情感的作品。评审会感受到这股能量，所以也要把过程展示出来，说明你是怎么走到这一步、途中尝试了什么。选课时，留意工作室时间充足、允许个人方向、导师能帮你拓宽表现范围又不冲淡个人声音的课程。",
        en: "When expression leads, your portfolio is driven by output and a personal voice: strong images, a recognisable style, work that carries feeling. Reviewers will notice the energy, so make sure process is visible too, showing how you got there and what you tried along the way. Look for courses with plenty of studio time, room for individual direction and tutors who help you develop range without diluting your voice." },
      research: {
        zh: "当“研究”占主导时，你的作品集会展示作品背后的思考：阅读、参考、方法和清晰的问题。这种深度是优势，前提是视觉部分也要跟上。确保每个项目最终都落成完整、呈现良好的成果，而不只是笔记。选课时，留意理论与研究氛围浓厚、图书馆或档案资源好、指导中既重视动手也重视书面反思的课程。",
        en: "When research leads, your portfolio shows the thinking behind the work: reading, references, methods and a clear question. That depth is a strength, as long as the visual side keeps up. Make sure each project ends in something resolved and well presented, not only notes. Look for courses with a strong theory and research culture, good libraries or archives, and supervision that values written reflection alongside making." },
      structure: {
        zh: "当“结构”占主导时，你会被系统、规则和高标准吸引，也享受有难度的挑战。在作品集里，这体现为精确、一致和完成度高的项目。用至少一件放松控制、让偶然进入的作品来平衡。选课时，留意技术教学严谨、评估标准清楚、课题有挑战性的课程，同时也要有实验的空间，别让标准变成牢笼。",
        en: "When structure leads, you are drawn to systems, rules and high standards, and you enjoy a hard challenge. In a portfolio this shows as precision, consistency and well-resolved projects. Balance it with at least one piece where you loosen control and let chance in. Look for courses with rigorous technical teaching, clear assessment criteria and demanding briefs, but also space for experiment so standards do not become a cage." },
      applied: {
        zh: "当“应用”占主导时，你会思考观众、用户以及作品如何在真实世界中运作。作品集可以通过课题、原型、测试和清晰的成果展示这一点。也要确保你自己的观点依然清楚，让作品不只是一种服务。选课时，留意有真实项目、行业联系、实习机会和好工坊的课程，并看看它们如何平衡商业技能与批判思考。",
        en: "When application leads, you think about audiences, users and how work lives in the world. Your portfolio can show this through briefs, prototypes, testing and clear outcomes. Make sure your own point of view still comes through, so the work is not only a service. Look for courses with live projects, industry links, placements and good workshops, and check how they balance commercial skills with critical thinking." },
      collaboration: {
        zh: "当“协作”占主导时，你从同伴、团体和共同项目中获得能量。作品集里可以放入小组作品、你组织的工作坊或社区项目，但一定要说清你自己的角色：你提出了什么、做了什么、决定了什么。也要保留一些个人作品。选课时，留意同学氛围活跃、有共享工作室、跨学科模块，以及能与校外的人和机构合作的课程。",
        en: "When collaboration leads, you draw energy from peers, groups and shared projects. Your portfolio can include group work, workshops you ran or community projects, but always make your own role clear: what you proposed, made and decided. Keep some solo work too. Look for courses with a lively cohort, shared studios, cross-disciplinary modules and chances to work with people and organisations beyond the course." }
    }
  };

  if (typeof module === "object" && module.exports) module.exports = L;
})(typeof window !== "undefined" ? window : globalThis);
