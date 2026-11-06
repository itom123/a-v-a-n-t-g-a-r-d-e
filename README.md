# Avantgarde Studio 官网｜先端艺培 × 天际线

尚岸光景（ASHORE TIME）旗下先端艺培的中英双语官网：https://www.a-v-a-n-t-g-a-r-d-e.com

静态网站，部署在 Cloudflare Pages（项目 `avantgarde-site`）。推送到 `main` 后，GitHub Actions 会自动测试、重建页面并上线。

## 文件夹

```
site/                    整站，原样上传
  assets/js/content.js        ★ 首页的文字、数字、导师、成果
  assets/js/content-pages.js  ★ 子页面的长文字（文章、课程、导师简介、合作分工）
  assets/js/main.js · page.js 首页和子页面的渲染
  assets/css/style.css        视觉规范（只用黑白灰）
  lab/                        AG LAB 创作人格测试
  journal/ programmes/ faculty/ alliance/   由 build-pages.js 生成的子页面
_工具/                   生成和检查网站的脚本（说明见 _工具/README.md）
tools/                   本地预览服务器等
tests/                   AG LAB 引擎测试
.github/workflows/       自动部署
```

## 改内容

1. 改 `site/assets/js/content.js` 或 `content-pages.js`。每段文字都是 `{ zh: "中文", en: "English" }`，两边都要填。
2. 运行 `npm run build`：重新生成子页面，并刷新各页预写的中文内容和 `sitemap.xml`。生成的文件也要一起提交。
3. 运行 `npm test`；改了版式或文字长度，再运行 `npm run check`（检查断行和溢出）。
4. 提交并推送到 `main`，自动上线。

第一次在新电脑上运行：`npm run setup`（安装依赖和 Playwright 的 Chromium）。本地预览：`npm run preview`，打开 http://localhost:8088 。

## 部署

- **自动**：推送到 `main` 即部署（`.github/workflows/deploy.yml`）。仓库需要 Secret `CLOUDFLARE_API_TOKEN`（权限 Account → Cloudflare Pages → Edit）；账户 ID 已写在工作流里。
- **手动**：`npm run deploy`（需要先登录 `npx wrangler login`）。

### 预览密码（demo 阶段）

`functions/_middleware.js` 让整站先要求输入密码，登录后 30 天内不用再输。密码只存在 Cloudflare，不在仓库里：

- **设置或修改**：Cloudflare 后台 → Workers & Pages → `avantgarde-site` → Settings → Variables and Secrets → 添加类型为 **Secret** 的 `SITE_PASSWORD`（Production 和 Preview 都加）。或在本机运行 `npx wrangler pages secret put SITE_PASSWORD --project-name avantgarde-site`。改完要重新部署一次才生效（Deployments → 最新一次 → Retry，或再推送一次 `main`）。改密码会让所有人重新登录。
- **正式上线、取消密码**：删掉 `SITE_PASSWORD` 并重新部署（没有这个 Secret 时网站对所有人开放），或删掉 `functions/_middleware.js`。
- 本地用 `npx wrangler pages dev site` 测试时，把 `SITE_PASSWORD=...` 写进 `.dev.vars`（已在 `.gitignore` 里，不会提交）。

## 注意

这是公开仓库。不要提交内部笔记、合作方或导师的私人信息、密钥（`.env`、Turnstile secret、API token）。导师一律用姓名缩写，详见 `CLAUDE.md`。
