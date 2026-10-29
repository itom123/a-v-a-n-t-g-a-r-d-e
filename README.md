# Avantgarde Studio 官网｜先端艺培 × 天际线 × DBRF

尚岸光景（ASHORE TIME）旗下先端艺培的中英双语官网：https://www.a-v-a-n-t-g-a-r-d-e.com

静态网站，部署在 Cloudflare Pages（项目 `avantgarde-site`）。推送到 `main` 后，GitHub Actions 会自动测试、重建页面并上线。

## 文件夹

```
site/                    整站，原样上传
  assets/js/content.js        ★ 首页的文字、数字、导师、成果
  assets/js/content-pages.js  ★ 子页面的长文字（文章、课程、导师简介、三方分工）
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

- **自动**：推送到 `main` 即部署（`.github/workflows/deploy.yml`）。仓库需要两个 Secret：`CLOUDFLARE_API_TOKEN`（权限 Cloudflare Pages: Edit）和 `CLOUDFLARE_ACCOUNT_ID`。
- **手动**：`npm run deploy`（需要先登录 `npx wrangler login`）。

## 注意

这是公开仓库。不要提交内部笔记、合作方或导师的私人信息、密钥（`.env`、Turnstile secret、API token）。导师一律用姓名缩写，详见 `CLAUDE.md`。
