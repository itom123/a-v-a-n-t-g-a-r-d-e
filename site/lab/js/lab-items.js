/*
 * AG LAB · item bank (v2): single-statement 7-point Likert items.
 * key +1: agreeing points to the first letter of the pair (E, S, T, J); key -1: to the second (I, N, F, P).
 * Every facet has two items keyed each way, so agreeing with everything cancels out (acquiescence check).
 */
(function (root) {
  "use strict";
  var L = root.LAB || (root.LAB = {});
  L.items = [
    { id: "ei1", d: "EI", f: "energy", key: 1, t: { zh: "忙了一周，我最想约朋友出去聚聚", en: "After a busy week, a night out with friends is what restores me" } },
    { id: "ei2", d: "EI", f: "energy", key: -1, t: { zh: "开了一整天 crit，我需要一个人安静一会儿", en: "After a full day of crits, I need some time alone to recover" } },
    { id: "ei3", d: "EI", f: "energy", key: 1, t: { zh: "工作室里人多热闹时，我做得更起劲", en: "I work with more energy when the studio is busy and lively" } },
    { id: "ei4", d: "EI", f: "energy", key: -1, t: { zh: "空闲的周末，我更想留给自己一个人过", en: "On a free weekend, I’d rather keep the time to myself" } },

    { id: "ei5", d: "EI", f: "expression", key: 1, t: { zh: "我的想法常常是边说边成形的", en: "My ideas often take shape while I’m talking them through" } },
    { id: "ei6", d: "EI", f: "expression", key: -1, t: { zh: "在 crit 上发言前，我习惯先在心里想好", en: "Before I speak in a crit, I like to have my thoughts worked out" } },
    { id: "ei7", d: "EI", f: "expression", key: 1, t: { zh: "创作卡住时，我第一反应是找人聊聊", en: "When a project stalls, my first move is to talk it through with someone" } },
    { id: "ei8", d: "EI", f: "expression", key: -1, t: { zh: "我习惯一个人写写画画来理清思路", en: "I sort out my thinking best by writing or sketching on my own" } },

    { id: "ei9", d: "EI", f: "connection", key: 1, t: { zh: "在展览开幕式上，我喜欢主动和陌生人聊天", en: "At a gallery opening, I enjoy striking up conversations with strangers" } },
    { id: "ei10", d: "EI", f: "connection", key: -1, t: { zh: "比起热闹聚会，我更喜欢和一两个好友深聊", en: "I prefer a long talk with one or two close friends" } },
    { id: "ei11", d: "EI", f: "connection", key: 1, t: { zh: "到了新学校，我很快就能认识一大圈人", en: "At a new school, I quickly get to know lots of people" } },
    { id: "ei12", d: "EI", f: "connection", key: -1, t: { zh: "小组项目里，我更愿意负责能独立完成的部分", en: "In a group project, I’d rather take on a part I can do on my own" } },

    { id: "sn1", d: "SN", f: "perception", key: 1, t: { zh: "看展时，我先注意材料、尺寸和工艺细节", en: "At an exhibition, I notice materials, scale and craft details first" } },
    { id: "sn2", d: "SN", f: "perception", key: -1, t: { zh: "看一件作品，我会先琢磨它想表达什么", en: "Looking at a piece, I first wonder what it’s trying to say" } },
    { id: "sn3", d: "SN", f: "perception", key: 1, t: { zh: "去过的地方，我能准确记住它的颜色和质感", en: "I can recall the exact colours and textures of places I’ve been" } },
    { id: "sn4", d: "SN", f: "perception", key: -1, t: { zh: "回想一次旅行，我记得的多是整体氛围", en: "When I think back on a trip, I mostly remember the overall mood" } },

    { id: "sn5", d: "SN", f: "orientation", key: 1, t: { zh: "我最关心一个想法现在能不能做出来", en: "What I care about most is whether an idea can actually be made" } },
    { id: "sn6", d: "SN", f: "orientation", key: -1, t: { zh: "我常想象一个想法多年后会变成什么", en: "I often imagine what an idea might turn into years from now" } },
    { id: "sn7", d: "SN", f: "orientation", key: 1, t: { zh: "我喜欢把一种技法练得越来越扎实", en: "I like to keep refining one technique until it’s really solid" } },
    { id: "sn8", d: "SN", f: "orientation", key: -1, t: { zh: "我总忍不住想试试从没见过的做法", en: "I can’t resist trying approaches I’ve never seen before" } },

    { id: "sn9", d: "SN", f: "learning", key: 1, t: { zh: "学新软件时，我喜欢跟着教程一步步来", en: "When learning new software, I like to follow a tutorial step by step" } },
    { id: "sn10", d: "SN", f: "learning", key: -1, t: { zh: "读理论时，我很容易被抽象概念吸引", en: "When reading theory, I’m easily drawn in by abstract ideas" } },
    { id: "sn11", d: "SN", f: "learning", key: 1, t: { zh: "在档案馆做研究，我先把一手资料整理清楚", en: "In an archive, I like to get the primary sources in order first" } },
    { id: "sn12", d: "SN", f: "learning", key: -1, t: { zh: "做研究时，我常从一条线索跳到看似无关的另一条", en: "In research, I often jump from one lead to a seemingly unrelated one" } },

    { id: "tf1", d: "TF", f: "deciding", key: 1, t: { zh: "做选择时，我会先列出利弊再比较", en: "When choosing, I list the pros and cons and compare them" } },
    { id: "tf2", d: "TF", f: "deciding", key: -1, t: { zh: "选题时，我跟着让自己心动的方向走", en: "When picking a project topic, I follow whatever moves me" } },
    { id: "tf3", d: "TF", f: "deciding", key: 1, t: { zh: "朋友诉苦时，我会先帮他分析怎么解决", en: "When a friend is upset, I start by helping them work out a fix" } },
    { id: "tf4", d: "TF", f: "deciding", key: -1, t: { zh: "做决定前，我会先想想身边的人会有什么感受", en: "Before deciding, I think about how the people around me will feel" } },

    { id: "tf5", d: "TF", f: "feedback", key: 1, t: { zh: "给同学提意见时，我会直接指出问题", en: "When giving a peer feedback, I point out the problems directly" } },
    { id: "tf6", d: "TF", f: "feedback", key: -1, t: { zh: "给同学提意见前，我会先想好怎么说才不伤人", en: "Before giving feedback, I think about how to put it kindly" } },
    { id: "tf7", d: "TF", f: "feedback", key: 1, t: { zh: "在 crit 上被质疑时，我更在意对方说得对不对", en: "When challenged in a crit, I focus on whether the point is right" } },
    { id: "tf8", d: "TF", f: "feedback", key: -1, t: { zh: "小组讨论中，我很快会留意到谁情绪不对", en: "In group discussions, I quickly notice when someone seems upset" } },

    { id: "tf9", d: "TF", f: "evaluating", key: 1, t: { zh: "评价作品时，我首先看概念是否成立", en: "When judging a work, I first ask whether the concept holds up" } },
    { id: "tf10", d: "TF", f: "evaluating", key: -1, t: { zh: "能不能打动我，是我评价作品的首要标准", en: "Whether a work moves me is the first thing I judge it by" } },
    { id: "tf11", d: "TF", f: "evaluating", key: 1, t: { zh: "证据和清晰的论证最容易说服我", en: "Evidence and clear reasoning are what persuade me most" } },
    { id: "tf12", d: "TF", f: "evaluating", key: -1, t: { zh: "一个真实的个人故事最容易说服我", en: "A true personal story is what persuades me most" } },

    { id: "jp1", d: "JP", f: "planning", key: 1, t: { zh: "出发旅行前，我喜欢把行程排好", en: "Before a trip, I like to have the itinerary planned out" } },
    { id: "jp2", d: "JP", f: "planning", key: -1, t: { zh: "旅行时，我喜欢走到哪儿算哪儿", en: "When travelling, I like to wander and see where I end up" } },
    { id: "jp3", d: "JP", f: "planning", key: 1, t: { zh: "我的文件夹和参考素材都分类得清清楚楚", en: "My folders and reference images are neatly sorted" } },
    { id: "jp4", d: "JP", f: "planning", key: -1, t: { zh: "我喜欢给一周留出大片空白，随时再安排", en: "I like to leave my week open and fill it as things come up" } },

    { id: "jp5", d: "JP", f: "pace", key: 1, t: { zh: "接到新作业，我通常当天就开始动手", en: "When I get a new brief, I usually start on it the same day" } },
    { id: "jp6", d: "JP", f: "pace", key: -1, t: { zh: "截止日期前几天，我往往状态最好", en: "I often hit my best form in the last few days before a deadline" } },
    { id: "jp7", d: "JP", f: "pace", key: 1, t: { zh: "我会把大项目拆成小步骤，按计划推进", en: "I break big projects into small steps and work through them on schedule" } },
    { id: "jp8", d: "JP", f: "pace", key: -1, t: { zh: "我习惯等灵感来了，再一口气做完", en: "I tend to wait for inspiration, then do it all in one go" } },

    { id: "jp9", d: "JP", f: "closure", key: 1, t: { zh: "方案定下来后，我不喜欢再大改", en: "Once a plan is fixed, I prefer to keep it as it is" } },
    { id: "jp10", d: "JP", f: "closure", key: -1, t: { zh: "就算快交作品了，我也愿意为新想法推倒重来", en: "Even close to hand-in, I’m willing to start over for a new idea" } },
    { id: "jp11", d: "JP", f: "closure", key: 1, t: { zh: "遇到选择时，我喜欢尽快拍板", en: "When facing a choice, I like to settle it quickly" } },
    { id: "jp12", d: "JP", f: "closure", key: -1, t: { zh: "我喜欢让选择保持开放，越晚定越好", en: "I like to keep my options open for as long as possible" } }
  ];
  L.resilience = [
    { id: "r1", key: 1, t: { zh: "被 crit 批评后，我通常第二天就能重新投入", en: "After a hard crit, I’m usually back at work the next day" } },
    { id: "r2", key: -1, t: { zh: "一次落选会让我怀疑自己适不适合做艺术", en: "One rejection can make me doubt whether art is right for me" } },
    { id: "r3", key: 1, t: { zh: "作品方向还不明朗时，我也能继续做下去", en: "I can keep working even when I’m unsure where a piece is going" } },
    { id: "r4", key: -1, t: { zh: "看到同龄人的作品更出色，我会焦虑好几天", en: "Seeing a peer’s stronger work leaves me anxious for days" } },
    { id: "r5", key: 1, t: { zh: "作品失败了，我会把它当作下一次的素材", en: "When a piece fails, I treat it as material for the next one" } },
    { id: "r6", key: -1, t: { zh: "别人的否定会在我心里停留很久", en: "A negative comment stays with me for a long time" } },
    { id: "r7", key: 1, t: { zh: "我相信只要坚持练习，能力就会不断提高", en: "I believe my skills keep growing as long as I keep practising" } },
    { id: "r8", key: -1, t: { zh: "作品没做到完美，我就不想拿给别人看", en: "I hold back from showing work until it feels perfect" } }
  ];
  L.validity = [
    { id: "v1", kind: "instructed", want: 6, t: { zh: "为了确认你在认真阅读，这一题请选择「同意」。", en: "To show you’re reading carefully, choose “Agree” here." } },
    { id: "v2", kind: "infrequency", t: { zh: "我去过世界上的每一座美术馆。", en: "I have visited every art museum in the world." } },
    { id: "v3", kind: "instructed", want: 2, t: { zh: "为了确认你在认真作答，这一题请选择「不同意」。", en: "To check you’re paying attention, choose “Disagree” here." } },
    { id: "v4", kind: "infrequency", t: { zh: "我这辈子从来没有拿过一支铅笔。", en: "I have never held a pencil in my life." } }
  ];
  // Near-synonym pairs within the same pair of preferences, used for the inconsistency index
  L.consistencyPairs = [["ei2", "ei4"], ["ei7", "ei5"], ["sn2", "sn10"], ["tf2", "tf10"], ["jp1", "jp7"], ["jp4", "jp12"]];
  if (typeof module === "object" && module.exports) module.exports = L;
})(typeof window !== "undefined" ? window : globalThis);
