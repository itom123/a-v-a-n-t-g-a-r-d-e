/*
 * AG LAB · email report copy: portfolio projects, portfolio shape, crit and interview guide.
 */
(function (root) {
  "use strict";
  var L = root.LAB || (root.LAB = {});

  L.projects = {};

  /* NF · meaning, story, people */
  L.projects.NF = [
    // 0 Wood
    [
      {
        title: { zh: "传下来的花园", en: "The Hand-Me-Down Garden" },
        brief: {
          zh: "追踪在人与人之间流转的植物：邻居送的一截枝条、长辈留下的一盆花、从另一座城市带来的种子。采访三户人家，各讲一株植物的来历，并在几周内对着实物反复写生。把植物速写、压花和简短引语装订成一本手工艺术家书。它向导师展示：你会倾听、能耐心观察，也能让一个故事随时间慢慢长出来。",
          en: "Trace plants that travel between people: a cutting from a neighbour, a pot inherited from a relative, seeds brought from another city. Interview three households about one plant each, and draw it from life over several weeks. Combine botanical studies, pressed leaves and short quotations in a hand-bound artist’s book. It shows a tutor that you can listen, observe patiently and let a story grow across time."
        }
      },
      {
        title: { zh: "写给一棵行道树的信", en: "Letters to a Street Tree" },
        brief: {
          zh: "选一棵你每天经过的行道树，连续八周记录它的变化，同时请路人、店主和邻居写下与它有关的一句话或一段回忆。用拓印、写生和收集来的文字，做一份可以复印传阅的小志，最后把一册留在树下附近的社区角落。导师会看到你如何把个人观察转化为公共叙事，以及你持续工作的耐心。",
          en: "Choose a street tree you pass every day and record its changes for eight weeks, while asking passers-by, shopkeepers and neighbours to write one line or memory about it. Use bark rubbings, drawings and the collected words to make a photocopied zine, and leave a copy in a nearby community space. Tutors see how you turn private observation into a public story, and the patience of sustained work."
        }
      },
      {
        title: { zh: "种子图书馆", en: "A Seed Library of Stories" },
        brief: {
          zh: "在学校或社区发起一次小型换种活动，每一包种子都附上一段捐赠者的故事。先研究种子图书馆和社区花园的做法，再设计种子袋、标签和借阅卡，并记录活动当天的照片与反馈。成品是一套印刷品加一份活动记录。它说明你能组织他人、设计有用的东西，并让作品在真实的人群里发生。",
          en: "Start a small seed swap at school or in your community, with every packet carrying a short story from the person who gave it. Research how seed libraries and community gardens work, then design the packets, labels and lending cards, and record the day in photographs and feedback. The result is a printed set plus an event record, showing you can organise people, design useful things and make work happen in public."
        }
      }
    ],
    // 1 Fire
    [
      {
        title: { zh: "为夜里工作的人点灯", en: "Lanterns for Night Workers" },
        brief: {
          zh: "关注那些在夜里让城市运转的人：保洁、值班、配送。在征得同意的前提下，收集他们愿意分享的一句话，不拍正脸，不写全名。把这些句子刻进纸灯笼，用低压灯珠点亮，做成一组小型灯光装置，并拍摄它在夜色中的样子。它向导师展示伦理意识、共情能力，以及用光组织情绪的本领。",
          en: "Focus on the people who keep a city running at night: cleaners, night-shift staff, delivery riders. With their consent, collect one sentence each that they are happy to share, with no faces and no full names. Cut the words into paper lanterns lit by low-voltage LEDs, then photograph the installation after dark. It shows tutors ethical care, empathy and your ability to shape feeling with light."
        }
      },
      {
        title: { zh: "小房间里的皮影戏", en: "Shadow Plays from Small Rooms" },
        brief: {
          zh: "把一个家庭故事改编成三分钟的皮影表演。先请家人讲述，整理成分镜，再研究传统皮影与当代剪影动画的造型语言。用卡纸、描图纸和一盏台灯制作角色与布景，邀请朋友观看并录下整场演出。作品集里放分镜、剪影草稿和视频截图，导师能看到你从口述到舞台的完整转化过程。",
          en: "Adapt a family story into a three-minute shadow performance. Ask relatives to tell it, turn it into a storyboard, then study the visual language of traditional shadow puppetry and contemporary silhouette animation. Build the characters and set from card, tracing paper and a desk lamp, invite friends to watch and film the whole show. Include the storyboard, silhouette drafts and stills, so tutors see the full journey from spoken memory to stage."
        }
      },
      {
        title: { zh: "阳光写下的信", en: "Letters Written by Sunlight" },
        brief: {
          zh: "用蓝晒法为一位你在乎的人写一封“光的信”。向对方借三到五件对他们有意义的小物件，配合一段简短采访，把物件放在感光纸上，在阳光下曝光成影像。研究曝光时间与天气的关系，记录每次测试。最后把蓝晒作品和信件并置展出。导师会看到你的实验记录、情感深度和对材料的敏感。",
          en: "Use cyanotype to write a “letter of light” to someone you care about. Borrow three to five small objects that matter to them, record a short interview, then expose the objects on light-sensitive paper in the sun. Test how exposure time and weather change the image, logging every trial. Display the prints beside a written letter. Tutors see careful experiment logs, emotional depth and real sensitivity to material."
        }
      }
    ],
    // 2 Earth
    [
      {
        title: { zh: "盛放一段记忆的器皿", en: "A Vessel for One Memory" },
        brief: {
          zh: "请五位家人或朋友各讲一段关于“家”的记忆，再为每段记忆手捏或泥条盘筑一只器皿，让形状、肌理和尺寸回应故事本身。研究不同文化里用来储存珍贵之物的容器，记录泥料与釉色测试。成品是一组器皿加配套文字标签。它告诉导师：你能把无形的情感转化为可触摸的形式。",
          en: "Ask five relatives or friends for one memory each about “home”, then hand-build a vessel for every memory, letting shape, texture and size answer the story. Research containers different cultures use to keep precious things, and log your clay and glaze tests. The finished piece is a set of vessels with short written labels. It tells tutors you can turn something invisible, a feeling, into a form people can hold."
        }
      },
      {
        title: { zh: "家里厨房的地图", en: "Maps of a Family Kitchen" },
        brief: {
          zh: "把家里的厨房画成两张地图：一张按比例测绘的平面图，一张标记气味、声音、争吵与团聚的情感地图。观察一周内谁在什么时间使用哪个角落，收集菜谱、旧物和家人的口述。最终做成一组大幅图纸加一本菜谱小册。导师会看到你的测绘能力、叙事能力，以及把日常空间读出意义的眼光。",
          en: "Draw your family kitchen as two maps: one a measured plan to scale, the other an emotional map of smells, sounds, arguments and reunions. Observe for a week who uses which corner and when, and collect recipes, old objects and spoken memories. Finish with a set of large drawings and a small recipe booklet. Tutors see technical drawing, storytelling and an eye that finds meaning in everyday space."
        }
      },
      {
        title: { zh: "故乡的土", en: "Soil from Places That Matter" },
        brief: {
          zh: "从对你重要的几个地方合法采集少量泥土，比如自家花盆、老家的院子或亲戚的菜地。研究泥土颜料的传统制法，把土研磨、过筛、调和成颜料，在纸或布上画出这些地方。每一块色样都标注地点与故事。作品讨论归属、迁移与成长。导师会看到你的材料研究、个人立场和完整的过程记录。",
          en: "Collect small amounts of soil, legally and with permission, from places that matter to you: a balcony pot, a grandparent’s yard, a relative’s vegetable plot. Research traditional earth-pigment methods, then grind, sieve and bind the soil into paint and use it to paint those places. Label each swatch with its place and story. The work explores belonging, migration and growing up, and shows material research and a clear personal position."
        }
      }
    ],
    // 3 Metal
    [
      {
        title: { zh: "小而珍贵", en: "Small Precious Things" },
        brief: {
          zh: "收集一件被遗忘的小纪念物，比如一颗纽扣、一枚旧硬币或一段手链，再用黄铜片、铜丝和冷连接工艺，把它重新做成一件可以佩戴的首饰。研究不同文化里护身符与纪念首饰的意义，画出比例准确的设计图。成品配一张近距离摄影和一段说明。导师会看到你在精细尺度上表达情感的能力与工艺耐心。",
          en: "Find a small forgotten keepsake, such as a button, an old coin or a broken bracelet, and remake it into wearable jewellery using brass sheet, copper wire and cold-connection techniques. Research the meaning of amulets and memorial jewellery across cultures, and draw accurate, scaled designs. Present the piece with close-up photographs and a short text. Tutors see how you carry feeling at a very fine scale, and your patience with craft."
        }
      },
      {
        title: { zh: "钥匙的声音", en: "The Sound of Keys" },
        brief: {
          zh: "钥匙打开的是门，也打开一段生活。请十位朋友或邻居讲讲一把对他们有意义的钥匙，并录下钥匙碰撞、转动的声音。把声音剪成一段三分钟的声音作品，同时用石膏翻模或铅笔精描记录每把钥匙的形状。展出时让观众戴上耳机边听边看。导师会看到你跨越声音与图像的能力，以及对细节的敏感。",
          en: "A key opens a door, and also a life. Ask ten friends or neighbours about a key that matters to them, and record the sound of it jingling and turning. Edit the sounds into a three-minute audio piece, and record each key’s shape through plaster casts or precise pencil drawing. Visitors listen on headphones while looking. Tutors see you working across sound and image, with a fine sense of detail."
        }
      },
      {
        title: { zh: "排进铅字里的善意", en: "Kind Words, Set in Type" },
        brief: {
          zh: "用一个月时间记录你听到、读到的善意话语，再挑出十句，用活字或严格网格的数字排版做成一组小幅海报。研究字体、字号与留白如何改变一句话的语气，保留每一次排版测试。成品可以是一套明信片，送给陌生人。它向导师证明：你理解形式的精确，也懂得精确如何承载温度。",
          en: "Spend a month noting kind words you hear or read, then choose ten and set them as small posters, using letterpress or strict digital grids. Research how typeface, size and white space change the tone of a sentence, and keep every layout test. The finished set could be postcards you give to strangers. It proves to tutors that you understand precise form, and how precision can carry warmth."
        }
      }
    ],
    // 4 Water
    [
      {
        title: { zh: "河流记得", en: "The River Remembers" },
        brief: {
          zh: "选一条你所在城市的河或运河，沿岸走完一段，拍照、写生并标出地图。到图书馆和地方档案里找老照片，再采访三位在河边生活过的人。把今天的影像与旧档案并置，做成一部五分钟的影像散文或一本经折装书。导师会看到你如何结合田野调查与档案研究，打捞被遗忘的地方记忆。",
          en: "Choose a river or canal in your city and walk a stretch of it, photographing, drawing and mapping as you go. Look for old photographs in libraries and local archives, then interview three people who have lived by the water. Set today’s images beside the archive in a five-minute film essay or a concertina book. Tutors see fieldwork and archival research combined to recover a place’s forgotten memory."
        }
      },
      {
        title: { zh: "没寄出的信", en: "Letters Never Sent" },
        brief: {
          zh: "匿名征集身边人写过却没寄出的信，只收集对方愿意公开的片段，并去掉所有可识别的信息。研究书信体文学与私人档案的伦理，设计一套分类方式。把这些片段排成一本艺术家书，用半透明纸让文字层层叠合。导师会看到你处理敏感材料的谨慎，以及用书籍形式表达情感的能力。",
          en: "Anonymously collect letters people wrote but never sent, keeping only the passages they are happy to share and removing anything identifying. Research letter-based writing and the ethics of private archives, and design a way to sort what you receive. Arrange the fragments in an artist’s book, using translucent paper so the words layer over one another. Tutors see care with sensitive material and how a book can hold feeling."
        }
      },
      {
        title: { zh: "重读家庭相册", en: "The Family Album, Re-read" },
        brief: {
          zh: "翻出家里的老相册，挑出二十张照片，请家人讲述照片背后的故事，也留意那些“没被拍下来”的时刻。重新拍摄当年的地点或物件，用文字补写缺失的画面。最后做成一本对照式的摄影书，旧照与新照左右并置。它向导师展示你的档案意识、叙事结构，以及对记忆与影像关系的思考。",
          en: "Open your family’s old albums, choose twenty photographs and ask relatives to tell the stories behind them, noticing the moments nobody photographed. Rephotograph the same places or objects today, and write short texts for the missing pictures. Finish with a photobook that sets old and new images side by side. It shows tutors archival awareness, narrative structure and real thinking about memory and the photograph."
        }
      }
    ]
  ];

  /* NT · systems, hypotheses, speculation */
  L.projects.NT = [
    // 0 Wood
    [
      {
        title: { zh: "生长的规则", en: "The Rules of Growth" },
        brief: {
          zh: "观察三种植物的分枝方式，测量角度、间距与节点，把它们归纳成一套简单的生长规则。先用手绘按规则推演，再用编程工具生成上百种变体，比较哪些像真的植物、哪些完全陌生。成品是一组版画或数码打印，加一页规则说明。导师会看到你从观察到系统、再到视觉输出的严谨逻辑。",
          en: "Observe how three plants branch, measuring angles, spacing and nodes, and reduce them to a simple set of growth rules. Follow the rules by hand first, then use a creative-coding tool to generate a hundred variations, comparing which look real and which feel alien. Finish with a series of prints and one page explaining the rules. Tutors see rigorous logic, from observation to system to visual output."
        }
      },
      {
        title: { zh: "一平方公里的森林", en: "One Square Kilometre of Forest" },
        brief: {
          zh: "在你家附近划定一平方公里，记录每一棵树的种类、位置和树冠大小，再在夏日午后测量树荫下与阳光下的地面温度差。把数据做成一张信息图海报或可交互的网页地图，提出一个关于城市降温的问题或建议。导师会看到你收集一手数据、把数据转为清晰视觉，以及用设计回应真实问题的能力。",
          en: "Mark out one square kilometre near home and record every tree’s species, position and canopy size, then measure ground temperature in shade and in sun on a summer afternoon. Turn the data into an infographic poster or an interactive web map, and pose one question or proposal about cooling the city. Tutors see first-hand data collection, clear visualisation and design used to answer a real problem."
        }
      },
      {
        title: { zh: "菌丝体包装原型", en: "Mycelium Packaging Prototype" },
        brief: {
          zh: "用现成的菌丝体种植套件，在模具里培育替代泡沫塑料的包装材料。研究生物材料设计的案例，设定变量，比如基质、湿度与生长天数，每组都拍照记录并测试强度。最后为一件真实产品设计一套包装原型和说明书。它向导师展示你的实验方法、失败记录与思辨设计思维：不只做一个东西，而是追问未来该怎么做。",
          en: "Use a ready-made mycelium growing kit to grow a packaging material in moulds as an alternative to foam. Research biomaterial design, set variables such as substrate, humidity and growing days, and photograph and strength-test each batch. Finish with packaging prototypes for a real product and a short guide. It shows tutors method, honest records of failure and speculative thinking: not just making a thing, but asking how things should be made."
        }
      }
    ],
    // 1 Fire
    [
      {
        title: { zh: "光即信息", en: "Light as Information" },
        brief: {
          zh: "提出一个假设：同一个物体在不同色温的光下会被读出不同的情绪。搭一个简易灯箱，控制光源、角度和色温，拍摄同一组物件，并请二十位观众写下感受。把实验图像、问卷结果和你的结论排成一份研究报告和一组展示照片。导师会看到你设计实验、控制变量，并从结果中提炼视觉判断的能力。",
          en: "Start from a hypothesis: the same object reads as a different mood under light of different colour temperatures. Build a simple light box, control source, angle and temperature, photograph one set of objects, and ask twenty viewers to write down how each image feels. Lay out the images, survey results and your conclusion as a research report and a set of photographs. Tutors see you design experiments, control variables and draw visual judgement from evidence."
        }
      },
      {
        title: { zh: "注意力机器", en: "The Attention Machine" },
        brief: {
          zh: "研究手机应用如何用颜色、红点和动效抓住注意力，阅读有关设计伦理的文章。然后用网页或交互编程工具做一个原型，故意把这些机制放大或反转，让用户察觉自己被引导的过程。邀请同学试用，记录他们的反应并迭代两轮。导师会看到你的批判立场、原型能力，以及用户测试带来的改进。",
          en: "Research how apps capture attention with colour, notification dots and animation, and read about the ethics of design. Then build a prototype in a web or creative-coding tool that exaggerates or reverses those tricks, so users notice how they are being steered. Invite classmates to try it, record their reactions and iterate twice. Tutors see a critical position, real prototyping skill and improvements driven by user testing."
        }
      },
      {
        title: { zh: "二〇五〇年的节日", en: "A Festival for 2050" },
        brief: {
          zh: "设想二〇五〇年，一座城市因为气候变化而诞生了一个新节日。研究现有节庆的起源、仪式与视觉符号，推演这个节日的规则：人们庆祝什么、点亮什么、交换什么。为它设计海报、灯具原型和一份节日手册，并拍一段一分钟的“未来纪录片”。导师会看到你把研究转为可信的虚构世界的能力。",
          en: "Imagine that by 2050 a city has invented a new festival in response to climate change. Research the origins, rituals and visual symbols of existing festivals, then work out the new festival’s rules: what people celebrate, light and exchange. Design its posters, a lantern prototype and a festival handbook, and shoot a one-minute “future documentary”. Tutors see you turn research into a believable fictional world."
        }
      }
    ],
    // 2 Earth
    [
      {
        title: { zh: "地面真相", en: "Ground Truth" },
        brief: {
          zh: "拿一张官方地图，与你亲自走过的同一片街区对比：哪里的台阶、围栏、捷径和聚集点地图上没有？连续三天在不同时间步行记录，拍照并手绘标注。最后做一张“反地图”和一个局部的纸板模型，提出一处空间改进建议。导师会看到你的空间观察、测绘与批判思维，以及把个人经验变成设计依据的能力。",
          en: "Take an official map and compare it with the same neighbourhood on foot: which steps, fences, shortcuts and gathering spots does the map leave out? Walk at different times over three days, photographing and annotating by hand. Finish with a “counter-map” and a card model of one corner, proposing a single spatial improvement. Tutors see spatial observation, mapping and critical thinking, and personal experience turned into design evidence."
        }
      },
      {
        title: { zh: "模块化的家", en: "The Modular Room" },
        brief: {
          zh: "为一间狭小的城市公寓设计一套可以重组的家具或隔断系统。先测量并分析三个真实小户型，记录一家人一天的活动，找出空间冲突。用卡纸和木条做比例模型，测试至少五种组合方式，并拍照比较。成品是模型照片、平面图和一张系统说明图。导师会看到你的分析能力、结构思维和以人为本的设计意识。",
          en: "Design a furniture or partition system that reconfigures a small city flat. Measure and analyse three real small homes, map a household’s activity over a day, and find where the space clashes. Build scale models from card and timber strips, test at least five configurations and photograph them side by side. Present model photographs, plans and one system diagram. Tutors see analysis, structural thinking and design that starts from people."
        }
      },
      {
        title: { zh: "陶土测试矩阵", en: "The Clay Test Matrix" },
        brief: {
          zh: "像科学家一样研究一种泥料：设定两个变量，比如掺入的砂粒比例和烧成温度，做出一个五乘五的试片矩阵，记录收缩、颜色与肌理。从结果里挑出最意外的一块，把它发展成一件完整的器物或小雕塑。作品集里同时呈现矩阵、数据表和最终作品。导师会看到系统方法如何真正推动了你的创作决定。",
          en: "Study one clay body like a scientist: choose two variables, such as the proportion of added grog and the firing temperature, make a five-by-five grid of test tiles, and record shrinkage, colour and texture. Pick the most surprising tile and develop it into a finished vessel or small sculpture. Show the grid, the data table and the final piece together, so tutors see method genuinely driving your creative decisions."
        }
      }
    ],
    // 3 Metal
    [
      {
        title: { zh: "规则生成的字体", en: "A Typeface Built from Rules" },
        brief: {
          zh: "只用一个网格和三种基本形，比如方、圆和斜线，设计一套完整的拉丁字母或二十个常用汉字部件。先写下规则，再严格执行，记录哪些字形被规则“难住”以及你如何修订。把字体用在三张不同用途的海报上测试可读性。导师会看到你在约束中工作的能力、系统的一致性和对形式细节的判断。",
          en: "Using only one grid and three basic shapes, such as a square, a circle and a diagonal, design a complete Latin alphabet or twenty common Chinese character components. Write the rules first, follow them strictly, and record which letters break the system and how you revised it. Test the typeface on three posters with different purposes. Tutors see you work within constraints, keep a system consistent and judge fine formal detail."
        }
      },
      {
        title: { zh: "看见声音", en: "Seeing Sound" },
        brief: {
          zh: "在三个地点各录五分钟环境声，比如地铁站、菜市场和公园，用免费音频软件查看波形与频谱。为每段录音设计一套图形记谱法，让别人能“读”出声音的节奏与密度，并请一位懂音乐的朋友按你的乐谱即兴演奏。作品包括录音、乐谱和演奏视频。导师会看到你在声音与视觉之间建立精确的翻译系统。",
          en: "Record five minutes of ambient sound in three places, such as a metro station, a food market and a park, and inspect the waveform and spectrum in free audio software. Design a graphic notation for each recording so others can read its rhythm and density, then ask a musical friend to improvise from your score. Present the recordings, scores and performance video. Tutors see a precise translation system between sound and image."
        }
      },
      {
        title: { zh: "物件解剖", en: "Object Autopsy" },
        brief: {
          zh: "找一件坏掉的小电器，确认已断电并取出电池，在成人陪同下逐层拆解。为每个零件拍照、编号，画出爆炸图，分析它为什么难以修理。然后提出一个“为维修而设计”的改良方案，用纸板或三维打印做出关键部件的原型。导师会看到你的技术制图、拆解分析能力，以及对可持续设计的理解。",
          en: "Find a broken small appliance, make sure it is unplugged with batteries removed, and take it apart layer by layer with an adult present. Photograph and number every part, draw an exploded view and analyse why it is hard to repair. Then propose a design-for-repair improvement, prototyping the key parts in card or 3D print. Tutors see technical drawing, analytical disassembly and an understanding of sustainable design."
        }
      }
    ],
    // 4 Water
    [
      {
        title: { zh: "隐形的水", en: "An Atlas of Hidden Water" },
        brief: {
          zh: "一件T恤、一杯咖啡、一部手机，各自用掉了多少看不见的水？查阅公开数据与研究报告，选十件日常用品，计算并核对它们的“水足迹”，注明每一个数据来源。把结果设计成一本信息图册，用统一的视觉语言让抽象数字变得可感。导师会看到你的研究严谨度、引用习惯，以及把复杂信息讲清楚的设计能力。",
          en: "How much invisible water goes into a T-shirt, a cup of coffee or a phone? Use public data and research reports to calculate and cross-check the “water footprint” of ten everyday objects, citing every source. Design the results as an atlas of infographics, with one consistent visual language that makes abstract numbers felt. Tutors see rigorous research, good referencing habits and design that explains complex information clearly."
        }
      },
      {
        title: { zh: "流动研究", en: "Flow Studies" },
        brief: {
          zh: "在透明水箱里做系统实验：改变墨水浓度、滴落高度和水温，用手机慢动作拍下每一次扩散。为每次实验编号并记录参数，再从上百段素材中提炼出一套视觉语言，比如形状、节奏与颜色规律。最终剪成一部一分钟的动态影像，或设计一组动态海报。导师会看到你如何把实验数据转化为有逻辑的美学选择。",
          en: "Run controlled experiments in a clear water tank: vary ink concentration, drop height and water temperature, filming each spread in slow motion on a phone. Number every trial and log its settings, then distil a visual language from the footage: shapes, rhythms and colour patterns. Edit a one-minute moving-image piece or a set of animated posters. Tutors see experimental data turned into logical aesthetic choices."
        }
      },
      {
        title: { zh: "一百年后的档案馆", en: "An Archive for 2125" },
        brief: {
          zh: "我们的聊天记录、照片和语音，一百年后会怎样被保存和阅读？研究数字保存的难题，比如格式过时、存储介质老化，再设计一座未来档案馆的分类系统、借阅规则和几件“档案物”。用模型、标签和一份馆藏目录呈现。导师会看到你提出问题、建构系统，并用思辨设计让观众思考记忆与技术的关系。",
          en: "How will our messages, photos and voice notes be kept and read in a hundred years? Research the problems of digital preservation, such as obsolete formats and decaying storage, then design a future archive’s classification system, lending rules and a few “archive objects”. Present it through models, labels and a catalogue. Tutors see you pose a question, build a system and use speculative design to make people think about memory and technology."
        }
      }
    ]
  ];

  /* SJ · care, craft, order, record */
  L.projects.SJ = [
    // 0 Wood
    [
      {
        title: { zh: "一年的叶子", en: "A Year in Leaves" },
        brief: {
          zh: "选一株阳台或校园里的植物，每周同一天为它画一张科学插画，并记录高度、叶片数量和天气。参考植物标本馆和博物学插画的规范，学习标注、比例尺与拉丁学名的写法。坚持至少十二周，最后装订成一本标本式图鉴。它向导师展示你的观察纪律、准确的描绘能力，以及长期投入一件事的耐心。",
          en: "Choose one plant on a balcony or at school and make a scientific drawing of it on the same day every week, recording its height, leaf count and the weather. Follow the conventions of herbaria and natural-history illustration: labels, scale bars and Latin names. Keep going for at least twelve weeks, then bind the drawings as a field guide. It shows tutors observational discipline, accurate drawing and the patience to commit long term."
        }
      },
      {
        title: { zh: "织进街区", en: "Weaving the Neighbourhood" },
        brief: {
          zh: "请邻居和同学各捐一小段旧布、毛线或丝带，并写下它来自哪件衣物或哪段生活。研究传统织造结构，先做小样测试，再在简易织架上把所有材料织成一块长幅织物，每一段都对应一张编号卡片。成品与卡片一同展出。导师会看到你扎实的工艺过程、对社区的尊重，以及把时间“织进”作品的方法。",
          en: "Ask neighbours and classmates to donate a scrap of old fabric, yarn or ribbon, noting which garment or part of life it came from. Research traditional weave structures, make small samples first, then weave every donation into one long textile on a simple frame loom, each section matched to a numbered card. Show the cloth with its cards. Tutors see a solid craft process, respect for community and a way of weaving time into work."
        }
      },
      {
        title: { zh: "修一把旧椅子", en: "Mending an Old Chair" },
        brief: {
          zh: "找一把家里或二手市场上的旧木椅，先画出现状测绘图，记录每一处损坏和榫卯结构。向一位木工师傅请教，或查阅家具修复资料，在成人指导下完成清洁、加固与修补，保留原有的使用痕迹。把全过程做成一本修复手册，包含步骤照片和工具清单。导师会看到你的动手能力、技术记录和对旧物的尊重。",
          en: "Find an old wooden chair at home or in a second-hand market, make a measured drawing of its current state and record every crack and joint. Ask a woodworker for advice or read furniture-repair guides, then clean, strengthen and mend it under adult supervision, keeping the marks of use. Document the whole process as a repair manual with step photographs and a tool list. Tutors see practical skill, technical recording and respect for old things."
        }
      }
    ],
    // 1 Fire
    [
      {
        title: { zh: "搭一座小舞台", en: "Building a Small Stage" },
        brief: {
          zh: "为一部公版剧本中的一场戏设计舞台布景。先读剧本，列出场景需求、人物出入口和道具清单，再画平面图、立面图，做一个一比二十五的纸板模型。用手电筒和彩色滤纸测试三种灯光方案，并拍照比较。成品是模型照片、技术图纸和一份布景说明。导师会看到你把文本转为空间的能力，以及有条理的制作流程。",
          en: "Design the set for one scene from an out-of-copyright play. Read the script, list the scene’s needs, entrances and props, then draw a plan and elevations and build a card model at 1:25. Test three lighting schemes with torches and coloured gels, photographing each. Present the model photographs, technical drawings and a short set description. Tutors see you translate text into space, through an organised production process."
        }
      },
      {
        title: { zh: "节日导视系统", en: "Wayfinding for a Festival" },
        brief: {
          zh: "为学校开放日或社区市集设计一套导视与视觉识别系统。先实地走一遍场地，记录人们在哪里迷路、在哪里排队，再设计标识、指示牌、地图和配色规范。打印实物尺寸的样张，在现场测试并根据反馈修改。作品集里展示调研照片、设计手册和使用现场。导师会看到你可靠的执行力、对用户的体贴和清晰的系统思维。",
          en: "Design a wayfinding and identity system for a school open day or community market. Walk the site first, noting where people get lost and where they queue, then design the signs, directions, map and colour rules. Print full-size samples, test them on site and revise from feedback. Show the research photographs, a design manual and the system in use. Tutors see dependable delivery, care for users and clear systems thinking."
        }
      },
      {
        title: { zh: "点亮一个橱窗", en: "Lighting a Shop Window" },
        brief: {
          zh: "征得一家本地小店同意后，为它设计一期季节橱窗。先观察路人的视线高度和停留时间，研究陈列设计的构图与灯光原则，再画效果图、做缩尺模型，列出预算和材料清单。如果条件允许，与店主一起完成布置并拍摄白天与夜晚的效果。导师会看到你在真实客户、预算和时间限制下完成项目的能力。",
          en: "With a local shop’s permission, design a seasonal window display for it. Observe passers-by’s eye level and how long they pause, study the composition and lighting principles of display design, then draw visuals, build a scale model and write a budget and materials list. If possible, install it with the owner and photograph it by day and night. Tutors see you deliver for a real client, within budget and time limits."
        }
      }
    ],
    // 2 Earth
    [
      {
        title: { zh: "一家人的餐具", en: "Tableware for One Household" },
        brief: {
          zh: "观察家人一周的吃饭习惯：谁用大碗、谁吃得慢、餐桌有多大。根据这些记录，为家里设计并手工制作一套陶瓷餐具，每件都标注尺寸与理由。做釉色测试板，记录配方和烧成结果。最后拍摄餐具在真实餐桌上被使用的照片。导师会看到你从使用者出发的设计意识、工艺的稳定性和完整的记录习惯。",
          en: "Watch how your household eats for a week: who uses the big bowl, who eats slowly, how large the table is. From these notes, design and hand-make a ceramic tableware set, labelling each piece with its dimensions and reasons. Make glaze test boards and record recipes and firing results. Photograph the set in use at a real meal. Tutors see user-centred design, consistent craft and thorough recording habits."
        }
      },
      {
        title: { zh: "记录一门本地手艺", en: "Recording a Local Craft" },
        brief: {
          zh: "找一位仍在从事传统手艺的匠人，比如竹编、修鞋或做糕点模具，征得同意后跟随学习几次。用照片、速写和访谈记录工具、步骤与术语，并亲手完成一件入门作品。把这些整理成一本图文并茂的手艺手册。它向导师展示你尊重传统的态度、细致的田野记录，以及把隐性知识转化为可传承形式的能力。",
          en: "Find a maker still practising a traditional craft, such as bamboo weaving, shoe repair or carving pastry moulds, and with their permission learn alongside them for a few sessions. Record tools, steps and terms through photographs, sketches and interviews, and make a beginner’s piece yourself. Compile it into an illustrated craft manual. It shows tutors respect for tradition, careful fieldwork and the ability to pass on tacit knowledge."
        }
      },
      {
        title: { zh: "门槛与砖", en: "Thresholds of Home" },
        brief: {
          zh: "以你家的入口为对象：门、门槛、楼梯间或院门。用卷尺精确测量，画出平面、剖面和细部大样，记录材料、磨损与修补的痕迹，也了解这栋楼的建造年代。再拍一组同一入口在不同时段的照片。成品是一套规范的建筑测绘图和一页说明。导师会看到你的空间测绘基本功，以及从日常场所读出历史的能力。",
          en: "Take the entrance to your home as your subject: the door, threshold, stairwell or gate. Measure it precisely, draw the plan, section and details, record materials, wear and repairs, and find out when the building was built. Add a series of photographs of the same entrance at different times of day. Present a set of measured architectural drawings with one page of notes, showing spatial drawing skills and history read from an everyday place."
        }
      }
    ],
    // 3 Metal
    [
      {
        title: { zh: "城市字体样本", en: "A City Type Specimen" },
        brief: {
          zh: "在你的城市里拍摄一百处店招、门牌和旧标识上的字，按年代、工艺和字形分类。挑出十种最有特点的，用钢笔和数码工具准确重绘，标注笔画结构与比例。最后排版成一本字体样本册，附上拍摄地图。导师会看到你系统收集资料的能力、严谨的描绘功夫，以及对城市视觉文化的关注。",
          en: "Photograph lettering on a hundred shop signs, door numbers and old notices in your city, and sort them by era, technique and letterform. Choose the ten most distinctive and redraw them accurately with pen and digital tools, annotating stroke structure and proportion. Lay everything out as a type specimen book with a map of where you found each one. Tutors see systematic collecting, rigorous drawing and attention to the visual culture of a city."
        }
      },
      {
        title: { zh: "一本精确的书", en: "A Book on a Strict Grid" },
        brief: {
          zh: "选一篇进入公有领域的短篇文字，为它设计一本书。先研究经典书籍设计的版心比例与网格系统，制定字号、行距和页边距规则，再做三版对比样张。最后亲手完成线装或锁线装订，记录每一步。成品是一本书和一份设计规范。导师会看到你对秩序与细节的执着，以及从规则到实物的完成能力。",
          en: "Choose a short text in the public domain and design a book for it. Study the page proportions and grid systems of classic book design, set rules for type size, leading and margins, and print three comparison drafts. Finish by hand with stab or sewn binding, recording every step. The result is one book and one design specification. Tutors see a devotion to order and detail, and the ability to go from rules to object."
        }
      },
      {
        title: { zh: "家用工具图鉴", en: "A Catalogue of Household Tools" },
        brief: {
          zh: "收集家里最常用的二十件工具，比如剪刀、扳手和量勺，为每件绘制三视图并标注尺寸、材料与用途。设计一套统一的编号与分类方式，像博物馆藏品那样建立档案卡。最后排成一本图鉴，或做成一组展签加实物陈列。导师会看到你的技术制图能力、建立秩序的方法，以及从平凡物件里发现设计之美的眼光。",
          en: "Gather the twenty tools your household uses most, such as scissors, spanners and measuring spoons, and draw each in three orthographic views, noting dimensions, materials and use. Design one numbering and classification system and make a record card for each, as a museum would. Finish with a catalogue, or labels with the objects on display. Tutors see technical drawing, a method for creating order and an eye for design in ordinary things."
        }
      }
    ],
    // 4 Water
    [
      {
        title: { zh: "每日水边日记", en: "A Daily Waterside Diary" },
        brief: {
          zh: "选一处安全、可以每天到达的水边，比如河堤、湖畔或小区水池，连续六十天在同一时间、同一位置拍一张照片，并写一句当天的记录。研究长期观察类摄影的方法，统一构图和参数。最后排成一张网格大图和一本日记册。导师会看到你的纪律性、对细微变化的敏感，以及用重复揭示时间流动的能力。",
          en: "Choose a safe waterside you can reach every day, such as a riverbank, a lake shore or an estate pond, and for sixty days take one photograph at the same time and place, writing one line about the day. Study long-term observational photography and keep framing and settings fixed. Present the images as a large grid and a diary book. Tutors see discipline, sensitivity to small change and repetition used to reveal time passing."
        }
      },
      {
        title: { zh: "一件家传物的档案", en: "Condition Report of a Family Object" },
        brief: {
          zh: "挑一件家里传了几代的物品，比如一只木箱、一本旧书或一件衣服，按文物保护的规范为它写一份状况报告。只做不损伤物品的观察：拍照、测量、标出污渍与破损，并请家人讲它的来历。研究基本的保存方法，为它设计一个合适的收纳盒。导师会看到你的谨慎、专业的记录方式，以及对物与记忆的尊重。",
          en: "Choose an object your family has kept for generations, such as a wooden box, an old book or a garment, and write a condition report on it following conservation practice. Use only non-invasive observation: photograph, measure and map stains and damage, and ask relatives where it came from. Research basic preventive care and design a suitable storage box. Tutors see caution, a professional recording method and respect for objects and memory."
        }
      },
      {
        title: { zh: "通勤档案", en: "The Commute Archive" },
        brief: {
          zh: "用一个月收集通勤路上的一切小物：车票、小票、传单、落叶和随手写的便条。为它们设计一套编目系统，记录日期、地点和获得方式，装进统一规格的档案袋，并编写索引。最后从中整理出一条“流动的日常”的叙事线，做成一个档案盒或一本册子。导师会看到你建立秩序、长期坚持并从日常里找出意义的能力。",
          en: "For a month, collect the small things from your journeys: tickets, receipts, flyers, fallen leaves and scribbled notes. Design a cataloguing system that records date, place and how each item was found, store them in matching archive sleeves and write an index. Then draw out a story of daily life in motion, presented as an archive box or a booklet. Tutors see you build order, keep going and find meaning in the everyday."
        }
      }
    ]
  ];

  /* SP · hands, senses, the live moment */
  L.projects.SP = [
    // 0 Wood
    [
      {
        title: { zh: "厨房里的颜色", en: "Colour from the Kitchen" },
        brief: {
          zh: "用厨房里的植物废料做天然染料：洋葱皮、牛油果核、红茶和紫甘蓝。先做一组布样，测试不同媒染剂和浸泡时间，每块都贴标签、记配方。再用最喜欢的几种颜色染一件旧衣服或一块围巾，并拍摄穿着效果。注意只用可食用材料，戴手套操作。导师会看到你大胆的动手实验、对色彩的敏感和可持续意识。",
          en: "Make natural dyes from kitchen plant waste: onion skins, avocado stones, black tea and red cabbage. Dye a set of fabric swatches first, testing different mordants and soaking times, and label each with its recipe. Then dye an old shirt or scarf in your favourite colours and photograph it worn. Use only food-safe materials and wear gloves. Tutors see bold hands-on testing, a sensitive eye for colour and sustainable thinking."
        }
      },
      {
        title: { zh: "拾来的木头", en: "A Stool from Found Timber" },
        brief: {
          zh: "收集废弃的木托盘、旧家具板材或修剪下来的树枝，在成人指导下用手工具做一张能坐的小凳。先快速画十张草图，做三个小比例模型，再动手。记录每一次失误和你如何临场解决，最后请五个人试坐并反馈。导师会看到你直接与材料对话的能力、果断的判断，以及从试错中学习的方式。",
          en: "Collect discarded pallets, old furniture boards or pruned branches, and with adult guidance use hand tools to build a small stool that can be sat on. Sketch ten quick ideas, make three small models, then start cutting. Record every mistake and how you solved it on the spot, and ask five people to sit on it and comment. Tutors see you talk directly with material, decide quickly and learn by trial and error."
        }
      },
      {
        title: { zh: "街缝里的植物", en: "Street Weeds, Drawn Live" },
        brief: {
          zh: "在城市里做十次步行写生，专门画长在墙缝、台阶和排水口里的野草。每次限时二十分钟，用钢笔、炭笔或水彩现场完成，同时拍下位置并记下它们的名字。回家后挑出最有生命力的画面，做成一本可以随身携带的街头植物小志。导师会看到你快速、自信的现场写生能力，以及在不起眼处发现美的眼光。",
          en: "Go on ten drawing walks through the city, drawing only the weeds that grow from wall cracks, steps and drains. Give yourself twenty minutes each time, working on the spot in pen, charcoal or watercolour, photographing the location and noting the plant’s name. Back home, choose the liveliest drawings and make a pocket zine of street botany. Tutors see quick, confident drawing from life and an eye for beauty in overlooked places."
        }
      }
    ],
    // 1 Fire
    [
      {
        title: { zh: "十分钟行为", en: "Ten-Minute Actions" },
        brief: {
          zh: "设计十个简短的行为动作，每个不超过十分钟，在公园、操场等安全的公共空间完成，比如用粉笔沿着影子描线、慢速穿过人群。研究行为艺术如何被记录与再现，请朋友帮忙拍照和录像。为每个动作写一张“指令卡”。导师会看到你在现场的胆量与专注，以及把即兴变成清晰作品的能力。",
          en: "Design ten short actions, each under ten minutes, to perform in safe public spaces such as a park or playground: tracing shadows in chalk, or walking very slowly through a crowd. Research how performance art is documented and restaged, and ask friends to photograph and film. Write one instruction card for each action. Tutors see courage and focus in the live moment, and improvisation shaped into clear work."
        }
      },
      {
        title: { zh: "用光作画", en: "Painting with Light" },
        brief: {
          zh: "在夜里用相机长曝光，手持手电筒、荧光棒或手机屏幕在空中“画画”。先做一组控制实验，比较快门时间、移动速度和光源颜色，再围绕一个主题创作十张作品，比如“我的一天”或“一段舞”。请朋友参与，把身体动作也变成画面的一部分。导师会看到你敢于试验、反应迅速，并能从大量尝试中筛选出最好的结果。",
          en: "At night, use long exposures while you draw in the air with torches, glow sticks or a phone screen. Start with controlled tests comparing shutter time, speed of movement and light colour, then make ten images around one theme, such as “my day” or “a dance”. Invite friends to join so movement becomes part of the picture. Tutors see daring experiment, fast reactions and the judgement to select the best from many attempts."
        }
      },
      {
        title: { zh: "四十八小时舞台服装", en: "A Stage Costume in 48 Hours" },
        brief: {
          zh: "给自己四十八小时，为一位跳舞或表演的朋友做一套舞台服装。先看对方排练，记录动作幅度和灯光颜色，快速画草图，再用旧衣、坯布和别针直接在身上立裁。完成后请对方穿着表演并拍摄视频。作品集里放草图、过程照片和演出截图。导师会看到你在压力下的决断力、对身体与材料的直觉。",
          en: "Give yourself forty-eight hours to make a stage costume for a friend who dances or performs. Watch a rehearsal, note the range of movement and the colour of the lights, sketch fast, then drape directly on the body with old clothes, calico and pins. Film your friend performing in it. Include the sketches, process photographs and performance stills. Tutors see decisiveness under pressure and an instinct for body and material."
        }
      }
    ],
    // 2 Earth
    [
      {
        title: { zh: "泥塑速写", en: "Clay Sketches from Life" },
        brief: {
          zh: "像画速写一样捏泥：请朋友摆出三十个日常姿势，每个只给你五分钟，用一小块泥迅速捏出动态。不追求完美，只抓重心和力量。然后从中挑一件，放大成一件完整的雕塑，并记录放大时你改变了什么。作品集里把三十件小稿排成一张大照片。导师会看到你的观察速度、对体积的直觉和果断的手感。",
          en: "Sketch in clay: ask a friend to hold thirty everyday poses, giving yourself five minutes each to catch the movement in a small lump of clay. Don’t aim for perfection, only weight and energy. Then choose one and enlarge it into a finished sculpture, noting what you changed as it grew. Photograph all thirty sketches together as one large image. Tutors see speed of observation, an instinct for volume and a decisive hand."
        }
      },
      {
        title: { zh: "身体与场地", en: "Body and Site" },
        brief: {
          zh: "选一处你熟悉的户外场地，比如公园的坡地或旧操场，连续几天去感受它的地面、高差和声音。用身体做一组回应场地的动作，再用树枝、石头等可以原样放回的自然材料做一件临时作品，拍照后恢复原状。研究大地艺术的思路。导师会看到你对场地的敏感、身体化的创作方式和负责任的态度。",
          en: "Choose an outdoor place you know well, such as a sloping park or an old playground, and spend several days feeling its ground, levels and sounds. Respond with a sequence of body movements, then make a temporary work from natural materials such as sticks and stones that can be put back, photograph it and restore the site. Research land art. Tutors see sensitivity to place, an embodied way of making and a responsible attitude."
        }
      },
      {
        title: { zh: "纸板小屋", en: "A Cardboard Room" },
        brief: {
          zh: "收集回收纸箱，在一个周末里搭出一座一比一、能坐进去的小屋或角落。先用小纸片做几个快速模型，再直接开工，边搭边改，记录结构哪里塌了、你怎么补救。完成后邀请几位朋友进去坐坐，观察他们怎么使用这个空间。导师会看到你敢于做大尺度、动手解决结构问题的能力，以及以人为中心的空间感。",
          en: "Collect recycled cardboard boxes and, over one weekend, build a full-size hut or nook that people can sit inside. Make a few quick paper models, then start building, adjusting as you go and recording where the structure collapsed and how you fixed it. Invite friends to sit inside and watch how they use the space. Tutors see the nerve to work at full scale, hands-on structural problem-solving and a people-centred sense of space."
        }
      }
    ],
    // 3 Metal
    [
      {
        title: { zh: "锋利的廓形", en: "Sharp Silhouettes" },
        brief: {
          zh: "从折纸、建筑立面或工具的轮廓中找灵感，快速做出六种有棱角的服装廓形。先用纸在人台或朋友身上直接折叠、别合，再挑两款用坯布做成样衣。用黑白摄影拍摄正面与侧面剪影，比较哪种线条最有力量。导师会看到你下手果断的造型能力、对线条与比例的敏感，以及从小样到成衣的推进速度。",
          en: "Take ideas from origami, building facades or the outlines of tools, and quickly develop six angular garment silhouettes. Fold and pin paper directly on a dress form or a friend, then make two of them as calico toiles. Photograph front and side silhouettes in black and white and compare which lines feel strongest. Tutors see a decisive hand for form, sensitivity to line and proportion, and fast progress from sample to garment."
        }
      },
      {
        title: { zh: "废铁乐器", en: "A Scrap-Metal Instrument Kit" },
        brief: {
          zh: "收集安全、没有锋利边缘的废旧金属物件：锅盖、勺子、螺丝和饼干罐，把它们组装成三件能演奏的乐器。边做边听，记录每次调整对音色的影响。邀请朋友一起即兴演奏一段五分钟的曲子，录音并拍摄。成品是乐器实物、录音和一张手绘结构图。导师会看到你通过动手和聆听来思考，以及在现场合作的能力。",
          en: "Collect safe, smooth-edged scrap metal: saucepan lids, spoons, bolts and biscuit tins, and assemble them into three playable instruments. Listen as you build, noting how each adjustment changes the sound. Invite friends to improvise a five-minute piece with you, and record and film it. Present the instruments, the recording and a hand-drawn diagram of how they are built. Tutors see you think through hands and ears, and work live with others."
        }
      },
      {
        title: { zh: "一笔肖像", en: "Portraits in a Single Wire" },
        brief: {
          zh: "先用一笔不断线的方式画三十张朋友的速写肖像，每张不超过两分钟，训练你抓住特征的速度。再挑出最好的五张，用软铁丝或铝线弯折成立体线描肖像，悬挂起来，让灯光在墙上投出影子。拍下实物与影子两种状态。导师会看到你线条的自信、从平面到立体的转化，以及快速而精准的判断。",
          en: "Make thirty continuous-line portrait sketches of friends, each in under two minutes, to train how fast you catch a likeness. Choose the best five and bend them in soft iron or aluminium wire into three-dimensional line portraits, hung so a lamp throws their shadows on the wall. Photograph both the object and its shadow. Tutors see confident line, the move from flat to three dimensions and quick, precise judgement."
        }
      }
    ],
    // 4 Water
    [
      {
        title: { zh: "跟着雨走", en: "Following the Rain" },
        brief: {
          zh: "只在下雨天出门拍摄，持续一个月：水洼里的倒影、雨伞下的表情、被雨打湿的招牌。注意自身安全，不拍可识别的陌生人正脸。研究街头摄影里关于时机与构图的经验，每次回来都筛选并写下为什么选这一张。最后剪成一部三分钟的短片或排成一组二十张的照片系列。导师会看到你捕捉瞬间的直觉和清晰的取舍。",
          en: "For a month, go out to shoot only when it rains: reflections in puddles, expressions under umbrellas, signs streaked with water. Stay safe, and avoid filming strangers’ faces in a way that identifies them. Study what street photographers say about timing and framing, and after each outing choose your best frames and note why. Edit a three-minute film or a series of twenty photographs. Tutors see instinct for the moment and clear choices."
        }
      },
      {
        title: { zh: "潮线拾物", en: "Finds from the Tideline" },
        brief: {
          zh: "在成人陪同下，查好潮汐时间，到海滩或河滩沿着潮线拾取被冲上岸的物件：浮木、玻璃、绳头和塑料碎片。在现场直接把它们拼成临时装置并拍照，再挑选部分带回，做成一组小型拼贴雕塑。记录每次拾取的地点与天气。导师会看到你对材料的直觉、即兴组合的能力，以及作品里对环境的关注。",
          en: "With an adult and after checking tide times, walk the tideline of a beach or riverbank and pick up what the water has left: driftwood, sea glass, rope ends and plastic fragments. Arrange them into temporary installations on the spot and photograph them, then bring some home for a series of small assemblage sculptures. Log the place and weather each time. Tutors see an instinct for material, improvised composition and real concern for the environment."
        }
      },
      {
        title: { zh: "一镜到底", en: "Downstream in One Take" },
        brief: {
          zh: "拍一组一镜到底的短视频，追随水在城市里的路径：从屋檐滴落，流进排水沟，再汇入河道。每段一到两分钟，不剪辑，靠走位和镜头运动讲故事。事先踩点，确认路线安全，保持在人行道上。最后把几段并列成一件多屏影像作品，配上现场收音。导师会看到你在现场的应变、对节奏的掌控和清晰的视觉叙事。",
          en: "Shoot a series of one-take videos that follow water through the city: dripping from a roof, running into a gutter, joining a river. Each lasts one to two minutes with no cuts, telling the story through how you move and frame. Scout the route first, check it is safe and stay on the pavement. Show the takes side by side as a multi-screen piece with live sound. Tutors see quick responses on location, control of rhythm and clear visual storytelling."
        }
      }
    ]
  ];

  /* How each type’s portfolio should read */
  L.portfolioShape = {
    INTJ: {
      zh: "你的作品集适合围绕一个核心问题展开，用两到三个长线项目代替十件零散作品。每个项目按“问题、研究、测试、结论”的顺序排版，让导师一眼看出你的思考结构。草图本要大方呈现框架图、阅读笔记和被否定的方案，证明你是在做中想。个人陈述写清你追问的问题以及它为什么重要。常见误区是只放完成度极高的成品，过程被藏起来，看上去冷而封闭；记得留出几页粗糙、真实的实验。",
      en: "Your portfolio should unfold around one core question, using two or three long projects rather than ten scattered pieces. Lay out each project as question, research, testing and conclusion, so tutors can see the structure of your thinking at a glance. Let the sketchbook show frameworks, reading notes and rejected options, proving that you think by making. Your statement should name the question you pursue and why it matters. The usual pitfall is showing only highly finished outcomes and hiding the process, which reads as cold and closed; leave room for a few rough, honest experiments."
    },
    INTP: {
      zh: "你的作品集可以像一本实验笔记：每个项目从一个“如果……会怎样”开始，展示变量、测试和意外发现。选三个最能代表你思考方式的项目，并为每个都写出明确的结论或阶段性成果。草图本里的原型、代码截图和失败记录都是加分项。个人陈述要用平实的语言解释你的好奇心，而不是堆砌术语。常见误区是想法太多、成品太少，导师看到的全是开头；请确保每个项目都有一个看得见、拿得出手的结尾。",
      en: "Your portfolio can read like a lab notebook: each project starts from a “what if”, then shows variables, tests and surprising findings. Choose three projects that best represent how you think, and give each a clear conclusion or interim outcome. Prototypes, screenshots of code and records of failure in your sketchbook all count in your favour. Your statement should explain your curiosity in plain language rather than jargon. The usual pitfall is too many ideas and too few finished pieces, so tutors see only beginnings; make sure every project has a visible ending you can stand behind."
    },
    ENTJ: {
      zh: "你的作品集应该像一份清晰的项目报告：开篇放最有力的作品，再按项目展开目标、计划、执行和成果。合作项目要写明你的角色和具体贡献，展示你组织资源、按时交付的能力。草图本里除了排期表，也要有手绘、试验和犹豫的痕迹。个人陈述讲清你的方向和下一步。常见误区是太像商业提案，结果漂亮却缺少个人感受与慢下来的探索；至少放一个没有明确用途、只为好奇而做的项目。",
      en: "Your portfolio should read like a clear project report: open with your strongest work, then set out each project’s aim, plan, delivery and outcome. For collaborations, state your role and exactly what you contributed, showing that you organise resources and deliver on time. Alongside schedules, the sketchbook needs drawing, tests and traces of hesitation. Your statement should make your direction and next step clear. The usual pitfall is looking too much like a business pitch, polished results with little personal feeling or slow exploration; include at least one project made purely out of curiosity, with no obvious use."
    },
    ENTP: {
      zh: "你的作品集可以大胆、跨界，但需要一条主线把它们串起来，比如你反复挑战的某个观念。挑三个最有争议性或最出人意料的项目，每个都展示你如何提出问题、推翻假设、再给出回应。草图本里的头脑风暴、辩论笔记和快速原型都值得保留。个人陈述要有观点，也要有证据。常见误区是项目都停在“好点子”阶段，深度不够；选定一个项目做到底，展示你能把一个想法推进到完整的作品。",
      en: "Your portfolio can be bold and cross-disciplinary, but it needs one thread to hold it together, such as an idea you keep challenging. Choose three of your most provocative or unexpected projects, and show for each how you raised a question, overturned an assumption and answered it. Keep the brainstorms, argument notes and quick prototypes in your sketchbook. Your statement should take a position and back it with evidence. The usual pitfall is that projects stop at the good-idea stage and lack depth; take one project all the way, proving you can carry an idea through to finished work."
    },
    INFJ: {
      zh: "你的作品集适合以意义为线索：两到三个深入的项目，各自围绕一个关于人、记忆或社会的问题。每个项目展示你的调研对象、伦理考量和作品如何回应他们。草图本里放访谈摘录、情绪板和手写反思，让导师看到你如何从倾听走向创作。个人陈述要真诚而具体，讲一个改变你的瞬间。常见误区是想清楚了才动手，作品数量偏少、形式单一；多放一些快速的视觉试验，证明你也能在做中思考。",
      en: "Your portfolio should follow a thread of meaning: two or three deep projects, each built around a question about people, memory or society. For each, show who you researched, the ethical choices you made and how the work answers them. Fill the sketchbook with interview extracts, mood boards and handwritten reflection, so tutors see you move from listening to making. Make your statement sincere and specific, telling one moment that changed you. The usual pitfall is waiting to have everything figured out, leaving too little work in too few forms; add quick visual experiments that prove you think by making."
    },
    INFP: {
      zh: "你的作品集可以像一本有个人声音的书：作品之间有情绪与故事的连贯，而不只是技法展示。选择最真实的三个项目，每个都交代灵感来源、参考的艺术家和你做出的关键选择。草图本是你的强项，日记式的速写、拼贴和文字都能打动导师。个人陈述要清楚说出你在乎什么，并把感受落到具体作品上。常见误区是太私人，旁人看不懂；为每个项目配上两三句清晰说明，让观众能跟上你的思路。",
      en: "Your portfolio can read like a book with a personal voice: works connected by feeling and story, not just a display of technique. Choose your three most honest projects and explain for each where it began, which artists you looked at and the key choices you made. The sketchbook is your strength; diary-like drawing, collage and writing can move tutors. Your statement should say clearly what you care about and tie that feeling to specific works. The usual pitfall is being too private for others to follow; give each project two or three clear sentences so viewers can follow your thinking."
    },
    ENFJ: {
      zh: "你的作品集适合展示作品如何与人发生关系：社区工作坊、合作项目和公共活动都是你的亮点。每个项目讲清参与者是谁、你如何组织、作品带来了什么改变，并附上现场照片和反馈。草图本里除了活动策划，也要有属于你自己的视觉语言探索。个人陈述可以讲你相信艺术能为人做什么。常见误区是作品集里全是“为别人做”的事，看不到你个人的创作；至少留一个只属于你的独立项目。",
      en: "Your portfolio should show how your work connects with people: community workshops, collaborations and public events are your highlights. For each project, explain who took part, how you organised it and what changed, with photographs and feedback from the day. Beyond event planning, the sketchbook needs your own exploration of a visual language. Your statement can say what you believe art can do for people. The usual pitfall is a portfolio full of things done for others, with no sign of your own practice; keep at least one independent project that belongs only to you."
    },
    ENFP: {
      zh: "你的作品集可以丰富多彩，但要经过精心挑选：从众多尝试里选出三到四个最完整的项目，用一个共同的兴趣把它们连起来。每个项目展示灵感的火花如何一步步变成成品，标出关键转折点。草图本里的灵感墙、拼贴和快速实验很能体现你的活力。个人陈述讲你为什么对这些主题着迷。常见误区是贪多，作品集像一锅大杂烩，导师抓不住重点；宁可少而完整，也不要多而零散。",
      en: "Your portfolio can be rich and colourful, but it must be carefully edited: pick the three or four most complete projects from your many attempts and link them through one shared interest. For each, show how a spark became a finished piece, marking the key turning points. Inspiration walls, collage and quick experiments in the sketchbook show your energy well. Your statement should explain why these themes fascinate you. The usual pitfall is including everything, so the portfolio feels like a jumble and tutors cannot find the focus; fewer complete projects beat many scattered ones."
    },
    ISTJ: {
      zh: "你的作品集应该体现可靠与严谨：项目按清晰的逻辑排列，每页信息层级分明，技术图纸、测量记录和材料清单都很到位。选择能展示长期投入的项目，比如持续数月的记录或系列研究。草图本要完整呈现步骤，也别忘了标注你为什么这样做。个人陈述用事实讲述你的兴趣如何形成。常见误区是太稳妥，像一份标准答案；加入一个打破自己规则的实验，让导师看到你的可能性。",
      en: "Your portfolio should show reliability and rigour: projects in a clear logical order, a clear hierarchy of information on every page, and technical drawings, measurements and material lists done properly. Choose projects that show long commitment, such as months of recording or a research series. The sketchbook should show every step, and also note why you made each choice. Your statement should use facts to show how your interest took shape. The usual pitfall is playing it too safe, like a model answer; add one experiment where you break your own rules, so tutors see your potential."
    },
    ISFJ: {
      zh: "你的作品集适合展示细致与关怀：精心的手工、耐心的观察和为具体的人而做的设计都是你的强项。每个项目说明它为谁而做、你观察到了什么、细节背后的理由。草图本里的反复描绘和材料小样能证明你的工艺功底。个人陈述要说出你自己的判断，而不只是描述过程。常见误区是太谦虚，作品很好却讲不出观点，导师看不到你的立场；在每个项目里写一句“我认为”，并大胆放大你最满意的作品。",
      en: "Your portfolio should show care and attention: fine handwork, patient observation and design made for specific people are your strengths. For each project, explain who it was for, what you noticed and the reasons behind the details. Repeated studies and material samples in the sketchbook prove your craft. Your statement should voice your own judgement, not only describe the process. The usual pitfall is modesty: the work is good but has no stated view, so tutors cannot see where you stand; write one “I believe” for each project, and give your best piece more space."
    },
    ESTJ: {
      zh: "你的作品集应该像一份执行有力的方案：每个项目写清需求、限制条件、解决方法和最终成果，版面整洁、信息准确。真实客户、比赛或学校活动的项目很能体现你的组织与交付能力。草图本要展示迭代过程，而不只是最终方案。个人陈述讲你如何解决问题以及你想解决的下一个问题。常见误区是只追求“正确答案”，缺少开放性的探索；放一个没有标准答案的实验项目，展示你也能与不确定性共处。",
      en: "Your portfolio should read like a well-executed proposal: each project sets out the brief, the constraints, your solution and the outcome, in clean layouts with accurate information. Projects for real clients, competitions or school events show your organisation and delivery. The sketchbook should show iteration, not only the final design. Your statement should explain how you solve problems and which problem you want to tackle next. The usual pitfall is chasing the right answer and leaving out open-ended exploration; include one experimental project with no correct answer, to show you can live with uncertainty."
    },
    ESFJ: {
      zh: "你的作品集适合呈现你如何为人创造体验：活动、展陈、空间布置和服务类设计都是你的优势。每个项目展示使用者的反馈、现场照片和你做出的调整。草图本里要有你自己的视觉试验，而不只是满足他人需求的方案。个人陈述可以讲你观察到人们需要什么，以及你自己想做什么。常见误区是作品太顺从他人期待，看不到你的个性；挑一个项目，按你自己的喜好推到极致，并说明为什么。",
      en: "Your portfolio should show how you create experiences for people: events, displays, spatial arrangements and service design are your strengths. For each project, include users’ feedback, photographs from the day and the changes you made. The sketchbook needs your own visual experiments, not only solutions that meet others’ needs. Your statement can describe what you noticed people need, and what you yourself want to make. The usual pitfall is work that follows others’ expectations so closely that your personality disappears; push one project as far as your own taste goes, and explain why."
    },
    ISTP: {
      zh: "你的作品集应该让材料和过程说话：清楚的过程照片、结构细节、工具与工艺的选择，比漂亮的效果图更有说服力。选两到三个动手程度最高的项目，每个都展示从测试到成品的关键步骤。草图本里放尺寸草图、失败的样件和解决方案。个人陈述是你的难点，要用几句话讲清作品背后的想法。常见误区是只展示“怎么做”，没讲“为什么做”；为每个项目写一段简短的意图说明，导师才能读懂你。",
      en: "Your portfolio should let material and process speak: clear process photographs, structural details and your choice of tools and techniques persuade more than polished renders. Choose two or three of your most hands-on projects, each showing the key steps from test to finished piece. Put dimensioned sketches, failed samples and solutions in the sketchbook. The written statement is your hard part; use a few sentences to state the idea behind the work. The usual pitfall is showing how but not why; write a short note of intention for each project so tutors can read you."
    },
    ISFP: {
      zh: "你的作品集可以以感官与审美取胜：色彩、肌理和构图的一致性会让导师记住你。挑选风格最鲜明的作品，按情绪或主题而不是时间顺序排列，让整本作品集像一次完整的观看体验。草图本里的色彩研究、材料小样和速写最能体现你的敏感。个人陈述要把感受翻译成清晰的文字。常见误区是只有画面没有说明，导师跟不上你的思路；每个项目配上灵感来源和两三句意图说明。",
      en: "Your portfolio can win through the senses and through taste: consistency of colour, texture and composition will make tutors remember you. Choose your most distinctive work and order it by mood or theme rather than date, so the whole portfolio feels like one complete viewing experience. Colour studies, material samples and drawing in the sketchbook show your sensitivity best. Your statement needs to translate feeling into clear words. The usual pitfall is images without explanation, leaving tutors unable to follow; give each project its starting point and two or three sentences of intention."
    },
    ESTP: {
      zh: "你的作品集应该捕捉现场的能量：表演记录、快速原型、街头拍摄和动手搭建都是你的长处。用视频截图、连续照片和现场草图展示作品发生的过程，让导师感受到你的行动力。每个项目之后加一页反思：哪里成功、哪里失败、下次怎么做。个人陈述讲你从实践中学到的方法。常见误区是作品集像一串精彩片段，缺少沉淀与深度；把经验整理成方法，展示你能从行动中持续成长。",
      en: "Your portfolio should capture live energy: performance documentation, quick prototypes, street photography and hands-on builds are your strengths. Use video stills, photo sequences and on-the-spot sketches to show the work happening, so tutors feel your drive. After each project, add a page of reflection: what worked, what failed and what you would do next time. Your statement should describe the methods you have learned through practice. The usual pitfall is a portfolio like a highlights reel, lively but shallow; turn experience into method, and show that you keep growing from action."
    },
    ESFP: {
      zh: "你的作品集可以鲜活、有感染力：造型、影像、表演和陈列类作品都是你的舞台。用高质量的摄影和视频呈现作品被穿着、被观看、被体验的瞬间。每个项目都要交代参考资料和研究过程，让表现力有根基。草图本里放情绪板、造型试验和现场速写。个人陈述讲你想让观众感受到什么，以及为什么。常见误区是视觉很强但研究偏薄，导师会怀疑深度；为一个项目补充系统的调研，让表达更有分量。",
      en: "Your portfolio can be vivid and infectious: styling, moving image, performance and display work are your stage. Use high-quality photography and video to capture the work being worn, watched and experienced. Every project needs its references and research process, so the expression has roots. Fill the sketchbook with mood boards, styling tests and live sketches. Your statement should describe what you want the audience to feel, and why. The usual pitfall is strong visuals with thin research, which makes tutors doubt the depth; add systematic research to one project so your expression carries more weight."
    }
  };

  /* Crits and reviews: how you come across, what you may miss, what to rehearse */
  L.critGuide = {
    INTJ: {
      impression: {
        zh: "在评图和点评中，你通常显得冷静、有备而来，讲解逻辑清楚，很少被问住。导师会欣赏你的概念框架和研究深度，但有时也会觉得你已经“定稿”，不太需要别人的意见，于是给出的反馈变少、变浅。你的沉默常被理解为自信，其实可能只是在思考。",
        en: "In crits and reviews you usually seem calm and well prepared, with a clear line of argument, and you are rarely caught out. Tutors admire your conceptual framework and depth of research, but they may also feel the work is already decided and needs no input, so their feedback becomes thinner. Your silence is often read as confidence, when you may simply be thinking."
      },
      blindSpots: {
        zh: "你可能低估了视觉第一印象：观众还没听你解释，就已经在画面里做出判断。你也容易只回应逻辑上的质疑，而忽略“这件作品让我有什么感受”这类问题。另外，把半成品拿出来太晚，会让你错过最有用的早期反馈，等到成品阶段再改就困难得多。",
        en: "You may underestimate the first visual impression: viewers judge the image before they hear your explanation. You also tend to answer only logical challenges and overlook questions such as how the work makes someone feel. Bringing work in progress out too late means you miss the most useful early feedback, and changes are far harder once a piece is finished."
      },
      practise: [
        { zh: "每次评图前，准备一句不超过二十字的作品介绍：先讲观众会有什么感受，再讲背后的概念框架。", en: "Before every crit, prepare a one-sentence introduction that starts with what viewers will feel, and only then sets out the conceptual framework behind it." },
        { zh: "每次主动带一件未完成的作品，请导师和同学直接指出他们最想改动的地方，并当场记下来。", en: "Bring one unfinished piece on purpose each time, ask tutors and peers to point straight to the part they would most like to change, and note it down." },
        { zh: "听到质疑时，先用自己的话复述对方的观点再回应，练习不急于辩护地说“这个角度我没想到”。", en: "When challenged, restate the point in your own words before answering, and practise saying “I hadn’t thought of it that way” without rushing to defend." }
      ]
    },
    INTP: {
      impression: {
        zh: "你在点评里常常是那个提出奇怪问题的人，思路跳跃，乐于讨论概念本身。导师会觉得你聪明、有原创性，但也可能难以抓住你作品的重点，因为你会同时讲三个方向。你对批评通常不太在意情绪，更在意对方的推理是否成立，这让讨论很有深度。",
        en: "In reviews you are often the one asking unusual questions, jumping between ideas and happy to debate the concept itself. Tutors find you clever and original, but they may struggle to grasp the main point of your work, because you talk about three directions at once. You rarely take criticism emotionally and care more about whether the reasoning holds, which makes for deep discussion."
      },
      blindSpots: {
        zh: "你可能忽略了“完成度”在评图中的分量：再好的想法，如果停在草稿阶段，观众也很难被说服。你还容易在解释时绕得太远，用太多术语，让听众失去耐心。另外，你未必注意到导师真正关心的是你下一步要做什么，而不只是这个想法有多有趣。",
        en: "You may overlook how much finish matters in a crit: however good the idea, it is hard to convince viewers if it stays a sketch. You can also wander too far when explaining, using so much jargon that listeners lose patience. And you may not notice that tutors mostly want to know what you will do next, not only how interesting the idea is."
      },
      practise: [
        { zh: "把作品的核心问题压缩成一句话，再练习在三十秒内讲完作品介绍，请朋友计时并提醒你哪里跑题。", en: "Compress the central question of your work into one sentence, then practise a thirty-second introduction while a friend times you and flags where you drift." },
        { zh: "每次评图结束前，明确说出接下来一周你会完成的一件具体事情，并在下次评图时汇报结果。", en: "Before every crit ends, state one concrete thing you will finish over the following week, and report the result at the next crit." },
        { zh: "请朋友在你使用术语时举手示意，然后练习用日常词语把同一个概念重新解释一遍。", en: "Ask a friend to raise a hand whenever you use jargon, and practise explaining the same idea again in everyday words." }
      ]
    },
    ENTJ: {
      impression: {
        zh: "你在评图时果断、有掌控感，汇报像一场清晰的项目陈述，目标、计划和成果一目了然。导师会信任你的执行力，同学也常把你当作讨论的主导者。但强势的表达有时会让别人不敢提出不同意见，导师也可能觉得你更关心结果，而不是作品本身的探索。",
        en: "In crits you are decisive and in control, presenting like a clear project briefing in which the aim, plan and outcome are obvious. Tutors trust your delivery, and classmates often let you lead the discussion. But a forceful delivery can stop others offering a different view, and tutors may feel you care more about the result than about exploring the work itself."
      },
      blindSpots: {
        zh: "你可能把反馈当作需要“处理掉”的问题，迅速给出解决方案，却没有真正消化。你也容易忽略作品中慢下来的、不确定的部分，而那往往正是导师最想看到的。别人沉默不一定代表同意，可能只是不愿和你争论；你错过了一些本来很有价值的意见。",
        en: "You may treat feedback as problems to be dealt with, offering quick solutions without really absorbing them. You can also overlook the slow, uncertain parts of the work, which are often exactly what tutors most want to see. Others staying quiet does not always mean agreement; they may simply not want to argue with you, and you lose views that could have been valuable."
      },
      practise: [
        { zh: "在每次评图中至少向别人提出两个开放性问题，听完回答后停顿三秒，再说出你的看法。", en: "Ask others at least two open questions in every crit, and after hearing each answer pause for three seconds before giving your own view." },
        { zh: "准备一段讲述“我还不确定的地方”的内容，主动展示作品的未知部分。", en: "Prepare a short section on what you are still unsure about, and show the unresolved parts of your work on purpose." },
        { zh: "听完反馈后先完整记下来，不在现场急着给出解决方案，第二天冷静下来再决定怎么改。", en: "Write feedback down in full without rushing to offer a fix on the spot, and decide what to change the next day, once you have had time to think." }
      ]
    },
    ENTP: {
      impression: {
        zh: "你在评图里思维敏捷、能言善辩，常能把讨论带到意想不到的方向，现场气氛因你而活跃。导师会被你的想法吸引，但也可能怀疑你是否真的做了足够的工作，还是只靠口才。你喜欢反驳，这在讨论中是优势，但在别人看来有时像在防守。",
        en: "In crits you are quick-witted and persuasive, often steering the discussion somewhere unexpected and lifting the energy in the room. Tutors are drawn to your ideas, but they may wonder whether you have done enough work or are relying on how well you talk. You enjoy arguing back, which helps a debate, but to others it can sometimes look defensive."
      },
      blindSpots: {
        zh: "你可能没有意识到，讨论得热闹不等于作品本身足够有力；导师最终看的是墙上和作品集里的东西。你也容易在听到建议后立刻换方向，导致项目一直重新开始。还有，过于频繁地反驳，会让导师不再愿意给你直接、真诚的批评。",
        en: "You may not realise that a lively debate is not the same as strong work; in the end tutors judge what is on the wall and in the portfolio. You can also change direction the moment you hear a suggestion, so a project keeps starting over. And arguing back too often can make tutors less willing to give you direct, honest criticism."
      },
      practise: [
        { zh: "评图时先让作品自己说话：前两分钟只展示、不解释，安静观察大家的第一反应并记下来。", en: "Let the work speak first: for the first two minutes of a crit, show without explaining, and quietly note people’s first reactions." },
        { zh: "每听到一条批评，先说“谢谢，我想一想”，把它写下来，而不是立刻找理由反驳。", en: "Whenever you hear a criticism, say “Thanks, let me think about that” and write it down, instead of looking for a counter-argument straight away." },
        { zh: "练习用一张图说明你如何把一个想法推进到底，而不是展示十个新开头。", en: "Practise using one diagram to show how you carried an idea through, instead of presenting ten new beginnings." }
      ]
    },
    INFJ: {
      impression: {
        zh: "你在点评中给人的感觉是认真、深思熟虑，作品背后有明显的价值观和关怀。导师会被你的真诚打动，也会注意到你对他人感受的敏锐。不过你常常说得不多，需要被问才会展开，有时显得过于保守，让人觉得你还没准备好分享真正的想法。",
        en: "In reviews you come across as earnest and thoughtful, with clear values and care behind the work. Tutors are moved by your sincerity and notice how alert you are to other people’s feelings. But you often say little until asked, which can seem overly cautious, as if you are not yet ready to share what you really think."
      },
      blindSpots: {
        zh: "你可能会把批评看得过重，把对作品的意见理解为对你价值观的否定。你也容易在脑子里构思完整之后才动手，导致评图时能展示的视觉材料偏少。另外，你很在意别人，往往会注意同学的感受，却忘了为自己的作品争取足够的讨论时间。",
        en: "You may take criticism too much to heart, hearing comments on the work as a rejection of your values. You also tend to plan everything in your head before making, so you have too little visual material to show in a crit. And because you care about others, you notice classmates’ feelings but forget to claim enough discussion time for your own work."
      },
      practise: [
        { zh: "每次评图带上至少五张快速的视觉试验，让讨论围绕可见的东西展开。", en: "Bring at least five quick visual experiments to every crit, so the discussion can centre on things people can see." },
        { zh: "提前写下你最想得到反馈的两个问题，在评图一开场就主动提出来，引导讨论的方向。", en: "Write down the two questions you most want feedback on, and raise them yourself at the very start, so you steer where the discussion goes." },
        { zh: "练习把“我觉得”换成“我的作品想做到”，把讨论放回作品本身。", en: "Practise replacing “I feel” with “my work is trying to”, to keep the discussion on the work itself." }
      ]
    },
    INFP: {
      impression: {
        zh: "你在评图中通常温和、真诚，作品有强烈的个人气质，很容易让人记住。导师会欣赏你独特的视角和情感深度，但当你讲解时，可能会显得紧张或不够确定，声音偏小，或者一直在道歉。别人有时难以分辨你是在征求意见，还是在保护自己的作品。",
        en: "In crits you are usually gentle and sincere, and your work has a strongly personal character that people remember. Tutors appreciate your distinctive viewpoint and emotional depth, but when you explain it you may sound nervous or unsure, speaking quietly or apologising. Others can find it hard to tell whether you are asking for advice or protecting the work."
      },
      blindSpots: {
        zh: "你可能把对作品的评价听成对你本人的评价，一句技术性的建议也会让你沮丧好几天。你也容易假设别人能自然读懂你的作品，没有提供足够的背景说明。还有，你可能只记住了负面意见，而忽略了导师其实也肯定了很多地方。",
        en: "You may hear comments on the work as comments on you, so a single technical suggestion can upset you for days. You may also assume that others will read your work naturally, without giving enough context. And you might remember only the negative remarks, forgetting that tutors also praised a great deal."
      },
      practise: [
        { zh: "准备三句介绍：作品从哪里来、你想让观众感受到什么、你还在尝试什么。", en: "Prepare three sentences: where the work came from, what you want viewers to feel, and what you are still trying out." },
        { zh: "评图时请一位同学帮你记录所有意见，事后把正面与批评性的意见分成两栏整理，再分别回看。", en: "Ask a classmate to note every comment during your crit, then sort them afterwards into two columns, positive and critical, and read each column separately." },
        { zh: "对着镜子或手机镜头练习不带道歉地开场，用平稳的语速完整讲满一分钟，再回放检查。", en: "Practise opening without an apology in front of a mirror or phone camera, speaking at a steady pace for one full minute, then play it back." }
      ]
    },
    ENFJ: {
      impression: {
        zh: "你在评图中往往是最会照顾全场的人：表达流畅、有感染力，也乐于为同学的作品提建议。导师会觉得你成熟、善于沟通，适合合作和公共项目。不过你讲自己的作品时，可能更多地谈参与者和影响，而较少谈形式与个人选择，让导师难以看到你的创作主张。",
        en: "In crits you are often the one looking after the whole room: fluent, engaging and happy to suggest ideas for classmates’ work. Tutors find you mature and a good communicator, suited to collaborative and public projects. But when presenting your own work you may talk more about participants and impact than about form and your own choices, so tutors struggle to see your position as an artist."
      },
      blindSpots: {
        zh: "你可能太在意现场气氛，为了不让场面尴尬而接受所有意见，结果失去了自己的判断。你也容易把精力花在帮助他人上，留给自己作品的准备时间不够。另外，导师的批评有时针对的是作品的视觉质量，而你可能把它转移成了关于项目意义的讨论。",
        en: "You may care so much about the atmosphere that you accept every comment to avoid awkwardness, and lose your own judgement. You can also spend your energy helping others and leave too little time to prepare your own work. And when tutors criticise the visual quality, you may steer the conversation towards the meaning of the project instead."
      },
      practise: [
        { zh: "讲解时专门留一分钟谈你的视觉选择：材料、尺寸、颜色以及为什么。", en: "Reserve one minute of your presentation for your visual choices: material, scale and colour, and the reasons behind them." },
        { zh: "练习礼貌而坚定地说“我理解，但我想保留这个部分”，并用一两句话清楚地说明你的理由。", en: "Practise saying, politely but firmly, “I understand, but I want to keep this part”, and give your reason clearly in a sentence or two." },
        { zh: "在评图前的一周，把每天用来帮助别人的时间限定在一小时以内，其余时间留给自己的作品。", en: "In the week before a crit, limit the time you spend helping others to one hour a day, and give the rest to your own work." }
      ]
    },
    ENFP: {
      impression: {
        zh: "你在评图中热情、充满想法，讲起作品来眉飞色舞，很容易感染导师和同学。大家会被你的好奇心和联想能力吸引，但也可能被你同时抛出的大量方向弄得眼花缭乱。导师常常想帮你聚焦，却发现你下一次带来的又是全新的东西。",
        en: "In crits you are enthusiastic and full of ideas, lighting up as you talk about the work, and your energy spreads easily to tutors and classmates. People are drawn to your curiosity and gift for connections, but the sheer number of directions you offer at once can dazzle them. Tutors often try to help you focus, only to find you bring something completely new next time."
      },
      blindSpots: {
        zh: "你可能没有意识到，导师给出的建议需要持续几周的执行才能看到效果，而你常常在兴奋感消失后就转向别处。你也容易把“想法”当作“进度”，评图时展示的完成作品偏少。另外，你可能记住了让你兴奋的意见，却忽略了那些需要耐心打磨的细节建议。",
        en: "You may not realise that tutors’ advice needs weeks of follow-through before it shows, while you often move on once the excitement fades. You can also mistake ideas for progress, bringing too few finished pieces to a crit. And you may remember the comments that excited you while overlooking the detailed advice that needs patient refinement."
      },
      practise: [
        { zh: "每次评图只带一个主项目，把其他冒出来的新想法统一写在一页“暂存清单”上，以后再说。", en: "Bring only one main project to each crit, and write every other new idea on a single “parking list” page to return to later." },
        { zh: "把导师的建议拆成三个小任务，各设一个截止日期，贴在桌前，按时检查并打勾。", en: "Break your tutors’ advice into three small tasks, give each a deadline, pin the list above your desk and tick each one off on time." },
        { zh: "练习用“上次您建议……我做了……结果是……”的结构开场，让导师看到你的持续推进。", en: "Practise opening with “Last time you suggested…, I did…, and the result was…”, so tutors can see your steady progress." }
      ]
    },
    ISTJ: {
      impression: {
        zh: "你在评图中显得可靠、准备充分，资料整齐、步骤清晰，几乎不会出现遗漏。导师会信任你的工作态度和技术基础，认为你是能把事情做好的人。不过你的讲解可能偏向流程和事实，较少谈个人感受或冒险的尝试，作品因此容易被评价为“扎实，但不够意外”。",
        en: "In crits you seem dependable and well prepared, with tidy materials, clear steps and almost nothing missing. Tutors trust your work ethic and technical grounding, and see you as someone who gets things done properly. But your explanation may lean towards process and facts, saying little about feeling or risk, so the work is easily judged as solid but unsurprising."
      },
      blindSpots: {
        zh: "你可能把“按要求完成”当作目标，而导师更希望看到你超越要求的地方。你也容易对开放性的问题感到不安，比如“如果完全不考虑功能呢”，从而给出过于保守的回答。另外，你可能把建议理解为必须执行的指令，而不是可以选择的可能性。",
        en: "You may treat meeting the brief as the goal, while tutors are hoping to see where you go beyond it. Open questions, such as what if function did not matter at all, can unsettle you and lead to overly cautious answers. You may also hear suggestions as instructions to be carried out, rather than possibilities you are free to choose from."
      },
      practise: [
        { zh: "为每个项目准备一个“如果我打破规则会怎样”的小实验，在评图时与正式方案一起展示。", en: "Prepare one small “what if I broke the rules” experiment for each project, and show it in the crit alongside your main proposal." },
        { zh: "回答开放性问题时，练习先说出一个大胆的想法，再补充现实层面的考虑和限制。", en: "When answering open questions, practise giving a bold idea first and adding the practical considerations afterwards." },
        { zh: "听到建议后可以追问导师：“这是必须修改的问题，还是一个值得尝试的方向？”", en: "After hearing a suggestion, ask the tutor: “Is this something I must change, or a direction worth trying?”" }
      ]
    },
    ISFJ: {
      impression: {
        zh: "你在评图中给人的印象是细心、谦和，作品里有很多用心的细节，工艺也很扎实。导师会欣赏你的耐心和对使用者的体贴，但你讲解时常常低估自己，习惯说“只是”“还不够好”，让导师不确定你对作品有没有信心，也难以判断你的真实想法。",
        en: "In crits you come across as careful and modest, with plenty of thoughtful detail and solid craft in the work. Tutors appreciate your patience and consideration for users, but you often undersell yourself when presenting, saying “it’s just” or “it’s not good enough yet”, which leaves tutors unsure how confident you are and what you really think."
      },
      blindSpots: {
        zh: "你可能太在意别人的期待，根据导师的每一句话修改作品，最后失去了自己的方向。你也容易把功劳归于别人，忽略了自己在项目里的关键作用。另外，你不太愿意打断别人或提出不同意见，于是错过了为作品辩护和澄清误解的机会。",
        en: "You may care so much about others’ expectations that you change the work after every comment and lose your own direction. You also tend to give others the credit and overlook your key role in a project. And because you are reluctant to interrupt or disagree, you miss the chance to defend the work and clear up misunderstandings."
      },
      practise: [
        { zh: "把开场白里的“只是”“还不够好”删掉，改成“我选择了……因为……”。", en: "Remove “it’s just” and “not good enough” from your opening, and say “I chose… because…” instead." },
        { zh: "每次评图准备一个你愿意坚持的设计决定，并练习用两三句话清楚地解释背后的原因。", en: "For every crit, prepare one design decision you are willing to stand by, and practise explaining the reason behind it in two or three sentences." },
        { zh: "被误解时，练习平静地说：“我补充一点背景，这样可能会更清楚。”然后简要说明。", en: "When you are misunderstood, practise saying calmly, “Let me add a little context; that might make it clearer,” and then explain briefly." }
      ]
    },
    ESTJ: {
      impression: {
        zh: "你在评图中条理分明、讲求效率，汇报节奏紧凑，问题和方案都说得很清楚。导师会认可你的组织能力和执行力，觉得你可以承担复杂的项目。不过你可能急于得到明确的结论，对模糊的、开放的讨论表现出不耐烦，这会让导师觉得你在回避作品中更深的问题。",
        en: "In crits you are organised and efficient, presenting at a brisk pace and stating problems and solutions clearly. Tutors recognise your organisation and delivery, and feel you could take on complex projects. But you may be keen to reach a firm conclusion and impatient with vague or open-ended discussion, which can make tutors feel you are avoiding the deeper questions in the work."
      },
      blindSpots: {
        zh: "你可能以为只要方案合理，作品就成立了，却忽视了情感、氛围和意义这些难以量化的部分。你也容易把同学的作品用“对错”来评价，让讨论变得像检查。另外，你可能把导师的开放性问题当作批评，急着证明自己没有错。",
        en: "You may assume a sensible solution makes the work succeed, overlooking things that are hard to measure, such as feeling, atmosphere and meaning. You can also judge classmates’ work as right or wrong, turning discussion into inspection. And you may hear a tutor’s open question as criticism, rushing to prove you were not wrong."
      },
      practise: [
        { zh: "评图时练习说“这个问题我还没有答案”，并把它写进下一步计划。", en: "Practise saying “I don’t have an answer to that yet” in a crit, and add the question to your next steps." },
        { zh: "给同学反馈时，先描述作品带给你的感受和联想，再提出你的具体建议，避免只判断对错。", en: "When giving feedback to classmates, describe the feelings and associations the work gives you before making specific suggestions, rather than judging it right or wrong." },
        { zh: "每个项目准备一段关于作品氛围或意义的讲解，而不只是功能说明。", en: "For each project, prepare a short account of the work’s atmosphere or meaning, not only how it functions." }
      ]
    },
    ESFJ: {
      impression: {
        zh: "你在评图中亲切、得体，善于营造轻松的讨论氛围，也很会照顾每个人的感受。导师会觉得你合作愉快、反应积极，特别适合需要沟通的项目。但你讲自己的作品时，可能更多地介绍别人喜欢什么，而不是你自己想要什么，作品的个人立场因此显得模糊。",
        en: "In crits you are warm and tactful, good at keeping the discussion relaxed and attentive to how everyone feels. Tutors find you easy to work with and positive, especially suited to projects that depend on communication. But when presenting your own work you may talk more about what others liked than what you wanted, so the work’s personal position looks unclear."
      },
      blindSpots: {
        zh: "你可能过于期待被认可，一旦听到负面意见就急于调整，而没有判断它是否适合你的作品。你也容易为了让大家满意而选择最稳妥的方案。另外，你可能在评别人的作品时只说好话，错过了锻炼批判性表达的机会，也让自己的判断力变弱。",
        en: "You may want approval so much that you rush to adjust after any negative comment, without judging whether it suits the work. You can also choose the safest option to keep everyone happy. And when reviewing others you may offer only praise, missing the chance to practise critical speech and weakening your own judgement."
      },
      practise: [
        { zh: "讲解作品时用“我想要”开头，至少说出一个只属于你自己的选择。", en: "Start your presentation with “I wanted to”, and name at least one choice that is entirely your own." },
        { zh: "给同学反馈时，练习“一个优点加一个具体建议”的结构，建议要具体到可以马上动手修改。", en: "When giving feedback to classmates, practise one strength plus one specific suggestion, making the suggestion concrete enough to act on straight away." },
        { zh: "收到意见后先问自己：这条建议会让作品更像我自己，还是更像别人期待的样子？", en: "After receiving feedback, ask yourself whether this advice makes the work more like you, or more like what someone else expects." }
      ]
    },
    ISTP: {
      impression: {
        zh: "你在评图中话不多，但作品本身很有说服力：做工精良、结构合理、材料用得聪明。导师会被你的动手能力和解决问题的方式打动。不过你常常只描述“怎么做的”，很少解释“为什么做”，回答问题也偏简短，导师可能误以为你对作品的思考不够深入。",
        en: "In crits you say little, but the work itself persuades: well made, structurally sound and clever with materials. Tutors are impressed by your making skills and how you solve problems. But you often describe only how it was made and rarely why, and you answer questions briefly, so tutors may wrongly assume you have not thought deeply about the work."
      },
      blindSpots: {
        zh: "你可能低估了语言在评图中的作用：导师需要听到你的意图，才能给出有针对性的建议。你也容易把关于概念的讨论当作空谈，不愿意参与。另外，你习惯自己解决问题，很少主动求助，于是错过了导师或同学能提供的技术和资源支持。",
        en: "You may underestimate the role of words in a crit: tutors need to hear your intention before they can give targeted advice. You can also dismiss conceptual discussion as empty talk and stay out of it. And because you are used to solving problems alone, you rarely ask for help, missing technical support and resources that tutors or classmates could offer."
      },
      practise: [
        { zh: "为每件作品写三句话：它回应了什么问题、为什么用这种材料、你希望观众注意什么。", en: "Write three sentences for every piece: the question it answers, why you chose this material, and what you want viewers to notice." },
        { zh: "回答问题时，练习至少说满三十秒，并加入一个来自制作过程的具体例子来支撑你的观点。", en: "When answering a question, practise speaking for at least thirty seconds, backing your point with one specific example from the making process." },
        { zh: "每次评图结束前，主动提出一个你正卡住的技术难题，请导师和同学一起出主意。", en: "Before each crit ends, raise one technical problem you are stuck on, and invite tutors and classmates to suggest ways through it." }
      ]
    },
    ISFP: {
      impression: {
        zh: "你在评图中安静、敏感，作品的色彩和质感常常是全场最动人的。导师会被你的审美直觉吸引，但听你讲解时，可能觉得你说得太少、太模糊，比如“我就是觉得这样好看”。你在被追问时容易紧张，于是讨论往往停在表面，没有触及你真正的想法。",
        en: "In crits you are quiet and sensitive, and the colour and texture of your work are often the most moving in the room. Tutors are drawn to your aesthetic instinct, but when you explain it they may find you say too little or too vaguely, as in “it just looks right to me”. Being pressed makes you nervous, so discussion often stays on the surface and never reaches your real thinking."
      },
      blindSpots: {
        zh: "你可能以为好的作品不需要解释，但导师需要理解你的选择，才能判断你是否能在课程中持续成长。你也容易回避批评，把作品收起来不再展示。另外，你可能没有意识到自己的直觉其实有规律可循，只是还没有被你整理成可以讲述的方法。",
        en: "You may believe good work needs no explanation, but tutors need to understand your choices to judge whether you will keep growing on the course. You can also avoid criticism by putting the work away and not showing it again. And you may not realise that your instinct follows patterns; you simply have not yet organised them into a method you can describe."
      },
      practise: [
        { zh: "整理三位影响你的艺术家或设计师，练习分别说明你从他们身上学到了什么。", en: "List three artists or designers who influence you, and practise explaining what you have learned from each of them." },
        { zh: "把“我觉得好看”换成具体描述：哪种颜色、哪种肌理、带来什么感受。", en: "Replace “it looks right” with specifics: which colour, which texture, and what feeling it creates for the viewer." },
        { zh: "被追问时先深呼吸，允许自己说“让我想一下”，然后放慢语速，一句一句地回答。", en: "When pressed, take a breath, allow yourself to say “let me think”, then slow down and answer one sentence at a time." }
      ]
    },
    ESTP: {
      impression: {
        zh: "你在评图中自信、反应快，能用现场演示或实物操作抓住所有人的注意力。导师会欣赏你的行动力和临场发挥，同学也喜欢你带来的能量。但你的讲解可能偏即兴，缺少前后连贯的逻辑，导师听完后会记住精彩的瞬间，却说不清你的项目到底在研究什么。",
        en: "In crits you are confident and quick, holding everyone’s attention with live demonstrations or hands-on handling of the work. Tutors appreciate your drive and ability to improvise, and classmates enjoy the energy you bring. But your explanation can be improvised and lack a connected argument, so tutors remember the exciting moments without being able to say what your project is really investigating."
      },
      blindSpots: {
        zh: "你可能把评图当作一次表演，注重现场效果，而忽略了导师真正想看到的反思与方法。你也容易在一个项目完成后立刻投入下一个，没有总结经验。另外，面对需要长期打磨的建议，你可能会觉得无聊，选择性地忽视它们。",
        en: "You may treat a crit as a performance, focusing on the effect in the room and overlooking the reflection and method tutors actually want to see. You can also jump into the next project as soon as one ends, without drawing lessons from it. And you may find advice that needs long refinement boring, and quietly ignore it."
      },
      practise: [
        { zh: "每次评图准备一页“我学到了什么”，列出三条可以在下个项目里复用的方法。", en: "For every crit, prepare one page on what you learned, listing three methods you could reuse in your next project." },
        { zh: "练习用“背景、行动、发现、下一步”四段式结构，在三分钟内讲完一个完整的项目。", en: "Practise presenting one complete project in three minutes, using four parts: context, action, discovery and next step." },
        { zh: "挑一条需要长期打磨的建议，连续执行三周，并在下一次评图时汇报具体进展。", en: "Pick one piece of advice that needs long refinement, follow it for three weeks and report your progress at the next crit." }
      ]
    },
    ESFP: {
      impression: {
        zh: "你在评图中自然、有感染力，善于用视觉和表演把作品“演”出来，现场往往很热闹。导师会被你的表现力和审美感打动，觉得你很懂观众。不过当讨论转向研究和背景时，你可能显得准备不足，回答停留在“我喜欢”“感觉很酷”，作品因此容易被认为好看但不够深。",
        en: "In crits you are natural and engaging, good at performing the work through visuals and presence, and the room usually comes alive. Tutors are struck by your expressiveness and taste, and feel you understand audiences. But when the discussion turns to research and context you may seem underprepared, answering with “I like it” or “it feels cool”, so the work is easily judged attractive but shallow."
      },
      blindSpots: {
        zh: "你可能没有意识到，导师在欣赏视觉效果的同时，也在判断你能否支撑一个长期的研究项目。你也容易被现场的热烈反应带走，忽略了那些安静但重要的批评。另外，你可能临时改变讲解内容，导致关键信息被遗漏。",
        en: "You may not realise that while tutors enjoy the visual impact, they are also judging whether you could sustain a long research project. You can also be carried away by an enthusiastic reaction in the room and miss quieter but important criticism. And you may change what you say on the spot, so key information gets left out."
      },
      practise: [
        { zh: "为每个项目准备两个参考来源和一句你的研究发现，评图时主动提及。", en: "Prepare two references and one research finding for each project, and mention them yourself during the crit." },
        { zh: "评图结束后请一位同学帮你回忆：哪一条意见最不起眼，却可能最重要？", en: "After each crit, ask a classmate to help you recall which comment seemed least noticeable but may matter most." },
        { zh: "提前写一张关键信息卡，讲解前看一眼，确保三个最重要的要点都讲到，不被现场气氛带偏。", en: "Write a card of key points and glance at it before presenting, so you cover all three main points and the mood of the room does not pull you off track." }
      ]
    }
  };

  /* Admissions interviews and portfolio reviews, by temperament */
  L.interviewGuide = {
    NF: {
      before: {
        zh: "面试前，挑出两到三个最能代表你价值观的项目，为每个准备一个“起点故事”：是什么人、什么瞬间让你开始做它。把情感落到具体的证据上，比如访谈片段、草图和测试照片。重读你的个人陈述，确保面试里说的和写下的一致。再请一位不熟悉你作品的人听你讲五分钟，看对方能否复述你的核心关切。最后，查好课程的教学方式，想清楚你为什么适合那里。",
        en: "Before the interview, choose the two or three projects that best show your values, and prepare an origin story for each: which person or moment made you start. Tie the feeling to concrete evidence such as interview extracts, sketches and test photographs. Reread your personal statement so what you say matches what you wrote. Then ask someone unfamiliar with your work to listen for five minutes and see if they can repeat your central concern. Finally, research how the course is taught and be clear about why you belong there."
      },
      during: {
        zh: "面试时，先用一两句话说明你在乎的问题，再展示作品如何回应它，不要一上来就讲很长的背景。保持真诚，但避免过度谦虚或道歉；可以说“我还在探索”，同时给出你下一步的计划。被问到技术或方法时，用过程中的具体例子回答。导师提出不同看法时，把它当作一次对话，而不是对你的否定。结束前，可以提一个你真正关心的问题，比如课程如何支持合作或社区项目。",
        en: "In the interview, open with one or two sentences on the question you care about, then show how the work answers it, rather than starting with long background. Be sincere but avoid excessive modesty or apology; you can say you are still exploring, as long as you give your next step. When asked about technique or method, answer with concrete examples from the process. If a tutor disagrees, treat it as a conversation, not a rejection. Before it ends, ask one question you truly care about, like how the course supports collaborative or community work."
      },
      questions: [
        { zh: "“哪件作品最能代表你？”提示：选一件过程最完整的作品，讲清起点、关键转折和你从中学到的东西，而不只是最好看的那件。", en: "“Which piece represents you best?” Hint: choose the one with the fullest process, and explain its starting point, key turning point and what you learned, not simply the most attractive piece." },
        { zh: "“你的作品如何与观众或他人产生关系？”提示：举一个真实的反馈或参与者的反应，说明它如何改变了你的下一步。", en: "“How does your work connect with an audience or with other people?” Hint: give one real piece of feedback or a participant’s response, and explain how it changed your next step." },
        { zh: "“如果导师对你的项目提出强烈批评，你会怎么做？”提示：讲一次你真实接受批评并改进作品的经历，说明你如何区分对作品的意见和对自己的评价。", en: "“What would you do if a tutor strongly criticised your project?” Hint: describe a real time you took criticism and improved the work, showing how you separate comments on the work from comments on you." }
      ]
    },
    NT: {
      before: {
        zh: "面试前，把你的作品集梳理成一条清晰的研究线索：你在追问什么问题，每个项目推进了哪一步。为每个项目准备一张“方法图”，标出假设、测试和结论。同时准备一两个失败的实验，说明你从中学到了什么。练习用通俗的语言解释复杂的概念，避免依赖术语。再读几篇与你方向相关的文章或展览评论，准备好谈谈你对这个领域当下讨论的看法，以及你为什么选择这门课程。",
        en: "Before the interview, shape your portfolio into one clear line of enquiry: the question you are pursuing and how each project moved it forward. Prepare a method diagram for each project, marking hypotheses, tests and conclusions. Have one or two failed experiments ready, with what you learned from them. Practise explaining complex ideas in plain language rather than leaning on jargon. Then read a few articles or exhibition reviews related to your direction, so you can discuss current debates in the field and why you chose this course."
      },
      during: {
        zh: "面试时，先给出你的核心问题，再用作品作为证据展开，让导师跟上你的逻辑。回答要有结构：观点、例子、结论，控制在一两分钟内。被追问时，可以坦诚说“这一点我还没有验证”，并说明你会怎么验证。避免把面试变成辩论，导师提出不同观点时，先承认其合理之处，再补充你的思考。同时让导师看到你动手的一面：过程照片和原型比口头解释更有说服力。",
        en: "In the interview, state your core question first, then use the work as evidence, so the tutor can follow your logic. Give structured answers of point, example and conclusion, kept to a minute or two. If pressed, you can honestly say you have not yet tested something, and explain how you would. Avoid turning the interview into a debate: when a tutor offers another view, acknowledge what makes sense before adding your own thinking. Show your hands-on side too, since process photographs and prototypes persuade more than talk."
      },
      questions: [
        { zh: "“你的作品想回答什么问题？”提示：用一句话说出问题，再举一个项目说明你如何通过实验或研究推进它，最后讲你还想继续追问什么。", en: "“What question is your work trying to answer?” Hint: state the question in one sentence, give one project that shows how you pushed it forward, then say what you still want to find out." },
        { zh: "“讲一个失败的实验。”提示：说明当时的假设、结果为什么不如预期，以及你根据这个结果做出的调整，展示你的反思能力。", en: "“Tell us about an experiment that failed.” Hint: explain your hypothesis, why the result was not what you expected, and what you changed in response, showing how you reflect." },
        { zh: "“最近有什么展览、书或项目影响了你？”提示：选一个具体的例子，说清它挑战了你的什么想法，以及它如何体现在你的作品里。", en: "“Which recent exhibition, book or project has influenced you?” Hint: pick one specific example, say which of your ideas it challenged, and show where it appears in your work." }
      ]
    },
    SJ: {
      before: {
        zh: "面试前，按时间或逻辑顺序整理作品集，确保每个项目都有完整的过程记录：调研、草图、测试和成品。为每个项目准备一段简短说明，讲清你做了什么、为什么这样做。你的优势是可靠与扎实，但也要准备一两个能体现冒险和个人观点的例子。提前确认面试的形式、时长和需要携带的材料，并做一次完整的模拟。最后想清楚：你希望在课程里学到什么你现在还不会的东西。",
        en: "Before the interview, arrange your portfolio in a clear time or logical order, and make sure every project has a full record: research, sketches, tests and the finished piece. Prepare a short note for each, saying what you did and why. Your strength is reliability and solid work, but also prepare one or two examples that show risk and a personal view. Check the interview format, length and what to bring, and run one full rehearsal. Finally, be clear about what you hope to learn on the course that you cannot yet do."
      },
      during: {
        zh: "面试时，按照你准备好的顺序讲解，但不要照本宣科，留出空间回应导师的即兴问题。展示过程时，突出你做出的关键决定，而不只是步骤本身。当被问到开放性问题，比如“如果没有任何限制你会做什么”，先给出一个大胆的回答，再补充现实考虑。表达观点时用“我认为”“我选择”开头，让导师听到你的判断。保持平稳的语速，遇到不确定的问题时，可以先请对方澄清。",
        en: "In the interview, follow the order you prepared without reading from a script, and leave room for the tutor’s unplanned questions. When showing process, highlight the key decisions you made, not just the steps. If asked something open, such as what you would make with no limits at all, give a bold answer first and add the practical considerations after. Start opinions with “I think” or “I chose”, so the tutor hears your judgement. Keep a steady pace, and if a question is unclear, ask for clarification before answering."
      },
      questions: [
        { zh: "“你的作品里有哪些冒险的尝试？”提示：准备一个你走出舒适区的具体例子，说明当时的不确定、你如何处理，以及这次尝试带来的收获。", en: "“Where have you taken risks in your work?” Hint: prepare one concrete example of leaving your comfort zone, describing the uncertainty, how you handled it and what the attempt gave you." },
        { zh: "“你如何安排一个长期项目？”提示：用一个真实项目说明你的计划方法、遇到的意外和调整，展示你的条理，也展示你的灵活。", en: "“How do you plan a long project?” Hint: use a real project to explain your planning method, the surprises you met and how you adjusted, showing both organisation and flexibility." },
        { zh: "“你为什么选择这门课程？”提示：结合课程的具体特点，比如工作室设置或教学方式，说明它能帮你发展哪一方面目前还欠缺的能力。", en: "“Why have you chosen this course?” Hint: link specific features of the course, such as its workshops or teaching approach, to an ability you still lack and want to develop." }
      ]
    },
    SP: {
      before: {
        zh: "面试前，准备好能“现场展示”的东西：实物作品、材料小样或一段短视频，让导师直接感受到你的动手能力。同时，为每个项目写下三句话：起点、过程中的关键决定、你学到了什么，并反复练习，直到能自然说出。挑选作品时，宁可少而精，也不要堆满精彩片段。提前查好课程的工坊与设备，想好你最想使用什么。最后模拟一次被追问“为什么”的情况，练习把直觉讲成理由。",
        en: "Before the interview, prepare things you can show live: physical pieces, material samples or a short video, so the tutor can feel your making skills directly. Write three sentences for each project, covering its starting point, a key decision in the process and what you learned, and rehearse them until they come naturally. When selecting work, choose fewer, stronger pieces rather than a reel of highlights. Look up the course’s workshops and equipment and decide what you would most like to use. Finally, rehearse being asked “why”, turning instinct into reasons."
      },
      during: {
        zh: "面试时，可以先让作品说话：拿出实物或播放视频，再简短讲解你的意图。保持你自然的活力，但注意节奏，不要一口气讲完所有项目。被问到概念或研究时，用制作过程中的具体例子回答，比如一次失败的测试如何改变了你的方向。如果被问住了，坦诚说出你的直觉，再补充你会怎样研究下去。认真听导师的问题，回答前稍作停顿，避免抢答，让对话有来有往。",
        en: "In the interview, let the work speak first: bring out the physical piece or play the video, then briefly explain your intention. Keep your natural energy, but watch the pace and do not rush through every project at once. When asked about concepts or research, answer with concrete examples from making, such as how a failed test changed your direction. If you are stumped, share your instinct honestly and add how you would research it further. Listen carefully, pause briefly before answering and avoid jumping in, so the conversation flows both ways."
      },
      questions: [
        { zh: "“这件作品背后的想法是什么？”提示：用一句话说出意图，再讲一个具体的制作决定，比如材料或尺寸，以及它如何服务于这个想法。", en: "“What is the idea behind this piece?” Hint: state your intention in one sentence, then describe one specific making decision, such as material or scale, and how it serves the idea." },
        { zh: "“你是怎么知道一件作品完成了的？”提示：说明你判断完成的标准，举一个你反复调整直到满意的例子，展示你的反思能力。", en: "“How do you know when a piece is finished?” Hint: explain the standard you use to judge it, with one example you kept adjusting until it worked, showing how you reflect." },
        { zh: "“你会如何利用我们的工坊和资源？”提示：提前了解课程的设备，说出一两种你想尝试的工艺，以及你希望通过它们实现的具体项目。", en: "“How would you use our workshops and resources?” Hint: research the course’s equipment beforehand, name one or two processes you want to try, and the project you hope they will make possible." }
      ]
    }
  };

  if (typeof module === "object" && module.exports) module.exports = L;
})(typeof window !== "undefined" ? window : globalThis);
