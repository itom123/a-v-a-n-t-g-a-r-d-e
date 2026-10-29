# _工具

重新生成各种产物的脚本。需要 Node 18 以上；Playwright 已写进项目根目录的 `package.json`，在项目文件夹运行一次 `npm run setup` 即可（Python 脚本需要 openpyxl）。最常用的两条合成了 `npm run build`。一般交给 Claude 运行即可。

在 `AG STUDIO - WEBSITE/` 下运行：

| 做什么 | 命令 |
|---|---|
| 改完 content.js 后，刷新 index.html 里预写的中文内容 | `node _工具/prerender.js site` |
| 改完 content.js 或 content-pages.js 后，重新生成子页面（文章、课程、导师、三方合作）并刷新它们预写的中文和 sitemap.xml | `node _工具/build-pages.js site` |
| 重新生成扩展图形（弧形字、散布纹样、颗粒图形 SVG，并同步 index.html 里的图形） | `node _工具/build-motifs.js site`，之后再跑一次 `build-pages.js` |
| 重新生成平台分区代码（首页 12 个分区 + 子页面） | `node _工具/build-pack.js site 平台实施包` |
| 重新生成参考截图和素材图 | `node _工具/build-refs.js site 平台实施包` |
| 重新生成文案表 | `node _工具/dump-content.js site/assets/js/content.js rows.json && python3 _工具/build-deck.py rows.json 平台实施包/04-文案与样式表.xlsx` |
| 重新生成视觉包（含 `visual-extended.js`：扩展图形、新版式、文章封面） | `node _工具/build-visual.js site 视觉包` |
| 只重新生成第四轮新增的视觉包内容（`visual-round4.js`：竖版视频封面、公众号头图 / 次图 / 关注卡、邮件页眉和签名标志、文章次图） | `node _工具/build-visual.js site 视觉包 round4` |
| 改了 style.css 的颜色、圆角后，更新设计变量文件 `视觉包/06-Figma/ag-tokens.json`（Figma 里的变量请同步改，或请 Claude 通过 Figma 连接器改） | `node _工具/build-figma.js site 视觉包` |
| 检查各屏幕宽度下有没有文字溢出、是否居中 | `node _工具/check-layout.js site` |
| 检查按钮、标签有没有被挤成两行，标题有没有孤字、断词，文字有没有出界（官网、子页面与实验室每一步，中英文，280–2560 宽） | `node _工具/check-wrap.js site stress=1`（`stress=1` 会把每个人格名、院校名、题目都放进去试一遍；加 `engine=webkit` 用 Safari 内核检查，需先运行 `npx playwright install webkit`） |
