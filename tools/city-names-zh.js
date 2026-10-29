/*
 * Chinese names for foreign cities, keyed "countryCode:GeoNames asciiname".
 * GeoNames has almost no zh names outside Greater China, so these are curated.
 * build-cities.js warns about keys that match nothing.
 */
module.exports = {
  // 英国
  "GB:London": "伦敦", "GB:Manchester": "曼彻斯特", "GB:Birmingham": "伯明翰", "GB:Liverpool": "利物浦",
  "GB:Leeds": "利兹", "GB:Sheffield": "谢菲尔德", "GB:Bristol": "布里斯托", "GB:Newcastle upon Tyne": "纽卡斯尔",
  "GB:Nottingham": "诺丁汉", "GB:Leicester": "莱斯特", "GB:Coventry": "考文垂", "GB:Southampton": "南安普顿",
  "GB:Brighton": "布莱顿", "GB:Oxford": "牛津", "GB:Cambridge": "剑桥", "GB:York": "约克", "GB:Bath": "巴斯",
  "GB:Cardiff": "加的夫", "GB:Edinburgh": "爱丁堡", "GB:Glasgow": "格拉斯哥", "GB:Aberdeen": "阿伯丁",
  "GB:Dundee": "邓迪", "GB:Belfast": "贝尔法斯特", "GB:Norwich": "诺里奇", "GB:Exeter": "埃克塞特",
  "GB:Canterbury": "坎特伯雷", "GB:Bournemouth": "伯恩茅斯", "GB:Reading": "雷丁", "GB:Lancaster": "兰卡斯特",
  "GB:Durham": "达勒姆", "GB:Swansea": "斯旺西", "GB:Plymouth": "普利茅斯",
  "IE:Dublin": "都柏林",
  // 美国
  "US:New York City": "纽约", "US:Los Angeles": "洛杉矶", "US:San Francisco": "旧金山", "US:San Jose": "圣何塞",
  "US:Seattle": "西雅图", "US:Boston": "波士顿", "US:Chicago": "芝加哥", "US:Washington": "华盛顿",
  "US:Philadelphia": "费城", "US:Houston": "休斯敦", "US:Dallas": "达拉斯", "US:Austin": "奥斯汀",
  "US:Miami": "迈阿密", "US:Atlanta": "亚特兰大", "US:Detroit": "底特律", "US:Pittsburgh": "匹兹堡",
  "US:Baltimore": "巴尔的摩", "US:San Diego": "圣迭戈", "US:Las Vegas": "拉斯维加斯", "US:Phoenix": "菲尼克斯",
  "US:Denver": "丹佛", "US:Portland": "波特兰", "US:Honolulu": "檀香山", "US:Providence": "普罗维登斯",
  "US:New Haven": "纽黑文", "US:Irvine": "尔湾", "US:Pasadena": "帕萨迪纳", "US:Minneapolis": "明尼阿波利斯",
  // 加拿大
  "CA:Toronto": "多伦多", "CA:Vancouver": "温哥华", "CA:Montreal": "蒙特利尔", "CA:Ottawa": "渥太华",
  "CA:Calgary": "卡尔加里", "CA:Edmonton": "埃德蒙顿", "CA:Richmond": "列治文", "CA:Markham": "万锦",
  // 澳大利亚 · 新西兰
  "AU:Sydney": "悉尼", "AU:Melbourne": "墨尔本", "AU:Brisbane": "布里斯班", "AU:Perth": "珀斯",
  "AU:Adelaide": "阿德莱德", "AU:Canberra": "堪培拉", "AU:Gold Coast": "黄金海岸", "AU:Hobart": "霍巴特",
  "NZ:Auckland": "奥克兰", "NZ:Wellington": "惠灵顿", "NZ:Christchurch": "基督城",
  // 亚洲
  "SG:Singapore": "新加坡", "MY:Kuala Lumpur": "吉隆坡", "MY:George Town": "槟城", "MY:Johor Bahru": "新山",
  "MY:Ipoh": "怡保", "MY:Kuching": "古晋", "MY:Kota Kinabalu": "亚庇",
  "JP:Tokyo": "东京", "JP:Osaka": "大阪", "JP:Kyoto": "京都", "JP:Yokohama": "横滨", "JP:Nagoya": "名古屋",
  "JP:Fukuoka": "福冈", "JP:Sapporo": "札幌", "JP:Kobe": "神户",
  "KR:Seoul": "首尔", "KR:Busan": "釜山", "KR:Incheon": "仁川",
  "TH:Bangkok": "曼谷", "TH:Chiang Mai": "清迈", "VN:Hanoi": "河内", "VN:Ho Chi Minh City": "胡志明市",
  "PH:Manila": "马尼拉", "ID:Jakarta": "雅加达", "ID:Surabaya": "泗水", "ID:Medan": "棉兰", "KH:Phnom Penh": "金边",
  "MM:Yangon": "仰光", "LA:Vientiane": "万象", "MN:Ulan Bator": "乌兰巴托", "IN:New Delhi": "新德里",
  "IN:Mumbai": "孟买", "AE:Dubai": "迪拜", "AE:Abu Dhabi": "阿布扎比", "QA:Doha": "多哈",
  "IL:Tel Aviv": "特拉维夫", "TR:Istanbul": "伊斯坦布尔", "KZ:Almaty": "阿拉木图",
  // 欧洲
  "FR:Paris": "巴黎", "FR:Lyon": "里昂", "FR:Marseille": "马赛", "FR:Nice": "尼斯",
  "DE:Berlin": "柏林", "DE:Munich": "慕尼黑", "DE:Hamburg": "汉堡", "DE:Frankfurt am Main": "法兰克福",
  "DE:Koeln": "科隆", "DE:Stuttgart": "斯图加特", "DE:Duesseldorf": "杜塞尔多夫", "DE:Dresden": "德累斯顿",
  "IT:Rome": "罗马", "IT:Milan": "米兰", "IT:Florence": "佛罗伦萨", "IT:Venice": "威尼斯", "IT:Turin": "都灵",
  "IT:Naples": "那不勒斯", "IT:Bologna": "博洛尼亚",
  "ES:Madrid": "马德里", "ES:Barcelona": "巴塞罗那", "ES:Valencia": "瓦伦西亚", "PT:Lisbon": "里斯本", "PT:Porto": "波尔图",
  "NL:Amsterdam": "阿姆斯特丹", "NL:Rotterdam": "鹿特丹", "NL:The Hague": "海牙", "NL:Eindhoven": "埃因霍温",
  "BE:Brussels": "布鲁塞尔", "BE:Antwerp": "安特卫普", "CH:Zuerich": "苏黎世", "CH:Geneva": "日内瓦",
  "CH:Basel": "巴塞尔", "CH:Lausanne": "洛桑", "AT:Vienna": "维也纳", "DK:Copenhagen": "哥本哈根",
  "SE:Stockholm": "斯德哥尔摩", "NO:Oslo": "奥斯陆", "FI:Helsinki": "赫尔辛基", "IS:Reykjavik": "雷克雅未克",
  "PL:Warsaw": "华沙", "CZ:Prague": "布拉格", "HU:Budapest": "布达佩斯", "GR:Athens": "雅典",
  "RU:Moscow": "莫斯科", "RU:Saint Petersburg": "圣彼得堡", "UA:Kyiv": "基辅",
  // 美洲 · 非洲
  "MX:Mexico City": "墨西哥城", "BR:Sao Paulo": "圣保罗", "BR:Rio de Janeiro": "里约热内卢",
  "AR:Buenos Aires": "布宜诺斯艾利斯", "CL:Santiago": "圣地亚哥", "PE:Lima": "利马",
  "EG:Cairo": "开罗", "ZA:Johannesburg": "约翰内斯堡", "ZA:Cape Town": "开普敦", "KE:Nairobi": "内罗毕",
  "NG:Lagos": "拉各斯"
};
